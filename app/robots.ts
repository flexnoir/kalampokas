import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/offer/", "/api/"],
    },
    sitemap: "https://kalampokasfotografia.gr/sitemap.xml",
  };
}
