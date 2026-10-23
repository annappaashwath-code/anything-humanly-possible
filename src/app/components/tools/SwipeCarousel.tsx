import { useCallback, useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

/* ────────────────────────────────────────────
   Reusable Swipe Carousel
   Touch-friendly, mouse draggable, smooth inertia
   ──────────────────────────────────────────── */

interface SwipeCarouselProps {
  children: React.ReactNode[];
  /** Extra class on the outer wrapper */
  className?: string;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Items visible per slide (responsive handled by children width) */
  align?: "start" | "center" | "end";
  /** Loop back to start */
  loop?: boolean;
  /** Gap between items in px */
  gap?: number;
  /** Arrow variant */
  arrowVariant?: "minimal" | "bordered";
  /** Auto-play interval in ms (0 = off) */
  autoPlay?: number;
}

export function SwipeCarousel({
  children,
  className = "",
  showArrows = true,
  showDots = false,
  align = "start",
  loop = false,
  gap = 20,
  arrowVariant = "minimal",
  autoPlay = 0,
}: SwipeCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align,
    loop,
    dragFree: true,
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  /* Auto-play */
  useEffect(() => {
    if (!emblaApi || autoPlay <= 0) return;
    const play = () => {
      autoPlayRef.current = setInterval(() => {
        if (emblaApi.canScrollNext()) emblaApi.scrollNext();
        else emblaApi.scrollTo(0);
      }, autoPlay);
    };
    play();
    emblaApi.on("pointerDown", () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    });
    emblaApi.on("pointerUp", () => play());
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [emblaApi, autoPlay]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const arrowBase =
    arrowVariant === "bordered"
      ? "w-9 h-9 rounded-full bg-white border border-black/8 flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-black/15"
      : "w-8 h-8 rounded-full bg-white/90 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white";

  return (
    <div className={`relative group/carousel ${className}`}>
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex" style={{ gap: `${gap}px` }}>
          {children.map((child, i) => (
            <div key={i} className="flex-shrink-0" style={{ minWidth: 0 }}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow navigation */}
      {showArrows && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: canScrollPrev ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 ${arrowBase}`}
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              pointerEvents: canScrollPrev ? "auto" : "none",
            }}
          >
            <ChevronLeft size={14} className="text-black" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: canScrollNext ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 ${arrowBase}`}
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              pointerEvents: canScrollNext ? "auto" : "none",
            }}
          >
            <ChevronRight size={14} className="text-black" />
          </motion.button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && scrollSnaps.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="cursor-pointer transition-all duration-300"
              style={{
                width: selectedIndex === i ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: selectedIndex === i ? "#000" : "rgba(0,0,0,0.12)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
