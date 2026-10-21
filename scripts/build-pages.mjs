// Generates the static pages that make the site findable: About, Services, FAQ, Contact, Privacy,
// the project list, one page per project, the sitemap, llms.txt and the project directory in the home footer.
// Plain static HTML on purpose: search engines read it without running any JavaScript.
// Usage: npm run pages
import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://lesiamon.com';
const TODAY = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
const EMAIL_WORK = 'lessy@prospergenics.com', EMAIL_PERSONAL = 'mpoelessy839@gmail.com';
const load = async (f, v) => JSON.parse(JSON.stringify(vm.runInNewContext(`${await readFile(path.join(DIST, f), 'utf8')}; ${v}`)));
const projects = await load('projects.js', 'projects');
const socials = await load('socials.js', 'socials');
const work = projects.filter(p => p.category !== 'Learning');
const config = existsSync(path.join(ROOT, 'seo.config.json')) ? JSON.parse(await readFile(path.join(ROOT, 'seo.config.json'), 'utf8')) : {};

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const abs = p => `${SITE}${p}`;
const ldScript = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

/* ───────── Shared identity, used by every page's structured data ───────── */
const PERSON = { '@type': 'Person', '@id': `${SITE}/#lessy`, name: 'Lessy Mpoe', alternateName: ['Lessy', 'Finehas Mpoe', 'Finehas Lesiamon Mpoe'], givenName: 'Finehas', familyName: 'Mpoe', url: `${SITE}/`, image: `${SITE}/assets/lessy-prospergenics-1050.webp`, jobTitle: 'Software developer and WordPress specialist', description: 'Lessy (Finehas Mpoe) is a software developer and WordPress specialist. Co-founder and trainer at Prospergenics.', email: EMAIL_WORK, worksFor: { '@id': 'https://prospergenics.com/#organization' }, knowsAbout: ['WordPress', 'Elementor', 'Web development', 'React', 'TypeScript', 'Next.js', 'AI agents', 'Workflow automation', 'n8n', 'Developer training'], sameAs: [...socials.map(s => s.url).filter(u => !u.includes('wa.me')), 'https://prospergenics.com/members/lessy/'] };
const ORG = { '@type': 'Organization', '@id': 'https://prospergenics.com/#organization', name: 'Prospergenics', url: 'https://prospergenics.com/', description: 'A software and AI development team across the Netherlands and Kenya.', founder: [{ '@id': `${SITE}/#lessy` }] };
const WEBSITE = { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Lessy', alternateName: ['Lessy Mpoe', 'Finehas Mpoe', 'lesiamon.com'], inLanguage: 'en', publisher: { '@id': `${SITE}/#lessy` } };

/* ───────── Page shell ───────── */
const NAV = [['Work', '/#work'], ['Projects', '/projects'], ['About', '/about'], ['Services', '/services'], ['FAQ', '/faq'], ['Contact', '/contact']];
const icon = d => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const CLIP = icon('<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>');
const ARROW = icon('<path d="M5 19 19 5M5 5h14v14"/>');

function layout({ file, title, description, image = '/assets/og-image.jpg', imageAlt = 'Lessy (Finehas Mpoe), software developer and WordPress specialist at Prospergenics', ld = [], body, current, noindex = false }) {
  const url = abs(file === 'index' ? '/' : `/${file}`);
  const graph = { '@context': 'https://schema.org', '@graph': ld };
  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1'}">
  <meta name="author" content="Lessy (Finehas Mpoe)">
  <meta name="theme-color" content="#f5f1ea">
  <link rel="canonical" href="${url}">
  <meta property="og:site_name" content="Lessy">
  <meta property="og:locale" content="en">
  <meta property="og:type" content="${file.startsWith('projects/') ? 'article' : 'website'}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${abs(image)}">
  <meta property="og:image:alt" content="${esc(imageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${abs(image)}">
  <meta name="twitter:image:alt" content="${esc(imageAlt)}">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
  <script src="/theme-init.js"></script>
  <link rel="stylesheet" href="/styles.css">
  <script src="/page.js" defer></script>
  ${ldScript(graph)}
</head>
<body class="subpage">
  <a class="skip" href="#main">Skip to content</a>
  <header class="page-header">
    <a class="wordmark" href="/" aria-label="Lessy, home">lessy<i>.</i></a>
    <nav class="page-nav" aria-label="Main navigation">${NAV.map(([l, h]) => `<a href="${h}"${current === h ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
    <button id="theme-toggle" class="pill icon-pill" type="button" aria-label="Switch theme" aria-pressed="false">${icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>')}</button>
  </header>
  <main id="main" class="page"><div class="wrap">
${body}
  </div></main>
  <footer class="site-footer wrap">
    <a class="wordmark" href="/">lessy<i>.</i></a>
    <div class="footer-credits"><span>© 2026 Finehas Lesiamon Mpoe (Lessy)</span><span class="footer-build">Build by; <a class="credit-company" href="https://prospergenics.com/" target="_blank" rel="noopener noreferrer"><span class="company-logo" aria-hidden="true"><img class="logo-light" src="/assets/prospergenics-green.png" alt="" width="512" height="512" loading="lazy"><img class="logo-dark" src="/assets/prospergenics-white.png" alt="" width="512" height="512" loading="lazy"></span><span>prospergenics.com</span></a></span></div>
    <nav class="footer-links" aria-label="Footer"><a href="/about">About</a><a href="/services">Services</a><a href="/faq">FAQ</a><a href="/privacy">Privacy</a><a href="/">Home</a></nav>
  </footer>
  <div id="toast" role="status" aria-live="polite"></div>
</body>
</html>
`;
}

const crumbs = (items) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([l, h], i) => `<li>${i < items.length - 1 ? `<a href="${h}">${esc(l)}</a>` : `<span aria-current="page">${esc(l)}</span>`}</li>`).join('')}</ol></nav>`;
const crumbLd = items => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(href) })) });
const pageLd = (file, type, name, description, extra = {}) => ({ '@type': type, '@id': `${abs(file === 'index' ? '/' : '/' + file)}#webpage`, url: abs(file === 'index' ? '/' : '/' + file), name, description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#lessy` }, inLanguage: 'en', dateModified: TODAY, ...extra });
const copyRow = (label, email) => `<li class="email-row"><span class="email-label">${label}</span><a class="email-line" href="mailto:${email}">${email}</a><button class="copy-btn" type="button" data-copy="${email}" aria-label="Copy ${email} to the clipboard" title="Copy">${CLIP}</button></li>`;

/* ───────── Content ───────── */
const FAQ = [
  ['Who is Lessy?', `I’m Lessy, a software developer and WordPress specialist. I’m a co-founder and trainer at <a href="https://prospergenics.com/" target="_blank" rel="noopener noreferrer">Prospergenics</a>, where I build websites, web apps, automations and AI agents.`],
  ['Is Lessy the same person as Finehas Mpoe?', 'Yes. My full name is Finehas Lesiamon Mpoe. Most people call me Lessy, so that is the name I use.'],
  ['What is Prospergenics?', `Prospergenics is a software and AI development team across the Netherlands and Kenya. I’m one of its co-founders, alongside <a href="https://martiendejong.nl/" target="_blank" rel="noopener noreferrer">Martien de Jong</a>. I build software there and teach other developers. You can meet the team at <a href="https://prospergenics.com/" target="_blank" rel="noopener noreferrer">prospergenics.com</a>.`],
  ['What can I hire Lessy for?', `WordPress websites and custom themes, web apps, AI agents and agent skills, workflow automations, and training for developers. The <a href="/services">services page</a> has the details.`],
  ['Do you build WordPress sites with Elementor?', 'Yes. WordPress is my strongest skill: custom themes, Elementor builds and complete business websites.'],
  ['What are AI agents and automations?', 'AI agents are programs that take on tasks for you, such as answering customer questions, sorting email or preparing content. I build them, along with reusable skills for those agents and workflows that connect your tools, for example with n8n.'],
  ['Can I see examples of your work?', `Yes. The <a href="/projects">projects page</a> lists everything, from farm and gallery websites to AI assistants. Each project has its own page with the technology used.`],
  ['Which technologies do you use?', 'WordPress, Elementor, PHP, React, TypeScript, Next.js, Node.js, Supabase, Tailwind CSS, .NET and n8n, depending on what the project needs.'],
  ['Do you work with clients outside Kenya?', 'Yes. My projects include clients in Kenya and in Europe, including Dutch businesses.'],
  ['Do you also teach?', 'Yes. Training and mentoring developers is part of my work at Prospergenics.'],
  ['How do I contact you?', `Email <a href="mailto:${EMAIL_WORK}">${EMAIL_WORK}</a> or <a href="mailto:${EMAIL_PERSONAL}">${EMAIL_PERSONAL}</a>, or message me on <a href="https://wa.me/254793942458" target="_blank" rel="noopener noreferrer">WhatsApp</a>. The <a href="/contact">contact page</a> has all the ways to reach me.`],
  ['Does this website track visitors?', `No. It sets no cookies and runs no analytics. Read the <a href="/privacy">privacy policy</a> for the details.`],
];
const stripTags = s => s.replace(/<[^>]+>/g, '');

const SERVICES = [
  ['WordPress websites and themes', 'Business websites, custom themes and Elementor builds that are fast, easy to edit and built to last. WordPress is the thing I know best.', ['prosper', 'art', 'bugatti']],
  ['Web apps', 'Interfaces and applications in React, TypeScript, Next.js and Supabase, from public websites to management tools people use every day.', ['rena', 'nashipae', 'grafo']],
  ['AI agents, skills and automations', 'Assistants that answer questions, agents that work through tasks, reusable skills for those agents, and automations that connect your tools, for example with n8n.', ['vloer', 'jengo', 'hazina', 'trndy']],
  ['Training and mentoring', 'Practical development skills for individuals and teams, taught the way we teach at Prospergenics: by building real things together.', ['prosper']],
];

const PAGES = {};
const sectionCards = (ids) => ids.map(id => work.find(p => p.id === id)).filter(Boolean).map(p => `<a href="/projects/${p.id}">${esc(p.name)}</a>`).join('');

PAGES.about = layout({
  file: 'about', current: '/about',
  title: 'About Lessy (Finehas Mpoe) | Developer at Prospergenics',
  description: 'Lessy, whose full name is Finehas Lesiamon Mpoe, is a software developer, trainer and co-founder at Prospergenics. WordPress, AI agents, automations and web apps.',
  ld: [PERSON, ORG, WEBSITE, pageLd('about', 'ProfilePage', 'About Lessy (Finehas Mpoe)', 'About Lessy, software developer and co-founder at Prospergenics.', { mainEntity: { '@id': `${SITE}/#lessy` } }), crumbLd([['Home', '/'], ['About', '/about']])],
  body: `${crumbs([['Home', '/'], ['About', '/about']])}
    <article class="prose">
      <h1>About Lessy</h1>
      <p class="lede">I’m Lessy, a software developer and WordPress specialist. My full name is Finehas Lesiamon Mpoe, but nearly everyone calls me Lessy, and that’s the name to look for.</p>
      <h2>What I do at Prospergenics</h2>
      <p>I’m a co-founder, trainer and software developer at <a href="https://prospergenics.com/" target="_blank" rel="noopener noreferrer">Prospergenics</a>, a software and AI development team across the Netherlands and Kenya. I work alongside <a href="https://martiendejong.nl/" target="_blank" rel="noopener noreferrer">Martien de Jong</a>, our fellow co-founder and mentor, and with fellow developers <a href="https://prospergenics.com/members/frank/" target="_blank" rel="noopener noreferrer">Frank</a>, <a href="https://prospergenics.com/members/diko/" target="_blank" rel="noopener noreferrer">Diko</a> and <a href="https://prospergenics.com/members/sandra/" target="_blank" rel="noopener noreferrer">Sandra</a>. We build software and teach practical development skills. You can find my profile on the <a href="https://prospergenics.com/members/lessy/" target="_blank" rel="noopener noreferrer">Prospergenics team page</a>.</p>
      <h2>What I’m best at</h2>
      <p>WordPress is my strongest skill: custom themes, Elementor and complete business websites. More and more of my time goes into workflow automations, AI agents and reusable skills for those agents, joining up interfaces, APIs and tools.</p>
      <h2>How I got here</h2>
      <p>I started with WordPress sites, then picked up Angular, Node.js, Python and Flask, and more recently C#, PHP and n8n. I’m still learning, and I like it that way. Before the client work there was plenty of practice: <a href="/#journey">87 coursework repositories</a> on my GitHub.</p>
      <h2>Work you can look at</h2>
      <p>The <a href="/projects">projects page</a> lists everything I’ve built, from the <a href="/projects/rena">ReNa Farm</a> website and management app to the <a href="/projects/vloer">VloerBot</a> AI assistant and the <a href="/projects/jengo">Jengo</a> family of AI tools.</p>
      <h2>Working together</h2>
      <p>Have a project in mind? Read about my <a href="/services">services</a>, check the <a href="/faq">FAQ</a>, or <a href="/contact">get in touch</a>.</p>
    </article>`,
});

PAGES.services = layout({
  file: 'services', current: '/services',
  title: 'Services: WordPress, Web Apps and AI Agents | Lessy',
  description: 'Hire Lessy (Finehas Mpoe) for WordPress websites and themes, web apps, AI agents and automations, and developer training. Developer and co-founder at Prospergenics.',
  ld: [PERSON, ORG, WEBSITE, pageLd('services', 'WebPage', 'Services by Lessy', 'WordPress websites, web apps, AI agents and automations, and developer training.'), crumbLd([['Home', '/'], ['Services', '/services']]),
    ...SERVICES.map(([name, text]) => ({ '@type': 'Service', name, description: text, provider: { '@id': `${SITE}/#lessy` }, serviceType: name, areaServed: 'Worldwide' }))],
  body: `${crumbs([['Home', '/'], ['Services', '/services']])}
    <article class="prose">
      <h1>Services</h1>
      <p class="lede">I’m Lessy, a developer and co-founder at <a href="https://prospergenics.com/" target="_blank" rel="noopener noreferrer">Prospergenics</a>. Here is what I can build for you.</p>
      ${SERVICES.map(([name, text, ids]) => `<section class="service"><h2>${esc(name)}</h2><p>${esc(text)}</p><p class="examples"><span>Examples:</span> ${sectionCards(ids)}</p></section>`).join('\n      ')}
      <h2>Start a conversation</h2>
      <p>Tell me what you want to make, who it is for and what exists already, and I’ll tell you honestly how I would approach it. Email <a href="mailto:${EMAIL_WORK}">${EMAIL_WORK}</a> or use the <a href="/contact">contact page</a>.</p>
    </article>`,
});

PAGES.faq = layout({
  file: 'faq', current: '/faq',
  title: 'FAQ about Lessy (Finehas Mpoe) and Prospergenics',
  description: 'Answers about Lessy (Finehas Mpoe): who I am, what Prospergenics is, what I can build, which technologies I use, and how to contact me.',
  ld: [PERSON, ORG, WEBSITE, pageLd('faq', 'FAQPage', 'Frequently asked questions about Lessy', 'Answers about Lessy, Prospergenics, services and contact.', { mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } })) }), crumbLd([['Home', '/'], ['FAQ', '/faq']])],
  body: `${crumbs([['Home', '/'], ['FAQ', '/faq']])}
    <article class="prose">
      <h1>Frequently asked questions</h1>
      <p class="lede">Quick answers about me, Prospergenics and working together.</p>
      <div class="faq">${FAQ.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${a}</p></details>`).join('')}</div>
      <p>Still have a question? <a href="/contact">Get in touch</a>.</p>
    </article>`,
});

PAGES.contact = layout({
  file: 'contact', current: '/contact',
  title: 'Contact Lessy (Finehas Mpoe) | Email, WhatsApp and Socials',
  description: 'Contact Lessy (Finehas Mpoe): email at Prospergenics or personal, WhatsApp, LinkedIn, GitHub and other profiles. Available for WordPress, web app and AI projects.',
  ld: [PERSON, ORG, WEBSITE, pageLd('contact', 'ContactPage', 'Contact Lessy', 'How to contact Lessy by email, WhatsApp and social profiles.'), crumbLd([['Home', '/'], ['Contact', '/contact']])],
  body: `${crumbs([['Home', '/'], ['Contact', '/contact']])}
    <article class="prose">
      <h1>Contact</h1>
      <p class="lede">Got a project, or just a question? Email me, or message me wherever you prefer.</p>
      <ul class="emails">${copyRow('Work', EMAIL_WORK)}${copyRow('Personal', EMAIL_PERSONAL)}</ul>
      <h2>Elsewhere</h2>
      <ul class="socials-list static">${socials.map(s => `<li><a class="social" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="${esc(s.path)}"/></svg><span>${esc(s.name)}</span></a></li>`).join('')}</ul>
      <h2>Good to know</h2>
      <p>Mail links also copy the address, in case you don’t have a mail app set up. Before writing, you may find your answer in the <a href="/faq">FAQ</a>, or see what I do on the <a href="/services">services page</a>.</p>
    </article>`,
});

PAGES.privacy = layout({
  file: 'privacy', current: '',
  title: 'Privacy Policy | Lessy (Finehas Mpoe)',
  description: 'How lesiamon.com handles your data: no cookies, no analytics and no tracking. What stays in your browser, what the host logs, and how to contact me.',
  ld: [WEBSITE, pageLd('privacy', 'WebPage', 'Privacy Policy', 'Privacy policy for lesiamon.com.'), crumbLd([['Home', '/'], ['Privacy', '/privacy']])],
  body: `${crumbs([['Home', '/'], ['Privacy', '/privacy']])}
    <article class="prose">
      <h1>Privacy Policy</h1>
      <p class="lede">Short version: this website doesn’t track you. It sets no cookies and runs no analytics.</p>
      <p><strong>Last updated:</strong> ${TODAY}</p>
      <h2>Who is responsible</h2>
      <p>This website, lesiamon.com, is run by Finehas Lesiamon Mpoe (Lessy). If you have any question about this policy, email <a href="mailto:${EMAIL_WORK}">${EMAIL_WORK}</a>.</p>
      <h2>What this website collects</h2>
      <p>Nothing about you. There are no forms, no accounts, no advertising, no cookies and no analytics or tracking scripts.</p>
      <h2>What stays in your own browser</h2>
      <ul>
        <li><strong>Your theme choice.</strong> If you switch to dark mode, the site remembers it in your browser’s local storage (<code>lessy-theme</code>). It never leaves your device.</li>
        <li><strong>The welcome screen.</strong> A short note in your browser’s session storage (<code>lessy-booted</code>) stops the welcome screen replaying during the same visit. It disappears when you close the tab.</li>
      </ul>
      <h2>Hosting and technical logs</h2>
      <p>The site is hosted by Vercel, and its domain is managed through Cloudflare. Like almost every web host, they may briefly log technical information such as your IP address, browser type and the pages requested, to deliver the site and keep it secure. I don’t use these logs to identify you. Their policies apply to that data: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel</a> and <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare</a>.</p>
      <h2>If you contact me</h2>
      <p>If you email me or message me on WhatsApp, I receive your name, address or number, and whatever you write. I use it only to reply and to work with you if we start a project. I keep it as long as is needed for that, and I delete it on request.</p>
      <h2>Links to other websites</h2>
      <p>This site links to other websites, such as GitHub, LinkedIn, Instagram, X, TikTok, Facebook, Reddit, WhatsApp, Prospergenics and the sites of projects I have worked on. I’m not responsible for how they handle data. Please read their policies.</p>
      <h2>Your rights</h2>
      <p>Depending on where you live, including under the EU’s GDPR and Kenya’s Data Protection Act, you can ask what data I hold about you, ask me to correct or delete it, and complain to your data protection authority. Because this site collects no personal data, the only data I may hold is what you have sent me directly. Email me and I’ll deal with it.</p>
      <h2>Children</h2>
      <p>This website is not aimed at children, and I don’t knowingly collect data from them.</p>
      <h2>Changes</h2>
      <p>If this changes, for example if I ever add analytics, I’ll update this page and the date above first.</p>
    </article>`,
});

/* Project list and one page per project */
const thumb = p => p.cover ? p.cover.replace('.webp', '-640.webp') : null;
const CAT = { Web: 'Web & product', AI: 'AI & automation', Design: 'Gallery & design' };
PAGES.projects = layout({
  file: 'projects', current: '/projects',
  title: 'Projects by Lessy: WordPress Sites, AI Tools and Web Apps',
  description: `All ${work.length} projects by Lessy (Finehas Mpoe): WordPress websites, galleries, farm and heritage sites, AI assistants and automation tools, with the technology behind each.`,
  ld: [PERSON, ORG, WEBSITE, pageLd('projects', 'CollectionPage', 'Projects by Lessy', 'Websites, web apps and AI tools built by Lessy.'), crumbLd([['Home', '/'], ['Projects', '/projects']]),
    { '@type': 'ItemList', itemListElement: work.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/projects/${p.id}`), name: p.name })) }],
  body: `${crumbs([['Home', '/'], ['Projects', '/projects']])}
    <h1>Projects</h1>
    <p class="lede prose">${work.length} projects by Lessy: WordPress websites, galleries, farm and heritage sites, AI assistants and automation tools. Each page lists what it is and what it was built with. Prefer the interactive version? <a href="/#index">Filter the projects on the home page</a>.</p>
    <ul class="tiles static-tiles">${work.map(p => `<li><a class="tile" href="/projects/${p.id}"><span class="tile-thumb">${thumb(p) ? `<img src="/${thumb(p)}" alt="" width="640" height="400" loading="lazy" decoding="async">` : `<span class="tile-fallback" aria-hidden="true">${esc(p.name.replace(/ \/ .*/, ''))}</span>`}</span><span class="tile-body"><span class="tile-cat">${esc(CAT[p.category] || p.category)}</span><span><span class="tile-name">${esc(p.name)}</span><span class="tile-focus">${esc(p.focus)}</span></span></span></a></li>`).join('')}</ul>`,
});

