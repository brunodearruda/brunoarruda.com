// src/config/siteData.json.ts
import type { SiteDataProps } from "./types/configDataTypes";

const siteData: SiteDataProps = {
  name: "Bruno Arruda",
  title: "Bruno Arruda | AWS Cloud Security",
  description:
    "Practical insights, labs, and real-world solutions focused on AWS cloud security, secure architecture, and infrastructure.",

  useViewTransitions: true,

  author: {
    contentId: "bruno-arruda",
    name: "Bruno Arruda",
    email: "contato@brunoarruda.com",
    linkedin: "https://www.linkedin.com/in/brunodearruda",
    github: "https://github.com/brunodearruda",
  },

  defaultImage: {
    src: "/og/default.png",
    alt: "Bruno Arruda | AWS Cloud Security",
  },
};

export default siteData;
