import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import {
  Trophy,
  Users,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Target,
  Rocket,
  Heart,
  Layers,
  Zap,
  BookOpen,
  Compass,
} from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { mentorCategories } from "./tools/mentorData";

import imgAchievements from "figma:asset/29142a1c4d6851e2cad1d8f647c25a618b4e3bbb.png";
import imgLearn from "figma:asset/b387ce4369ed1375ae415e25a45d22662479b3fa.png";
import imgSpiritual from "figma:asset/bf66445a973543803bd286777def509a8d204d8c.png";
import imgMastery from "figma:asset/a4ba9a66bcb24df1c2ec4f68f596f3b3c4a8558e.png";
import imgCommunity from "figma:asset/3c073d21a41f23af36fdc238e16c98ac9ad364d4.png";
import imgJoin from "figma:asset/7076c4fe5bf7410765dc2f3baad47daf1952a6f0.png";

/* ════════════════════════════════════════════════════
   UTILITY — Scroll-based parallax (subtle 10–20px)
   ════════════════════════════════════════════════════ */

function useParallax(ref: React.RefObject<HTMLElement | null>, range: number = 15) {
  const progress = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const h = window.innerHeight;
      progress.set(
        Math.min(Math.max((h - rect.top) / (h + rect.height), 0), 1)
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress, ref]);
  return useTransform(progress, [0, 1], [range, -range]);
}

/* ════════════════════════════════════════════════════
   UTILITY — Scroll Reveal (opacity 0→1, y 40→0)
   Smooth easing, no aggressive animation
   ════════════════════════════════════════════════════ */

function ScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   1 · STORY — Emotional Opening
   "Progressive Emphasis Reveal"
   ════════════════════════════════════════════════════ */

/* ── Typing Line — reveals text char-by-char with blinking caret ── */

function TypingLine({
  text,
  charSpeed,
  active,
  onDone,
  showCaret,
  caretFading,
  style,
}: {
  text: string;
  charSpeed: number;
  active: boolean;
  onDone: () => void;
  showCaret: boolean;
  caretFading: boolean;
  style: React.CSSProperties;
}) {
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const doneRef = useRef(false);

  // Activate immediately when told
  useEffect(() => {
    if (active && !started) setStarted(true);
  }, [active, started]);

  // Type characters one by one
  useEffect(() => {
    if (!started || charIndex >= text.length) return;
    const t = setTimeout(() => setCharIndex((i) => i + 1), charSpeed);
    return () => clearTimeout(t);
  }, [started, charIndex, text.length, charSpeed]);

  // Signal done when fully typed
  useEffect(() => {
    if (charIndex === text.length && started && !doneRef.current) {
      doneRef.current = true;
      onDone();
    }
  }, [charIndex, text.length, started, onDone]);

  const typed = text.slice(0, charIndex);
  const isTyping = started && charIndex < text.length;
  const visible = started || charIndex > 0;

  return (
    <p style={{ ...style, minHeight: visible ? undefined : "1lh" }}>
      {visible ? (
        <>
          <span>{typed}</span>
          {showCaret && (
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "0.85em",
                backgroundColor: "#000000",
                marginLeft: "2px",
                verticalAlign: "text-bottom",
                animation: isTyping ? "storyCaretBlink 0.6s step-end infinite" : undefined,
                opacity: caretFading ? 0 : 1,
                transition: caretFading ? "opacity 0.8s ease" : undefined,
              }}
            />
          )}
        </>
      ) : (
        /* Invisible placeholder to reserve vertical space */
        <span style={{ visibility: "hidden" }} aria-hidden="true">{text}</span>
      )}
    </p>
  );
}

