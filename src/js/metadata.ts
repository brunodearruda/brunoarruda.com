// src/js/metadata.ts - selection pure des images de partage, sans dependance au rendu Astro.

export interface MetadataImage {
  src: string;
  alt: string;
}

export interface MetadataImageCandidates {
  social?: MetadataImage;
  cover?: MetadataImage;
  fallback: MetadataImage;
}

/** La carte sociale explicite gagne, puis la couverture, puis le repli global. */
export function selectMetadataImage(candidates: MetadataImageCandidates): MetadataImage {
  return candidates.social ?? candidates.cover ?? candidates.fallback;
}
