import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { isLoggedIn } from "./dashboard/dashboardStore";

const navLinks = [
  { label: "Achievements", href: "/achievements" },
  { label: "How We Learn", href: "/learn" },
  { label: "Spiritual", href: "/spiritual" },
  { label: "Community", href: "/community" },
  { label: "Mastery Space", href: "/tools" },
];

export function Navbar({ darkHero = false }: { darkHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedInState] = useState(false);

  useEffect(() => {
    setLoggedInState(isLoggedIn());
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape (supports gesture palm-hold-to-close fallback)
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const handleClick = (link: (typeof navLinks)[0]) => {
    setMobileOpen(false);
    navigate(link.href);
  };

  const isActive = (href: string) => location.pathname === href;

  /* When darkHero is true and user hasn't scrolled, use white text */
  const onDark = darkHero && !scrolled;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          style={{
            fontSize: "20px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: onDark ? "#ffffff" : "#000000",
            transition: "color 0.4s ease",
          }}
        >
          AHP
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link)}
              className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                isActive(link.href)
                  ? onDark
                    ? "bg-white/15 text-white"
                    : "bg-black/[0.06] text-black"
                  : onDark
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-black/[0.04]"
              }`}
              style={{
                fontSize: "0.8125rem",
                fontWeight: 550,
              }}
            >
              {link.label}
            </button>
          ))}

          {loggedIn ? (
            <button
              onClick={() => navigate("/dashboard")}
              className={`ml-3 px-5 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                onDark
                  ? "bg-white text-black hover:opacity-90"
                  : "bg-black text-white hover:opacity-90"
              }`}
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
              }}
            >
              Dashboard
            </button>
          ) : (
            <div className="flex items-center gap-2 ml-3">
              <button
                onClick={() => navigate("/join?mode=login")}
                className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  onDark
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/[0.04]"
                }`}
                style={{ fontSize: "0.8125rem", fontWeight: 550 }}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/join?mode=join")}
                className={`px-5 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  onDark
                    ? "bg-white text-black hover:opacity-90"
                    : "bg-black text-white hover:opacity-90"
                }`}
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                }}
              >
                Join
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
            onDark
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/[0.04]"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-black/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleClick(link)}
                  className={`text-left px-4 py-3 rounded-xl transition-colors cursor-pointer ${
                    isActive(link.href)
                      ? "text-black bg-black/[0.04]"
                      : "text-black hover:bg-black/[0.03]"
                  }`}
                  style={{ fontSize: "0.9375rem", fontWeight: 550 }}
                >
                  {link.label}
                </button>
              ))}
              {loggedIn ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/dashboard");
                  }}
                  className="mt-2 px-5 py-3 rounded-xl bg-black text-white hover:opacity-90 transition-colors cursor-pointer"
                  style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/join?mode=login");
                    }}
                    className="mt-2 px-5 py-3 rounded-xl border border-black/[0.08] text-black hover:bg-black/[0.03] transition-colors cursor-pointer"
                    style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/join?mode=join");
                    }}
                    className="mt-1 px-5 py-3 rounded-xl bg-black text-white hover:opacity-90 transition-colors cursor-pointer"
                    style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                  >
                    Join
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}