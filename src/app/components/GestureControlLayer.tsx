import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Video,
  VideoOff,
  Hand,
  X,
  Mouse,
  ArrowUpToLine,
  ArrowDownFromLine,
  ArrowLeftRight,
  Pointer,
  Grab,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────

interface Pt { x: number; y: number; z: number }

type GestureState =
  | "idle"
  | "pointing"
  | "pinching"
  | "come-here"
  | "go-forward"
  | "swiping-left"
  | "swiping-right"
  | "open-palm"
  | "calibrating"
  | "no-hand";

type ControlMode = "camera" | "mouse";
type DirLock = "none" | "vertical" | "horizontal";

/** Three discrete hand-shape classifications */
type HandShape = "fist" | "half-open" | "full-open" | "pointing" | "unknown";

export interface GestureCallbacks {
  onScrollVertical: (delta: number) => void;
  /** @param hitX optional screen X of the gesture origin (palm center) for carousel hit-test */
  onScrollHorizontal: (delta: number, hitX?: number, hitY?: number) => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSelect: () => void;
  onPinch: () => void;
  onClose: () => void;
  onPointerMove: (x: number, y: number) => void;
  /** Must return true when a modal/popup is currently open */
  isModalOpen: () => boolean;
}

/** Debug info exposed to UI for gesture diagnostics */
interface DebugInfo {
  handShape: HandShape;
  carouselZone: boolean;
  swipeActive: boolean;
  swipeDir: string;
  pointing: boolean;
  cardTarget: string;
  holdPct: number;
  status: string;
}

// ─── Math helpers ────────────────────────────────────────────

function d2(a: Pt, b: Pt) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function fingerUp(tip: Pt, pip: Pt): boolean {
  return tip.y < pip.y - 0.025;
}

/** Average distance from wrist to all four fingertips (excl. thumb).
 *  High = fingers extended (open hand), Low = fingers curled (fist).
 *  Used for palm open/close vertical scroll. */
function palmOpenness(lm: Pt[]): number {
  const w = lm[0];
  return (d2(w, lm[8]) + d2(w, lm[12]) + d2(w, lm[16]) + d2(w, lm[20])) / 4;
}

/** Simple exponential-moving-average filter for a single landmark */
function emaPoint(prev: Pt, raw: Pt, alpha: number): Pt {
  return {
    x: prev.x + (raw.x - prev.x) * alpha,
    y: prev.y + (raw.y - prev.y) * alpha,
    z: prev.z + (raw.z - prev.z) * alpha,
  };
}

// ─── One Euro Filter ─────────────────────────────────────────
// Adaptive low-pass: smooth at rest, responsive in motion.
// Reference: Casiez et al., "1€ Filter", CHI 2012

class LowPassFilter {
  private y = 0;
  private s = 0;
  private initialized = false;

  filter(value: number, alpha: number): number {
    if (!this.initialized) {
      this.y = value;
      this.s = value;
      this.initialized = true;
      return value;
    }
    this.y = value;
    this.s = alpha * value + (1 - alpha) * this.s;
    return this.s;
  }

  lastValue(): number { return this.s; }
  hasLastValue(): boolean { return this.initialized; }

  reset() {
    this.initialized = false;
    this.y = 0;
    this.s = 0;
  }
}

function smoothingAlpha(rate: number, cutoff: number): number {
  const tau = 1.0 / (2 * Math.PI * cutoff);
  const te = 1.0 / rate;
  return 1.0 / (1.0 + tau / te);
}

class OneEuroFilter {
  private freq: number;
  private minCutoff: number;
  private beta: number;
  private dCutoff: number;
  private xFilter = new LowPassFilter();
  private dxFilter = new LowPassFilter();
  private lastTime = 0;

  /**
   * @param freq     Expected sample rate (Hz), e.g. 30
   * @param minCutoff  Min cutoff freq — lower = more smoothing at rest (0.5–1.5)
   * @param beta       Speed coefficient — higher = more responsive in motion (0.3–1.0)
   * @param dCutoff    Derivative cutoff freq (1.0 is standard)
   */
  constructor(freq = 30, minCutoff = 1.0, beta = 0.5, dCutoff = 1.0) {
    this.freq = freq;
    this.minCutoff = minCutoff;
    this.beta = beta;
    this.dCutoff = dCutoff;
  }

  filter(value: number, timestamp?: number): number {
    const now = timestamp ?? Date.now() / 1000;
    if (this.lastTime > 0 && now > this.lastTime) {
      this.freq = 1.0 / (now - this.lastTime);
    }
    this.lastTime = now;

    // Estimate derivative (speed) of the signal
    const dAlpha = smoothingAlpha(this.freq, this.dCutoff);
    const prevFiltered = this.xFilter.hasLastValue() ? this.xFilter.lastValue() : value;
    const dx = (value - prevFiltered) * this.freq;
    const edx = this.dxFilter.filter(dx, dAlpha);

    // Adaptive cutoff: higher speed → higher cutoff → less smoothing
    const cutoff = this.minCutoff + this.beta * Math.abs(edx);
    const alpha = smoothingAlpha(this.freq, cutoff);

    return this.xFilter.filter(value, alpha);
  }

  reset() {
    this.xFilter.reset();
    this.dxFilter.reset();
    this.lastTime = 0;
  }
}

// ─── Load MediaPipe ──────────────────────────────────────────

let mpLoaded = false;
let mpPromise: Promise<void> | null = null;

function loadMediaPipe(): Promise<void> {
  if (mpLoaded) return Promise.resolve();
  if (mpPromise) return mpPromise;
  mpPromise = new Promise<void>((resolve, reject) => {
    const urls = [
      "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
    ];
    let done = 0;
    urls.forEach((u) => {
      const s = document.createElement("script");
      s.src = u;
      s.crossOrigin = "anonymous";
      s.onload = () => { done++; if (done === urls.length) { mpLoaded = true; resolve(); } };
      s.onerror = () => reject(new Error(`Failed: ${u}`));
      document.head.appendChild(s);
    });
  });
  return mpPromise;
}

// ─── Pointer Dot ─────────────────────────────────────────────

