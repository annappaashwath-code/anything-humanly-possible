import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Search,
  Check,
  ExternalLink,
  BookOpen,
  Wrench,
  Users,
  FileText,
  GraduationCap,
  ChevronDown,
  Target,
  Star,
  Filter,
  X,
  ArrowUp,
  Sparkles,
  ArrowRight,
  Library,
  Zap,
  CheckCircle2,
  LayoutGrid,
  Clock,
  TrendingUp,
  DollarSign,
  Headphones,
  ScrollText,
  Newspaper,
  Brain,
  Flame,
  Award,
  BarChart3,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import {
  skillCategories,
  getTotalMilestoneCount,
  getTotalCourseCount,
  getTotalDeepResourceCount,
  aiEraSkills,
  type SkillCategory,
  type ResourceCard as ResourceCardType,
  type ResourceLink,
  type Course,
  type DeepResource,
} from "./toolsData";

/* ────────────────────────────────────────────
   Local Storage
   ──────────────────────────────────────────── */

const STORAGE_KEY = "tools-progress";

function getProgress(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveProgress(p: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

/* ────────────────────────────────────────────
   Resource-type visual config
   ──────────────────────────────────────────── */

const resourceMeta: Record<
  ResourceLink["type"],
  { icon: typeof GraduationCap; label: string; pill: string; dot: string }
> = {
  course: {
    icon: GraduationCap,
    label: "Course",
    pill: "bg-blue-50 text-blue-600 border-blue-100",
    dot: "bg-blue-500",
  },
  tool: {
    icon: Wrench,
    label: "Tool",
    pill: "bg-amber-50 text-amber-600 border-amber-100",
    dot: "bg-amber-500",
  },
  book: {
    icon: BookOpen,
    label: "Book",
    pill: "bg-violet-50 text-violet-600 border-violet-100",
    dot: "bg-violet-500",
  },
  community: {
    icon: Users,
    label: "Community",
    pill: "bg-emerald-50 text-emerald-600 border-emerald-100",
    dot: "bg-emerald-500",
  },
  article: {
    icon: FileText,
    label: "Article",
    pill: "bg-rose-50 text-rose-600 border-rose-100",
    dot: "bg-rose-500",
  },
};

const deepResourceMeta: Record<
  DeepResource["type"],
  { icon: typeof Headphones; label: string; pill: string }
> = {
  article: {
    icon: Newspaper,
    label: "Article",
    pill: "bg-rose-50 text-rose-600 border-rose-100",
  },
  whitepaper: {
    icon: ScrollText,
    label: "Whitepaper",
    pill: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  podcast: {
    icon: Headphones,
    label: "Podcast",
    pill: "bg-orange-50 text-orange-600 border-orange-100",
  },
};

/* ────────────────────────────────────────────
   Animated number
   ──────────────────────────────────────────── */

function AnimatedCounter({
  value,
  inView,
}: {
  value: number;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);
  return <>{display}</>;
}

/* ────────────────────────────────────────────
   Star Rating
   ──────────────────────────────────────────── */

function StarRating({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = rating >= i ? 1 : rating >= i - 0.5 ? 0.5 : 0;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 12 12">
            <defs>
              <linearGradient id={`star-grad-${i}-${rating}`}>
                <stop offset={`${fill * 100}%`} stopColor="#f59e0b" />
                <stop offset={`${fill * 100}%`} stopColor="#e5e5e5" />
              </linearGradient>
            </defs>
            <path
              d="M6 1l1.545 3.13L11 4.635 8.5 7.07l.59 3.44L6 8.885 2.91 10.51l.59-3.44L1 4.635l3.455-.505L6 1z"
              fill={`url(#star-grad-${i}-${rating})`}
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

function DifficultyBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    Beginner: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Intermediate: "bg-amber-50 text-amber-600 border-amber-100",
    Advanced: "bg-red-50 text-red-500 border-red-100",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full border ${styles[level] || "bg-neutral-50 text-neutral-500"}`}
      style={{ fontSize: "0.5625rem", fontWeight: 700 }}
    >
      {level}
    </span>
  );
}

/* ────────────────────────────────────────────
   Radial Progress Ring (sidebar)
   ──────────────────────────────────────────── */

function RadialProgress({ pct, size = 120 }: { pct: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f5f5f4"
          strokeWidth="8"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#171717"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-neutral-900"
          style={{ fontSize: "1.75rem", fontWeight: 900 }}
        >
          {pct}%
        </span>
        <span
          className="text-neutral-400 -mt-0.5"
          style={{ fontSize: "0.625rem", fontWeight: 500 }}
        >
          complete
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Sidebar
   ──────────────────────────────────────────── */

function Sidebar({
  progress,
  activeFilter,
  setActiveFilter,
}: {
  progress: Record<string, boolean>;
  activeFilter: string | null;
  setActiveFilter: (f: string | null) => void;
}) {
  const total = getTotalMilestoneCount();
  const completed = Object.values(progress).filter(Boolean).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Radial overall progress */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-6 text-center">
        <RadialProgress pct={pct} />
        <p
          className="text-neutral-900 mt-4"
          style={{ fontSize: "0.875rem", fontWeight: 700 }}
        >
          Learning Journey
        </p>
        <p
          className="text-neutral-400 mt-0.5"
          style={{ fontSize: "0.6875rem", fontWeight: 500 }}
        >
          {completed} of {total} milestones completed
        </p>
        {completed === 0 && (
          <p
            className="text-neutral-400 mt-3 mx-auto max-w-[200px]"
            style={{
              fontSize: "0.625rem",
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            Check off your first milestone to start tracking progress.
          </p>
        )}
      </div>

      {/* Category nav */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <LayoutGrid size={13} className="text-neutral-400" />
          <p
            className="text-neutral-900"
            style={{ fontSize: "0.8125rem", fontWeight: 700 }}
          >
            Browse Categories
          </p>
        </div>
        <div className="space-y-0.5">
          {skillCategories.map((cat) => {
            const ms = cat.cards.flatMap((c) => c.milestones);
            const done = ms.filter((m) => progress[m.id]).length;
            const catPct =
              ms.length > 0 ? Math.round((done / ms.length) * 100) : 0;
            const Icon = cat.icon;
            const active = activeFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFilter(active ? null : cat.id);
                  if (!active) {
                    const el = document.querySelector(`#cat-${cat.id}`);
                    if (el)
                      setTimeout(
                        () =>
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          }),
                        80
                      );
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                  active ? "bg-neutral-900" : "hover:bg-neutral-50"
                }`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={
                    active
                      ? { backgroundColor: "rgba(255,255,255,0.12)" }
                      : {
                          backgroundColor: `${cat.color}12`,
                          color: cat.color,
                        }
                  }
                >
                  <Icon
                    size={13}
                    className={active ? "text-white" : ""}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`truncate ${active ? "text-white" : "text-neutral-700"}`}
                      style={{ fontSize: "0.75rem", fontWeight: 600 }}
                    >
                      {cat.label}
                    </span>
                    <span
                      className={active ? "text-white/50" : "text-neutral-300"}
                      style={{ fontSize: "0.5625rem", fontWeight: 700 }}
                    >
                      {catPct}%
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{
                      backgroundColor: active
                        ? "rgba(255,255,255,0.1)"
                        : "#f5f5f4",
                    }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${catPct}%`,
                        backgroundColor: active ? "#fff" : cat.color,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Library stats */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Library size={13} className="text-neutral-400" />
          <p
            className="text-neutral-900"
            style={{ fontSize: "0.8125rem", fontWeight: 700 }}
          >
            Library Overview
          </p>
        </div>
        {[
          {
            icon: LayoutGrid,
            label: "Categories",
            v: skillCategories.length,
          },
          {
            icon: GraduationCap,
            label: "Curated courses",
            v: getTotalCourseCount(),
          },
          {
            icon: BookOpen,
            label: "Deep resources",
            v: getTotalDeepResourceCount(),
          },
          {
            icon: Target,
            label: "Project guides",
            v: skillCategories.reduce(
              (a, c) =>
                a + c.cards.reduce((b, d) => b + d.projects.length, 0),
              0
            ),
          },
          { icon: Star, label: "Milestones", v: total },
        ].map((s) => {
          const I = s.icon;
          return (
            <div
              key={s.label}
              className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0"
            >
              <span className="flex items-center gap-2 text-neutral-500">
                <I size={11} />
                <span style={{ fontSize: "0.6875rem", fontWeight: 500 }}>
                  {s.label}
                </span>
              </span>
              <span
                className="text-neutral-900"
                style={{ fontSize: "0.75rem", fontWeight: 800 }}
              >
                {s.v}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Category Section Header
   ──────────────────────────────────────────── */

function CategoryHeader({
  category,
  progress,
}: {
  category: SkillCategory;
  progress: Record<string, boolean>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = category.icon;

  const ms = category.cards.flatMap((c) => c.milestones);
  const done = ms.filter((m) => progress[m.id]).length;
  const pct = ms.length > 0 ? Math.round((done / ms.length) * 100) : 0;
  const courseCount = category.cards.reduce(
    (a, c) => a + c.courses.length,
    0
  );

  return (
    <motion.div
      ref={ref}
      id={`cat-${category.id}`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24 mb-7"
    >
      <div className="relative rounded-2xl overflow-hidden">
        <div className="h-48 sm:h-56">
          <ImageWithFallback
            src={category.image}
            alt={category.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        </div>

        <div className="absolute inset-0 flex items-center px-6 sm:px-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-lg border border-white/10"
                style={{ backgroundColor: `${category.color}25` }}
              >
                <Icon size={18} className="text-white" />
              </div>
              <span
                className="text-white/35 tracking-[0.2em] uppercase"
                style={{ fontSize: "0.625rem", fontWeight: 600 }}
              >
                {category.tagline}
              </span>
            </div>
            <h2
              className="text-white mb-1.5"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              {category.label}
            </h2>
            <p
              className="text-white/50 max-w-lg hidden sm:block"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 400,
                lineHeight: 1.65,
              }}
            >
              {category.description}
            </p>

            <div className="flex items-center gap-4 mt-4">
              {[
                { label: "Courses", v: courseCount },
                { label: "Tracks", v: category.cards.length },
                { label: "Progress", v: `${pct}%` },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center px-3 first:pl-0"
                >
                  <span
                    className="text-white"
                    style={{ fontSize: "1rem", fontWeight: 800 }}
                  >
                    {s.v}
                  </span>
                  <span
                    className="text-white/30"
                    style={{ fontSize: "0.5625rem", fontWeight: 500 }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="relative w-16 h-16">
              <svg
                viewBox="0 0 64 64"
                className="w-full h-full -rotate-90"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 26}
                  strokeDashoffset={2 * Math.PI * 26 * (1 - pct / 100)}
                  style={{
                    transition: "stroke-dashoffset 1s ease-out",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-white"
                  style={{ fontSize: "0.8125rem", fontWeight: 800 }}
                >
                  {pct}%
                </span>
              </div>
            </div>
            <span
              className="text-white/30"
              style={{ fontSize: "0.5625rem", fontWeight: 500 }}
            >
              {done}/{ms.length} done
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Course Card (individual)
   ──────────────────────────────────────────── */

function CourseCard({ course, catColor }: { course: Course; catColor: string }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/tools/course/${course.id}`)}
      className="group block p-4 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:shadow-md transition-all duration-300 bg-white cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="min-w-0 flex-1">
          <h4
            className="text-neutral-900 group-hover:text-neutral-700 transition-colors truncate"
            style={{ fontSize: "0.875rem", fontWeight: 700 }}
          >
            {course.title}
          </h4>
          <p
            className="text-neutral-400 mt-0.5"
            style={{ fontSize: "0.6875rem", fontWeight: 500 }}
          >
            {course.provider}
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {course.free && (
            <span
              className="px-1.5 py-px rounded bg-emerald-50 text-emerald-600 border border-emerald-100"
              style={{ fontSize: "0.5rem", fontWeight: 700 }}
            >
              FREE
            </span>
          )}
          <ExternalLink
            size={10}
            className="text-neutral-200 group-hover:text-neutral-400 transition-colors"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 mb-3">
        <span className="flex items-center gap-1 text-neutral-500" style={{ fontSize: "0.625rem", fontWeight: 500 }}>
          <Clock size={9} />
          {course.duration}
        </span>
        <DifficultyBadge level={course.difficulty} />
        <span className="flex items-center gap-1 text-neutral-500" style={{ fontSize: "0.625rem", fontWeight: 500 }}>
          <StarRating rating={course.rating} size={9} />
          <span style={{ fontWeight: 700 }}>{course.rating}</span>
          <span className="text-neutral-300">({course.ratingCount.toLocaleString()})</span>
        </span>
      </div>

      {/* Completion bar */}
      <div className="flex items-center gap-2 mb-2.5">
        <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: catColor }}
            initial={{ width: 0 }}
            whileInView={{ width: `${course.completionRate}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <span className="text-neutral-400 flex-shrink-0" style={{ fontSize: "0.5625rem", fontWeight: 600 }}>
          {course.completionRate}% complete
        </span>
      </div>

      {/* Top skills */}
      <div className="flex flex-wrap gap-1">
        {course.topSkills.map((s) => (
          <span
            key={s}
            className="px-1.5 py-px rounded bg-neutral-50 text-neutral-400 border border-neutral-100"
            style={{ fontSize: "0.5rem", fontWeight: 500 }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Tool Card — resource-forward design
   ──────────────────────────────────────────── */

function ToolCard({
  card,
  catColor,
  catLightBg,
  idx,
  progress,
  onToggle,
}: {
  card: ResourceCardType;
  catColor: string;
  catLightBg: string;
  idx: number;
  progress: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25px" });
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"courses" | "deep" | "projects" | "milestones">(
    "courses"
  );

  const navTo = useNavigate();
  const doneMilestones = card.milestones.filter((m) => progress[m.id]).length;
  const mPct =
    card.milestones.length > 0
      ? Math.round((doneMilestones / card.milestones.length) * 100)
      : 0;
  const freeCount = card.courses.filter((c) => c.free).length;
  const topCourses = card.courses.slice(0, 2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: idx * 0.06 }}
      className="flex flex-col"
    >
      <div
        className={`group relative flex flex-col flex-1 bg-white rounded-2xl border overflow-hidden transition-all duration-500 ${
          open
            ? "border-neutral-200 shadow-xl ring-1 ring-neutral-100"
            : "border-neutral-100 hover:border-neutral-200 hover:shadow-lg hover:-translate-y-1"
        }`}
      >
        {/* Accent top bar on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
          style={{ backgroundColor: catColor }}
        />

        {/* ─── Card face ─── */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          {/* Title row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 min-w-0">
              <span
                className="flex-shrink-0 mt-0.5"
                style={{ fontSize: "1.75rem", lineHeight: 1 }}
              >
                {card.icon}
              </span>
              <div className="min-w-0">
                <h3
                  className="text-neutral-900 group-hover:text-neutral-700 transition-colors"
                  style={{
                    fontSize: "1.0625rem",
                    fontWeight: 800,
                    lineHeight: 1.25,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-neutral-400 mt-0.5 truncate"
                  style={{ fontSize: "0.6875rem", fontWeight: 500 }}
                >
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Mini ring */}
            <div className="relative w-11 h-11 flex-shrink-0 ml-2">
              <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
                <circle
                  cx="22"
                  cy="22"
                  r="17"
                  fill="none"
                  stroke="#f5f5f4"
                  strokeWidth="3.5"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="17"
                  fill="none"
                  stroke={catColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 17}
                  strokeDashoffset={
                    2 * Math.PI * 17 * (1 - mPct / 100)
                  }
                  style={{
                    transition: "stroke-dashoffset 0.7s ease-out",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-neutral-600"
                  style={{ fontSize: "0.5625rem", fontWeight: 800 }}
                >
                  {mPct}%
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-neutral-500 mb-3"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            {card.description}
          </p>

          {/* ── Data points ── */}
          <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl bg-neutral-50/80">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <BarChart3 size={10} className="text-neutral-400" />
                <span className="text-neutral-900" style={{ fontSize: "0.8125rem", fontWeight: 800 }}>
                  {card.avgCompletionRate}%
                </span>
              </div>
              <span className="text-neutral-400" style={{ fontSize: "0.5rem", fontWeight: 500 }}>
                Avg completion
              </span>
            </div>
            <div className="text-center border-x border-neutral-100">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <TrendingUp size={10} className="text-neutral-400" />
                <span className="text-neutral-900" style={{ fontSize: "0.8125rem", fontWeight: 800 }}>
                  {card.topSkillsGained.length}
                </span>
              </div>
              <span className="text-neutral-400" style={{ fontSize: "0.5rem", fontWeight: 500 }}>
                Key skills
              </span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <DollarSign size={10} className="text-neutral-400" />
                <span className="text-neutral-900" style={{ fontSize: "0.6875rem", fontWeight: 800 }}>
                  {card.earningPotential.replace("N/A — ", "")}
                </span>
              </div>
              <span className="text-neutral-400" style={{ fontSize: "0.5rem", fontWeight: 500 }}>
                Earning potential
              </span>
            </div>
          </div>

          {/* ── Top courses preview ── */}
          <div className="space-y-1.5 mb-3">
            {topCourses.map((c) => (
              <div
                key={c.id}
                onClick={(e) => { e.stopPropagation(); navTo(`/tools/course/${c.id}`); }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-neutral-50/80 hover:bg-neutral-100 transition-all duration-200 group/res cursor-pointer"
              >
                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600 border border-blue-100">
                  <GraduationCap size={10} />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className="block truncate text-neutral-600 group-hover/res:text-neutral-900 transition-colors"
                    style={{ fontSize: "0.75rem", fontWeight: 600 }}
                  >
                    {c.title}
                  </span>
                  <span className="flex items-center gap-2 mt-0.5">
                    <span className="text-neutral-400" style={{ fontSize: "0.5625rem", fontWeight: 400 }}>{c.provider}</span>
                    <span className="text-neutral-300" style={{ fontSize: "0.5625rem" }}>·</span>
                    <span className="text-neutral-400" style={{ fontSize: "0.5625rem", fontWeight: 500 }}>{c.duration}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <DifficultyBadge level={c.difficulty} />
                  {c.free && (
                    <span
                      className="px-1.5 py-px rounded bg-emerald-50 text-emerald-600 border border-emerald-100"
                      style={{ fontSize: "0.5rem", fontWeight: 700 }}
                    >
                      FREE
                    </span>
                  )}
                </div>
              </div>
            ))}
            {card.courses.length > 2 && (
              <p
                className="text-neutral-300 pl-3"
                style={{ fontSize: "0.625rem", fontWeight: 500 }}
              >
                +{card.courses.length - 2} more courses
              </p>
            )}
          </div>

          {/* ── Inline stats ── */}
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mb-3">
            {[
              { icon: GraduationCap, text: `${card.courses.length} courses` },
              { icon: BookOpen, text: `${card.deepResources.length} articles/podcasts` },
              { icon: Target, text: `${card.projects.length} projects` },
              { icon: CheckCircle2, text: `${doneMilestones}/${card.milestones.length} done` },
            ].map((s) => {
              const SI = s.icon;
              return (
                <span
                  key={s.text}
                  className="flex items-center gap-1 text-neutral-400"
                  style={{ fontSize: "0.625rem", fontWeight: 500 }}
                >
                  <SI size={10} />
                  {s.text}
                </span>
              );
            })}
            {freeCount > 0 && (
              <span
                className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full"
                style={{ fontSize: "0.5625rem", fontWeight: 700 }}
              >
                <Zap size={8} />
                {freeCount} free
              </span>
            )}
          </div>

          {/* Top skills gained */}
          <div className="flex flex-wrap gap-1.5 mb-0">
            {card.topSkillsGained.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md text-neutral-400 border border-neutral-100"
                style={{
                  fontSize: "0.5625rem",
                  fontWeight: 500,
                  backgroundColor: `${catColor}08`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ─── Expand toggle ─── */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center gap-1.5 py-3 border-t border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          <span
            className="text-neutral-400 group-hover:text-neutral-600 transition-colors"
            style={{ fontSize: "0.6875rem", fontWeight: 600 }}
          >
            {open ? "Collapse" : "View all courses & milestones"}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown
              size={13}
              className="text-neutral-300 group-hover:text-neutral-500 transition-colors"
            />
          </motion.span>
        </button>

        {/* ─── Expanded panel ─── */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-neutral-100">
                {/* Long desc */}
                <div className="px-5 sm:px-6 pt-5 pb-3">
                  <p
                    className="text-neutral-500"
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      lineHeight: 1.8,
                    }}
                  >
                    {card.longDescription}
                  </p>
                </div>

                {/* Tabs */}
                <div className="px-5 sm:px-6 flex gap-0.5 border-b border-neutral-100 overflow-x-auto">
                  {(
                    [
                      {
                        key: "courses" as const,
                        label: "Courses",
                        icon: GraduationCap,
                        count: card.courses.length,
                      },
                      {
                        key: "deep" as const,
                        label: "Articles & Podcasts",
                        icon: BookOpen,
                        count: card.deepResources.length,
                      },
                      {
                        key: "projects" as const,
                        label: "Projects",
                        icon: Target,
                        count: card.projects.length,
                      },
                      {
                        key: "milestones" as const,
                        label: "Milestones",
                        icon: Star,
                        count: card.milestones.length,
                      },
                    ]
                  ).map((t) => {
                    const TI = t.icon;
                    const active = tab === t.key;
                    return (
                      <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`flex items-center gap-1.5 px-3 py-2.5 -mb-px border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                          active
                            ? "border-neutral-900 text-neutral-900"
                            : "border-transparent text-neutral-400 hover:text-neutral-600"
                        }`}
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: active ? 700 : 500,
                        }}
                      >
                        <TI size={12} />
                        {t.label}
                        <span
                          className={`px-1.5 py-px rounded-full ${
                            active
                              ? "bg-neutral-900 text-white"
                              : "bg-neutral-100 text-neutral-400"
                          }`}
                          style={{
                            fontSize: "0.5rem",
                            fontWeight: 700,
                          }}
                        >
                          {t.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab body */}
                <div className="px-5 sm:px-6 py-4">
                  {/* Courses */}
                  {tab === "courses" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {card.courses.map((c) => (
                        <CourseCard key={c.id} course={c} catColor={catColor} />
                      ))}
                    </div>
                  )}

                  {/* Deep resources */}
                  {tab === "deep" && (
                    <div className="space-y-2">
                      {card.deepResources.map((r) => {
                        const meta = deepResourceMeta[r.type];
                        const RI = meta.icon;
                        return (
                          <a
                            key={r.id}
                            href={r.url}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-neutral-50 transition-all group/link"
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.pill} border`}
                            >
                              <RI size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span
                                className="text-neutral-700 block truncate group-hover/link:text-neutral-900 transition-colors"
                                style={{ fontSize: "0.8125rem", fontWeight: 600 }}
                              >
                                {r.title}
                              </span>
                              <span className="flex items-center gap-2 text-neutral-400" style={{ fontSize: "0.625rem" }}>
                                <span>{r.provider}</span>
                                {r.readTime && <span>· {r.readTime} read</span>}
                                {r.episodes && <span>· {r.episodes} episodes</span>}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span
                                className={`px-1.5 py-px rounded-full ${meta.pill} border`}
                                style={{ fontSize: "0.5rem", fontWeight: 600 }}
                              >
                                {meta.label}
                              </span>
                              {r.free && (
                                <span
                                  className="px-1.5 py-px rounded-full bg-emerald-50 text-emerald-600"
                                  style={{ fontSize: "0.5rem", fontWeight: 700 }}
                                >
                                  FREE
                                </span>
                              )}
                              <ExternalLink
                                size={10}
                                className="text-neutral-200 group-hover/link:text-neutral-400 transition-colors"
                              />
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {/* Projects */}
                  {tab === "projects" && (
                    <div className="space-y-3">
                      {card.projects.map((p) => {
                        const diff: Record<string, string> = {
                          Beginner: "bg-emerald-50 text-emerald-600",
                          Intermediate: "bg-amber-50 text-amber-600",
                          Advanced: "bg-red-50 text-red-500",
                        };
                        return (
                          <div
                            key={p.id}
                            className="p-4 rounded-xl border border-neutral-100 hover:border-neutral-200 transition-all"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`px-2 py-0.5 rounded-full ${diff[p.difficulty]}`}
                                style={{
                                  fontSize: "0.5625rem",
                                  fontWeight: 700,
                                }}
                              >
                                {p.difficulty}
                              </span>
                              <h4
                                className="text-neutral-900"
                                style={{
                                  fontSize: "0.8125rem",
                                  fontWeight: 700,
                                }}
                              >
                                {p.title}
                              </h4>
                            </div>
                            <p
                              className="text-neutral-500 mb-3"
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 400,
                                lineHeight: 1.6,
                              }}
                            >
                              {p.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {p.skills.map((s) => (
                                <span
                                  key={s}
                                  className={`px-2 py-0.5 rounded-md ${catLightBg}`}
                                  style={{
                                    fontSize: "0.5625rem",
                                    fontWeight: 600,
                                    color: catColor,
                                  }}
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Milestones */}
                  {tab === "milestones" && (
                    <div className="space-y-1">
                      {card.milestones.map((m, i) => {
                        const isDone = !!progress[m.id];
                        return (
                          <button
                            key={m.id}
                            onClick={() => onToggle(m.id)}
                            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 cursor-pointer text-left ${
                              isDone
                                ? "bg-neutral-50/80"
                                : "hover:bg-neutral-50"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                isDone
                                  ? "text-white"
                                  : "border-2 border-neutral-200"
                              }`}
                              style={{
                                backgroundColor: isDone
                                  ? catColor
                                  : "transparent",
                              }}
                            >
                              {isDone ? (
                                <Check size={11} strokeWidth={3} />
                              ) : (
                                <span
                                  className="text-neutral-300"
                                  style={{
                                    fontSize: "0.5625rem",
                                    fontWeight: 700,
                                  }}
                                >
                                  {i + 1}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span
                                className={`block transition-colors ${
                                  isDone
                                    ? "text-neutral-400 line-through"
                                    : "text-neutral-700"
                                }`}
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                }}
                              >
                                {m.label}
                              </span>
                              <span
                                className="text-neutral-400 block"
                                style={{
                                  fontSize: "0.625rem",
                                  fontWeight: 400,
                                }}
                              >
                                {m.description}
                              </span>
                            </div>
                            {isDone && (
                              <span
                                className="px-2 py-0.5 rounded-full text-white flex-shrink-0"
                                style={{
                                  fontSize: "0.5rem",
                                  fontWeight: 700,
                                  backgroundColor: catColor,
                                }}
                              >
                                Done
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   AI Era Skills Section
   ──────────────────────────────────────────── */

function AIEraSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section ref={ref} className="mb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="relative rounded-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-6 sm:px-8 py-8 sm:py-10">
            {/* Animated grain */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundSize: "4px 4px",
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1px)",
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Brain size={18} className="text-white" />
                </div>
                <div>
                  <span
                    className="text-white/30 tracking-[0.2em] uppercase block"
                    style={{ fontSize: "0.5625rem", fontWeight: 600 }}
                  >
                    Emerging Skills
                  </span>
                  <h2
                    className="text-white"
                    style={{ fontSize: "1.5rem", fontWeight: 900, lineHeight: 1.2 }}
                  >
                    Skills for the AI Era
                  </h2>
                </div>
              </div>
              <p
                className="text-white/40 max-w-xl"
                style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.7 }}
              >
                The most valuable skills of the next decade live at the intersection
                of human creativity and artificial intelligence. These emerging
                disciplines are reshaping every industry.
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aiEraSkills.map((skill, i) => {
            const isOpen = expandedId === skill.id;
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-neutral-200 shadow-lg"
                    : "border-neutral-100 hover:border-neutral-200 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{skill.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-neutral-900"
                        style={{ fontSize: "0.9375rem", fontWeight: 800 }}
                      >
                        {skill.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-emerald-600" style={{ fontSize: "0.625rem", fontWeight: 700 }}>
                          <TrendingUp size={10} />
                          {skill.demandGrowth} demand
                        </span>
                        <span className="flex items-center gap-1 text-neutral-500" style={{ fontSize: "0.625rem", fontWeight: 600 }}>
                          <DollarSign size={10} />
                          {skill.avgSalary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-neutral-500 mb-3"
                    style={{ fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.7 }}
                  >
                    {skill.description}
                  </p>

                  {/* Key competencies */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {skill.keyCompetencies.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded-md bg-neutral-900 text-white"
                        style={{ fontSize: "0.5rem", fontWeight: 600 }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setExpandedId(isOpen ? null : skill.id)}
                    className="flex items-center gap-1 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                    style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                  >
                    {isOpen ? "Hide courses" : "View top courses"}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={12} />
                    </motion.span>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 space-y-1.5">
                        {skill.topCourses.map((c, ci) => (
                          <div
                            key={ci}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-neutral-50"
                          >
                            <div className="w-5 h-5 rounded-md flex items-center justify-center bg-neutral-900 text-white flex-shrink-0">
                              <GraduationCap size={9} />
                            </div>
                            <span
                              className="flex-1 truncate text-neutral-700"
                              style={{ fontSize: "0.75rem", fontWeight: 600 }}
                            >
                              {c.title}
                            </span>
                            <span className="text-neutral-400 flex-shrink-0" style={{ fontSize: "0.5625rem", fontWeight: 500 }}>
                              {c.provider}
                            </span>
                            {c.free && (
                              <span
                                className="px-1.5 py-px rounded bg-emerald-50 text-emerald-600 flex-shrink-0"
                                style={{ fontSize: "0.5rem", fontWeight: 700 }}
                              >
                                FREE
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Filter Bar
   ──────────────────────────────────────────── */

function FilterBar({
  search,
  setSearch,
  filter,
  setFilter,
  count,
}: {
  search: string;
  setSearch: (s: string) => void;
  filter: string | null;
  setFilter: (f: string | null) => void;
  count: number;
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 px-5 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-300"
          />
          <input
            type="text"
            placeholder="Search courses, tools, skills, topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-700 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-200 focus:ring-2 focus:ring-neutral-100 transition-all"
            style={{ fontSize: "0.8125rem", fontWeight: 500 }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-500 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Pill filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilter(null)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              !filter
                ? "bg-neutral-900 border-neutral-900 text-white"
                : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300"
            }`}
            style={{ fontSize: "0.6875rem", fontWeight: 600 }}
          >
            <Filter size={10} />
            All
          </button>
          {skillCategories.map((c) => {
            const Icon = c.icon;
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(active ? null : c.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  active
                    ? "text-white"
                    : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300"
                }`}
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  ...(active
                    ? {
                        backgroundColor: c.color,
                        borderColor: c.color,
                      }
                    : {}),
                }}
              >
                <Icon size={10} />
                {c.label}
                <span
                  className={
                    active ? "text-white/60" : "text-neutral-300"
                  }
                  style={{ fontSize: "0.5625rem", fontWeight: 700 }}
                >
                  {c.cards.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active context */}
      {(search || filter) && (
        <div className="mt-3 flex items-center gap-2">
          <span
            className="text-neutral-400"
            style={{ fontSize: "0.6875rem", fontWeight: 500 }}
          >
            Showing{" "}
            <span className="text-neutral-700" style={{ fontWeight: 700 }}>
              {count}
            </span>{" "}
            {count === 1 ? "result" : "results"}
          </span>
          <button
            onClick={() => {
              setSearch("");
              setFilter(null);
            }}
            className="text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer flex items-center gap-1"
            style={{ fontSize: "0.6875rem", fontWeight: 500 }}
          >
            <X size={10} />
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   Page
   ──────────────────────────────────────────── */

export function ToolsPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggle = useCallback((id: string) => {
    setProgress((p) => {
      const n = { ...p, [id]: !p[id] };
      saveProgress(n);
      return n;
    });
  }, []);

  const filtered = useMemo(() => {
    let cats = [...skillCategories];
    if (filter) cats = cats.filter((c) => c.id === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      cats = cats
        .map((c) => ({
          ...c,
          cards: c.cards.filter(
            (card) =>
              card.title.toLowerCase().includes(q) ||
              card.description.toLowerCase().includes(q) ||
              card.tags.some((t) => t.toLowerCase().includes(q)) ||
              card.topSkillsGained.some((s) => s.toLowerCase().includes(q)) ||
              card.courses.some((co) =>
                co.title.toLowerCase().includes(q)
              ) ||
              card.deepResources.some((dr) =>
                dr.title.toLowerCase().includes(q)
              )
          ),
        }))
        .filter((c) => c.cards.length > 0);
    }
    return cats;
  }, [filter, search]);

  const totalCards = filtered.reduce((a, c) => a + c.cards.length, 0);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const totalCourses = getTotalCourseCount();
  const totalDeepRes = getTotalDeepResourceCount();
  const totalProjects = skillCategories.reduce(
    (a, c) => a + c.cards.reduce((b, d) => b + d.projects.length, 0),
    0
  );

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
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-neutral-900 text-white shadow-lg hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative bg-white border-b border-neutral-100 pt-28 pb-12 sm:pt-32 sm:pb-16 overflow-hidden"
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundSize: "32px 32px",
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center">
                <Library size={17} className="text-white" />
              </div>
              <span
                className="text-neutral-400 tracking-[0.2em] uppercase"
                style={{ fontSize: "0.6875rem", fontWeight: 600 }}
              >
                Mastery Space
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div className="max-w-xl">
                <h1
                  className="text-neutral-900 mb-4"
                  style={{
                    fontSize: "clamp(2.25rem, 5.5vw, 3.5rem)",
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Everything you need
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #171717 0%, #525252 100%)",
                    }}
                  >
                    to learn anything
                  </span>
                </h1>
                <p
                  className="text-neutral-500 max-w-lg"
                  style={{
                    fontSize: "1.0625rem",
                    fontWeight: 400,
                    lineHeight: 1.75,
                  }}
                >
                  Curated courses with ratings, completion data, and earning
                  potential — plus articles, podcasts, and project guides.
                  Track your progress and build real skills.
                </p>
              </div>

              {/* Hero counters */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-8 lg:gap-10"
              >
                {[
                  { value: totalCourses, label: "Courses" },
                  { value: totalDeepRes, label: "Articles" },
                  { value: totalProjects, label: "Projects" },
                  {
                    value: getTotalMilestoneCount(),
                    label: "Milestones",
                  },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p
                      className="text-neutral-900"
                      style={{
                        fontSize: "2rem",
                        fontWeight: 900,
                        lineHeight: 1,
                      }}
                    >
                      <AnimatedCounter
                        value={s.value}
                        inView={heroInView}
                      />
                    </p>
                    <p
                      className="text-neutral-400 mt-1"
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 500,
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8 sm:py-10">
        {/* Filter bar */}
        <div className="mb-8">
          <FilterBar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            count={totalCards}
          />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Feed */}
          <div className="flex-1 min-w-0">
            {/* AI Era Skills Section */}
            {!filter && !search && <AIEraSection />}

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-2xl border border-neutral-100"
              >
                <Search
                  size={32}
                  className="mx-auto mb-4 text-neutral-200"
                />
                <p
                  className="text-neutral-500 mb-1"
                  style={{ fontSize: "1rem", fontWeight: 700 }}
                >
                  No results found
                </p>
                <p
                  className="text-neutral-400 mb-5"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                  }}
                >
                  Try different keywords or clear your filters.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setFilter(null);
                  }}
                  className="px-5 py-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                  }}
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              filtered.map((cat) => (
                <div key={cat.id}>
                  <CategoryHeader
                    category={cat}
                    progress={progress}
                  />
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-12">
                    {cat.cards.map((card, i) => (
                      <ToolCard
                        key={card.id}
                        card={card}
                        catColor={cat.color}
                        catLightBg={cat.lightBg}
                        idx={i}
                        progress={progress}
                        onToggle={toggle}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <Sidebar
                progress={progress}
                activeFilter={filter}
                setActiveFilter={setFilter}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER CTA ═══ */}
      <section className="bg-white border-t border-neutral-100 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center mx-auto mb-5">
              <Sparkles size={22} className="text-white" />
            </div>
            <h2
              className="text-neutral-900 mb-3"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
              }}
            >
              Anything humanly possible can be learned
            </h2>
            <p
              className="text-neutral-500 max-w-md mx-auto mb-8"
              style={{
                fontSize: "0.9375rem",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              Pick a course, mark your first milestone, and let the momentum
              carry you forward. Your journey starts now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="flex items-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                <ArrowUp size={15} />
                Back to top
              </button>
              <button
                onClick={() => navigate("/join")}
                className="flex items-center gap-2 px-7 py-3.5 bg-neutral-100 text-neutral-700 rounded-full hover:bg-neutral-200 transition-all duration-300 cursor-pointer"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Get Started
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
