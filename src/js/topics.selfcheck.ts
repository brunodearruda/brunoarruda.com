// src/js/topics.selfcheck.ts - verifie l'agregation des articles et Labs par sujet.
import assert from "node:assert/strict";
import { topicContentFor, type TopicLinkedResource } from "./topics.ts";

type Candidate = TopicLinkedResource & {
  id: string;
  draft?: boolean;
};

const topic = "secure-architecture";
const article = { id: "article", topicSlug: topic } satisfies Candidate;
const lab = { id: "lab", topicSlug: topic } satisfies Candidate;

function published(entries: readonly Candidate[]): Candidate[] {
  return entries.filter((entry) => entry.draft !== true);
}

const empty = topicContentFor(topic, [], []);
assert.deepEqual(
  [empty.articleCount, empty.labCount, empty.totalCount, empty.hasContent],
  [0, 0, 0, false],
  "a topic without published resources is empty",
);

const articleOnly = topicContentFor(topic, [article], []);
assert.deepEqual(
  [articleOnly.articleCount, articleOnly.labCount, articleOnly.totalCount, articleOnly.hasContent],
  [1, 0, 1, true],
  "one article is one topic resource",
);

const labOnly = topicContentFor(topic, [], [lab]);
assert.deepEqual(
  [labOnly.articleCount, labOnly.labCount, labOnly.totalCount, labOnly.hasContent],
  [0, 1, 1, true],
  "one Lab is one topic resource",
);

const mixed = topicContentFor(topic, [article], [lab]);
assert.deepEqual(
  [mixed.articleCount, mixed.labCount, mixed.totalCount, mixed.hasContent],
  [1, 1, 2, true],
  "articles and Labs contribute to the same topic total",
);

const drafts = topicContentFor(
  topic,
  published([article, { id: "draft-article", topicSlug: topic, draft: true }]),
  published([lab, { id: "draft-lab", topicSlug: topic, draft: true }]),
);
assert.deepEqual(
  [drafts.articles.map(({ id }) => id), drafts.labs.map(({ id }) => id), drafts.totalCount],
  [["article"], ["lab"], 2],
  "the published resolver boundary keeps drafts out of topic resources",
);

const unrelated = topicContentFor(topic, [{ id: "other", topicSlug: "identity-access" }], []);
assert.equal(unrelated.hasContent, false, "resources from another topic do not leak into this one");

console.log("topics self-check: 6 assertions passed");
