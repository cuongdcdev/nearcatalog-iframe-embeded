import { MetadataRoute } from "next";
import site from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/", // disable SEO for iframe embeded app
      // allow: "/",
      // disallow: "/private/",
    },
    // sitemap: `${site.url}/sitemap.xml`,
  };
}
