import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Filter, X, ChevronDown, ChevronLeft, ChevronRight,
  GraduationCap, Clock, Users, Globe, Layers,
} from "lucide-react";
import { mentorCategories } from "./mentorData";

/* ────────────────────────────────────────────
   Types
   ──────────────────────────────────────────── */

export interface MasteryFilterState {
  categories: string[];
  levels: string[];
  durations: string[];
  mentorTypes: string[];
  languages: string[];
}

export const EMPTY_FILTERS: MasteryFilterState = {
  categories: [],
  levels: [],
  durations: [],
  mentorTypes: [],
  languages: [],
};

/* ────────────────────────────────────────────
   Filter options data
   ──────────────────────────────────────────── */

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced"];

const DURATION_OPTIONS = [
  { label: "2–4 weeks", key: "short", min: 2, max: 4 },
  { label: "4–6 weeks", key: "medium", min: 4, max: 6 },
  { label: "6–8 weeks", key: "long", min: 6, max: 8 },
  { label: "8–12 weeks", key: "extended", min: 8, max: 12 },
];

const MENTOR_TYPE_OPTIONS = [
  { label: "AI Mentor", key: "ai" },
  { label: "Master Mentor", key: "master" },
  { label: "Technical Mentor", key: "technical" },
  { label: "Creative Mentor", key: "creative" },
];

const LANGUAGE_OPTIONS = [
  { code: "en-US", label: "English", native: "EN" },
  { code: "hi-IN", label: "Hindi", native: "HI" },
  { code: "kn-IN", label: "Kannada", native: "KN" },
  { code: "te-IN", label: "Telugu", native: "TE" },
  { code: "ta-IN", label: "Tamil", native: "TA" },
  { code: "es-ES", label: "Spanish", native: "ES" },
  { code: "fr-FR", label: "French", native: "FR" },
  { code: "de-DE", label: "German", native: "DE" },
  { code: "pt-BR", label: "Portuguese", native: "PT" },
  { code: "zh-CN", label: "Chinese", native: "ZH" },
  { code: "ja-JP", label: "Japanese", native: "JA" },
  { code: "ko-KR", label: "Korean", native: "KO" },
];

/* Technical categories for mentor type classification */
const TECHNICAL_CATEGORIES = new Set([
  "coding", "data-science", "ai-skills", "systems", "innovation", "human-ai",
]);
const CREATIVE_CATEGORIES = new Set([
  "design", "writing", "creator", "speaking", "philosophy",
]);

/* ────────────────────────────────────────────
   Filter chip helpers
   ──────────────────────────────────────────── */

function getActiveCount(filters: MasteryFilterState): number {
  return (
    filters.categories.length +
    filters.levels.length +
    filters.durations.length +
    filters.mentorTypes.length +
    filters.languages.length
  );
}

/* ────────────────────────────────────────────
   Scrollable Chip Row
   ──────────────────────────────────────────── */

function ScrollableChips({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      const obs = new ResizeObserver(checkScroll);
      obs.observe(el);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        obs.disconnect();
      };
    }
  }, [checkScroll]);

  const scroll = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="relative group/scroll">
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-black/8 flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity cursor-pointer"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
        >
          <ChevronLeft size={12} className="text-black" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-black/8 flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity cursor-pointer"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
        >
          <ChevronRight size={12} className="text-black" />
        </button>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   Single Filter Chip
   ──────────────────────────────────────────── */

function Chip({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
      style={{
        fontSize: "0.6875rem",
        fontWeight: active ? 700 : 500,
        color: active ? "#fff" : "#000",
        background: active ? (color || "#000") : "transparent",
        border: active ? `1px solid ${color || "#000"}` : "1px solid rgba(0,0,0,0.1)",
      }}
    >
      {label}
    </button>
  );
}

/* ────────────────────────────────────────────
   Dropdown Panel
   ──────────────────────────────────────────── */

