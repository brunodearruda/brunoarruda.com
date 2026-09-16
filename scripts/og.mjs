#!/usr/bin/env node
/**
 * scripts/og.mjs - genere les images Open Graph brandees du site, au build.
 *
 * Usage :
 *   pnpm og            genere public/og/*.png (1200x630) depuis le manifest ci-dessous
 *
 * Pourquoi un script et pas un service : zero dependance externe, zero runtime.
 * Le rendu part d'un gabarit SVG (degrade d'encre, grille, titre Space Grotesk,
 * vague aigue-marine) rasterise par sharp, deja present dans les
 * devDependencies.
 *
 * Les PNG ne sont PAS versionnes : `pnpm build` appelle ce script avant
 * `astro build`, donc un depot propre, une CI ou un `pnpm rebrand` refabriquent
 * les cartes aux couleurs du moment. C'est ce qui manquait : /og/default.png
 * repondait 404 en production.
 *
 * Personnalisation : edite PAGES ou appelle `makeOg(titre, sortie, accent)`.
 */

import { mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public/og");

// Les tokens sont lus depuis la source de verite : un rebrand repeint aussi les OG.
const tokens = readFileSync(join(ROOT, "src/styles/tokens.css"), "utf8");
const token = (name, fallback) => tokens.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1] ?? fallback;

// Les quatre couleurs de la carte viennent de la palette DE CE THEME, pas de
// celle d'un autre : un rebrand repeint donc aussi les cartes de partage.
const DEEP = token("ink-950", "#080d10");
const DEEP_MID = token("ink-900", "#101a20");
const DEEP_SOFT = token("ink-300", "#8fa6b2");
// L'accent dominant est l'aigue-marine de la maison. Le corail passe en second
// : c'est la couleur des actions, pas celle de l'identite.
const ACCENT = token("reef-400", "#3fc0e0");
const ACCENT_2 = token("coral-400", "#ff7a59");

// title : ce qui s'affiche en enorme. eyebrow : la petite ligne au-dessus.
const PAGES = [
  {
    slug: "default",
    eyebrow: "AWS Cloud Security · Secure Architecture",
    title: "Building secure AWS architectures",
  },
  {
    slug: "blog",
    eyebrow: "Blog · AWS Cloud Security",
    title: "Cloud security, from architecture to implementation",
  },
  {
    slug: "labs",
    eyebrow: "Labs · AWS Cloud Security",
    title: "Cloud security, built in practice",
  },
  {
    slug: "topics",
    eyebrow: "Topics · AWS Cloud Securitys",
    title: "Explore cloud security by topic",
  },
  {
    slug: "about",
    eyebrow: "About · Bruno Arruda",
    title: "Infrastructure experience. Cloud security direction.",
  },
  {
    slug: "contact",
    eyebrow: "Contact · Bruno Arruda",
    title: "Let's talk cloud, security, and infrastructure.",
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Coupe le titre en 1 ou 2 lignes equilibrees, sans dependre d'une mesure de police.
function twoLines(title) {
  if (title.length <= 26) return [title];
  const words = title.split(" ");
  let best = [title, ""], bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const diff = Math.abs(a.length - b.length);
    if (diff < bestDiff && a.length <= 30 && b.length <= 30) { best = [a, b]; bestDiff = diff; }
  }
  return best[1] ? best : [title];
}

function svgTemplate({ eyebrow, title }) {
  const lines = twoLines(title);
  const titleSize = lines.length === 2 ? 76 : 84;
  const firstY = lines.length === 2 ? 350 : 385;
  const text = lines
    .map((l, i) => `<text x="90" y="${firstY + i * (titleSize + 12)}" font-family="Space Grotesk, Inter Tight, Arial, sans-serif" font-weight="800" font-size="${titleSize}" letter-spacing="-2.5" fill="#ffffff">${esc(l)}</text>`)
    .join("\n  ");

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${DEEP_MID}"/>
      <stop offset="0.55" stop-color="${DEEP}"/>
      <stop offset="1" stop-color="${DEEP}"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.85" cy="0.1" r="0.7">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.1" cy="0.95" r="0.6">
      <stop offset="0" stop-color="${ACCENT_2}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${ACCENT_2}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

    <!-- Architecture Layers -->
  <g transform="translate(90 105)" fill="${ACCENT}">
    <path d="M32 0 64 16 32 32 0 16 32 0Z"/>
    <path d="M32 19 64 35 32 51 0 35 32 19Z" opacity=".78"/>
    <path d="M32 38 64 54 32 70 0 54 32 38Z" opacity=".56"/>
  </g>

  <text
    x="180"
    y="132"
    font-family="Space Grotesk, Inter Tight, Arial, sans-serif"
    font-weight="700"
    font-size="30"
    fill="#ffffff"
  >BRUNO ARRUDA</text>

  <text
    x="180"
    y="165"
    font-family="Space Grotesk, Inter Tight, Arial, sans-serif"
    font-weight="700"
    font-size="17"
    letter-spacing="5"
    fill="${ACCENT}"
  >CLOUD SECURITY</text>

  <text
    x="90"
    y="245"
    font-family="Space Grotesk, Inter Tight, Arial, sans-serif"
    font-weight="700"
    font-size="20"
    letter-spacing="4"
    fill="${DEEP_SOFT}"
  >${esc(eyebrow.toUpperCase())}</text>

  ${text}

  <line
    x1="90"
    y1="525"
    x2="190"
    y2="525"
    stroke="${ACCENT}"
    stroke-width="4"
  />

  <text
    x="1110"
    y="560"
    text-anchor="end"
    font-family="Space Grotesk, Inter Tight, Arial, sans-serif"
    font-weight="700"
    font-size="26"
    fill="${DEEP_SOFT}"
  >brunoarruda.com</text>
</svg>`;
}

export async function makeOg(page, outDir = OUT) {
  mkdirSync(outDir, { recursive: true });
  const file = join(outDir, `${page.slug}.png`);
  await sharp(Buffer.from(svgTemplate(page))).png({ compressionLevel: 9 }).toFile(file);
  return file;
}

const results = [];
for (const page of PAGES) results.push(await makeOg(page));
console.log(`${results.length} images OG generees dans public/og/ :`);
for (const f of results) console.log("  " + f.replace(ROOT + "/", ""));
