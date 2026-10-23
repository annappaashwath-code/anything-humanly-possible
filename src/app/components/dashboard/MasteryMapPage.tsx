import { useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import {
  Layers,
  Target,
  Rocket,
  Crown,
  Check,
  Lock,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useDashboard } from "./DashboardLayout";
import {
  computeOverallProgress,
  computeMasteryStage,
  getCompletedMilestones,
  type MasteryStage,
} from "./dashboardStore";

/* ════════════════════════════════════════════════════
   Stage Data
   ════════════════════════════════════════════════════ */

const stages: {
  id: MasteryStage;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  milestones: string[];
  icon: typeof Layers;
  threshold: number; // % needed to reach
}[] = [
  {
    id: "foundation",
    number: "01",
    title: "Foundation",
    subtitle: "Build the bedrock",
    description:
      "Establish core concepts, mental models, and the discipline of daily practice. Every master was once a beginner who refused to stop.",
    milestones: [
      "Complete your first lesson",
      "Start a mentor session",
      "Finish a full module",
      "Ask 5 questions to your mentor",
    ],
    icon: Layers,
    threshold: 0,
  },
  {
    id: "growth",
    number: "02",
    title: "Growth",
    subtitle: "Deliberate practice",
    description:
      "Theory meets reality. Apply what you've learned to meaningful projects. Develop resilience through iteration and feedback.",
    milestones: [
      "Complete 25% of all lessons",
      "Finish courses with 2 different mentors",
      "Complete a practice task",
      "Build something you're proud of",
    ],
    icon: Target,
    threshold: 25,
  },
  {
    id: "mastery",
    number: "03",
    title: "Mastery",
    subtitle: "Deep expertise",
    description:
      "Go deeper than anyone expects. Master nuances, advanced techniques, and develop your signature approach. This is where discipline meets creative flow.",
    milestones: [
      "Complete 50% of all lessons",
      "Achieve mastery in a full course",
      "Demonstrate teaching ability",
      "Create original work in your domain",
    ],
    icon: Rocket,
    threshold: 50,
  },
  {
    id: "impact",
    number: "04",
    title: "Impact",
    subtitle: "Give back and lead",
    description:
      "True mastery isn't just about what you know — it's about what you build for others. Lead, mentor newcomers, and create lasting impact.",
    milestones: [
      "Complete 75% of all lessons",
      "Help another learner",
      "Share your knowledge publicly",
      "Build something that serves others",
    ],
    icon: Crown,
    threshold: 75,
  },
];

/* ════════════════════════════════════════════════════
   Stage Card (Large)
   ════════════════════════════════════════════════════ */

function StageCard({
  stage,
  isReached,
  isCurrent,
  index,
  overallPct,
}: {
  stage: (typeof stages)[0];
  isReached: boolean;
  isCurrent: boolean;
  index: number;
  overallPct: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = stage.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative p-8 sm:p-10 rounded-2xl border transition-all duration-300 ${
        isCurrent
          ? "border-[#D4A017]/30 bg-white"
          : isReached
          ? "border-black/[0.08] bg-white"
          : "border-black/[0.04] bg-white/60"
      }`}
      style={{
        boxShadow: isCurrent
          ? "0 4px 24px rgba(212,160,23,0.08), 0 1px 4px rgba(0,0,0,0.04)"
          : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Current indicator */}
      {isCurrent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-3 left-8"
        >
          <div
            className="px-3 py-1 rounded-full flex items-center gap-1.5"
            style={{ backgroundColor: "#D4A017", color: "#ffffff" }}
          >
            <Sparkles size={10} />
            <span style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              You are here
            </span>
          </div>
        </motion.div>
      )}

      <div className="flex items-start gap-6">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: isReached ? "#000000" : "rgba(0,0,0,0.04)",
          }}
        >
          <Icon size={22} style={{ color: isReached ? "#ffffff" : "rgba(0,0,0,0.3)" }} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-3 mb-1">
            <span style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.2em", color: isReached ? "#3b82f6" : "rgba(0,0,0,0.2)" }}>
              STAGE {stage.number}
            </span>
            {isReached && !isCurrent && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/[0.06]">
                <Check size={10} style={{ color: "#000000" }} />
                <span style={{ fontSize: "0.5625rem", fontWeight: 600, color: "#000000" }}>Reached</span>
              </div>
            )}
            {!isReached && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/[0.03]">
                <Lock size={10} style={{ color: "rgba(0,0,0,0.3)" }} />
                <span style={{ fontSize: "0.5625rem", fontWeight: 600, color: "rgba(0,0,0,0.3)" }}>
                  {stage.threshold}% to unlock
                </span>
              </div>
            )}
          </div>

          <h3
            style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              color: isReached ? "#000000" : "rgba(0,0,0,0.25)",
              letterSpacing: "-0.02em",
            }}
          >
            {stage.title}
          </h3>
          <p
            className="mt-1 mb-4"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: isReached ? "#000000" : "rgba(0,0,0,0.2)",
            }}
          >
            {stage.subtitle}
          </p>
          <p
            className="mb-5"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 400,
              lineHeight: 1.75,
              color: isReached ? "#000000" : "rgba(0,0,0,0.2)",
            }}
          >
            {stage.description}
          </p>

          {/* Milestones */}
          <div className="grid sm:grid-cols-2 gap-2">
            {stage.milestones.map((m, i) => {
              const achieved = isReached && i < 2; // Simplified: first 2 milestones achieved for reached stages
              return (
                <div
                  key={m}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ backgroundColor: achieved ? "rgba(0,0,0,0.03)" : "transparent" }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: achieved ? "#000000" : "transparent",
                      border: achieved ? "none" : "1.5px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    {achieved && <Check size={8} className="text-white" />}
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: achieved ? 600 : 400,
                      color: isReached ? "#000000" : "rgba(0,0,0,0.2)",
                    }}
                  >
                    {m}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress bar toward next stage */}
      {isCurrent && (
        <div className="mt-6 pt-5 border-t border-black/[0.04]">
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#000000" }}>
              Progress to next stage
            </span>
            <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#000000" }}>
              {overallPct}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-black/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#D4A017" }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(overallPct * 4, 100)}%` }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   Connector Line Between Stages
   ════════════════════════════════════════════════════ */

function StageConnector({ reached }: { reached: boolean }) {
  return (
    <div className="flex justify-center py-2">
      <div className="flex flex-col items-center gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: reached ? "#000000" : "rgba(0,0,0,0.1)" }}
          />
        ))}
        <ChevronRight
          size={14}
          className="rotate-90"
          style={{ color: reached ? "#000000" : "rgba(0,0,0,0.15)" }}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Mastery Map Page
   ════════════════════════════════════════════════════ */

export function MasteryMapPage() {
  const navigate = useNavigate();
  const { data, loading } = useDashboard();

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full"
        />
      </div>
    );
  }

  const overallPct = computeOverallProgress(data.progress);
  const currentStage = computeMasteryStage(data.progress);
  const currentIdx = stages.findIndex((s) => s.id === currentStage);

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p
          className="mb-1"
          style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A017" }}
        >
          Your Journey
        </p>
        <h1
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#000000",
          }}
        >
          Mastery Map
        </h1>
        <p className="mt-2" style={{ fontSize: "0.875rem", fontWeight: 400, color: "#000000" }}>
          Four stages of transformation. Your position is determined by your overall progress across all courses.
        </p>
      </motion.div>

      {/* Overall progress summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-6 p-6 rounded-2xl border border-black/[0.06] bg-white mb-8"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg width={64} height={64} className="-rotate-90">
            <circle cx={32} cy={32} r={28} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={5} />
            <motion.circle
              cx={32} cy={32} r={28}
              fill="none" stroke="#000000" strokeWidth={5} strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 28}
              initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - overallPct / 100) }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontSize: "0.875rem", fontWeight: 900, color: "#000000" }}>{overallPct}%</span>
          </div>
        </div>
        <div>
          <p style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000" }}>
            {currentStage.charAt(0).toUpperCase() + currentStage.slice(1)} Stage
          </p>
          <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000", marginTop: 2 }}>
            {overallPct < 25
              ? "Building your foundation. Every lesson counts."
              : overallPct < 50
              ? "Growing steadily. Your dedication is showing."
              : overallPct < 75
              ? "Approaching mastery. Deep expertise is forming."
              : "Making impact. You're in the top tier."}
          </p>
        </div>
      </motion.div>

      {/* Stage Cards */}
      <div className="space-y-0">
        {stages.map((stage, i) => {
          const isReached = i <= currentIdx;
          const isCurrent = i === currentIdx;
          return (
            <div key={stage.id}>
              <StageCard
                stage={stage}
                isReached={isReached}
                isCurrent={isCurrent}
                index={i}
                overallPct={overallPct}
              />
              {i < stages.length - 1 && (
                <StageConnector reached={i < currentIdx} />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12"
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer"
          style={{ fontSize: "0.875rem", fontWeight: 700 }}
        >
          Continue Learning
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </div>
  );
}
