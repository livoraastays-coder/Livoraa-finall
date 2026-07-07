import type { ReactNode } from "react";
import FadeIn from "./FadeIn";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-32">
      <FadeIn>
        <p className="eyebrow mb-4">Policy</p>
        <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="prose-legal mt-12 space-y-7 text-base leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </FadeIn>
    </div>
  );
}
