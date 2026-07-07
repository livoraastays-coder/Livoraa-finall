"use client";

import { useMemo, useState } from "react";
import type { Property, StayType } from "@/lib/data/properties";
import type { City } from "@/lib/data/cities";
import PropertyCard from "@/components/PropertyCard";
import FadeIn from "@/components/FadeIn";

const stayTypes: StayType[] = [
  "Couple Friendly",
  "Work Stay",
  "Family Stay",
  "Group Stay",
];

export default function StaysExplorer({
  properties,
  cities,
  initialCity,
}: {
  properties: Property[];
  cities: City[];
  initialCity?: string;
}) {
  const [city, setCity] = useState<string>(initialCity || "all");
  const [type, setType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [minGuests, setMinGuests] = useState<string>("all");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (city !== "all" && p.citySlug !== city) return false;
      if (type !== "all" && !p.tags.includes(type as StayType)) return false;
      if (status !== "all" && p.status !== status) return false;
      if (minGuests !== "all" && p.guestCapacity < Number(minGuests)) return false;
      return true;
    });
  }, [properties, city, type, status, minGuests]);

  const selectClass =
    "border border-border bg-surface px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink";

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={selectClass}
          aria-label="Filter by city"
        >
          <option value="all">All cities</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={selectClass}
          aria-label="Filter by stay type"
        >
          <option value="all">All stay types</option>
          {stayTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={minGuests}
          onChange={(e) => setMinGuests(e.target.value)}
          className={selectClass}
          aria-label="Filter by guest capacity"
        >
          <option value="all">Any guest capacity</option>
          <option value="2">2+ guests</option>
          <option value="4">4+ guests</option>
          <option value="6">6+ guests</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={selectClass}
          aria-label="Filter by availability"
        >
          <option value="all">All availability</option>
          <option value="available">Available</option>
          <option value="coming-soon">Coming Soon</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-sm text-muted">
          No stays match these filters yet. Try widening your search, or
          {" "}
          <a href="/contact" className="underline decoration-border underline-offset-4 hover:decoration-ink">
            get in touch
          </a>{" "}
          and we'll help directly.
        </p>
      ) : (
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {filtered.map((property, i) => (
            <FadeIn key={property.slug} delay={(i % 3) * 80}>
              <PropertyCard property={property} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