work.forEach((p, i) => {
  const file = `projects/${p.id}`;
  const next = work[(i + 1) % work.length], prev = work[(i - 1 + work.length) % work.length];
  const full = `${p.name}: ${p.focus} | Lessy`;
  const title = full.length <= 62 ? full : `${p.name}: project by Lessy`;
  const clip = (t, n) => t.length <= n ? t : `${t.slice(0, n - 1).replace(/[\s,;:.]+\S*$/, '')}…`;
  const long = `${p.summary} ${p.context}. Built with ${p.stack}.`.replace(/\.\./g, '.');
  const description = clip(long.length <= 200 ? long : `${p.summary} Built with ${p.stack}.`.replace(/\.\./g, '.'), 200);
  const img = p.cover ? `/${p.cover}` : '/assets/og-image.jpg';
  PAGES[file] = layout({
    file, current: '/projects', title, description, image: img, imageAlt: p.cover ? `${p.name}: ${p.focus}` : undefined,
    ld: [PERSON, ORG, WEBSITE, pageLd(file, 'WebPage', title, description, { primaryImageOfPage: { '@type': 'ImageObject', url: abs(img) } }), crumbLd([['Home', '/'], ['Projects', '/projects'], [p.name, `/${file}`]]),
      { '@type': 'CreativeWork', '@id': `${abs('/' + file)}#work`, name: p.name, description: p.summary, creator: { '@id': `${SITE}/#lessy` }, image: abs(img), keywords: p.stack, genre: p.focus, ...(p.links[0] ? { sameAs: p.links.map(l => l[1]) } : {}), url: abs('/' + file) }],
    body: `${crumbs([['Home', '/'], ['Projects', '/projects'], [p.name, `/${file}`]])}
    <article class="project-page">
      <p class="eyebrow">${esc(p.context)}</p>
      <h1>${esc(p.name)}</h1>
      <p class="lede">${esc(p.summary)}</p>
      ${p.cover ? `<figure class="project-cover"><img src="/${p.cover}" alt="${esc(`${p.name}: ${p.focus}`)}" width="1280" height="800" decoding="async"></figure>` : ''}
      <dl class="facts"><div><dt>What it is</dt><dd>${esc(p.focus)}</dd></div><div><dt>Built with</dt><dd>${esc(p.stack)}</dd></div></dl>
      <div class="prose"><p>${esc(p.notes)}</p>
      ${p.tools ? `<h2>The tools</h2><ul class="case-tools">${p.tools.map(t => `<li><b>${esc(t.name)}</b><span>${esc(t.text)}</span></li>`).join('')}</ul>` : ''}</div>
      <p class="project-links">${p.links.map(([l, u]) => `<a class="btn btn-primary" href="${esc(u)}" target="_blank" rel="noopener noreferrer"><span>${esc(l)}</span>${ARROW}</a>`).join('')}<a class="btn btn-ghost" href="/#project=${p.id}"><span>Open in the portfolio</span></a><a class="btn btn-ghost" href="mailto:${EMAIL_WORK}?subject=${encodeURIComponent('About ' + p.name)}"><span>Ask about this</span></a></p>
      <nav class="pager" aria-label="More projects"><a href="/projects/${prev.id}"><small>Previous</small>${esc(prev.name)}</a><a href="/projects/${next.id}"><small>Next</small>${esc(next.name)}</a></nav>
    </article>`,
  });
});

