const projects = [
  {
    "id": "bugatti",
    "name": "Bugatti Insights",
    "category": "Design",
    "focus": "Automotive heritage & registry",
    "context": "Client / team contribution",
    "stack": "Web design, WordPress, React",
    "summary": "A website for Bugatti history, vehicle records and browsing the collection.",
    "notes": "Website and interface work that joins the history with structured vehicle data, including chassis search and collection browsing.",
    "links": [
      [
        "Visit website",
        "https://bugattiinsights.com/"
      ]
    ],
    "cover": "assets/work/bugatti.webp"
  },
  {
    "id": "prosper",
    "name": "Prospergenics",
    "category": "Web",
    "focus": "Company website & WordPress theme",
    "context": "Company / team contribution",
    "stack": "WordPress, PHP, CSS, JavaScript",
    "summary": "A WordPress web presence for Prospergenics, an AI and software development team connecting Kenya and the Netherlands.",
    "notes": "Collaborative work on the company website, bringing its services, team, community, and contact information into a clear, responsive presentation.",
    "links": [
      [
        "Visit website",
        "https://prospergenics.com/"
      ]
    ],
    "cover": "assets/work/prosper.webp"
  },
  {
    "id": "persart",
    "name": "PERSCH Art Gallery / PersArt",
    "category": "Design",
    "focus": "Art gallery website",
    "context": "Client / gallery project",
    "stack": "Web design & development",
    "summary": "Website work for PERSCH Art Gallery, bringing art and visual presentation to the web.",
    "notes": "A gallery website project at persart.nl. The public website currently displays an under-construction page.",
    "links": [
      [
        "Visit website",
        "https://persart.nl/"
      ]
    ],
    "cover": "assets/work/persart.webp"
  },
  {
    "id": "maximillar",
    "name": "Maximillar Portfolio",
    "category": "Design",
    "focus": "Personal portfolio & visual storytelling",
    "context": "Portfolio website project",
    "stack": "HTML, CSS, JavaScript",
    "summary": "A personal portfolio for Maximillar Nasieku Nkumum.",
    "notes": "A responsive portfolio with image-led storytelling, a restrained visual identity, and light and dark presentation modes.",
    "links": [
      [
        "Visit portfolio",
        "https://maximillar.lesiamon.com/"
      ],
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Max"
      ]
    ],
    "cover": "assets/work/maximillar.webp"
  },
  {
    "id": "jengo",
    "name": "Jengo",
    "category": "AI",
    "focus": "A family of AI tools for work, email, meetings and agents",
    "context": "Prospergenics project",
    "stack": "AI agents, React, TypeScript, .NET, Node.js",
    "summary": "Jengo is a Prospergenics project: a family of AI-assisted tools we have built as a team, from task boards and email to meetings, voice and autonomous agents.",
    "notes": "Each tool does one job and they work together. Meeting actions can be filed straight onto a JengoWork board, and the AI features ask for approval before they act. These are the tools built so far.",
    "links": [],
    "cover": "assets/work/jengo.webp",
    "tools": [
      {
        "name": "JengoWork",
        "text": "A self-hosted task manager with kanban boards, configurable lanes and several people per task. It replaces ClickUp for the team."
      },
      {
        "name": "JengoMail",
        "text": "A web email tool with several IMAP accounts, folders and rules, plus an AI assistant whose actions always need your approval."
      },
      {
        "name": "JengoAGI",
        "text": "An autonomous agent orchestration dashboard that watches the work and hands tasks to AI agents."
      },
      {
        "name": "Jengo Cloud Workspace",
        "text": "A personal, always-on AI computer in the cloud for each customer, with Claude Code preinstalled, controlled from a browser or a phone."
      },
      {
        "name": "Jengo Meet",
        "text": "A meeting assistant that runs in the browser, transcribes live and answers to “Hey Jengo”. It pulls out decisions and action items, each linked to the moment it was said."
      },
      {
        "name": "Jengo Desktop",
        "text": "A Windows search-style launcher (Win+J) for a personal AI that chats and works on tasks in the background."
      },
      {
        "name": "Jengo Voice",
        "text": "A voice system for talking to Jengo, with a guide for adding it to any web app."
      },
      {
        "name": "Jengo Components",
        "text": "A shared component library and project scaffolding used across all Jengo tools."
      },
      {
        "name": "Jengo Starter",
        "text": "A React, Vite and .NET starter template for new Jengo projects."
      }
    ]
  },
  {
    "id": "nashipae",
    "name": "Nashipae Cultural Oasis",
    "category": "Web",
    "focus": "Cultural heritage & hospitality website",
    "context": "Company / team contribution",
    "stack": "React, TypeScript, Tailwind CSS",
    "summary": "A website telling the story of a Maasai cultural and hospitality project in Kenya.",
    "notes": "Web development and design work presenting the property, its cultural experiences, visual story, and contact information.",
    "links": [
      [
        "Visit website",
        "https://nashipaeculturaloasis.com/"
      ]
    ],
    "cover": "assets/work/nashipae.webp"
  },
  {
    "id": "brand",
    "name": "Brand2Boost",
    "category": "AI",
    "focus": "Brand development & content workflows",
    "context": "Company / team contribution",
    "stack": ".NET, React, TypeScript",
    "summary": "A brand development platform combining content workflows and AI-assisted tools.",
    "notes": "Collaborative work on a platform for brand management, AI-assisted content generation, and publishing workflows. The supplied public domains were unavailable during the portfolio link check.",
    "links": [
      [
        "brand2boost.com — certificate issue",
        "https://brand2boost.com/"
      ],
      [
        "brand2boost.nl — currently unavailable",
        "https://brand2boost.nl/"
      ]
    ],
    "cover": "assets/work/brand.webp"
  },
  {
    "id": "art",
    "name": "Art Revisionist",
    "category": "Design",
    "focus": "Art research & editorial website",
    "context": "Client project",
    "stack": "WordPress, Elementor, web design",
    "summary": "An editorial website presenting art attribution research and historical case studies.",
    "notes": "WordPress and website design work in a research-led art context, with an emphasis on readable long-form material, imagery, and clear navigation.",
    "links": [
      [
        "Visit website",
        "https://artrevisionist.com/"
      ]
    ],
    "cover": "assets/work/art.webp"
  },
  {
    "id": "rena",
    "name": "ReNa Farm",
    "category": "Web",
    "focus": "Website & management platform",
    "context": "Personal / client project",
    "stack": "HTML, CSS, JavaScript, Next.js, Supabase",
    "summary": "A public website and a management app for a livestock and fodder farm in Kenya.",
    "notes": "The website covers the farm’s products, livestock and enquiries. The management app handles farm records and the day-to-day running of the place. It is the project where design and software come together for a real, working business.",
    "links": [
      [
        "Public website",
        "https://renafarm.co.ke"
      ],
      [
        "Website source",
        "https://github.com/Mpoelesiamon/Rena.Farm"
      ]
    ],
    "cover": "assets/work/rena.webp"
  },
  {
    "id": "perridon",
    "name": "Perridon Gallery",
    "category": "Design",
    "focus": "Collection browsing & presentation",
    "context": "Client / team contribution",
    "stack": "React, TypeScript, Framer Motion, internationalization",
    "summary": "A gallery website built around browsing a collection and looking closely at each piece.",
    "notes": "Covers collection browsing, detailed item pages, responsive layouts and several languages. A React-to-WordPress approach connects the interface to a content system people already know how to use.",
    "links": [],
    "cover": "assets/work/perridon.webp"
  },
  {
    "id": "vloer",
    "name": "VloerBot",
    "category": "AI",
    "focus": "Conversational customer assistance",
    "context": "Public repository",
    "stack": "React, TypeScript, Gemini, Supabase",
    "summary": "An AI chat widget that lets flooring customers ask questions and explore their options.",
    "notes": "It streams answers, accepts image and document uploads, and works in several languages. It is built to sit inside a company website and make advice on products, installation, maintenance and styling easy to get.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/VloerBot"
      ]
    ]
  },
  {
    "id": "hazina",
    "name": "Hazina Framework",
    "category": "AI",
    "focus": "AI infrastructure for .NET",
    "context": "Company / team contribution",
    "stack": "C#, .NET, LLM integrations",
    "summary": "A framework that connects .NET applications with multiple AI providers.",
    "notes": "The broader project includes provider abstractions, retrieval, caching, and orchestration.",
    "links": [],
    "cover": "assets/work/hazina.webp"
  },
  {
    "id": "trndy",
    "name": "TrndyLyrics",
    "category": "AI",
    "focus": "Music-to-video automation",
    "context": "Personal project",
    "stack": "n8n, Docker, FFmpeg, YouTube API",
    "summary": "An automated workflow connecting AI music generation with lyric video creation and publishing.",
    "notes": "The pipeline connects song sourcing, background selection, timed lyrics, video rendering, an approval step, and YouTube uploads. It brings creative media work and workflow engineering into one repeatable process.",
    "links": [
      [
        "Watch on YouTube",
        "https://www.youtube.com/@trendlyrics"
      ]
    ],
    "cover": "assets/work/trndy.webp"
  },
  {
    "id": "vera",
    "name": "VeraAI",
    "category": "AI",
    "focus": "Enterprise application interfaces",
    "context": "Client / team contribution",
    "stack": ".NET, Vue / Quasar, SQL Server",
    "summary": "A multi-tier application with web interfaces and a .NET backend.",
    "notes": "Included as client and team project experience spanning application interfaces and backend integration.",
    "links": [],
    "cover": "assets/work/vera.webp"
  },
  {
    "id": "ai-explorer",
    "name": "AI Explorer",
    "category": "AI",
    "focus": "AI tool discovery",
    "context": "Public repository",
    "stack": "React, TypeScript, Vite",
    "summary": "A browsable directory of AI tools with search and detailed tool views.",
    "notes": "The project organizes AI tools into a web interface with discovery and detail components, backed by a structured tool catalogue.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/AI-Explorer"
      ]
    ]
  },
  {
    "id": "dev-ai",
    "name": "Dev-AI-Tools",
    "category": "AI",
    "focus": "Developer utilities",
    "context": "Personal project",
    "stack": "React, TypeScript, Supabase",
    "summary": "A collection of AI-oriented utilities presented through a modern web application.",
    "notes": "A personal exploration of developer tools, component-based interfaces, and backend integration.",
    "links": []
  },
  {
    "id": "opus",
    "name": "Opus Gallery",
    "category": "Design",
    "focus": "Art gallery interfaces",
    "context": "Company / team contribution",
    "stack": "React, TypeScript, Tailwind CSS",
    "summary": "An image-led gallery application for exploring artwork and collections.",
    "notes": "Collaborative gallery work focused on collection presentation, responsive interfaces, and browsing experiences.",
    "links": [],
    "cover": "assets/work/opus.webp"
  },
  {
    "id": "bridge",
    "name": "Gallery WordPress Bridge",
    "category": "Design",
    "focus": "Content management integration",
    "context": "Team project",
    "stack": "React, WordPress, PHP, REST APIs",
    "summary": "A bridge between React gallery interfaces and WordPress content management.",
    "notes": "The project connects gallery, artist, artwork, and exhibition content with a modern front end. The goal is to preserve a familiar editing workflow while supporting a custom interface.",
    "links": [],
    "cover": "assets/work/bridge.webp"
  },
  {
    "id": "grafo",
    "name": "Grafo Story Weave",
    "category": "Web",
    "focus": "Writing & reading platform",
    "context": "Company / team contribution",
    "stack": "React, TypeScript, Supabase",
    "summary": "A storytelling platform with writing, reading, and social interaction interfaces.",
    "notes": "The wider platform includes a story editor, author dashboard, and reader interactions.",
    "links": [],
    "cover": "assets/work/grafo.webp"
  },
  {
    "id": "sprout",
    "name": "Sprout2Grow",
    "category": "Web",
    "focus": "Agrifood recruitment",
    "context": "Company / team contribution",
    "stack": "React, TypeScript, Tailwind CSS",
    "summary": "A recruitment platform connecting people and opportunities in the agrifood sector.",
    "notes": "Collaborative interface work on a recruitment-focused web platform.",
    "links": [],
    "cover": "assets/work/sprout.webp"
  },
  {
    "id": "devgenix",
    "name": "DevGenix Studio",
    "category": "Web",
    "focus": "Agency website",
    "context": "Public repository",
    "stack": "HTML, Tailwind CSS, JavaScript",
    "summary": "A responsive agency website with a blog and project presentation.",
    "notes": "The site brings service information, work, and editorial content into a cohesive agency presence, including a dark appearance option and responsive layouts.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/DevGenix-Agency"
      ]
    ]
  },
  {
    "id": "johny",
    "name": "JohnyClean",
    "category": "Web",
    "focus": "Cleaning services website",
    "context": "Public repository",
    "stack": "Web development & design",
    "summary": "A service business website for a cleaning company based in Switzerland.",
    "notes": "A web presence presenting the company, its cleaning services, and its approach to customer care.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/JohnyClean"
      ]
    ],
    "cover": "assets/work/johny.webp"
  },
  {
    "id": "autopedia",
    "name": "AutoPedia",
    "category": "Web",
    "focus": "Automotive information concept",
    "context": "Personal exploration",
    "stack": "Web application",
    "summary": "An exploration of a searchable home for car information and descriptions.",
    "notes": "A personal automotive reference project. Presented as an exploration rather than a complete database of every vehicle.",
    "links": []
  },
  {
    "id": "ireport",
    "name": "iReport",
    "category": "Web",
    "focus": "Front-end & back-end application",
    "context": "Learning / personal project",
    "stack": "React, application development",
    "summary": "An application project split across front-end and back-end repositories.",
    "notes": "An earlier application project exploring separate client and server development.",
    "links": [
      [
        "Front-end repository",
        "https://github.com/Mpoelesiamon/iReport-Front-end"
      ],
      [
        "Back-end repository",
        "https://github.com/Mpoelesiamon/iReport-Back-End"
      ]
    ]
  },
  {
    "id": "qr",
    "name": "Phone QR Generator",
    "category": "Web",
    "focus": "QR code utility",
    "context": "Learning / personal project",
    "stack": "JavaScript, Node.js",
    "summary": "A browser-based experiment generating QR codes for phone numbers.",
    "notes": "An early project exploring how a simple utility can connect information on screen with a scannable QR code.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Phase1ProjectRepo"
      ]
    ]
  },
  {
    "id": "lunar",
    "name": "Lunar Calculator",
    "category": "Web",
    "focus": "Calculator interface",
    "context": "Personal exploration",
    "stack": "React, TypeScript, Vite",
    "summary": "A calculator application exploring a modern dark interface.",
    "notes": "An interface experiment around everyday arithmetic, responsive layouts, and visual interaction.",
    "links": []
  },
  {
    "id": "repo-0",
    "name": "phase-1-javascript-functions-continued",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-javascript-functions-continued"
      ]
    ]
  },
  {
    "id": "repo-1",
    "name": "phase-0-html-lists-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-html-lists-lab"
      ]
    ]
  },
  {
    "id": "repo-2",
    "name": "react-hooks-fetch-crud-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/react-hooks-fetch-crud-lab"
      ]
    ]
  },
  {
    "id": "repo-3",
    "name": "Phase4Project",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Phase4Project"
      ]
    ]
  },
  {
    "id": "repo-4",
    "name": "python-p3-conditional-statements",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-conditional-statements"
      ]
    ]
  },
  {
    "id": "repo-5",
    "name": "react-hooks-state-events-mini-project",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/react-hooks-state-events-mini-project"
      ]
    ]
  },
  {
    "id": "repo-6",
    "name": "react-hooks-react-router-routes-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/react-hooks-react-router-routes-lab"
      ]
    ]
  },
  {
    "id": "repo-7",
    "name": "react-hooks-npm-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/react-hooks-npm-lab"
      ]
    ]
  },
  {
    "id": "repo-8",
    "name": "phase-1-first-class-functions",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-first-class-functions"
      ]
    ]
  },
  {
    "id": "repo-9",
    "name": "phase-0-intro-to-js-2-array-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-intro-to-js-2-array-lab"
      ]
    ]
  },
  {
    "id": "repo-10",
    "name": "phase-1-functions-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-functions-lab"
      ]
    ]
  },
  {
    "id": "repo-11",
    "name": "phase-1-tasklister-mini-project",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-tasklister-mini-project"
      ]
    ]
  },
  {
    "id": "repo-12",
    "name": "Phase3Project.",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Phase3Project."
      ]
    ]
  },
  {
    "id": "repo-13",
    "name": "python-p3-reading-python-error-messages",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-reading-python-error-messages"
      ]
    ]
  },
  {
    "id": "repo-14",
    "name": "phase-1-array-find-method-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-array-find-method-lab"
      ]
    ]
  },
  {
    "id": "repo-15",
    "name": "phase-0-completing-assignments-learn-lab-gem",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-completing-assignments-learn-lab-gem"
      ]
    ]
  },
  {
    "id": "repo-16",
    "name": "phase-0-html-document-structure-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-html-document-structure-lab"
      ]
    ]
  },
  {
    "id": "repo-17",
    "name": "phase-0-the-dom-editing-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-the-dom-editing-lab"
      ]
    ]
  },
  {
    "id": "repo-18",
    "name": "phase-1-first-class-functions-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-first-class-functions-lab"
      ]
    ]
  },
  {
    "id": "repo-19",
    "name": "phase-1-control-flow-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-control-flow-lab"
      ]
    ]
  },
  {
    "id": "repo-20",
    "name": "python-p3-init-self",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-init-self"
      ]
    ]
  },
  {
    "id": "repo-21",
    "name": "phase-1-array-filter-method-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-array-filter-method-lab"
      ]
    ]
  },
  {
    "id": "repo-23",
    "name": "phase-1-array-map-method-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-array-map-method-lab"
      ]
    ]
  },
  {
    "id": "repo-24",
    "name": "phase-0-html-experiencing-html-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-html-experiencing-html-lab"
      ]
    ]
  },
  {
    "id": "repo-25",
    "name": "phase-1-scope-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-scope-lab"
      ]
    ]
  },
  {
    "id": "repo-26",
    "name": "python-p3-oop-putting-it-all-together",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-oop-putting-it-all-together"
      ]
    ]
  },
  {
    "id": "repo-27",
    "name": "python-p3-debugging-with-ipdb",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-debugging-with-ipdb"
      ]
    ]
  },
  {
    "id": "repo-28",
    "name": "phase-0-html-link-tag-with-href",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-html-link-tag-with-href"
      ]
    ]
  },
  {
    "id": "repo-29",
    "name": "phase-0-intro-to-js-2-objects-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-intro-to-js-2-objects-lab"
      ]
    ]
  },
  {
    "id": "repo-30",
    "name": "Project-Phase-2",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Project-Phase-2"
      ]
    ]
  },
  {
    "id": "repo-31",
    "name": "react-hooks-lists-and-keys-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/react-hooks-lists-and-keys-lab"
      ]
    ]
  },
  {
    "id": "repo-32",
    "name": "react-hooks-component-props-mini-project",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/react-hooks-component-props-mini-project"
      ]
    ]
  },
  {
    "id": "repo-33",
    "name": "Lesiamon-Diko-Bravin-Arnold-Phase2-Projec-",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Lesiamon-Diko-Bravin-Arnold-Phase2-Projec-"
      ]
    ]
  },
  {
    "id": "repo-34",
    "name": "python-p3-oo-counting-sentences-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-oo-counting-sentences-lab"
      ]
    ]
  },
  {
    "id": "repo-35",
    "name": "phase-1-fetch-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-fetch-lab"
      ]
    ]
  },
  {
    "id": "repo-36",
    "name": "WK3CodeChallenge",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/WK3CodeChallenge"
      ]
    ]
  },
  {
    "id": "repo-37",
    "name": "phase-0-html-images-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-html-images-lab"
      ]
    ]
  },
  {
    "id": "repo-38",
    "name": "phase-1-object-ball",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-object-ball"
      ]
    ]
  },
  {
    "id": "repo-39",
    "name": "phase-1-destructuring-assignment",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-destructuring-assignment"
      ]
    ]
  },
  {
    "id": "repo-40",
    "name": "phase-0-javascript-events-event-listening-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-javascript-events-event-listening-lab"
      ]
    ]
  },
  {
    "id": "repo-41",
    "name": "phase-1-algorithms-has-target-sum",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-algorithms-has-target-sum"
      ]
    ]
  },
  {
    "id": "repo-42",
    "name": "New-Assignment",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/New-Assignment"
      ]
    ]
  },
  {
    "id": "repo-43",
    "name": "Phase4Wk1CodeChallenge",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Phase4Wk1CodeChallenge"
      ]
    ]
  },
  {
    "id": "repo-44",
    "name": "LIKE-FUNCTION",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/LIKE-FUNCTION"
      ]
    ]
  },
  {
    "id": "repo-45",
    "name": "Phase4-Wk2CodeChallenge-Pizzas",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Phase4-Wk2CodeChallenge-Pizzas"
      ]
    ]
  },
  {
    "id": "repo-46",
    "name": "react-hooks-forms-submit",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/react-hooks-forms-submit"
      ]
    ]
  },
  {
    "id": "repo-48",
    "name": "phase-0-the-dom-modifying-elements-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-the-dom-modifying-elements-lab"
      ]
    ]
  },
  {
    "id": "repo-49",
    "name": "W3-CodeChallenge-Phase3",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/W3-CodeChallenge-Phase3"
      ]
    ]
  },
  {
    "id": "repo-50",
    "name": "python-p4-web-servers-and-wsgi",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p4-web-servers-and-wsgi"
      ]
    ]
  },
  {
    "id": "repo-51",
    "name": "phase-0-intro-to-js-2-looping-code-along",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-intro-to-js-2-looping-code-along"
      ]
    ]
  },
  {
    "id": "repo-52",
    "name": "my-repository-example",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/my-repository-example"
      ]
    ]
  },
  {
    "id": "repo-53",
    "name": "phase-0-html-tag-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-html-tag-lab"
      ]
    ]
  },
  {
    "id": "repo-54",
    "name": "python-formik-validation",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-formik-validation"
      ]
    ]
  },
  {
    "id": "repo-56",
    "name": "python-p3-attributes-and-properties",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-attributes-and-properties"
      ]
    ]
  },
  {
    "id": "repo-57",
    "name": "phase-1-arrow-functions",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-arrow-functions"
      ]
    ]
  },
  {
    "id": "repo-58",
    "name": "python-p3-loops",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-loops"
      ]
    ]
  },
  {
    "id": "repo-59",
    "name": "python-p3-instance-methods",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-instance-methods"
      ]
    ]
  },
  {
    "id": "repo-60",
    "name": "python-p3-sequences",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-sequences"
      ]
    ]
  },
  {
    "id": "repo-61",
    "name": "phase-0-html-riyadh-blog-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-html-riyadh-blog-lab"
      ]
    ]
  },
  {
    "id": "repo-62",
    "name": "phase-1-arithmetic-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-arithmetic-lab"
      ]
    ]
  },
  {
    "id": "repo-63",
    "name": "python-p3-oo-cash-register-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-oo-cash-register-lab"
      ]
    ]
  },
  {
    "id": "repo-64",
    "name": "Wk1Code-ChallengePhase4",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Wk1Code-ChallengePhase4"
      ]
    ]
  },
  {
    "id": "repo-65",
    "name": "python-p3-comprehensions-and-generators",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-comprehensions-and-generators"
      ]
    ]
  },
  {
    "id": "repo-66",
    "name": "W1CodeChallenge",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/W1CodeChallenge"
      ]
    ]
  },
  {
    "id": "repo-67",
    "name": "phase-1-using-array-reduce",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-using-array-reduce"
      ]
    ]
  },
  {
    "id": "repo-68",
    "name": "phase-0-html-tables-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-html-tables-lab"
      ]
    ]
  },
  {
    "id": "repo-69",
    "name": "phase-0-git-basics-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-git-basics-lab"
      ]
    ]
  },
  {
    "id": "repo-70",
    "name": "phase-1-algorithms-palindrome",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-algorithms-palindrome"
      ]
    ]
  },
  {
    "id": "repo-71",
    "name": "python-p3-running-python-code",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-running-python-code"
      ]
    ]
  },
  {
    "id": "repo-72",
    "name": "phase-0-html-issue-bot-9000-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-0-html-issue-bot-9000-lab"
      ]
    ]
  },
  {
    "id": "repo-73",
    "name": "phase-1-review-strings-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-review-strings-lab"
      ]
    ]
  },
  {
    "id": "repo-74",
    "name": "phase-1-context-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-context-lab"
      ]
    ]
  },
  {
    "id": "repo-75",
    "name": "Phase3Project-Wk4",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Phase3Project-Wk4"
      ]
    ]
  },
  {
    "id": "repo-77",
    "name": "phase-1-javascript-variables-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-javascript-variables-lab"
      ]
    ]
  },
  {
    "id": "repo-78",
    "name": "python-p3-functions",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-functions"
      ]
    ]
  },
  {
    "id": "repo-79",
    "name": "W2-CodeChallenge-Phase3",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/W2-CodeChallenge-Phase3"
      ]
    ]
  },
  {
    "id": "repo-80",
    "name": "react-hooks-simple-data-fetching-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/react-hooks-simple-data-fetching-lab"
      ]
    ]
  },
  {
    "id": "repo-81",
    "name": "python-p3-intro-to-cli",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-intro-to-cli"
      ]
    ]
  },
  {
    "id": "repo-82",
    "name": "phase-1-github-search-app",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/phase-1-github-search-app"
      ]
    ]
  },
  {
    "id": "repo-83",
    "name": "Wk1CodeChallenge-Phase3",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Wk1CodeChallenge-Phase3"
      ]
    ]
  },
  {
    "id": "repo-84",
    "name": "react-hooks-use-effect-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/react-hooks-use-effect-lab"
      ]
    ]
  },
  {
    "id": "repo-85",
    "name": "python-p4-flask-application-structure",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p4-flask-application-structure"
      ]
    ]
  },
  {
    "id": "repo-86",
    "name": "Like",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/Like"
      ]
    ]
  },
  {
    "id": "repo-87",
    "name": "python-p3-data-structures-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/python-p3-data-structures-lab"
      ]
    ]
  },
  {
    "id": "repo-88",
    "name": "react-hooks-state-and-events-lab",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/react-hooks-state-and-events-lab"
      ]
    ]
  },
  {
    "id": "repo-92",
    "name": "test.",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/test."
      ]
    ]
  },
  {
    "id": "repo-93",
    "name": "test",
    "category": "Learning",
    "focus": "Repository / coursework",
    "context": "GitHub archive",
    "stack": "See repository",
    "summary": "A project from my GitHub archive.",
    "notes": "Open the repository to explore the original code and documentation. Earlier coursework is kept here as part of my development journey.",
    "links": [
      [
        "View repository",
        "https://github.com/Mpoelesiamon/test"
      ]
    ]
  }
];