function FilterDropdown({
  label,
  icon: Icon,
  isOpen,
  onToggle,
  activeCount,
  children,
}: {
  label: string;
  icon: typeof Filter;
  isOpen: boolean;
  onToggle: () => void;
  activeCount: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (isOpen) onToggle();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onToggle]);

  // Close dropdown on Escape (supports gesture palm-hold fallback)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onToggle();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#000",
          background: isOpen ? "rgba(0,0,0,0.04)" : "transparent",
          border: isOpen ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Icon size={13} style={{ color: "#3b82f6" }} />
        <span>{label}</span>
        {activeCount > 0 && (
          <span
            className="flex items-center justify-center w-4.5 h-4.5 rounded-full"
            style={{ fontSize: "0.5625rem", fontWeight: 700, color: "#fff", background: "#3b82f6", minWidth: "18px", height: "18px" }}
          >
            {activeCount}
          </span>
        )}
        <ChevronDown
          size={11}
          className="transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 z-50 min-w-[220px] max-w-[320px] p-3 rounded-xl bg-white"
            style={{
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Filters Component
   ──────────────────────────────────────────── */

export function MasteryFilters({
  filters,
  onChange,
}: {
  filters: MasteryFilterState;
  onChange: (f: MasteryFilterState) => void;
}) {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const activeCount = getActiveCount(filters);

  const toggle = (
    key: keyof MasteryFilterState,
    value: string,
  ) => {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const clearAll = () => onChange(EMPTY_FILTERS);

  const togglePanel = (panel: string) =>
    setOpenPanel((prev) => (prev === panel ? null : panel));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <div className="flex items-center gap-1.5 mr-2">
          <Filter size={13} style={{ color: "#3b82f6" }} />
          <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#000", letterSpacing: "0.05em" }}>
            FILTER
          </span>
        </div>

        {/* Category dropdown */}
        <FilterDropdown
          label="Category"
          icon={Layers}
          isOpen={openPanel === "category"}
          onToggle={() => togglePanel("category")}
          activeCount={filters.categories.length}
        >
          <div className="flex flex-wrap gap-1.5">
            {mentorCategories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.label}
                active={filters.categories.includes(cat.id)}
                color={cat.color}
                onClick={() => toggle("categories", cat.id)}
              />
            ))}
          </div>
        </FilterDropdown>

        {/* Level dropdown */}
        <FilterDropdown
          label="Level"
          icon={GraduationCap}
          isOpen={openPanel === "level"}
          onToggle={() => togglePanel("level")}
          activeCount={filters.levels.length}
        >
          <div className="flex flex-wrap gap-1.5">
            {LEVEL_OPTIONS.map((level) => (
              <Chip
                key={level}
                label={level}
                active={filters.levels.includes(level)}
                onClick={() => toggle("levels", level)}
              />
            ))}
          </div>
        </FilterDropdown>

        {/* Duration dropdown */}
        <FilterDropdown
          label="Duration"
          icon={Clock}
          isOpen={openPanel === "duration"}
          onToggle={() => togglePanel("duration")}
          activeCount={filters.durations.length}
        >
          <div className="flex flex-wrap gap-1.5">
            {DURATION_OPTIONS.map((d) => (
              <Chip
                key={d.key}
                label={d.label}
                active={filters.durations.includes(d.key)}
                onClick={() => toggle("durations", d.key)}
              />
            ))}
          </div>
        </FilterDropdown>

        {/* Mentor Type dropdown */}
        <FilterDropdown
          label="Mentor Type"
          icon={Users}
          isOpen={openPanel === "mentorType"}
          onToggle={() => togglePanel("mentorType")}
          activeCount={filters.mentorTypes.length}
        >
          <div className="flex flex-wrap gap-1.5">
            {MENTOR_TYPE_OPTIONS.map((mt) => (
              <Chip
                key={mt.key}
                label={mt.label}
                active={filters.mentorTypes.includes(mt.key)}
                onClick={() => toggle("mentorTypes", mt.key)}
              />
            ))}
          </div>
        </FilterDropdown>

        {/* Language dropdown */}
        <FilterDropdown
          label="Language"
          icon={Globe}
          isOpen={openPanel === "language"}
          onToggle={() => togglePanel("language")}
          activeCount={filters.languages.length}
        >
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGE_OPTIONS.map((lang) => (
              <Chip
                key={lang.code}
                label={lang.label}
                active={filters.languages.includes(lang.code)}
                onClick={() => toggle("languages", lang.code)}
              />
            ))}
          </div>
        </FilterDropdown>

        {/* Clear all */}
        {activeCount > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={clearAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:bg-black/[0.03]"
            style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#000", border: "1px solid rgba(0,0,0,0.1)" }}
          >
            <X size={10} />
            Clear all ({activeCount})
          </motion.button>
        )}
      </div>

      {/* Active filter tags */}
      <AnimatePresence>
        {activeCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ScrollableChips>
              {filters.categories.map((id) => {
                const cat = mentorCategories.find((c) => c.id === id);
                return cat ? (
                  <ActiveTag
                    key={`cat-${id}`}
                    label={cat.label}
                    color={cat.color}
                    onRemove={() => toggle("categories", id)}
                  />
                ) : null;
              })}
              {filters.levels.map((l) => (
                <ActiveTag key={`lvl-${l}`} label={l} onRemove={() => toggle("levels", l)} />
              ))}
              {filters.durations.map((d) => {
                const dur = DURATION_OPTIONS.find((o) => o.key === d);
                return dur ? (
                  <ActiveTag key={`dur-${d}`} label={dur.label} onRemove={() => toggle("durations", d)} />
                ) : null;
              })}
              {filters.mentorTypes.map((mt) => {
                const mType = MENTOR_TYPE_OPTIONS.find((o) => o.key === mt);
                return mType ? (
                  <ActiveTag key={`mt-${mt}`} label={mType.label} onRemove={() => toggle("mentorTypes", mt)} />
                ) : null;
              })}
              {filters.languages.map((lang) => {
                const l = LANGUAGE_OPTIONS.find((o) => o.code === lang);
                return l ? (
                  <ActiveTag key={`lang-${lang}`} label={l.label} onRemove={() => toggle("languages", lang)} />
                ) : null;
              })}
            </ScrollableChips>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Active filter tag pill
   ──────────────────────────────────────────── */

function ActiveTag({
  label,
  color,
  onRemove,
}: {
  label: string;
  color?: string;
  onRemove: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onRemove}
      className="flex-shrink-0 flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full cursor-pointer transition-all duration-200 hover:opacity-80"
      style={{
        fontSize: "0.625rem",
        fontWeight: 600,
        color: color || "#000",
        background: color ? `${color}08` : "rgba(0,0,0,0.03)",
        border: `1px solid ${color ? `${color}20` : "rgba(0,0,0,0.08)"}`,
      }}
    >
      {label}
      <X size={9} style={{ color: color || "#000" }} />
    </motion.button>
  );
}

