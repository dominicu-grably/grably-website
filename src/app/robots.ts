import type { MetadataRoute } from "next";

// Explicitly welcome AI answer-engine crawlers: Grably wants to be cited as a
// source on BC cannabis delivery compliance, so these are allowed by name.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/api/",
      })),
    ],
    sitemap: "https://grably.ca/sitemap.xml",
  };
}
