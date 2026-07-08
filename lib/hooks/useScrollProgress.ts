"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  enabled: boolean = true
) {
  const [progress, setProgress] = useState(enabled ? 0 : 1);

  const currentProgress = useRef(enabled ? 0 : 1);
  const targetProgress = useRef(enabled ? 0 : 1);

  const frameRef = useRef<number | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (!enabled) {
      currentProgress.current = 1;
      targetProgress.current = 1;
      setProgress(1);
      return;
    }

    const el = ref.current;

    if (!el) {
      return;
    }

    const clamp = (value: number) =>
      Math.min(1, Math.max(0, value));

    const measureTarget = () => {
      const rect = el.getBoundingClientRect();

      const viewportHeight =
        window.visualViewport?.height ??
        window.innerHeight;

      const total =
        rect.height - viewportHeight;

      if (total <= 0) {
        targetProgress.current = 1;
        return;
      }

      const scrolled = -rect.top;

      targetProgress.current = clamp(
        scrolled / total
      );
    };

    const animate = () => {
      const current =
        currentProgress.current;

      const target =
        targetProgress.current;

      const difference =
        target - current;

      /*
       * Interpolation:
       * lower = smoother/slower
       * higher = faster/more responsive
       */
      const smoothing = 0.14;

      const next =
        current + difference * smoothing;

      if (Math.abs(difference) < 0.0001) {
        currentProgress.current = target;
        setProgress(target);

        isAnimating.current = false;
        frameRef.current = null;

        return;
      }

      currentProgress.current = next;
      setProgress(next);

      frameRef.current =
        window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      measureTarget();

      if (!isAnimating.current) {
        isAnimating.current = true;

        frameRef.current =
          window.requestAnimationFrame(animate);
      }
    };

    /*
     * Set initial position immediately so the page
     * does not animate from zero after navigation.
     */
    measureTarget();

    currentProgress.current =
      targetProgress.current;

    setProgress(targetProgress.current);

    window.addEventListener(
      "scroll",
      startAnimation,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      startAnimation,
      { passive: true }
    );

    window.visualViewport?.addEventListener(
      "resize",
      startAnimation
    );

    return () => {
      window.removeEventListener(
        "scroll",
        startAnimation
      );

      window.removeEventListener(
        "resize",
        startAnimation
      );

      window.visualViewport?.removeEventListener(
        "resize",
        startAnimation
      );

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(
          frameRef.current
        );
      }

      isAnimating.current = false;
    };
  }, [ref, enabled]);

  return progress;
}