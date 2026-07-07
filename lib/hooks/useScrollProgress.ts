"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Tracks how far a tall wrapper element has been scrolled through, as a
 * 0 → 1 progress value, using a single passive scroll listener throttled
 * with requestAnimationFrame (no scroll-linked library dependency).
 *
 * When `enabled` is false (reduced motion, or disabled for a narrow
 * viewport to protect mobile performance) this returns 1 immediately —
 * callers should treat that as "show the fully revealed / settled state,
 * no animation," not as an error state.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  enabled: boolean = true
) {
  const [progress, setProgress] = useState(enabled ? 0 : 1);
  const ticking = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setProgress(1);
      return;
    }

    const el = ref.current;
    if (!el) return;

    function measure() {
      const rect = el!.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height - viewportHeight;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = -rect.top;
      const raw = scrolled / total;
      setProgress(Math.min(1, Math.max(0, raw)));
    }

    function onScroll() {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          measure();
          ticking.current = false;
        });
        ticking.current = true;
      }
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, enabled]);

  return progress;
}
