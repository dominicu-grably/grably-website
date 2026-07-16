import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  getPublishedPosts,
  getPostBySlug,
  isPostPublished,
  formatDate,
} from "@/lib/blog";

interface PageProps {
  params: { slug: string };
}

// Re-check publish dates hourly; future posts render on-demand once live.
export const revalidate = 3600;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  // A future-dated post exists on disk but is not yet public → 404.
  if (!isPostPublished(params.slug)) notFound();

  const url = `https://grably.ca/blog/${post.slug}`;
  return {
    title: `${post.title} — Grably Blog`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Map markdown images to optimized next/image instead of a raw <img>.
const mdxComponents = {
  img: (props: React.ComponentPropsWithoutRef<"img">) => {
    const { src, alt } = props;
    if (typeof src !== "string") return null;
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={1200}
        height={675}
        className="my-8 h-auto w-full rounded-lg"
      />
    );
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  // Direct-link access before the publish date also 404s.
  if (!isPostPublished(params.slug)) notFound();

  const url = `https://grably.ca/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author || "Grably" },
    publisher: {
      "@type": "Organization",
      name: "Grably",
      url: "https://grably.ca",
    },
    description: post.excerpt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-grably-offwhite">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/blog"
            className="text-sm font-semibold text-grably-accent transition-colors hover:text-grably-adk"
          >
            ← All posts
          </Link>

          <header className="mt-6">
            <h1 className="font-serif text-4xl font-bold text-grably-text">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-grably-textmid">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
              {post.readingTime && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>
          </header>

          <div className="prose prose-lg mt-10 max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
