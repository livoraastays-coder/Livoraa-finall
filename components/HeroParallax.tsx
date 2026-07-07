"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import EditorialFrame from "./EditorialFrame";

/**
 * Layered parallax background for the hero: the texture layer scrolls at
 * roughly 40% of normal speed, creating depth against the foreground
 * text. Disabled entirely under reduced motion and on narrow viewports
 * (<768px) to protect mobile scroll performance — the frame still shows,
 * it simply doesn't move independently.
 */
export default function HeroParallax({ seed }: { seed: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setEnabled(mq.matches && !reducedMotion);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches && !reducedMotion);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) {
      setOffset(0);
      return;
    }
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffset(window.scrollY * 0.4);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-x-0 -top-1/4 h-[150%]"
        style={{
          transform: enabled ? `translateY(${offset}px)` : undefined,
          willChange: enabled ? "transform" : undefined,
        }}
      >
        <EditorialFrame seed={seed} ratio="h-full" className="h-full w-full" />
      </div>
    </div>
  );
}
