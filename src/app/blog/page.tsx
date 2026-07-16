import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPublishedPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Grably",
  description:
    "Cannabis delivery compliance, dispatch operations, and product updates from Grably.",
  alternates: {
    canonical: "https://grably.ca/blog",
  },
};

// Re-check publish dates hourly so scheduled posts appear without a redeploy.
export const revalidate = 3600;

export default function BlogIndexPage() {
  const posts = getPublishedPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-grably-offwhite">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-grably-textmid">
            Grably Blog
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-grably-text">
            Blog
          </h1>
          <p className="mt-4 text-grably-textmid">
            Cannabis delivery compliance, dispatch operations, and product
            updates from Grably.
          </p>

          <div className="mt-12 space-y-6">
            {posts.length === 0 ? (
              <p className="text-grably-textmid">
                No posts yet — check back soon.
              </p>
            ) : (
              posts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-2xl border border-grably-gray bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-grably-textmid">
                    {post.category && (
                      <span className="rounded-full bg-grably-lightgrn px-2 py-0.5 text-xs font-medium text-grably-dark">
                        {post.category}
                      </span>
                    )}
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.readingTime && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime}</span>
                      </>
                    )}
                  </div>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-grably-text">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-grably-adk"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-grably-textmid">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-grably-accent transition-colors hover:text-grably-adk"
                  >
                    Read more →
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
