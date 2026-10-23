import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Feather,
  Download,
  ChevronLeft,
  ChevronRight,
  Save,
  Check,
  RotateCcw,
  Lightbulb,
  PenLine,
  Clock,
  Trash2,
} from "lucide-react";

/* ─── Prompt Data ─── */

const reflectionPrompts = [
  {
    id: "skill",
    question: "What's one skill you gained this week?",
    hint: "Think about something new you learned, practised, or improved — even something small.",
    category: "Growth",
  },
  {
    id: "apply",
    question: "How will you apply your potential today?",
    hint: "Name one concrete action you can take in the next 24 hours.",
    category: "Action",
  },
  {
    id: "gratitude",
    question: "What's one thing you're grateful you tried, even if it didn't go perfectly?",
    hint: "Imperfect attempts often teach us the most. What comes to mind?",
    category: "Gratitude",
  },
  {
    id: "barrier",
    question: "What barrier have you overcome recently that you didn't think you could?",
    hint: "It could be a fear, a skill gap, a time constraint — anything that once felt impossible.",
    category: "Resilience",
  },
  {
    id: "inspire",
    question: "Who inspired you recently, and what did they teach you?",
    hint: "A friend, a stranger, a historical figure, or someone on this site.",
    category: "Inspiration",
  },
  {
    id: "next",
    question: "If you could master one thing in the next year, what would it be?",
    hint: "Dream without limits. What excites you most?",
    category: "Vision",
  },
];

/* ─── Storage helpers ─── */

const STORAGE_KEY = "ahp-reflection-journal";

interface JournalEntry {
  promptId: string;
  text: string;
  savedAt: string;
}

function loadEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: JournalEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/* ─── Worksheet generator ─── */

function generateWorksheet(entries: JournalEntry[]): string {
  const divider = "─".repeat(56);
  const now = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let text = `ANYTHING HUMANLY POSSIBLE\nPersonal Reflection Worksheet\n${now}\n${divider}\n\n`;

  reflectionPrompts.forEach((prompt, i) => {
    const entry = entries.find((e) => e.promptId === prompt.id);
    text += `${i + 1}. [${prompt.category}] ${prompt.question}\n`;
    text += `   Hint: ${prompt.hint}\n\n`;
    if (entry?.text.trim()) {
      text += `   Your response:\n`;
      entry.text.split("\n").forEach((line) => {
        text += `   ${line}\n`;
      });
      text += `   (saved ${new Date(entry.savedAt).toLocaleDateString()})\n`;
    } else {
      text += `   Your response:\n   _____________________________________________\n   _____________________________________________\n   _____________________________________________\n`;
    }
    text += `\n${divider}\n\n`;
  });

  text += `\nRemember: Your potential is limitless.\nKeep reflecting. Keep growing. Keep going.\n\n— The AHP Team\n`;
  return text;
}

