import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://grably.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [
    { url: BASE_URL },
    { url: `${BASE_URL}/compliance-check` },
    { url: `${BASE_URL}/blog` },
    ...postEntries,
  ];
}
