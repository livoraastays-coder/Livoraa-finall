import Link from "next/link";
import { footerNav, footerLegal } from "@/lib/data/navigation";
import { siteSettings } from "@/lib/data/siteSettings";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-content px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl tracking-wide text-ink">
              {siteSettings.shortName}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Boutique stays shaped by thoughtful spaces, quiet details and
              experiences worth remembering.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink/80 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Legal</p>
            <ul className="space-y-3">
              {footerLegal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink/80 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-3 text-sm text-ink/80">
              <li>
                <a href={`mailto:${siteSettings.email}`} className="hover:text-ink">
                  {siteSettings.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteSettings.phoneDisplay.replace(/\s/g, "")}`}
                  className="hover:text-ink"
                >
                  {siteSettings.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink"
                >
                  Instagram — {siteSettings.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {siteSettings.brandName}. All rights reserved.</p>
          <p className="italic font-serif text-sm text-ink/70">
            {siteSettings.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
