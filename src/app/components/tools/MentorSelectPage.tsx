import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Sparkles, Users, Mic, Zap, Crown } from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { getMentorCategory, type MentorPersona } from "./mentorData";
import { SwipeCarousel } from "./SwipeCarousel";

/* ────────────────────────────────────────────
   Persona style configs — subtle visual differentiation per category
   ──────────────────────────────────────────── */

interface PersonaStyle {
  accentColor: string;
  iconBg: string;
  tagBg: string;
  tagColor: string;
  ctaStyle: string;
  initialsShape: string;
  borderAccent: string;
}

const personaStyles: Record<string, PersonaStyle> = {
  coding: { accentColor: "#3b82f6", iconBg: "bg-blue-50", tagBg: "bg-blue-50", tagColor: "#3b82f6", ctaStyle: "bg-black text-white", initialsShape: "rounded-lg", borderAccent: "border-l-4 border-l-blue-400" },
  design: { accentColor: "#ec4899", iconBg: "bg-pink-50", tagBg: "bg-pink-50", tagColor: "#ec4899", ctaStyle: "bg-black text-white", initialsShape: "rounded-full", borderAccent: "border-t-4 border-t-pink-400" },
  entrepreneurship: { accentColor: "#f97316", iconBg: "bg-orange-50", tagBg: "bg-orange-50", tagColor: "#f97316", ctaStyle: "bg-black text-white", initialsShape: "rounded-xl", borderAccent: "border-b-4 border-b-orange-400" },
  "data-science": { accentColor: "#8b5cf6", iconBg: "bg-violet-50", tagBg: "bg-violet-50", tagColor: "#8b5cf6", ctaStyle: "bg-black text-white", initialsShape: "rounded-lg", borderAccent: "border-l-4 border-l-violet-400" },
  writing: { accentColor: "#ef4444", iconBg: "bg-red-50", tagBg: "bg-red-50", tagColor: "#ef4444", ctaStyle: "bg-black text-white", initialsShape: "rounded-2xl", borderAccent: "border-t-4 border-t-red-300" },
  "personal-growth": { accentColor: "#10b981", iconBg: "bg-emerald-50", tagBg: "bg-emerald-50", tagColor: "#10b981", ctaStyle: "bg-black text-white", initialsShape: "rounded-full", borderAccent: "border-l-4 border-l-emerald-300" },
  "ai-skills": { accentColor: "#06b6d4", iconBg: "bg-cyan-50", tagBg: "bg-cyan-50", tagColor: "#06b6d4", ctaStyle: "bg-black text-white", initialsShape: "rounded-lg", borderAccent: "border-b-4 border-b-cyan-400" },
  agriculture: { accentColor: "#16a34a", iconBg: "bg-green-50", tagBg: "bg-green-50", tagColor: "#16a34a", ctaStyle: "bg-black text-white", initialsShape: "rounded-2xl", borderAccent: "border-l-4 border-l-green-400" },
  climate: { accentColor: "#059669", iconBg: "bg-emerald-50", tagBg: "bg-emerald-50", tagColor: "#059669", ctaStyle: "bg-black text-white", initialsShape: "rounded-xl", borderAccent: "border-t-4 border-t-emerald-500" },
  health: { accentColor: "#dc2626", iconBg: "bg-red-50", tagBg: "bg-red-50", tagColor: "#dc2626", ctaStyle: "bg-black text-white", initialsShape: "rounded-full", borderAccent: "border-l-4 border-l-red-400" },
  "personal-training": { accentColor: "#ea580c", iconBg: "bg-orange-50", tagBg: "bg-orange-50", tagColor: "#ea580c", ctaStyle: "bg-black text-white", initialsShape: "rounded-xl", borderAccent: "border-l-4 border-l-orange-500" },
  creator: { accentColor: "#f59e0b", iconBg: "bg-amber-50", tagBg: "bg-amber-50", tagColor: "#f59e0b", ctaStyle: "bg-black text-white", initialsShape: "rounded-2xl", borderAccent: "border-b-4 border-b-amber-400" },
  philosophy: { accentColor: "#7c3aed", iconBg: "bg-violet-50", tagBg: "bg-violet-50", tagColor: "#7c3aed", ctaStyle: "bg-black text-white", initialsShape: "rounded-lg", borderAccent: "border-t-4 border-t-violet-400" },
  systems: { accentColor: "#0284c7", iconBg: "bg-sky-50", tagBg: "bg-sky-50", tagColor: "#0284c7", ctaStyle: "bg-black text-white", initialsShape: "rounded-xl", borderAccent: "border-l-4 border-l-sky-400" },
  speaking: { accentColor: "#ea580c", iconBg: "bg-orange-50", tagBg: "bg-orange-50", tagColor: "#ea580c", ctaStyle: "bg-black text-white", initialsShape: "rounded-full", borderAccent: "border-b-4 border-b-orange-500" },
  innovation: { accentColor: "#0891b2", iconBg: "bg-cyan-50", tagBg: "bg-cyan-50", tagColor: "#0891b2", ctaStyle: "bg-black text-white", initialsShape: "rounded-2xl", borderAccent: "border-t-4 border-t-cyan-500" },
  "human-ai": { accentColor: "#6366f1", iconBg: "bg-indigo-50", tagBg: "bg-indigo-50", tagColor: "#6366f1", ctaStyle: "bg-black text-white", initialsShape: "rounded-lg", borderAccent: "border-l-4 border-l-indigo-400" },
};

