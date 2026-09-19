// src/js/topics.ts - regroupe les ressources publiees par sujet sans melanger leurs types.

export interface TopicLinkedResource {
  topicSlug: string;
}

export interface TopicContent<
  Article extends TopicLinkedResource,
  Lab extends TopicLinkedResource,
> {
  articles: Article[];
  labs: Lab[];
  articleCount: number;
  labCount: number;
  totalCount: number;
  hasContent: boolean;
}

/**
 * Construit la vue d'un sujet depuis les sorties deja filtrees des resolvers.
 * Les articles et Labs restent separes ; seuls les comptes sont additionnes.
 */
export function topicContentFor<
  Article extends TopicLinkedResource,
  Lab extends TopicLinkedResource,
>(
  topicSlug: string,
  articles: readonly Article[],
  labs: readonly Lab[],
): TopicContent<Article, Lab> {
  const topicArticles = articles.filter((entry) => entry.topicSlug === topicSlug);
  const topicLabs = labs.filter((entry) => entry.topicSlug === topicSlug);
  const articleCount = topicArticles.length;
  const labCount = topicLabs.length;
  const totalCount = articleCount + labCount;

  return {
    articles: topicArticles,
    labs: topicLabs,
    articleCount,
    labCount,
    totalCount,
    hasContent: totalCount > 0,
  };
}
