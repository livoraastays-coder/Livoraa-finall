import Link from "next/link";

import HeroParallax from "@/components/HeroParallax";
import RevealText from "@/components/RevealText";
import FadeIn from "@/components/FadeIn";
import ArchPortal from "@/components/ArchPortal";
import ImmersivePropertyDiscovery from "@/components/ImmersivePropertyDiscovery";
import EditorialFrame from "@/components/EditorialFrame";
import CityCard from "@/components/CityCard";
import WhatsAppButton from "@/components/WhatsAppButton";

import { getProperties } from "@/lib/data/properties";
import { getCities } from "@/lib/data/cities";
import { getHomepage } from "@/lib/data/homepage";
import { siteSettings } from "@/lib/data/siteSettings";


export default async function HomePage() {
  const [properties, cities, homepage] = await Promise.all([
    getProperties(),
    getCities(),
    getHomepage(),
  ]);

  return (
    <div>
      {/* ================================================================
          SECTION 1 — HERO
      ================================================================= */}

      <section className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-border">
        <HeroParallax seed="hero-livoraa" />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

        <div className="relative mx-auto max-w-content px-6 py-32 md:px-10">
          <FadeIn>
            <p className="eyebrow mb-6">
              {homepage.hero.eyebrow || siteSettings.brandName}
            </p>
          </FadeIn>

          <RevealText
            as="h1"
            className="block max-w-2xl font-serif text-6xl leading-[1.05] text-ink md:text-8xl"
          >
            {homepage.hero.title}
          </RevealText>

          <FadeIn delay={250}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ink/80 md:text-lg">
              {homepage.hero.description}
            </p>
          </FadeIn>

          <FadeIn delay={350}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/stays"
                className="bg-ink px-7 py-3.5 text-sm font-medium tracking-wide text-surface transition-colors duration-300 ease-editorial hover:bg-walnut"
              >
                {homepage.hero.primaryButtonText}
              </Link>

              <Link
                href="/experience"
                className="border border-ink/30 px-7 py-3.5 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-editorial hover:border-ink hover:bg-ink hover:text-surface"
              >
                {homepage.hero.secondaryButtonText}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ================================================================
          SIGNATURE MOMENT — LIVORAA ARCH PORTAL
      ================================================================= */}

      <ArchPortal />


      {/* ================================================================
          SECTION 2 — INTRODUCTION
      ================================================================= */}

      <section className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-2 md:gap-20">
          <RevealText
            as="h2"
            className="block font-serif text-4xl leading-tight text-ink md:text-5xl"
          >
            {homepage.introduction.title}
          </RevealText>

          <FadeIn delay={100}>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {homepage.introduction.text}
            </p>
          </FadeIn>
        </div>
      </section>


      {/* ================================================================
          SECTION 3 — PROPERTY DISCOVERY
      ================================================================= */}

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-content px-6 pt-24 md:px-10 md:pt-32">
          <FadeIn>
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-4">
                  {homepage.staysSection.eyebrow}
                </p>

                <h2 className="max-w-lg font-serif text-4xl leading-tight text-ink md:text-5xl">
                  {homepage.staysSection.title}
                </h2>

                <p className="mt-3 max-w-sm text-sm text-muted">
                  {homepage.staysSection.description}
                </p>
              </div>

              <Link
                href="/stays"
                className="hidden text-sm font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink md:inline-block"
              >
                {homepage.staysSection.buttonText}
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="mt-10">
          <ImmersivePropertyDiscovery properties={properties} />
        </div>

        <div className="mx-auto max-w-content px-6 pb-16 md:hidden md:px-10">
          <Link
            href="/stays"
            className="text-sm font-medium text-ink underline decoration-border underline-offset-4"
          >
            {homepage.staysSection.buttonText}
          </Link>
        </div>
      </section>


      {/* ================================================================
          SECTION 4 — LIVORAA EXPERIENCE
      ================================================================= */}

      <section className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
        <FadeIn>
          <p className="eyebrow mb-4">
            {homepage.experienceSection.eyebrow}
          </p>

          <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink md:text-5xl">
            {homepage.experienceSection.title}
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {homepage.experienceSection.pillars.map((pillar, i) => (
            <FadeIn key={`${pillar.title}-${i}`} delay={i * 80}>
              <div className="border-t border-border pt-6">
                <p className="mb-3 font-serif text-2xl text-ink">
                  {pillar.title}
                </p>

                <p className="max-w-md text-sm leading-relaxed text-muted">
                  {pillar.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <Link
            href="/experience"
            className="mt-14 inline-block text-sm font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
          >
            {homepage.experienceSection.buttonText}
          </Link>
        </FadeIn>
      </section>


      {/* ================================================================
          SECTION 5 — DESTINATIONS
      ================================================================= */}

      <section className="border-t border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-content px-6 md:px-10">
          <FadeIn>
            <p className="eyebrow mb-4">
              {homepage.destinationsSection.eyebrow}
            </p>

            <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink md:text-5xl">
              {homepage.destinationsSection.title}
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {cities.map((city, i) => (
              <FadeIn key={city.slug} delay={i * 100}>
                <CityCard
                  city={city}
                  stayCount={
                    properties.filter(
                      (property) => property.citySlug === city.slug
                    ).length
                  }
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ================================================================
          SECTION 6 — DIGITAL CONCIERGE
      ================================================================= */}

      {homepage.conciergeSection.enabled && (
        <section className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <FadeIn>
              <EditorialFrame
                seed="concierge"
                ratio="aspect-[4/3]"
              />
            </FadeIn>

            <FadeIn delay={100}>
              <p className="eyebrow mb-4">
                {homepage.conciergeSection.eyebrow}
              </p>

              <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
                {homepage.conciergeSection.title}
              </h2>

              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                {homepage.conciergeSection.text}
              </p>
            </FadeIn>
          </div>
        </section>
      )}


      {/* ================================================================
          SECTION 7 — INSTAGRAM
      ================================================================= */}

      <section className="border-t border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-content px-6 md:px-10">
          <FadeIn>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-4">
                  {homepage.instagramSection.eyebrow}
                </p>

                <h2 className="max-w-lg font-serif text-4xl leading-tight text-ink md:text-5xl">
                  {homepage.instagramSection.title}
                </h2>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  {homepage.instagramSection.text}
                </p>
              </div>

              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/30 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-editorial hover:border-ink hover:bg-ink hover:text-surface"
              >
                {siteSettings.instagramHandle}
              </a>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {["ig-1", "ig-2", "ig-3", "ig-4"].map((seed, i) => (
              <FadeIn key={seed} delay={i * 60}>
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <EditorialFrame
                    seed={seed}
                    ratio="aspect-square"
                  />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ================================================================
          SECTION 8 — DIRECT BOOKING CTA
      ================================================================= */}

      <section className="mx-auto max-w-content px-6 py-24 text-center md:px-10 md:py-32">
        <FadeIn>
          <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight text-ink md:text-5xl">
            {homepage.bookingCta.title}
          </h2>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted">
            {homepage.bookingCta.text}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <WhatsAppButton />

            <Link
              href="/stays"
              className="border border-ink/30 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-editorial hover:border-ink hover:bg-ink hover:text-surface"
            >
              {homepage.bookingCta.staysButtonText}
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}