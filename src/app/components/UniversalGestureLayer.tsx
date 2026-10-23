import { useRef, useEffect, useCallback, useMemo } from "react";
import { GestureControlLayer, GestureCallbacks } from "./GestureControlLayer";

/* ════════════════════════════════════════════════════════════════
   UNIVERSAL GESTURE LAYER
   ─────────────────────────────────────────────────────────────
   Wraps GestureControlLayer with DOM-aware callbacks that work
   on every page without page-specific wiring.

   • Vertical scroll   → window.scrollBy (all pages)
   • Horizontal scroll  → scroll nearest overflow-x-auto element
   • Point + hold       → click nearest button/a/cursor-pointer
   • Open palm hold     → close any open modal (click backdrop or Escape)
   • Pointer move       → gold outline on closest clickable element
   ════════════════════════════════════════════════════════════════ */

// ─── Highlight system ────────────────────────────────────────

const HL_CLASS = "gesture-hl-ring";
const HL_STYLE_ID = "gesture-hl-style";

function ensureHighlightCSS() {
  if (document.getElementById(HL_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = HL_STYLE_ID;
  s.textContent = `
    .${HL_CLASS} {
      outline: 2px solid #D4A017 !important;
      outline-offset: 3px !important;
      transition: outline-color 0.2s ease, outline-offset 0.2s ease !important;
    }
  `;
  document.head.appendChild(s);
}

// ─── DOM helpers ─────────────────────────────────────────────

/** Walk up from element at (x,y) to find nearest clickable ancestor */
function findClickable(x: number, y: number): HTMLElement | null {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;
  let n: HTMLElement | null = el as HTMLElement;
  for (let i = 0; i < 14 && n; i++) {
    const tag = n.tagName?.toLowerCase();
    if (tag === "button" || tag === "a") return n;
    if (n.getAttribute("role") === "button") return n;
    if (n.classList?.contains("cursor-pointer")) return n;
    if (tag === "body" || tag === "html") break;
    n = n.parentElement;
  }
  return null;
}

/** Walk up from element at (x,y) to find nearest horizontally-scrollable element */
function findScrollableX(x: number, y: number): HTMLElement | null {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;
  let n: HTMLElement | null = el as HTMLElement;
  for (let i = 0; i < 14 && n; i++) {
    // Check Tailwind classes first
    const hasClass = n.classList?.contains("overflow-x-auto") || n.classList?.contains("overflow-x-scroll");
    // Fallback: check runtime computed style (handles compiled CSS)
    if (!hasClass) {
      const cs = getComputedStyle(n);
      if (cs.overflowX === "auto" || cs.overflowX === "scroll") {
        if (n.scrollWidth > n.clientWidth + 4) return n;
      }
    } else {
      if (n.scrollWidth > n.clientWidth + 4) return n;
    }
    const tag = n.tagName?.toLowerCase();
    if (tag === "body" || tag === "html") break;
    n = n.parentElement;
  }
  return null;
}

/** Detect if any modal/dialog backdrop is visible.
 *  Returns the highest-z-index full-screen fixed overlay, skipping gesture UI.
 *  Checks: role="dialog" parents, then generic fixed full-viewport overlays z >= 40. */
function detectModalBackdrop(): HTMLElement | null {
  let best: HTMLElement | null = null;
  let bestZ = -1;

  // 1) role="dialog" containers — treat their fixed parent as the modal root
  const dialogs = document.querySelectorAll('[role="dialog"]');
  for (const d of dialogs) {
    const htmlD = d as HTMLElement;
    if (htmlD.closest("[data-gesture-ui]")) continue;
    const style = getComputedStyle(htmlD);
    if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) < 0.01) continue;
    const parent = htmlD.parentElement;
    if (parent) {
      const ps = getComputedStyle(parent);
      if (ps.position === "fixed") {
        const z = parseInt(ps.zIndex || "0", 10);
        if (z > bestZ) { best = parent; bestZ = z; }
        continue;
      }
    }
    const z = parseInt(style.zIndex || "0", 10);
    if (z > bestZ) { best = htmlD; bestZ = z; }
  }

  // 2) Generic fixed full-viewport overlays (React / Motion modals)
  const allDivs = document.querySelectorAll("div");
  for (const el of allDivs) {
    const htmlEl = el as HTMLElement;
    if (htmlEl.closest("[data-gesture-ui]")) continue;
    const style = getComputedStyle(htmlEl);
    if (style.position !== "fixed") continue;
    if (style.display === "none" || style.visibility === "hidden") continue;
    if (parseFloat(style.opacity) < 0.01) continue;
    const z = parseInt(style.zIndex || "0", 10);
    if (z < 40) continue;
    const rect = htmlEl.getBoundingClientRect();
    if (rect.width >= window.innerWidth * 0.85 && rect.height >= window.innerHeight * 0.85) {
      if (z > bestZ) { best = htmlEl; bestZ = z; }
    }
  }

  return best;
}