/* ───────── Write pages ───────── */
await rm(path.join(DIST, 'projects'), { recursive: true, force: true });
await mkdir(path.join(DIST, 'projects'), { recursive: true });
for (const [file, html] of Object.entries(PAGES)) await writeFile(path.join(DIST, `${file}.html`), html);

/* ───────── Home page: project directory in the footer, verification tags ───────── */
const home = path.join(DIST, 'index.html');
let h = await readFile(home, 'utf8');
const dir = `<!-- directory:start -->
  <nav class="directory wrap" aria-label="Site directory"><div><h2>Pages</h2><ul><li><a href="/about">About Lessy</a></li><li><a href="/services">Services</a></li><li><a href="/projects">All projects</a></li><li><a href="/faq">FAQ</a></li><li><a href="/contact">Contact</a></li><li><a href="/privacy">Privacy policy</a></li></ul></div><div><h2>Projects</h2><ul class="directory-projects">${work.map(p => `<li><a href="/projects/${p.id}">${esc(p.name)}</a></li>`).join('')}</ul></div></nav>
  <!-- directory:end -->`;
h = h.replace(/<!-- directory:start -->[\s\S]*?<!-- directory:end -->/, dir);
const verify = [config.googleVerification && `<meta name="google-site-verification" content="${esc(config.googleVerification)}">`, config.bingVerification && `<meta name="msvalidate.01" content="${esc(config.bingVerification)}">`].filter(Boolean).join('\n  ');
h = h.replace(/<!-- verification:start -->[\s\S]*?<!-- verification:end -->/, `<!-- verification:start -->${verify ? '\n  ' + verify + '\n  ' : ''}<!-- verification:end -->`);
await writeFile(home, h);

