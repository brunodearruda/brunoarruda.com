// src/content.config.ts - les quatre collections de Reef (posts, labs, authors, topics), chargees par glob depuis src/data.
//
// Le contenu est range par langue : src/data/posts/en/... et src/data/posts/fr/...
// Le loader glob fabrique donc des id prefixes ("en/mon-article"), ce qui donne
// deux garanties gratuitement : filtrer une langue est un simple prefixe, et
// deux versions d'un meme article portent le meme slug une fois le prefixe
// retire, ce qui permet au selecteur de langue de pointer vers la traduction
// exacte de l'article qu'on lit. Les helpers vivent dans src/i18n/content.ts.
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

// Les articles. Du Markdown ou du MDX dans src/data/posts/<langue>/.
const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/posts" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        // Renseignee uniquement si l'article a ete revu apres publication : le
        // template affiche alors les deux dates, ce qui est plus honnete que de
        // remplacer silencieusement la premiere.
        updatedDate: z.coerce.date().optional(),
        author: reference("authors"),
        // Un sujet, pas une categorie fourre-tout. La reference est validee au
        // build : un sujet mal orthographie casse la construction au lieu de
        // produire une page d'archive vide en production.
        topic: reference("topics"),
        tags: z.array(z.string()).default([]),
        // image() donne a Astro de quoi optimiser et connaitre les dimensions,
        // ce qui evite le decalage de mise en page au chargement.
        cover: image().optional(),
        coverAlt: z.string().optional(),

        // Carte sociale facultative, independante de la couverture visible.
        socialImage: image().optional(),
        socialImageAlt: z.string().optional(),

        // Un seul article a la une par langue. Le garde-fou est dans la page
        // d'accueil, pas ici : le schema ne peut pas compter les autres fichiers.
        featured: z.boolean().default(false),
        // Un brouillon reste constructible en local mais sort des listes, du RSS
        // et du llms.txt, et part en noindex.
        draft: z.boolean().default(false),
      })
      .superRefine((data, ctx) => {
        if (data.socialImage && data.socialImageAlt === undefined) {
          ctx.addIssue({
            code: "custom",
            path: ["socialImageAlt"],
            message: "socialImageAlt doit etre renseigne quand socialImage est present",
          });
        }
      }),
});

// Les Labs techniques et les projets pratiques de securite cloud. Ils restent
// separes des articles car ils portent une architecture, une mise en oeuvre,
// une validation et les decisions de securite qui relient les trois.
const labs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/labs" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),

        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),

        author: reference("authors"),
        topic: reference("topics"),

        tags: z.array(z.string()).default([]),

        // Services AWS directement impliques dans le Lab.
        awsServices: z.array(z.string()).default([]),
        // Sous-ensemble editorial facultatif pour garder l'en-tete lisible.
        heroServices: z.array(z.string().min(1)).min(1).max(6).optional(),

        // Principes ou controles de securite demontres par le Lab.
        securityControls: z.array(z.string()).default([]),
        heroSecurityControls: z.array(z.string().min(1)).min(1).max(6).optional(),

        cover: image().optional(),
        coverAlt: z.string().optional(),

        // Carte sociale facultative, independante de la couverture visible.
        socialImage: image().optional(),
        socialImageAlt: z.string().optional(),

        // Preuves et demonstrations externes.
        github: z.url().optional(),
        video: z.url().optional(),

        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      })
      .superRefine((data, ctx) => {
        // Une couverture impose une decision explicite : texte utile, ou chaine
        // vide seulement si l'image est vraiment decorative.
        if (data.cover && data.coverAlt === undefined) {
          ctx.addIssue({
            code: "custom",
            path: ["coverAlt"],
            message: "coverAlt doit etre renseigne quand cover est present",
          });
        }
        if (data.socialImage && data.socialImageAlt === undefined) {
          ctx.addIssue({
            code: "custom",
            path: ["socialImageAlt"],
            message: "socialImageAlt doit etre renseigne quand socialImage est present",
          });
        }
      }),
});

// Les auteurs : un JSON par personne, reference par les articles.
const authors = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      avatar: image().optional(),
      links: z
        .array(z.object({ label: z.string(), href: z.url() }))
        .default([]),
    }),
});

// Les sujets. Chacun a sa page d'archive, sa couleur d'accent et sa propre
// description : une archive sans texte est une page qui ne se referencera
// jamais, et un blog serieux merite mieux que douze listes nues.
const topics = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/topics" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    // Un nom semantique que les composants traduisent en tokens, jamais une
    // couleur en dur : rebrander ne doit pas obliger a rouvrir le contenu.
    accent: z.enum(["coral", "reef", "ink"]),
    // Ordre d'affichage dans la navigation des sujets. Egalites triees par nom.
    order: z.number().default(0),
  }),
});

export const collections = { posts, labs, authors, topics };
