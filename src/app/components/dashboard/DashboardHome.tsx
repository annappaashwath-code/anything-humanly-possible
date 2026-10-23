import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Play,
  ArrowRight,
  Target,
  Layers,
  Rocket,
  Crown,
  BookOpen,
  Clock,
  MessageCircle,
  Award,
  Brain,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useDashboard } from "./DashboardLayout";
import {
  computeOverallProgress,
  computeCourseProgress,
  computeMasteryStage,
  getNextLesson,
  getCompletedMilestones,
  getAllLessons,
  type MasteryStage,
  type ActivityEvent,
  type MentorMemory,
} from "./dashboardStore";
import { mentorCategories } from "../tools/mentorData";

/* ════════════════════════════════════════════════════
   Greeting Header
   ════════════════════════════════════════════════════ */

function GreetingHeader({ name }: { name: string }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="mb-10">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-1"
        style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3b82f6" }}
      >
        {greeting}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          color: "#000000",
        }}
      >
        {name ? `Welcome back, ${name.split(" ")[0]}` : "Welcome back"}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ fontSize: "0.875rem", fontWeight: 400, color: "#000000", marginTop: "0.5rem" }}
      >
        Your personal growth command center. Pick up where you left off.
      </motion.p>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Progress Ring (SVG)
   ════════════════════════════════════════════════════ */

