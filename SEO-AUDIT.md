# Concrete Slab Calculator — SEO Audit

Audit branch: `seo/technical-content-2026`  
Primary URL: https://concrete-slab-calculator-ivory.vercel.app/  
Primary keyword: concrete slab calculator

## Existing strengths
- Homepage already has UTF-8, English language, viewport, a focused title, meta description, canonical, robots directive, Open Graph tags, one primary H1, semantic sections, and descriptive internal links.
- Calculator JavaScript was left untouched so the existing calculation logic and displayed results remain unchanged.
- Existing project guides and legal/information pages were retained.
- No fake reviews, ratings, keyword stuffing, hidden text, or link schemes were introduced.

## Findings addressed in this branch
1. Expanded the homepage with a comprehensive, human-readable concrete planning guide covering calculator use, formula, examples, thickness considerations, bag yields, waste, reinforcement, cost, mistakes, and related guides.
2. Expanded the FAQ from six to eight questions and made the FAQ structured data match the visible FAQ text.
3. Reworked homepage JSON-LD into one graph containing SoftwareApplication, Organization, WebSite, BreadcrumbList, HowTo, and FAQPage.
4. Added a lightweight SVG favicon and web manifest.
5. Added a custom 404 page.
6. Added missing supporting guides for concrete footing, bag quantity, rebar planning, and concrete slab cost.
7. Added internal links from the homepage to the new supporting guides.
8. Added an explicit noindex directive to the 404 page.

## Deliberately not changed
- `sitemap.xml` was not modified, per the project instruction to leave the sitemap alone.
- Existing calculator HTML inputs, JavaScript calculation logic, units, waste options, bag yields, and result calculations were not changed.
- Existing visual design/CSS was not redesigned.
- Google Search Console verification and Analytics IDs were not invented; placeholders must be supplied before adding live IDs.

## Technical notes
- The site is currently using the Vercel URL as the canonical URL in the homepage and the newer SEO pages.
- The repository also contains an older GitHub Pages sitemap/robots URL. Because the sitemap was explicitly frozen, it is not changed in this branch.
- SoftwareApplication structured data is provided without fabricated ratings/reviews.
- Lighthouse should be run against the deployed preview after the branch is deployed; code inspection alone cannot honestly claim a 90+ score.
