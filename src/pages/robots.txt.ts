// src/pages/robots.txt.ts - robots.txt dynamique : exploration autorisee, sitemap en URL absolue.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site, url }) => {
  // L'URL du sitemap est absolue, derivee de "site" dans astro.config : une
  // seule edition la corrige en meme temps que canonical, OG et llms.txt.
  const base = site ?? url;
  const sitemap = new URL("/sitemap-index.xml", base).href;

  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
