import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Check,
  Play,
  ChevronRight,
} from "lucide-react";
import { useDashboard } from "./DashboardLayout";
import { computeCourseProgress, getNextLesson } from "./dashboardStore";
import { mentorCategories } from "../tools/mentorData";

/* ════════════════════════════════════════════════════
   My Courses Page
   ════════════════════════════════════════════════════ */

export function MyCoursesPage() {
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

  // Build course list with progress
  const courses: {
    categorySlug: string;
    categoryLabel: string;
    mentorId: string;
    mentorName: string;
    mentorInitials: string;
    courseTitle: string;
    difficulty: string;
    totalDuration: string;
    modulesCount: number;
    lessonsCount: number;
    completedLessons: number;
    pct: number;
  }[] = [];

  for (const cat of mentorCategories) {
    for (const mentor of cat.mentors) {
      const pct = computeCourseProgress(data.progress, mentor.id);
      const totalLessons = mentor.course.modules.reduce((s, m) => s + m.lessons.length, 0);
      const completedLessons = mentor.course.modules.reduce(
        (s, m) => s + m.lessons.filter((l) => data.progress[l.id]).length,
        0,
      );
      courses.push({
        categorySlug: cat.slug,
        categoryLabel: cat.label,
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorInitials: mentor.initials,
        courseTitle: mentor.course.title,
        difficulty: mentor.course.difficulty,
        totalDuration: mentor.course.totalDuration,
        modulesCount: mentor.course.modules.length,
        lessonsCount: totalLessons,
        completedLessons,
        pct,
      });
    }
  }

  // Sort: in-progress first, then not started, then completed
  courses.sort((a, b) => {
    if (a.pct > 0 && a.pct < 100 && !(b.pct > 0 && b.pct < 100)) return -1;
    if (b.pct > 0 && b.pct < 100 && !(a.pct > 0 && a.pct < 100)) return 1;
    if (a.pct === 0 && b.pct === 100) return -1;
    if (a.pct === 100 && b.pct === 0) return 1;
    return b.pct - a.pct;
  });

  const inProgress = courses.filter((c) => c.pct > 0 && c.pct < 100);
  const notStarted = courses.filter((c) => c.pct === 0);
  const completed = courses.filter((c) => c.pct === 100);

  function CourseCard({ course, index, delay = 0 }: { course: (typeof courses)[0]; index: number; delay?: number }) {
    const isComplete = course.pct === 100;
    const isActive = course.pct > 0 && course.pct < 100;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: delay + index * 0.06 }}
        className="group p-6 rounded-2xl border border-black/[0.06] bg-white cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        onClick={() => navigate(`/tools/${course.categorySlug}/${course.mentorId}`)}
      >
        <div className="flex items-start gap-4">
          {/* Mentor avatar */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: isComplete ? "#D4A017" : "#000000",
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            {course.mentorInitials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="px-2 py-0.5 rounded-full"
                style={{
                  fontSize: "0.5625rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  backgroundColor: "rgba(59,130,246,0.08)",
                  color: "#3b82f6",
                }}
              >
                {course.categoryLabel}
              </span>
              <span style={{ fontSize: "0.625rem", fontWeight: 500, color: "#000000" }}>
                {course.difficulty}
              </span>
            </div>

            <h3
              className="truncate"
              style={{ fontSize: "1.25rem", fontWeight: 700, color: "#000000" }}
            >
              {course.courseTitle}
            </h3>
            <p
              className="truncate"
              style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#000000", marginTop: 2 }}
            >
              with {course.mentorName}
            </p>

            {/* Progress bar */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex-1 h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${course.pct}%`,
                    backgroundColor: isComplete ? "#D4A017" : "#000000",
                  }}
                />
              </div>
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#000000" }}>
                {course.pct}%
              </span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1" style={{ fontSize: "0.625rem", fontWeight: 500, color: "#000000" }}>
                <BookOpen size={10} /> {course.completedLessons}/{course.lessonsCount} lessons
              </span>
              <span className="flex items-center gap-1" style={{ fontSize: "0.625rem", fontWeight: 500, color: "#000000" }}>
                <Clock size={10} /> {course.totalDuration}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0 mt-3">
            {isComplete ? (
              <div className="w-8 h-8 rounded-full bg-[#D4A017]/10 flex items-center justify-center">
                <Check size={14} style={{ color: "#D4A017" }} />
              </div>
            ) : isActive ? (
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <Play size={10} className="text-white ml-0.5" />
              </div>
            ) : (
              <ChevronRight size={16} style={{ color: "rgba(0,0,0,0.2)" }} />
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  function SectionHeader({ title, count, delay = 0 }: { title: string; count: number; delay?: number }) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay }}
        className="flex items-center gap-3 mb-4"
      >
        <h2 style={{ fontSize: "0.875rem", fontWeight: 800, color: "#000000" }}>{title}</h2>
        <div
          className="px-2 py-0.5 rounded-full"
          style={{ backgroundColor: "rgba(0,0,0,0.06)", fontSize: "0.625rem", fontWeight: 700, color: "#000000" }}
        >
          {count}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p
          className="mb-1"
          style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3b82f6" }}
        >
          Learning
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
          My Courses
        </h1>
        <p className="mt-2" style={{ fontSize: "0.875rem", fontWeight: 400, color: "#000000" }}>
          {courses.length} courses available across {mentorCategories.length} domains
        </p>
      </motion.div>

      {/* In Progress */}
      {inProgress.length > 0 && (
        <div className="mb-10">
          <SectionHeader title="In Progress" count={inProgress.length} delay={0.1} />
          <div className="space-y-3">
            {inProgress.map((c, i) => (
              <CourseCard key={`${c.categorySlug}-${c.mentorId}`} course={c} index={i} delay={0.15} />
            ))}
          </div>
        </div>
      )}

      {/* Not Started */}
      {notStarted.length > 0 && (
        <div className="mb-10">
          <SectionHeader title="Not Started" count={notStarted.length} delay={0.2} />
          <div className="space-y-3">
            {notStarted.map((c, i) => (
              <CourseCard key={`${c.categorySlug}-${c.mentorId}`} course={c} index={i} delay={0.25} />
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div className="mb-10">
          <SectionHeader title="Completed" count={completed.length} delay={0.3} />
          <div className="space-y-3">
            {completed.map((c, i) => (
              <CourseCard key={`${c.categorySlug}-${c.mentorId}`} course={c} index={i} delay={0.35} />
            ))}
          </div>
        </div>
      )}

      {/* Explore more CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center pt-6"
      >
        <button
          onClick={() => navigate("/tools")}
          className="group inline-flex items-center gap-2 px-7 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          style={{ fontSize: "0.8125rem", fontWeight: 600 }}
        >
          Explore Mastery Space
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </div>
  );
}