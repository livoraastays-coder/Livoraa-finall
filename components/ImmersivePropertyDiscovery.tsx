"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import type { Property } from "@/lib/data/properties";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

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

  const [isNarrow, setIsNarrow] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px)"
    );

    setIsNarrow(mediaQuery.matches);

    const handleChange = (
      event: MediaQueryListEvent
    ) => {
      setIsNarrow(event.matches);
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  const scrollEnabled = !reducedMotion;

  const progress = useScrollProgress(
    wrapperRef,
    scrollEnabled
  );

  const count = properties.length;

  if (!count) {
    return null;
  }

  /*
   * Property indexes run from:
   *
   * 0 → count - 1
   *
   * Using count - 1 prevents the animation
   * from overshooting the final property.
   */
  const floatIndex =
    count > 1
      ? progress * (count - 1)
      : 0;

  const activeIndex = Math.max(
    0,
    Math.min(
      count - 1,
      Math.round(floatIndex)
    )
  );


  // =====================================================================
  // REDUCED MOTION
  // =====================================================================

  if (!scrollEnabled) {
    return (
      <div className="grid gap-x-8 gap-y-16 px-6 md:grid-cols-3 md:px-0">
        {properties.map(
          (property, index) => (
            <FadeIn
              key={property.slug}
              delay={index * 100}
            >
              <PropertyCard
                property={property}
              />
            </FadeIn>
          )
        )}
      </div>
    );
  }


  // =====================================================================
  // MOBILE
  //
  // Cascading sticky property panels.
  //
  // Each property occupies a full viewport.
  // The next property naturally rises over
  // the previous property while scrolling.
  //
  // Only the image receives subtle parallax.
  // =====================================================================

  if (isNarrow) {
    return (
      <div
        ref={wrapperRef}
        className="relative"
      >
        {/* MOBILE SECTION LABEL */}

        <div className="pointer-events-none sticky top-0 z-[100] flex justify-center pt-5">
          <p className="rounded-full bg-surface/85 px-4 py-2 text-[10px] uppercase tracking-widest2 text-ink/70 backdrop-blur-md">
            Our Stays
          </p>
        </div>


        {/* PROPERTY PANELS */}

        {properties.map(
          (property, index) => {
            /*
             * Progress local to this property.
             *
             * Used only for subtle image movement.
             */

            const propertyStart =
              index /
              Math.max(count - 1, 1);

            const propertyEnd =
              (index + 1) /
              Math.max(count - 1, 1);

            const localProgress =
              Math.min(
                1,
                Math.max(
                  0,
                  (progress -
                    propertyStart) /
                    Math.max(
                      propertyEnd -
                        propertyStart,
                      0.001
                    )
                )
              );

            const parallaxY =
              (localProgress - 0.5) * 8;

            return (
              <section
                key={property.slug}
                className="sticky top-0 flex min-h-[100dvh] w-full flex-col overflow-hidden bg-surface"
                style={{
                  zIndex:
                    10 + index,
                }}
              >
                {/* IMAGE */}

                <div className="relative min-h-0 flex-[1.15] overflow-hidden">
                  <div
                    className="absolute inset-0 will-change-transform"
                    style={{
                      transform: `
                        translateY(${parallaxY}%)
                        scale(1.08)
                      `,
                    }}
                  >
                    <EditorialFrame
                      seed={
                        property.slug
                      }
                      ratio="h-full"
                      className="h-full w-full"
                    />
                  </div>


                  {/* IMAGE GRADIENT */}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />


                  {/* COUNTER */}

                  <p className="pointer-events-none absolute right-5 top-6 text-xs text-surface/80">
                    {index + 1} /{" "}
                    {count}
                  </p>


                  {/* COMING SOON BADGE */}

                  {property.status ===
                    "coming-soon" && (
                    <span className="pointer-events-none absolute left-5 top-6 rounded-full bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-widest2 text-surface backdrop-blur-sm">
                      Coming Soon
                    </span>
                  )}
                </div>


                {/* CONTENT */}

                <div className="relative z-10 bg-surface px-6 pb-8 pt-6">
                  <p className="text-xs uppercase tracking-widest2 text-muted">
                    {property.city}
                  </p>

                  <h3 className="mt-2 font-serif text-3xl leading-tight text-ink">
                    {property.name}
                  </h3>

                  <p className="mt-3 line-clamp-2 max-w-md text-sm leading-relaxed text-muted">
                    {
                      property.shortDescription
                    }
                  </p>

                  <Link
                    href={`/stays/${property.citySlug}/${property.slug}`}
                    className="mt-5 inline-flex min-h-[44px] items-center bg-ink px-6 py-3 text-sm font-medium tracking-wide text-surface transition-colors duration-300 ease-editorial active:bg-walnut"
                  >
                    {property.status ===
                    "coming-soon"
                      ? "View details"
                      : "Explore stay"}
                  </Link>
                </div>
              </section>
            );
          }
        )}
      </div>
    );
  }


  // =====================================================================
  // DESKTOP
  //
  // Keep the immersive perspective sequence.
  // =====================================================================

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `${count * 100}vh`,
      }}
      className="relative"
    >
      <div
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          perspective: "1400px",
        }}
      >
        {/* DESKTOP SECTION LABEL */}

        <div className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 text-center">
          <p className="eyebrow">
            Our Stays
          </p>
        </div>


        {/* DESKTOP PROPERTY PANELS */}

        {properties.map(
          (property, index) => {
            const distance =
              floatIndex - index;

            const absoluteDistance =
              Math.abs(distance);

            if (
              absoluteDistance > 1.4
            ) {
              return null;
            }

            const opacity =
              Math.max(
                0,
                1 -
                  absoluteDistance *
                    0.9
              );

            const translateX =
              distance * 55;

            const scale =
              1 -
              Math.min(
                0.3,
                absoluteDistance *
                  0.22
              );

            const rotateY =
              distance * -14;

            const clipInset =
              Math.max(
                0,
                (1 -
                  Math.max(
                    0,
                    1 -
                      absoluteDistance
                  )) *
                  100
              );

            const isActive =
              index ===
              activeIndex;

            return (
              <div
                key={property.slug}
                className="absolute inset-0 flex items-center justify-center"
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
                          absoluteDistance *
                            10
                        ),

                  pointerEvents:
                    isActive
                      ? "auto"
                      : "none",
                }}
              >
                <div className="grid w-full max-w-content grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:px-10">

                  {/* IMAGE */}

                  <div
                    className="relative overflow-hidden"
                    style={{
                      clipPath: `
                        inset(
                          ${
                            clipInset *
                            0.5
                          }%
                          ${clipInset}%
                          ${
                            clipInset *
                            0.5
                          }%
                          0
                          round 2px
                        )
                      `,

                      transition:
                        "clip-path 80ms linear",
                    }}
                  >
                    <EditorialFrame
                      seed={
                        property.slug
                      }
                      ratio="aspect-[4/5]"
                    />
                  </div>


                  {/* CONTENT */}

                  <div>
                    <p className="text-xs uppercase tracking-widest2 text-muted">
                      {property.city}

                      {property.status ===
                      "coming-soon"
                        ? " · Coming Soon"
                        : ""}
                    </p>

                    <h3 className="mt-2 font-serif text-4xl leading-tight text-ink md:text-5xl">
                      {property.name}
                    </h3>

                    <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                      {
                        property.shortDescription
                      }
                    </p>

                    <div className="mt-7 flex items-center gap-6">
                      <Link
                        href={`/stays/${property.citySlug}/${property.slug}`}
                        className="bg-ink px-6 py-3 text-sm font-medium tracking-wide text-surface transition-colors duration-300 ease-editorial hover:bg-walnut"
                      >
                        {property.status ===
                        "coming-soon"
                          ? "View details"
                          : "Explore stay"}
                      </Link>

                      <span className="text-xs text-muted">
                        {index + 1} /{" "}
                        {count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}