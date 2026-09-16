// src/pages/llms.txt.ts
// Machine-readable overview of brunoarruda.com for AI agents and crawlers.

import siteData from "@config/siteData.json";
import { localeMeta, localizePath, locales } from "@i18n";
import { entrySlug } from "@i18n/content";
import { getResolvedLabs } from "@js/labs";
import { getResolvedPosts, getSortedTopics } from "@js/posts";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site, url }) => {
  const base = site ?? url;
  const absolute = (path: string): string => new URL(path, base).href;

  const lines = [
    `# ${siteData.name}`,
    "",
    `> ${siteData.description}`,
    "",
    "brunoarruda.com is a personal professional website focused on AWS cloud security, secure architecture, infrastructure, and hands-on technical learning.",
    "",
  ];

  const core: [string, string][] = [
    ["/", "overview of the site, latest technical content, topics, and professional focus"],
    ["/blog/", "technical articles on AWS cloud security, architecture, infrastructure, and implementation"],
    ["/labs/", "hands-on AWS cloud security labs covering architecture, implementation, validation, and security controls"],
    ["/topics/", "technical content organized by cloud security domain"],
    ["/about/", "Bruno Arruda's professional background, technical experience, and cloud security direction"],
    ["/contact/", "professional contact information and links to LinkedIn and GitHub"],
    ["/legal/", "publication, copyright, external resources, and reporting information"],
    ["/privacy/", "information about privacy and handling of personal and technical data"],
  ];

  for (const locale of locales) {
    lines.push(`## Core pages (${localeMeta[locale].label})`, "");
    for (const [path, note] of core) {
      lines.push(`- ${absolute(localizePath(path, locale))}: ${note}`);
    }
    lines.push("");
  }

  for (const locale of locales) {
    const topics = await getSortedTopics(locale);
    if (topics.length === 0) continue;

    lines.push(`## Cloud security topics (${localeMeta[locale].label})`, "");

    for (const topic of topics) {
      const href = absolute(localizePath(`/topics/${entrySlug(topic.id)}/`, locale));
      lines.push(`- [${topic.data.name}](${href}): ${topic.data.description}`);
    }

    lines.push("");
  }

  for (const locale of locales) {
    const labs = (await getResolvedLabs(locale)).slice(0, 10);
    if (labs.length === 0) continue;

    lines.push(`## Latest labs (${localeMeta[locale].label})`, "");

    for (const { lab, slug } of labs) {
      const href = absolute(localizePath(`/labs/${slug}/`, locale));
      lines.push(`- [${lab.data.title}](${href}): ${lab.data.description}`);
    }

    lines.push("");
  }

  for (const locale of locales) {
    const posts = (await getResolvedPosts(locale)).slice(0, 10);
    if (posts.length === 0) continue;

    lines.push(`## Latest articles (${localeMeta[locale].label})`, "");

    for (const { post, slug } of posts) {
      const href = absolute(localizePath(`/blog/${slug}/`, locale));
      lines.push(`- [${post.data.title}](${href}): ${post.data.description}`);
    }

    lines.push("");
  }

  lines.push(
    "## Machine-readable",
    "",
    `- [Sitemap](${absolute("/sitemap-index.xml")}): every indexable URL on this site`,
    ...locales.map(
      (locale) =>
        `- [RSS feed, ${localeMeta[locale].label}](${absolute(localizePath("/rss.xml", locale))}): published technical articles in RSS 2.0 format`,
    ),
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};