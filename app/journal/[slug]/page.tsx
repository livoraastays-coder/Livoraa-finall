import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJournalPosts, getPostBySlug } from "@/lib/data/journal";
import EditorialFrame from "@/components/EditorialFrame";
import FadeIn from "@/components/FadeIn";
import { siteSettings } from "@/lib/data/siteSettings";

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.introduction,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.introduction,
      images: [post.coverImage],
      type: "article",
    },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const shareUrl = `${siteSettings.siteUrl}/journal/${post.slug}`;

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-32">
      <FadeIn>
        <p className="eyebrow mb-4">
          {post.category} {post.city ? `· ${post.city}` : ""}
        </p>
        <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          {new Date(post.publishedDate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="mt-10">
          <EditorialFrame seed={post.slug} ratio="aspect-[16/9]" />
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/85">
          <p className="font-serif text-2xl leading-snug text-ink">
            {post.introduction}
          </p>
          {post.body.map((para, i) => (
            <p key={i} className="text-base text-muted">
              {para}
            </p>
          ))}
        </div>

        {post.isPlaceholder && (
          <p className="mt-8 border-l-2 border-walnut pl-4 text-xs uppercase tracking-widest2 text-walnut">
            This guide is being finalised with verified local
            recommendations.
          </p>
        )}

        {post.mapLink && (
          <a
            href={post.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
          >
            View on map
          </a>
        )}
      </FadeIn>

      <FadeIn delay={200}>
        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-border pt-8">
          {post.relatedPropertySlug && (
            <Link
              href={`/stays`}
              className="text-sm font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
            >
              View related stay
            </Link>
          )}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `${post.title} — ${shareUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-ink"
          >
            Share
          </a>
          <a
            href={siteSettings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-ink"
          >
            Follow on Instagram
          </a>
        </div>
      </FadeIn>
    </article>
  );
}
