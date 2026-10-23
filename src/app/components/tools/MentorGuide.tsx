import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Sparkles,
  BookOpen,
  Target,
  Lightbulb,
  MessageCircle,
  Brain,
  Compass,
  Rocket,
  Zap,
} from "lucide-react";
import type { CourseDetail } from "./courseDetailData";
import type { Course } from "./toolsData";

/* ────────────────────────────────────────────
   Types
   ──────────────────────────────────────────── */

interface MentorGuideProps {
  course: Course;
  detail: CourseDetail;
  categoryColor: string;
  categoryLabel: string;
  enrolled: boolean;
}

interface ChatMessage {
  id: string;
  role: "user" | "mentor";
  text: string;
  timestamp: number;
}

type MentorMood = "idle" | "thinking" | "explaining" | "celebrating" | "greeting";

/* ────────────────────────────────────────────
   Smart response generator
   ───────────────────────────────────────────��� */

function generateMentorResponse(
  question: string,
  course: Course,
  detail: CourseDetail,
  categoryLabel: string
): string {
  const q = question.toLowerCase();

  // Greetings
  if (q.match(/^(hi|hello|hey|greetings|howdy|sup)/)) {
    return `Hey there! I'm your personal guide for "${course.title}." I'm here to help you navigate every concept, exercise, and milestone. What would you like to explore first?`;
  }

  // What is this course about / overview
  if (q.match(/(what|about|overview|describe|tell me|explain).*(course|this|it)/)) {
    return `Great question! ${detail.overview.slice(0, 280)}... This is a ${course.difficulty.toLowerCase()}-level journey that typically takes ${course.duration}. Want me to break down the specific modules?`;
  }

  // Prerequisites
  if (q.match(/(prerequisite|before|need to know|require|background|prior)/)) {
    const prereqs = detail.prerequisites.join(", ");
    return `To get the most out of this course, here's what helps: ${prereqs}. But don't worry if you're not 100% there yet — many students learn the prerequisites alongside the course material. The key is willingness to practice.`;
  }

  // Learning objectives / what will I learn
  if (q.match(/(learn|objective|outcome|gain|skill|what will|achieve)/)) {
    const objectives = detail.learningObjectives.slice(0, 4).join("; ");
    return `By the end of this course, you'll be able to: ${objectives}. These aren't just theoretical — each objective is tied to hands-on projects and real-world applications. Which area interests you most?`;
  }

  // Difficulty
  if (q.match(/(hard|difficult|easy|level|beginner|intermediate|advanced|challenge)/)) {
    const diffMap: Record<string, string> = {
      Beginner: "This course is designed for beginners — no prior experience needed. We start from the very basics and build up gradually. Every concept is explained with clear examples.",
      Intermediate: "This is an intermediate-level course. You'll need some foundational knowledge, but we'll review key concepts as we go. The pacing is designed to stretch you without overwhelming.",
      Advanced: "This is an advanced course that assumes solid fundamentals. We dive deep into complex topics with nuanced examples. It's challenging but incredibly rewarding.",
    };
    return `${diffMap[course.difficulty] || "This course is well-paced for all levels."} The completion rate is ${course.completionRate}%, which speaks to how engaging the material is.`;
  }

  // Duration / time
  if (q.match(/(how long|duration|time|hours|weeks|complete|finish)/)) {
    return `The full course takes about ${course.duration}. But here's the thing — it's self-paced, so you can go faster or slower depending on your schedule. Most students find that consistent daily practice of even 30-60 minutes leads to the best results. There are ${detail.modules.length} modules with ${detail.modules.reduce((sum, m) => sum + m.lessons.length, 0)} total lessons.`;
  }

  // Modules / curriculum / structure
  if (q.match(/(module|curriculum|structure|section|chapter|lesson|syllabus|outline)/)) {
    const modList = detail.modules.map((m, i) => `${i + 1}. ${m.title} (${m.lessons.length} lessons)`).join("; ");
    return `Here's how the course is structured: ${modList}. Each module builds on the previous one, and every module ends with a practical exercise. I'd recommend going in order, but if you have prior experience, you can skip ahead.`;
  }

  // Exercises / practice / hands-on
  if (q.match(/(exercise|practice|hands.on|project|build|create|assignment)/)) {
    const exList = detail.exercises.slice(0, 3).map((e) => `"${e.title}"`).join(", ");
    return `Practice is where the real learning happens! This course includes exercises like ${exList}. Each exercise is designed to apply what you've just learned in a real-world context. I always say: reading about swimming won't make you a swimmer — you have to get in the water.`;
  }

  // Real-world / examples / applications
  if (q.match(/(real.world|example|application|use case|industry|career|job|practical)/)) {
    const examples = detail.realWorldExamples.map((e) => e.title).join(", ");
    return `This course draws from real-world case studies: ${examples}. Understanding how these skills are applied in practice helps you see the bigger picture. The ${categoryLabel} field is evolving rapidly, and these skills are increasingly in demand.`;
  }

  // Free / cost / price
  if (q.match(/(free|cost|price|pay|money|afford|fee)/)) {
    return course.free
      ? `This course is completely free — no hidden fees, no paywalls. Quality education should be accessible to everyone. Just enroll and start learning at your own pace.`
      : `This course offers incredible value for its content. Given that ${course.ratingCount.toLocaleString()} students have enrolled with a ${course.rating} rating, the investment pays for itself many times over.`;
  }

  // Rating / reviews / quality
  if (q.match(/(rating|review|quality|good|worth|recommend)/)) {
    return `This course has a ${course.rating}/5 rating from ${course.ratingCount.toLocaleString()} students, with a ${course.completionRate}% completion rate. Those numbers tell a powerful story — people don't just start this course, they finish it. The community feedback has been overwhelmingly positive.`;
  }

  // Where to start / beginning / first step
  if (q.match(/(start|begin|first|where do i|how do i)/)) {
    return `The best place to start is Module 1: "${detail.modules[0]?.title}." It establishes the foundation everything else builds on. Take your time with it — understanding the basics deeply makes everything that follows much easier. Ready to dive in?`;
  }

  // Motivation / encouragement
  if (q.match(/(motivat|inspir|encourage|scared|nervous|anxious|overwhelm|stuck|give up)/)) {
    return `Here's what I want you to know: every expert was once a beginner. ${detail.categoryWisdom.author} said, "${detail.categoryWisdom.quote}" — and that applies directly to your journey. The fact that you're here, asking questions, shows incredible initiative. Take it one lesson at a time.`;
  }

  // Skills / career
  if (q.match(/(skill|career|hire|employ|portfolio|resume)/)) {
    const skills = course.topSkills.join(", ");
    return `This course builds ${course.topSkills.length} key skills: ${skills}. These are highly sought-after in the ${categoryLabel} field. ${course.earningPotential ? `The earning potential is ${course.earningPotential}.` : ""} Combine these skills with a strong portfolio of projects and you'll stand out.`;
  }

  // Help / what can you do
  if (q.match(/(help|can you|what can|capable|assist)/)) {
    return `I can help you with anything about this course! Ask me about the curriculum, prerequisites, exercises, real-world applications, career relevance, difficulty level, time commitment, or just ask for motivation. I'm also happy to explain any concept from the course material. What's on your mind?`;
  }

  // Thank you
  if (q.match(/(thank|thanks|appreciate)/)) {
    return `You're very welcome! Remember, every question you ask is a step forward in your learning journey. I'm always here when you need guidance. Keep that curiosity alive!`;
  }

  // Default contextual response
  const contextualResponses = [
    `That's a thoughtful question about ${categoryLabel}. Based on this course's curriculum, "${detail.modules[0]?.title}" covers foundational concepts that may address this. As you progress through the ${detail.modules.length} modules, you'll build increasingly deep understanding. Want me to dive deeper into any specific topic?`,
    `Interesting question! While I can share what this course covers — ${detail.learningObjectives[0]?.toLowerCase()}, ${detail.learningObjectives[1]?.toLowerCase()}, and more — I'd recommend exploring the curriculum modules step by step. The real magic happens when you start the exercises. Shall I tell you more about the hands-on projects?`,
    `Great curiosity! This course by ${course.provider} is designed to take you from ${course.difficulty.toLowerCase()}-level understanding to mastery. The ${detail.exercises.length} interactive exercises and ${detail.realWorldExamples.length} real-world case studies ensure you don't just learn theory — you apply it. What aspect would you like to explore more?`,
  ];

  return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
}

