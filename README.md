# SOHO Residence & Hotel — Official Website

> Luxury boutique apartment-hotel at 100 Cô Giang, District 1, Ho Chi Minh City

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Private-red)](.)

---

## Overview

Marketing and booking website for **SOHO Residence & Hotel**, a premium serviced apartment complex in the heart of Saigon. The site showcases three apartment types (Studio, 2-Bedroom, 3-Bedroom), provides an inline booking bar that routes to the property management system, and is fully localised in English, Vietnamese, and Chinese.

**Live site:** [sohoresidencehotel.vn](https://sohoresidencehotel.vn)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, SSR/SSG) |
| UI Runtime | React 19.2 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| i18n | next-intl 4 |
| Date picker | react-day-picker 9 |
| Linting | ESLint 9 |

---

## Features

- **Multi-language** — English (default), Vietnamese (`/vi`), Chinese (`/zh`) via `next-intl`
- **Booking bar** — Date picker, guest & room counters, redirects to EZ CMS booking system
- **Hero carousel** — Auto-advancing full-screen slideshow with pause-on-hover
- **Room gallery** — Hover-triggered image cycling on room cards
- **Scroll animations** — Framer Motion `AnimateInView` wrapper on all sections
- **SEO-ready** — Open Graph, Twitter Card, sitemap, robots.txt, structured metadata
- **Responsive** — Mobile-first layout, collapsible booking bar, hamburger nav
- **Luxury design system** — Gold accent (#c9a84c), charcoal base, Playfair Display + Inter typography

---

## Project Structure

```
soho-website/
├── app/                     # Next.js App Router
│   └── [locale]/            # Locale-prefixed routes
│       ├── page.tsx          # Home
│       ├── rooms/            # Rooms overview
│       ├── studio/           # Studio detail
│       ├── 2-bedroom/        # 2-Bedroom detail
│       ├── 3-bedroom/        # 3-Bedroom detail
│       ├── about/
│       └── contact/
├── components/
│   ├── booking/              # BookingBar
│   ├── layout/               # Header, Footer, LanguageSwitcher
│   ├── sections/             # HeroSection, RoomsSection, etc.
│   └── ui/                   # AnimateInView, DatePicker
├── lib/
│   └── booking.ts            # EZ CMS URL builder
├── messages/
│   ├── en.json
│   ├── vi.json
│   └── zh.json
├── public/images/
├── i18n.ts                   # Locale config
├── routing.ts                # next-intl routing
├── proxy.ts                  # i18n middleware (Next.js 16)
├── next.config.ts
└── tailwind.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/<your-org>/soho-website.git
cd soho-website
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Internationalization

Locale routing uses the `as-needed` prefix strategy:

| Locale | URL prefix | Example |
|---|---|---|
| English | *(none)* | `/rooms` |
| Vietnamese | `/vi` | `/vi/rooms` |
| Chinese | `/zh` | `/zh/rooms` |

Translation strings live in [`/messages`](./messages/). Add or update keys in all three files to keep languages in sync.

---

## Booking Integration

The booking bar constructs a parameterized URL to the **EZ CMS** property management system (`booking.ezcms.vn`). Logic is in [`lib/booking.ts`](./lib/booking.ts). No API keys are required — the integration is a client-side redirect.

---

## Room Types

| Room | Starting price | Sleeps |
|---|---|---|
| Studio with Balcony | 950,000 VND / night | 1–2 |
| 2-Bedroom Apartment | 1,700,000 VND / night | 2–4 |
| 3-Bedroom Apartment | 2,600,000 VND / night | 4–6 |

---

## Deployment

The project is optimised for **Vercel**. Push to `main` and Vercel handles builds automatically. No environment variables are required for a standard deployment.

For other platforms, run `npm run build` and serve the `.next` output with Node.js.

---

## Contact

**SOHO Residence & Hotel**  
100 Cô Giang, District 1, Ho Chi Minh City, Vietnam

- Email: [booking@sohoresidencehotel.vn](mailto:booking@sohoresidencehotel.vn)
- Phone / Zalo: +84 (0) 91 771 9966
- Telegram / WeChat: @sohoresidencehotel