/** Try to close a detected modal container using multiple strategies. */
function closeModal(container: HTMLElement): void {
  // Strategy 1: Find an inner backdrop overlay (absolute/fixed inset-0) with a click handler.
  //   Many modals put onClick on a child <div class="absolute inset-0"> rather than the outer container.
  const innerBackdrops = container.querySelectorAll<HTMLElement>(
    ":scope > div"
  );
  for (const child of innerBackdrops) {
    const cs = getComputedStyle(child);
    // Must cover the container (absolute/fixed + near-full size)
    if (cs.position !== "absolute" && cs.position !== "fixed") continue;
    const r = child.getBoundingClientRect();
    const cr = container.getBoundingClientRect();
    if (r.width >= cr.width * 0.85 && r.height >= cr.height * 0.85) {
      child.click();
      return;
    }
  }

  // Strategy 2: Click the container itself (works for modals with onClick on outer div)
  container.click();

  // Strategy 3 (fallback): If click didn't seem to work, find a close button inside
  //   Look for button[aria-label*="close"], button[aria-label*="Close"], or an X icon button
  setTimeout(() => {
    // Check if the modal is still there after 120ms
    const still = detectModalBackdrop();
    if (!still) return; // Already closed!
    const closeBtn =
      still.querySelector<HTMLElement>('button[aria-label*="close" i]') ||
      still.querySelector<HTMLElement>('button[aria-label*="Close"]');
    if (closeBtn) {
      closeBtn.click();
      return;
    }
    // Final fallback: dispatch Escape key
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true, cancelable: true })
    );
  }, 120);
}

// ─── Helper to find scrollable Y inside a modal ────────────────

function findScrollableYInside(container: HTMLElement): HTMLElement | null {
  // 1) Check for Tailwind classes and inline overflow styles
  const candidates = container.querySelectorAll<HTMLElement>(
    '.overflow-y-auto, .overflow-y-scroll, .overflow-auto, [style*="overflow"]'
  );
  for (const el of candidates) {
    if (el.scrollHeight > el.clientHeight + 4) return el;
  }

  // 2) Fallback: check computed overflow style on all child divs
  const allDivs = container.querySelectorAll<HTMLElement>("div");
  for (const el of allDivs) {
    const cs = getComputedStyle(el);
    if (cs.overflowY === "auto" || cs.overflowY === "scroll") {
      if (el.scrollHeight > el.clientHeight + 4) return el;
    }
  }

  return null;
}

// ─── Helper to dispatch mousedown+mouseup ────────────────────