function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const [caretFading, setCaretFading] = useState(false);

  // Trigger first line when section scrolls into view
  useEffect(() => {
    if (inView && activeLine === -1) {
      setActiveLine(0);
    }
  }, [inView, activeLine]);

  // Line config — exact same copy
  const lines = [
    { text: "Every extraordinary leap began with belief.", charSpeed: 38, postPause: 400 },
    { text: "Not superheroes.", charSpeed: 40, postPause: 300 },
    { text: "Not geniuses.", charSpeed: 40, postPause: 300 },
    { text: "People.", charSpeed: 75, postPause: 900 },
    { text: "People who refused limits.", charSpeed: 40, postPause: 0 },
  ];

  // Exact same styles from the original
  const lineStyles: React.CSSProperties[] = [
    {
      fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
      fontWeight: 400,
      lineHeight: 1.3,
      color: "#000000",
      letterSpacing: "-0.02em",
    },
    {
      fontSize: "clamp(1.25rem, 3.2vw, 2.25rem)",
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: "-0.015em",
      color: "#000000",
      marginTop: "clamp(2rem, 4vw, 3.5rem)",
    },
    {
      fontSize: "clamp(1.25rem, 3.2vw, 2.25rem)",
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: "-0.015em",
      color: "#000000",
      marginTop: "clamp(0.75rem, 1.5vw, 1.25rem)",
    },
    {
      fontSize: "clamp(5rem, 6vw, 4rem)",
      fontWeight: 600,
      lineHeight: 1.15,
      letterSpacing: "-0.04em",
      color: "#000000",
      marginTop: "clamp(2.5rem, 5vw, 4rem)",
    },
    {
      fontSize: "clamp(3rem, 4vw, 2.75rem)",
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: "-0.035em",
      color: "#000000",
      marginTop: "clamp(1.25rem, 2.5vw, 2rem)",
    },
  ];

  const handleLineDone = (lineIndex: number) => {
    if (lineIndex < lines.length - 1) {
      // Advance to next line after post-pause
      setTimeout(() => {
        setActiveLine(lineIndex + 1);
      }, lines[lineIndex].postPause);
    } else {
      // All lines complete — dim earlier lines, fade caret
      setTimeout(() => {
        setCaretFading(true);
        setTimeout(() => setSequenceComplete(true), 800);
      }, 200);
    }
  };

  // The line currently showing its caret
  const caretLine = sequenceComplete ? -1 : activeLine;

  return (
    <section
      id="story"
      ref={ref}
      className="bg-white"
    >
      {/* Caret blink keyframes */}
      <style>{`
        @keyframes storyCaretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-48 sm:py-64">
        <div className="flex flex-col items-center text-center">
          {lines.map((line, i) => {
            const isDimmed = sequenceComplete && i < 3;
            return (
              <TypingLine
                key={i}
                text={line.text}
                charSpeed={line.charSpeed}
                active={activeLine >= i}
                onDone={() => handleLineDone(i)}
                showCaret={caretLine === i}
                caretFading={caretFading && i === lines.length - 1}
                style={{
                  ...lineStyles[i],
                  opacity: isDimmed ? 0.4 : 1,
                  transition: "opacity 0.6s ease",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   2 · ACHIEVEMENTS
   ═══════════════════════════════════════════════════ */

const achCards = [
  {
    title: "The Pyramids of Giza",
    era: "Historical",
    desc: "2.3 million blocks. Zero modern tools. Still standing after 4,500 years.",
    image:
      "https://images.unsplash.com/photo-1767797864473-1d34d23fd948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVhdCUyMHB5cmFtaWRzJTIwZ2l6YSUyMGdvbGRlbiUyMHN1bmxpZ2h0JTIwY2xlYXIlMjBza3l8ZW58MXx8fHwxNzcyMjczMzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "The Moon Landing",
    era: "Modern",
    desc: "400,000 people. One giant leap. We walked on another world.",
    image:
      "https://images.unsplash.com/photo-1617056952435-3d971c7c4fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2glMjBOQVNBJTIwc3BhY2UlMjBzaHV0dGxlJTIwbGlmdG9mZnxlbnwxfHx8fDE3NzIyNzMzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "The World Wide Web",
    era: "Digital",
    desc: "Tim Berners-Lee gave the world a gift. He never patented it.",
    image:
      "https://images.unsplash.com/photo-1607723619497-98a79f01ba90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWJlciUyMG9wdGljJTIwaW50ZXJuZXQlMjBjb25uZWN0aW9uJTIwbmV0d29yayUyMGJsdWV8ZW58MXx8fHwxNzcyMjczNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

function AchievementsShowcase() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const parallaxY = useParallax(ref, 12);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white py-40 sm:py-52">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div style={{ y: parallaxY }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-black/10 mb-8">
            <Trophy size={12} className="text-[#D4A017]" />
            <span
              className="tracking-[0.25em] uppercase"
              style={{ fontSize: "0.5625rem", fontWeight: 600, color: "#000000" }}
            >
              Human Achievements
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
              color: "#000000",
            }}
          >
            Milestones that defined
            <br />
            civilisation
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {achCards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[360px] sm:h-[400px]"
              onClick={() => navigate("/achievements")}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-end">
                <span
                  className="inline-block px-3 py-1 rounded-full mb-4 self-start"
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {item.era}
                </span>
                <h3
                  className="text-white mb-2"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    lineHeight: 1.15,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="max-w-sm"
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: "#ffffff",
                  }}
                >
                  {item.desc}
                </p>
              </div>
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-white/20">
                <ArrowUpRight size={14} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/achievements")}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            style={{ fontSize: "0.8125rem", fontWeight: 600 }}
          >
            Explore Full Timeline
            <ArrowUpRight
              size={13}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Quote */}
        <div className="max-w-2xl mx-auto text-center mt-32 sm:mt-40">
          <blockquote
            style={{
              fontSize: "clamp(1.25rem, 3vw, 2rem)",
              fontWeight: 600,
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
              color: "#000000",
            }}
            className="mb-8"
          >
            &ldquo;The only way to discover the limits of the possible is to go beyond
            them into the impossible.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-px bg-black/20" />
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#000000",
              }}
            >
              Arthur C. Clarke
            </p>
            <div className="w-10 h-px bg-black/20" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   3 · OUR PATHWAY — Foundation → Growth → Mastery → Impact
   ════════════════════════════════════════════════════ */

const stages = [
  {
    step: "01",
    title: "Foundation",
    desc: "Build the bedrock. Core principles, first habits, fundamental knowledge.",
    icon: Layers,
    accent: "#3b82f6",
  },
  {
    step: "02",
    title: "Growth",
    desc: "Deliberate practice. Real feedback. Consistent momentum forward.",
    icon: Target,
    accent: "#3b82f6",
  },
  {
    step: "03",
    title: "Mastery",
    desc: "Where discipline meets creative flow. Deep skill. Quiet confidence.",
    icon: Zap,
    accent: "#D4A017",
  },
  {
    step: "04",
    title: "Impact",
    desc: "Apply your mastery. Teach others. Build things. Leave a legacy.",
    icon: Rocket,
    accent: "#000000",
  },
];

function PathwaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const parallaxY = useParallax(ref, 10);

  return (
    <section ref={ref} className="bg-white py-40 sm:py-52">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div style={{ y: parallaxY }} className="text-center mb-20">
          <p
            className="tracking-[0.35em] uppercase mb-5"
            style={{ fontSize: "0.625rem", fontWeight: 600, color: "#000000" }}
          >
            Our Pathway
          </p>
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
              color: "#000000",
            }}
          >
            Four stages of evolution
          </h2>
          <p
            className="max-w-md mx-auto"
            style={{
              fontSize: "0.9375rem",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#000000",
            }}
          >
            Each stage meets you where you are and takes you further.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative p-7 sm:p-8 rounded-2xl border border-black/8 hover:-translate-y-1 transition-all duration-500 cursor-default"
              >
                {/* Top accent line */}
                

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${s.accent}15`, color: s.accent }}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        lineHeight: 1,
                        color: "rgba(0,0,0,0.06)",
                      }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <h3
                    className="mb-3"
                    style={{ fontSize: "1.25rem", fontWeight: 700, color: "#000000" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      lineHeight: 1.75,
                      color: "#000000",
                    }}
                  >
                    {s.desc}
                  </p>
                </div>

                {i < stages.length - 1 && (
                  <div className="hidden lg:block absolute -right-4.5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={14} className="text-black/20" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   4 · HOW WE LEARN — Unified section
   ════════════════════════════════════════════════════ */

const learningCards = [
  {
    icon: Layers,
    title: "Structured Paths",
    desc: "Seven complete journeys from foundations to visionary contribution. Each path is four stages deep with real projects, real milestones, and real evidence of mastery.",
    accent: "#3b82f6",
  },
  {
    icon: Brain,
    title: "AI-Guided Mentorship",
    desc: "An adaptive AI mentor that knows your learning history, adapts to your pace, reviews your work, and meets you exactly where you are — every session.",
    accent: "#3b82f6",
  },
  {
    icon: Rocket,
    title: "Real-World Mastery",
    desc: "Every stage culminates in a project that produces something real. Portfolios, contributions, published work. Learning measured by what you create, not what you consume.",
    accent: "#000000",
  },
];

function HowWeLearnSection() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const parallaxY = useParallax(ref, 12);

  return (
    null
  );
}

/* ════════════════════════════════════════════════════
   5 · SPIRITUAL INSPIRATION
   ════════════════════════════════════════════════════ */

function SpiritualCard() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const parallaxY = useParallax(ref, 15);

  return (
    null
  );
}

