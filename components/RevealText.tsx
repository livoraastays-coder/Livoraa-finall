"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Splits text into words, each masked behind a clip-path that lifts away
 * on scroll-into-view, staggered word by word — the "editorial
 * typography reveal" used for section headings across the site.
 * Falls back to plain, immediately-visible text under reduced motion.
 */
export default function RevealText({
  children,
  as: Tag = "span",
  className = "",
  staggerMs = 45,
}: {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  staggerMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const words = children.split(" ");

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-top"
          style={{ marginRight: "0.28em" }}
        >
          <span
            className="inline-block transition-transform duration-[900ms] ease-editorial will-change-transform"
            style={{
              transitionDelay: reducedMotion ? "0ms" : `${i * staggerMs}ms`,
              transform: visible ? "translateY(0%)" : "translateY(105%)",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