function GesturePointer({ ptrRef, gestureRef, holdProgressRef }: {
  ptrRef: React.RefObject<{ x: number; y: number }>;
  gestureRef: React.RefObject<GestureState>;
  holdProgressRef: React.RefObject<number>;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGCircleElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      const ptr = ptrRef.current!;
      const gesture = gestureRef.current!;
      const holdProgress = holdProgressRef.current!;
      const dot = dotRef.current;
      if (!dot) { rafRef.current = requestAnimationFrame(tick); return; }

      if (gesture === "no-hand" || gesture === "calibrating" || ptr.x < 0) {
        dot.style.display = "none";
      } else {
        dot.style.display = "block";
        const pointing = gesture === "pointing";
        const sz = pointing ? 22 : 12;
        const col = pointing ? "#D4A017" : "#000";
        dot.style.left = `${ptr.x - sz / 2}px`;
        dot.style.top = `${ptr.y - sz / 2}px`;
        dot.style.width = `${sz}px`;
        dot.style.height = `${sz}px`;
        dot.style.backgroundColor = col;
        dot.style.borderColor = col;
        dot.style.opacity = gesture === "idle" ? "0.4" : "1";

        // SVG ring
        if (svgRef.current) {
          if (pointing && holdProgress > 0) {
            svgRef.current.parentElement!.style.display = "block";
            svgRef.current.setAttribute("stroke-dasharray", `${holdProgress * 100.5} 100.5`);
          } else {
            svgRef.current.parentElement!.style.display = "none";
          }
        }
        // Pulse ring
        if (pulseRef.current) {
          pulseRef.current.style.display = pointing ? "block" : "none";
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ptrRef, gestureRef, holdProgressRef]);

  return (
    <div
      ref={dotRef}
      className="fixed pointer-events-none z-[9990]"
      style={{
        borderRadius: "50%",
        border: "2px solid #000",
        transition: "width 0.1s, height 0.1s, background-color 0.1s",
        display: "none",
      }}
    >
      {/* Hold-to-select ring progress */}
      <svg
        className="absolute pointer-events-none"
        width={38} height={38}
        style={{ left: -8, top: -8, display: "none" }}
        viewBox="0 0 38 38"
      >
        <circle
          ref={svgRef}
          cx="19" cy="19" r="16"
          fill="none"
          stroke="#D4A017"
          strokeWidth="2.5"
          strokeDasharray="0 100.5"
          strokeLinecap="round"
          transform="rotate(-90 19 19)"
          opacity={0.8}
        />
      </svg>
      <div
        ref={pulseRef}
        className="absolute inset-[-7px] rounded-full"
        style={{
          border: "2px solid #D4A017",
          animation: "gesturePointerPulse 1.5s ease-in-out infinite",
          display: "none",
        }}
      />
      <style>{`
        @keyframes gesturePointerPulse {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Status Label ────────────────────────────────────────────

const gestureLabels: Record<GestureState, string> = {
  idle: "Tracking stable",
  pointing: "Holding — selecting…",
  pinching: "Pinching — zooming…",
  "come-here": "Scrolling up",
  "go-forward": "Scrolling down",
  "swiping-left": "Swiping → carousel",
  "swiping-right": "← Swiping carousel",
  "open-palm": "Closing…",
  calibrating: "Calibrating — hold still…",
  "no-hand": "Hand not detected",
};

function StatusBadge({ gesture }: { gesture: GestureState }) {
  const isStable = gesture === "idle";
  return (
    <motion.div
      key={gesture}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex items-center gap-1.5"
    >
      {isStable ? (
        <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
      ) : gesture === "no-hand" ? (
        <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
      ) : (
        <Hand size={11} className="text-black flex-shrink-0" />
      )}
      <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#000" }}>
        {gestureLabels[gesture]}
      </span>
    </motion.div>
  );
}

// ─── Guide ───────────────────────────────────────────────────

const guideItems = [
  { Icon: Grab, label: "Close fist", desc: "scroll down", color: "#3b82f6" },
  { Icon: Hand, label: "Half-open palm", desc: "scroll up", color: "#3b82f6" },
  { Icon: ArrowLeftRight, label: "Open palm swipe", desc: "scroll carousel", color: "#3b82f6" },
  { Icon: Pointer, label: "Point & hold", desc: "select card", color: "#D4A017" },
  { Icon: Hand, label: "Open palm hold", desc: "close popup", color: "#000" },
];

function GuideRow({ item }: { item: (typeof guideItems)[number] }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${item.color}08`, border: `1px solid ${item.color}18` }}
      >
        <item.Icon size={12} style={{ color: item.color }} strokeWidth={2.2} />
      </div>
      <div className="flex items-baseline gap-1 min-w-0">
        <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "#000", whiteSpace: "nowrap" }}>{item.label}</span>
        <span style={{ fontSize: "0.5625rem", fontWeight: 400, color: "#64748b", whiteSpace: "nowrap" }}>{item.desc}</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// ─── Main Component ─────────────────────────────────────────
// ═════════════════════════════════════════════════════════════

/** Hook to detect mobile viewport */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