/* ───────── Sitemap and llms.txt ───────── */
const urls = [['/', 1.0, 'monthly'], ['/about', 0.8, 'monthly'], ['/services', 0.8, 'monthly'], ['/projects', 0.8, 'monthly'], ['/faq', 0.7, 'monthly'], ['/contact', 0.7, 'yearly'], ...work.map(p => [`/projects/${p.id}`, 0.6, 'yearly']), ['/privacy', 0.3, 'yearly']];
await writeFile(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, pr, cf]) => `  <url><loc>${abs(u)}</loc><lastmod>${TODAY}</lastmod><changefreq>${cf}</changefreq><priority>${pr.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`);
await writeFile(path.join(DIST, 'llms.txt'), `# Lessy (Finehas Mpoe)

> Lessy is the name Finehas Lesiamon Mpoe goes by. Lessy is a software developer and WordPress specialist, and a co-founder and trainer at Prospergenics (https://prospergenics.com/), a software and AI development team across the Netherlands and Kenya. Lessy builds WordPress websites, web apps, AI agents and automations.

## Key pages
- [Home and interactive portfolio](${SITE}/): the portfolio, with selected work.
- [About](${SITE}/about): who Lessy is and how Lessy works with the Prospergenics team.
- [Services](${SITE}/services): WordPress, web apps, AI agents and automations, training.
- [Projects](${SITE}/projects): every project, each with its own page.
- [FAQ](${SITE}/faq): short answers about Lessy and Prospergenics.
- [Contact](${SITE}/contact): email, WhatsApp and social profiles.

## Names
Preferred name: Lessy. Also written Lessy Mpoe, Finehas Mpoe and Finehas Lesiamon Mpoe. These all refer to the same person.

## Contact
- Work email: ${EMAIL_WORK}
- GitHub: https://github.com/Mpoelesiamon
`);
console.log(`built ${Object.keys(PAGES).length} pages, sitemap with ${urls.length} URLs, llms.txt`);
