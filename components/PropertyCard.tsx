import Link from "next/link";
import type { Property } from "@/lib/data/properties";
import EditorialFrame from "./EditorialFrame";

export default function PropertyCard({ property }: { property: Property }) {
  const href = `/stays/${property.citySlug}/${property.slug}`;

  return (
    <div className="group">
      <Link href={href} className="block overflow-hidden">
        <div className="relative overflow-hidden">
          <EditorialFrame
            seed={property.slug}
            ratio="aspect-[4/5]"
            className="transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
          />
          {property.status === "coming-soon" && (
            <span className="absolute left-4 top-4 bg-surface/90 px-3 py-1 text-[10px] uppercase tracking-widest2 text-walnut">
              Coming Soon
            </span>
          )}
        </div>
      </Link>

      <div className="pt-5">
        <p className="text-xs uppercase tracking-widest2 text-muted">
          {property.city}
        </p>
        <Link href={href}>
          <h3 className="mt-1 font-serif text-2xl text-ink transition-colors duration-300 group-hover:text-walnut">
            {property.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {property.shortDescription}
        </p>

        {property.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {property.tags.map((tag) => (
              <li
                key={tag}
                className="border border-border px-3 py-1 text-[11px] text-olive"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex items-center gap-5">
          <Link
            href={href}
            className="text-sm font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-ink"
          >
            {property.status === "coming-soon" ? "View details" : "Explore stay"}
          </Link>
          <Link
            href={`/enquire?property=${property.slug}`}
            className="text-sm text-muted hover:text-ink"
          >
            {property.status === "coming-soon" ? "Join waitlist" : "Enquire"}
          </Link>
        </div>
      </div>
    </div>
  );
}