/* ════════════════════════════════════════════════════
   6 · MASTERY SPACE
   ═══════════════════════════════════════════════════ */

const masteryStats = [
  { value: String(mentorCategories.length), label: "Categories" },
  { value: String(mentorCategories.reduce((sum, c) => sum + c.mentors.length, 0)), label: "Mentors" },
  { value: String(mentorCategories.reduce((sum, c) => sum + c.mentors.reduce((s, m) => s + m.course.modules.reduce((ls, mod) => ls + mod.lessons.length, 0), 0), 0)), label: "Lessons" },
];

function MasterySpacePreview() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentParallaxY = useParallax(sectionRef, 12);

  /* Background parallax — very subtle, ~2px total for depth */
  const bgProgress = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const h = window.innerHeight;
      bgProgress.set(
        Math.min(Math.max((h - rect.top) / (h + rect.height), 0), 1)
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [bgProgress]);
  const bgY = useTransform(bgProgress, [0, 1], [8, -8]);

  return (
    <section ref={sectionRef} className="relative bg-white py-48 sm:py-64 overflow-hidden">
      {/* Atmospheric background image — subtle parallax */}
      <motion.div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1681684563211-7fb10143157a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYXJjaGl0ZWN0dXJhbCUyMHNwYWNlJTIwbGlnaHQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzIyMjAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="w-full h-[120%] object-cover opacity-[0.06]"
          style={{ objectPosition: "center 30%" }}
        />
      </motion.div>
      {/* Soft vignette to blend edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(255,255,255,0.7) 60%, #ffffff 100%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div style={{ y: contentParallaxY }}>
          <p
            className="tracking-[0.35em] uppercase mb-6"
            style={{ fontSize: "0.625rem", fontWeight: 600, color: "#3b82f6" }}
          >
            The Mastery Space
          </p>
          <h2
            className="mb-5"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "#000000",
            }}
          >
            Explore deeper ideas,
            <br />
            one-on-one with intelligence
          </h2>
          <p
            className="max-w-lg mx-auto mb-20"
            style={{
              fontSize: "0.9375rem",
              fontWeight: 400,
              lineHeight: 1.8,
              color: "#000000",
            }}
          >
            An immersive space to explore any topic with patient, intelligent
            mentors. Ask anything. Go anywhere. Build mastery.
          </p>
        </motion.div>

        {/* Statistics — large pillar typography */}
        <div className="flex items-center justify-center gap-12 sm:gap-20 mb-20">
          {masteryStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
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
                {s.value}
              </p>
              <p
                className="mt-2"
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: "#000000",
                }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => navigate("/tools")}
          className="group inline-flex items-center gap-2 px-9 py-3.5 rounded-full bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer"
          style={{ fontSize: "0.875rem", fontWeight: 700 }}
        >
          Enter the Experience
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   7 · COMMUNITY
   ════════════════════════════════════════════════════ */

