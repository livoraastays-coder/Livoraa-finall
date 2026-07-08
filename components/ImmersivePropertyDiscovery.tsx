"use client";

import { useRef } from "react";
import Link from "next/link";

import type { Property } from "@/lib/data/properties";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

import {
  desktopPropertyDiscoveryConfig,
  mobilePropertyDiscoveryConfig,
} from "@/lib/motion/propertyDiscoveryConfig";

import EditorialFrame from "./EditorialFrame";
import PropertyCard from "./PropertyCard";
import FadeIn from "./FadeIn";

export default function ImmersivePropertyDiscovery({
  properties,
}: {
  properties: Property[];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const config = isMobile
    ? mobilePropertyDiscoveryConfig
    : desktopPropertyDiscoveryConfig;

  const scrollEnabled = !reducedMotion;

  const progress = useScrollProgress(
    wrapperRef,
    scrollEnabled
  );

  const count = properties.length;

  if (!count) {
    return null;
  }

  if (!scrollEnabled) {
    return (
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-3">
        {properties.map((property, i) => (
          <FadeIn
            key={property.slug}
            delay={i * 100}
          >
            <PropertyCard property={property} />
          </FadeIn>
        ))}
      </div>
    );
  }

  /*
   * IMPORTANT:
   * Property indexes run from 0 to count - 1.
   * This prevents scrolling beyond the final property.
   */
  const floatIndex =
    count > 1 ? progress * (count - 1) : 0;

  const nearestIndex = Math.max(
    0,
    Math.min(
      count - 1,
      Math.round(floatIndex)
    )
  );

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `${Math.max(
          count,
          1
        ) * config.vhPerProperty}vh`,
      }}
      className="relative"
    >
      <div
        className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden"
        style={{
          perspective: `${config.perspectivePx}px`,
        }}
      >
        <div className="pointer-events-none absolute left-1/2 top-6 z-30 -translate-x-1/2 text-center md:top-8">
          <p className="eyebrow">
            Our Stays
          </p>
        </div>

        {properties.map((property, i) => {
          const distance =
            floatIndex - i;

          const abs =
            Math.abs(distance);

          if (
            abs >
            config.maxRenderDistance
          ) {
            return null;
          }

          const opacity = Math.max(
            0,
            1 - abs * 0.9
          );

          const translateX =
            distance *
            config.translateXPercent;

          const scale =
            1 -
            Math.min(
              config.maxScaleFalloff,
              abs *
                config.scaleFalloff
            );

          const rotateY =
            distance *
            config.rotateYDeg;

          const clipInset =
            Math.max(
              0,
              (1 -
                Math.max(
                  0,
                  1 - abs
                )) *
                config.clipInsetMax
            );

          const isActive =
            i === nearestIndex;

          /*
           * On mobile, neighbouring images remain visible
           * for the 3D choreography, but their text content
           * is hidden so cards cannot overlap.
           */
          const contentOpacity =
            isMobile
              ? isActive
                ? 1
                : 0
              : 1;

          return (
            <div
              key={property.slug}
              className="absolute inset-0 flex items-center justify-center px-4"
              style={{
                opacity,
                transform: `
                  translateX(${translateX}%)
                  scale(${scale})
                  rotateY(${rotateY}deg)
                `,
                transition:
                  "opacity 60ms linear",
                zIndex:
                  isActive
                    ? 20
                    : 10 -
                      Math.round(
                        abs * 5
                      ),
                pointerEvents:
                  isActive
                    ? "auto"
                    : "none",
              }}
            >
              <div className="grid w-full max-w-content grid-cols-1 items-center gap-6 overflow-hidden px-2 py-4 md:grid-cols-2 md:gap-10 md:px-10 md:py-0">
                <div
                  className="relative overflow-hidden"
                  style={{
                    clipPath: `
                      inset(
                        ${clipInset * 0.5}%
                        ${clipInset}%
                        ${clipInset * 0.5}%
                        0
                        round 2px
                      )
                    `,
                    transition:
                      "clip-path 80ms linear",
                  }}
                >
                  <EditorialFrame
                    seed={property.slug}
                    ratio={
                      config.imageAspect
                    }
                  />
                </div>

                <div
                  className="min-w-0"
                  style={{
                    opacity:
                      contentOpacity,
                    visibility:
                      isMobile &&
                      !isActive
                        ? "hidden"
                        : "visible",
                    transition:
                      "opacity 180ms ease",
                  }}
                >
                  <p className="text-xs uppercase tracking-widest2 text-muted">
                    {property.city}

                    {property.status ===
                    "coming-soon"
                      ? " · Coming Soon"
                      : ""}
                  </p>

                  <h3 className="mt-2 font-serif text-3xl leading-tight text-ink md:text-5xl">
                    {property.name}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:mt-4 md:text-base">
                    {
                      property.shortDescription
                    }
                  </p>

                  <div className="mt-5 flex items-center gap-6 md:mt-7">
                    <Link
                      href={`/stays/${property.citySlug}/${property.slug}`}
                      className="flex min-h-[44px] items-center bg-ink px-6 py-3 text-sm font-medium tracking-wide text-surface transition-colors duration-300 ease-editorial hover:bg-walnut"
                    >
                      {property.status ===
                      "coming-soon"
                        ? "View details"
                        : "Explore stay"}
                    </Link>

                    <span className="text-xs text-muted">
                      {i + 1} /{" "}
                      {count}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}