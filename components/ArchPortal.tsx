"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { desktopArchPortalConfig, mobileArchPortalConfig } from "@/lib/three/archPortalConfig";
import EditorialFrame from "./EditorialFrame";

// The Canvas/Three.js bundle is sizeable — load it only on the client,
// and only once this section actually needs to render.
const ArchPortalCanvas = dynamic(() => import("./three/ArchPortalCanvas"), {
  ssr: false,
});

/**
 * THE LIVORAA ARCH PORTAL
 * ---------------------------------------------------------------------
 * The site's signature scroll moment: a real scroll-driven 3D dolly
 * through a receding corridor of archways (components/three/*), ending
 * in the LIVORAA wordmark settling into view. Desktop and mobile use
 * genuinely separate scene configs (lib/three/archPortalConfig.ts) —
 * different camera path, FOV, geometry scale/spacing and scroll
 * distance — rather than one scene scaled or cropped by CSS.
 *
 * This wrapper owns everything the 3D scene itself doesn't need to know
 * about: scroll-progress tracking, which config to use, the reduced-
 * motion fallback, and pausing/unmounting the WebGL canvas entirely when
 * the section is far outside the viewport.
 * ---------------------------------------------------------------------
 */
export default function ArchPortal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [isNearViewport, setIsNearViewport] = useState(false);

  const config = isMobile ? mobileArchPortalConfig : desktopArchPortalConfig;
  const scrollEnabled = !reducedMotion;
  const progress = useScrollProgress(wrapperRef, scrollEnabled);

  // Mount/unmount the WebGL canvas based on proximity to the viewport,
  // not just strict intersection — a generous rootMargin means the
  // scene is already live by the time it scrolls into view, and fully
  // torn down (no GL context, no render loop) once well past it.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "60% 0px 60% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reducedMotion) {
    // Reduced motion: the settled end-state only, no scroll-linked 3D at
    // all — a static framed moment rather than a moving one.
    return (
      <section className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden bg-ink" aria-label="LIVORAA">
        <EditorialFrame seed="arch-portal-static" ratio="h-full" className="absolute inset-0 h-full w-full opacity-60" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="eyebrow text-surface/70">You've arrived at</p>
          <p className="mt-3 font-serif text-5xl text-surface md:text-7xl">LIVORAA</p>
          <p className="mt-4 max-w-xs text-sm text-surface/70 md:text-base">
            Step through, and stay a while.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={wrapperRef}
      className="relative bg-ink"
      style={{ height: `${config.scrollVh}vh` }}
      aria-label="LIVORAA — step through"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {isNearViewport ? (
          <ArchPortalCanvas progress={progress} config={config} />
        ) : (
          <div className="h-full w-full bg-ink" />
        )}
      </div>
    </section>
  );
}
