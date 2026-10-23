// gestureSwipeHorizontal.ts
type Point = { x: number; y: number; z?: number; confidence?: number };

type HorizontalSwipeState = {
  active: boolean;
  locked: boolean;
  lastX: number | null;
  lastT: number | null;
  velX: number;
  accumX: number;
  cooldownUntil: number;
  mode: "idle" | "horizontal";
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/**
 * Simple EMA smoothing to reduce jitter.
 * alpha ~ 0.25–0.35 works well.
 */
export function ema(prev: number | null, next: number, alpha = 0.3) {
  if (prev === null) return next;
  return prev + alpha * (next - prev);
}

export function createHorizontalSwipeController(opts: {
  // screen-space threshold (px) before swipe starts
  startThresholdPx?: number;
  // minimum duration of consistent horizontal movement (ms)
  sustainMs?: number;
  // cooldown after swipe end (ms)
  cooldownMs?: number;
  // max velocity (px/ms)
  maxVel?: number;
}) {
  const startThresholdPx = opts.startThresholdPx ?? 18;
  const sustainMs = opts.sustainMs ?? 180;
  const cooldownMs = opts.cooldownMs ?? 450;
  const maxVel = opts.maxVel ?? 1.6;

  const state: HorizontalSwipeState = {
    active: false,
    locked: false,
    lastX: null,
    lastT: null,
    velX: 0,
    accumX: 0,
    cooldownUntil: 0,
    mode: "idle",
  };

  let smoothX: number | null = null;

  return {
    /** Call on each frame with a tracked fingertip/wrist screen coordinate */
    update(input: {
      point: Point | null;
      now: number;
      // only allow gesture inside carousel area
      inCarouselZone: boolean;
      // block while modal open
      modalOpen: boolean;
      // if vertical scroll is currently locked, ignore horizontal
      verticalLocked: boolean;
    }): { dx: number; mode: "idle" | "horizontal" } {
      const { point, now, inCarouselZone, modalOpen, verticalLocked } = input;

      // hard gates
      if (modalOpen || verticalLocked || !inCarouselZone || now < state.cooldownUntil) {
        // reset tracking but keep cooldown
        state.active = false;
        state.locked = false;
        state.lastX = null;
        state.lastT = null;
        state.velX = 0;
        state.accumX = 0;
        state.mode = "idle";
        smoothX = null;
        return { dx: 0, mode: "idle" };
      }

      if (!point || (point.confidence !== undefined && point.confidence < 0.55)) {
        // no hand = reset (do not trigger)
        state.active = false;
        state.locked = false;
        state.lastX = null;
        state.lastT = null;
        state.velX = 0;
        state.accumX = 0;
        state.mode = "idle";
        smoothX = null;
        return { dx: 0, mode: "idle" };
      }

      // Smooth x
      smoothX = ema(smoothX, point.x, 0.28);

      if (state.lastX === null || state.lastT === null) {
        state.lastX = smoothX;
        state.lastT = now;
        state.mode = "idle";
        return { dx: 0, mode: "idle" };
      }

      const dt = Math.max(1, now - state.lastT); // ms
      const rawDx = smoothX - state.lastX;

      // estimate velocity (px/ms) and clamp
      const vel = clamp(rawDx / dt, -maxVel, maxVel);
      state.velX = vel;

      // accumulate movement to pass threshold
      state.accumX += rawDx;

      // Determine if we should enter horizontal mode
      if (state.mode === "idle") {
        // require a meaningful movement in one direction for sustainMs
        const absAccum = Math.abs(state.accumX);

        if (absAccum >= startThresholdPx) {
          // lock horizontal mode
          state.mode = "horizontal";
          state.locked = true;
          state.active = true;
          // reset accumulation once locked to avoid sudden jump
          state.accumX = 0;
        } else {
          // if user pauses too long, reset accumulation
          if (dt > sustainMs) state.accumX = 0;
        }
      }

      // Once in horizontal mode, output smooth dx for carousel
      let outDx = 0;
      if (state.mode === "horizontal") {
        // small inertia feel: blend velocity into dx
        // scale factor controls responsiveness
        const scale = 24; // px per frame-ish
        outDx = vel * scale;

        // if movement is tiny, treat as stop
        if (Math.abs(outDx) < 0.15) outDx = 0;
      }

      state.lastX = smoothX;
      state.lastT = now;

      return { dx: outDx, mode: state.mode };
    },

    /** Call when swipe gesture ends (hand removed / action complete) */
    end(now: number) {
      state.cooldownUntil = now + cooldownMs;
      state.active = false;
      state.locked = false;
      state.lastX = null;
      state.lastT = null;
      state.velX = 0;
      state.accumX = 0;
      state.mode = "idle";
      smoothX = null;
    },
  };
}