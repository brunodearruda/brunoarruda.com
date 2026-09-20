<!-- README.md - public overview of Bruno Arruda's Cloud Security portfolio and its implementation. -->

# Bruno Arruda - Cloud Security Portfolio

A security-first personal website and technical portfolio built with Astro and
deployed on AWS. The project documents practical cloud security architecture,
implementation decisions, secure CI/CD, operational evidence, and explicit
trade-offs.

**[Live Website](https://brunoarruda.com)** · **[Architecture Article](https://brunoarruda.com/blog/how-i-designed-a-security-first-aws-architecture/)** · **[Hands-on LAB](https://brunoarruda.com/labs/building-securing-static-website-aws/)**

## Architecture

The website separates public content delivery from deployment identity. These
paths meet at the AWS resources they need, but they do not share permissions or
trust assumptions.

**Public delivery:** User -> Route 53 with DNSSEC -> CloudFront -> Origin Access
Control -> private S3 origin

**Deployment identity:** GitHub Actions -> OpenID Connect -> AWS Security Token
Service -> scoped IAM role -> S3 deployment and CloudFront invalidation

![Two trust paths in Bruno Arruda's AWS website architecture: public delivery through Route 53, CloudFront, Origin Access Control and private S3, and deployment identity through GitHub Actions, OpenID Connect, AWS STS and a scoped IAM role.][architecture-diagram]

CloudFront is the intended public entry point. Amazon S3 is a private origin,
not a public static website endpoint. Monitoring and audit evidence provide
visibility around both paths without making them equivalent trust domains.

Read the [architecture article](https://brunoarruda.com/blog/how-i-designed-a-security-first-aws-architecture/)
for the reasoning and trade-offs, or the [hands-on LAB](https://brunoarruda.com/labs/building-securing-static-website-aws/)
for implementation details and validation evidence.

## Security Design

The implemented design includes:

- a private S3 origin with Block Public Access and no S3 website endpoint;
- CloudFront Origin Access Control for service-to-service origin access;
- Route 53 authoritative DNS with DNSSEC;
- TLS through AWS Certificate Manager and HTTP-to-HTTPS redirection;
- security headers and a hash-based Content Security Policy for the reviewed
  executable inline script;
- AWS WAF in monitor mode to establish visibility before enforcement;
- CloudWatch alarms with an SNS notification path;
- a multi-region CloudTrail trail for management-event audit records; and
- GitHub Actions OIDC, AWS STS temporary credentials, and a scoped deployment
  role following a least-privilege approach.

These controls have deliberate boundaries. WAF monitor mode does not
automatically block requests. DNSSEC authenticates tested DNS responses but is
not universal protection against every DNS failure. CSP reduces browser-side
risk but does not prevent every form of cross-site scripting. The IAM policy is
scoped to required deployment operations rather than claimed as a formally
proven minimum. CloudTrail records the configured management events, not every
possible AWS event, and this project does not claim that a manual log-integrity
validation operation was executed.

## Secure CI/CD

The public [deployment workflow](.github/workflows/deploy.yml) uses this path:

```text
GitHub Actions -> GitHub OIDC -> AWS STS -> scoped IAM role
               -> S3 deployment -> CloudFront invalidation
```

No long-lived AWS access keys are stored in GitHub for this deployment. GitHub
presents a signed OIDC identity, and AWS STS issues temporary credentials after
the configured trust conditions are satisfied.

Before AWS authentication, the workflow installs locked dependencies, runs
project checks and linting, builds the site, and compares the generated home
page's executable inline-script hash with the reviewed CSP hash. This is a
focused drift guard for that home-page script. It does not validate every
generated page or independently verify the complete deployed CSP.

## Validation and Operational Evidence

Representative point-in-time validation recorded during the implementation:

- a tested direct S3 origin request returned `403 Forbidden` while CloudFront
  continued serving the website;
- a tested validating resolver authenticated the DNSSEC response;
- expected navigation, search, theme, and refresh behavior continued under the
  reviewed CSP without relevant browser-console violations;
- a real CloudWatch alarm state transition executed the SNS notification path;
  and
- a production deployment completed through GitHub OIDC and temporary AWS
  credentials.

These results demonstrate the tested properties at the time of validation.
They are not permanent guarantees. The LAB contains the detailed evidence,
limitations, troubleshooting record, and accepted risks.

## Technical Case Study

- **[How I Designed a Security-First AWS Architecture for My Website](https://brunoarruda.com/blog/how-i-designed-a-security-first-aws-architecture/)**
  explains the architecture reasoning, trust boundaries, decisions, and
  trade-offs.
- **[Building and Securing a Production Static Website on AWS](https://brunoarruda.com/labs/building-securing-static-website-aws/)**
  documents the implementation, validation, troubleshooting, operational
  evidence, and accepted limitations.

## Tech Stack

- **Website:** Astro 7, TypeScript, Tailwind CSS 4, Markdown and MDX
- **AWS delivery:** Amazon S3, Amazon CloudFront, Amazon Route 53, DNSSEC, and
  AWS Certificate Manager
- **Security and operations:** AWS WAF, CloudWatch, SNS, CloudTrail, IAM, and
  AWS STS
- **Delivery automation:** GitHub Actions and GitHub OIDC
- **Quality controls:** Astro type checking, repository-specific linting,
  self-checks, static production builds, and a responsive render bench

The repository contains the website source and deployment workflow. It does
not claim that the complete AWS environment is managed as Infrastructure as
Code.

## Repository Structure

```text
.github/workflows/   AWS deployment workflow and CI guardrails
src/
  assets/            Approved site, Article, LAB, and social images
  components/        Astro sections and reusable UI components
  data/posts/        Long-form Articles in Markdown or MDX
  data/labs/         Technical Labs in Markdown or MDX
  pages/             Static routes and discovery endpoints
  styles/            Design tokens, global styles, and article prose
public/              Favicons and global social metadata images
docs/                Engineering and implementation conventions
scripts/             Build, validation, asset, and render tooling
wiki/                Maintained subsystem notes and change journal
```

## Run Locally

Node.js 22.18 or newer and pnpm are required.

```bash
corepack enable
pnpm install
pnpm dev
```

The local development server is available at `http://localhost:4321` by
default.

Run the project quality checks with:

```bash
pnpm check
pnpm lint:house
pnpm test
pnpm build
```

`pnpm preview` serves the production build locally after `pnpm build`.

## Security and Privacy

Public examples and documentation intentionally exclude sensitive
infrastructure identifiers, credentials, tokens, and secrets. The repository
demonstrates selected architecture and deployment controls rather than
providing a complete export of the AWS environment.

## Project Origins

This website started from [Reef](https://github.com/alohapixelcom-hash/reef),
an open-source Astro theme by [Aloha Pixel](https://alohapixel.app). Reef is
provided under the MIT license.

Bruno adapted the theme into this Cloud Security portfolio and implemented the
AWS architecture, security content, technical LAB, deployment workflow, and
project-specific validation represented in this repository. The upstream
theme's authorship and license remain credited; this repository does not claim
ownership of the original Reef work.

## License and Third-Party Attribution

The upstream software license is preserved in [LICENSE](LICENSE). Additional
licensing context and retained upstream notices are documented in
[NOTICE.md](NOTICE.md). Dependency, font, and other third-party details are
recorded in [THIRD-PARTY.md](THIRD-PARTY.md), with upstream media provenance in
[PHOTOS.md](PHOTOS.md).

## Author

**Bruno Arruda**<br>
Cloud Security & Infrastructure Professional

- [Website](https://brunoarruda.com)
- [LinkedIn](https://www.linkedin.com/in/brunodearruda)
- [GitHub](https://github.com/brunodearruda)

[architecture-diagram]: src/assets/articles/how-i-designed-a-security-first-aws-architecture/security-first-aws-architecture.png
