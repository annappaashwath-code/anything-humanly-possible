import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Explicit preflight handler as safety net
app.options("*", (c) => {
  return c.text("", 204);
});

// Health check endpoint
app.get("/make-server-ef0ca726/health", (c) => {
  return c.json({ status: "ok" });
});

/* ─── AI Chat (Google Gemini) ───────────────────────── */

app.post("/make-server-ef0ca726/chat", async (c) => {
  try {
    const { systemPrompt, messages } = await c.req.json();

    // Try Google Gemini first, then fall back to OpenAI if available
    const googleKey = Deno.env.get("GOOGLE_API_KEY");
    const openaiKey = Deno.env.get("OPENAI_API_KEY");

    if (googleKey) {
      // ── Google Gemini path ──
      const geminiContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      // Convert chat history to Gemini format
      for (const m of messages) {
        const role = m.role === "mentor" ? "model" : "user";
        geminiContents.push({
          role,
          parts: [{ text: m.text }],
        });
      }

      // Ensure conversation starts with a user turn (Gemini requirement)
      if (geminiContents.length === 0 || geminiContents[0].role !== "user") {
        geminiContents.unshift({
          role: "user",
          parts: [{ text: "Hello" }],
        });
      }

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${googleKey}`;

      const res = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1024,
            topP: 0.95,
            topK: 40,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
          ],
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.log(`Gemini API error: ${res.status} ${errBody}`);
        // Fall through to OpenAI if available
        if (!openaiKey) {
          return c.json(
            { error: `Gemini API error: ${res.status} — ${errBody}`, fallback: true },
            502,
          );
        }
      } else {
        const data = await res.json();
        const reply =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

        if (!reply) {
          console.log(`Gemini returned empty response: ${JSON.stringify(data)}`);
          if (!openaiKey) {
            return c.json({ error: "Gemini returned empty response", fallback: true }, 502);
          }
        } else {
          return c.json({ reply, provider: "gemini" });
        }
      }
    }

    // ── OpenAI fallback path ──
    if (openaiKey) {
      const openaiMessages = [
        { role: "system", content: systemPrompt },
        ...messages.map((m: { role: string; text: string }) => ({
          role: m.role === "mentor" ? "assistant" : "user",
          content: m.text,
        })),
      ];

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: openaiMessages,
          max_tokens: 800,
          temperature: 0.8,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.log(`OpenAI API error: ${res.status} ${errBody}`);
        return c.json(
          { error: `OpenAI API error: ${res.status}`, fallback: true },
          502,
        );
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content ?? "";
      return c.json({ reply, provider: "openai" });
    }

    // No API keys configured
    return c.json(
      { error: "No AI API key configured (GOOGLE_API_KEY or OPENAI_API_KEY)", fallback: true },
      503,
    );
  } catch (err) {
    console.log(`Chat route error: ${err}`);
    return c.json({ error: String(err), fallback: true }, 500);
  }
});

/* ─── Progress Tracking ─────────────────────────────── */

app.get("/make-server-ef0ca726/progress/:sessionId", async (c) => {
  try {
    const sessionId = c.req.param("sessionId");
    const key = `ahp-progress:${sessionId}`;
    const value = await kv.get(key);
    return c.json({ progress: value ?? {} });
  } catch (err) {
    console.log(`Get progress error: ${err}`);
    return c.json({ progress: {} });
  }
});

app.post("/make-server-ef0ca726/progress/:sessionId", async (c) => {
  try {
    const sessionId = c.req.param("sessionId");
    const { progress } = await c.req.json();
    const key = `ahp-progress:${sessionId}`;
    await kv.set(key, progress);
    return c.json({ ok: true });
  } catch (err) {
    console.log(`Save progress error: ${err}`);
    return c.json({ error: String(err) }, 500);
  }
});

/* ─── Email Subscription ────────────────────────────── */

app.post("/make-server-ef0ca726/subscribe", async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email || typeof email !== "string") {
      return c.json({ error: "Email is required" }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const subscriberKey = `ahp-subscriber:${normalizedEmail}`;

    // Check if already subscribed
    const existing = await kv.get(subscriberKey);
    if (existing) {
      return c.json({ ok: true, message: "Already subscribed", alreadySubscribed: true });
    }

    // Store subscription
    await kv.set(subscriberKey, {
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      confirmed: true,
    });

    // Also add to a list index for retrieval
    const listKey = `ahp-subscriber-list:${Date.now()}`;
    await kv.set(listKey, normalizedEmail);

    console.log(`New subscriber: ${normalizedEmail}`);

    return c.json({
      ok: true,
      message: "Successfully subscribed",
      alreadySubscribed: false,
    });
  } catch (err) {
    console.log(`Subscribe route error: ${err}`);
    return c.json({ error: `Subscription failed: ${err}` }, 500);
  }
});

/* ─── Dashboard: Generic KV CRUD ────────────────────── */
// Pattern: GET/POST /dashboard/:collection/:sessionId

const dashboardCollections = ["profile", "activity", "mentor-memory", "enrolled"];

for (const collection of dashboardCollections) {
  app.get(`/make-server-ef0ca726/dashboard/${collection}/:sessionId`, async (c) => {
    try {
      const sessionId = c.req.param("sessionId");
      const key = `ahp-dash-${collection}:${sessionId}`;
      const value = await kv.get(key);
      return c.json({ data: value ?? null });
    } catch (err) {
      console.log(`Dashboard GET ${collection} error: ${err}`);
      return c.json({ data: null });
    }
  });

  app.post(`/make-server-ef0ca726/dashboard/${collection}/:sessionId`, async (c) => {
    try {
      const sessionId = c.req.param("sessionId");
      const { data } = await c.req.json();
      const key = `ahp-dash-${collection}:${sessionId}`;
      await kv.set(key, data);
      return c.json({ ok: true });
    } catch (err) {
      console.log(`Dashboard POST ${collection} error: ${err}`);
      return c.json({ error: String(err) }, 500);
    }
  });
}

/* ─── Dynamic Course Content Enrichment (Gemini) ──── */

app.post("/make-server-ef0ca726/enrich-lesson", async (c) => {
  try {
    const { categoryName, mentorName, mentorTitle, lessonTitle, lessonContent, specialties, language } = await c.req.json();
    const googleKey = Deno.env.get("GOOGLE_API_KEY");

    if (!googleKey) {
      return c.json({ error: "No GOOGLE_API_KEY configured", fallback: true }, 503);
    }

    // Check cache first (include language in cache key)
    const langSuffix = language && language !== "en-US" ? `:${language}` : "";
    const cacheKey = `ahp-lesson-enrich:${categoryName}:${mentorName}:${lessonTitle}${langSuffix}`.replace(/\s+/g, "-").toLowerCase().slice(0, 120);
    const cached = await kv.get(cacheKey);
    if (cached) {
      return c.json({ enriched: cached, fromCache: true });
    }

    const languageInstruction = language && language !== "en-US"
      ? `\n\nIMPORTANT: Generate ALL content in the language with code "${language}". The overview, deepContent, examples, exercises, reflectionPrompts, projectIdea — everything must be in that language. Only JSON keys should remain in English.`
      : "";

    const prompt = `You are ${mentorName}, a ${mentorTitle} specializing in ${(specialties || []).join(", ")}. 
    
Generate enriched educational content for the lesson "${lessonTitle}" in the ${categoryName} category.

The base lesson content is: ${(lessonContent || "").slice(0, 800)}
${languageInstruction}

Return a JSON object with exactly this structure (no markdown, no code fences, just raw JSON):
{
  "overview": "A 2-3 sentence overview of what this lesson covers",
  "learningOutcomes": ["outcome1", "outcome2", "outcome3", "outcome4"],
  "deepContent": "A detailed 4-5 paragraph explanation of the core concepts, written in ${mentorName}'s teaching voice. Be specific, use real-world examples, include analogies, and make it practical and engaging. Each paragraph should build on the previous one.",
  "examples": [
    {"title": "Example title", "description": "Concrete real-world example with detailed explanation"},
    {"title": "Example title", "description": "Concrete real-world example with detailed explanation"},
    {"title": "Example title", "description": "Concrete real-world example with detailed explanation"}
  ],
  "exercises": [
    {"title": "Exercise title", "instruction": "Step-by-step exercise instruction with clear deliverables", "difficulty": "beginner"},
    {"title": "Exercise title", "instruction": "Step-by-step exercise instruction with clear deliverables", "difficulty": "intermediate"},
    {"title": "Exercise title", "instruction": "Step-by-step exercise instruction with clear deliverables", "difficulty": "advanced"}
  ],
  "reflectionPrompts": ["A deep thought-provoking question", "Another reflective question that challenges assumptions"],
  "resources": [
    {"title": "Resource name", "type": "article|video|tool|book", "description": "Why this resource is valuable"}
  ],
  "projectIdea": {"title": "Project title", "description": "A hands-on mini project that applies all concepts from this lesson", "steps": ["step1", "step2", "step3", "step4"]}
}`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${googleKey}`;

    const geminiBody = JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 3072,
        topP: 0.9,
      },
    });

    // Helper: attempt Gemini call + parse, with retry for malformed JSON (common in non-English)
    const MAX_ATTEMPTS = 2;
    let enriched: any = null;
    let lastParseError = "";

    // Helper to aggressively clean Gemini JSON output
    function cleanGeminiJson(raw: string): string {
      let s = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const jsonStart = s.indexOf("{");
      const jsonEnd = s.lastIndexOf("}");
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        s = s.slice(jsonStart, jsonEnd + 1);
      }
      // Fix trailing commas before } or ] (common Gemini issue)
      s = s.replace(/,\s*([}\]])/g, "$1");
      // Fix unescaped newlines within string values
      s = s.replace(/(?<="[^"]*)\n(?=[^"]*")/g, "\\n");
      return s;
    }

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      // On retry, use a stricter prompt emphasizing valid JSON
      const bodyToSend = attempt === 1 ? geminiBody : JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt + "\n\nCRITICAL: Your previous response had invalid JSON. You MUST return ONLY a single valid JSON object. No markdown, no explanation, no text before or after the JSON. Ensure all strings are properly escaped. Double-check that all quotes, brackets, and commas are correct." }] }],
        generationConfig: { temperature: 0.5, maxOutputTokens: 3072, topP: 0.85 },
      });

      const res = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyToSend,
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.log(`Gemini enrich error (attempt ${attempt}): ${res.status} ${errBody}`);
        if (attempt === MAX_ATTEMPTS) {
          return c.json({ error: `Gemini API error: ${res.status}`, fallback: true }, 502);
        }
        continue;
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      try {
        const cleaned = cleanGeminiJson(rawText);
        enriched = JSON.parse(cleaned);
        break; // success
      } catch (parseErr) {
        lastParseError = `Attempt ${attempt}: ${String(parseErr)} — raw: ${rawText.slice(0, 200)}`;
        console.log(`JSON parse failed (attempt ${attempt}/${MAX_ATTEMPTS}): ${rawText.slice(0, 300)}`);
        if (attempt === MAX_ATTEMPTS) {
          return c.json({ error: "Failed to parse AI response after retries", detail: lastParseError, fallback: true }, 502);
        }
      }
    }

    if (!enriched) {
      return c.json({ error: "No enriched content generated", fallback: true }, 502);
    }

    // Cache for future requests
    await kv.set(cacheKey, enriched);

    return c.json({ enriched, fromCache: false });
  } catch (err) {
    console.log(`Enrich lesson error: ${err}`);
    return c.json({ error: String(err), fallback: true }, 500);
  }
});

Deno.serve(app.fetch);