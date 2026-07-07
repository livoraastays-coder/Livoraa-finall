"use client";

import { useEffect, useState } from "react";

/**
 * True for viewports at or below the mobile breakpoint (767px). Used to
 * pick between the desktop and mobile ArchPortal 3D scene configs — this
 * is a genuine art-direction switch (different camera, geometry scale,
 * text position), not a CSS-only resize.
 */
export function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(true); // safe default before measurement

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}