function dispatchMousedown(target: HTMLElement): void {
  const mousedownEvent = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  target.dispatchEvent(mousedownEvent);

  const mouseupEvent = new MouseEvent("mouseup", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  target.dispatchEvent(mouseupEvent);
}

// ═════════════════════════════════════════════════════════════
// ─── Component ──────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════

export function UniversalGestureLayer() {
  const highlightedRef = useRef<HTMLElement | null>(null);
  const ptrPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    ensureHighlightCSS();
    return () => {
      if (highlightedRef.current) {
        highlightedRef.current.classList.remove(HL_CLASS);
        highlightedRef.current = null;
      }
    };
  }, []);

  const callbacks = useCallback((): GestureCallbacks => ({
    // ── Vertical scroll ──────────────────────────────────
    onScrollVertical: (delta: number) => {
      // If inside a modal that scrolls, scroll the modal content instead
      const backdrop = detectModalBackdrop();
      if (backdrop) {
        // Find scrollable child inside modal (robust: class + inline style + computed style)
        const scrollable = findScrollableYInside(backdrop);
        if (scrollable) {
          scrollable.scrollBy({ top: delta });
          return;
        }
      }
      window.scrollBy({ top: delta, behavior: "auto" });
    },

    // ── Horizontal scroll (carousel) ─────────────────────
    onScrollHorizontal: (delta: number, hitX?: number, hitY?: number) => {
      // Use palm-center coords if provided (more accurate than index tip during full-open palm)
      const x = hitX ?? ptrPos.current.x;
      const y = hitY ?? ptrPos.current.y;
      const target = findScrollableX(x, y);
      if (target) {
        target.scrollBy({ left: delta, behavior: "auto" });
      }
    },

    // ── Discrete swipe left ──────────────────────────────
    onSwipeLeft: () => {
      const target = findScrollableX(ptrPos.current.x, ptrPos.current.y);
      if (target) {
        target.scrollBy({ left: 280, behavior: "smooth" });
      }
    },

    // ── Discrete swipe right ─────────────────────────────
    onSwipeRight: () => {
      const target = findScrollableX(ptrPos.current.x, ptrPos.current.y);
      if (target) {
        target.scrollBy({ left: -280, behavior: "smooth" });
      }
    },

    // ── Point + hold → click ─────────────────────────────
    onSelect: () => {
      const { x, y } = ptrPos.current;
      // Clear highlight before click (prevents stale ring after navigation)
      if (highlightedRef.current) {
        highlightedRef.current.classList.remove(HL_CLASS);
        highlightedRef.current = null;
      }
      const target = findClickable(x, y);
      if (target) {
        // Dispatch mousedown+mouseup first — triggers click-outside handlers
        // (e.g. dropdown menus that close on mousedown outside)
        dispatchMousedown(target);
        target.click();
      } else {
        // No clickable target — still dispatch mousedown on document body
        // to trigger click-outside handlers (closes open dropdowns/menus)
        dispatchMousedown(document.body);
      }
    },

    // ── Pinch → same as select ───────────────────────────
    onPinch: () => {
      const { x, y } = ptrPos.current;
      if (highlightedRef.current) {
        highlightedRef.current.classList.remove(HL_CLASS);
        highlightedRef.current = null;
      }
      const target = findClickable(x, y);
      if (target) {
        dispatchMousedown(target);
        target.click();
      } else {
        dispatchMousedown(document.body);
      }
    },

    // ── Open palm hold → close modal ─────────────────────
    onClose: () => {
      const backdrop = detectModalBackdrop();
      if (backdrop) {
        closeModal(backdrop);
        return;
      }
      // Fallback: dispatch Escape key
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true, cancelable: true })
      );
    },

    // ── Pointer movement → highlight clickable elements ──
    onPointerMove: (x: number, y: number) => {
      ptrPos.current = { x, y };

      // When a modal is open, gestures are blocked (only palm-hold-to-close works).
      // Clear any existing highlight to avoid misleading UX.
      const modalUp = detectModalBackdrop();
      if (modalUp) {
        if (highlightedRef.current) {
          highlightedRef.current.classList.remove(HL_CLASS);
          highlightedRef.current = null;
        }
        return;
      }

      // Skip highlighting on gesture-UI elements (FAB, sheet, panel)
      const el = document.elementFromPoint(x, y);
      if (el && (el as HTMLElement).closest?.("[data-gesture-ui]")) {
        if (highlightedRef.current) {
          highlightedRef.current.classList.remove(HL_CLASS);
          highlightedRef.current = null;
        }
        return;
      }

      const target = findClickable(x, y);

      // Remove old highlight if target changed
      if (highlightedRef.current && highlightedRef.current !== target) {
        highlightedRef.current.classList.remove(HL_CLASS);
        highlightedRef.current = null;
      }

      // Add highlight to new target
      if (target && target !== highlightedRef.current) {
        target.classList.add(HL_CLASS);
        highlightedRef.current = target;
      }

      // No target → clear
      if (!target && highlightedRef.current) {
        highlightedRef.current.classList.remove(HL_CLASS);
        highlightedRef.current = null;
      }
    },

    // ── Modal open detection ─────────────────────────────
    isModalOpen: () => !!detectModalBackdrop(),
  }), []);

  // Create stable reference (memoized, doesn't change)
  const stableCallbacks = useMemo(() => callbacks(), [callbacks]);

  return <GestureControlLayer callbacks={stableCallbacks} />;
}