import type { MetadataRoute } from "next";
import { STRONA } from "@/lib/dane";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/platnosc/"] }],
    sitemap: `${STRONA.adres}/sitemap.xml`,
  };
}
