import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Target,
  Sparkles,
  MessageCircle,
  Volume2,
  VolumeX,
  Award,
  Lightbulb,
  Globe,
  Play,
  Pause,
  StickyNote,
  Crown,
  GraduationCap,
  Clock,
  Layers,
  ArrowRight,
  ChevronLeft,
  Keyboard,
  SkipForward,
} from "lucide-react";
import {
  getMentorCategory,
  getMentor,
  type MentorPersona,
  type MentorLesson,
  type MentorModule,
} from "./mentorData";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { logActivity, loadProgress, saveProgress, getSessionId } from "../dashboard/dashboardStore";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ef0ca726`;

/* ────────────────────────────────────────────
   Persistent Progress (Supabase KV + Unified Store)
   ──────────────────────────────────────────── */

async function fetchProgress(): Promise<Record<string, boolean>> {
  return await loadProgress();
}

async function persistProgress(p: Record<string, boolean>) {
  await saveProgress(p);
}

/* ────────────────────────────────────────────
   Types
   ──────────────────────────────────────────── */

interface ChatMessage {
  id: string;
  role: "user" | "mentor";
  text: string;
}

type MentorMood = "idle" | "thinking" | "speaking" | "celebrating";

/* ────────────────────────────────────────────
   Web Speech API helpers
   ──────────────────────────────────────────── */

interface VoiceConfig {
  pitch: number;
  rate: number;
  voiceHint: string;
}

function speak(
  text: string,
  voiceConfig?: VoiceConfig,
  onStart?: () => void,
  onEnd?: () => void,
) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = voiceConfig?.rate ?? 0.95;
  utterance.pitch = voiceConfig?.pitch ?? 1.0;
  utterance.volume = 0.9;
  const voices = window.speechSynthesis.getVoices();
  const hint = voiceConfig?.voiceHint ?? "";
  const isFemale = hint === "female";
  let preferred = voices.find(
    (v) =>
      v.lang.startsWith("en") &&
      v.name.includes("Google") &&
      (isFemale
        ? /female|woman|samantha|fiona|karen|victoria|zira/i.test(v.name)
        : /male|daniel|james|david|george|thomas/i.test(v.name)),
  );
  if (!preferred) {
    preferred = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (isFemale
          ? /female|woman|samantha|fiona|karen|victoria|zira/i.test(v.name)
          : /male|daniel|james|david|george|thomas/i.test(v.name)),
    );
  }
  if (!preferred) {
    preferred =
      voices.find(
        (v) => v.lang.startsWith("en") && v.name.includes("Google"),
      ) || voices.find((v) => v.lang.startsWith("en"));
  }
  if (preferred) utterance.voice = preferred;
  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/* ────────────────────────────────────────────
   Mentor Response Generator (local fallback)
   ──────────────────────────────────────────── */

function generateLocalResponse(
  question: string,
  mentor: MentorPersona,
  activeLesson: MentorLesson | null,
): string {
  const q = question.toLowerCase();

  if (q.match(/^(hi|hello|hey|greetings)/)) return mentor.greeting;

  if (activeLesson) {
    if (q.match(/(explain|tell me|what|how|why|describe)/)) {
      return `Great question! Here's what you need to understand about "${activeLesson.title}":\n\n${activeLesson.content.slice(0, 400)}...\n\nThe key takeaway is: ${activeLesson.keyPoints[0]}. Would you like me to go deeper on any specific point?`;
    }
    if (q.match(/(practice|exercise|task|try|do|build|create)/)) {
      return `Here's a practice task for you:\n\n${activeLesson.practiceTask}\n\nTake your time with this. The goal isn't speed — it's understanding. I'm here if you get stuck.`;
    }
    if (q.match(/(reflect|think|question|ponder)/)) {
      return `Here's something to reflect on:\n\n"${activeLesson.reflectionQuestion}"\n\nTake a moment to really sit with this question. There's no right answer — it's about developing your own thinking.`;
    }
    if (q.match(/(key|point|summary|important|takeaway)/)) {
      const pts = activeLesson.keyPoints
        .map((p, i) => `${i + 1}. ${p}`)
        .join("\n");
      return `Here are the key points from "${activeLesson.title}":\n\n${pts}\n\nWant me to elaborate on any of these?`;
    }
  }

  if (q.match(/(help|what can|how do i|stuck|confused)/))
    return `I'm here to help! You can ask me to:\n\n• Explain any concept in depth\n• Give you a practice task\n• Pose a reflection question\n• Summarize key points\n• Share encouragement\n\nJust ask naturally — I'll adapt to whatever you need.`;

  if (q.match(/(motivat|inspire|encourage|hard|difficult|give up)/)) {
    const enc =
      mentor.encouragement[
        Math.floor(Math.random() * mentor.encouragement.length)
      ];
    return `${enc}\n\nRemember — every expert was once a beginner. The fact that you're here, putting in the work, puts you ahead of most people. Keep going.`;
  }

  if (q.match(/(thank|thanks)/))
    return `You're welcome! Your curiosity and dedication are what make this journey worthwhile. I'm always here when you need me.`;

  if (activeLesson) {
    return `That's a great thought about "${activeLesson.title}". ${activeLesson.content.slice(0, 200)}...\n\n${activeLesson.keyPoints[Math.floor(Math.random() * activeLesson.keyPoints.length)]}.\n\nWant me to dive deeper?`;
  }

  return `${mentor.encouragement[0]}\n\nSelect a lesson from the curriculum to get started, or ask me anything about ${mentor.course.title}. I'm here to guide you.`;
}

/* ────────────────────────────────────────────
   AI Chat API (Google Gemini with local fallback)
   ──────────────────────────────────────────── */

function buildSystemPrompt(
  mentor: MentorPersona,
  activeLesson: MentorLesson | null,
): string {
  let prompt = `You are ${mentor.name}, a private one-on-one AI mentor with the title "${mentor.title}".

IDENTITY & PERSONALITY:
${mentor.personality}

You are a master in your domain. You teach with confidence, calm authority, and genuine care. This is a private mentorship session — not a chatbot. Make the student feel like they have a world-class expert guiding them personally.

YOUR DOMAIN & SPECIALTIES:
- Specialties: ${mentor.specialties.join(", ")}
- Course: "${mentor.course.title}" — ${mentor.course.overview}

DOMAIN BOUNDARY (CRITICAL):
You must ONLY answer questions within your domain of expertise. If the student asks about a topic that is clearly outside your domain (e.g., asking about Kubernetes in a Design course, or asking about painting in a Coding course), respond with something like:
"I focus on ${mentor.specialties[0]} mastery. Let's keep this session centered on what I can teach you best."
Do NOT attempt to answer off-topic questions. Gently redirect back to your domain.

TEACHING STYLE:
- Speak with confident, mentor-like authority — never uncertain or generic
- Give structured explanations with step-by-step guidance when teaching concepts
- Use real-world analogies and examples to make ideas tangible
- Adapt your difficulty based on how the student responds — simpler if they seem confused, deeper if they're advancing
- Ask follow-up questions to check understanding
- Keep responses focused and concise (2-4 paragraphs max)
- Use line breaks for readability
- When celebrating progress, be genuinely enthusiastic
- Every response should feel like it came from a real expert who cares about the student's growth

VOICE PERSONALITY GUIDANCE:
${mentor.specialties.includes("React") || mentor.specialties.includes("TypeScript") || mentor.specialties.includes("Python") ? "Be structured and precise in your explanations. Use code-like clarity." : ""}${mentor.specialties.includes("Design") || mentor.specialties.includes("UI/UX") ? "Be calm and aesthetic. Speak with visual sensibility." : ""}${mentor.specialties.includes("Entrepreneurship") || mentor.specialties.includes("Growth") ? "Be energetic and visionary. Inspire action." : ""}${mentor.specialties.includes("Data") || mentor.specialties.includes("Analytics") ? "Be analytical and clear. Let logic lead." : ""}${mentor.specialties.includes("Mindfulness") || mentor.specialties.includes("Self-Discovery") ? "Be grounded and reflective. Speak with emotional depth." : ""}${mentor.specialties.includes("AI") || mentor.specialties.includes("Machine Learning") ? "Be forward-thinking and precise. Connect theory to real applications." : ""}`;

  if (activeLesson) {
    prompt += `

CURRENT LESSON CONTEXT:
The student is working on: "${activeLesson.title}"
Lesson content: ${activeLesson.content}
Key points: ${activeLesson.keyPoints.join("; ")}
Practice task: ${activeLesson.practiceTask}
Reflection question: ${activeLesson.reflectionQuestion}

Reference this lesson context when relevant. If the student asks about the lesson, dive deep. If they want practice, give them the task. If they want reflection, pose the question thoughtfully.`;
  }

  return prompt;
}

