"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/lib/data/navigation";
import { siteSettings } from "@/lib/data/siteSettings";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-500 ease-editorial ${
        scrolled ? "bg-background/90 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-serif text-xl tracking-wide text-ink"
          aria-label={`${siteSettings.brandName} home`}
        >
          {siteSettings.shortName}
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-ink/80 transition-colors duration-300 hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/stays"
          className="hidden rounded-none border border-ink/30 px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 ease-editorial hover:border-ink hover:bg-ink hover:text-surface md:inline-block"
        >
          Explore Stays
        </Link>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 top-[73px] z-40 flex flex-col bg-background px-8 py-10 md:hidden">
          <ul className="flex flex-1 flex-col justify-center gap-7">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-serif text-3xl text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/stays"
            className="mt-auto block border border-ink/30 px-5 py-3.5 text-center text-sm font-medium tracking-wide"
          >
            Explore Stays
          </Link>
        </div>
      )}
    </header>
  );
}
