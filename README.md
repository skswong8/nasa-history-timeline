# NASA History Timeline

<img width="1987" height="2271" alt="nasa-history-timeline" src="https://github.com/user-attachments/assets/eded61a3-074d-44e4-97b5-2c5c23a3de56" />

An interactive timeline of NASA's history from 1958 to present, built with Next.js 16, TypeScript, and Tailwind CSS. Browse over 35 key missions and milestones organised by era, with official NASA imagery sourced from the NASA Images API.

---

## Features

- **Era navigation** — browse missions grouped into five historical eras, from the Space Race through to the Artemis programme
- **Mock REST API** — timeline data is served via Next.js route handlers (`/api/timeline`), mimicking a real backend API
- **Server-side rendering** — era data is fetched on the server and passed to client components, with no loading delay on first paint
- **Responsive layout** — desktop shows a card grid; mobile uses an Embla carousel with swipe support and arrow navigation
- **Previous / next era navigation** — computed server-side and returned alongside each era's data
- **Year grouping** — a year label appears above the first card of each year group, computed at render time
- **Accessible** — screen reader live region announces the current card position in the mobile carousel; external links include visually hidden "opens in a new tab" text
- **Official NASA imagery** — all photos sourced from the NASA Images API and hosted locally

---

## Tech Stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + SCSS |
| Carousel | [Embla Carousel](https://www.embla-carousel.com) |
| Images | NASA Images API + `next/image` |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── timeline/
│   │       ├── route.ts        # GET /api/timeline — returns all eras or a single era by query param
│   │       └── eras/
│   │           └── route.ts    # GET /api/timeline/eras — returns a flat array of era label strings
│   ├── components/
│   │   ├── ArchiveList.tsx     # Card grid — fetches and renders items for the selected era
│   │   ├── Eras.tsx            # Desktop era buttons
│   │   ├── TimelineCard.tsx    # Individual mission card
│   │   ├── TimelineCarousel.tsx        # Mobile Embla carousel
│   │   ├── TimelineClient.tsx          # Client boundary — owns selectedEra state
│   │   ├── TimelineErasMobile.tsx      # Mobile era filter carousel
│   │   └── TimelineNavigationCards.tsx # Previous / next era buttons
│   ├── services/
│   │   └── api.ts              # Fetch helpers for the timeline API
│   └── page.tsx                # Server component — reads data and passes to TimelineClient
├── data/
│   └── nasa-timeline.json      # Timeline data with image paths, tags, and optional article links
├── lib/
│   └── timeline.ts             # Shared data access — reads the JSON file
├── public/
│   └── nasa-images/            # Locally hosted NASA images
├── styles/                     # Global and component SCSS
└── types/
    └── timeline.ts             # TypeScript interfaces for all data shapes
```

---

## API

The timeline data is exposed across two route handlers.

### `GET /api/timeline/eras`

Returns an array of era objects containing the title and description, used to render the era navigation buttons and descriptions.

```json
[
  {
    "title": "1958-1970",
    "description": "NASA's founding and the intense Space Race era..."
  },
  {
    "title": "1971-1990",
    "description": "Post-Apollo transition to reusable spacecraft..."
  }
]
```

### `GET /api/timeline`

Returns the full dataset including all eras and items.

### `GET /api/timeline?era=1958-1970`

Returns a single era's `eraDescription`, `items`, and computed `navigation`:

```json
{
  "era": "1958-1970",
  "eraDescription": "...",
  "items": [...],
  "navigation": {
    "previous": null,
    "previousLabel": null,
    "previousIndex": null,
    "next": "1971-1990",
    "nextLabel": "1971-1990",
    "nextIndex": 1
  }
}
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/skswong8/nasa-history-timeline.git
cd nasa-history-timeline
npm install
```

### Environment

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You can verify the API is working by visiting [http://localhost:3000/api/timeline](http://localhost:3000/api/timeline) directly.

### Build

```bash
npm run build
npm run start
```

---

## Code Style

- Tabs for indentation (configured via `.editorconfig` and `.prettierrc`)
- Single quotes
- No semicolons
- Format on save via Prettier

```bash
npx prettier --write .
```
