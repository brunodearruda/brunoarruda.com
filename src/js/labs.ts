// src/js/labs.ts
// Resolves published technical labs and their related author/topic data.

import type { Locale } from "@i18n";
import { entrySlug, getLocalizedCollection } from "@i18n/content";
import { getEntry, type CollectionEntry } from "astro:content";

export interface ResolvedLab {
  lab: CollectionEntry<"labs">;
  author: CollectionEntry<"authors">;
  topic: CollectionEntry<"topics">;

  /** Lab slug without the locale prefix. */
  slug: string;

  /** Topic slug without the locale prefix. */
  topicSlug: string;
}

/**
 * Returns all published labs for a locale, newest first.
 *
 * Draft labs remain available locally for development but are excluded
 * from public listings.
 */
export async function getResolvedLabs(locale: Locale): Promise<ResolvedLab[]> {
  const labs = (
    await getLocalizedCollection("labs", locale, ({ data }) => data.draft !== true)
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return Promise.all(
    labs.map(async (lab) => {
      const author = await getEntry(lab.data.author);

      if (!author) {
        throw new Error(`Unknown author "${lab.data.author.id}" in "${lab.id}"`);
      }

      const topic = await getEntry(lab.data.topic);

      if (!topic) {
        throw new Error(`Unknown topic "${lab.data.topic.id}" in "${lab.id}"`);
      }

      return {
        lab,
        author,
        topic,
        slug: entrySlug(lab.id),
        topicSlug: entrySlug(topic.id),
      };
    }),
  );
}
