import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Calendar,
  Save,
  LogOut,
  ArrowRight,
  Check,
  Award,
  BookOpen,
  Clock,
} from "lucide-react";
import { useDashboard } from "./DashboardLayout";
import {
  saveProfile,
  logout,
  computeOverallProgress,
  computeMasteryStage,
  getCompletedMilestones,
  getAllLessons,
  type UserProfile,
} from "./dashboardStore";

export function ProfilePage() {
  const navigate = useNavigate();
  const { data, loading, reload } = useDashboard();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [initialized, setInitialized] = useState(false);

  // Initialize form values from loaded data
  if (data && !initialized) {
    setName(data.profile.name);
    setEmail(data.profile.email);
    setInitialized(true);
  }

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

  const overallPct = computeOverallProgress(data.progress);
  const stage = computeMasteryStage(data.progress);
  const milestones = getCompletedMilestones(data.progress);
  const allLessons = getAllLessons();
  const completedCount = allLessons.filter((l) => data.progress[l.lesson.id]).length;
  const hoursLearned = Math.round((completedCount * 45) / 60);

  const joinDate = new Date(data.profile.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSave = async () => {
    setSaving(true);
    const updated: UserProfile = {
      ...data.profile,
      name: name.trim() || "Explorer",
      email: email.trim(),
      masteryStage: stage,
    };
    await saveProfile(updated);
    await reload();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "EX";

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-8 sm:py-12">
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
          Account
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
          Profile
        </h1>
      </motion.div>

      {/* Avatar + Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 rounded-2xl border border-black/[0.06] bg-white mb-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#000000", color: "#ffffff", fontSize: "1.5rem", fontWeight: 800 }}
        >
          {initials}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#000000" }}>{name || "Explorer"}</h2>
          <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#000000", marginTop: 2 }}>
            {stage.charAt(0).toUpperCase() + stage.slice(1)} Stage &middot; Joined {joinDate}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
            <span className="flex items-center gap-1.5" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#000000" }}>
              <BookOpen size={12} className="text-[#3b82f6]" /> {completedCount} lessons
            </span>
            <span className="flex items-center gap-1.5" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#000000" }}>
              <Clock size={12} className="text-[#3b82f6]" /> {hoursLearned} hours
            </span>
            <span className="flex items-center gap-1.5" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#000000" }}>
              <Award size={12} style={{ color: "#D4A017" }} /> {milestones.length} milestones
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 text-center">
          <div className="relative w-16 h-16 mx-auto">
            <svg width={64} height={64} className="-rotate-90">
              <circle cx={32} cy={32} r={28} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={5} />
              <circle
                cx={32} cy={32} r={28}
                fill="none" stroke="#000000" strokeWidth={5} strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={2 * Math.PI * 28 * (1 - overallPct / 100)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span style={{ fontSize: "0.8125rem", fontWeight: 900, color: "#000000" }}>{overallPct}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-8 rounded-2xl border border-black/[0.06] bg-white mb-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <h3 className="mb-6" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#000000" }}>
          Edit Profile
        </h3>

        <div className="space-y-4">
          <div>
            <label
              className="flex items-center gap-1.5 mb-2"
              style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000" }}
            >
              <User size={11} /> Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#fafafa] outline-none transition-all duration-200 focus:border-black/20 focus:bg-white"
              style={{ fontSize: "0.875rem", fontWeight: 500, color: "#000000" }}
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1.5 mb-2"
              style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000" }}
            >
              <Mail size={11} /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#fafafa] outline-none transition-all duration-200 focus:border-black/20 focus:bg-white"
              style={{ fontSize: "0.875rem", fontWeight: 500, color: "#000000" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50"
            style={{ fontSize: "0.8125rem", fontWeight: 700 }}
          >
            {saving ? (
              "Saving..."
            ) : saved ? (
              <>
                <Check size={14} /> Saved
              </>
            ) : (
              <>
                <Save size={14} /> Save Changes
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 rounded-2xl border border-black/[0.06] bg-white"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 800, color: "#000000" }}>Sign Out</h3>
            <p style={{ fontSize: "0.75rem", fontWeight: 400, color: "#000000", marginTop: 2 }}>
              Return to the public website
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000000" }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  );
}