function ProgressRing({ percent, size = 120, strokeWidth = 8 }: { percent: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#000000"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "#000000", letterSpacing: "-0.03em" }}>
          {percent}%
        </span>
        <span style={{ fontSize: "0.5625rem", fontWeight: 600, color: "#3b82f6", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Complete
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Continue Learning Card
   ════════════════════════════════════════════════════ */

function ContinueLearningCard({
  progress,
}: {
  progress: Record<string, boolean>;
}) {
  const navigate = useNavigate();
  const next = getNextLesson(progress);

  if (!next) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-8 rounded-2xl border border-black/[0.06] bg-white"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#D4A017]/10 flex items-center justify-center">
            <Award size={18} style={{ color: "#D4A017" }} />
          </div>
          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#000000" }}>All Caught Up</h3>
        </div>
        <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000", lineHeight: 1.7 }}>
          Incredible work. You've completed all available lessons. New content is on the way.
        </p>
      </motion.div>
    );
  }

  const courseProgress = computeCourseProgress(progress, next.mentor.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 sm:p-8 rounded-2xl border border-black/[0.06] bg-white cursor-pointer group hover:-translate-y-0.5 transition-all duration-300"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      onClick={() => navigate(`/tools/${next.category.slug}/${next.mentor.id}`)}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <Play size={12} className="text-white ml-0.5" />
            </div>
            <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3b82f6" }}>
              Continue Learning
            </span>
          </div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#000000" }}>
            {next.lesson.title}
          </h3>
          <p className="mt-1" style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#000000" }}>
            {next.mentor.name} &middot; {next.module.title}
          </p>
        </div>
        <ArrowRight
          size={18}
          className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all duration-300 mt-2 flex-shrink-0"
        />
      </div>

      {/* Mini progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${courseProgress}%` }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#000000" }}>
          {courseProgress}%
        </span>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="flex items-center gap-1.5" style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#000000" }}>
          <Clock size={11} /> {next.lesson.duration}
        </span>
        <span className="flex items-center gap-1.5" style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#000000" }}>
          <BookOpen size={11} /> {next.mentor.course.difficulty}
        </span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   Mastery Path Mini Visualization
   ════════════════════════════════════════════════════ */

const masteryStages: { id: MasteryStage; label: string; icon: typeof Layers }[] = [
  { id: "foundation", label: "Foundation", icon: Layers },
  { id: "growth", label: "Growth", icon: Target },
  { id: "mastery", label: "Mastery", icon: Rocket },
  { id: "impact", label: "Impact", icon: Crown },
];

function MasteryPathMini({ currentStage }: { currentStage: MasteryStage }) {
  const navigate = useNavigate();
  const stageIdx = masteryStages.findIndex((s) => s.id === currentStage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="p-6 sm:p-8 rounded-2xl border border-black/[0.06] bg-white cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      onClick={() => navigate("/dashboard/mastery-map")}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#D4A017]/10 flex items-center justify-center">
            <TrendingUp size={14} style={{ color: "#D4A017" }} />
          </div>
          <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A017" }}>
            Mastery Pathway
          </span>
        </div>
        <ChevronRight size={14} style={{ color: "#000000", opacity: 0.3 }} />
      </div>

      <div className="flex items-center justify-between">
        {masteryStages.map((stage, i) => {
          const Icon = stage.icon;
          const isReached = i <= stageIdx;
          const isCurrent = i === stageIdx;
          return (
            <div key={stage.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isReached ? "#000000" : "rgba(0,0,0,0.04)",
                    border: isCurrent ? "2px solid #D4A017" : "none",
                  }}
                >
                  <Icon size={15} style={{ color: isReached ? "#ffffff" : "#000000" }} />
                </motion.div>
                <span
                  style={{
                    fontSize: "0.5625rem",
                    fontWeight: isCurrent ? 800 : 500,
                    color: "#000000",
                    whiteSpace: "nowrap",
                  }}
                >
                  {stage.label}
                </span>
              </div>
              {i < masteryStages.length - 1 && (
                <div
                  className="flex-1 h-px mx-2"
                  style={{ backgroundColor: i < stageIdx ? "#000000" : "rgba(0,0,0,0.08)" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   Stats Row
   ════════════════════════════════════════════════════ */

function StatsRow({ progress, activity }: { progress: Record<string, boolean>; activity: ActivityEvent[] }) {
  const allLessons = getAllLessons();
  const completedCount = allLessons.filter((l) => progress[l.lesson.id]).length;
  const milestones = getCompletedMilestones(progress);
  const questionsAsked = activity.filter((e) => e.type === "question_asked").length;
  const sessionsStarted = activity.filter((e) => e.type === "session_started").length;

  // Compute rough hours: each completed lesson averages ~45min
  const hoursLearned = Math.round((completedCount * 45) / 60);

  const stats = [
    { label: "Lessons Completed", value: String(completedCount), icon: BookOpen, color: "#3b82f6" },
    { label: "Hours Learned", value: String(hoursLearned), icon: Clock, color: "#000000" },
    { label: "Milestones", value: String(milestones.length), icon: Award, color: "#D4A017" },
    { label: "Sessions", value: String(sessionsStarted || completedCount), icon: Zap, color: "#3b82f6" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            className="p-5 rounded-2xl border border-black/[0.06] bg-white"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon size={14} style={{ color: s.color }} />
              <span style={{ fontSize: "0.5625rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000" }}>
                {s.label}
              </span>
            </div>
            <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#000000", letterSpacing: "-0.02em" }}>
              {s.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Mentor Remembers Section
   ════════════════════════════════════════════════════ */

function MentorRemembersSection({ memories }: { memories: MentorMemory[] }) {
  const navigate = useNavigate();

  if (memories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-6 sm:p-8 rounded-2xl border border-black/[0.06] bg-white"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/8 flex items-center justify-center">
            <Brain size={14} style={{ color: "#3b82f6" }} />
          </div>
          <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3b82f6" }}>
            Your Mentor Remembers
          </span>
        </div>
        <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000", lineHeight: 1.7 }}>
          Start a learning session with any mentor to build your personal interaction history. Your mentors will
          remember your strengths, areas for growth, and where you left off.
        </p>
      </motion.div>
    );
  }

  // Show the most recent mentor memory
  const latest = memories.reduce((a, b) =>
    new Date(a.lastSessionAt) > new Date(b.lastSessionAt) ? a : b,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="p-6 sm:p-8 rounded-2xl border border-black/[0.06] bg-white cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      onClick={() => navigate(`/tools/${latest.categorySlug}/${latest.mentorId}`)}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/8 flex items-center justify-center">
            <Brain size={14} style={{ color: "#3b82f6" }} />
          </div>
          <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3b82f6" }}>
            Your Mentor Remembers
          </span>
        </div>
        <ChevronRight size={14} style={{ color: "#000000", opacity: 0.3 }} />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white"
          style={{ fontSize: "0.75rem", fontWeight: 700 }}
        >
          {latest.mentorName.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000" }}>{latest.mentorName}</p>
          <p style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#000000" }}>
            {latest.totalSessions} session{latest.totalSessions !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {latest.lastTopic && (
          <div className="flex items-start gap-2.5">
            <MessageCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#3b82f6" }} />
            <div>
              <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000", marginBottom: 2 }}>
                Last Topic
              </p>
              <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000" }}>{latest.lastTopic}</p>
            </div>
          </div>
        )}
        {latest.strengths.length > 0 && (
          <div className="flex items-start gap-2.5">
            <Sparkles size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#D4A017" }} />
            <div>
              <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000", marginBottom: 2 }}>
                Strengths
              </p>
              <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000" }}>{latest.strengths.join(", ")}</p>
            </div>
          </div>
        )}
        {latest.weakAreas.length > 0 && (
          <div className="flex items-start gap-2.5">
            <Target size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#3b82f6" }} />
            <div>
              <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000", marginBottom: 2 }}>
                Areas for Growth
              </p>
              <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000" }}>{latest.weakAreas.join(", ")}</p>
            </div>
          </div>
        )}
        {latest.suggestedNext && (
          <div className="flex items-start gap-2.5">
            <ArrowRight size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#000000" }} />
            <div>
              <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000", marginBottom: 2 }}>
                Suggested Next
              </p>
              <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000" }}>{latest.suggestedNext}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   Activity Timeline
   ════════════════════════════════════════════════════ */

function ActivityTimeline({ activity }: { activity: ActivityEvent[] }) {
  const recent = activity.slice(-8).reverse();

  const iconMap: Record<string, typeof BookOpen> = {
    lesson_completed: BookOpen,
    milestone_unlocked: Award,
    question_asked: MessageCircle,
    session_started: Play,
    stage_advanced: TrendingUp,
  };

  const colorMap: Record<string, string> = {
    lesson_completed: "#3b82f6",
    milestone_unlocked: "#D4A017",
    question_asked: "#000000",
    session_started: "#3b82f6",
    stage_advanced: "#D4A017",
  };

  function formatTime(ts: string) {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="p-6 sm:p-8 rounded-2xl border border-black/[0.06] bg-white"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-black/[0.04] flex items-center justify-center">
          <Clock size={14} style={{ color: "#000000" }} />
        </div>
        <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#000000" }}>
          Activity
        </span>
      </div>

      {recent.length === 0 ? (
        <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000", lineHeight: 1.7 }}>
          Your activity timeline will appear here as you complete lessons, unlock milestones, and interact with mentors.
        </p>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px"
            style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
          />
          <div className="space-y-4">
            {recent.map((event, i) => {
              const Icon = iconMap[event.type] || BookOpen;
              const color = colorMap[event.type] || "#000000";
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-start gap-3 relative"
                >
                  <div
                    className="w-[31px] h-[31px] rounded-full flex items-center justify-center z-10 flex-shrink-0"
                    style={{ backgroundColor: `${color}10`, border: `1px solid ${color}20` }}
                  >
                    <Icon size={12} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p
                      className="truncate"
                      style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000000" }}
                    >
                      {event.title}
                    </p>
                    <p style={{ fontSize: "0.6875rem", fontWeight: 400, color: "#000000", marginTop: 2 }}>
                      {event.detail}
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 pt-1"
                    style={{ fontSize: "0.625rem", fontWeight: 500, color: "#000000", opacity: 0.5 }}
                  >
                    {formatTime(event.timestamp)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   Active Courses Summary
   ════════════════════════════════════════════════════ */

function ActiveCoursesSummary({ progress }: { progress: Record<string, boolean> }) {
  const navigate = useNavigate();

  // Find categories/mentors with any progress
  const activeMentors: { categorySlug: string; mentorId: string; mentorName: string; courseTitle: string; pct: number }[] = [];
  for (const cat of mentorCategories) {
    for (const mentor of cat.mentors) {
      const pct = computeCourseProgress(progress, mentor.id);
      if (pct > 0) {
        activeMentors.push({
          categorySlug: cat.slug,
          mentorId: mentor.id,
          mentorName: mentor.name,
          courseTitle: mentor.course.title,
          pct,
        });
      }
    }
  }

  if (activeMentors.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="p-6 sm:p-8 rounded-2xl border border-black/[0.06] bg-white cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        onClick={() => navigate("/tools")}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-black/[0.04] flex items-center justify-center">
            <BookOpen size={14} style={{ color: "#000000" }} />
          </div>
          <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#000000" }}>
            My Courses
          </span>
        </div>
        <p className="mb-4" style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000", lineHeight: 1.7 }}>
          You haven't started any courses yet. Explore the Mastery Space to begin your journey.
        </p>
        <span className="flex items-center gap-1.5" style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000000" }}>
          Explore Mastery Space <ArrowRight size={13} />
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="p-6 sm:p-8 rounded-2xl border border-black/[0.06] bg-white"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-black/[0.04] flex items-center justify-center">
            <BookOpen size={14} style={{ color: "#000000" }} />
          </div>
          <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#000000" }}>
            Active Courses
          </span>
        </div>
        <button
          onClick={() => navigate("/dashboard/courses")}
          className="cursor-pointer"
          style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#3b82f6" }}
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {activeMentors.slice(0, 4).map((m) => (
          <button
            key={`${m.categorySlug}-${m.mentorId}`}
            onClick={() => navigate(`/tools/${m.categorySlug}/${m.mentorId}`)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-black/[0.02] transition-colors cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-lg bg-black flex items-center justify-center text-white flex-shrink-0"
              style={{ fontSize: "0.625rem", fontWeight: 700 }}
            >
              {m.mentorName.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="truncate" style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000000" }}>
                {m.courseTitle}
              </p>
              <p className="truncate" style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#000000" }}>
                with {m.mentorName}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-16 h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                <div className="h-full rounded-full bg-black" style={{ width: `${m.pct}%` }} />
              </div>
              <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "#000000" }}>{m.pct}%</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   Dashboard Home Page
   ════════════════════════════════════════════════════ */

export function DashboardHome() {
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
  const stage = computeMasteryStage(data.progress);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8 sm:py-12">
      {/* Greeting */}
      <GreetingHeader name={data.profile.name} />

      {/* Top row: Progress ring + Continue Learning */}
      <div className="grid lg:grid-cols-[auto_1fr] gap-6 mb-8">
        {/* Progress Ring Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="p-6 sm:p-8 rounded-2xl border border-black/[0.06] bg-white flex flex-col items-center justify-center"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)", minWidth: 200 }}
        >
          <ProgressRing percent={overallPct} />
          <p className="mt-4" style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000" }}>
            Overall Progress
          </p>
        </motion.div>

        {/* Continue Learning */}
        <ContinueLearningCard progress={data.progress} />
      </div>

      {/* Stats Row */}
      <div className="mb-8">
        <StatsRow progress={data.progress} activity={data.activity} />
      </div>

      {/* Mastery Path + Mentor Remembers */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <MasteryPathMini currentStage={stage} />
        <MentorRemembersSection memories={data.mentorMemories} />
      </div>

      {/* Active Courses + Activity Timeline */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ActiveCoursesSummary progress={data.progress} />
        <ActivityTimeline activity={data.activity} />
      </div>
    </div>
  );
}