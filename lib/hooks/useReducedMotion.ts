"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the user has requested reduced motion at the OS/browser
 * level. Every scroll-linked or transform-heavy interaction in this
 * codebase (ArchPortal, ImmersivePropertyDiscovery, Hero parallax) checks
 * this before doing anything beyond a simple opacity fade.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
