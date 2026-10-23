import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Check,
  Circle,
  Clock,
  BookOpen,
  Wrench,
  Users,
  Target,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { learningCategories, type Milestone, type Resource } from "./learningData";

// ─── Progress Storage ────────────────────────────────────────

function getProgress(categoryId: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(`learn-progress-${categoryId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setProgress(categoryId: string, milestoneId: string, done: boolean) {
  const current = getProgress(categoryId);
  current[milestoneId] = done;
  localStorage.setItem(`learn-progress-${categoryId}`, JSON.stringify(current));
}

// ─── Resource Icon ───────────────────────────────────────────

function ResourceIcon({ type }: { type: Resource["type"] }) {
  switch (type) {
    case "Book":
      return <BookOpen size={13} />;
    case "Course":
      return <Lightbulb size={13} />;
    case "Tool":
      return <Wrench size={13} />;
    case "Community":
      return <Users size={13} />;
    case "Practice":
      return <Sparkles size={13} />;
    default:
      return <Circle size={13} />;
  }
}

// ─── Progress Bar ────────────────────────────────────────────

function ProgressTracker({
  milestones,
  progress,
  color,
  activeIndex,
  onSelect,
}: {
  milestones: Milestone[];
  progress: Record<string, boolean>;
  color: string;
  activeIndex: number;
  onSelect: (idx: number) => void;
}) {
  const completed = milestones.filter((m) => progress[m.id]).length;
  const percentage = Math.round((completed / milestones.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 sticky top-20">
      {/* Progress circle */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="#f5f5f5"
              strokeWidth="4"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 24}
              initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
              animate={{
                strokeDashoffset: 2 * Math.PI * 24 * (1 - percentage / 100),
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-neutral-900"
              style={{ fontSize: "0.8125rem", fontWeight: 700 }}
            >
              {percentage}%
            </span>
          </div>
        </div>
        <div>
          <p
            className="text-neutral-900"
            style={{ fontSize: "0.9375rem", fontWeight: 700 }}
          >
            {completed} of {milestones.length}
          </p>
          <p
            className="text-neutral-400"
            style={{ fontSize: "0.75rem", fontWeight: 500 }}
          >
            milestones completed
          </p>
        </div>
      </div>

      {/* Milestone list */}
      <div className="space-y-1">
        {milestones.map((m, i) => {
          const isDone = progress[m.id];
          const isActive = i === activeIndex;
          return (
            <button
              key={m.id}
              onClick={() => onSelect(i)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer text-left ${
                isActive
                  ? "bg-neutral-50"
                  : "hover:bg-neutral-50/60"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isDone
                    ? "text-white"
                    : isActive
                    ? "border-2"
                    : "border-2 border-neutral-200"
                }`}
                style={{
                  backgroundColor: isDone ? color : "transparent",
                  borderColor: isDone ? color : isActive ? color : undefined,
                }}
              >
                {isDone ? (
                  <Check size={12} strokeWidth={3} />
                ) : (
                  <span
                    className={isActive ? "text-neutral-600" : "text-neutral-300"}
                    style={{ fontSize: "0.625rem", fontWeight: 700 }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                className={`transition-colors duration-300 ${
                  isDone
                    ? "text-neutral-400 line-through"
                    : isActive
                    ? "text-neutral-900"
                    : "text-neutral-500"
                }`}
                style={{ fontSize: "0.8125rem", fontWeight: isActive ? 600 : 500 }}
              >
                {m.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Milestone Detail ────────────────────────────────────────

function MilestoneDetail({
  milestone,
  index,
  total,
  color,
  lightBg,
  isDone,
  onToggle,
}: {
  milestone: Milestone;
  index: number;
  total: number;
  color: string;
  lightBg: string;
  isDone: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      ref={ref}
      id={`milestone-${index}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Connector line */}
      {index < total - 1 && (
        <div
          className="absolute left-[19px] top-14 bottom-0 w-px"
          style={{ backgroundColor: isDone ? color : "#e5e5e5" }}
        />
      )}

      <div className="flex gap-4 sm:gap-5">
        {/* Step indicator */}
        <div className="flex-shrink-0 pt-1">
          <button
            onClick={onToggle}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isDone ? "hover:opacity-80" : "hover:scale-105"
            }`}
            style={{
              backgroundColor: isDone ? color : "white",
              border: isDone ? "none" : "2px solid #e5e5e5",
            }}
            title={isDone ? "Mark as incomplete" : "Mark as complete"}
          >
            {isDone ? (
              <Check size={16} className="text-white" strokeWidth={3} />
            ) : (
              <span className="text-neutral-400" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                {index + 1}
              </span>
            )}
          </button>
        </div>

        {/* Content card */}
        <div
          className={`flex-1 rounded-2xl border transition-all duration-300 mb-8 ${
            isDone
              ? "bg-neutral-50/50 border-neutral-100"
              : "bg-white border-neutral-100 hover:border-neutral-200"
          }`}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-5 sm:p-6 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="text-neutral-400 tracking-[0.1em] uppercase"
                  style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                >
                  Step {index + 1} of {total}
                </span>
                <span className="text-neutral-200">·</span>
                <span
                  className="flex items-center gap-1 text-neutral-400"
                  style={{ fontSize: "0.6875rem", fontWeight: 500 }}
                >
                  <Clock size={11} />
                  {milestone.estimatedTime}
                </span>
                {isDone && (
                  <span
                    className="px-2 py-0.5 rounded-full text-white"
                    style={{ fontSize: "0.625rem", fontWeight: 600, backgroundColor: color }}
                  >
                    Completed
                  </span>
                )}
              </div>
              <h3
                className={`transition-colors ${isDone ? "text-neutral-400" : "text-neutral-900"}`}
                style={{ fontSize: "1.25rem", fontWeight: 800 }}
              >
                {milestone.title}
              </h3>
            </div>
            <div className="ml-3 text-neutral-400">
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {/* Expandable content */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-6">
                  {/* Description */}
                  <p
                    className="text-neutral-500"
                    style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.75 }}
                  >
                    {milestone.description}
                  </p>

                  {/* Skills */}
                  <div>
                    <p
                      className="text-neutral-900 mb-2.5"
                      style={{ fontSize: "0.8125rem", fontWeight: 700 }}
                    >
                      Skills you'll develop
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {milestone.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1.5 rounded-lg border border-neutral-100 ${lightBg}`}
                          style={{ fontSize: "0.75rem", fontWeight: 500, color }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div>
                    <p
                      className="text-neutral-900 mb-2.5"
                      style={{ fontSize: "0.8125rem", fontWeight: 700 }}
                    >
                      Recommended resources
                    </p>
                    <div className="space-y-2">
                      {milestone.resources.map((r) => (
                        <div
                          key={r.title}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${color}15`, color }}
                          >
                            <ResourceIcon type={r.type} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span
                              className="text-neutral-700 block truncate"
                              style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                            >
                              {r.title}
                            </span>
                          </div>
                          <span
                            className="text-neutral-400 flex-shrink-0"
                            style={{ fontSize: "0.6875rem", fontWeight: 500 }}
                          >
                            {r.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project */}
                  <div
                    className="rounded-xl border-2 border-dashed p-4 sm:p-5"
                    style={{ borderColor: `${color}30` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={14} style={{ color }} />
                      <span
                        style={{ fontSize: "0.75rem", fontWeight: 700, color }}
                      >
                        CAPSTONE PROJECT
                      </span>
                    </div>
                    <h4
                      className="text-neutral-900 mb-1.5"
                      style={{ fontSize: "1rem", fontWeight: 700 }}
                    >
                      {milestone.project.title}
                    </h4>
                    <p
                      className="text-neutral-500"
                      style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.65 }}
                    >
                      {milestone.project.description}
                    </p>
                  </div>

                  {/* Mark complete button */}
                  <button
                    onClick={onToggle}
                    className={`w-full py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                      isDone
                        ? "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                        : "text-white hover:opacity-90"
                    }`}
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      backgroundColor: isDone ? undefined : color,
                    }}
                  >
                    {isDone ? "Mark as incomplete" : "Mark as complete"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────

export function LearningPathPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const category = learningCategories.find((c) => c.slug === slug);

  const [progress, setProgressState] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (category) {
      setProgressState(getProgress(category.id));
    }
    window.scrollTo(0, 0);
  }, [category]);

  const handleToggle = useCallback(
    (milestoneId: string) => {
      if (!category) return;
      const next = !progress[milestoneId];
      setProgress(category.id, milestoneId, next);
      setProgressState((prev) => ({ ...prev, [milestoneId]: next }));
    },
    [category, progress]
  );

  const handleSelect = useCallback((idx: number) => {
    setActiveIndex(idx);
    const el = document.querySelector(`#milestone-${idx}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!category) {
    return (
      <div className="relative min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2
            className="text-neutral-900 mb-3"
            style={{ fontSize: "1.5rem", fontWeight: 800 }}
          >
            Path not found
          </h2>
          <button
            onClick={() => navigate("/learn")}
            className="text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer"
            style={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            Back to learning paths
          </button>
        </div>
      </div>
    );
  }

  const Icon = category.icon;
  const completed = category.milestones.filter((m) => progress[m.id]).length;
  const percentage = Math.round((completed / category.milestones.length) * 100);

  return (
    <div className="relative min-h-screen bg-neutral-50/50">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => navigate("/learn")}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-neutral-200/60 shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group"
      >
        <ArrowLeft
          size={16}
          className="text-neutral-700 transition-transform duration-300 group-hover:-translate-x-0.5"
        />
        <span
          className="text-neutral-700"
          style={{ fontSize: "0.8125rem", fontWeight: 600 }}
        >
          All Paths
        </span>
      </motion.button>

      {/* Hero */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category badge */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className={`w-11 h-11 rounded-xl ${category.lightBg} flex items-center justify-center`}
              >
                <Icon size={20} style={{ color: category.color }} />
              </div>
              <div>
                <p
                  className="text-neutral-400 tracking-[0.15em] uppercase"
                  style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                >
                  Learning Path
                </p>
                <p
                  className="text-neutral-900"
                  style={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  {category.label}
                </p>
              </div>
            </div>

            <h1
              className="text-neutral-900 mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              {category.tagline}
            </h1>
            <p
              className="text-neutral-500 max-w-xl mb-8"
              style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.75 }}
            >
              {category.description}
            </p>

            {/* Progress summary bar */}
            <div className="flex items-center gap-4 max-w-md">
              <div className="flex-1">
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: category.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
              <span
                className="text-neutral-500 flex-shrink-0"
                style={{ fontSize: "0.8125rem", fontWeight: 600 }}
              >
                {percentage}% complete
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar tracker (desktop) */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <ProgressTracker
                milestones={category.milestones}
                progress={progress}
                color={category.color}
                activeIndex={activeIndex}
                onSelect={handleSelect}
              />
            </div>

            {/* Mobile tracker */}
            <div className="lg:hidden">
              <div className="bg-white rounded-2xl border border-neutral-100 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
                      <circle cx="20" cy="20" r="17" fill="none" stroke="#f5f5f5" strokeWidth="3" />
                      <motion.circle
                        cx="20"
                        cy="20"
                        r="17"
                        fill="none"
                        stroke={category.color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 17}
                        initial={{ strokeDashoffset: 2 * Math.PI * 17 }}
                        animate={{
                          strokeDashoffset: 2 * Math.PI * 17 * (1 - percentage / 100),
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-neutral-900" style={{ fontSize: "0.6875rem", fontWeight: 700 }}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-neutral-900" style={{ fontSize: "0.8125rem", fontWeight: 700 }}>
                      {completed} of {category.milestones.length} milestones
                    </p>
                    <p className="text-neutral-400" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>
                      {percentage === 100 ? "Path completed!" : "Keep going!"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {category.milestones.map((m, i) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelect(i)}
                      className="flex-1 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: progress[m.id]
                          ? category.color
                          : i === activeIndex
                          ? `${category.color}40`
                          : "#f0f0f0",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Milestones timeline */}
            <div className="flex-1 max-w-3xl">
              {category.milestones.map((m, i) => (
                <MilestoneDetail
                  key={m.id}
                  milestone={m}
                  index={i}
                  total={category.milestones.length}
                  color={category.color}
                  lightBg={category.lightBg}
                  isDone={!!progress[m.id]}
                  onToggle={() => handleToggle(m.id)}
                />
              ))}

              {/* Completion state */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="ml-14 sm:ml-[3.75rem] mt-4 p-6 rounded-2xl bg-white border border-neutral-100 text-center"
              >
                {percentage === 100 ? (
                  <>
                    <div
                      className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <Sparkles size={24} style={{ color: category.color }} />
                    </div>
                    <h3
                      className="text-neutral-900 mb-2"
                      style={{ fontSize: "1.25rem", fontWeight: 800 }}
                    >
                      Path completed!
                    </h3>
                    <p
                      className="text-neutral-500 mb-4"
                      style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.65 }}
                    >
                      You've completed all milestones. The real journey is just beginning.
                    </p>
                  </>
                ) : (
                  <>
                    <h3
                      className="text-neutral-400 mb-2"
                      style={{ fontSize: "1rem", fontWeight: 700 }}
                    >
                      Keep going
                    </h3>
                    <p
                      className="text-neutral-400"
                      style={{ fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.65 }}
                    >
                      Complete all milestones to finish this learning path.
                    </p>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <section className="py-16 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => navigate("/learn")}
              className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer"
              style={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              <ArrowLeft size={15} />
              All learning paths
            </button>
            <div className="flex gap-2">
              {learningCategories
                .filter((c) => c.id !== category.id)
                .map((c) => {
                  const CIcon = c.icon;
                  return (
                    <button
                      key={c.id}
                      onClick={() => navigate(`/learn/${c.slug}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 transition-all duration-300 cursor-pointer"
                    >
                      <CIcon size={14} style={{ color: c.color }} />
                      <span
                        className="text-neutral-600 hidden sm:inline"
                        style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                      >
                        {c.label}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
