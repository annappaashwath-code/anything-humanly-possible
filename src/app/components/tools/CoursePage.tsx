import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Users,
  Check,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Target,
  Zap,
  Award,
  Quote,
  Heart,
  Lightbulb,
  Dumbbell,
  GraduationCap,
  ArrowUp,
  Sparkles,
  TrendingUp,
  BarChart3,
  MessageCircle,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { skillCategories, type Course } from "./toolsData";
import { courseDetails, type CourseDetail, type CourseModule } from "./courseDetailData";
import { MentorGuide } from "./MentorGuide";

/* ────────────────────────────────────────────
   LocalStorage helpers
   ──────────────────────────────────────────── */

const ENROLLMENT_KEY = "course-enrollment";
const PROGRESS_KEY = "course-progress";

function getEnrollment(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(ENROLLMENT_KEY) || "{}"); } catch { return {}; }
}
function saveEnrollment(e: Record<string, boolean>) {
  localStorage.setItem(ENROLLMENT_KEY, JSON.stringify(e));
}
function getModuleProgress(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}"); } catch { return {}; }
}
function saveModuleProgress(p: Record<string, boolean>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

/* ────────────────────────────────────────────
   Helper: find course + context
   ──────────────────────────────────────────── */

function findCourse(courseId: string): {
  course: Course;
  categoryId: string;
  categoryLabel: string;
  categoryColor: string;
  cardTitle: string;
} | null {
  for (const cat of skillCategories) {
    for (const card of cat.cards) {
      for (const course of card.courses) {
        if (course.id === courseId) {
          return {
            course,
            categoryId: cat.id,
            categoryLabel: cat.label,
            categoryColor: cat.color,
            cardTitle: card.title,
          };
        }
      }
    }
  }
  return null;
}

/* ────────────────────────────────────────────
   Star Rating
   ──────────────────────────────────────────── */

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = rating >= i ? 1 : rating >= i - 0.5 ? 0.5 : 0;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 12 12">
            <defs>
              <linearGradient id={`cstar-${i}-${rating}`}>
                <stop offset={`${fill * 100}%`} stopColor="#f59e0b" />
                <stop offset={`${fill * 100}%`} stopColor="#e5e5e5" />
              </linearGradient>
            </defs>
            <path
              d="M6 1l1.545 3.13L11 4.635 8.5 7.07l.59 3.44L6 8.885 2.91 10.51l.59-3.44L1 4.635l3.455-.505L6 1z"
              fill={`url(#cstar-${i}-${rating})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────
   Difficulty Badge
   ──────────────────────────────────────────── */

function DiffBadge({ level }: { level: string }) {
  const s: Record<string, string> = {
    Beginner: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Intermediate: "bg-amber-50 text-amber-600 border-amber-100",
    Advanced: "bg-red-50 text-red-500 border-red-100",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full border ${s[level] || ""}`} style={{ fontSize: "0.6875rem", fontWeight: 700 }}>
      {level}
    </span>
  );
}

/* ────────────────────────────────────────────
   Module Accordion
   ──────────────────────────────────────────── */

