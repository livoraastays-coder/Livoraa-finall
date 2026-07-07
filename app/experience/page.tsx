import type { Metadata } from "next";
import EditorialFrame from "@/components/EditorialFrame";
import FadeIn from "@/components/FadeIn";
import { siteSettings } from "@/lib/data/siteSettings";

export const metadata: Metadata = {
  title: "The LIVORAA Experience",
  description:
    "How LIVORAA thinks about thoughtful spaces, sleep and comfort, curated local recommendations and consistent guest communication.",
  alternates: { canonical: "/experience" },
};

const chapters = [
  {
    title: "Thoughtful spaces",
    text: "Every LIVORAA stay starts with the room itself — how light moves through it, where a guest will actually sit and work, and what makes a space feel lived-in rather than staged. We design for how a space is used, not just how it photographs.",
  },
  {
    title: "Sleep and comfort",
    text: "A stay is remembered by how well you slept in it. We pay close attention to mattress quality, linen, room temperature and quiet — the parts of a stay that are easy to overlook and impossible to fake.",
  },
  {
    title: "Carefully chosen amenities",
    text: "Each property is equipped with what a guest actually needs — reliable Wi-Fi, a proper workspace, a well-stocked kitchenette where relevant — rather than a long list of amenities added for the sake of it.",
  },
  {
    title: "Digital guest assistance",
    text: "Selected stays include a simple digital concierge, giving guests easy access to stay information, local recommendations and assistance without needing to track down a phone number.",
  },
  {
    title: "Curated local recommendations",
    text: "We put together honest, tested suggestions for food, coffee and things to do nearby — the kind of list a friend who lives locally would actually give you.",
  },
  {
    title: "Consistent guest communication",
    text: "From enquiry to check-out, we aim to be easy to reach and clear about what to expect — no ambiguity about check-in times, access or house rules.",
  },
];

export default function ExperiencePage() {
  return (
    <div>
      <section className="mx-auto max-w-content px-6 pt-24 md:px-10 md:pt-32">
        <FadeIn>
          <p className="eyebrow mb-4">The LIVORAA Experience</p>
          <h1 className="max-w-2xl font-serif text-5xl leading-tight text-ink md:text-6xl">
            Hospitality, held to a quieter standard.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            We don't promise more than we can deliver. Here's what actually
            shapes a stay at LIVORAA — described plainly, without the
            usual embellishment.
          </p>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
        <div className="space-y-20">
          {chapters.map((chapter, i) => (
            <FadeIn key={chapter.title} delay={i * 40}>
              <div className="grid gap-8 border-t border-border pt-10 md:grid-cols-[0.9fr_1.4fr] md:gap-16">
                <EditorialFrame
                  seed={chapter.title}
                  ratio="aspect-[4/3]"
                  className="order-1 md:order-none"
                />
                <div>
                  <h2 className="font-serif text-3xl text-ink">{chapter.title}</h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
                    {chapter.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 text-center md:py-28">
        <FadeIn>
          <p className="mx-auto max-w-md font-serif text-3xl text-ink">
            {siteSettings.tagline}
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
