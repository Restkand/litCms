import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuiiapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Hash fragment (#section) URLs are ignored by Google — only list real navigable pages.
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