async function getAIResponse(
  messages: ChatMessage[],
  mentor: MentorPersona,
  activeLesson: MentorLesson | null,
): Promise<{ text: string; isAI: boolean }> {
  try {
    const systemPrompt = buildSystemPrompt(mentor, activeLesson);
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
        apikey: publicAnonKey,
      },
      body: JSON.stringify({
        systemPrompt,
        messages: messages.map((m) => ({ role: m.role, text: m.text })),
      }),
    });

    const data = await res.json();

    if (data.fallback || !res.ok) {
      const lastUserMsg = messages.filter((m) => m.role === "user").pop();
      return {
        text: generateLocalResponse(
          lastUserMsg?.text ?? "",
          mentor,
          activeLesson,
        ),
        isAI: false,
      };
    }

    return { text: data.reply, isAI: true };
  } catch (err) {
    console.log("AI chat error, using local fallback:", err);
    const lastUserMsg = messages.filter((m) => m.role === "user").pop();
    return {
      text: generateLocalResponse(
        lastUserMsg?.text ?? "",
        mentor,
        activeLesson,
      ),
      isAI: false,
    };
  }
}

/* ────────────────────────────────────────────
   Language Config
   ──────────────────────────────────────────── */

interface LanguageOption {
  code: string;
  label: string;
  native: string;
  flag: string;
  fontFamily: string;
  lineHeight: number;
  group: "global" | "indian" | "eastasian" | "european";
}

const LANGUAGES: LanguageOption[] = [
  { code: "en-US", label: "English", native: "English", flag: "EN", fontFamily: "Inter, Onest, sans-serif", lineHeight: 1.85, group: "global" },
  { code: "hi-IN", label: "Hindi", native: "हिन्दी", flag: "HI", fontFamily: "'Noto Sans Devanagari', Inter, sans-serif", lineHeight: 2.0, group: "indian" },
  { code: "kn-IN", label: "Kannada", native: "ಕನ್ನಡ", flag: "KN", fontFamily: "'Noto Sans Kannada', Inter, sans-serif", lineHeight: 2.0, group: "indian" },
  { code: "te-IN", label: "Telugu", native: "తెలుగు", flag: "TE", fontFamily: "'Noto Sans Telugu', Inter, sans-serif", lineHeight: 2.0, group: "indian" },
  { code: "ta-IN", label: "Tamil", native: "தமிழ்", flag: "TA", fontFamily: "'Noto Sans Tamil', Inter, sans-serif", lineHeight: 2.0, group: "indian" },
  { code: "es-ES", label: "Spanish", native: "Español", flag: "ES", fontFamily: "Inter, Onest, sans-serif", lineHeight: 1.85, group: "european" },
  { code: "fr-FR", label: "French", native: "Français", flag: "FR", fontFamily: "Inter, Onest, sans-serif", lineHeight: 1.85, group: "european" },
  { code: "de-DE", label: "German", native: "Deutsch", flag: "DE", fontFamily: "Inter, Onest, sans-serif", lineHeight: 1.85, group: "european" },
  { code: "pt-BR", label: "Portuguese", native: "Português", flag: "PT", fontFamily: "Inter, Onest, sans-serif", lineHeight: 1.85, group: "european" },
  { code: "zh-CN", label: "Chinese", native: "中文", flag: "ZH", fontFamily: "'Noto Sans SC', Inter, sans-serif", lineHeight: 1.9, group: "eastasian" },
  { code: "ja-JP", label: "Japanese", native: "日本語", flag: "JA", fontFamily: "'Noto Sans JP', Inter, sans-serif", lineHeight: 1.9, group: "eastasian" },
  { code: "ko-KR", label: "Korean", native: "한국어", flag: "KO", fontFamily: "'Noto Sans KR', Inter, sans-serif", lineHeight: 1.9, group: "eastasian" },
];

function getLangConfig(code: string): LanguageOption {
  return LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
}

const GROUP_ORDER = ["global", "indian", "european", "eastasian"] as const;
const GROUP_LABELS: Record<string, string> = { global: "", indian: "Indian Languages", european: "European", eastasian: "East Asian" };

/* ────────────────────────────────────────────
   Milestone Unlock (white theme)
   ──────────────────────────────────────────── */

function MilestoneUnlock({
  show,
  lessonTitle,
  color,
  onClose,
  onNextLesson,
  nextLessonTitle,
}: {
  show: boolean;
  lessonTitle: string;
  color: string;
  onClose: () => void;
  onNextLesson?: () => void;
  nextLessonTitle?: string;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl p-10 max-w-sm mx-4 text-center overflow-hidden"
            style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 25px 60px rgba(0,0,0,0.08)" }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: `${color}10` }}
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: 2 }}
            >
              <Award size={28} style={{ color }} />
            </motion.div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000" }}>
              Lesson Complete!
            </h3>
            <p
              className="mt-2 mb-8"
              style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.7, color: "#000" }}
            >
              You've completed "<span style={{ fontWeight: 600 }}>{lessonTitle}</span>". Keep the momentum going.
            </p>
            <div className="flex flex-col gap-2.5">
              {onNextLesson && nextLessonTitle ? (
                <>
                  <button
                    onClick={() => { onNextLesson(); onClose(); }}
                    className="w-full px-8 py-3 rounded-xl text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#000", fontSize: "0.875rem", fontWeight: 700 }}
                  >
                    Next Lesson <ArrowRight size={14} />
                  </button>
                  <p className="text-center" style={{ fontSize: "0.625rem", fontWeight: 500, color: "rgba(0,0,0,0.4)" }}>
                    {nextLessonTitle}
                  </p>
                  <button
                    onClick={onClose}
                    className="text-center py-2 transition-all cursor-pointer"
                    style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(0,0,0,0.35)" }}
                  >
                    Stay on this lesson
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full px-8 py-3 rounded-xl text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  style={{ backgroundColor: color, fontSize: "0.875rem", fontWeight: 700 }}
                >
                  Continue Learning
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────
   Mentor Presence (calmer avatar for white theme)
   ──────────────────────────────────────────── */