function getStyle(catId: string): PersonaStyle {
  return personaStyles[catId] || personaStyles.coding;
}

/* ────────────────────────────────────────────
   Mentor Card — persona-driven visual variation
   ──────────────────────────────────────────── */

function MentorCard({
  mentor,
  categorySlug,
  categoryId,
  index,
}: {
  mentor: MentorPersona;
  categorySlug: string;
  categoryId: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const navigate = useNavigate();
  const style = getStyle(categoryId);

  const lessonCount = mentor.course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const moduleCount = mentor.course.modules.length;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        onClick={() => navigate(`/tools/${categorySlug}/${mentor.id}`)}
        className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] bg-white h-full flex flex-col"
        style={{ border: "1px solid rgba(0,0,0,0.06)" }}
      >
        {/* Accent top strip */}
        <div
          className="h-[3px] w-full"
          style={{ background: style.accentColor }}
        />

        <div className="relative p-7 sm:p-8 flex-1 flex flex-col">
          {/* Master badge */}
          {mentor.isMaster && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: "#D4A01712", border: "1px solid #D4A01725" }}>
                <Crown size={9} style={{ color: "#D4A017" }} />
                <span style={{ fontSize: "0.5rem", fontWeight: 700, color: "#D4A017", letterSpacing: "0.05em" }}>MASTER MENTOR</span>
              </span>
            </div>
          )}

          {/* Top: Avatar + Name */}
          <div className="flex items-start gap-4 mb-5">
            <div className="relative flex-shrink-0">
              <div
                className={`w-14 h-14 ${style.initialsShape} flex items-center justify-center ${style.iconBg}`}
                style={{ border: `2px solid ${style.accentColor}20` }}
              >
                <span style={{ fontSize: "1rem", fontWeight: 800, color: style.accentColor }}>
                  {mentor.initials}
                </span>
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                style={{ background: style.accentColor }}
              >
                <span style={{ fontSize: "0.5rem" }}>{mentor.avatar}</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="mb-0.5" style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000" }}>
                {mentor.name}
              </h3>
              <p style={{ fontSize: "0.6875rem", fontWeight: 600, color: style.accentColor }}>
                {mentor.title}
              </p>
              <p className="mt-1 line-clamp-1" style={{ fontSize: "0.6875rem", fontWeight: 400, color: "#000" }}>
                {mentor.tagline}
              </p>
            </div>
          </div>

          {/* Personality */}
          <p className="mb-5" style={{ fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.75, color: "#000" }}>
            {mentor.personality}
          </p>

          {/* Specialties — accent-colored pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {mentor.specialties.slice(0, 5).map((s) => (
              <span
                key={s}
                className={`px-2.5 py-1 ${style.initialsShape}`}
                style={{
                  fontSize: "0.5625rem",
                  fontWeight: 600,
                  color: style.tagColor,
                  background: `${style.accentColor}08`,
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Course stats — weeks-based */}
          <div className="flex items-center gap-4 mb-5" style={{ fontSize: "0.625rem", fontWeight: 500, color: "#000" }}>
            <div className="flex items-center gap-1">
              <BookOpen size={10} />
              <span>{moduleCount} modules &middot; {lessonCount} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={10} />
              <span>{mentor.course.learningDuration} of learning</span>
            </div>
          </div>

          {/* Course name + difficulty */}
          <div
            className="flex items-center justify-between mb-5 px-3 py-2.5 rounded-xl"
            style={{ background: `${style.accentColor}04`, border: `1px solid ${style.accentColor}10` }}
          >
            <div className="flex items-center gap-2">
              <Mic size={11} style={{ color: style.accentColor }} />
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#000" }}>
                {mentor.course.title}
              </span>
            </div>
            <span
              className="px-2 py-0.5 rounded-full"
              style={{ fontSize: "0.5rem", fontWeight: 700, background: `${style.accentColor}10`, color: style.accentColor }}
            >
              {mentor.course.difficulty}
            </span>
          </div>

          {/* AI indicator */}
          <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg" style={{ background: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.08)" }}>
            <Zap size={10} style={{ color: "#3b82f6" }} />
            <span style={{ fontSize: "0.5625rem", fontWeight: 600, color: "#3b82f6" }}>
              AI-enriched content &middot; Powered by Gemini
            </span>
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <button
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white transition-all duration-300 cursor-pointer"
              style={{ fontSize: "0.8125rem", fontWeight: 700 }}
            >
              Start Session
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Lesson Preview Card (for carousel)
   ──────────────────────────────────────────── */

