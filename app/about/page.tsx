import type { Metadata } from "next";
import EditorialFrame from "@/components/EditorialFrame";
import FadeIn from "@/components/FadeIn";
import { siteSettings } from "@/lib/data/siteSettings";
import { getFounder } from "@/lib/data/founder";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "LIVORAA STAYS is a growing boutique hospitality brand creating thoughtfully curated stays across Indian cities.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const founder = await getFounder();
  return (
    <div>
      <section className="mx-auto max-w-content px-6 pt-24 md:px-10 md:pt-32">
        <FadeIn>
          <p className="eyebrow mb-4">Our Story</p>
          <h1 className="max-w-2xl font-serif text-5xl leading-tight text-ink md:text-6xl">
            A boutique brand, growing city by city.
          </h1>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <FadeIn>
            <EditorialFrame seed="about-livoraa" ratio="aspect-[4/5]" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="space-y-6 text-base leading-relaxed text-muted">
              <p>
                LIVORAA STAYS began with a simple observation: short stays
                in Indian cities didn't have to feel like a compromise
                between a generic hotel room and an inconsistent home
                rental. There was room for something in between —
                considered, comfortable, and consistent.
              </p>
              <p>
                We started with a single stay in Raipur, built around
                careful design choices rather than a long list of
                amenities. That same approach now shapes LIVORAA Atelier
                in Ujjain, and LIVORAA Cove, currently taking shape in
                Indore.
              </p>
              <p>
                Our focus stays narrow on purpose: better short-stay
                experiences, thoughtful design, hospitality that goes
                beyond just providing a room, and a genuine connection to
                the city each property sits in. As we grow, every new
                city is added only once we're confident we can hold that
                same standard.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {siteSettings.showFounderSection && (
        <section className="border-t border-border bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 md:px-10">
            <FadeIn>
              <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
                <EditorialFrame seed="founder-livoraa" ratio="aspect-[4/5]" />
                <div className="flex flex-col justify-center">
                  <p className="eyebrow mb-4">Founder</p>
                  <p className="font-serif text-3xl text-ink md:text-4xl">
                    {founder.name}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-widest2 text-muted">
                    {founder.title}
                  </p>
                  {founder.story ? (
                    <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                      {founder.story}
                    </p>
                  ) : (
                    <p className="mt-6 max-w-md text-sm italic leading-relaxed text-muted/70">
                      A note from the founder is on its way.
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
        <FadeIn>
          <p className="max-w-xl font-serif text-3xl leading-tight text-ink md:text-4xl">
            Every LIVORAA property is expected to earn its place on this
            list — not just add to it.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
