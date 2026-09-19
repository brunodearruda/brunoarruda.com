// src/js/metadata.selfcheck.ts - verifie la priorite sociale, couverture, puis repli.
import assert from "node:assert/strict";
import { selectMetadataImage, type MetadataImage } from "./metadata.ts";

const social = { src: "/social.png", alt: "Social" } satisfies MetadataImage;
const cover = { src: "/cover.png", alt: "Cover" } satisfies MetadataImage;
const fallback = { src: "/default.png", alt: "Default" } satisfies MetadataImage;

assert.deepEqual(
  selectMetadataImage({ social, cover, fallback }),
  social,
  "social image takes precedence over cover and fallback",
);
assert.deepEqual(
  selectMetadataImage({ cover, fallback }),
  cover,
  "cover takes precedence when no social image exists",
);
assert.deepEqual(
  selectMetadataImage({ fallback }),
  fallback,
  "global fallback is used when no entry image exists",
);

console.log("metadata self-check: 3 assertions passed");
