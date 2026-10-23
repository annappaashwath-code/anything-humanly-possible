import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Layers, Loader2 } from "lucide-react";
import { signInWithSupabase, signUpWithSupabase } from "./dashboardStore";

export function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await signUpWithSupabase(name, email, password);
        setLoading(false);
        if (!res.success) {
          setError(res.error || "Sign up failed");
          return;
        }
        if (res.message) {
          setInfoMessage(res.message);
        } else {
          navigate("/dashboard");
        }
      } else {
        const res = await signInWithSupabase(email, password);
        setLoading(false);
        if (!res.success) {
          setError(res.error || "Login failed");
          return;
        }
        navigate("/dashboard");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "An unexpected error occurred");
    }
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
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="Your name"
                required
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
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
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
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#fafafa] outline-none transition-all duration-200 focus:border-black/20 focus:bg-white"
              style={{ fontSize: "0.875rem", fontWeight: 500, color: "#000000" }}
            />
          </div>

          {error && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs">
              {error}
            </motion.p>
          )}

          {infoMessage && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-600 text-xs">
              {infoMessage}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-60"
            style={{ fontSize: "0.875rem", fontWeight: 700 }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : mode === "login" ? (
              <>
                Enter Dashboard
                <ArrowRight size={14} />
              </>
            ) : (
              <>
                Create & Enter
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setInfoMessage("");
            }}
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
      </motion.div>
    </div>
  );
}
