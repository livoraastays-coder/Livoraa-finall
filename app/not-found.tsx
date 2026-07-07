import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-start px-6 py-32 md:px-10">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-serif text-4xl text-ink md:text-5xl">
        This page has moved, or never existed.
      </h1>
      <p className="mt-5 max-w-md text-base text-muted">
        Let's get you back to somewhere useful.
      </p>
      <Link
        href="/"
        className="mt-8 bg-ink px-6 py-3 text-sm font-medium tracking-wide text-surface transition-colors duration-300 ease-editorial hover:bg-walnut"
      >
        Return home
      </Link>
    </div>
  );
}
