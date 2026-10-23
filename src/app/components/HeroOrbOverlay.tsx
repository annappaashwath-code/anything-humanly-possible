import { useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────────────
   HeroOrbOverlay – canvas sun-orb pinned to original image
   pixel coordinates.  Scales + repositions on every resize
   using the actual <img> bounding box + object-fit math.

   TUNEABLE KNOBS (all in original-image pixels):
   ─────────────────────────────────────────────────────── */

// Source image natural dimensions
const IMG_W = 1775;
const IMG_H = 695;

// Orb center & radius in source-image pixels
const ORB_CX = 1126;
const ORB_CY = 290;
const ORB_R = 77;

// Canvas oversizing multiplier so the soft aura never clips
const CANVAS_SCALE = 3.3;

// Retina cap
const DPR_CAP = 2;

/* ── TUNE HERE: molecule & spark size clamps (screen px) ── */
const PARTICLE_MIN_PX = 0.8;
const PARTICLE_MAX_PX = 1.5;
const SPARK_MIN_PX = 4;
const SPARK_MAX_PX = 2.2;
const PULSE_SPEED = 2.8;       // molecule opacity beep speed
const SIZE_PULSE_SPEED = 2.2;  // molecule size beep speed

/* ───────────────────────────────────────────────────────── */

interface Props {
  /** Ref to the <img> element we're overlaying */
  imgRef: React.RefObject<HTMLImageElement | null>;
  /** object-fit value used on the image */
  objectFit: "cover" | "contain";
  /** object-position value used on the image, e.g. "center bottom" */
  objectPosition?: string;
}

/**
 * Computes where a source-pixel coordinate lands on-screen
 * given the img element's layout box and its object-fit / object-position.
 */
function mapSourceToDisplay(
  imgEl: HTMLImageElement,
  objectFit: "cover" | "contain",
  objectPosition: string
) {
  const cw = imgEl.clientWidth;
  const ch = imgEl.clientHeight;
  const nw = IMG_W;
  const nh = IMG_H;

  if (cw === 0 || ch === 0) return null;

  // Scale factor
  const sx = cw / nw;
  const sy = ch / nh;
  const scale = objectFit === "cover" ? Math.max(sx, sy) : Math.min(sx, sy);

  const renderedW = nw * scale;
  const renderedH = nh * scale;

  // Parse object-position for offsets (defaults: 50% 50%)
  const parts = objectPosition.split(/\s+/);
  const opx = parsePositionValue(parts[0] ?? "center", cw, renderedW);
  const opy = parsePositionValue(parts[1] ?? "center", ch, renderedH);

  return { scale, offsetX: opx, offsetY: opy };
}

function parsePositionValue(
  val: string,
  containerSize: number,
  renderedSize: number
): number {
  const keywords: Record<string, number> = {
    left: 0,
    top: 0,
    center: 0.5,
    right: 1,
    bottom: 1,
  };
  let fraction = keywords[val];
  if (fraction === undefined) {
    fraction = parseFloat(val) / 100;
    if (isNaN(fraction)) fraction = 0.5;
  }
  return (containerSize - renderedSize) * fraction;
}

/* ─────────────── Particle data (stable across renders) ── */

function makeParticles() {
  return Array.from({ length: 30 }, () => ({
    a: Math.random() * Math.PI * 2,
    r: 0.15 + Math.random() * 0.85,
    s: 0.25 + Math.random() * 0.9,
    p: 0.8 + Math.random() * 2.0,
    tw: Math.random() * Math.PI * 2,
  }));
}

function makeSparks() {
  return Array.from({ length: 10 }, () => ({
    a: Math.random() * Math.PI * 2,
    s: 0.35 + Math.random() * 0.6,
    p: 1.0 + Math.random() * 2.8,
  }));
}

/* ─────────────── Component ──────────────────────────────── */

export function HeroOrbOverlay({
  imgRef,
  objectFit,
  objectPosition = "center bottom",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    W: 0,
    H: 0,
    R: 0,
    particles: makeParticles(),
    sparks: makeSparks(),
  });

  const reposition = useCallback(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const mapping = mapSourceToDisplay(img, objectFit, objectPosition);
    if (!mapping) return;

    const { scale, offsetX, offsetY } = mapping;

    // Where the orb center falls in the <img> element's coordinate space
    const cx = ORB_CX * scale + offsetX;
    const cy = ORB_CY * scale + offsetY;
    const r = ORB_R * scale;

    const size = Math.max(10, Math.round(r * CANVAS_SCALE * 2));

    canvas.style.left = `${cx - size / 2}px`;
    canvas.style.top = `${cy - size / 2}px`;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stateRef.current.W = size;
    stateRef.current.H = size;
    stateRef.current.R = size / (CANVAS_SCALE * 2);
  }, [imgRef, objectFit, objectPosition]);

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    let raf = 0;
    let cancelled = false;
    const start = performance.now();
    const st = stateRef.current;

    /* ── helper ── */
    function softGrad(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      stops: [number, string][]
    ) {
      const g = ctx.createRadialGradient(cx, cy, r * 0.08, cx, cy, r);
      for (const [offset, color] of stops) g.addColorStop(offset, color);
      return g;
    }

    /* ── draw loop ── */
    function draw(t: number) {
      if (cancelled) return;
      const ctx = canvas!.getContext("2d");
      if (!ctx || st.W === 0) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const W = st.W;
      const H = st.H;
      const R = st.R;
      const cx = W / 2;
      const cy = H / 2;
      const time = (t - start) / 1000;

      const pulse = 1 + 0.028 * Math.sin(time * 1.9);
      const breathe = 1 + 0.016 * Math.sin(time * 0.9);

      ctx.clearRect(0, 0, W, H);

      // ── BIG AURA (fades to 0 well before edge) ──
      const auraR = R * 3.3 * pulse;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = softGrad(ctx, cx, cy, auraR, [
        [0.0, "rgba(255,250,220,0.18)"],
        [0.18, "rgba(255,215,120,0.16)"],
        [0.42, "rgba(255,170,60,0.10)"],
        [0.7, "rgba(255,140,40,0.04)"],
        [1.0, "rgba(255,140,40,0.00)"],
      ]);
      ctx.beginPath();
      ctx.arc(cx, cy, auraR, 0, Math.PI * 2);
      ctx.fill();

      // ── CORE SPHERE ──
      const coreR = R * breathe;
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = softGrad(
        ctx,
        cx - coreR * 0.18,
        cy - coreR * 0.22,
        coreR,
        [
          [0.0, "rgba(255,255,245,0.92)"],
          [0.28, "rgba(255,245,190,0.78)"],
          [0.55, "rgba(255,220,120,0.62)"],
          [1.0, "rgba(255,180,60,0.48)"],
        ]
      );
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // ── INNER HOTSPOT (sun core) ──
      ctx.fillStyle = softGrad(
        ctx,
        cx + coreR * 0.06,
        cy + coreR * 0.08,
        coreR * 0.62,
        [
          [0.0, "rgba(255,255,255,0.50)"],
          [0.45, "rgba(255,255,235,0.22)"],
          [1.0, "rgba(255,255,235,0.00)"],
        ]
      );
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 0.62, 0, Math.PI * 2);
      ctx.fill();

      // ── INTERNAL VORTEX LINES ──
      ctx.globalCompositeOperation = "screen";
      ctx.lineWidth = Math.max(1, R * 0.012);
      ctx.strokeStyle = "rgba(255,255,240,0.14)";
      for (let k = 0; k < 6; k++) {
        const rot = time * 0.55 + k * 1.1;
        ctx.beginPath();
        for (let i = 0; i < 160; i++) {
          const p = i / 160;
          const ang = p * Math.PI * 2 + rot;
          const rr = R * 0.14 + p * (R * 0.86);
          const wob = Math.sin(p * 9 + rot * 1.6) * (R * 0.045);
          const x = cx + (rr + wob) * Math.cos(ang);
          const y = cy + (rr + wob) * Math.sin(ang);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // ── PARTICLES INSIDE ──
      ctx.globalCompositeOperation = "source-over";
      for (const pt of st.particles) {
        const ang = pt.a + time * pt.s;
        const rr =
          R * (0.18 + pt.r * 0.78) +
          Math.sin(time * 1.1 + pt.tw) * (R * 0.03);
        const x = cx + rr * Math.cos(ang);
        const y = cy + rr * Math.sin(ang);

        // Clamped radius (never chunky on mobile)
        const rawR = Math.max(PARTICLE_MIN_PX, Math.min(PARTICLE_MAX_PX, pt.p));
        // Gentle beep size pulse (slightly out of phase per particle)
        const sizeR = rawR * (0.92 + 0.08 * Math.sin(time * SIZE_PULSE_SPEED + pt.tw));
        // Gentle beep opacity pulse
        const opacityMul = 0.85 + 0.15 * Math.sin(time * PULSE_SPEED + pt.tw);

        // Tiny glow halo around each molecule
        const glowR = sizeR * 3;
        const glow = ctx.createRadialGradient(x, y, sizeR * 0.3, x, y, glowR);
        glow.addColorStop(0, `rgba(255,255,245,${(0.35 * opacityMul).toFixed(3)})`);
        glow.addColorStop(0.45, `rgba(255,210,120,${(0.14 * opacityMul).toFixed(3)})`);
        glow.addColorStop(1, "rgba(255,180,70,0.00)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Solid molecule dot
        ctx.fillStyle = `rgba(255,255,245,${(0.55 * opacityMul).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, sizeR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── OUTER MICRO SPARKS ──
      for (const sp of st.sparks) {
        const ang = sp.a + time * sp.s;
        const rr = R * (1.05 + 0.05 * Math.sin(time * 1.5 + sp.a));
        const x = cx + rr * Math.cos(ang);
        const y = cy + rr * Math.sin(ang);

        const sparkR = Math.max(SPARK_MIN_PX, Math.min(SPARK_MAX_PX, sp.p));
        const sparkOpacity = 0.85 + 0.15 * Math.sin(time * PULSE_SPEED * 0.8 + sp.a);

        // Tiny spark glow
        const sparkGlowR = sparkR * 2.5;
        const sg = ctx.createRadialGradient(x, y, sparkR * 0.2, x, y, sparkGlowR);
        sg.addColorStop(0, `rgba(255,255,255,${(0.22 * sparkOpacity).toFixed(3)})`);
        sg.addColorStop(0.5, `rgba(255,230,180,${(0.08 * sparkOpacity).toFixed(3)})`);
        sg.addColorStop(1, "rgba(255,200,100,0.00)");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(x, y, sparkGlowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${(0.22 * sparkOpacity).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, sparkR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── SPECULAR GLINT ──
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = "rgba(255,255,255,0.10)";
      ctx.beginPath();
      ctx.arc(cx - R * 0.34, cy - R * 0.44, R * 0.42, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    }

    /* ── size tracking ── */
    reposition();

    const ro = new ResizeObserver(() => reposition());
    ro.observe(img);
    window.addEventListener("resize", reposition, { passive: true });

    /* ── kick off animation ── */
    raf = requestAnimationFrame(draw);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", reposition);
    };
  }, [imgRef, reposition]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        pointerEvents: "none",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}