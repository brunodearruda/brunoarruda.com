// src/config/legalData.json.ts
// Privacy information for Bruno Arruda's personal professional website.

import type { Locale } from "@i18n";
import type { LegalDocument } from "./types/configDataTypes";

type LegalPages = {
  privacy: LegalDocument;
};

const en: LegalPages = {
  privacy: {
    title: "Privacy policy",
    description:
      "How privacy and personal information are handled when you visit brunoarruda.com.",
    lastUpdated: "2026-09-13",

    sections: [
      {
        title: "About this website",
        body:
          "brunoarruda.com is the personal professional website of Bruno Arruda. It publishes technical articles, cloud security labs, professional information, and links to external platforms such as GitHub and LinkedIn.",
      },
      {
        title: "Information collected by this website",
        body:
          "This website does not provide user accounts, subscriptions, payments, or a newsletter. The website itself does not ask you to submit personal information through forms.",
      },
      {
        title: "Contact",
        body:
          "If you choose to contact me by email or through an external platform such as LinkedIn, the information you provide is used only to respond to your message or continue the professional conversation you initiated.",
      },
      {
        title: "Hosting and technical data",
        body:
          "Like most websites, the infrastructure used to deliver this site may process technical information required to serve and protect web traffic, such as IP addresses, request information, and security logs. This information may be processed by the infrastructure providers used to operate the website.",
      },
      {
        title: "Cookies and analytics",
        body:
          "This website does not currently use advertising cookies or third-party analytics for visitor tracking. If analytics or other technologies that materially change this practice are introduced in the future, this policy will be updated accordingly.",
      },
      {
        title: "External links",
        body:
          "This website contains links to third-party services such as GitHub and LinkedIn. When you follow an external link, the privacy practices of that service apply and are outside the control of this website.",
      },
      {
        title: "Your privacy rights",
        body:
          "If you have contacted me and want to ask about personal information you previously provided, you can contact me using the details available on the Contact page. Applicable data protection rights depend on the circumstances and relevant law.",
      },
      {
        title: "Changes to this policy",
        body:
          "This policy may be updated when the website, its infrastructure, or its privacy practices change. The date shown on this page indicates the latest revision.",
      },
    ],
  },
};

const byLocale: Record<Locale, LegalPages> = { en };

export function getLegalData(locale: Locale): LegalPages {
  return byLocale[locale];
}