/* ────────────────────────────────────────────
   Suggested prompts
   ──────────────────────────────────────────── */

function getSuggestedPrompts(course: Course, detail: CourseDetail): { icon: typeof Sparkles; text: string }[] {
  return [
    { icon: BookOpen, text: "What will I learn in this course?" },
    { icon: Compass, text: "Where should I start?" },
    { icon: Target, text: "What skills will I gain?" },
    { icon: Zap, text: "Do I need any prerequisites?" },
    { icon: Brain, text: "How is the course structured?" },
    { icon: Rocket, text: "How long will this take?" },
    { icon: Lightbulb, text: "Show me real-world applications" },
    { icon: Sparkles, text: "Is this course right for me?" },
  ];
}

/* ────────────────────────────────────────────
   Animated Mentor Avatar (CSS 3D)
   ──────────────────────────────────────────── */

function MentorAvatar({ mood, color }: { mood: MentorMood; color: string }) {
  const moodColors: Record<MentorMood, string> = {
    idle: color,
    thinking: "#6366f1",
    explaining: color,
    celebrating: "#10b981",
    greeting: "#f59e0b",
  };

  const activeColor = moodColors[mood];

  // Floating particles around the mentor
  const particles = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * 360,
    delay: i * 0.3,
    size: 3 + Math.random() * 4,
  })), []);

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: activeColor }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbital ring */}
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-dashed opacity-15"
        style={{ borderColor: activeColor }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: activeColor,
            opacity: 0.4,
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [
              Math.cos((p.angle * Math.PI) / 180) * 65,
              Math.cos(((p.angle + 30) * Math.PI) / 180) * 75,
              Math.cos((p.angle * Math.PI) / 180) * 65,
            ],
            y: [
              Math.sin((p.angle * Math.PI) / 180) * 65,
              Math.sin(((p.angle + 30) * Math.PI) / 180) * 75,
              Math.sin((p.angle * Math.PI) / 180) * 65,
            ],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 3 + p.delay, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {/* Main avatar body */}
      <motion.div
        className="absolute inset-6 rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${activeColor}20, ${activeColor}40)`,
          border: `2px solid ${activeColor}30`,
          backdropFilter: "blur(20px)",
        }}
        animate={
          mood === "thinking"
            ? { scale: [1, 0.97, 1] }
            : mood === "celebrating"
            ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }
            : mood === "greeting"
            ? { scale: [1, 1.03, 1] }
            : { scale: [1, 1.01, 1] }
        }
        transition={{ duration: mood === "thinking" ? 1.5 : 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner face */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Face background */}
          <motion.div
            className="absolute inset-3 rounded-full"
            style={{
              background: `radial-gradient(circle at 40% 35%, ${activeColor}15, ${activeColor}05)`,
            }}
          />

          {/* Eyes */}
          <div className="relative flex items-center gap-5 sm:gap-6 -mt-2">
            {/* Left eye */}
            <div className="relative">
              <motion.div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                style={{ backgroundColor: activeColor }}
                animate={
                  mood === "thinking"
                    ? { scaleY: [1, 0.3, 1], scaleX: [1, 1.1, 1] }
                    : mood === "celebrating"
                    ? { scaleY: [1, 0.2, 1] }
                    : { scaleY: [1, 0.1, 1] }
                }
                transition={{
                  duration: mood === "thinking" ? 2 : 3.5,
                  repeat: Infinity,
                  repeatDelay: mood === "thinking" ? 0.5 : 2,
                  ease: "easeInOut",
                }}
              />
              {/* Eye glint */}
              <motion.div
                className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-white/80"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Right eye */}
            <div className="relative">
              <motion.div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                style={{ backgroundColor: activeColor }}
                animate={
                  mood === "thinking"
                    ? { scaleY: [1, 0.3, 1], scaleX: [1, 1.1, 1] }
                    : mood === "celebrating"
                    ? { scaleY: [1, 0.2, 1] }
                    : { scaleY: [1, 0.1, 1] }
                }
                transition={{
                  duration: mood === "thinking" ? 2 : 3.5,
                  repeat: Infinity,
                  repeatDelay: mood === "thinking" ? 0.5 : 2,
                  ease: "easeInOut",
                  delay: 0.1,
                }}
              />
              <motion.div
                className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-white/80"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          </div>

          {/* Mouth */}
          <motion.div
            className="absolute bottom-[30%] left-1/2 -translate-x-1/2"
            animate={
              mood === "explaining"
                ? { scaleX: [1, 1.1, 0.9, 1], scaleY: [1, 1.2, 0.8, 1] }
                : mood === "celebrating"
                ? { scaleX: [1, 1.2, 1] }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {mood === "celebrating" ? (
              <svg width="24" height="14" viewBox="0 0 24 14">
                <path d="M2 2 C6 12, 18 12, 22 2" stroke={activeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            ) : mood === "thinking" ? (
              <motion.div
                className="w-4 h-4 rounded-full border-2"
                style={{ borderColor: activeColor }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ) : mood === "explaining" ? (
              <svg width="20" height="12" viewBox="0 0 20 12">
                <motion.ellipse
                  cx="10"
                  cy="6"
                  rx="7"
                  ry="5"
                  fill={`${activeColor}30`}
                  stroke={activeColor}
                  strokeWidth="2"
                  animate={{ ry: [4, 6, 4] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </svg>
            ) : (
              <svg width="20" height="10" viewBox="0 0 20 10">
                <path d="M3 3 C7 8, 13 8, 17 3" stroke={activeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Status indicator */}
      <motion.div
        className="absolute bottom-4 right-6 px-2.5 py-1 rounded-full backdrop-blur-md"
        style={{
          backgroundColor: `${activeColor}15`,
          border: `1px solid ${activeColor}25`,
          fontSize: "0.5625rem",
          fontWeight: 700,
          color: activeColor,
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {mood === "thinking" ? "Thinking..." : mood === "explaining" ? "Speaking" : mood === "celebrating" ? "🎉" : "Online"}
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Typing Indicator
   ──────────────────────────────────────────── */

function TypingIndicator({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Main MentorGuide Component
   ──────────────────────────────────────────── */

export function MentorGuide({ course, detail, categoryColor, categoryLabel, enrolled }: MentorGuideProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState<MentorMood>("greeting");
  const [isTyping, setIsTyping] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: "greeting",
          role: "mentor",
          text: `Welcome! I'm your personal guide for "${course.title}." I'm here to walk you through every concept, answer your questions, and make sure you feel confident at every step. What would you like to know?`,
          timestamp: Date.now(),
        },
      ]);
      setMood("idle");
    }, 800);
    return () => clearTimeout(timer);
  }, [course.title]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        text: text.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setMood("thinking");
      setIsTyping(true);
      setHasInteracted(true);

      // Simulate thinking + response
      const delay = 800 + Math.random() * 1200;
      setTimeout(() => {
        setMood("explaining");
        const responseText = generateMentorResponse(text, course, detail, categoryLabel);

        setTimeout(() => {
          const mentorMsg: ChatMessage = {
            id: `mentor-${Date.now()}`,
            role: "mentor",
            text: responseText,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, mentorMsg]);
          setIsTyping(false);

          // Return to idle after explaining
          setTimeout(() => setMood("idle"), 2000);
        }, 500 + Math.random() * 500);
      }, delay);
    },
    [course, detail, categoryLabel]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const suggestedPrompts = useMemo(
    () => getSuggestedPrompts(course, detail),
    [course, detail]
  );

  return (
    <div className="relative">
      {/* ═══ Immersive Mentor Environment ═══ */}
      <div className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(145deg, #0f0f14, #1a1a2e, #16213e)" }}>
        {/* Background effects */}
        <div className="absolute inset-0">
          {/* Starfield */}
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 160px 30px, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 200px 60px, rgba(255,255,255,0.4), transparent), radial-gradient(1.5px 1.5px at 250px 90px, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 300px 20px, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 350px 70px, rgba(255,255,255,0.5), transparent), radial-gradient(1.5px 1.5px at 400px 50px, rgba(255,255,255,0.4), transparent)", backgroundSize: "450px 100px" }} />

          {/* Gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-15"
            style={{ background: `radial-gradient(ellipse at 50% 30%, ${categoryColor}40, transparent 70%)` }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundSize: "50px 50px", backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)" }} />
        </div>

        <div className="relative px-5 sm:px-8 py-8 sm:py-10">
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
              style={{
                backgroundColor: `${categoryColor}20`,
                border: `1px solid ${categoryColor}30`,
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: categoryColor }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: categoryColor }}>
                AI Learning Guide
              </span>
            </motion.div>
            <h3 className="text-white mb-1" style={{ fontSize: "1.25rem", fontWeight: 800 }}>
              Your Personal Mentor
            </h3>
            <p className="text-white/40 max-w-md mx-auto" style={{ fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.6 }}>
              Ask anything about this course — I'll guide you through every concept, exercise, and milestone.
            </p>
          </div>

          {/* Mentor Avatar */}
          <MentorAvatar mood={mood} color={categoryColor} />

          {/* Mentor Name Tag */}
          <motion.div
            className="text-center mt-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-white/70" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
              {categoryLabel} Guide
            </span>
            <span className="text-white/30 mx-2">·</span>
            <span className="text-white/40" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
              Specialized in {course.topSkills.slice(0, 2).join(" & ")}
            </span>
          </motion.div>

          {/* ═══ Chat Interface ═══ */}
          <div className="max-w-2xl mx-auto">
            {/* Chat messages area */}
            <div
              className="rounded-2xl overflow-hidden backdrop-blur-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Messages */}
              <div className="max-h-72 overflow-y-auto p-4 space-y-3 scroll-smooth" style={{ scrollbarWidth: "thin", scrollbarColor: `${categoryColor}40 transparent` }}>
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl ${
                          msg.role === "user" ? "rounded-br-md" : "rounded-bl-md"
                        }`}
                        style={
                          msg.role === "user"
                            ? {
                                backgroundColor: categoryColor,
                                color: "#fff",
                              }
                            : {
                                backgroundColor: "rgba(255,255,255,0.07)",
                                color: "rgba(255,255,255,0.85)",
                                border: "1px solid rgba(255,255,255,0.06)",
                              }
                        }
                      >
                        {msg.role === "mentor" && (
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Sparkles size={10} style={{ color: categoryColor }} />
                            <span style={{ fontSize: "0.5625rem", fontWeight: 700, color: categoryColor }}>
                              Mentor
                            </span>
                          </div>
                        )}
                        <p style={{ fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.7 }}>
                          {msg.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div
                      className="rounded-2xl rounded-bl-md px-2 py-2"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <TypingIndicator color={categoryColor} />
                    </div>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Suggested prompts */}
              {!hasInteracted && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="px-4 pb-3"
                >
                  <p className="text-white/25 mb-2" style={{ fontSize: "0.625rem", fontWeight: 600 }}>
                    SUGGESTED QUESTIONS
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedPrompts.slice(0, 4).map((prompt, i) => {
                      const Icon = prompt.icon;
                      return (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => sendMessage(prompt.text)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            fontSize: "0.6875rem",
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          <Icon size={10} />
                          {prompt.text}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {hasInteracted && messages.length > 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 pb-2"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedPrompts.slice(4, 8).map((prompt, i) => {
                      const Icon = prompt.icon;
                      return (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => sendMessage(prompt.text)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            fontSize: "0.625rem",
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.35)",
                          }}
                        >
                          <Icon size={9} />
                          {prompt.text}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-3 pt-2">
                <div
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <MessageCircle size={14} className="text-white/20 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your mentor anything..."
                    className="flex-1 bg-transparent text-white placeholder-white/25 outline-none"
                    style={{ fontSize: "0.8125rem", fontWeight: 400 }}
                    disabled={isTyping}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all disabled:opacity-30"
                    style={{
                      backgroundColor: input.trim() ? categoryColor : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Send size={13} className="text-white" />
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Mentor capabilities footer */}
            <div className="flex items-center justify-center gap-4 mt-4">
              {[
                { icon: BookOpen, label: "Course guidance" },
                { icon: Target, label: "Skill mapping" },
                { icon: Lightbulb, label: "Career advice" },
              ].map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.label} className="flex items-center gap-1.5">
                    <Icon size={10} className="text-white/20" />
                    <span className="text-white/25" style={{ fontSize: "0.5625rem", fontWeight: 600 }}>
                      {cap.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}