export function GestureControlLayer({ callbacks }: { callbacks: GestureCallbacks }) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gestureDisplay, setGestureDisplay] = useState<GestureState>("idle");
  const [dismissed, setDismissed] = useState(false);
  const [mode, setMode] = useState<ControlMode>("camera");
  const [noCam, setNoCam] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false); // mobile bottom sheet visibility
  const isMobile = useIsMobile();

  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null); // mobile sheet preview mirror
  const streamRef = useRef<MediaStream | null>(null);
  const handsRef = useRef<any>(null);
  const camRef = useRef<any>(null);

  const cbRef = useRef(callbacks);
  cbRef.current = callbacks;

  // ── Refs for pointer (no setState, use RAF-driven DOM updates)
  const ptrRef = useRef({ x: -100, y: -100 });
  const gestureRef = useRef<GestureState>("idle");
  const holdProgressRef = useRef(0);

  // Helper to update gesture in both ref (for pointer dot) and state (for UI badge)
  const setGesture = useCallback((g: GestureState) => {
    gestureRef.current = g;
    setGestureDisplay(g);
  }, []);

  // ── Smoothed landmarks (EMA-filtered, 21 points)
  const smoothedLm = useRef<Pt[] | null>(null);

  // ─ Calibration
  const enabledAt = useRef(0);
  const CALIBRATION_MS = 2000;
  const calibrationBaseline = useRef<{
    wristY: number;
    handScale: number;
    baseOpenness: number; // baseline palm openness for vertical scroll
  } | null>(null);

  // ── Pointer smoothing: OneEuroFilter (adaptive — jitter-free at rest, responsive in motion)
  // minCutoff=0.8 for good static smoothing, beta=0.6 for responsive movement, freq=30 typical webcam
  const ptrFilterX = useRef(new OneEuroFilter(30, 0.8, 0.6, 1.0));
  const ptrFilterY = useRef(new OneEuroFilter(30, 0.8, 0.6, 1.0));

  // ── Wrist smoothing for velocity: OneEuroFilter (more aggressive smoothing)
  const wristFilterX = useRef(new OneEuroFilter(30, 0.5, 0.3, 1.0));
  const wristFilterY = useRef(new OneEuroFilter(30, 0.5, 0.3, 1.0));

  // ── Palm open/close vertical scroll (joystick model)
  // Measures fingertip spread relative to calibration baseline.
  // Closing hand (below baseline) → scroll DOWN, opening (above) → scroll UP.
  const opennessFilter = useRef(new OneEuroFilter(30, 0.35, 0.25, 1.0));
  const scrollStartTime = useRef(0); // when continuous scrolling began (for ramp-up)
  const isScrolling = useRef(false);
  const lastScrollEndTime = useRef(0); // cooldown after scroll gesture ends
  const prevFilteredOpenness = useRef<number | null>(null); // for transition detection

  // ── Pinch gesture (thumb + index tip close together)
  const pinchStartTime = useRef(0);
  const pinchTriggered = useRef(false);

  // ── Velocity tracking (kept for pointing stability)
  const wristYHist = useRef<{ y: number; t: number }[]>([]);
  const wristXHist = useRef<{ x: number; t: number }[]>([]);
  const smoothVelocityY = useRef(0);
  const smoothVelocityX = useRef(0);

  // ── Horizontal carousel swipe (position-delta controller)
  // Dedicated responsive OneEuroFilter for swipe (higher beta = faster response to movement)
  // Separate from wristFilter which is tuned for pointing stability.
  const swipeWristFilterX = useRef(new OneEuroFilter(30, 1.5, 1.0, 1.0));
  const swipeWristFilterY = useRef(new OneEuroFilter(30, 1.5, 1.0, 1.0));
  const swipeAnchorX = useRef<number | null>(null);    // screen X when tracking started
  const swipeAnchorY = useRef<number | null>(null);    // screen Y when tracking started (vertical rejection)
  const swipeAnchorT = useRef(0);                      // time when anchor was set
  const swipePrevX = useRef<number | null>(null);      // previous frame's screen X (for scroll delta)
  const swipeLocked = useRef(false);                   // in horizontal scroll mode
  const swipeLastMoveT = useRef(0);                    // last time significant scroll output occurred
  const swipeCooldownUntil = useRef(0);                // absolute time (ms)
  const swipeNonFullCount = useRef(0);                 // hysteresis: consecutive non-full-open frames while locked

  // ── Direction lock
  const dirLock = useRef<DirLock>("none");
  const dirLockTime = useRef(0);

  // ── Point-to-select
  const pointStartTime = useRef(0);
  const pointTriggered = useRef(false);
  const pointAnchor = useRef({ x: 0, y: 0 }); // pointer position when hold started

  // ── Open palm hold
  const palmOpenStart = useRef(0);
  const palmCloseTriggered = useRef(false);
  const lastCloseTime = useRef(0);

  // ── No-hand counter
  const noHandCount = useRef(0);

  // ── General cooldowns
  const lastActionTime = useRef(0);
  const ACTION_COOLDOWN = 400;

  // ── Gesture timeout to reset to idle
  const gestureTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Debug info (updated each frame, read by RAF-driven debug display)
  const debugRef = useRef<DebugInfo>({
    handShape: "unknown",
    carouselZone: false,
    swipeActive: false,
    swipeDir: "",
    pointing: false,
    cardTarget: "",
    holdPct: 0,
    status: "",
  });
  const [debugDisplay, setDebugDisplay] = useState<DebugInfo | null>(null);
  const debugTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mouse mode refs
  const mHist = useRef<{ x: number; y: number; t: number }[]>([]);
  const mLastSwipe = useRef(0);
  const mDown = useRef(false);

  // ─── Carousel hit-test ─────────────────────────────────────
  const inCarousel = useCallback((px: number, py: number): boolean => {
    const el = document.elementFromPoint(px, py);
    if (!el) return false;
    let n: HTMLElement | null = el as HTMLElement;
    for (let i = 0; i < 12 && n; i++) {
      // Check Tailwind classes
      if (n.classList?.contains("overflow-x-auto") || n.classList?.contains("overflow-x-scroll")) {
        if (n.scrollWidth > n.clientWidth + 4) return true;
      }
      // Fallback: check computed overflow style (handles Tailwind v4 compiled CSS)
      try {
        const cs = getComputedStyle(n);
        if (cs.overflowX === "auto" || cs.overflowX === "scroll") {
          if (n.scrollWidth > n.clientWidth + 4) return true;
        }
      } catch { /* ignore detached elements */ }
      n = n.parentElement;
    }
    return false;
  }, []);

  // ─── Schedule idle reset ───────────────────────────────────
  const scheduleIdle = useCallback((ms: number) => {
    if (gestureTimeoutRef.current) clearTimeout(gestureTimeoutRef.current);
    gestureTimeoutRef.current = setTimeout(() => setGesture("idle"), ms);
  }, [setGesture]);

  // ─── Reset direction lock when movement stops ──────────────
  const resetDirLock = useCallback(() => {
    dirLock.current = "none";
    dirLockTime.current = 0;
  }, []);

  // ═══════════════════════════════════════════════════════════
  // ─── Process MediaPipe Results (core detection) ───────────
  // ═══════════════════════════════════════════════════════════

  const processResults = useCallback((results: any) => {
    const now = Date.now();

    // ── No hand detected
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      noHandCount.current++;
      if (noHandCount.current > 15) {
        setGesture("no-hand");
        smoothedLm.current = null;
        wristYHist.current = [];
        wristXHist.current = [];
        smoothVelocityY.current = 0;
        smoothVelocityX.current = 0;
        pointStartTime.current = 0;
        palmOpenStart.current = 0;
        holdProgressRef.current = 0;
        isScrolling.current = false;
        prevFilteredOpenness.current = null;
        pinchStartTime.current = 0;
        pinchTriggered.current = false;
        swipeLocked.current = false;
        swipeAnchorX.current = null;
        swipeAnchorY.current = null;
        swipePrevX.current = null;
        swipeLastMoveT.current = 0;
        resetDirLock();
        // Reset filters so they re-initialize cleanly when hand returns
        ptrFilterX.current.reset();
        ptrFilterY.current.reset();
        wristFilterX.current.reset();
        wristFilterY.current.reset();
        opennessFilter.current.reset();
        swipeWristFilterX.current.reset();
        swipeWristFilterY.current.reset();
      }
      return;
    }
    noHandCount.current = 0;

    // ── Calibration phase
    const timeSinceEnable = now - enabledAt.current;
    const isCalibrating = timeSinceEnable < CALIBRATION_MS;

    // ── Raw landmarks → EMA smoothing
    const raw: Pt[] = results.multiHandLandmarks[0];
    const ALPHA = 0.45;
    if (!smoothedLm.current) {
      smoothedLm.current = raw.map(p => ({ ...p }));
    } else {
      smoothedLm.current = smoothedLm.current.map((prev, i) =>
        emaPoint(prev, raw[i], ALPHA)
      );
    }
    const lm = smoothedLm.current;

    const wrist = lm[0];
    const indexTip = lm[8];  const indexPip = lm[6]; const indexMcp = lm[5];
    const middleTip = lm[12]; const middlePip = lm[10];
    const ringTip = lm[16];   const ringPip = lm[14];
    const pinkyTip = lm[20];  const pinkyPip = lm[18];
    const middleMcp = lm[9]; // palm center reference

    // ── Pointer position: OneEuroFilter (adaptive — jitter-free at rest, responsive in motion)
    const rawPx = (1 - indexTip.x) * window.innerWidth;
    const rawPy = indexTip.y * window.innerHeight;
    const tSec = now / 1000; // OneEuroFilter expects seconds
    const curX = ptrFilterX.current.filter(rawPx, tSec);
    const curY = ptrFilterY.current.filter(rawPy, tSec);

    // ── Wrist position (filtered for stable velocity calculation)
    const filteredWristX = wristFilterX.current.filter(wrist.x, tSec);
    const filteredWristY = wristFilterY.current.filter(wrist.y, tSec);

    // ── Wrist-based screen position for carousel hit-test (more stable than index tip during non-pointing)
    const wristScreenX = (1 - filteredWristX) * window.innerWidth;
    const wristScreenY = filteredWristY * window.innerHeight;

    // ── Palm center: midpoint of wrist and middle finger MCP (landmark 9)
    //    More accurate for carousel hit-test than wrist alone, since wrist
    //    maps too low on screen when holding hand up with open palm.
    const palmCenterX = (1 - (filteredWristX + middleMcp.x) / 2) * window.innerWidth;
    const palmCenterY = ((filteredWristY + middleMcp.y) / 2) * window.innerHeight;

    // Update pointer ref (no setState — read by RAF-driven pointer dot)
    ptrRef.current = { x: curX, y: curY };
    cbRef.current.onPointerMove(curX, curY);

    // ── Calibration: capture baseline, seed histories, don't act
    if (isCalibrating) {
      setGesture("calibrating");
      wristYHist.current = [{ y: filteredWristY, t: now }];
      wristXHist.current = [{ x: filteredWristX, t: now }];
      // Capture baseline at end of calibration
      if (timeSinceEnable > CALIBRATION_MS - 200) {
        const handScale = d2(wrist, indexMcp);
        calibrationBaseline.current = { wristY: filteredWristY, handScale, baseOpenness: palmOpenness(lm) };
      }
      return;
    }

    // ── Always maintain wrist history using filtered values
    wristYHist.current.push({ y: filteredWristY, t: now });
    wristYHist.current = wristYHist.current.filter(p => now - p.t < 500);
    wristXHist.current.push({ x: filteredWristX, t: now });
    wristXHist.current = wristXHist.current.filter(p => now - p.t < 500);

    // ── Finger state detection (using smoothed landmarks)
    const idxUp = fingerUp(indexTip, indexPip);
    const midUp = fingerUp(middleTip, middlePip);
    const ringUp = fingerUp(ringTip, ringPip);
    const pnkUp = fingerUp(pinkyTip, pinkyPip);
    const allFingersUp = idxUp && midUp && ringUp && pnkUp;
    const onlyIndexUp = idxUp && !midUp && !ringUp && !pnkUp;
    const fingerSpread = d2(indexTip, pinkyTip);

    // ── Confidence gate: check detection confidence ──
    const confidence = results.multiHandedness?.[0]?.score ?? 0;
    const CONFIDENCE_THRESHOLD = 0.6;
    if (confidence < CONFIDENCE_THRESHOLD) {
      setGesture("idle");
      return;
    }

    // ════════════════════════════════════════════════════════
    // HAND SHAPE CLASSIFICATION
    // Three discrete states: FIST / HALF-OPEN / FULL-OPEN / POINTING
    //   FIST:      0 fingers extended
    //   POINTING:  only index finger extended
    //   HALF-OPEN: 1–3 fingers up (not only-index), OR 4 up but low spread
    //   FULL-OPEN: all 4 fingers clearly extended with good spread
    // ════════════════════════════════════════════════════════
    const fingersUpCount = [idxUp, midUp, ringUp, pnkUp].filter(Boolean).length;
    const FULL_OPEN_SPREAD = 0.12; // minimum finger spread for "full open"

    let handShape: HandShape;
    if (fingersUpCount === 0) {
      handShape = "fist";
    } else if (onlyIndexUp) {
      handShape = "pointing";
    } else if (allFingersUp && fingerSpread >= FULL_OPEN_SPREAD) {
      handShape = "full-open";
    } else {
      // 1–3 fingers up (not only-index), or 4 up with low spread
      handShape = "half-open";
    }

    // ── Update debug info (read by UI at 200ms interval) ──
    debugRef.current.handShape = handShape;
    debugRef.current.carouselZone = inCarousel(palmCenterX, palmCenterY);
    debugRef.current.swipeActive = swipeLocked.current;
    if (!swipeLocked.current) debugRef.current.swipeDir = "";
    debugRef.current.pointing = handShape === "pointing";
    debugRef.current.holdPct = Math.round(holdProgressRef.current * 100);

    // ── Check if a modal is currently open ──
    const modalOpen = cbRef.current.isModalOpen();

    // ════════════════════════════════════════════════════════
    // PRIORITY 1 (modal open): FULL-OPEN PALM HOLD → CLOSE
    //   Hold full-open palm for 500ms to close. Cooldown 800ms.
    //   When modal is open, ALL other gestures are blocked.
    // ════════════════════════════════════════════════════════
    if (modalOpen) {
      if (handShape === "full-open") {
        if (palmOpenStart.current === 0) {
          palmOpenStart.current = now;
        }
        const palmHeld = now - palmOpenStart.current;

        if (palmHeld >= 500 && !palmCloseTriggered.current && now - lastCloseTime.current > 800) {
          palmCloseTriggered.current = true;
          lastCloseTime.current = now;
          lastActionTime.current = now;
          setGesture("open-palm");
          cbRef.current.onClose();
          scheduleIdle(600);
        } else if (!palmCloseTriggered.current) {
          if (palmHeld > 150) setGesture("open-palm");
        }
      } else {
        palmOpenStart.current = 0;
        palmCloseTriggered.current = false;
        setGesture("idle");
      }

      // Block everything else while modal is open
      pointStartTime.current = 0;
      pointTriggered.current = false;
      holdProgressRef.current = 0;
      isScrolling.current = false;
      pinchStartTime.current = 0;
      pinchTriggered.current = false;
      swipeLocked.current = false;
      swipeAnchorX.current = null;
      swipeAnchorY.current = null;
      swipePrevX.current = null;
      swipeLastMoveT.current = 0;
      swipeWristFilterX.current.reset();
      swipeWristFilterY.current.reset();
      resetDirLock();
      return;
    }

    // Reset palm-close state when no modal is open
    palmOpenStart.current = 0;
    palmCloseTriggered.current = false;

    // ════════════════════════════════════════════════════════
    // PRIORITY 2 (no modal): POINTING → POINT & HOLD SELECT
    //   700ms hold, stable pointer, 40px drift limit.
    //   Includes sub-check for pinch (thumb+index close).
    // ════════════════════════════════════════════════════════
    if (handShape === "pointing") {
      // Reset non-pointing state
      isScrolling.current = false;
      swipeLocked.current = false;
      swipeAnchorX.current = null;
      swipeAnchorY.current = null;
      swipePrevX.current = null;
      swipeLastMoveT.current = 0;
      swipeWristFilterX.current.reset();
      swipeWristFilterY.current.reset();
      resetDirLock();

      // ── PINCH sub-detection ──
      const thumbTip = lm[4];
      const pinchDist = d2(thumbTip, indexTip);
      const PINCH_THRESHOLD = 0.06;

      if (pinchDist < PINCH_THRESHOLD) {
        if (pinchStartTime.current === 0) pinchStartTime.current = now;
        const pinchHeld = now - pinchStartTime.current;
        if (pinchHeld >= 350 && !pinchTriggered.current && now - lastActionTime.current > ACTION_COOLDOWN) {
          pinchTriggered.current = true;
          lastActionTime.current = now;
          setGesture("pinching");
          cbRef.current.onPinch();
          scheduleIdle(500);
          holdProgressRef.current = 0;
          pointStartTime.current = 0;
          pointTriggered.current = false;
        } else if (pinchHeld > 150) {
          setGesture("pinching");
        }
        return;
      } else {
        pinchStartTime.current = 0;
        pinchTriggered.current = false;
      }

      // ── POINT & HOLD (600–900ms range, using 700ms threshold) ──
      const recentWrist = wristYHist.current.slice(-8);
      let wristMotionY = 0;
      if (recentWrist.length >= 2) {
        wristMotionY = Math.abs(recentWrist[recentWrist.length - 1].y - recentWrist[0].y);
      }
      const recentWristX = wristXHist.current.slice(-8);
      let wristMotionX = 0;
      if (recentWristX.length >= 2) {
        wristMotionX = Math.abs(recentWristX[recentWristX.length - 1].x - recentWristX[0].x);
      }

      const isStable = wristMotionY < 0.028 && wristMotionX < 0.028;

      if (isStable) {
        if (pointStartTime.current === 0) {
          pointStartTime.current = now;
          pointTriggered.current = false;
          pointAnchor.current = { x: curX, y: curY };
        }
        const driftX = Math.abs(curX - pointAnchor.current.x);
        const driftY = Math.abs(curY - pointAnchor.current.y);
        const drifted = driftX > 40 || driftY > 40;

        if (drifted) {
          pointStartTime.current = now;
          pointAnchor.current = { x: curX, y: curY };
          holdProgressRef.current = 0;
        } else {
          const holdDuration = now - pointStartTime.current;
          const HOLD_THRESHOLD = 700;
          const progress = Math.min(1, holdDuration / HOLD_THRESHOLD);
          holdProgressRef.current = progress;

          if (holdDuration > 200) setGesture("pointing");

          if (holdDuration >= HOLD_THRESHOLD && !pointTriggered.current && now - lastActionTime.current > ACTION_COOLDOWN) {
            pointTriggered.current = true;
            lastActionTime.current = now;
            cbRef.current.onSelect();
            holdProgressRef.current = 0;
            pointStartTime.current = 0;
          }
        }
      } else {
        pointStartTime.current = 0;
        pointTriggered.current = false;
        holdProgressRef.current = 0;
      }
      return;
    }

    // Not pointing — reset point state
    pointStartTime.current = 0;
    pointTriggered.current = false;
    holdProgressRef.current = 0;
    pinchStartTime.current = 0;
    pinchTriggered.current = false;

    // Cooldown after any triggered action
    if (now - lastActionTime.current < ACTION_COOLDOWN) {
      setGesture("idle");
      return;
    }

    // ════════════════════════════════════════════════════════
    // PRIORITY 3: FULL-OPEN + inside carousel → HORIZONTAL SWIPE
    //   Position-delta controller using wristScreenX (already OneEuro-filtered).
    //   No second EMA layer — eliminates the 3-4 frame lag that killed responsiveness.
    //
    //   ACTIVATION: Accumulate ≥35px horizontal movement within 300ms,
    //     with horizontal dominant (>1.8× vertical) → lock direction.
    //   SCROLL: Direct position-delta each frame: dx = currentX - prevX.
    //     If |dx| > deadzone → scroll(-dx × scale). Responsive and frame-rate-independent.
    //   DEACTIVATION: Hand leaves full-open for >5 frames, or no significant
    //     movement for 600ms → unlock + 500ms cooldown.
    // ════════════════════════════════════════════════════════
    const insideC = inCarousel(palmCenterX, palmCenterY);

    const SWIPE_ACTIVATE_PX = 35;       // horizontal px to activate swipe
    const SWIPE_ACTIVATE_WINDOW = 300;  // ms window for activation movement
    const SWIPE_H_V_RATIO = 1.8;       // horizontal must exceed vertical × this ratio
    const SWIPE_DEADZONE = 1.5;         // min px delta per frame to produce output
    const SWIPE_SCALE = 1.2;            // position-delta multiplier (1:1.2 hand:scroll)
    const SWIPE_MAX_OUTPUT = 60;        // max px per frame output (prevents jumps)
    const SWIPE_COOLDOWN_MS = 500;      // cooldown after unlock
    const SWIPE_AUTO_UNLOCK_MS = 600;   // unlock if no movement for this long
    const SWIPE_HYSTERESIS = 5;         // frames of non-full-open tolerated while locked

    const canSwipe = handShape === "full-open" && insideC;
    const verticalActive = isScrolling.current || dirLock.current === "vertical";
    const swipeInCooldown = now < swipeCooldownUntil.current;

    // Hysteresis: when swipe is locked, tolerate brief hand-shape flicker
    // Instead of returning early, treat as canSwipe=true so filter+scroll continue
    let effectiveCanSwipe = canSwipe;
    if (swipeLocked.current && !canSwipe) {
      swipeNonFullCount.current++;
      if (swipeNonFullCount.current < SWIPE_HYSTERESIS) {
        effectiveCanSwipe = true; // override — keep processing scroll output
      }
    }
    if (canSwipe) {
      swipeNonFullCount.current = 0;
    }

    // Gate: reset swipe state when conditions fail
    const beyondHysteresis = !effectiveCanSwipe && (!swipeLocked.current || swipeNonFullCount.current >= SWIPE_HYSTERESIS);
    const shouldResetSwipe = beyondHysteresis || verticalActive || swipeInCooldown;

    if (shouldResetSwipe) {
      if (swipeLocked.current) {
        swipeCooldownUntil.current = now + SWIPE_COOLDOWN_MS;
      }
      swipeLocked.current = false;
      swipeNonFullCount.current = 0;
      swipeAnchorX.current = null;
      swipeAnchorY.current = null;
      swipePrevX.current = null;
      swipeLastMoveT.current = 0;
      swipeWristFilterX.current.reset();
      swipeWristFilterY.current.reset();
      if (dirLock.current === "horizontal") resetDirLock();
    } else {
      // ── Responsive swipe filter (dedicated, higher beta than wristFilter) ──
      const swipeWristXFiltered = swipeWristFilterX.current.filter(wrist.x, tSec);
      const swipeWristYFiltered = swipeWristFilterY.current.filter(wrist.y, tSec);
      const sx = (1 - swipeWristXFiltered) * window.innerWidth;
      const sy = swipeWristYFiltered * window.innerHeight;

      if (!swipeLocked.current) {
        // ── ACTIVATION PHASE ──
        if (swipeAnchorX.current === null) {
          // First frame in carousel — plant anchor
          swipeAnchorX.current = sx;
          swipeAnchorY.current = sy;
          swipeAnchorT.current = now;
        } else {
          const dx = Math.abs(sx - swipeAnchorX.current);
          const dy = Math.abs(sy - (swipeAnchorY.current ?? sy));
          const dt = now - swipeAnchorT.current;

          if (dt > SWIPE_ACTIVATE_WINDOW) {
            // Stale — reset anchor to current position
            swipeAnchorX.current = sx;
            swipeAnchorY.current = sy;
            swipeAnchorT.current = now;
          } else if (dx >= SWIPE_ACTIVATE_PX && (dy < 1 || dx > dy * SWIPE_H_V_RATIO)) {
            // Horizontal movement threshold met, dominant over vertical → ACTIVATE
            swipeLocked.current = true;
            dirLock.current = "horizontal";
            dirLockTime.current = now;
            swipePrevX.current = sx;
            swipeLastMoveT.current = now;
          }
        }

        // Don't fall through to vertical scroll while in carousel zone
        if (!swipeLocked.current) {
          setGesture("idle");
        }
      }

      if (swipeLocked.current) {
        // ── SCROLL PHASE — direct position-delta ──
        const prevX = swipePrevX.current ?? sx;
        const dx = sx - prevX;
        const absDx = Math.abs(dx);

        if (absDx > SWIPE_DEADZONE) {
          // Clamp output to prevent jumps from sudden hand movement
          const clampedDx = Math.max(-SWIPE_MAX_OUTPUT, Math.min(SWIPE_MAX_OUTPUT, dx * SWIPE_SCALE));
          // Direction: -dx because screen-X decrease = hand moved physically left = scroll right (positive scrollBy)
          // Pass palmCenter coords for carousel hit-test (index tip is far from palm during full-open)
          cbRef.current.onScrollHorizontal(-Math.round(clampedDx), palmCenterX, palmCenterY);
          setGesture(dx < 0 ? "swiping-left" : "swiping-right");
          debugRef.current.swipeDir = dx < 0 ? "L" : "R";
          swipePrevX.current = sx;
          swipeLastMoveT.current = now;
        } else {
          // No significant movement — check auto-unlock
          if (swipeLastMoveT.current > 0 && now - swipeLastMoveT.current > SWIPE_AUTO_UNLOCK_MS) {
            swipeLocked.current = false;
            swipeNonFullCount.current = 0;
            swipeCooldownUntil.current = now + SWIPE_COOLDOWN_MS;
            swipeAnchorX.current = null;
            swipeAnchorY.current = null;
            swipePrevX.current = null;
            swipeLastMoveT.current = 0;
            swipeWristFilterX.current.reset();
            swipeWristFilterY.current.reset();
            resetDirLock();
            scheduleIdle(200);
          }
        }
      }
      return; // don't fall through to vertical scroll while in carousel zone
    }

    // ════════════════════════════════════════════════════════
    // PRIORITY 4: FIST → scroll DOWN / HALF-OPEN → scroll UP
    //   Discrete state-based vertical scroll.
    //   FIST = continuous scroll down (ramp-up, capped speed).
    //   HALF-OPEN = continuous scroll up (ramp-up, capped speed).
    //   FULL-OPEN (not in carousel) = idle (no scroll).
    // ════════════════════════════════════════════════════════
    const SCROLL_SPEED_MIN = 6;       // px/frame at ramp start
    const SCROLL_SPEED_MAX = 30;      // px/frame at full speed
    const SCROLL_RAMP_MS = 400;       // ramp-up duration
    const SCROLL_END_COOLDOWN = 300;  // cooldown after scroll ends

    // Don't start vertical scroll if horizontal is locked
    if (dirLock.current === "horizontal") {
      setGesture("idle");
      return;
    }

    // Post-scroll cooldown
    if (now - lastScrollEndTime.current < SCROLL_END_COOLDOWN && !isScrolling.current) {
      setGesture("idle");
      return;
    }

    if (handShape === "fist" || handShape === "half-open") {
      // Lock direction to vertical
      if (dirLock.current !== "vertical") {
        dirLock.current = "vertical";
        dirLockTime.current = now;
      }

      // Track scroll start for ramp-up
      if (!isScrolling.current) {
        isScrolling.current = true;
        scrollStartTime.current = now;
      }

      // Ramp-up: smoothly accelerate from min to max speed
      const scrollDuration = now - scrollStartTime.current;
      const rampT = Math.min(1, scrollDuration / SCROLL_RAMP_MS);
      // Ease-in curve for smooth start
      const eased = rampT * rampT;
      const speed = SCROLL_SPEED_MIN + (SCROLL_SPEED_MAX - SCROLL_SPEED_MIN) * eased;

      // FIST → scroll DOWN (positive delta), HALF-OPEN → scroll UP (negative delta)
      const delta = handShape === "fist" ? Math.round(speed) : -Math.round(speed);

      cbRef.current.onScrollVertical(delta);
      setGesture(handShape === "fist" ? "go-forward" : "come-here");
      return;
    }

    // Not fist or half-open → stop scrolling
    if (isScrolling.current) {
      isScrolling.current = false;
      lastScrollEndTime.current = now;
      resetDirLock();
    }

    setGesture("idle");
  }, [inCarousel, scheduleIdle, setGesture, resetDirLock]);

  // ─── Start camera ──────────────────────────────────────────

  const startCamera = useCallback(async () => {
    setLoading(true);
    try {
      await loadMediaPipe();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      const mp = (window as any);
      const hands = new mp.Hands({
        locateFile: (f: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`,
      });
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 0,
        minDetectionConfidence: 0.65,
        minTrackingConfidence: 0.55,
      });
      hands.onResults(processResults);
      handsRef.current = hands;

      const camera = new mp.Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current && handsRef.current) {
            await handsRef.current.send({ image: videoRef.current });
          }
        },
        width: 320,
        height: 240,
      });
      await camera.start();
      camRef.current = camera;

      enabledAt.current = Date.now();
      setMode("camera");
      setEnabled(true);
      setGesture("calibrating");
      // Start debug polling
      if (debugTimerRef.current) clearInterval(debugTimerRef.current);
      debugTimerRef.current = setInterval(() => {
        setDebugDisplay({ ...debugRef.current });
      }, 200);
    } catch (err: any) {
      console.log("Camera unavailable:", err.name);
      setNoCam(true);
      startMouse();
    } finally {
      setLoading(false);
    }
  }, [processResults, setGesture]);

  // ─── Mouse mode ────────────────────────────────────────────

  const startMouse = useCallback(() => {
    setMode("mouse");
    setEnabled(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!enabled || mode !== "mouse") return;
    const onMove = (e: MouseEvent) => {
      ptrRef.current = { x: e.clientX, y: e.clientY };
      if (mDown.current) {
        const now = Date.now();
        mHist.current.push({ x: e.clientX, y: e.clientY, t: now });
        mHist.current = mHist.current.filter(p => now - p.t < 350);
        if (mHist.current.length >= 4 && now - mLastSwipe.current > 480) {
          const f = mHist.current[0], l = mHist.current[mHist.current.length - 1];
          const dx = l.x - f.x, dy = l.y - f.y, dtm = l.t - f.t;
          if (dtm > 50 && dtm < 350 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            const v = dx / dtm;
            if (v > 0.8) {
              setGesture("swiping-left"); cbRef.current.onSwipeRight();
              mLastSwipe.current = now; mHist.current = [];
              scheduleIdle(300);
            } else if (v < -0.8) {
              setGesture("swiping-right"); cbRef.current.onSwipeLeft();
              mLastSwipe.current = now; mHist.current = [];
              scheduleIdle(300);
            }
          }
        }
      }
    };
    const onDown = (e: MouseEvent) => {
      if (e.button === 0) {
        mDown.current = true;
        mHist.current = [{ x: e.clientX, y: e.clientY, t: Date.now() }];
      }
    };
    const onUp = () => { mDown.current = false; mHist.current = []; };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "s" || e.key === "S") {
        setGesture("pointing"); cbRef.current.onSelect(); scheduleIdle(500);
      }
      if (e.key === "ArrowLeft") {
        setGesture("swiping-right"); cbRef.current.onSwipeRight(); scheduleIdle(300);
      }
      if (e.key === "ArrowRight") {
        setGesture("swiping-left"); cbRef.current.onSwipeLeft(); scheduleIdle(300);
      }
      if (e.key === "ArrowUp") cbRef.current.onScrollVertical(-120);
      if (e.key === "ArrowDown") cbRef.current.onScrollVertical(120);
      if (e.key === "Escape") cbRef.current.onClose();
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled, mode, scheduleIdle, setGesture]);

  // ─── Stop all ──────────────────────────────────────────────

  const stopAll = useCallback(() => {
    if (camRef.current) { camRef.current.stop(); camRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (handsRef.current) { handsRef.current.close(); handsRef.current = null; }
    if (gestureTimeoutRef.current) clearTimeout(gestureTimeoutRef.current);
    setEnabled(false);
    setGesture("idle");
    ptrRef.current = { x: -100, y: -100 };
    holdProgressRef.current = 0;
    smoothedLm.current = null;
    wristYHist.current = [];
    wristXHist.current = [];
    smoothVelocityY.current = 0;
    pointStartTime.current = 0;
    palmOpenStart.current = 0;
    noHandCount.current = 0;
    isScrolling.current = false;
    dirLock.current = "none";
    calibrationBaseline.current = null;
    ptrFilterX.current.reset();
    ptrFilterY.current.reset();
    wristFilterX.current.reset();
    wristFilterY.current.reset();
    opennessFilter.current.reset();
    swipeWristFilterX.current.reset();
    swipeWristFilterY.current.reset();
    prevFilteredOpenness.current = null;
    pinchStartTime.current = 0;
    pinchTriggered.current = false;
    lastScrollEndTime.current = 0;
    smoothVelocityX.current = 0;
    swipeLocked.current = false;
    swipeAnchorX.current = null;
    swipeAnchorY.current = null;
    swipePrevX.current = null;
    swipeLastMoveT.current = 0;
    swipeCooldownUntil.current = 0;
    swipeNonFullCount.current = 0;
    mHist.current = [];
    mDown.current = false;
    // Stop debug polling
    if (debugTimerRef.current) clearInterval(debugTimerRef.current);
    setDebugDisplay(null);
  }, [setGesture]);

  // Mirror camera stream to mobile preview video when sheet opens
  useEffect(() => {
    if (isMobile && sheetOpen && enabled && streamRef.current && previewVideoRef.current) {
      previewVideoRef.current.srcObject = streamRef.current;
      previewVideoRef.current.play().catch(() => {});
    }
  }, [isMobile, sheetOpen, enabled]);

  useEffect(() => () => { stopAll(); }, [stopAll]);

  if (dismissed && !enabled) return null;

  // ─── Mobile FAB handler ────────────────────────────────────
  const handleMobileFabTap = () => {
    if (!enabled) {
      setSheetOpen(true);
    } else {
      // Toggle sheet visibility (gesture engine stays running)
      setSheetOpen((prev) => !prev);
    }
  };

  const handleMobileEnable = async () => {
    await startCamera();
    // Keep sheet open briefly to show calibration, then auto-close
    setTimeout(() => setSheetOpen(false), 3000);
  };

  const handleMobileStop = () => {
    stopAll();
    setSheetOpen(false);
  };

  // ─── Render ────────────────────────────────────────────────

  // ═══════════════════════════════════════════════════════════
  // MOBILE LAYOUT
  // ═══════════════════════════════════════════════════════════
  if (isMobile) {
    return (
      <>
        {enabled && mode === "camera" && (
          <GesturePointer ptrRef={ptrRef} gestureRef={gestureRef} holdProgressRef={holdProgressRef} />
        )}

        {/* ── Persistent hidden video for camera processing ── */}
        {mode === "camera" && (
          <video
            ref={videoRef}
            playsInline
            muted
            className="fixed pointer-events-none"
            style={{
              width: 1,
              height: 1,
              opacity: 0,
              position: "fixed",
              top: -100,
              left: -100,
              pointerEvents: "none",
            }}
            data-gesture-ui="true"
          />
        )}

        {/* ── Floating Action Button ── */}
        {!dismissed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleMobileFabTap}
            className="fixed bottom-5 left-4 z-[9980] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: enabled ? "#000" : "#fff",
              border: enabled ? "none" : "1px solid #e5e5e5",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            }}
            data-gesture-ui="true"
          >
            <Hand size={16} className={enabled ? "text-white" : "text-[#3b82f6]"} />
            {/* Active indicator dot */}
            {enabled && (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"
              />
            )}
          </motion.button>
        )}

        {/* ── Bottom Sheet Overlay ── */}
        <AnimatePresence>
          {sheetOpen && (
            <>
              {/* Scrim */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[9981] bg-black/20"
                onClick={() => setSheetOpen(false)}
                data-gesture-ui="true"
              />

              {/* Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                className="fixed bottom-0 left-0 right-0 z-[9982] bg-white"
                style={{
                  borderRadius: "16px 16px 0 0",
                  boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
                  maxHeight: "70vh",
                  paddingBottom: "env(safe-area-inset-bottom, 12px)",
                }}
                data-gesture-ui="true"
              >
                {/* Drag handle */}
                <div className="flex justify-center pt-2.5 pb-1">
                  <div className="w-8 h-1 rounded-full bg-neutral-200" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Hand size={14} className="text-[#3b82f6]" />
                    <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000" }}>
                      Gesture Control
                    </span>
                    {enabled && (
                      <div className="flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded-full bg-green-50">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span style={{ fontSize: "0.5625rem", fontWeight: 600, color: "#16a34a" }}>Active</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setSheetOpen(false)}
                    className="w-7 h-7 rounded-full flex items-center justify-center bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    <X size={13} className="text-neutral-500" />
                  </button>
                </div>

                {/* Camera preview (compact) */}
                {mode === "camera" && enabled && (
                  <div className="mx-4 mt-1 rounded-lg overflow-hidden bg-neutral-50 relative" style={{ height: 100 }}>
                    <video
                      ref={previewVideoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      style={{ transform: "scaleX(-1)" }}
                    />
                    <div className="absolute top-1.5 right-1.5">
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-500"
                      />
                    </div>
                    {gestureDisplay === "calibrating" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                        <div className="bg-white/90 rounded-lg px-3 py-1.5 text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-3.5 h-3.5 mx-auto mb-1 border-2 border-neutral-300 border-t-[#3b82f6] rounded-full"
                          />
                          <span style={{ fontSize: "0.625rem", fontWeight: 600, color: "#000" }}>Calibrating…</span>
                        </div>
                      </div>
                    )}
                    {gestureDisplay === "no-hand" && (
                      <div className="absolute bottom-1.5 left-1.5 right-1.5">
                        <div className="bg-black/40 backdrop-blur-sm rounded-md px-2 py-0.5 text-center">
                          <span style={{ fontSize: "0.5625rem", fontWeight: 500, color: "#fff" }}>Show your hand</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Status line */}
                {enabled && (
                  <div className="px-4 py-2">
                    <AnimatePresence mode="wait">
                      <StatusBadge gesture={gestureDisplay} />
                    </AnimatePresence>
                  </div>
                )}

                {/* Compact gesture guide */}
                {enabled && mode === "camera" && (
                  <div className="px-4 pb-1">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                      {guideItems.map((item) => (
                        <div key={item.label} className="flex items-center gap-1.5">
                          <item.Icon size={10} style={{ color: item.color }} strokeWidth={2.2} className="flex-shrink-0" />
                          <span style={{ fontSize: "0.5625rem", fontWeight: 600, color: "#000", whiteSpace: "nowrap" }}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="px-4 py-3 flex gap-2">
                  {!enabled ? (
                    <>
                      <button
                        onClick={handleMobileEnable}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-black text-white active:scale-[0.97] transition-all cursor-pointer disabled:opacity-50"
                        style={{ fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        <Video size={13} />
                        {loading ? "Loading…" : "Start Camera"}
                      </button>
                      <button
                        onClick={() => { setSheetOpen(false); setDismissed(true); }}
                        className="px-4 py-2.5 rounded-xl bg-neutral-100 text-neutral-500 active:bg-neutral-200 transition-all cursor-pointer"
                        style={{ fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        Dismiss
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setSheetOpen(false)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-neutral-100 text-black active:scale-[0.97] transition-all cursor-pointer"
                        style={{ fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        Close
                      </button>
                      <button
                        onClick={handleMobileStop}
                        className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 active:bg-red-100 transition-all cursor-pointer"
                        style={{ fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        <VideoOff size={13} />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // DESKTOP LAYOUT (original)
  // ═══════════════════════════════════════════════════════════
  return (
    <>
      {enabled && mode === "camera" && (
        <GesturePointer ptrRef={ptrRef} gestureRef={gestureRef} holdProgressRef={holdProgressRef} />
      )}

      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-5 z-[9980] w-[276px]"
            data-gesture-ui="true"
          >
            <div
              className="bg-white rounded-2xl overflow-hidden border border-neutral-100"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-50">
                <div className="flex items-center gap-2">
                  <Hand size={13} className="text-[#3b82f6]" />
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#000" }}>
                    Gesture Control
                  </span>
                </div>
                <button
                  onClick={() => { stopAll(); setDismissed(true); }}
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <X size={11} className="text-neutral-400" />
                </button>
              </div>

              {/* Camera preview */}
              {mode === "camera" && (
                <div className="relative mx-4 mt-3 rounded-lg overflow-hidden bg-neutral-50" style={{ aspectRatio: "4/3" }}>
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  {!enabled && !loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
                      <VideoOff size={20} className="text-neutral-300" />
                    </div>
                  )}
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-neutral-200 border-t-[#3b82f6] rounded-full"
                      />
                    </div>
                  )}
                  {enabled && (
                    <div className="absolute top-2 right-2">
                      <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-500"
                      />
                    </div>
                  )}
                  {/* Calibrating overlay */}
                  {gestureDisplay === "calibrating" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                      <div className="bg-white/90 rounded-lg px-4 py-2 text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 mx-auto mb-1.5 border-2 border-neutral-300 border-t-[#3b82f6] rounded-full"
                        />
                        <span style={{ fontSize: "0.625rem", fontWeight: 600, color: "#000" }}>
                          Calibrating…
                        </span>
                        <br />
                        <span style={{ fontSize: "0.5625rem", fontWeight: 400, color: "#64748b" }}>
                          Hold your hand still
                        </span>
                      </div>
                    </div>
                  )}
                  {/* No hand quiet indicator */}
                  {enabled && gestureDisplay === "no-hand" && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black/40 backdrop-blur-sm rounded-md px-2 py-1 text-center">
                        <span style={{ fontSize: "0.5625rem", fontWeight: 500, color: "#fff" }}>
                          Show your hand to the camera
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mouse mode indicator */}
              {mode === "mouse" && enabled && (
                <div className="mx-4 mt-3 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center py-4">
                  <div className="flex flex-col items-center gap-1.5">
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Mouse size={22} className="text-[#3b82f6]" />
                    </motion.div>
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-green-500"
                      />
                      <span style={{ fontSize: "0.625rem", fontWeight: 600, color: "#000" }}>Tracking active</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="px-4 py-2.5">
                {enabled && (
                  <AnimatePresence mode="wait">
                    <StatusBadge gesture={gestureDisplay} />
                  </AnimatePresence>
                )}
                {!enabled && !loading && (
                  <p style={{ fontSize: "0.6875rem", fontWeight: 400, color: "#000", lineHeight: 1.5 }}>
                    {noCam
                      ? "Camera unavailable. Use mouse-gesture mode instead."
                      : "Use natural hand gestures to navigate any page."}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="px-4 pb-3 flex flex-col gap-2">
                {!enabled ? (
                  <>
                    {!noCam && (
                      <button
                        onClick={startCamera}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50"
                        style={{ fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        <Video size={13} />
                        {loading ? "Initializing…" : "Enable Gesture Control"}
                      </button>
                    )}
                    <button
                      onClick={startMouse}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer ${
                        noCam ? "bg-black text-white hover:bg-neutral-800" : "bg-neutral-100 text-black hover:bg-neutral-200"
                      }`}
                      style={{ fontSize: "0.75rem", fontWeight: 600 }}
                    >
                      <Mouse size={13} />
                      {noCam ? "Enable Mouse Gestures" : "Use Mouse Instead"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={stopAll}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-100 text-black hover:bg-neutral-200 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    style={{ fontSize: "0.75rem", fontWeight: 600 }}
                  >
                    <VideoOff size={13} />
                    Disable
                  </button>
                )}
              </div>

              {/* Gesture guide */}
              {enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="border-t border-neutral-50 px-4 py-3"
                >
                  {mode === "camera" ? (
                    <div className="flex flex-col gap-2">
                      {guideItems.map((item) => (
                        <GuideRow key={item.label} item={item} />
                      ))}
                      {/* Live debug indicators */}
                      {debugDisplay && gestureDisplay !== "calibrating" && gestureDisplay !== "no-hand" && (
                        <div className="mt-1.5 pt-1.5 border-t border-neutral-100 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${debugDisplay.handShape === "full-open" ? "bg-green-500" : debugDisplay.handShape === "pointing" ? "bg-[#D4A017]" : "bg-neutral-300"}`} />
                            <span style={{ fontSize: "0.5625rem", fontWeight: 500, color: "#64748b" }}>
                              {debugDisplay.handShape === "full-open" ? "Open palm detected" : debugDisplay.handShape === "pointing" ? "Pointing detected" : `Hand: ${debugDisplay.handShape}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${debugDisplay.carouselZone ? "bg-[#3b82f6]" : "bg-neutral-300"}`} />
                            <span style={{ fontSize: "0.5625rem", fontWeight: 500, color: "#64748b" }}>
                              {debugDisplay.carouselZone ? "Carousel zone active" : "Outside carousel"}
                            </span>
                          </div>
                          {debugDisplay.swipeActive && (
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#3b82f6]" />
                              <span style={{ fontSize: "0.5625rem", fontWeight: 600, color: "#3b82f6" }}>
                                Swipe {debugDisplay.swipeDir === "L" ? "← LEFT" : debugDisplay.swipeDir === "R" ? "RIGHT →" : "L/R"} detected
                              </span>
                            </div>
                          )}
                          {debugDisplay.pointing && debugDisplay.holdPct > 0 && (
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#D4A017]" />
                              <span style={{ fontSize: "0.5625rem", fontWeight: 600, color: "#D4A017" }}>
                                {debugDisplay.holdPct >= 100 ? "Opening modal..." : `Hold progress ${debugDisplay.holdPct}%`}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {[
                        { keys: "← →", label: "Scroll carousel left/right" },
                        { keys: "↑ ↓", label: "Scroll page up/down" },
                        { keys: "Drag", label: "Click & drag to swipe carousel" },
                        { keys: "S", label: "Select centered card" },
                        { keys: "Esc", label: "Close modal" },
                      ].map((g) => (
                        <div key={g.keys} className="flex items-center gap-2">
                          <span
                            className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200"
                            style={{ fontSize: "0.5625rem", fontWeight: 700, color: "#000", minWidth: 28, textAlign: "center" }}
                          >
                            {g.keys}
                          </span>
                          <span style={{ fontSize: "0.5625rem", fontWeight: 500, color: "#000" }}>{g.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}