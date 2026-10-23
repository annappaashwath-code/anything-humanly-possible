import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  ArrowRight,
  Send,
  Trophy,
  BookOpen,
  Users,
  Wrench,
  Sparkles,
  Heart,
  Compass,
  Flame,
  CheckCircle2,
  Star,
  ChevronRight,
  Loader2,
  LogOut,
  Layers,
  User,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ReflectionSection } from "./ReflectionSection";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { isLoggedIn, setLoggedIn, logout, loadProfile, type UserProfile } from "./dashboard/dashboardStore";

import imgAchievements from "figma:asset/29142a1c4d6851e2cad1d8f647c25a618b4e3bbb.png";
import imgLearn from "figma:asset/b387ce4369ed1375ae415e25a45d22662479b3fa.png";
import imgSpiritual from "figma:asset/bf66445a973543803bd286777def509a8d204d8c.png";
import imgMastery from "figma:asset/a4ba9a66bcb24df1c2ec4f68f596f3b3c4a8558e.png";
import imgCommunity from "figma:asset/3c073d21a41f23af36fdc238e16c98ac9ad364d4.png";
import imgHome from "figma:asset/521208afc044f32751b533e619b14381b9927b7a.png";

/* ─── Data ─── */

const siteLinks = [
  { label: "Human Achievements", desc: "Explore the milestones that shaped civilisation", href: "/achievements", icon: Trophy, image: imgAchievements, color: "#f59e0b" },
  { label: "How We Learn", desc: "Four guided learning paths from beginner to mastery", href: "/learn", icon: BookOpen, image: imgLearn, color: "#3b82f6" },
  { label: "Spiritual Inspiration", desc: "Stories of resilience, purpose, and inner strength", href: "/spiritual", icon: Sparkles, image: imgSpiritual, color: "#8b5cf6" },
  { label: "Mastery Space", desc: "A curated library of courses, tools, and project guides", href: "/tools", icon: Wrench, image: imgMastery, color: "#10b981" },
  { label: "Community", desc: "Connect, share stories, and grow together", href: "/community", icon: Users, image: imgCommunity, color: "#ec4899" },
];

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ef0ca726`;

/* ─── Star field generator ─── */

function useStars(count: number, seed: number = 1) {
  return useMemo(() => {
    const stars: { x: number; y: number; r: number; o: number; twinkle: number }[] = [];
    let s = seed;
    const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    for (let i = 0; i < count; i++) {
      const clustered = rand() < 0.3;
      const cx = clustered ? (Math.floor(rand() * 5) * 20 + 10) : rand() * 100;
      const cy = clustered ? (Math.floor(rand() * 3) * 25 + 10) : rand() * 100;
      const spread = clustered ? 8 : 50;
      stars.push({
        x: Math.min(100, Math.max(0, cx + (rand() - 0.5) * spread * 2)),
        y: Math.min(100, Math.max(0, cy + (rand() - 0.5) * spread * 2)),
        r: 0.3 + rand() * 1.4,
        o: 0.1 + rand() * 0.75,
        twinkle: 3 + rand() * 8,
      });
    }
    return stars;
  }, [count, seed]);
}

/* ─── Scroll reveal ─── */

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Label style helper ─── */
const labelStyle: React.CSSProperties = {
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#000000",
};

const inputClass = "w-full px-4 py-3.5 rounded-xl border border-black/[0.08] bg-white outline-none transition-all duration-200 focus:border-black/20 text-black placeholder:text-black/30";

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

export function CallToActionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get("mode"); // "join" | "login"

  /* ── Newsletter state ── */
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  /* ── Auth state ── */
  const [authMode, setAuthMode] = useState<"login" | "join">(modeParam === "login" ? "login" : "join");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [loggedIn, setLoggedInState] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  /* Sync mode when query param changes */
  useEffect(() => {
    if (modeParam === "login") setAuthMode("login");
    else if (modeParam === "join") setAuthMode("join");
  }, [modeParam]);

  /* Load auth state on mount */
  useEffect(() => {
    const authenticated = isLoggedIn();
    setLoggedInState(authenticated);
    if (authenticated) loadProfile().then(setUserProfile);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const rememberRef = useRef<HTMLDivElement>(null);
  const authSectionRef = useRef<HTMLDivElement>(null);

  /* ── Scroll behavior: mode-aware ── */
  const hasScrolledRef = useRef(false);
  useEffect(() => {
    if (hasScrolledRef.current) return;
    hasScrolledRef.current = true;

    if (modeParam === "login") {
      // For login mode: instant jump near the section, then smooth-scroll to exact position
      // This prevents the hero from flashing on screen
      requestAnimationFrame(() => {
        const el = authSectionRef.current;
        if (el) {
          const navbarHeight = 72; // account for fixed navbar
          const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
          // First, jump close to avoid hero flash
          window.scrollTo({ top: top - 40, behavior: "instant" as ScrollBehavior });
          // Then smooth-scroll to the exact spot for a polished feel
          requestAnimationFrame(() => {
            window.scrollTo({ top, behavior: "smooth" });
          });
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Re-scroll when modeParam changes while already on the page */
  const prevModeRef = useRef(modeParam);
  useEffect(() => {
    if (prevModeRef.current === modeParam) return;
    prevModeRef.current = modeParam;
    if (modeParam === "login") {
      const el = authSectionRef.current;
      if (el) {
        const navbarHeight = 72;
        const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else if (modeParam === "join") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [modeParam]);

  /* ── Scroll progress for hero ── */
  const scrollY = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      scrollY.set(Math.min(Math.max(-rect.top / (rect.height * 0.55), 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  /* ── Remember section parallax ── */
  const rememberScrollY = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => {
      const el = rememberRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const h = window.innerHeight;
      rememberScrollY.set(Math.min(Math.max((h - rect.top) / (h + rect.height), 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [rememberScrollY]);
  const rememberGlowY = useTransform(rememberScrollY, [0, 1], [20, -20]);

  const starLayer1Y = useTransform(scrollY, [0, 1], [0, -3]);
  const galacticCloudY = useTransform(scrollY, [0, 1], [0, -8]);
  const starLayer2Y = useTransform(scrollY, [0, 1], [0, -16]);
  const starLayer3Y = useTransform(scrollY, [0, 1], [0, -28]);
  const foregroundHazeY = useTransform(scrollY, [0, 1], [0, -35]);
  const fadeToWhite = useTransform(scrollY, [0, 1], [0, 1]);
  const rememberGlowScale = useTransform(rememberScrollY, [0, 1], [0.95, 1.05]);

  const dustStars = useStars(220, 17);
  const farStars = useStars(110, 42);
  const nearStars = useStars(35, 99);

  /* ── Email submission ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setEmailError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError("Please enter a valid email address."); return; }
    setEmailError(""); setSubmitting(true); setSubmitMessage("");
    try {
      const res = await fetch(`${API_BASE}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${publicAnonKey}` },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (!res.ok) {
        let data: any = {};
        try { data = await res.json(); } catch { data = { error: `Server error (${res.status})` }; }
        setEmailError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false); return;
      }
      const data = await res.json();
      setSubmitMessage(data.alreadySubscribed ? "You're already on the list — welcome back!" : "You're in! We'll be in touch soon.");
      setSubmitted(true);
    } catch { setEmailError("Network error. Please check your connection and try again."); }
    finally { setSubmitting(false); }
  };

  /* ── Auth handlers ── */
  const switchTab = (mode: "login" | "join") => {
    setAuthMode(mode);
    setAuthError("");
    setAuthConfirmPassword("");
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim()) { setAuthError("Please enter your email."); return; }
    if (!authPassword.trim() || authPassword.length < 4) { setAuthError("Password must be at least 4 characters."); return; }
    if (authMode === "join" && authPassword !== authConfirmPassword) { setAuthError("Passwords do not match."); return; }
    setAuthError("");
    setAuthLoading(true);
    setTimeout(() => {
      setLoggedIn(authName.trim() || "Explorer", authEmail.trim());
      setLoggedInState(true);
      loadProfile().then(setUserProfile);
      setAuthLoading(false);
      setAuthEmail(""); setAuthPassword(""); setAuthConfirmPassword(""); setAuthName("");
    }, 600);
  };

  const handleLogout = () => { logout(); setLoggedInState(false); setUserProfile(null); };

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar darkHero />

      {/* ═══════════════════════════════════════════
          HERO — Deep Milky Way Night Sky
          ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden flex flex-col" style={{ minHeight: "135vh" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #04070f 0%, #060c1a 8%, #081222 18%, #0b1830 32%, #0e1e3a 48%, #142848 62%, #1e3558 74%, #304870 83%, #5a7090 90%, #9aa8c0 94%, #d0d6e2 97%, #ffffff 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(140deg, transparent 15%, rgba(120,140,190,0.025) 28%, rgba(160,175,210,0.05) 38%, rgba(190,200,225,0.06) 45%, rgba(160,175,210,0.05) 52%, rgba(120,140,190,0.025) 62%, transparent 75%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(125deg, transparent 25%, rgba(140,130,180,0.02) 38%, rgba(170,160,200,0.035) 48%, rgba(140,130,180,0.02) 58%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 pointer-events-none z-20" style={{ height: "80px", background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 100%)" }} />

        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: galacticCloudY }}>
          <div className="absolute" style={{ top: "8%", left: "5%", width: "90%", height: "55%", background: "linear-gradient(145deg, transparent 10%, rgba(110,130,180,0.025) 25%, rgba(150,165,200,0.04) 38%, rgba(170,180,210,0.05) 48%, rgba(150,165,200,0.04) 58%, rgba(110,130,180,0.025) 72%, transparent 88%)", filter: "blur(40px)" }} />
          <div className="absolute" style={{ top: "20%", left: "35%", width: "30%", height: "25%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(100,90,140,0.03) 0%, rgba(80,80,130,0.015) 50%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute" style={{ top: "30%", left: "15%", width: "70%", height: "15%", background: "linear-gradient(90deg, transparent 0%, rgba(60,70,100,0.02) 30%, rgba(80,90,120,0.035) 50%, rgba(60,70,100,0.02) 70%, transparent 100%)", filter: "blur(50px)", transform: "rotate(-8deg)" }} />
        </motion.div>

        <div className="absolute pointer-events-none" style={{ top: "10%", left: "25%", width: "50%", height: "35%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(90,100,160,0.03) 0%, rgba(70,80,140,0.015) 40%, transparent 70%)", filter: "blur(80px)" }} />

        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: starLayer1Y }}>
          {dustStars.map((star, i) => (
            <motion.div key={`dust-${i}`} className="absolute rounded-full" animate={{ opacity: [star.o * 0.5, star.o * 0.9, star.o * 0.5] }} transition={{ duration: star.twinkle, repeat: Infinity, ease: "easeInOut", delay: star.twinkle * 0.3 }} style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.r * 0.6, height: star.r * 0.6, backgroundColor: `rgba(200,210,235,${star.o * 0.5})` }} />
          ))}
        </motion.div>

        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: starLayer2Y }}>
          {farStars.map((star, i) => (
            <motion.div key={`far-${i}`} className="absolute rounded-full" animate={{ opacity: [star.o * 0.6, star.o, star.o * 0.6] }} transition={{ duration: star.twinkle, repeat: Infinity, ease: "easeInOut", delay: star.twinkle * 0.5 }} style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.r, height: star.r, backgroundColor: `rgba(220,225,245,${star.o})` }} />
          ))}
        </motion.div>

        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: starLayer3Y }}>
          {nearStars.map((star, i) => (
            <motion.div key={`near-${i}`} className="absolute rounded-full" animate={{ opacity: [star.o * 0.7, star.o, star.o * 0.7] }} transition={{ duration: star.twinkle * 0.8, repeat: Infinity, ease: "easeInOut", delay: star.twinkle * 0.2 }} style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.r * 1.5, height: star.r * 1.5, backgroundColor: `rgba(235,240,255,${star.o * 0.9})`, boxShadow: star.o > 0.5 ? `0 0 ${star.r * 2}px rgba(200,210,240,${star.o * 0.15})` : "none" }} />
          ))}
        </motion.div>

        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: foregroundHazeY }}>
          <div className="absolute" style={{ bottom: "15%", left: "0", right: "0", height: "30%", background: "linear-gradient(180deg, transparent 0%, rgba(180,190,210,0.02) 40%, rgba(200,210,230,0.04) 70%, rgba(220,225,240,0.06) 100%)", filter: "blur(60px)" }} />
        </motion.div>

        <motion.div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "#ffffff", opacity: fadeToWhite }} />

        <div className="relative z-10 flex items-center justify-center px-6" style={{ minHeight: "100vh" }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 mb-8" style={{ background: "rgba(255,255,255,0.06)" }}>
                <Flame size={14} className="text-white" />
                <span className="text-white" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em" }}>ANYTHING HUMANLY POSSIBLE</span>
              </motion.div>

              <h1 className="text-white mb-6" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
                Your Potential<br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #6ba3f7 0%, #a8c8fa 20%, #ffffff 45%, #ffffff 55%, #f5d990 80%, #d4a020 100%)", WebkitBackgroundClip: "text" }}>is Limitless</span>
              </h1>

              <motion.p initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }} className="text-white max-w-xl mx-auto mb-10" style={{ fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.8 }}>
                Every great achievement started with a single step. Every skill was once unknown. Every breakthrough began with the belief that something more was possible. This is your invitation to begin.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 1 }} className="flex flex-col items-center gap-2">
                <button onClick={() => { const el = document.querySelector("#signup-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="px-8 py-4 rounded-full bg-white text-black hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer" style={{ fontSize: "0.9375rem", fontWeight: 700 }}>
                  Join the Journey
                </button>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="mt-6">
                  <ChevronRight size={20} className="text-white/40 rotate-90" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          JOIN / LOGIN — Unified Auth Gateway
          ═══════════════════════════════════════════ */}
      <section id="signup-section" ref={authSectionRef} className="bg-white py-32 sm:py-40">
        <div className="max-w-md mx-auto px-6 text-center">
          <ScrollReveal>

            <AnimatePresence mode="wait">
              {loggedIn ? (
                /* ── Logged-in: Welcome back panel ── */
                <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <h2 className="mb-2" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#000000" }}>
                    You're already logged in.
                  </h2>
                  <p className="max-w-sm mx-auto mb-10" style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.75, color: "#000000" }}>
                    Your journey continues where you left off.
                  </p>

                  <div className="bg-white rounded-2xl border border-black/[0.08] p-8 text-left">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                        <User size={20} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <p style={{ fontSize: "1rem", fontWeight: 700, color: "#000000" }}>{userProfile?.name || "Explorer"}</p>
                        {userProfile?.email && <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000" }}>{userProfile.email}</p>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button onClick={() => navigate("/dashboard")} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer" style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                        Go to Dashboard <ArrowRight size={14} />
                      </button>
                      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-black/[0.08] text-black hover:bg-black/[0.03] active:scale-[0.98] transition-all duration-300 cursor-pointer" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                        <LogOut size={14} /> Log out
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ── Not logged in: Tab-based Join / Login ── */
                <motion.div key="auth-form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

                  {/* ── Tabs ── */}
                  <div className="flex items-center justify-center gap-1 mb-10">
                    <button
                      onClick={() => switchTab("join")}
                      className="relative px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: authMode === "join" ? 700 : 500,
                        backgroundColor: authMode === "join" ? "#000000" : "transparent",
                        color: authMode === "join" ? "#ffffff" : "#000000",
                      }}
                    >
                      Join the Journey
                    </button>
                    <button
                      onClick={() => switchTab("login")}
                      className="relative px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: authMode === "login" ? 700 : 500,
                        backgroundColor: authMode === "login" ? "#000000" : "transparent",
                        color: authMode === "login" ? "#ffffff" : "#000000",
                      }}
                    >
                      Login
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={authMode}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h2 className="mb-2" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#000000" }}>
                        {authMode === "login" ? "Welcome back" : "Join the journey"}
                      </h2>
                      <p className="max-w-sm mx-auto mb-8" style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.75, color: "#000000" }}>
                        {authMode === "login"
                          ? "Enter your personal growth command center."
                          : "Create your account and begin your path to mastery."}
                      </p>

                      <form onSubmit={handleAuth} className="space-y-4 text-left">
                        {authMode === "join" && (
                          <div>
                            <label className="block mb-1.5" style={labelStyle}>Name</label>
                            <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Your name" className={inputClass} style={{ fontSize: "0.875rem", fontWeight: 500 }} />
                          </div>
                        )}
                        <div>
                          <label className="block mb-1.5" style={labelStyle}>Email</label>
                          <input type="email" value={authEmail} onChange={(e) => { setAuthEmail(e.target.value); if (authError) setAuthError(""); }} placeholder="your@email.com" required className={inputClass} style={{ fontSize: "0.875rem", fontWeight: 500 }} />
                        </div>
                        <div>
                          <label className="block mb-1.5" style={labelStyle}>Password</label>
                          <input type="password" value={authPassword} onChange={(e) => { setAuthPassword(e.target.value); if (authError) setAuthError(""); }} placeholder="••••••••" required minLength={4} className={inputClass} style={{ fontSize: "0.875rem", fontWeight: 500 }} />
                        </div>
                        {authMode === "join" && (
                          <div>
                            <label className="block mb-1.5" style={labelStyle}>Confirm Password</label>
                            <input type="password" value={authConfirmPassword} onChange={(e) => { setAuthConfirmPassword(e.target.value); if (authError) setAuthError(""); }} placeholder="••••••••" required minLength={4} className={inputClass} style={{ fontSize: "0.875rem", fontWeight: 500 }} />
                          </div>
                        )}

                        {authError && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                            {authError}
                          </motion.p>
                        )}

                        <button type="submit" disabled={authLoading} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed" style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                          {authLoading ? (
                            <><Loader2 size={16} className="animate-spin" />{authMode === "login" ? "Signing in..." : "Creating account..."}</>
                          ) : (
                            <>{authMode === "login" ? "Sign In" : "Create Account"}<ArrowRight size={14} /></>
                          )}
                        </button>
                      </form>

                      {/* Prototype note */}
                      <div className="text-center mt-8 pt-6 border-t border-black/[0.06]">
                        <p style={{ fontSize: "0.6875rem", fontWeight: 400, color: "#000000", lineHeight: 1.6 }}>
                          This is a prototype. Enter any email and password to access your personal dashboard.
                          Your progress is saved locally and to the cloud.
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EXPLORE SECTIONS
          ═══════════════════════════════════════════ */}
      <section className="bg-white py-28 sm:py-36">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 mb-5">
                <Compass size={13} className="text-black" />
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", color: "#000000" }}>EXPLORE</span>
              </div>
              <h2 className="mb-3" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#000000" }}>Continue Your Journey</h2>
              <p className="max-w-md mx-auto" style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.7, color: "#000000" }}>Every section is a doorway to something extraordinary. Pick one and dive in.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {siteLinks.map((link, i) => (
              <ScrollReveal key={link.href} delay={i * 0.06}>
                <button onClick={() => navigate(link.href)} className="group relative w-full h-full min-h-[220px] flex flex-col items-center text-center p-7 pt-8 rounded-2xl border border-black/8 bg-white hover:border-black/15 hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: link.color }} />
                  <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.08] mb-4">
                    <img src={link.image} alt={link.label} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="mb-1.5" style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000000" }}>{link.label}</h3>
                  <p className="max-w-[200px]" style={{ fontSize: "0.8rem", fontWeight: 400, lineHeight: 1.55, color: "#000000" }}>{link.desc}</p>
                  <ArrowRight size={16} className="text-black/15 group-hover:text-black transition-all mt-auto pt-3 flex-shrink-0" />
                </button>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={siteLinks.length * 0.06}>
              <button onClick={() => navigate("/")} className="group w-full h-full min-h-[220px] flex flex-col items-center text-center p-7 pt-8 rounded-2xl border border-dashed border-black/10 bg-white hover:border-black/20 hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] flex items-center justify-center flex-shrink-0 transition-transform duration:300 group-hover:scale-[1.08] mb-4">
                  <img src={imgHome} alt="Back to Home" className="w-full h-full object-contain" />
                </div>
                <h3 className="mb-1.5" style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000000" }}>Back to Home</h3>
                <p className="max-w-[200px]" style={{ fontSize: "0.8rem", fontWeight: 400, lineHeight: 1.55, color: "#000000" }}>Return to the starting point and explore from the top</p>
                <ArrowRight size={16} className="text-black/15 group-hover:text-black transition-all mt-auto pt-3 flex-shrink-0" />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PERSONAL NOTE
          ═══════════════════════════════════════════ */}
      <section className="bg-white py-28 sm:py-36">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex justify-center mb-8">
              <span className="select-none" style={{ fontSize: "5rem", fontWeight: 900, lineHeight: 0.8, color: "rgba(0,0,0,0.08)" }}>&ldquo;</span>
            </div>
            <div className="bg-white rounded-3xl border border-black/8 p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center"><Heart size={16} className="text-white" /></div>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#000000" }}>A personal note</p>
                  <p style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#000000" }}>From the AHP team</p>
                </div>
              </div>
              <p className="mb-5" style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.85, color: "#000000" }}>
                We built <span style={{ fontWeight: 700, color: "#000000" }}>Anything Humanly Possible</span> because we believe the most powerful idea in the world is this: ordinary people are capable of extraordinary things. Not someday. Not under perfect conditions. Right now, with whatever you have.
              </p>
              <p className="mb-5" style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.85, color: "#000000" }}>
                Every resource on this site was chosen with one purpose — to remove the barriers between you and the thing you've been meaning to start. We've organized the tools so you don't have to. We've tracked the milestones so you can see how far you've come. And we've shared the stories of people who once stood exactly where you stand now.
              </p>
              <p style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.85, color: "#000000" }}>
                The only thing left is the first step. And if you've read this far, you've already taken it.
              </p>
              <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                <div>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000000" }}>Ashwath Annappa</p>
                  <p style={{ fontSize: "0.6875rem", fontWeight: 500, fontStyle: "italic", color: "#000000", marginTop: "2px" }}>AA DESIGN THINK</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ fontSize: "0.625rem", fontWeight: 500, color: "#000000" }}>Made with</span>
                  <Heart size={10} className="text-red-500 fill-red-500" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RESOURCES FOR REFLECTION
          ═══════════════════════════════════════════ */}
      <ReflectionSection />

      {/* ═══════════════════════════════════════════
          FINAL STATEMENT — "Remember"
          ═══════════════════════════════════════════ */}
      <section ref={rememberRef} className="relative overflow-hidden" style={{ paddingTop: 0 }}>
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "200px", background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.5) 45%, rgba(20,18,22,0.3) 70%, #0e0c12 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0e0c12 0%, #100e16 20%, #12101a 40%, #14121e 60%, #161420 80%, #14121e 100%)" }} />

        <motion.div className="absolute pointer-events-none" style={{ y: rememberGlowY, scale: rememberGlowScale, bottom: "10%", left: "0", right: "0", height: "60%" }}>
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "50%", background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(200,170,120,0.08) 0%, rgba(180,150,100,0.04) 30%, rgba(140,120,80,0.02) 60%, transparent 100%)" }} />
          <div className="absolute" style={{ bottom: "0", left: "50%", transform: "translateX(-50%)", width: "500px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(230,215,180,0.1) 0%, rgba(210,195,160,0.06) 25%, rgba(180,165,130,0.03) 50%, transparent 70%)", filter: "blur(50px)" }} />
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "1px", background: "linear-gradient(90deg, transparent 8%, rgba(210,190,150,0.15) 25%, rgba(230,210,170,0.22) 50%, rgba(210,190,150,0.15) 75%, transparent 92%)" }} />
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "180px", background: "linear-gradient(180deg, transparent 0%, rgba(160,140,100,0.02) 40%, rgba(190,170,130,0.05) 100%)", filter: "blur(40px)" }} />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 55%, transparent 0%, rgba(10,8,14,0.3) 100%)" }} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center" style={{ paddingTop: "14rem", paddingBottom: "10rem" }}>
          <ScrollReveal>
            <p className="tracking-[0.3em] uppercase mb-5 text-white" style={{ fontSize: "0.625rem", fontWeight: 600 }}>Remember</p>
            <h2 className="text-white mb-6" style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Everything you need<br />is already within you
            </h2>
            <p className="text-white max-w-lg mx-auto mb-10" style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.75 }}>
              The tools are here. The community is waiting. The only question is: what will you build first?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => navigate("/")} className="flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer" style={{ fontSize: "0.9375rem", fontWeight: 700 }}>
                Start Exploring <ArrowRight size={16} />
              </button>
              <button onClick={() => { const el = document.querySelector("#signup-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                Get Updates
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}