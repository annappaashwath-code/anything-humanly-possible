import heroImg from "figma:asset/06bb678b2095e402d22346f207fbfdfa8dcaef4f.png";
import { HeroOrbOverlay } from "./HeroOrbOverlay";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";

const WORDS = [
  "Imagined.",
  "Built.",
  "Discovered.",
  "Created.",
  "Achieved.",
  "Possible.",
];

export function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const s = sectionRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: -((e.clientY - r.top) / r.height) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const scrollProg = useMotionValue(0);

  useEffect(() => {
    const fn = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      scrollProg.set(Math.min(Math.max(-r.top / (r.height || 1), 0), 1));
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [scrollProg]);

  const textY = useTransform(scrollProg, [0, 0.35], [0, -40]);

  useEffect(() => {
    const t = setInterval(
      () => setWordIdx((p) => (p + 1) % WORDS.length),
      3600
    );
    return () => clearInterval(t);
  }, []);

  const isLast = wordIdx === WORDS.length - 1;

  const scrollNext = () => {
    document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" });
  };

  const k = isMobile ? 0.3 : 1;
  const imgX = mouse.x * -8 * k;
  const imgY = mouse.y * 4 * k;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden bg-white"
      style={{ height: "100dvh", minHeight: 720 }}
      onMouseMove={onMove}
    >
      {/* Image Zone */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "60%" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            ref={heroImgRef}
            src={heroImg}
            alt="Human figure representing limitless potential"
            draggable={false}
            className={`absolute inset-0 w-full select-none will-change-transform ${isMobile ? "h-full" : "h-90%"}`}
            style={{
              objectFit: isMobile ? "contain" : "cover",
              objectPosition: "center bottom",
              transform: isMobile
                ? `scale(2.5) translate(${imgX}px, ${imgY}px)`
                : `scale(1) translate(${imgX}px, ${imgY}px)`,
              transformOrigin: "center bottom",
              transition:
                "transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          />

          {/* Energy orb overlay — pinned to image pixel coordinates */}
          <div
            className="absolute inset-0"
            style={{
              transform: isMobile
                ? `scale(2.5) translate(${imgX}px, ${imgY}px)`
                : `scale(1) translate(${imgX}px, ${imgY}px)`,
              transformOrigin: "center bottom",
              transition:
                "transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            <HeroOrbOverlay
              imgRef={heroImgRef}
              objectFit={isMobile ? "contain" : "cover"}
              objectPosition="center bottom"
            />
          </div>
        </motion.div>

        {/* Bottom fade — dissolves image into white */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
          style={{
            height: "30%",
            background:
              "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,0.5) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* Text Zone */}
      <div
        className="relative z-10 w-full flex flex-col items-center"
        style={{ height: "40%" }}
      >
        <motion.div
          className="w-full h-full flex flex-col items-center justify-center text-center px-6 md:px-10"
          style={{
            paddingTop: isMobile ? 180 : 140,
            y: textY,
          }}
        >
          {/* Tag */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.25 }}
            className="tracking-[0.3em] uppercase mb-5 md:mb-6"
            style={{
              fontSize: "0.62rem",
              fontWeight: 600,
              color: "#000000",
            }}
          >
            The Future of Human Potential
          </motion.span>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.6,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center"
          >
            <h1
              style={{
                fontSize: "clamp(2.1rem, 5vw, 3.8rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                color: "#000000",
              }}
            >
              Anything Humanly
            </h1>

            {/* Word flip */}
            <div
              className="relative overflow-hidden mt-0.5"
              style={{ height: "clamp(2.8rem, 5.5vw, 5rem)" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-110%", opacity: 0, filter: "blur(6px)" }}
                  transition={{
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block text-center"
                  style={{
                    fontSize: "clamp(2.1rem, 5vw, 3.875rem)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: "-0.035em",
                    color: isLast ? "#D4A017" : "#000000",
                    transition: "color 0.7s ease",
                  }}
                >
                  {WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="max-w-sm mb-6 pt-2"
            style={{
              fontSize: "clamp(0.85rem, 1.4vw, 0.98rem)",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#000000",
            }}
          >
            A celebration of the extraordinary capacity
            <br className="hidden sm:block" /> within ordinary people.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <button
              onClick={() => navigate("/join")}
              className="px-8 py-3 rounded-full hover:opacity-90 active:scale-[0.97] transition-all duration-300 cursor-pointer"
              style={{
                fontSize: "0.82rem",
                fontWeight: 650,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
                background: "#000000",
              }}
            >
              Begin Your Journey
            </button>
            <button
              onClick={scrollNext}
              className="px-7 py-3 rounded-full transition-all duration-300 cursor-pointer hover:bg-black hover:text-white"
              style={{
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "#000000",
                border: "1px solid #000000",
                background: "transparent",
              }}
            >
              Explore Below
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollNext}
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 cursor-pointer bg-transparent"
        >
          <span
            className="tracking-[0.4em] uppercase"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#000000",
            }}
          >Scroll</span>
          <ChevronDown size={12} style={{ color: "#000000" }} />
        </motion.button>
      </motion.div>
    </section>
  );
}