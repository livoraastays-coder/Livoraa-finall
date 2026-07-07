import type { Metadata } from "next";
import Link from "next/link";
import EditorialFrame from "@/components/EditorialFrame";
import FadeIn from "@/components/FadeIn";
import { getJournalPosts } from "@/lib/data/journal";

export const metadata: Metadata = {
  title: "Journal & City Guides",
  description:
    "City guides, food notes and stories from LIVORAA — Raipur, Ujjain, Indore and beyond.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const posts = await getJournalPosts();
  const sorted = [...posts].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <div className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
      <FadeIn>
        <p className="eyebrow mb-4">Journal</p>
        <h1 className="max-w-xl font-serif text-5xl leading-tight text-ink md:text-6xl">
          City guides & stories
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
          Notes on the cities we call home, and the thinking behind how we
          build LIVORAA.
        </p>
      </FadeIn>

      <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
        {sorted.map((post, i) => (
          <FadeIn key={post.slug} delay={(i % 3) * 80}>
            <Link href={`/journal/${post.slug}`} className="group block">
              <EditorialFrame
                seed={post.slug}
                ratio="aspect-[4/3]"
                className="transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03]"
              />
              <div className="pt-5">
                <p className="text-xs uppercase tracking-widest2 text-muted">
                  {post.category} {post.city ? `· ${post.city}` : ""}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-ink group-hover:text-walnut">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.introduction}
                </p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