function LessonPreviewCard({
  lesson,
  moduleTitle,
  accentColor,
  mentorName,
  categorySlug,
  mentorId,
}: {
  lesson: { id: string; title: string; duration: string; keyPoints: string[] };
  moduleTitle: string;
  accentColor: string;
  mentorName: string;
  categorySlug: string;
  mentorId: string;
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/tools/${categorySlug}/${mentorId}`)}
      className="group p-5 rounded-xl bg-white cursor-pointer transition-all duration-300 hover:scale-[1.01] min-w-[280px] sm:min-w-[300px] h-full"
      style={{ border: "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* Accent line at top */}
      <div className="w-8 h-[2px] mb-3 rounded-full" style={{ background: accentColor }} />
      <span style={{ fontSize: "0.5rem", fontWeight: 700, color: accentColor, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {moduleTitle}
      </span>
      <h4 className="mt-1.5 mb-2" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#000", lineHeight: 1.3 }}>
        {lesson.title}
      </h4>
      <p className="mb-3" style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#000" }}>
        {lesson.duration} &middot; with {mentorName}
      </p>
      <div className="flex flex-wrap gap-1">
        {lesson.keyPoints.slice(0, 2).map((kp) => (
          <span
            key={kp}
            className="px-2 py-0.5 rounded-full"
            style={{
              fontSize: "0.5625rem",
              fontWeight: 500,
              color: "#000",
              background: `${accentColor}06`,
              border: `1px solid ${accentColor}10`,
            }}
          >
            {kp}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Page
   ──────────────────────────────────────────── */

export function MentorSelectPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const category = categorySlug ? getMentorCategory(categorySlug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#000" }}>
            Category not found
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

  const Icon = category.icon;
  const style = getStyle(category.id);
  const totalLessons = category.mentors.reduce(
    (s, m) => s + m.course.modules.reduce((ls, mod) => ls + mod.lessons.length, 0),
    0,
  );

  /* Collect all lessons for the preview carousel */
  const allLessons = category.mentors.flatMap((m) =>
    m.course.modules.flatMap((mod) =>
      mod.lessons.map((lesson) => ({
        lesson,
        moduleTitle: mod.title,
        mentorName: m.name,
        mentorId: m.id,
      })),
    ),
  );

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <button
            onClick={() => navigate("/tools")}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity mb-10 cursor-pointer"
            style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}
          >
            <ArrowLeft size={14} />
            Mastery Space
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `${style.accentColor}08`, border: `1px solid ${style.accentColor}15` }}
            >
              <Icon size={22} style={{ color: style.accentColor }} />
            </div>
            <div>
              <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#000" }}>
                {category.label}
              </h1>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: style.accentColor }}>
                {category.tagline}
              </p>
            </div>
          </div>

          <p className="max-w-xl" style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.85, color: "#000" }}>
            {category.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: `${style.accentColor}04`, border: `1px solid ${style.accentColor}10` }}
            >
              <Users size={11} style={{ color: "#000" }} />
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#000" }}>
                {category.mentors.length} Mentor{category.mentors.length > 1 ? "s" : ""}
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: `${style.accentColor}04`, border: `1px solid ${style.accentColor}10` }}
            >
              <BookOpen size={11} style={{ color: "#000" }} />
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#000" }}>
                {totalLessons} lessons
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.1)" }}>
              <Sparkles size={11} style={{ color: "#3b82f6" }} />
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#3b82f6" }}>
                AI-powered mentoring
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MENTOR CAROUSEL (swipeable on mobile, grid on desktop) ═══ */}
      <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-16 sm:pb-24">
        <h2 className="mb-8" style={{ fontSize: "1.2rem", fontWeight: 800, color: "#000" }}>
          Choose Your Mentor
        </h2>

        {/* Desktop: grid | Mobile: swipeable carousel */}
        <div className="hidden sm:block">
          <div className={`grid gap-6 ${
            category.mentors.length === 1
              ? "grid-cols-1 max-w-md"
              : category.mentors.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}>
            {category.mentors.map((mentor, i) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                categorySlug={category.slug}
                categoryId={category.id}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="sm:hidden">
          <SwipeCarousel showArrows showDots gap={16} arrowVariant="bordered">
            {category.mentors.map((mentor, i) => (
              <div key={mentor.id} className="w-[300px]">
                <MentorCard
                  mentor={mentor}
                  categorySlug={category.slug}
                  categoryId={category.id}
                  index={i}
                />
              </div>
            ))}
          </SwipeCarousel>
        </div>
      </section>

      {/* ═══ LESSON PREVIEW CAROUSEL ═══ */}
      {allLessons.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-28 sm:pb-40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#000" }}>
                Lesson Preview
              </h2>
              <p className="mt-1" style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000" }}>
                Swipe to explore what you'll learn
              </p>
            </div>
            <span
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ fontSize: "0.625rem", fontWeight: 600, color: style.accentColor, background: `${style.accentColor}06`, border: `1px solid ${style.accentColor}12` }}
            >
              {allLessons.length} lessons total
            </span>
          </div>

          <SwipeCarousel showArrows showDots gap={16} arrowVariant="bordered">
            {allLessons.slice(0, 12).map(({ lesson, moduleTitle, mentorName, mentorId }) => (
              <LessonPreviewCard
                key={`${mentorId}-${lesson.id}`}
                lesson={lesson}
                moduleTitle={moduleTitle}
                accentColor={style.accentColor}
                mentorName={mentorName}
                categorySlug={category.slug}
                mentorId={mentorId}
              />
            ))}
          </SwipeCarousel>
        </section>
      )}

      <Footer />
    </div>
  );
}
