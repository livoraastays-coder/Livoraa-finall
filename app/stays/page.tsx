import type { Metadata } from "next";
import StaysExplorer from "./StaysExplorer";
import FadeIn from "@/components/FadeIn";
import { getProperties } from "@/lib/data/properties";
import { getCities } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Our Stays",
  description:
    "Explore current and upcoming LIVORAA properties across Raipur, Ujjain and Indore — boutique stays designed around comfort and detail.",
  alternates: { canonical: "/stays" },
};

export default async function StaysPage({
  searchParams,
}: {
  searchParams: { city?: string };
}) {
  const [properties, cities] = await Promise.all([getProperties(), getCities()]);

  return (
    <div className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
      <FadeIn>
        <p className="eyebrow mb-4">Our Stays</p>
        <h1 className="max-w-xl font-serif text-5xl leading-tight text-ink md:text-6xl">
          Every LIVORAA property, in one place
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
          Filter by city, stay type or guest capacity to find the space
          that fits your trip.
        </p>
      </FadeIn>

      <div className="mt-12">
        <StaysExplorer
          properties={properties}
          cities={cities}
          initialCity={searchParams.city}
        />
      </div>
    </div>
  );
}