function downloadWorksheet(entries: JournalEntry[]) {
  const content = generateWorksheet(entries);
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "AHP-Reflection-Worksheet.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ─── Component ─── */

export function ReflectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [activeIndex, setActiveIndex] = useState(0);
  const [journalText, setJournalText] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [showPastEntries, setShowPastEntries] = useState(false);

  const activePrompt = reflectionPrompts[activeIndex];

  useEffect(() => {
    const loaded = loadEntries();
    setEntries(loaded);
  }, []);

  useEffect(() => {
    const existing = entries.find((e) => e.promptId === activePrompt.id);
    setJournalText(existing?.text ?? "");
    setSaveState("idle");
  }, [activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = useCallback(() => {
    if (!journalText.trim()) return;
    setSaveState("saving");

    const newEntry: JournalEntry = {
      promptId: activePrompt.id,
      text: journalText,
      savedAt: new Date().toISOString(),
    };

    const updated = [...entries.filter((e) => e.promptId !== activePrompt.id), newEntry];
    setEntries(updated);
    saveEntries(updated);

    setTimeout(() => setSaveState("saved"), 400);
    setTimeout(() => setSaveState("idle"), 2200);
  }, [journalText, activePrompt.id, entries]);

  const handleClearEntry = () => {
    const updated = entries.filter((e) => e.promptId !== activePrompt.id);
    setEntries(updated);
    saveEntries(updated);
    setJournalText("");
    setSaveState("idle");
  };

  const savedCount = entries.filter((e) => e.text.trim()).length;
  const hasCurrent = entries.some((e) => e.promptId === activePrompt.id && e.text.trim());

  const goNext = () => setActiveIndex((i) => (i + 1) % reflectionPrompts.length);
  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + reflectionPrompts.length) % reflectionPrompts.length);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-28 sm:py-40"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 mb-6">
            <Feather size={13} className="text-[#D4A017]" />
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "#000000",
              }}
            >
              PAUSE &amp; REFLECT
            </span>
          </div>
          <h2
            className="mb-3"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#000000",
            }}
          >
            Resources for Reflection
          </h2>
          <p
            className="max-w-lg mx-auto"
            style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.75, color: "#000000" }}
          >
            Before you take the next step, take a quiet moment. These guided
            prompts are here to help you check in with yourself.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-8">
          {/* Left: Prompt carousel */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-black/8 p-7 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <span
                  className="px-3 py-1 rounded-full border border-black/10"
                  style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#000000" }}
                >
                  {activePrompt.category}
                </span>
                <span
                  style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#000000" }}
                >
                  {activeIndex + 1} / {reflectionPrompts.length}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePrompt.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#D4A017]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lightbulb size={15} className="text-[#D4A017]" />
                    </div>
                    <h3
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 800,
                        lineHeight: 1.4,
                        color: "#000000",
                      }}
                    >
                      {activePrompt.question}
                    </h3>
                  </div>
                  <p
                    className="ml-11"
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      lineHeight: 1.65,
                      fontStyle: "italic",
                      color: "#000000",
                    }}
                  >
                    {activePrompt.hint}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-7 pt-5 border-t border-black/5">
                <button
                  onClick={goPrev}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-black hover:bg-black/5 transition-all cursor-pointer"
                  style={{ fontSize: "0.75rem", fontWeight: 500 }}
                >
                  <ChevronLeft size={14} />
                  Previous
                </button>
                <button
                  onClick={goNext}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-black hover:bg-black/5 transition-all cursor-pointer"
                  style={{ fontSize: "0.75rem", fontWeight: 500 }}
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2">
              {reflectionPrompts.map((p, i) => {
                const hasEntry = entries.some(
                  (e) => e.promptId === p.id && e.text.trim()
                );
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveIndex(i)}
                    className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeIndex
                        ? "bg-black scale-125"
                        : hasEntry
                        ? "bg-[#D4A017]"
                        : "bg-black/15 hover:bg-black/30"
                    }`}
                    aria-label={`Prompt ${i + 1}: ${p.question}`}
                  />
                );
              })}
            </div>

            {/* Progress */}
            <div className="rounded-xl border border-black/8 p-5">
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#000000" }}>
                  Your progress
                </span>
                <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#000000" }}>
                  {savedCount} / {reflectionPrompts.length} prompts
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-black/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#D4A017]"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(savedCount / reflectionPrompts.length) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              {savedCount === reflectionPrompts.length && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3"
                  style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#D4A017" }}
                >
                  All prompts completed — beautifully done.
                </motion.p>
              )}
            </div>
          </div>

          {/* Right: Journal area */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-black/8 p-7 sm:p-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <PenLine size={14} className="text-black" />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000000" }}>
                    Your thoughts
                  </span>
                </div>
                {hasCurrent && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-black/40" />
                    <span style={{ fontSize: "0.625rem", fontWeight: 500, color: "#000000" }}>
                      Saved locally
                    </span>
                  </div>
                )}
              </div>

              <textarea
                value={journalText}
                onChange={(e) => {
                  setJournalText(e.target.value);
                  if (saveState === "saved") setSaveState("idle");
                }}
                placeholder="Take your time. Write freely — no one else will see this..."
                className="flex-1 min-h-[180px] w-full resize-none rounded-xl bg-black/[0.02] border border-black/8 px-5 py-4 text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/15 transition-all"
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                  lineHeight: 1.8,
                }}
              />

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-black/5">
                <div className="flex items-center gap-2">
                  {hasCurrent && (
                    <button
                      onClick={handleClearEntry}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-black hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
                      style={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      <Trash2 size={12} />
                      Clear
                    </button>
                  )}
                </div>
                <button
                  onClick={handleSave}
                  disabled={!journalText.trim() || saveState === "saving"}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                    saveState === "saved"
                      ? "bg-[#D4A017]/10 text-[#D4A017]"
                      : !journalText.trim()
                      ? "bg-black/5 text-black/30 cursor-not-allowed"
                      : "bg-black text-white hover:opacity-90 active:scale-[0.97]"
                  }`}
                  style={{ fontSize: "0.8125rem", fontWeight: 600 }}
                >
                  <AnimatePresence mode="wait">
                    {saveState === "saved" ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1.5"
                      >
                        <Check size={14} />
                        Saved
                      </motion.span>
                    ) : saveState === "saving" ? (
                      <motion.span
                        key="saving"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1.5"
                      >
                        <RotateCcw size={13} className="animate-spin" />
                        Saving
                      </motion.span>
                    ) : (
                      <motion.span
                        key="save"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1.5"
                      >
                        <Save size={13} />
                        Save response
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Past entries */}
            {savedCount > 0 && (
              <div className="rounded-xl border border-black/8 overflow-hidden">
                <button
                  onClick={() => setShowPastEntries(!showPastEntries)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-black/[0.02] transition-colors cursor-pointer"
                >
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000000" }}>
                    View saved reflections ({savedCount})
                  </span>
                  <motion.div
                    animate={{ rotate: showPastEntries ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={14} className="text-black rotate-90" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showPastEntries && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 flex flex-col gap-3">
                        {entries
                          .filter((e) => e.text.trim())
                          .sort(
                            (a, b) =>
                              new Date(b.savedAt).getTime() -
                              new Date(a.savedAt).getTime()
                          )
                          .map((entry) => {
                            const prompt = reflectionPrompts.find(
                              (p) => p.id === entry.promptId
                            );
                            if (!prompt) return null;
                            return (
                              <div
                                key={entry.promptId}
                                className="p-4 rounded-lg border border-black/5"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <span
                                    className="px-2 py-0.5 rounded border border-black/10"
                                    style={{
                                      fontSize: "0.625rem",
                                      fontWeight: 600,
                                      color: "#000000",
                                    }}
                                  >
                                    {prompt.category}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "0.625rem",
                                      fontWeight: 500,
                                      color: "#000000",
                                    }}
                                  >
                                    {new Date(entry.savedAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p
                                  className="mb-1.5"
                                  style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    lineHeight: 1.4,
                                    color: "#000000",
                                  }}
                                >
                                  {prompt.question}
                                </p>
                                <p
                                  className="whitespace-pre-wrap"
                                  style={{
                                    fontSize: "0.8125rem",
                                    fontWeight: 400,
                                    lineHeight: 1.65,
                                    color: "#000000",
                                  }}
                                >
                                  {entry.text}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Download */}
            <button
              onClick={() => downloadWorksheet(entries)}
              className="group flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-xl border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
              style={{ fontSize: "0.8125rem", fontWeight: 600 }}
            >
              <Download size={15} />
              Download Reflection Worksheet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