function CommunitySection() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const parallaxY = useParallax(ref, 12);

  const stats = [
    { label: "Active Learners", value: "12,400+" },
    { label: "Countries", value: "89" },
    { label: "Milestones", value: "48,000+" },
    { label: "Stories Shared", value: "3,200+" },
  ];

  return (
    null
  );
}

/* ═══════════════════════════════════════════════════
   EXPLORE — Homepage version (Join replaces Back to Home)
   ════════════════════════════════════════════════════ */

const exploreLinks = [
  { label: "Human Achievements", desc: "Explore the milestones that shaped civilisation", href: "/achievements", image: imgAchievements, color: "#f59e0b" },
  { label: "How We Learn", desc: "Four guided learning paths from beginner to mastery", href: "/learn", image: imgLearn, color: "#3b82f6" },
  { label: "Spiritual Inspiration", desc: "Stories of resilience, purpose, and inner strength", href: "/spiritual", image: imgSpiritual, color: "#8b5cf6" },
  { label: "Mastery Space", desc: "A curated library of courses, tools, and project guides", href: "/tools", image: imgMastery, color: "#10b981" },
  { label: "Community", desc: "Connect, share stories, and grow together", href: "/community", image: imgCommunity, color: "#ec4899" },
];

function ExploreSection() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const parallaxY = useParallax(ref, 10);

  return (
    <section ref={ref} className="bg-white py-28 sm:py-36">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div style={{ y: parallaxY }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 mb-5">
            <Compass size={13} className="text-black" />
            <span style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", color: "#000000" }}>EXPLORE</span>
          </div>
          <h2 className="mb-3" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#000000" }}>
            Discover What's Possible
          </h2>
          <p className="max-w-md mx-auto" style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.7, color: "#000000" }}>
            Every section is a doorway to something extraordinary. Pick one and dive in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {exploreLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
            >
              <button
                onClick={() => navigate(link.href)}
                className="group relative w-full h-full min-h-[220px] flex flex-col items-center text-center p-7 pt-8 rounded-2xl border border-black/8 bg-white hover:border-black/15 hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                
                <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.08] mb-4">
                  <img src={link.image} alt={link.label} className="w-full h-full object-contain" />
                </div>
                <h3 className="mb-1.5" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#000000" }}>{link.label}</h3>
                <p className="max-w-[200px]" style={{ fontSize: "0.8rem", fontWeight: 400, lineHeight: 1.55, color: "#000000" }}>{link.desc}</p>
                <ArrowRight size={16} className="text-black/15 group-hover:text-black transition-all mt-auto pt-3 flex-shrink-0" />
              </button>
            </motion.div>
          ))}

          {/* Join card — replaces Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: exploreLinks.length * 0.06 }}
            whileHover={{ scale: 1.02 }}
          >
            <button
              onClick={() => navigate("/get-started?mode=join")}
              className="group w-full h-full min-h-[220px] flex flex-col items-center text-center p-7 pt-8 rounded-2xl border border-dashed border-black/10 bg-white hover:border-black/20 hover:-translate-y-1 transition-all duration-500 cursor-pointer"
            >
              <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.08] mb-4">
                <img src={imgJoin} alt="Join the Journey" className="w-full h-full object-contain" />
              </div>
              <h3 className="mb-1.5" style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000000" }}>Join the Journey</h3>
              <p className="max-w-[200px]" style={{ fontSize: "0.8rem", fontWeight: 400, lineHeight: 1.55, color: "#000000" }}>Create your account and begin your path to mastery</p>
              <ArrowRight size={16} className="text-black/15 group-hover:text-black transition-all mt-auto pt-3 flex-shrink-0" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   8 · FINAL CTA
   ════════════════════════════════════════════════════ */

function FinalCTA() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const parallaxY = useParallax(ref, 15);

  return (
    <section ref={ref} className="bg-white py-48 sm:py-64">
      <motion.div
        style={{ y: parallaxY }}
        className="max-w-2xl mx-auto px-6 text-center"
      >
        <h2
          className="mb-7"
          style={{
            fontSize: "clamp(2.7rem, 5vw, 8rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#000000",
          }}
        >
          YOUR POTENTIAL
          <br />
          <span style={{ color: "#D4A017" }}>STARTS HERE.</span>
        </h2>
        <p
          className="max-w-sm mx-auto mb-14"
          style={{
            fontSize: "1rem",
            fontWeight: 450,
            lineHeight: 1.85,
            color: "#000000",
          }}
        >
          Every great achievement started with a single step. This is your
          invitation to begin.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/get-started")}
            className="group px-14 py-4.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#FFFFFF",
              background: "#000000",
            }}
          >
            <span className="flex items-center gap-2.5">
              Begin Your Journey
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-8 py-4 rounded-full transition-colors duration-300 cursor-pointer hover:bg-black/5"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 550,
              color: "#000000",
            }}
          >
            Back to top
          </button>
        </div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   EXPORT — Clean section separation, no dividers
   ════════════════════════════════════════════════════ */

export function SectionsPreview() {
  return (
    <>
      <StorySection />
      <ScrollReveal>
        <AchievementsShowcase />
      </ScrollReveal>
      <ScrollReveal>
        <PathwaySection />
      </ScrollReveal>
      <ScrollReveal>
        <HowWeLearnSection />
      </ScrollReveal>
      <ScrollReveal>
        <SpiritualCard />
      </ScrollReveal>
      <ScrollReveal>
        <MasterySpacePreview />
      </ScrollReveal>
      <ScrollReveal>
        <CommunitySection />
      </ScrollReveal>
      <ScrollReveal>
        <ExploreSection />
      </ScrollReveal>
      <ScrollReveal>
        <FinalCTA />
      </ScrollReveal>
    </>
  );
}