import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category?: string;
  readingTime?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string; // raw MDX source (frontmatter stripped)
}

function parseMeta(slug: string, raw: string): { meta: BlogPostMeta; content: string } {
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: String(data.title ?? ""),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      author: String(data.author ?? "Grably Team"),
      category: data.category ? String(data.category) : undefined,
      readingTime: readingTime(content).text,
    },
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      return parseMeta(slug, raw).meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // date DESC
}

export function getPostBySlug(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { meta, content } = parseMeta(slug, raw);
  return { ...meta, content };
}

// Scheduled publishing: a post is live only once its date has arrived.
function isPublished(post: BlogPostMeta): boolean {
  return new Date(post.date) <= new Date();
}

// Public-facing surfaces (index, sitemap, static params) use this, so
// future-dated posts stay hidden until their date passes.
export function getPublishedPosts(): BlogPostMeta[] {
  return getAllPosts().filter(isPublished);
}

export function isPostPublished(slug: string): boolean {
  const post = getPostBySlug(slug);
  return post ? isPublished(post) : false;
}

export function formatDate(date: string): string {
  // Parse at noon UTC and render in UTC to avoid timezone day-shift.
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
