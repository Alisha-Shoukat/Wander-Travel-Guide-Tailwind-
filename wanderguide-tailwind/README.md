# WanderGuide — React + TypeScript

This is the WanderGuide travel site converted from vanilla HTML/CSS/JS to **React 18 + TypeScript** using **Vite** and **React Router v6**.

The original design (CSS, layout, imagery) is **100% preserved**. Only the code structure has changed.

---

## Project Structure

```
src/
├── App.tsx                  # Root component with React Router setup
├── main.tsx                 # Vite entry point
├── styles/
│   └── globalStyles.css     # Original CSS (unchanged)
├── types/
│   └── index.ts             # TypeScript interfaces for all data shapes
├── data/
│   └── index.ts             # Static data (destinations, services, plans, etc.)
├── hooks/
│   ├── useTheme.ts          # Dark/light theme toggle with localStorage
│   ├── useScrollReveal.ts   # IntersectionObserver scroll animations
│   ├── useCounters.ts       # Animated number counters
│   └── useToast.ts          # Toast notification system
├── components/
│   ├── Navbar.tsx           # Responsive nav (public + dashboard variants)
│   ├── Footer.tsx           # Full footer + mini footer variant
│   ├── Accordion.tsx        # Controlled accordion component
│   ├── DestinationCard.tsx  # Card for destination listings
│   └── FormField.tsx        # Reusable labelled input/textarea field
└── pages/
    ├── Home.tsx             # Landing page with hero, stats, cards, newsletter
    ├── Destinations.tsx     # Destination grid with filter + live search + comparison table
    ├── Itineraries.tsx      # Featured itinerary + accordion + more cards
    ├── Services.tsx         # Services grid + tips + pricing table
    ├── Contact.tsx          # Contact info + validated form + FAQ
    ├── Login.tsx            # Login form with validation + redirect
    ├── Signup.tsx           # Signup form with perks panel
    └── Dashboard.tsx        # Full admin dashboard with charts, table, checklist
```

---

## What Changed (HTML → React+TS)

| Original                        | React + TypeScript                              |
|---------------------------------|-------------------------------------------------|
| `<a href="page.html">`          | `<Link to="/page">` (React Router)              |
| `onclick="fn()"` inline handlers| `onClick={handler}` React event handlers        |
| `document.querySelectorAll`     | Custom hooks (`useScrollReveal`, `useCounters`) |
| `localStorage` theme            | `useTheme` hook with `useEffect`                |
| Global JS functions             | Typed custom hooks + component state            |
| Multi-file HTML pages           | Single-page app with `<Routes>`                 |
| Inline JS form validation       | React controlled forms with TypeScript types    |
| Static data in HTML             | Typed data constants in `src/data/index.ts`     |
| `filterDestinations()` global   | `useState<FilterCategory>` in component         |

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Pages / Routes

| Route           | Page          | Description                              |
|-----------------|---------------|------------------------------------------|
| `/`             | Home          | Hero, stats, destinations, tips, newsletter |
| `/destinations` | Destinations  | Filterable grid + comparison table       |
| `/itineraries`  | Itineraries   | Spotlight + accordion + more cards       |
| `/services`     | Services      | Services + tips + pricing table          |
| `/contact`      | Contact       | Contact info + validated form + FAQ      |
| `/login`        | Login         | Auth form → redirects to dashboard       |
| `/signup`       | Signup        | Registration form with perks             |
| `/dashboard`    | Dashboard     | Admin panel with metrics, charts, table  |

---

## Notes

- The **CSS is identical** to the original — zero visual changes.
- Images must be in `public/sources/` (already included).
- The `useScrollReveal` and `useCounters` hooks re-run on every render (via `useEffect` without deps) to handle React SPA navigation — consistent with the original `DOMContentLoaded` pattern.
- Form validation mirrors the original `validateForm()` logic using React controlled state.
