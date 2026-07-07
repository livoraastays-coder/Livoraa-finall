import Link from "next/link";
import type { City } from "@/lib/data/cities";
import EditorialFrame from "./EditorialFrame";

export default function CityCard({
  city,
  stayCount = 0,
}: {
  city: City;
  stayCount?: number;
}) {
  return (
    <Link href={`/stays?city=${city.slug}`} className="group block">
      <div className="overflow-hidden">
        <EditorialFrame
          seed={city.slug}
          ratio="aspect-[3/4]"
          className="transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
        />
      </div>
      <div className="pt-5">
        <h3 className="font-serif text-2xl text-ink">{city.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest2 text-muted">
          {city.state} · {stayCount} {stayCount === 1 ? "stay" : "stays"}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {city.description}
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-ink underline decoration-border underline-offset-4 group-hover:decoration-ink">
          Explore destination
        </span>
      </div>
    </Link>
  );
}
