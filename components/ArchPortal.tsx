"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

import {
  desktopArchPortalConfig,
  mobileArchPortalConfig,
} from "@/lib/three/archPortalConfig";

import EditorialFrame from "./EditorialFrame";

const ArchPortalCanvas = dynamic(
  () => import("./three/ArchPortalCanvas"),
  {
    ssr: false,
  }
);

export default function ArchPortal() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const [isNearViewport, setIsNearViewport] =
    useState(false);

  const config = isMobile
    ? mobileArchPortalConfig
    : desktopArchPortalConfig;

  const scrollEnabled = !reducedMotion;

  const progress = useScrollProgress(
    wrapperRef,
    scrollEnabled
  );

  useEffect(() => {
    const el = wrapperRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) =>
        setIsNearViewport(
          entry.isIntersecting
        ),
      {
        rootMargin:
          "60% 0px 60% 0px",
      }
    );

    observer.observe(el);

    return () =>
      observer.disconnect();
  }, []);

  if (reducedMotion) {
    return (
      <section
        className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden bg-ink"
        aria-label="LIVORAA"
      >
        <EditorialFrame
          seed="arch-portal-static"
          ratio="h-full"
          className="absolute inset-0 h-full w-full opacity-60"
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="eyebrow text-surface/70">
            You've arrived at
          </p>

          <p className="mt-3 font-serif text-5xl text-surface md:text-7xl">
            LIVORAA
          </p>

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
      style={{
        height: `${config.scrollVh}vh`,
      }}
      aria-label="LIVORAA — step through"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {isNearViewport ? (
          <ArchPortalCanvas
            progress={progress}
            config={config}
          />
        ) : (
          <div className="h-full w-full bg-ink" />
        )}

        {/* SCROLL CUE */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-8
            left-1/2
            z-30
            flex
            -translate-x-1/2
            flex-col
            items-center
            gap-4
            md:bottom-10
          "
          style={{
            opacity: Math.max(
              0,
              1 - progress * 5
            ),
            transform: `
              translateX(-50%)
              translateY(${progress * 18}px)
            `,
            transition:
              "opacity 200ms ease-out",
          }}
        >
          <p
            className="
              whitespace-nowrap
              text-[9px]
              font-medium
              uppercase
              tracking-[0.32em]
              text-surface/70
              md:text-[10px]
            "
          >
            Scroll to explore LIVORAA
          </p>

          {/* TRAVELLING LIGHT LINE */}
          <div className="relative h-12 w-px overflow-hidden bg-surface/15">
            <div
              className="
                absolute
                left-0
                top-0
                h-1/2
                w-full
                animate-[livoraaScrollLine_1.8s_ease-in-out_infinite]
                bg-gradient-to-b
                from-transparent
                via-surface/90
                to-transparent
              "
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes livoraaScrollLine {
            0% {
              transform: translateY(-120%);
              opacity: 0;
            }

            20% {
              opacity: 1;
            }

            80% {
              opacity: 1;
            }

            100% {
              transform: translateY(260%);
              opacity: 0;
            }
          }

          @media (
            prefers-reduced-motion:
              reduce
          ) {
            div {
              animation: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
}