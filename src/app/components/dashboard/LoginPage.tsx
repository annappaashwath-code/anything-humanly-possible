import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { setLoggedIn } from "./dashboardStore";

export function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(name.trim() || "Explorer", email.trim());
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white px-6"
      style={{ fontFamily: "'Inter', 'Onest', sans-serif" }}
    >
      {/* Back to home */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => navigate("/")}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-black/[0.08] hover:border-black/20 transition-all duration-300 cursor-pointer"
      >
        <ArrowLeft size={14} style={{ color: "#000000" }} />
        <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000000" }}>Home</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mx-auto mb-5">
            <Layers size={22} className="text-white" />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.03em", color: "#000000" }}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2" style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#000000" }}>
            {mode === "login"
              ? "Enter your personal growth command center."
              : "Begin your journey with Anything Humanly Possible."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label
                className="block mb-1.5"
                style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000" }}
              >
                Name
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
          )}

          <div>
            <label
              className="block mb-1.5"
              style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#fafafa] outline-none transition-all duration-200 focus:border-black/20 focus:bg-white"
              style={{ fontSize: "0.875rem", fontWeight: 500, color: "#000000" }}
            />
          </div>

          <div>
            <label
              className="block mb-1.5"
              style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000000" }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              minLength={4}
              className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#fafafa] outline-none transition-all duration-200 focus:border-black/20 focus:bg-white"
              style={{ fontSize: "0.875rem", fontWeight: 500, color: "#000000" }}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            style={{ fontSize: "0.875rem", fontWeight: 700 }}
          >
            {mode === "login" ? "Enter Dashboard" : "Create & Enter"}
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Toggle mode */}
        <div className="text-center mt-6">
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="cursor-pointer"
            style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#000000" }}
          >
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <span style={{ fontWeight: 700, color: "#3b82f6" }}>Sign up</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span style={{ fontWeight: 700, color: "#3b82f6" }}>Log in</span>
              </>
            )}
          </button>
        </div>

        {/* Quick access note */}
        <div className="text-center mt-8 pt-6 border-t border-black/[0.06]">
          <p style={{ fontSize: "0.6875rem", fontWeight: 400, color: "#000000", lineHeight: 1.6 }}>
            This is a prototype. Enter any email and password to access your personal dashboard.
            Your progress is saved locally and to the cloud.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