function MentorPresence({
  mood,
  color,
  initials,
  name,
  title,
}: {
  mood: MentorMood;
  color: string;
  initials: string;
  name: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        className="relative w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}08`, border: `1.5px solid ${color}15` }}
        animate={
          mood === "thinking"
            ? { scale: [1, 0.96, 1] }
            : mood === "speaking"
              ? { scale: [1, 1.03, 0.98, 1] }
              : mood === "celebrating"
                ? { scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }
                : {}
        }
        transition={{ duration: mood === "speaking" ? 1 : 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span style={{ fontSize: "0.875rem", fontWeight: 800, color }}>{initials}</span>
        {/* Status dot */}
        <motion.div
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
          style={{ backgroundColor: mood === "thinking" ? "#f59e0b" : mood === "speaking" ? color : "#10b981" }}
          animate={mood !== "idle" ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      <div>
        <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#000" }}>{name}</p>
        <p style={{ fontSize: "0.625rem", fontWeight: 500, color: "#000" }}>
          {mood === "thinking" ? "Thinking..." : mood === "speaking" ? "Speaking..." : title}
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Voice Waveform (white theme)
   ──────────────────────────────────────────── */

function VoiceWaveform({ active, color }: { active: boolean; color: string }) {
  const bars = 20;
  return (
    <div className="flex items-center justify-center gap-[2px] h-6">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ width: 2, backgroundColor: active ? color : `${color}30` }}
          animate={
            active
              ? { height: [2, 4 + Math.random() * 16, 2], opacity: [0.3, 0.8, 0.3] }
              : { height: 2, opacity: 0.15 }
          }
          transition={
            active
              ? { duration: 0.3 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.03, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Typing Indicator
   ──────────────────────────────────────────── */

function TypingIndicator({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -3, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Left Panel — Curriculum Sidebar
   ──────────────────────────────────────────── */

function CurriculumSidebar({
  modules,
  progress,
  activeLesson,
  onSelectLesson,
  color,
  courseName,
  learningDuration,
}: {
  modules: MentorModule[];
  progress: Record<string, boolean>;
  activeLesson: MentorLesson | null;
  onSelectLesson: (lesson: MentorLesson) => void;
  color: string;
  courseName: string;
  learningDuration?: string;
}) {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    [modules[0]?.id]: true,
  });

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (s, m) => s + m.lessons.filter((l) => progress[l.id]).length,
    0,
  );
  const remainingLessons = totalLessons - completedLessons;
  const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="h-full flex flex-col">
      {/* Course header */}
      <div className="px-5 pt-5 pb-4">
        <h3 style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#000", lineHeight: 1.3 }}>
          {courseName}
        </h3>
      </div>

      {/* Progress card */}
      <div className="mx-5 mb-4 rounded-xl p-4" style={{ backgroundColor: `${color}06`, border: `1px solid ${color}10` }}>
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "#000", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Learning Journey
          </span>
          <span style={{ fontSize: "1rem", fontWeight: 900, color }}>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: `${color}12` }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#000" }}>{completedLessons}</p>
            <p style={{ fontSize: "0.4375rem", fontWeight: 600, color: "#000", letterSpacing: "0.06em", textTransform: "uppercase" }}>Completed</p>
          </div>
          <div className="text-center">
            <p style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#000" }}>{remainingLessons}</p>
            <p style={{ fontSize: "0.4375rem", fontWeight: 600, color: "#000", letterSpacing: "0.06em", textTransform: "uppercase" }}>Remaining</p>
          </div>
          <div className="text-center">
            <p style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#000" }}>{learningDuration || `${totalLessons} lessons`}</p>
            <p style={{ fontSize: "0.4375rem", fontWeight: 600, color: "#000", letterSpacing: "0.06em", textTransform: "uppercase" }}>Duration</p>
          </div>
        </div>
      </div>

      {/* Module list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2" style={{ scrollbarWidth: "none" }}>
        {modules.map((mod, mi) => {
          const isOpen = !!openModules[mod.id];
          const modDone = mod.lessons.filter((l) => progress[l.id]).length;
          const modTotal = mod.lessons.length;

          return (
            <div
              key={mod.id}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(0,0,0,0.05)" }}
            >
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center gap-2.5 px-3.5 py-3 hover:bg-black/[0.02] transition-colors cursor-pointer text-left"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${color}10`, fontSize: "0.5625rem", fontWeight: 800, color }}
                >
                  {mi + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#000" }}>
                    {mod.title}
                  </p>
                  <p style={{ fontSize: "0.5625rem", fontWeight: 500, color: "#000" }}>
                    {modDone}/{modTotal} lessons
                  </p>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={12} className="text-black/20" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 space-y-0.5">
                      {mod.lessons.map((lesson) => {
                        const isDone = !!progress[lesson.id];
                        const isActive = activeLesson?.id === lesson.id;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onSelectLesson(lesson)}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-200 cursor-pointer text-left ${
                              isActive
                                ? "bg-black/[0.04]"
                                : "hover:bg-black/[0.02]"
                            }`}
                            style={isActive ? { border: `1px solid ${color}20` } : {}}
                          >
                            <div
                              className="rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                width: 18,
                                height: 18,
                                backgroundColor: isDone ? color : "transparent",
                                border: isDone ? "none" : "1.5px solid rgba(0,0,0,0.12)",
                                color: isDone ? "#fff" : "transparent",
                              }}
                            >
                              {isDone && <Check size={8} strokeWidth={3} />}
                            </div>
                            <span
                              className={`flex-1 truncate ${
                                isActive
                                  ? ""
                                  : isDone
                                    ? "line-through"
                                    : ""
                              }`}
                              style={{
                                fontSize: "0.6875rem",
                                fontWeight: isActive ? 600 : 500,
                                color: isActive ? "#000" : isDone ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.6)",
                              }}
                            >
                              {lesson.title}
                            </span>
                            <span
                              className="flex-shrink-0"
                              style={{ fontSize: "0.5rem", color: "rgba(0,0,0,0.25)" }}
                            >
                              {lesson.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Center Panel — Lesson Content
   ──────────────────────────────────────────── */

function LessonContent({
  lesson,
  color,
  isComplete,
  onComplete,
  mentorName,
  mentorTitle,
  specialties,
  onOpenNotes,
  showNotes,
  onNextLesson,
  nextLessonTitle,
  onPrevLesson,
  prevLessonTitle,
  lessonPosition,
}: {
  lesson: MentorLesson;
  color: string;
  isComplete: boolean;
  onComplete: () => void;
  mentorName?: string;
  mentorTitle?: string;
  specialties?: string[];
  onOpenNotes: () => void;
  showNotes: boolean;
  onNextLesson?: () => void;
  nextLessonTitle?: string;
  onPrevLesson?: () => void;
  prevLessonTitle?: string;
  lessonPosition?: string;
}) {
  const [enriched, setEnriched] = useState<any>(null);
  const [enrichLoading, setEnrichLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ overview: true });
  const [selectedLang, setSelectedLang] = useState("en-US");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [langSwitching, setLangSwitching] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langBtnRef = useRef<HTMLButtonElement>(null);

  const langConfig = getLangConfig(selectedLang);

  // Detect TTS voice availability
  const [ttsAvailable, setTtsAvailable] = useState(true);
  useEffect(() => {
    function checkVoices() {
      const voices = window.speechSynthesis?.getVoices() || [];
      if (voices.length === 0) return;
      const langPrefix = selectedLang.split("-")[0];
      const hasVoice = voices.some(v => v.lang.startsWith(langPrefix));
      setTtsAvailable(hasVoice);
    }
    checkVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = checkVoices;
    }
    return () => { if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null; };
  }, [selectedLang]);

  const notesKey = `lesson-notes-${lesson.id}`;

  useEffect(() => {
    const saved = localStorage.getItem(notesKey);
    if (saved) setNotes(saved);
    else setNotes("");
  }, [lesson.id, notesKey]);

  const saveNotes = useCallback((val: string) => {
    setNotes(val);
    localStorage.setItem(notesKey, val);
  }, [notesKey]);

  useEffect(() => {
    if (!showLangMenu) return;
    function handleClick(e: MouseEvent) {
      if (
        langMenuRef.current && !langMenuRef.current.contains(e.target as Node) &&
        langBtnRef.current && !langBtnRef.current.contains(e.target as Node)
      ) {
        setShowLangMenu(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setShowLangMenu(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showLangMenu]);

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const switchLanguage = useCallback((code: string) => {
    if (code === selectedLang) { setShowLangMenu(false); return; }
    setShowLangMenu(false);
    setLangSwitching(true);
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setTimeout(() => {
      setSelectedLang(code);
      setTimeout(() => setLangSwitching(false), 100);
    }, 200);
  }, [selectedLang]);

  const handleListenToggle = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }
    const readText = enriched?.overview
      ? `${lesson.title}. ${enriched.overview}. ${enriched.deepContent?.slice(0, 600) || lesson.content}`
      : `${lesson.title}. ${lesson.content}. Key points: ${lesson.keyPoints.join(". ")}`;

    const utterance = new SpeechSynthesisUtterance(readText);
    utterance.lang = selectedLang;
    utterance.rate = 0.88;
    utterance.pitch = 1.0;
    utterance.volume = 0.92;

    const voices = window.speechSynthesis?.getVoices() || [];
    const langPrefix = selectedLang.split("-")[0];
    let bestVoice = voices.find(v => v.lang.startsWith(langPrefix) && v.name.includes("Google"));
    if (!bestVoice) bestVoice = voices.find(v => v.lang === selectedLang);
    if (!bestVoice) bestVoice = voices.find(v => v.lang.startsWith(langPrefix));
    if (bestVoice) utterance.voice = bestVoice;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis?.speak(utterance);
  }, [isPlaying, lesson, selectedLang, enriched]);

  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); setIsPlaying(false); };
  }, [lesson.id]);

  // Fetch AI-enriched content
  useEffect(() => {
    let cancelled = false;
    async function fetchEnriched() {
      const langKey = selectedLang !== "en-US" ? `-${selectedLang}` : "";
      const cacheKey = `lesson-enrich-${lesson.id}${langKey}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try { setEnriched(JSON.parse(cached)); return; } catch { /* ignore */ }
      }
      setEnrichLoading(true);
      try {
        const res = await fetch(`${API_BASE}/enrich-lesson`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${publicAnonKey}`, apikey: publicAnonKey },
          body: JSON.stringify({
            categoryName: "Mastery Course",
            mentorName: mentorName || "Mentor",
            mentorTitle: mentorTitle || "AI Mentor",
            lessonTitle: lesson.title,
            lessonContent: lesson.content,
            specialties: specialties || [],
            language: selectedLang,
          }),
        });
        if (!res.ok) throw new Error(`Enrich API returned ${res.status}`);
        const data = await res.json();
        if (data.enriched && !cancelled) {
          setEnriched(data.enriched);
          localStorage.setItem(cacheKey, JSON.stringify(data.enriched));
        }
      } catch (err) {
        console.log("Enrichment failed, using static content:", err);
      } finally {
        if (!cancelled) setEnrichLoading(false);
      }
    }
    setEnriched(null);
    fetchEnriched();
    return () => { cancelled = true; };
  }, [lesson.id, lesson.title, lesson.content, mentorName, mentorTitle, specialties, selectedLang]);

  const contentStyle = useMemo(() => ({
    fontFamily: langConfig.fontFamily,
    lineHeight: langConfig.lineHeight,
  }), [langConfig]);

  const groupedLangs = useMemo(() => {
    const groups: Record<string, LanguageOption[]> = {};
    for (const g of GROUP_ORDER) groups[g] = [];
    for (const lang of LANGUAGES) groups[lang.group]?.push(lang);
    return groups;
  }, []);

  return (
    <motion.div
      key={lesson.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: langSwitching ? 0.3 : 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
      style={{ fontFamily: langConfig.fontFamily }}
    >
      {/* ── Lesson header ── */}
      <div>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="tracking-[0.12em] uppercase"
            style={{ fontSize: "0.5625rem", fontWeight: 700, color, fontFamily: "Inter, sans-serif" }}
          >
            Lesson
          </span>
          {selectedLang !== "en-US" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${color}08`, border: `1px solid ${color}15`, fontSize: "0.5rem", fontWeight: 600, color, fontFamily: "Inter, sans-serif" }}
            >
              <Globe size={8} />
              {langConfig.native}
            </motion.span>
          )}
        </div>
        <h1 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#000", lineHeight: 1.2, fontFamily: langConfig.fontFamily }}>
          {lesson.title}
        </h1>
        <p className="mt-2" style={{ fontSize: "0.75rem", fontWeight: 500, color: "#000" }}>
          {lesson.duration}
        </p>
      </div>

      {/* ── Action bar: Language, Listen, Notes ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Language selector */}
        <div className="relative">
          <button
            ref={langBtnRef}
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer hover:bg-black/[0.03]"
            style={{ border: "1px solid rgba(0,0,0,0.08)", fontSize: "0.625rem", fontWeight: 600, color: "#000", fontFamily: "Inter, sans-serif" }}
          >
            <Globe size={11} style={{ color }} />
            <span>{langConfig.native}</span>
            <motion.span animate={{ rotate: showLangMenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={9} className="text-black/30" />
            </motion.span>
          </button>
          <AnimatePresence>
            {showLangMenu && (
              <motion.div
                ref={langMenuRef}
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 top-full mt-1.5 z-50 rounded-xl overflow-hidden py-1.5 max-h-[340px] overflow-y-auto bg-white"
                style={{ border: "1px solid rgba(0,0,0,0.08)", minWidth: 200, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
              >
                {GROUP_ORDER.map(group => {
                  const langs = groupedLangs[group];
                  if (!langs?.length) return null;
                  return (
                    <div key={group}>
                      {GROUP_LABELS[group] && (
                        <div className="px-3 pt-2.5 pb-1" style={{ fontSize: "0.4375rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.25)", fontFamily: "Inter, sans-serif" }}>
                          {GROUP_LABELS[group]}
                        </div>
                      )}
                      {langs.map(lang => {
                        const isActive = selectedLang === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => switchLanguage(lang.code)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-black/[0.03] transition-colors cursor-pointer text-left ${isActive ? "bg-black/[0.03]" : ""}`}
                          >
                            <span className="w-[22px] text-center flex-shrink-0" style={{ fontSize: "0.5rem", fontWeight: 700, color: isActive ? color : "rgba(0,0,0,0.3)", fontFamily: "Inter, sans-serif" }}>
                              {lang.flag}
                            </span>
                            <div className="flex-1 min-w-0">
                              <span className="block truncate" style={{ fontSize: "0.6875rem", fontWeight: isActive ? 600 : 500, color: isActive ? "#000" : "rgba(0,0,0,0.6)", fontFamily: lang.fontFamily }}>
                                {lang.native}
                              </span>
                              {lang.native !== lang.label && (
                                <span className="block truncate" style={{ fontSize: "0.5rem", fontWeight: 400, color: "rgba(0,0,0,0.3)", fontFamily: "Inter, sans-serif" }}>
                                  {lang.label}
                                </span>
                              )}
                            </div>
                            {isActive && <Check size={10} style={{ color, flexShrink: 0 }} />}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Listen button */}
        <button
          onClick={handleListenToggle}
          disabled={!ttsAvailable && !isPlaying}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${!ttsAvailable && !isPlaying ? "opacity-35 !cursor-default" : "cursor-pointer hover:bg-black/[0.03]"}`}
          style={{
            backgroundColor: isPlaying ? `${color}08` : "transparent",
            border: `1px solid ${isPlaying ? `${color}25` : "rgba(0,0,0,0.08)"}`,
            fontSize: "0.625rem", fontWeight: 600,
            color: isPlaying ? color : "#000",
            fontFamily: "Inter, sans-serif"
          }}
        >
          {isPlaying ? <Pause size={11} /> : <Play size={11} />}
          {!ttsAvailable ? "No voice" : isPlaying ? "Pause" : "Listen"}
        </button>

        {/* Notes button */}
        <button
          onClick={onOpenNotes}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer hover:bg-black/[0.03]"
          style={{
            backgroundColor: showNotes ? `${color}08` : "transparent",
            border: `1px solid ${showNotes ? `${color}25` : "rgba(0,0,0,0.08)"}`,
            fontSize: "0.625rem", fontWeight: 600,
            color: showNotes ? color : "#000",
            fontFamily: "Inter, sans-serif"
          }}
        >
          <StickyNote size={11} />
          Notes {notes.length > 0 && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
        </button>
      </div>

      {/* ── Notes slide-in ── */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl p-5" style={{ backgroundColor: `${color}04`, border: `1px solid ${color}12` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StickyNote size={12} style={{ color }} />
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#000", fontFamily: "Inter, sans-serif" }}>Your Notes</span>
                </div>
                <span style={{ fontSize: "0.5rem", fontWeight: 500, color: "rgba(0,0,0,0.3)", fontFamily: "Inter, sans-serif" }}>
                  {notes.length > 0 ? "Auto-saved" : ""}
                </span>
              </div>
              <textarea
                value={notes}
                onChange={e => saveNotes(e.target.value)}
                placeholder="Write your thoughts, key takeaways, questions..."
                className="w-full bg-transparent outline-none resize-none placeholder:text-black/20"
                style={{ fontSize: "0.8125rem", lineHeight: 1.8, minHeight: 100, color: "#000", fontFamily: langConfig.fontFamily }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Expandable: Overview ── */}
      <SectionAccordion
        icon={BookOpen}
        label="Overview & Explanation"
        color={color}
        isOpen={!!expandedSections.overview}
        onToggle={() => toggleSection("overview")}
      >
        <div className="space-y-3" style={{ fontSize: "0.875rem", fontWeight: 400, color: "#000", ...contentStyle }}>
          {lesson.content.split("\n\n").map((p, i) => (<p key={i}>{p}</p>))}
        </div>
      </SectionAccordion>

      {/* ── Expandable: Key Points ── */}
      <SectionAccordion
        icon={Target}
        label="Key Concepts"
        color={color}
        count={lesson.keyPoints.length}
        isOpen={!!expandedSections.keypoints}
        onToggle={() => toggleSection("keypoints")}
      >
        <div className="space-y-3">
          {lesson.keyPoints.map((kp, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${color}10` }}>
                <Check size={8} style={{ color }} />
              </div>
              <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#000", ...contentStyle }}>{kp}</p>
            </div>
          ))}
        </div>
      </SectionAccordion>

      {/* ── Expandable: Practice ── */}
      <SectionAccordion
        icon={Lightbulb}
        label="Practice Task"
        color={color}
        isOpen={!!expandedSections.practice}
        onToggle={() => toggleSection("practice")}
        accent
      >
        <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000", ...contentStyle }}>{lesson.practiceTask}</p>
      </SectionAccordion>

      {/* ── Expandable: Reflection ── */}
      <SectionAccordion
        icon={MessageCircle}
        label="Reflection Prompt"
        color={color}
        isOpen={!!expandedSections.reflection}
        onToggle={() => toggleSection("reflection")}
      >
        <p className="italic" style={{ fontSize: "0.875rem", fontWeight: 500, color: "#000", ...contentStyle }}>
          "{lesson.reflectionQuestion}"
        </p>
      </SectionAccordion>

      {/* ── AI-Enriched Content ── */}
      {enrichLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl p-6"
          style={{ backgroundColor: `${color}04`, border: `1px solid ${color}10` }}
        >
          <div className="flex items-center gap-3">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}>
              <Sparkles size={14} style={{ color }} />
            </motion.div>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#000", fontFamily: "Inter, sans-serif" }}>
                Generating enriched content{selectedLang !== "en-US" ? ` in ${langConfig.native}` : ""}...
              </span>
              <span className="block mt-0.5" style={{ fontSize: "0.5rem", fontWeight: 400, color: "rgba(0,0,0,0.35)", fontFamily: "Inter, sans-serif" }}>
                Powered by Gemini 2.0 Flash
              </span>
            </div>
          </div>
          <div className="mt-4 space-y-2.5">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                className="h-3 rounded-md"
                style={{ backgroundColor: "rgba(0,0,0,0.04)", width: `${85 - i * 15}%` }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {enriched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-5"
        >
          {/* Learning Outcomes */}
          {enriched.learningOutcomes?.length > 0 && (
            <div className="rounded-2xl p-5" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Target size={12} style={{ color }} />
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, color, fontFamily: "Inter, sans-serif" }}>Learning Outcomes</span>
                <span className="ml-auto px-1.5 py-0.5 rounded-md" style={{ fontSize: "0.5rem", fontWeight: 700, background: `${color}08`, color, fontFamily: "Inter, sans-serif" }}>AI</span>
              </div>
              <div className="space-y-2.5">
                {enriched.learningOutcomes.map((o: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex-shrink-0" style={{ fontSize: "0.625rem", fontWeight: 700, color: "rgba(0,0,0,0.2)", fontFamily: "Inter, sans-serif" }}>{String(i+1).padStart(2,"0")}</span>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#000", ...contentStyle }}>{o}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Deep Content */}
          {enriched.deepContent && (
            <SectionAccordion
              icon={BookOpen}
              label="Deep Dive"
              color={color}
              badge="AI"
              isOpen={!!expandedSections.deepdive}
              onToggle={() => toggleSection("deepdive")}
            >
              <div className="space-y-3" style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000", ...contentStyle }}>
                {enriched.deepContent.split("\n\n").map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </SectionAccordion>
          )}

          {/* Examples */}
          {enriched.examples?.length > 0 && (
            <SectionAccordion
              icon={Lightbulb}
              label="Real-World Examples"
              color={color}
              count={enriched.examples.length}
              badge="AI"
              isOpen={!!expandedSections.examples}
              onToggle={() => toggleSection("examples")}
            >
              <div className="space-y-3">
                {enriched.examples.map((ex: {title: string; description: string}, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl p-4"
                    style={{ background: "rgba(0,0,0,0.02)" }}
                  >
                    <p className="mb-1.5" style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000", fontFamily: langConfig.fontFamily }}>{ex.title}</p>
                    <p style={{ fontSize: "0.75rem", fontWeight: 400, color: "#000", ...contentStyle }}>{ex.description}</p>
                  </motion.div>
                ))}
              </div>
            </SectionAccordion>
          )}

          {/* Exercises */}
          {enriched.exercises?.length > 0 && (
            <SectionAccordion
              icon={Award}
              label="Exercises"
              color={color}
              count={enriched.exercises.length}
              badge="AI"
              accent
              isOpen={!!expandedSections.exercises}
              onToggle={() => toggleSection("exercises")}
            >
              <div className="space-y-3">
                {enriched.exercises.map((ex: {title: string; instruction: string; difficulty: string}, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl p-4"
                    style={{ background: "rgba(0,0,0,0.02)" }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000", fontFamily: langConfig.fontFamily }}>{ex.title}</p>
                      <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.5rem", fontWeight: 600, background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.4)", textTransform: "capitalize", fontFamily: "Inter, sans-serif" }}>{ex.difficulty}</span>
                    </div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 400, color: "#000", ...contentStyle }}>{ex.instruction}</p>
                  </motion.div>
                ))}
              </div>
            </SectionAccordion>
          )}

          {/* Reflection Prompts (AI) */}
          {enriched.reflectionPrompts?.length > 0 && (
            <div className="rounded-2xl p-5" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle size={12} style={{ color }} />
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, color, fontFamily: "Inter, sans-serif" }}>Reflection Prompts</span>
                <span className="ml-auto px-1.5 py-0.5 rounded-md" style={{ fontSize: "0.5rem", fontWeight: 700, background: `${color}08`, color, fontFamily: "Inter, sans-serif" }}>AI</span>
              </div>
              <div className="space-y-3">
                {enriched.reflectionPrompts.map((rp: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2.5" style={{ backgroundColor: `${color}40` }} />
                    <p className="italic" style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#000", ...contentStyle }}>"{rp}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {enriched.resources?.length > 0 && (
            <SectionAccordion
              icon={BookOpen}
              label="Recommended Resources"
              color={color}
              badge="AI"
              isOpen={!!expandedSections.resources}
              onToggle={() => toggleSection("resources")}
            >
              <div className="space-y-2.5">
                {enriched.resources.map((r: {title: string; type: string; description: string}, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="px-1.5 py-0.5 rounded-md flex-shrink-0 mt-0.5" style={{ fontSize: "0.4375rem", fontWeight: 700, background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.35)", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>{r.type}</span>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#000", fontFamily: langConfig.fontFamily }}>{r.title}</p>
                      <p style={{ fontSize: "0.6875rem", fontWeight: 400, color: "rgba(0,0,0,0.5)", ...contentStyle }}>{r.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionAccordion>
          )}

          {/* Project Idea */}
          {enriched.projectIdea && (
            <SectionAccordion
              icon={Sparkles}
              label="Capstone Project"
              color="#D4A017"
              badge="AI"
              isOpen={!!expandedSections.project}
              onToggle={() => toggleSection("project")}
            >
              <div>
                <p className="mb-2" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#000", fontFamily: langConfig.fontFamily }}>{enriched.projectIdea.title}</p>
                <p className="mb-4" style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000", ...contentStyle }}>{enriched.projectIdea.description}</p>
                {enriched.projectIdea.steps?.length > 0 && (
                  <div className="space-y-2.5">
                    {enriched.projectIdea.steps.map((step: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: "rgba(212,160,23,0.08)", fontSize: "0.5rem", fontWeight: 800, color: "#D4A017", fontFamily: "Inter, sans-serif" }}>{i+1}</span>
                        <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "#000", ...contentStyle }}>{step}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </SectionAccordion>
          )}
        </motion.div>
      )}

      {/* ── Complete + Navigation ── */}
      <div className="pt-4 space-y-4">
        {/* Lesson position indicator */}
        {lessonPosition && (
          <p style={{ fontSize: "0.5625rem", fontWeight: 500, color: "rgba(0,0,0,0.3)", fontFamily: "Inter, sans-serif" }}>
            {lessonPosition}
          </p>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onComplete}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl transition-all duration-300 cursor-pointer ${
              isComplete ? "" : "text-white hover:scale-[1.02] active:scale-[0.98]"
            }`}
            style={{
              backgroundColor: isComplete ? `${color}08` : color,
              color: isComplete ? color : "#fff",
              border: isComplete ? `1px solid ${color}20` : "none",
              fontSize: "0.8125rem",
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {isComplete ? (
              <><Check size={14} /> Completed</>
            ) : (
              <><Award size={14} /> Mark as Complete</>
            )}
          </button>

          {/* Next lesson prompt — appears after completion */}
          <AnimatePresence>
            {isComplete && onNextLesson && nextLessonTitle && (
              <motion.button
                initial={{ opacity: 0, x: -12, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={onNextLesson}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <span>Next Lesson</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Next lesson preview card */}
        <AnimatePresence>
          {isComplete && onNextLesson && nextLessonTitle && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              onClick={onNextLesson}
              className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer group hover:bg-black/[0.02] transition-colors"
              style={{ border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${color}08`, border: `1px solid ${color}12` }}
              >
                <SkipForward size={16} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: "0.5rem", fontWeight: 700, color, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
                  Up Next
                </p>
                <p className="truncate" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000", fontFamily: "Inter, sans-serif" }}>
                  {nextLessonTitle}
                </p>
              </div>
              <ArrowRight size={14} style={{ color: "rgba(0,0,0,0.2)" }} className="flex-shrink-0 transition-transform group-hover:translate-x-1" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prev/Next lesson navigation */}
        <div className="flex items-center gap-2 pt-2">
          {onPrevLesson && prevLessonTitle && (
            <button
              onClick={onPrevLesson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-black/[0.03] cursor-pointer"
              style={{ border: "1px solid rgba(0,0,0,0.06)", fontSize: "0.625rem", fontWeight: 600, color: "rgba(0,0,0,0.4)", fontFamily: "Inter, sans-serif" }}
              title={prevLessonTitle}
            >
              <ChevronLeft size={11} />
              <span className="max-w-[120px] truncate">Previous</span>
            </button>
          )}
          <div className="flex-1" />
          {onNextLesson && nextLessonTitle && !isComplete && (
            <button
              onClick={onNextLesson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-black/[0.03] cursor-pointer"
              style={{ border: "1px solid rgba(0,0,0,0.06)", fontSize: "0.625rem", fontWeight: 600, color: "rgba(0,0,0,0.4)", fontFamily: "Inter, sans-serif" }}
              title={nextLessonTitle}
            >
              <span className="max-w-[120px] truncate">Next</span>
              <ChevronRight size={11} />
            </button>
          )}
        </div>

        {/* Keyboard shortcuts hint (desktop only) */}
        <div className="hidden lg:flex items-center gap-3 pt-2 pb-1">
          <Keyboard size={10} style={{ color: "rgba(0,0,0,0.15)" }} />
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { keys: "Alt + \u2191\u2193", label: "Navigate lessons" },
              { keys: "Alt + N", label: "Notes" },
              { keys: "Alt + M", label: "Mute" },
              { keys: "Alt + Enter", label: "Complete" },
            ].map((s) => (
              <span key={s.keys} className="flex items-center gap-1" style={{ fontSize: "0.4375rem", fontWeight: 500, color: "rgba(0,0,0,0.2)", fontFamily: "Inter, sans-serif" }}>
                <span className="px-1 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.04)", fontSize: "0.4375rem", fontWeight: 600 }}>{s.keys}</span>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Section Accordion (reusable)
   ──────────────────────────────────────────── */

function SectionAccordion({
  icon: Icon,
  label,
  color,
  count,
  badge,
  accent,
  isOpen,
  onToggle,
  children,
}: {
  icon: any;
  label: string;
  color: string;
  count?: number;
  badge?: string;
  accent?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: accent ? `${color}04` : "transparent",
        border: `1px solid ${accent ? `${color}12` : "rgba(0,0,0,0.06)"}`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2.5 px-5 py-4 hover:bg-black/[0.01] transition-colors cursor-pointer text-left"
      >
        <Icon size={13} style={{ color }} />
        <span style={{ fontSize: "0.6875rem", fontWeight: 700, color, fontFamily: "Inter, sans-serif" }}>{label}</span>
        {count !== undefined && (
          <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: "0.5rem", fontWeight: 600, background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.35)", fontFamily: "Inter, sans-serif" }}>{count}</span>
        )}
        {badge && (
          <span className="px-1.5 py-0.5 rounded-md" style={{ fontSize: "0.5rem", fontWeight: 700, background: `${color}08`, color, fontFamily: "Inter, sans-serif" }}>{badge}</span>
        )}
        <motion.span className="ml-auto" animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight size={11} style={{ color: accent ? `${color}40` : "rgba(0,0,0,0.2)" }} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────
   Right Panel — Mentor Chat
   ──────────────────────────────────────────── */

function MentorChatPanel({
  mentor,
  color,
  mood,
  messages,
  isTyping,
  input,
  setInput,
  handleSubmit,
  toggleMic,
  isListening,
  isMuted,
  handleMuteToggle,
  isMentorSpeaking,
  suggestedActions,
  sendMessage,
  chatEndRef,
  inputRef,
  isAIMode,
}: {
  mentor: MentorPersona;
  color: string;
  mood: MentorMood;
  messages: ChatMessage[];
  isTyping: boolean;
  input: string;
  setInput: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  toggleMic: () => void;
  isListening: boolean;
  isMuted: boolean;
  handleMuteToggle: () => void;
  isMentorSpeaking: boolean;
  suggestedActions: { icon: any; text: string }[];
  sendMessage: (text: string) => void;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isAIMode: boolean | null;
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <MentorPresence
            mood={mood}
            color={color}
            initials={mentor.initials}
            name={mentor.name}
            title={mentor.title}
          />
          <div className="flex items-center gap-1.5">
            {isAIMode !== null && (
              <span
                className="flex items-center gap-1 px-2 py-1 rounded-lg"
                style={{
                  fontSize: "0.5rem", fontWeight: 700,
                  backgroundColor: isAIMode ? "rgba(16,185,129,0.08)" : "rgba(0,0,0,0.03)",
                  color: isAIMode ? "#10b981" : "rgba(0,0,0,0.3)",
                  border: `1px solid ${isAIMode ? "rgba(16,185,129,0.15)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <Sparkles size={8} />
                {isAIMode ? "AI" : "Offline"}
              </span>
            )}
            <button
              onClick={handleMuteToggle}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/[0.04] transition-all cursor-pointer"
              style={{ color: isMuted ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.4)" }}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>

        {/* Speaking waveform */}
        <AnimatePresence>
          {isMentorSpeaking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-2"
            >
              <VoiceWaveform active={true} color={color} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ scrollbarWidth: "none" }}>
        <div className="space-y-3">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] px-4 py-3 rounded-2xl ${
                  msg.role === "user" ? "rounded-br-md" : "rounded-bl-md"
                }`}
                style={
                  msg.role === "user"
                    ? { backgroundColor: color, color: "#fff" }
                    : { backgroundColor: "rgba(0,0,0,0.03)", color: "#000", border: "1px solid rgba(0,0,0,0.06)" }
                }
              >
                {msg.role === "mentor" && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles size={9} style={{ color }} />
                    <span style={{ fontSize: "0.5rem", fontWeight: 700, color }}>{mentor.name}</span>
                  </div>
                )}
                <p style={{ fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.75, whiteSpace: "pre-line" }}>
                  {msg.text}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div
                className="px-4 py-3 rounded-2xl rounded-bl-md"
                style={{ backgroundColor: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <TypingIndicator color={color} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested actions */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {suggestedActions.map((action) => {
              const I = action.icon;
              return (
                <button
                  key={action.text}
                  onClick={() => sendMessage(action.text)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-black/[0.04] cursor-pointer"
                  style={{
                    border: "1px solid rgba(0,0,0,0.06)",
                    fontSize: "0.6875rem", fontWeight: 500, color: "#000",
                  }}
                >
                  <I size={11} style={{ color }} />
                  {action.text}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Listening indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5"
          >
            <div className="flex items-center justify-center gap-3 py-2">
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#ef4444" }}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#000" }}>Listening...</span>
              <VoiceWaveform active={true} color={color} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="flex-shrink-0 px-5 py-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMic}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0 ${
              isListening ? "bg-red-50 text-red-500" : "hover:bg-black/[0.04]"
            }`}
            style={{
              border: `1px solid ${isListening ? "rgba(239,68,68,0.2)" : "rgba(0,0,0,0.08)"}`,
              color: isListening ? undefined : "rgba(0,0,0,0.4)",
            }}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <div className="flex-1 flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${mentor.name}...`}
              className="flex-1 bg-transparent px-4 py-2.5 outline-none placeholder:text-black/20"
              style={{ fontSize: "0.8125rem", color: "#000" }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-lg flex items-center justify-center mr-1 transition-all cursor-pointer disabled:opacity-20"
              style={{ backgroundColor: input.trim() ? color : "transparent" }}
            >
              <Send size={14} className={input.trim() ? "text-white" : "text-black/30"} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Mobile Tab Bar
   ──────────────────────────────────────────── */

type MobileTab = "curriculum" | "lesson" | "mentor";

function MobileTabBar({
  activeTab,
  onTabChange,
  color,
  hasActiveLesson,
}: {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  color: string;
  hasActiveLesson: boolean;
}) {
  const tabs: { id: MobileTab; icon: any; label: string }[] = [
    { id: "curriculum", icon: Layers, label: "Lessons" },
    { id: "lesson", icon: BookOpen, label: "Content" },
    { id: "mentor", icon: MessageCircle, label: "Mentor" },
  ];

  return (
    <div className="flex-shrink-0 flex items-center justify-around py-2 px-4 bg-white" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all cursor-pointer"
            style={{
              backgroundColor: isActive ? `${color}08` : "transparent",
            }}
          >
            <Icon size={16} style={{ color: isActive ? color : "rgba(0,0,0,0.3)" }} />
            <span style={{ fontSize: "0.5rem", fontWeight: isActive ? 700 : 500, color: isActive ? color : "rgba(0,0,0,0.4)" }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Session Page
   ──────────────────────────────────────────── */

export function MentorSessionPage() {
  const { categorySlug, mentorId } = useParams();
  const navigate = useNavigate();

  const category = categorySlug ? getMentorCategory(categorySlug) : undefined;
  const mentor = categorySlug && mentorId ? getMentor(categorySlug, mentorId) : undefined;

  const [activeLesson, setActiveLesson] = useState<MentorLesson | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState<MentorMood>("idle");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [isAIMode, setIsAIMode] = useState<boolean | null>(null);
  const [milestonePopup, setMilestonePopup] = useState<string | null>(null);
  const [isMentorSpeaking, setIsMentorSpeaking] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("curriculum");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const lessonScrollRef = useRef<HTMLDivElement>(null);

  // Load progress
  useEffect(() => {
    fetchProgress().then((p) => setProgress(p));
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Scroll lesson content to top on lesson change
  useEffect(() => {
    if (activeLesson && lessonScrollRef.current) {
      lessonScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeLesson?.id]);

  // Ensure voices loaded
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Auto-greet
  useEffect(() => {
    if (!mentor) return;
    const timer = setTimeout(() => {
      const greetingMsg: ChatMessage = { id: "greeting", role: "mentor", text: mentor.greeting };
      setMessages([greetingMsg]);
      if (!isMuted) {
        setMood("speaking");
        setIsMentorSpeaking(true);
        speak(
          mentor.greeting,
          mentor.voiceConfig,
          () => { setMood("speaking"); setIsMentorSpeaking(true); },
          () => { setMood("idle"); setIsMentorSpeaking(false); },
        );
      }
    }, 800);
    return () => { clearTimeout(timer); stopSpeaking(); };
  }, [mentor]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMuteToggle = useCallback(() => {
    if (!isMuted) { stopSpeaking(); setIsMentorSpeaking(false); setMood((m) => (m === "speaking" ? "idle" : m)); }
    setIsMuted((m) => !m);
  }, [isMuted]);

  const speakResponse = useCallback(
    (text: string) => {
      if (isMuted || !mentor) { setMood("idle"); return; }
      setIsMentorSpeaking(true);
      speak(text, mentor.voiceConfig, () => { setMood("speaking"); setIsMentorSpeaking(true); }, () => { setMood("idle"); setIsMentorSpeaking(false); });
    },
    [isMuted, mentor],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !mentor) return;
      const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text: text.trim() };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setMood("thinking");
      setIsTyping(true);
      try {
        const { text: reply, isAI } = await getAIResponse(updatedMessages, mentor, activeLesson);
        if (isAIMode === null) setIsAIMode(isAI);
        const mentorMsg: ChatMessage = { id: `m-${Date.now()}`, role: "mentor", text: reply };
        setMessages((prev) => [...prev, mentorMsg]);
        setIsTyping(false);
        speakResponse(reply);
      } catch {
        const response = generateLocalResponse(text, mentor, activeLesson);
        setMessages((prev) => [...prev, { id: `m-${Date.now()}`, role: "mentor", text: response }]);
        setIsTyping(false);
        speakResponse(response);
      }
    },
    [mentor, activeLesson, speakResponse, messages, isAIMode],
  );

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };

  const toggleMic = useCallback(() => {
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsListening(true);
      setTimeout(() => { setIsListening(false); sendMessage("Can you explain this concept in more detail?"); }, 2500);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      if (transcript.trim()) sendMessage(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    setIsListening(true);
    recognition.start();
  }, [isListening, sendMessage]);

  const completeLesson = useCallback(() => {
    if (!activeLesson) return;
    const wasComplete = progress[activeLesson.id];
    const next = { ...progress, [activeLesson.id]: true };
    setProgress(next);
    persistProgress(next);
    if (!wasComplete) {
      setMood("celebrating");
      setMilestonePopup(activeLesson.title);
      setTimeout(() => setMood("idle"), 3000);
      logActivity({
        type: "lesson_completed",
        title: `Completed: ${activeLesson.title}`,
        detail: `${mentor?.name ?? "Mentor"} — ${activeLesson.duration}`,
        mentorId: mentor?.id,
        categorySlug: category?.slug,
      }).catch(() => {});
    }
  }, [activeLesson, progress, mentor, category]);

  // Flatten all lessons for sequential navigation
  const allLessons = useMemo(() => {
    if (!mentor) return [];
    return mentor.course.modules.flatMap((m) => m.lessons);
  }, [mentor]);

  const currentLessonIndex = useMemo(() => {
    if (!activeLesson) return -1;
    return allLessons.findIndex((l) => l.id === activeLesson.id);
  }, [activeLesson, allLessons]);

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex >= 0 && currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const navigateToLesson = useCallback((lesson: MentorLesson) => {
    setActiveLesson(lesson);
    setShowNotes(false);
    setMobileTab("lesson");
  }, []);

  const goNextLesson = useCallback(() => {
    if (nextLesson) navigateToLesson(nextLesson);
  }, [nextLesson, navigateToLesson]);

  const goPrevLesson = useCallback(() => {
    if (prevLesson) navigateToLesson(prevLesson);
  }, [prevLesson, navigateToLesson]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger when typing in input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.altKey) {
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            goPrevLesson();
            break;
          case "ArrowDown":
            e.preventDefault();
            goNextLesson();
            break;
          case "n":
          case "N":
            e.preventDefault();
            setShowNotes((s) => !s);
            break;
          case "m":
          case "M":
            e.preventDefault();
            handleMuteToggle();
            break;
          case "Enter":
            e.preventDefault();
            if (activeLesson && !progress[activeLesson.id]) {
              completeLesson();
            }
            break;
        }
      }
      // Escape closes notes
      if (e.key === "Escape" && showNotes) {
        setShowNotes(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrevLesson, goNextLesson, handleMuteToggle, activeLesson, progress, completeLesson, showNotes]);

  // Not found
  if (!category || !mentor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#000" }}>
            Mentor not found
          </h1>
          <button
            onClick={() => navigate("/tools")}
            className="px-6 py-3 rounded-full bg-black text-white cursor-pointer"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            Back to Mastery Space
          </button>
        </div>
      </div>
    );
  }

  const color = mentor.envTheme.accent;

  const suggestedActions = activeLesson
    ? [
        { icon: BookOpen, text: "Explain this lesson" },
        { icon: Target, text: "Give me a practice task" },
        { icon: MessageCircle, text: "Reflection question" },
        { icon: Sparkles, text: "Summarize key points" },
      ]
    : [
        { icon: BookOpen, text: "Tell me about this course" },
        { icon: Target, text: "Where should I start?" },
        { icon: Sparkles, text: "What skills will I gain?" },
        { icon: Lightbulb, text: "Motivate me" },
      ];

  const totalL = mentor.course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const doneL = mentor.course.modules.reduce((s, m) => s + m.lessons.filter(l => progress[l.id]).length, 0);
  const pctDone = totalL > 0 ? Math.round((doneL / totalL) * 100) : 0;

  const handleSelectLesson = (l: MentorLesson) => {
    setActiveLesson(l);
    setShowNotes(false);
    setMobileTab("lesson");
  };

  const lessonPosition = currentLessonIndex >= 0
    ? `Lesson ${currentLessonIndex + 1} of ${allLessons.length}`
    : undefined;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <MilestoneUnlock
        show={!!milestonePopup}
        lessonTitle={milestonePopup || ""}
        color={color}
        onClose={() => setMilestonePopup(null)}
        onNextLesson={nextLesson ? goNextLesson : undefined}
        nextLessonTitle={nextLesson?.title}
      />

      {/* ═══ TOP BAR ═══ */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/tools/${categorySlug}`)}
            className="flex items-center gap-1.5 hover:text-black/70 transition-colors cursor-pointer"
            style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(0,0,0,0.4)" }}
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="w-px h-4 bg-black/8" />
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `${color}08`, border: `1.5px solid ${color}15` }}
            >
              <span style={{ fontSize: "0.5625rem", fontWeight: 800, color }}>{mentor.initials}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000" }}>
                  {mentor.name}
                </p>
                {mentor.isMaster && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ background: "#D4A01708", border: "1px solid #D4A01715" }}>
                    <Crown size={7} style={{ color: "#D4A017" }} />
                    <span style={{ fontSize: "0.4375rem", fontWeight: 700, color: "#D4A017" }}>MASTER</span>
                  </span>
                )}
              </div>
              <p style={{ fontSize: "0.5rem", fontWeight: 500, color: "rgba(0,0,0,0.4)" }}>
                {mentor.title} &middot; {mentor.course.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PROGRESS BAR ═══ */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-2.5 flex items-center gap-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.04)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            animate={{ width: `${pctDone}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: pctDone === 100 ? "#10b981" : color }}>{pctDone}%</span>
        <span style={{ fontSize: "0.5625rem", fontWeight: 500, color: "rgba(0,0,0,0.35)" }}>
          {doneL}/{totalL} lessons
        </span>
        {mentor.course.learningDuration && (
          <span className="hidden sm:flex items-center gap-1" style={{ fontSize: "0.5625rem", fontWeight: 500, color: "rgba(0,0,0,0.25)" }}>
            <Clock size={9} />
            {mentor.course.learningDuration}
          </span>
        )}
      </div>

      {/* ═══ MAIN THREE-COLUMN LAYOUT (Desktop) ═══ */}
      <div className="flex-1 hidden lg:flex overflow-hidden">
        {/* LEFT — Curriculum */}
        <motion.div
          className="w-72 xl:w-80 flex-shrink-0 overflow-hidden"
          style={{ borderRight: "1px solid rgba(0,0,0,0.06)" }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <CurriculumSidebar
            modules={mentor.course.modules}
            progress={progress}
            activeLesson={activeLesson}
            onSelectLesson={handleSelectLesson}
            color={color}
            courseName={mentor.course.title}
            learningDuration={mentor.course.learningDuration}
          />
        </motion.div>

        {/* CENTER — Lesson Content */}
        <div ref={lessonScrollRef} className="flex-1 overflow-y-auto min-w-0" style={{ scrollbarWidth: "none" }}>
          <div className="max-w-2xl mx-auto px-8 py-8">
            <AnimatePresence mode="wait">
              {activeLesson ? (
                <LessonContent
                  key={activeLesson.id}
                  lesson={activeLesson}
                  color={color}
                  isComplete={!!progress[activeLesson.id]}
                  onComplete={completeLesson}
                  mentorName={mentor.name}
                  mentorTitle={mentor.title}
                  specialties={mentor.specialties}
                  onOpenNotes={() => setShowNotes(!showNotes)}
                  showNotes={showNotes}
                  onNextLesson={nextLesson ? goNextLesson : undefined}
                  nextLessonTitle={nextLesson?.title}
                  onPrevLesson={prevLesson ? goPrevLesson : undefined}
                  prevLessonTitle={prevLesson?.title}
                  lessonPosition={lessonPosition}
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${color}06`, border: `1px solid ${color}12` }}
                  >
                    <GraduationCap size={24} style={{ color }} />
                  </div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000", marginBottom: "8px" }}>
                    Ready to begin?
                  </h2>
                  <p style={{ fontSize: "0.875rem", fontWeight: 400, color: "#000", maxWidth: 320, lineHeight: 1.7 }}>
                    Select a lesson from the curriculum on the left, or start a conversation with {mentor.name}.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT — Mentor Chat */}
        <motion.div
          className="w-80 xl:w-96 flex-shrink-0 overflow-hidden"
          style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <MentorChatPanel
            mentor={mentor}
            color={color}
            mood={mood}
            messages={messages}
            isTyping={isTyping}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            toggleMic={toggleMic}
            isListening={isListening}
            isMuted={isMuted}
            handleMuteToggle={handleMuteToggle}
            isMentorSpeaking={isMentorSpeaking}
            suggestedActions={suggestedActions}
            sendMessage={sendMessage}
            chatEndRef={chatEndRef}
            inputRef={inputRef}
            isAIMode={isAIMode}
          />
        </motion.div>
      </div>

      {/* ═══ MOBILE LAYOUT ═══ */}
      <div className="flex-1 flex flex-col overflow-hidden lg:hidden">
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {mobileTab === "curriculum" && (
              <motion.div
                key="curriculum"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0 overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
              >
                <CurriculumSidebar
                  modules={mentor.course.modules}
                  progress={progress}
                  activeLesson={activeLesson}
                  onSelectLesson={handleSelectLesson}
                  color={color}
                  courseName={mentor.course.title}
                  learningDuration={mentor.course.learningDuration}
                />
              </motion.div>
            )}
            {mobileTab === "lesson" && (
              <motion.div
                key="lesson"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0 overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="px-5 py-6">
                  {activeLesson ? (
                    <LessonContent
                      key={activeLesson.id}
                      lesson={activeLesson}
                      color={color}
                      isComplete={!!progress[activeLesson.id]}
                      onComplete={completeLesson}
                      mentorName={mentor.name}
                      mentorTitle={mentor.title}
                      specialties={mentor.specialties}
                      onOpenNotes={() => setShowNotes(!showNotes)}
                      showNotes={showNotes}
                      onNextLesson={nextLesson ? goNextLesson : undefined}
                      nextLessonTitle={nextLesson?.title}
                      onPrevLesson={prevLesson ? goPrevLesson : undefined}
                      prevLessonTitle={prevLesson?.title}
                      lessonPosition={lessonPosition}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${color}06`, border: `1px solid ${color}12` }}
                      >
                        <GraduationCap size={22} style={{ color }} />
                      </div>
                      <h2 style={{ fontSize: "1.125rem", fontWeight: 800, color: "#000", marginBottom: "8px" }}>
                        Select a lesson
                      </h2>
                      <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000", maxWidth: 280, lineHeight: 1.7 }}>
                        Tap the Lessons tab to choose a lesson and begin learning.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            {mobileTab === "mentor" && (
              <motion.div
                key="mentor"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <MentorChatPanel
                  mentor={mentor}
                  color={color}
                  mood={mood}
                  messages={messages}
                  isTyping={isTyping}
                  input={input}
                  setInput={setInput}
                  handleSubmit={handleSubmit}
                  toggleMic={toggleMic}
                  isListening={isListening}
                  isMuted={isMuted}
                  handleMuteToggle={handleMuteToggle}
                  isMentorSpeaking={isMentorSpeaking}
                  suggestedActions={suggestedActions}
                  sendMessage={sendMessage}
                  chatEndRef={chatEndRef}
                  inputRef={inputRef}
                  isAIMode={isAIMode}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MobileTabBar
          activeTab={mobileTab}
          onTabChange={setMobileTab}
          color={color}
          hasActiveLesson={!!activeLesson}
        />
      </div>
    </div>
  );
}