/* ────────────────────────────────────────────
   Filter logic — pass categories through filters
   ──────────────────────────────────────────── */

function parseDurationWeeks(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 4;
}

export function applyFilters(
  categories: typeof mentorCategories,
  filters: MasteryFilterState,
): typeof mentorCategories {
  const activeCount = getActiveCount(filters);
  if (activeCount === 0) return categories;

  return categories
    .filter((cat) => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(cat.id)) {
        return false;
      }

      // Mentor type filter
      if (filters.mentorTypes.length > 0) {
        const hasMatch = filters.mentorTypes.some((mt) => {
          if (mt === "master") return cat.mentors.some((m) => m.isMaster);
          if (mt === "ai") return cat.mentors.some((m) => !m.isMaster);
          if (mt === "technical") return TECHNICAL_CATEGORIES.has(cat.id);
          if (mt === "creative") return CREATIVE_CATEGORIES.has(cat.id);
          return false;
        });
        if (!hasMatch) return false;
      }

      // Level filter
      if (filters.levels.length > 0) {
        const hasLevel = cat.mentors.some((m) =>
          filters.levels.includes(m.course.difficulty),
        );
        if (!hasLevel) return false;
      }

      // Duration filter
      if (filters.durations.length > 0) {
        const hasDuration = cat.mentors.some((m) => {
          const weeks = parseDurationWeeks(m.course.learningDuration);
          return filters.durations.some((d) => {
            const dur = DURATION_OPTIONS.find((o) => o.key === d);
            return dur ? weeks >= dur.min && weeks <= dur.max : false;
          });
        });
        if (!hasDuration) return false;
      }

      return true;
    });
}