function ModuleAccordion({
  module: mod,
  index,
  catColor,
  lessonProgress,
  onToggleLesson,
}: {
  module: CourseModule;
  index: number;
  catColor: string;
  lessonProgress: Record<string, boolean>;
  onToggleLesson: (id: string) => void;
}) {
  const [open, setOpen] = useState(index === 0);
  const completed = mod.lessons.filter((l) => lessonProgress[l.id]).length;
  const total = mod.lessons.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-neutral-50/50 transition-colors cursor-pointer text-left"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${catColor}15`, color: catColor }}
        >
          <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-neutral-900 truncate" style={{ fontSize: "0.875rem", fontWeight: 700 }}>
            {mod.title}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-neutral-400" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>
              {total} lessons
            </span>
            <span className="text-neutral-200">·</span>
            <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: catColor }}>
              {pct}% complete
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Mini progress bar */}
          <div className="hidden sm:block w-20 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: catColor }} />
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} className="text-neutral-300" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 space-y-1">
              {mod.lessons.map((lesson) => {
                const done = !!lessonProgress[lesson.id];
                return (
                  <button
                    key={lesson.id}
                    onClick={() => onToggleLesson(lesson.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-left ${
                      done ? "bg-neutral-50/80" : "hover:bg-neutral-50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        done ? "text-white" : "border-2 border-neutral-200"
                      }`}
                      style={{ backgroundColor: done ? catColor : "transparent" }}
                    >
                      {done && <Check size={10} strokeWidth={3} />}
                    </div>
                    <span
                      className={`flex-1 ${done ? "text-neutral-400 line-through" : "text-neutral-700"}`}
                      style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                    >
                      {lesson.title}
                    </span>
                    <span className="text-neutral-300 flex-shrink-0" style={{ fontSize: "0.625rem", fontWeight: 500 }}>
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
}

/* ────────────────────────────────────────────
   Exercise Card
   ──────────────────────────────────────────── */

const exerciseIcons: Record<string, typeof Dumbbell> = {
  code: GraduationCap,
  reflection: Heart,
  design: Sparkles,
  analysis: BarChart3,
  writing: BookOpen,
  practice: Dumbbell,
};

function ExerciseCard({ exercise, catColor }: { exercise: { id: string; title: string; description: string; type: string }; catColor: string }) {
  const Icon = exerciseIcons[exercise.type] || Dumbbell;
  return (
    <div className="group p-5 bg-white rounded-xl border border-neutral-100 hover:border-neutral-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${catColor}12`, color: catColor }}>
          <Icon size={16} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-neutral-900" style={{ fontSize: "0.875rem", fontWeight: 700 }}>{exercise.title}</h4>
            <span className="px-2 py-px rounded-full bg-neutral-50 text-neutral-400 border border-neutral-100" style={{ fontSize: "0.5rem", fontWeight: 600 }}>
              {exercise.type}
            </span>
          </div>
          <p className="text-neutral-500" style={{ fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.7 }}>
            {exercise.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Course Page
   ──────────────────────────────────────────── */

export function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [enrolled, setEnrolled] = useState(false);
  const [lessonProgress, setLessonProgress] = useState<Record<string, boolean>>({});
  const [showTop, setShowTop] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [courseId]);

  useEffect(() => {
    if (courseId) {
      setEnrolled(!!getEnrollment()[courseId]);
      setLessonProgress(getModuleProgress());
    }
  }, [courseId]);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleEnroll = useCallback(() => {
    if (!courseId) return;
    const e = getEnrollment();
    e[courseId] = true;
    saveEnrollment(e);
    setEnrolled(true);
  }, [courseId]);

  const toggleLesson = useCallback((lessonId: string) => {
    setLessonProgress((prev) => {
      const next = { ...prev, [lessonId]: !prev[lessonId] };
      saveModuleProgress(next);
      return next;
    });
  }, []);

  // Find data
  const ctx = courseId ? findCourse(courseId) : null;
  const detail = courseId ? courseDetails[courseId] : null;

  if (!ctx || !detail) {
    return (
      <div className="relative min-h-screen bg-[#fafaf9]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 text-center">
          <h1 className="text-neutral-900 mb-4" style={{ fontSize: "2rem", fontWeight: 900 }}>Course not found</h1>
          <p className="text-neutral-500 mb-8" style={{ fontSize: "1rem" }}>The course you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/tools")} className="px-6 py-3 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors cursor-pointer" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
            Back to Mastery Space
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const { course, categoryLabel, categoryColor, cardTitle } = ctx;

  // Progress calc
  const allLessons = detail.modules.flatMap((m) => m.lessons);
  const completedLessons = allLessons.filter((l) => lessonProgress[l.id]).length;
  const progressPct = allLessons.length > 0 ? Math.round((completedLessons / allLessons.length) * 100) : 0;

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="relative min-h-screen bg-[#fafaf9]">
      <Navbar />

      {/* Back-to-top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-neutral-900 text-white shadow-lg hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative bg-white border-b border-neutral-100 pt-24 pb-10 sm:pt-28 sm:pb-14 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundSize: "40px 40px", backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)" }} />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <button onClick={() => navigate("/tools")} className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                <ArrowLeft size={12} /> Tools & Resources
              </button>
              <ChevronRight size={10} className="text-neutral-300" />
              <span className="text-neutral-400" style={{ fontSize: "0.75rem", fontWeight: 500 }}>{categoryLabel}</span>
              <ChevronRight size={10} className="text-neutral-300" />
              <span className="text-neutral-400" style={{ fontSize: "0.75rem", fontWeight: 500 }}>{cardTitle}</span>
            </div>

            {/* Title */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <DiffBadge level={course.difficulty} />
                  <span className="px-2.5 py-1 rounded-full border border-neutral-100 text-neutral-400" style={{ fontSize: "0.6875rem", fontWeight: 600 }}>
                    {course.provider}
                  </span>
                  {course.free && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100" style={{ fontSize: "0.6875rem", fontWeight: 700 }}>
                      100% FREE
                    </span>
                  )}
                </div>
                <h1 className="text-neutral-900 mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                  {course.title}
                </h1>
                <p className="text-neutral-500" style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.7 }}>
                  {detail.overview.slice(0, 200)}...
                </p>
              </div>

              {/* Stats card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-neutral-50/80 rounded-2xl border border-neutral-100 p-5 lg:w-72 flex-shrink-0"
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    { icon: Clock, label: "Duration", value: course.duration },
                    { icon: BarChart3, label: "Completion", value: `${course.completionRate}%` },
                    { icon: Users, label: "Enrolled", value: course.ratingCount.toLocaleString() },
                    { icon: TrendingUp, label: "Skills", value: `${course.topSkills.length} key` },
                  ].map((s) => {
                    const I = s.icon;
                    return (
                      <div key={s.label}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <I size={12} className="text-neutral-400" />
                          <span className="text-neutral-400" style={{ fontSize: "0.5625rem", fontWeight: 500 }}>{s.label}</span>
                        </div>
                        <span className="text-neutral-900" style={{ fontSize: "0.9375rem", fontWeight: 800 }}>{s.value}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={course.rating} />
                  <span className="text-neutral-900" style={{ fontSize: "0.875rem", fontWeight: 800 }}>{course.rating}</span>
                  <span className="text-neutral-400" style={{ fontSize: "0.6875rem" }}>({course.ratingCount.toLocaleString()})</span>
                </div>

                {/* Enroll / Progress */}
                {enrolled ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-neutral-600" style={{ fontSize: "0.75rem", fontWeight: 700 }}>Your progress</span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 800, color: categoryColor }}>{progressPct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: categoryColor }} initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 0.8 }} />
                    </div>
                    <p className="text-neutral-400 mt-1.5" style={{ fontSize: "0.625rem", fontWeight: 500 }}>{completedLessons}/{allLessons.length} lessons completed</p>
                  </div>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="w-full py-3 rounded-xl text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    style={{ backgroundColor: categoryColor, fontSize: "0.875rem", fontWeight: 700 }}
                  >
                    Enroll for Free
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-10 sm:py-14">
        <div className="space-y-12">

          {/* ── Overview ── */}
          <FadeSection>
            <SectionTitle icon={BookOpen} title="Course Overview" color={categoryColor} />
            <p className="text-neutral-600 mt-4" style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.85 }}>
              {detail.overview}
            </p>
          </FadeSection>

          {/* ── Learning Objectives ── */}
          <FadeSection>
            <SectionTitle icon={Target} title="What You'll Learn" color={categoryColor} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {detail.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-neutral-100">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}>
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span className="text-neutral-700" style={{ fontSize: "0.8125rem", fontWeight: 500, lineHeight: 1.5 }}>{obj}</span>
                </div>
              ))}
            </div>
          </FadeSection>

          {/* ── Prerequisites ── */}
          <FadeSection>
            <SectionTitle icon={Zap} title="Prerequisites" color={categoryColor} />
            <div className="flex flex-wrap gap-2 mt-4">
              {detail.prerequisites.map((p, i) => (
                <span key={i} className="px-3.5 py-2 rounded-xl bg-white border border-neutral-100 text-neutral-600" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                  {p}
                </span>
              ))}
            </div>
          </FadeSection>

          {/* ── Interactive Mentor Guide ── */}
          <FadeSection>
            <MentorGuide
              course={course}
              detail={detail}
              categoryColor={categoryColor}
              categoryLabel={categoryLabel}
              enrolled={enrolled}
            />
          </FadeSection>

          {/* ── Course Modules ── */}
          <FadeSection>
            <SectionTitle icon={GraduationCap} title="Course Curriculum" color={categoryColor} />
            <p className="text-neutral-500 mt-2 mb-5" style={{ fontSize: "0.8125rem", fontWeight: 400 }}>
              {detail.modules.length} modules · {allLessons.length} lessons · Check off lessons as you complete them
            </p>
            <div className="space-y-3">
              {detail.modules.map((mod, i) => (
                <ModuleAccordion
                  key={mod.id}
                  module={mod}
                  index={i}
                  catColor={categoryColor}
                  lessonProgress={lessonProgress}
                  onToggleLesson={toggleLesson}
                />
              ))}
            </div>
          </FadeSection>

          {/* ── Skills You'll Gain ── */}
          <FadeSection>
            <SectionTitle icon={Award} title="Skills You'll Gain" color={categoryColor} />
            <div className="flex flex-wrap gap-2 mt-4">
              {course.topSkills.map((s) => (
                <span key={s} className="px-4 py-2 rounded-xl text-white" style={{ fontSize: "0.8125rem", fontWeight: 600, backgroundColor: categoryColor }}>
                  {s}
                </span>
              ))}
            </div>
          </FadeSection>

          {/* ── Real-World Examples ── */}
          <FadeSection>
            <SectionTitle icon={Lightbulb} title="Real-World Examples" color={categoryColor} />
            <div className="space-y-4 mt-4">
              {detail.realWorldExamples.map((ex, i) => (
                <div key={i} className="bg-white rounded-2xl border border-neutral-100 p-6 hover:shadow-md transition-all duration-300">
                  <h4 className="text-neutral-900 mb-2" style={{ fontSize: "1rem", fontWeight: 800 }}>{ex.title}</h4>
                  <p className="text-neutral-500 mb-4" style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.75 }}>{ex.description}</p>
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-neutral-50">
                    <Lightbulb size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-neutral-700" style={{ fontSize: "0.8125rem", fontWeight: 600, lineHeight: 1.5, fontStyle: "italic" }}>
                      {ex.lesson}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>

          {/* ── Interactive Exercises ── */}
          <FadeSection>
            <SectionTitle icon={Dumbbell} title="Interactive Exercises" color={categoryColor} />
            <div className="space-y-3 mt-4">
              {detail.exercises.map((ex) => (
                <ExerciseCard key={ex.id} exercise={ex} catColor={categoryColor} />
              ))}
            </div>
          </FadeSection>

          {/* ── Category Wisdom ── */}
          <FadeSection>
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 p-8 sm:p-10">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundSize: "3px 3px", backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)" }} />
              <div className="relative">
                <Quote size={28} className="text-white/15 mb-4" />
                <blockquote className="text-white mb-3" style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.5 }}>
                  "{detail.categoryWisdom.quote}"
                </blockquote>
                <p className="text-white/40 mb-5" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                  — {detail.categoryWisdom.author}
                </p>
                <div className="border-t border-white/10 pt-5">
                  <p className="text-white/50" style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.8 }}>
                    {detail.categoryWisdom.insight}
                  </p>
                </div>
              </div>
            </div>
          </FadeSection>

          {/* ── Community Note ── */}
          <FadeSection>
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${categoryColor}12`, color: categoryColor }}>
                  <MessageCircle size={16} />
                </div>
                <h3 className="text-neutral-900" style={{ fontSize: "1rem", fontWeight: 800 }}>From the Community</h3>
              </div>
              <p className="text-neutral-500" style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.8 }}>
                {detail.communityNote}
              </p>
            </div>
          </FadeSection>

          {/* ── CTA ── */}
          <FadeSection>
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: categoryColor }}>
                <Sparkles size={22} className="text-white" />
              </div>
              <h2 className="text-neutral-900 mb-3" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                {enrolled ? "Keep going — you're doing great" : "Ready to begin?"}
              </h2>
              <p className="text-neutral-500 max-w-md mx-auto mb-6" style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.7 }}>
                {enrolled
                  ? `You've completed ${completedLessons} of ${allLessons.length} lessons. Every step forward is progress.`
                  : "This course is completely free and community-driven. No paywalls, no hidden fees — just powerful knowledge waiting for you."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {!enrolled && (
                  <button
                    onClick={handleEnroll}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-full text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    style={{ backgroundColor: categoryColor, fontSize: "0.875rem", fontWeight: 700 }}
                  >
                    <Zap size={15} />
                    Enroll for Free
                  </button>
                )}
                <button
                  onClick={() => navigate("/tools")}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-all duration-300 cursor-pointer"
                  style={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  Explore more courses
                  <ArrowLeft size={15} className="rotate-180" />
                </button>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ────────────────────────────────────────────
   Utility components
   ──────────────────────────────────────────── */

function FadeSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ icon: Icon, title, color }: { icon: typeof BookOpen; title: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}12`, color }}>
        <Icon size={15} />
      </div>
      <h3 className="text-neutral-900" style={{ fontSize: "1.125rem", fontWeight: 800 }}>{title}</h3>
    </div>
  );
}