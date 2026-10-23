import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Target,
  Rocket,
  Layers,
  Crown,
  Check,
  ChevronDown,
  Code,
  Palette,
  BarChart3,
  PenTool,
  Flower2,
  Brain,
  Zap,
  BookOpen,
  Users,
  Heart,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/* ════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════ */

const masteryStages = [
  {
    id: "foundation",
    number: "01",
    title: "Foundation",
    subtitle: "Learn the fundamentals",
    description:
      "Build an unshakable base. Every master was once a beginner who refused to stop learning. This stage establishes core concepts, mental models, and the discipline of daily practice.",
    color: "#3b82f6",
    icon: Layers,
    skills: ["Core Concepts", "Mental Models", "Daily Practice", "Self-Assessment"],
    duration: "4-8 weeks",
    image:
      "https://images.unsplash.com/photo-1761319115499-872737b89e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBrbm93bGVkZ2UlMjB3aXNkb20lMjBzaGVsdmVzfGVufDF8fHx8MTc3MjI1MzA5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "growth",
    number: "02",
    title: "Growth",
    subtitle: "Build real-world projects",
    description:
      "Theory meets practice. Apply what you've learned to meaningful projects. Make mistakes, iterate, and develop the resilience that separates hobbyists from professionals.",
    color: "#D4A017",
    icon: Target,
    skills: ["Project Building", "Problem Solving", "Collaboration", "Iteration"],
    duration: "8-16 weeks",
    image:
      "https://images.unsplash.com/photo-1588072432660-23ad1dc50b19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMGJ1aWxkaW5nJTIwY3JhZnRpbmclMjBjcmVhdGluZyUyMHdvcmtzaG9wfGVufDF8fHx8MTc3MjI1MzA4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "mastery",
    number: "03",
    title: "Mastery",
    subtitle: "Develop deep expertise",
    description:
      "Go deeper than anyone expects. Master the nuances, edge cases, and advanced techniques that make the difference. This is where you develop your signature style and voice.",
    color: "#000000",
    icon: Rocket,
    skills: ["Advanced Techniques", "Mentorship", "Teaching", "Original Work"],
    duration: "Ongoing",
    image:
      "https://images.unsplash.com/photo-1763905180930-892ee8d37ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlJTIwZGVzayUyMGNyZWF0aXZlJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcyMjUzMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "impact",
    number: "04",
    title: "Impact",
    subtitle: "Give back and lead",
    description:
      "True mastery isn't just about what you know. It's about what you build for others. Lead projects, mentor newcomers, and create lasting impact in your field and community.",
    color: "#D4A017",
    icon: Crown,
    skills: ["Leadership", "Community Building", "Innovation", "Legacy"],
    duration: "Lifetime",
    image:
      "https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGRpdmVyc2UlMjBwZW9wbGUlMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzcyMjUzMDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const domainInterests = [
  { id: "tech", label: "Technology", icon: Code, description: "Code, AI, Systems" },
  { id: "design", label: "Design", icon: Palette, description: "UI/UX, Visual, Creative" },
  { id: "data", label: "Data Science", icon: BarChart3, description: "Analytics, ML, Insights" },
  { id: "creative", label: "Creative Arts", icon: PenTool, description: "Writing, Music, Film" },
  { id: "growth", label: "Personal Growth", icon: Flower2, description: "Mindfulness, Leadership" },
  { id: "ai", label: "AI & Intelligence", icon: Brain, description: "Machine Learning, AGI" },
  { id: "business", label: "Entrepreneurship", icon: Rocket, description: "Startups, Strategy" },
];

const platformFeatures = [
  {
    title: "AI Mentor Sessions",
    description: "One-on-one conversations with domain-expert AI mentors who adapt to your learning pace and style.",
    icon: Brain,
  },
  {
    title: "Structured Pathways",
    description: "Clear progression from fundamentals to mastery, with milestones and projects at every stage.",
    icon: Target,
  },
  {
    title: "Real-World Projects",
    description: "Apply knowledge to meaningful projects, building a portfolio that demonstrates true capability.",
    icon: Zap,
  },
  {
    title: "Community Learning",
    description: "Connect with learners worldwide, share progress, and grow together through shared purpose.",
    icon: Users,
  },
  {
    title: "Curated Resources",
    description: "Handpicked books, courses, tools, and practices for every stage of your learning journey.",
    icon: BookOpen,
  },
  {
    title: "Spiritual Depth",
    description: "Integrating inner growth with outer achievement. Build skills with purpose and meaning.",
    icon: Heart,
  },
];

/* ════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════ */

function GetStartedHero() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
      scrollProgress.set(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollProgress]);

  const imageY = useTransform(scrollProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[650px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1597233799574-98eda9a9a6f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzdGFuZGluZyUyMG1vdW50YWluJTIwc3VtbWl0JTIwc3VucmlzZSUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc3MjI1MzA4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Summit at sunrise"
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 mb-8"
        >
          <Sparkles size={12} className="text-[#D4A017]" />
          <span
            className="text-white/60 tracking-[0.3em] uppercase"
            style={{ fontSize: "0.625rem", fontWeight: 600 }}
          >
            Your Journey Begins
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white max-w-4xl tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
          }}
        >
          Get Started
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-white/60 max-w-lg mt-6"
          style={{ fontSize: "1.0625rem", fontWeight: 400, lineHeight: 1.75 }}
        >
          A step-by-step guide to unlocking your full potential. No prior
          experience needed — just the willingness to grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-white/30"
              style={{ fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.2em" }}
            >
              SCROLL TO BEGIN
            </span>
            <ChevronDown size={16} className="text-white/30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   SECTION LABEL
   ════════════════════════════════════════════════════ */

function SectionLabel({
  number,
  label,
  className = "",
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${className}`}>
      <span
        style={{
          fontSize: "0.5625rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: "#3b82f6",
        }}
      >
        {number}
      </span>
      <div className="w-8 h-px bg-[#3b82f6]/30" />
      <span
        className="tracking-[0.15em] uppercase"
        style={{ fontSize: "0.5625rem", fontWeight: 600, color: "#3b82f6" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   HOW IT WORKS — 3 SIMPLE STEPS
   ════════════════════════════════════════════════════ */

const steps = [
  {
    number: "1",
    title: "Choose Your Domain",
    description:
      "Select the area of human potential that calls to you. Technology, design, personal growth, creative arts — or explore them all.",
  },
  {
    number: "2",
    title: "Meet Your Mentor",
    description:
      "Each domain has a dedicated AI mentor — a domain expert who adapts to your skill level and teaches in a confident, one-on-one style.",
  },
  {
    number: "3",
    title: "Learn, Build, Master",
    description:
      "Follow structured lessons, complete real-world projects, and track your progress through four stages of mastery.",
  },
];

function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-32 sm:py-40">
      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <SectionLabel number="01" label="How It Works" className="justify-center" />
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#000000",
            }}
          >
            Three steps to begin
          </h2>
          <p
            className="max-w-md mx-auto mt-5"
            style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.8, color: "#000000" }}
          >
            No complicated onboarding. No information overload. Just a clear
            path forward.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative p-8 sm:p-10 rounded-2xl border border-black/8 hover:-translate-y-1 transition-all duration-500"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "#000000" }}
              >
                <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#ffffff" }}>
                  {step.number}
                </span>
              </div>
              <h3
                className="mb-3"
                style={{ fontSize: "1.125rem", fontWeight: 800, color: "#000000" }}
              >
                {step.title}
              </h3>
              <p
                style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.75, color: "#000000" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   MASTERY PATHWAY — Foundation → Growth → Mastery → Impact
   ════════════════════════════════════════════════════ */

function MasteryPathwaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section className="bg-white py-32 sm:py-40">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionLabel number="02" label="The Mastery Pathway" className="justify-center" />
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#000000",
            }}
          >
            Four stages of{" "}
            <span style={{ color: "#D4A017" }}>transformation</span>
          </h2>
          <p
            className="max-w-lg mx-auto mt-5"
            style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.8, color: "#000000" }}
          >
            Every discipline follows the same arc. We've structured the entire
            platform around this timeless progression.
          </p>
        </motion.div>

        {/* Stage selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {masteryStages.map((stage, i) => {
            const Icon = stage.icon;
            const isActive = activeStage === i;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-black text-white"
                    : "border border-black/10 text-black hover:border-black/30"
                }`}
                style={{ fontSize: "0.8125rem", fontWeight: isActive ? 700 : 500 }}
              >
                <Icon size={14} />
                {stage.title}
              </button>
            );
          })}
        </motion.div>

        {/* Active stage detail */}
        <AnimatePresence mode="wait">
          {masteryStages.map(
            (stage, i) =>
              activeStage === i && (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
                >
                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <ImageWithFallback
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span
                        className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/15"
                        style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.05em" }}
                      >
                        Stage {stage.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <div
                      className="inline-flex items-center gap-2 mb-4"
                      style={{ color: stage.color === "#000000" ? "#3b82f6" : stage.color }}
                    >
                      <span
                        className="tracking-[0.2em] uppercase"
                        style={{ fontSize: "0.5625rem", fontWeight: 700 }}
                      >
                        {stage.subtitle}
                      </span>
                    </div>

                    <h3
                      className="mb-5"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                        fontWeight: 600,
                        lineHeight: 1.1,
                        color: "#000000",
                      }}
                    >
                      {stage.title}
                    </h3>

                    <p
                      className="mb-8"
                      style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.85, color: "#000000" }}
                    >
                      {stage.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {stage.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-full border border-black/10"
                          style={{ fontSize: "0.75rem", fontWeight: 600, color: "#000000" }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: stage.color === "#000000" ? "#3b82f6" : stage.color }}
                      />
                      <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000000" }}>
                        Duration: {stage.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>

        {/* Linear progress visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-10 border-t border-black/5"
        >
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {masteryStages.map((stage, i) => {
              const Icon = stage.icon;
              const isActive = i <= activeStage;
              return (
                <div key={stage.id} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => setActiveStage(i)}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? "#000000" : "#ffffff",
                        border: isActive ? "none" : "2px solid rgba(0,0,0,0.1)",
                      }}
                    >
                      <Icon
                        size={16}
                        style={{ color: isActive ? "#ffffff" : "#000000" }}
                      />
                    </div>
                    <span
                      className="hidden sm:block"
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: isActive ? 700 : 500,
                        color: "#000000",
                      }}
                    >
                      {stage.title}
                    </span>
                  </button>
                  {i < masteryStages.length - 1 && (
                    <div
                      className="flex-1 h-px mx-3 sm:mx-4 transition-colors duration-500"
                      style={{
                        backgroundColor: i < activeStage ? "#000000" : "rgba(0,0,0,0.1)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   CHOOSE YOUR DOMAIN
   ════════════════════════════════════════════════════ */

function ChooseDomainSection() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="bg-white py-32 sm:py-40">
      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionLabel number="03" label="Choose Your Path" className="justify-center" />
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#000000",
            }}
          >
            What calls to you?
          </h2>
          <p
            className="max-w-md mx-auto mt-5"
            style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.8, color: "#000000" }}
          >
            Select a domain to explore, or choose multiple. Your path is
            uniquely yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {domainInterests.map((domain, i) => {
            const Icon = domain.icon;
            const isSelected = selected === domain.id;
            return (
              <motion.button
                key={domain.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onClick={() => setSelected(isSelected ? null : domain.id)}
                className={`relative p-5 sm:p-6 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-black text-white border-2 border-black"
                    : "border border-black/8 hover:border-black/20 hover:-translate-y-0.5"
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#D4A017] flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                  </motion.div>
                )}
                <Icon
                  size={20}
                  className="mb-3"
                  style={{ color: isSelected ? "#D4A017" : "#3b82f6" }}
                />
                <h4
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: isSelected ? "#ffffff" : "#000000",
                  }}
                >
                  {domain.label}
                </h4>
                <p
                  className="mt-1"
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 400,
                    color: isSelected ? "rgba(255,255,255,0.7)" : "#000000",
                  }}
                >
                  {domain.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => navigate("/tools")}
            className="group inline-flex items-center gap-2 px-9 py-3.5 rounded-full bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            style={{ fontSize: "0.875rem", fontWeight: 700 }}
          >
            {selected ? `Explore ${domainInterests.find((d) => d.id === selected)?.label}` : "Explore All Domains"}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   PLATFORM FEATURES
   ════════════════════════════════════════════════════ */

function PlatformFeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-32 sm:py-40">
      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <SectionLabel number="04" label="What You Get" className="justify-center" />
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#000000",
            }}
          >
            Everything you need
          </h2>
          <p
            className="max-w-md mx-auto mt-5"
            style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.8, color: "#000000" }}
          >
            A complete learning ecosystem designed for depth, not distraction.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platformFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-8 rounded-2xl border border-black/8 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/8 flex items-center justify-center mb-5">
                  <Icon size={18} className="text-[#3b82f6]" />
                </div>
                <h3
                  className="mb-2"
                  style={{ fontSize: "1rem", fontWeight: 800, color: "#000000" }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{ fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.75, color: "#000000" }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   FAQ
   ════════════════════════════════════════════════════ */

const faqs = [
  {
    q: "Do I need any prior experience?",
    a: "Not at all. Every mastery pathway starts from the very beginning. Our Foundation stage is designed for complete beginners, while advanced learners can skip ahead to Growth or Mastery stages based on their existing skills.",
  },
  {
    q: "How do the AI Mentors work?",
    a: "Each domain has a dedicated AI mentor trained on that subject. When you enter a session, the mentor greets you personally, adapts to your skill level, and teaches through one-on-one conversation. It's like having a world-class expert available 24/7.",
  },
  {
    q: "Is this a traditional course platform?",
    a: "No. This is a Human Potential Operating System. Instead of passive video lectures, you learn through interactive mentor sessions, real-world projects, community collaboration, and structured progression through four stages of mastery.",
  },
  {
    q: "Can I learn multiple domains simultaneously?",
    a: "Absolutely. Many of our learners explore multiple domains. A developer might also study design, or a data scientist might explore personal growth. Cross-domain learning often leads to the most creative breakthroughs.",
  },
  {
    q: "How long does it take to reach mastery?",
    a: "It depends on the domain and your commitment. The Foundation stage typically takes 4-8 weeks, Growth takes 8-16 weeks, and Mastery is an ongoing journey. The Impact stage is a lifetime pursuit of giving back and leading others.",
  },
];

function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-white py-32 sm:py-40">
      <div ref={ref} className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionLabel number="05" label="Questions" className="justify-center" />
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#000000",
            }}
          >
            Common questions
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left px-6 py-5 rounded-2xl border border-black/8 hover:border-black/15 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <span style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#000000" }}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openIdx === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={16} style={{ color: "#000000" }} />
                  </motion.div>
                </div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 400,
                          lineHeight: 1.8,
                          color: "#000000",
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   FINAL CTA — START LEARNING
   ════════════════════════════════════════════════════ */

function FinalCTASection() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-32 sm:py-48">
      <div ref={ref} className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative path image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[2.5/1] mb-14">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1735821623217-0ae1b6cf96a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGxpZ2h0JTIwcGF0aCUyMGpvdXJuZXklMjBkaXJlY3Rpb258ZW58MXx8fHwxNzcyMjUzMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Light path"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          <h2
            className="mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#000000",
            }}
          >
            READY TO <span style={{ color: "#D4A017" }}>BEGIN</span>?
          </h2>
          <p
            className="max-w-md mx-auto mb-12"
            style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.8, color: "#000000" }}
          >
            The difference between who you are and who you could be is the work
            you're willing to do. Start today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/tools")}
              className="group px-12 py-4 rounded-full bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer"
              style={{ fontSize: "0.9375rem", fontWeight: 700 }}
            >
              <span className="flex items-center gap-2.5">
                Enter Mastery Space
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </span>
            </button>
            <button
              onClick={() => navigate("/join")}
              className="px-8 py-4 rounded-full border border-black text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
              style={{ fontSize: "0.875rem", fontWeight: 600 }}
            >
              Subscribe for Updates
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   PAGE EXPORT
   ════════════════════════════════════════════════════ */

export function GetStartedPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar darkHero />
      <GetStartedHero />
      <HowItWorksSection />
      <MasteryPathwaySection />
      <ChooseDomainSection />
      <PlatformFeaturesSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
