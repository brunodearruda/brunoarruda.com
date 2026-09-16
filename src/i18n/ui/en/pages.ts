// src/i18n/ui/en/pages.ts - dictionnaire anglais, tranche "pages" : la copie propre a chaque page du site.
//
// Une page est un assemblage de sections, jamais un endroit ou l'on ecrit des
// phrases : les titres de hero, les descriptions meta et les libelles de
// formulaire vivent ici, et les composants n'affichent que ce qu'on leur passe.

export const enPages = {
  // --- Accueil -------------------------------------------------------------
 home: {
  metaTitle: "Bruno Arruda | AWS Cloud Security",

  metaDescription:
    "Practical AWS cloud security labs, secure architecture insights, and real-world guidance for building more secure and resilient cloud environments.",

  eyebrow: "SECURE ARCHITECTURE. REAL IMPACT.",

  heroTitle: "Build securely.\nGo further.",

  heroLede:
    "Practical insights, hands-on labs, and real-world guidance on AWS cloud security, secure architecture and infrastructure.",

  heroPrimary: "Explore the blog",

  heroSecondary: "Browse labs",

  heroSupport: "LEARN · BUILD · DEFEND · IMPROVE",

  values: [
    {
      title: "AWS Focus",
      description: "Real-world cloud security",
    },
    {
      title: "Practical Labs",
      description: "Hands-on, step by step",
    },
    {
      title: "Technical Writing",
      description: "Deep dives and guides",
    },
    {
      title: "Security Mindset",
      description: "Build, defend, improve",
    },
  ],

  latestEyebrow: "LATEST INSIGHTS",

  latestTitle: "Latest from the blog",

  latestLede:
    "Technical articles, tutorials, and insights on cloud security and infrastructure.",

  latestCta: "View all articles",

  labsEyebrow: "HANDS-ON LEARNING",

  labsTitle: "Popular labs",

  labsLede:
    "Step-by-step labs to build practical skills with AWS security.",

  labsCta: "View all labs",

  topicsEyebrow: "EXPLORE BY TOPIC",

  topicsTitle: "Browse topics",

  topicsLede:
    "Dive into key areas of cloud security and infrastructure.",

  topicsCta: "View all topics",

  aboutEyebrow: "A MORE SECURE CLOUD",

  aboutTitle: "Practical knowledge.\nStronger systems.",

  aboutLede:
    "My goal is to make cloud security simpler and more practical, sharing real-world experience, hands-on labs and clear guidance for professionals who want to build and operate more secure systems on AWS.",

  aboutCta: "About me",
},

  // --- A propos ------------------------------------------------------------
  about: {
    metaTitle: "Bruno Arruda | Cloud Security & Infrastructure",
    metaDescription:
      "Infrastructure and security professional building deeper expertise in AWS cloud security through hands-on labs, architecture, and practical implementation.",
    eyebrow: "ABOUT",
    breadcrumb: "About",
    title: "Infrastructure experience. Cloud security direction.",
    accent: "Cloud security",
    lede:
      "I’m Bruno Arruda, an infrastructure and security professional based in Ireland, building on years of experience in networks, systems, and information security to focus on AWS cloud security.",
    storyTitle: "Built from infrastructure up",
    storyAccent: "infrastructure",
    storyParagraphs: [
      "My career in technology was built from the infrastructure layer up. I started working with networks and systems and progressively moved deeper into infrastructure and information security, working across enterprise environments where reliability, availability, and security were part of everyday operations.",
      "Over the years, my work has included network security, Check Point firewalls, vulnerability management, Windows and Linux environments, virtualization, backup infrastructure, ISO 27001 security controls, and hybrid environments spanning on-premises infrastructure and AWS.",
      "Later, my work expanded into modern infrastructure, including Docker, Kubernetes, Rancher, CI/CD, and highly available production environments. That experience changed the way I look at security: not as something added after infrastructure is built, but as part of how systems should be designed and operated.",
      "Today, I’m bringing that background into AWS cloud security. My focus is on developing deeper cloud architecture and security expertise through hands-on labs, real implementations, and continuous study - then documenting what I learn here.",
    ],
    valuesTitle: "How I approach the work",
    valuesAccent: "work",
    valuesLede: "A practical approach to developing cloud security expertise: understand the fundamentals, build the solution, and document what matters.",
    values: [
      {
        title: "Learn deeply",
        text: "Understand the architecture, services, security principles, and trade-offs behind a solution before implementing it.",
      },
      {
        title: "Build practically",
        text: "Turn concepts into hands-on AWS environments, security configurations, architectures, and real-world technical scenarios.",
      },
      {
        title: "Document clearly",
        text: "Capture architecture decisions, implementation steps, findings, and lessons learned so the work can be understood, reviewed, and improved.",
      },
    ],
    backgroundTitle: "Professional background",
backgroundAccent: "background",
backgroundLede:
  "Experience built across infrastructure, network security, modern platforms, and cloud environments.",

backgroundAreas: [
  {
    title: "Infrastructure & Operations",
    items: ["Networks", "Windows & Linux", "VMware", "Veeam", "High Availability"],
  },
  {
    title: "Security",
    items: ["Network Security", "Check Point", "Vulnerability Management", "ISO 27001"],
  },
  {
    title: "Modern Infrastructure",
    items: ["Docker", "Kubernetes", "Rancher", "CI/CD"],
  },
  {
    title: "Cloud",
    items: ["AWS", "Hybrid Infrastructure", "Cloud Architecture", "Cloud Security"],
  },
],

backgroundYears: "15+ years",
backgroundYearsLede: "working across technology infrastructure and security.",
    
    contactTitle: "Let’s connect",
    contactLede:
      "I’m always interested in connecting with people working in cloud, security, and infrastructure - whether it’s to discuss technical challenges, professional opportunities, or future collaborations.",
    contactCta: "Get in touch",
  },

  // --- Contact -------------------------------------------------------------
  // Le formulaire est complet et non monte : le theme ne choisit pas de
  // prestataire d'envoi a la place de son utilisateur. La copie, elle, est prete.
  contact: {
  metaTitle: "Contact | Bruno Arruda",
  metaDescription:
    "Get in touch with Bruno Arruda to discuss cloud security, infrastructure, professional opportunities, or potential collaborations.",

  eyebrow: "CONTACT",
  breadcrumb: "Contact",

  title: "Let’s talk cloud, security, and infrastructure.",
  accent: "security",

  lede:
    "Whether you’d like to discuss a professional opportunity, a technical challenge, or potential collaboration, feel free to get in touch.",

  emailTitle: "Email",
  emailLede:
    "The best way to reach me directly for professional enquiries and conversations.",
  emailCta: "Send an email",

  linkedinTitle: "LinkedIn",
  linkedinLede:
    "Connect with me for professional networking, opportunities, and conversations around cloud and security.",
  linkedinCta: "Connect on LinkedIn",

  githubTitle: "GitHub",
  githubLede:
    "Explore my labs, code, technical projects, and the practical work behind this site.",
  githubCta: "View GitHub",
},

  // --- Sujets --------------------------------------------------------------
  topics: {
    metaTitle: "Cloud Security Topics | Bruno Arruda",
    metaDescription:
      "Explore practical AWS cloud security articles and labs covering identity, network security, detection and response, data protection, and secure architecture.",
    eyebrow: "TOPICS",
    breadcrumb: "Topics",
    title: "Explore cloud security by topic",
    accent: "cloud security",
    lede:
      "Browse practical articles and labs organized around the core areas of AWS cloud security, from identity and network protection to detection, data protection, and secure architecture.",
    /** {count} vient du nombre d'articles publies dans le sujet. */
    countLabel: "{count} posts",
    countOne: "1 post",
    readTopic: "Read this topic",
    allTopics: "All topics",
    emptyTitle: "Nothing filed here yet",
    emptyLede: "The topic is open and the first post is still a draft. The RSS feed will say when it lands.",
  },

  // --- Recherche -----------------------------------------------------------
  // La recherche tourne dans le navigateur sur un index construit au build :
  // zero requete, zero service tiers, et le theme reste 100% statique.
  search: {
    metaTitle: "Search",
    metaDescription:
      "Search technical articles by title, summary, topic, or tag. Search runs locally in your browser without sending queries to a server.",
    eyebrow: "Search",
    title: "Find it again",
    accent: "again",
    lede:
      "Search covers titles, summaries, topics and tags. It runs in your browser, so nothing leaves the page and it keeps working offline once loaded.",
    placeholder: "Search posts, topics and tags",
    label: "Search the blog",
    shortcut: "Press / to search",
    clear: "Clear search",
    /** Affiche avant la premiere frappe. {count} est la taille de l'index. */
    prompt: "Start typing to search {count} posts.",
    resultsLabel: "Search results",
    countLabel: "{count} results",
    countOne: "1 result",
    inTopic: "in {topic}",
    noResultsTitle: "Nothing matches {query}",
    noResultsLede: "Try a shorter word, or take the long way round and browse by topic.",
    noResultsCta: "Browse topics",
  },

  // --- 404 -----------------------------------------------------------------
  notFound: {
    metaTitle: "Page not found",
    metaDescription: "There is nothing at this address. The archive and the search box both still work.",
    code: "404",
    title: "Nothing at this address",
    accent: "Nothing",
    lede:
      "The link is wrong, or the post moved and we failed to leave a redirect. Neither is your problem. Two ways back, below.",
    homeCta: "Back to the home page",
    postsCta: "Browse all posts",
    searchCta: "Search the blog",
  },

  // --- Mentions legales ----------------------------------------------------
  legal: {
  eyebrow: "LEGAL",
  title: "Legal notice",
  description:
    "Information about the publication, operation, and use of brunoarruda.com.",
  lastUpdated: "Last updated on {date}",
  toc: "On this page",
  backToTop: "Back to top",
  sections: [
    {
      title: "Publisher",
      body:
        "brunoarruda.com is a personal professional website published and maintained by Bruno Arruda, based in Ireland. For enquiries related to this website, please use the contact information available on the Contact page.",
    },
    {
      title: "Purpose of this website",
      body:
        "This website publishes professional information, technical articles, hands-on labs, and educational content related to cloud computing, infrastructure, and information security. The content is provided for informational and educational purposes.",
    },
    {
      title: "Hosting",
      body:
        "This website is delivered using cloud infrastructure. Technical hosting and delivery providers may change as the website evolves. Information about the processing of technical data is available in the Privacy Policy.",
    },
    {
      title: "Copyright and reuse",
      body:
        "Unless otherwise stated, original articles, written content, diagrams, and other original material published on this website are © Bruno Arruda. Brief quotations with appropriate attribution and a link to the original page are welcome. Code and projects linked through GitHub may be subject to separate licences specified in their respective repositories.",
    },
    {
      title: "External resources",
      body:
        "This website may link to third-party websites, documentation, repositories, and services. These external resources are provided for reference and convenience, and their content and availability are outside the control of this website.",
    },
    {
      title: "Reporting a problem",
      body:
        "If you identify a factual error, broken link, copyright concern, or other issue with content published on this website, please get in touch using the Contact page.",
    },
  ],
},
} as const;
