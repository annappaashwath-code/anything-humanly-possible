import { useRef, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Users,
  BookOpen,
  GraduationCap,
  Crown,
  LayoutGrid,
  Rows3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  mentorCategories,
  getAllMentorCount,
  getAllLessonCount,
} from "./mentorData";
import { MasteryFilters, applyFilters, EMPTY_FILTERS, type MasteryFilterState } from "./MasteryFilters";
import { SwipeCarousel } from "./SwipeCarousel";

/* ────────────────────────────────────────────
   Category images
   ──────────────────────────────────────────── */

const categoryImages: Record<string, string> = {
  coding:
    "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBzb2Z0d2FyZSUyMGRldmVsb3BlciUyMHdvcmtzcGFjZSUyMGRhcmt8ZW58MXx8fHwxNzcyMTMxMDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  design:
    "https://images.unsplash.com/photo-1769776399260-01bfaa5f492c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpbyUyMG1vZGVybiUyMG1pbmltYWx8ZW58MXx8fHwxNzcyMTMxMDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  entrepreneurship:
    "https://images.unsplash.com/photo-1758873272562-aa5459cbf34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBzdGFydHVwJTIwc3RyYXRlZ3klMjBwbGFubmluZ3xlbnwxfHx8fDE3NzIwOTg3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "data-science":
    "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzIxMzEwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  writing:
    "https://images.unsplash.com/photo-1612907260223-2c7aff7a7d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwY3JlYXRpdmUlMjBub3RlYm9vayUyMG1pbmltYWx8ZW58MXx8fHwxNzcyMTMxMDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "personal-growth":
    "https://images.unsplash.com/photo-1764192114257-ae9ecf97eb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWluZGZ1bG5lc3MlMjBwZWFjZWZ1bCUyMG5hdHVyZXxlbnwxfHx8fDE3NzIxMDEzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "ai-skills":
    "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neSUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzcyMTMwMTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  agriculture:
    "https://images.unsplash.com/photo-1759509295194-e85b92b24e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhcm1pbmclMjBhZ3JpY3VsdHVyZSUyMHRlY2hub2xvZ3klMjBtb2Rlcm58ZW58MXx8fHwxNzcyMzM5MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  climate:
    "https://images.unsplash.com/photo-1756511332583-99fc0d4bf7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwc3VzdGFpbmFiaWxpdHklMjBncmVlbiUyMGVuZXJneSUyMHNvbGFyfGVufDF8fHx8MTc3MjM0MjM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  health:
    "https://images.unsplash.com/photo-1706806594828-318b9185ad0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMGxvbmdldml0eSUyMHNjaWVuY2UlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc3MjM0MjM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  creator:
    "https://images.unsplash.com/photo-1764664035171-270ae70841fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY29udGVudCUyMGNyZWF0b3IlMjBzdHVkaW8lMjBtb2Rlcm58ZW58MXx8fHwxNzcyMzQyMzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  philosophy:
    "https://images.unsplash.com/photo-1755675672834-05f6d0580634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGlsb3NvcGh5JTIwdGhpbmtpbmclMjBsaWJyYXJ5JTIwYW5jaWVudCUyMGJvb2tzfGVufDF8fHx8MTc3MjM0MjM5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  systems:
    "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeXN0ZW1zJTIwbmV0d29yayUyMGNvbXBsZXhpdHklMjBhYnN0cmFjdCUyMGNvbm5lY3Rpb25zfGVufDF8fHx8MTc3MjM0MjM5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  speaking:
    "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzcGVha2luZyUyMHN0YWdlJTIwY29uZmVyZW5jZSUyMGtleW5vdGV8ZW58MXx8fHwxNzcyMzQyMzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  innovation:
    "https://images.unsplash.com/photo-1758691736843-90f58dce465e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwY29sbGFib3JhdGlvbiUyMHRlYW13b3JrJTIwYnJhaW5zdG9ybXxlbnwxfHx8fDE3NzIzNDE1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "human-ai":
    "https://images.unsplash.com/photo-1767954561407-7014cb8fb16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbiUyMHJvYm90JTIwY29sbGFib3JhdGlvbiUyMGZ1dHVyaXN0aWMlMjBBSXxlbnwxfHx8fDE3NzIzNDIzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

/* ────────────────────────────────────────────
   Category Card — white base with subtle accent
   ──────────────────────────────────────────── */

function CategoryCard({
  category,
  index,
}: {
  category: (typeof mentorCategories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const navigate = useNavigate();
  const Icon = category.icon;
  const accentColor = category.color;
  const mentorCount = category.mentors.length;
  const lessonCount = category.mentors.reduce(
    (s, m) =>
      s + m.course.modules.reduce((ls, mod) => ls + mod.lessons.length, 0),
    0,
  );
  const hasMaster = category.mentors.some(m => m.isMaster);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <div
        onClick={() => navigate(`/tools/${category.slug}`)}
        className="group relative overflow-hidden rounded-2xl bg-white hover:scale-[1.02] transition-all duration-500 cursor-pointer h-full flex flex-col"
        style={{ border: "1px solid rgba(0,0,0,0.06)" }}
      >
        {/* Accent top strip */}
        

        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <ImageWithFallback
            src={categoryImages[category.id]}
            alt={category.label}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />

          {/* Category icon — uses accent color */}
          <div className="absolute bottom-4 left-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white"
              style={{ border: `1.5px solid ${accentColor}20` }}
            >
              <Icon size={17} style={{ color: accentColor }} />
            </div>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {hasMaster && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white border border-black/8">
                <Crown size={9} style={{ color: "#D4A017" }} />
                <span style={{ fontSize: "0.5rem", fontWeight: 700, color: "#D4A017" }}>Master</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-black/8">
              <Users size={10} className="text-black" />
              <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "#000000" }}>
                {mentorCount} Mentor{mentorCount > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6 sm:p-7">
          <span
            className="tracking-[0.15em] uppercase mb-2"
            style={{ fontSize: "0.5rem", fontWeight: 700, color: accentColor }}
          >
            {category.tagline}
          </span>
          <h3 className="mb-2" style={{ fontSize: "1.25rem", fontWeight: 800, lineHeight: 1.2, color: "#000000" }}>
            {category.label}
          </h3>
          <p className="mb-5 flex-1" style={{ fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.7, color: "#000000" }}>
            {category.description}
          </p>

          {/* Mentor initials — accent-tinted circles */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex -space-x-1.5">
              {category.mentors.slice(0, 4).map((m) => (
                <div
                  key={m.id}
                  className="w-7 h-7 rounded-full flex items-center justify-center border-2 border-white"
                  style={{
                    fontSize: "0.5rem",
                    fontWeight: 700,
                    color: accentColor,
                    background: `${accentColor}08`,
                  }}
                >
                  {m.initials}
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#000000" }}>
                {category.mentors.map((m) => m.name).join(", ")}
              </p>
              <p style={{ fontSize: "0.5625rem", fontWeight: 500, color: "#000000" }}>
                {lessonCount} lessons
              </p>
            </div>
          </div>

          {/* CTA — accent underline */}
          <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${accentColor}12` }}>
            <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#000000" }}>
              Choose your mentor
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black group-hover:scale-110 transition-all duration-300"
            >
              <ArrowRight size={13} className="text-white group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Featured Category Slide (compact horizontal card)
   ──────────────────────────────────────────── */

function FeaturedSlide({
  category,
}: {
  category: (typeof mentorCategories)[0];
}) {
  const navigate = useNavigate();
  const Icon = category.icon;
  const accentColor = category.color;
  const mentorCount = category.mentors.length;

  return (
    <div
      onClick={() => navigate(`/tools/${category.slug}`)}
      className="group flex items-center gap-5 p-4 rounded-2xl bg-white cursor-pointer transition-all duration-300 hover:scale-[1.01] min-w-[340px] sm:min-w-[380px]"
      style={{ border: "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* Image thumbnail */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
        <ImageWithFallback
          src={categoryImages[category.id]}
          alt={category.label}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${accentColor}30` }}>
          <Icon size={22} className="text-white" />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span
          className="tracking-[0.12em] uppercase"
          style={{ fontSize: "0.5rem", fontWeight: 700, color: accentColor }}
        >
          {category.tagline}
        </span>
        <h4 className="mt-0.5" style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#000", lineHeight: 1.2 }}>
          {category.label}
        </h4>
        <div className="flex items-center gap-3 mt-1.5">
          <span style={{ fontSize: "0.625rem", fontWeight: 600, color: "#000" }}>
            {mentorCount} Mentors
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: accentColor }}
          />
          <span style={{ fontSize: "0.625rem", fontWeight: 500, color: "#000" }}>
            {category.mentors[0]?.course.difficulty}
          </span>
        </div>
      </div>

      <ArrowRight size={14} className="text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
    </div>
  );
}

/* ────────────────────────────────────────────
   Carousel View — matches Achievements section style
   Native scroll-snap, drag-to-scroll, header arrows
   ──────────────────────────────────────────── */

function CarouselView({
  categories,
}: {
  categories: (typeof mentorCategories)[0][];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, hasDragged: false });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -380 : 380, behavior: "smooth" });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, hasDragged: false };
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.isDown) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - dragState.current.startX;
    if (Math.abs(walk) > 8) dragState.current.hasDragged = true;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const onMouseUp = () => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current.isDown = false;
    el.style.cursor = "";
    requestAnimationFrame(() => {
      if (el) el.style.scrollSnapType = "x mandatory";
    });
  };

  const onMouseLeave = () => {
    if (dragState.current.isDown) onMouseUp();
  };

  return (
    <div className="relative">
      {/* Section heading + arrows — constrained like Achievements */}
      <div ref={headingRef} className="max-w-7xl mx-auto px-6 lg:px-10 mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(59,130,246,0.06)" }}>
                <Sparkles size={18} style={{ color: "#3b82f6" }} />
              </div>
              <span className="tracking-[0.15em] uppercase" style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#000" }}>
                {categories.length} Skill Domains
              </span>
            </div>
            <h2 className="mb-3" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, lineHeight: 1.15, color: "#000" }}>
              Browse Categories
            </h2>
            <p style={{ fontSize: "1.0625rem", fontWeight: 500, lineHeight: 1.6, color: "#000" }}>
              Swipe through every skill domain. Find your path.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <span className="mr-2" style={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(0,0,0,0.35)" }}>
              {categories.length} domains
            </span>
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-black/8 flex items-center justify-center hover:bg-black/[0.03] transition-colors duration-300 cursor-pointer">
              <ChevronLeft size={16} style={{ color: "rgba(0,0,0,0.4)" }} />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-black/8 flex items-center justify-center hover:bg-black/[0.03] transition-colors duration-300 cursor-pointer">
              <ChevronRight size={16} style={{ color: "rgba(0,0,0,0.4)" }} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Subtle top rule — full width */}
      <div className="absolute left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.04), rgba(0,0,0,0.03), transparent)" }} />

      {/* Full-width scrollable card strip — edge-to-edge, matches Achievements */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory px-6 lg:px-10 pt-6 pb-2 cursor-grab select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className="flex-shrink-0 w-[78vw] sm:w-[340px] lg:w-[360px] snap-center"
          >
            <CategoryCard category={cat} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Hub Page — The Mastery Space
   ──────────────────────────────────────────── */

export function ToolsHubPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const navigate = useNavigate();
  const [filters, setFilters] = useState<MasteryFilterState>(EMPTY_FILTERS);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  const filteredCategories = useMemo(
    () => applyFilters(mentorCategories, filters),
    [filters],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isFiltered = filteredCategories.length !== mentorCategories.length;

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-28 pb-24 sm:pt-36 sm:pb-32 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 mb-10">
              <Sparkles size={11} className="text-[#3b82f6]" />
              <span className="tracking-[0.25em] uppercase" style={{ fontSize: "0.5rem", fontWeight: 600, color: "#000000" }}>
                Skills Over Degrees &middot; Adaptability Over Stability
              </span>
            </div>

            <h1 className="mb-6" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.04em", color: "#000000" }}>
              The Mastery Space
            </h1>

            <p className="max-w-lg mx-auto mb-5" style={{ fontSize: "1.0625rem", fontWeight: 400, lineHeight: 1.8, color: "#000000" }}>
              Degrees don't guarantee careers anymore. Skills do.
            </p>
            <p className="max-w-md mx-auto mb-16" style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.8, color: "#000000" }}>
              Every skill domain has a dedicated AI mentor — patient, intelligent, adaptive. Build real capabilities through structured courses, voice mentoring, and hands-on practice.
            </p>

            {/* Stats — large pillar typography */}
            <div className="flex items-center justify-center gap-14 sm:gap-24">
              {[
                { icon: GraduationCap, label: "Categories", value: mentorCategories.length },
                { icon: Users, label: "Mentors", value: getAllMentorCount() },
                { icon: BookOpen, label: "Lessons", value: getAllLessonCount() },
              ].map((stat, i) => {
                const I = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="text-center"
                  >
                    <p
                      style={{
                        fontSize: "clamp(2.5rem, 6vw, 4rem)",
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: "#000000",
                      }}
                    >
                      {stat.value}
                    </p>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <I size={11} className="text-[#3b82f6]" />
                      <span style={{ fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#000000" }}>
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURED CAROUSEL ═══ */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Quick Browse
            </h2>
            <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#000" }}>
              Swipe to explore
            </span>
          </div>

          <SwipeCarousel
            showArrows
            showDots
            gap={16}
            arrowVariant="bordered"
          >
            {mentorCategories.map((cat) => (
              <FeaturedSlide key={cat.id} category={cat} />
            ))}
          </SwipeCarousel>
        </motion.div>
      </section>

      {/* ═══ FILTERS + CATEGORY GRID ═══ */}
      <section className={`max-w-6xl mx-auto px-6 lg:px-10 ${viewMode === "grid" ? "pb-24 sm:pb-36" : "pb-8"}`}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#000000" }}>
              Select a Skill Domain
            </h2>
            <p className="max-w-lg" style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.7, color: "#000000" }}>
              Each domain has specialized mentor personas who guide you through structured courses with interactive lessons, practice tasks, and voice conversation.
            </p>
          </div>

          {/* View mode toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
            <button
              onClick={() => setViewMode("grid")}
              className="p-1.5 rounded-md cursor-pointer transition-all duration-200"
              style={{ background: viewMode === "grid" ? "rgba(0,0,0,0.05)" : "transparent" }}
            >
              <LayoutGrid size={14} style={{ color: viewMode === "grid" ? "#000" : "rgba(0,0,0,0.3)" }} />
            </button>
            <button
              onClick={() => setViewMode("carousel")}
              className="p-1.5 rounded-md cursor-pointer transition-all duration-200"
              style={{ background: viewMode === "carousel" ? "rgba(0,0,0,0.05)" : "transparent" }}
            >
              <Rows3 size={14} style={{ color: viewMode === "carousel" ? "#000" : "rgba(0,0,0,0.3)" }} />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <MasteryFilters filters={filters} onChange={setFilters} />

        {/* Results count when filtered */}
        <AnimatePresence>
          {isFiltered && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6"
              style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}
            >
              {filteredCategories.length === 0
                ? "No categories match your filters"
                : `Showing ${filteredCategories.length} of ${mentorCategories.length} categories`}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Grid view */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredCategories.map((cat, i) => (
                <CategoryCard key={cat.id} category={cat} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Carousel view — placeholder, actual carousel renders full-width below */}

        {/* Empty state */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000", marginBottom: "8px" }}>
              No matches found
            </p>
            <p style={{ fontSize: "0.875rem", fontWeight: 400, color: "#000", marginBottom: "16px" }}>
              Try adjusting your filters to discover more skill domains.
            </p>
            <button
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="px-5 py-2.5 rounded-full bg-black text-white cursor-pointer"
              style={{ fontSize: "0.8125rem", fontWeight: 600 }}
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </section>

      {/* ═══ FULL-WIDTH CAROUSEL (outside container, matches Achievements) ═══ */}
      {viewMode === "carousel" && filteredCategories.length > 0 && (
        <section className="py-16 sm:py-20">
          <CarouselView categories={filteredCategories} />
        </section>
      )}

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 pb-28 sm:pb-40">
        <div className="rounded-2xl p-8 sm:p-12 overflow-hidden relative bg-white" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="relative">
            <h3 className="text-center mb-10" style={{ fontSize: "2rem", fontWeight: 800, color: "#000000" }}>
              How It Works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Choose a domain", desc: "Select the skill area that matches your goals." },
                { step: "02", title: "Meet your mentor", desc: "Each domain has unique AI mentors with distinct teaching styles." },
                { step: "03", title: "Start learning", desc: "Interactive lessons, voice conversations, and practice tasks — all one-on-one." },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/[0.04] mb-4"
                    style={{ fontSize: "0.75rem", fontWeight: 800, color: "#000000" }}
                  >
                    {s.step}
                  </div>
                  <h4 className="mb-2" style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#000000" }}>
                    {s.title}
                  </h4>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.7, color: "#000000" }}>
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}