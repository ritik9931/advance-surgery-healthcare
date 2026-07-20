# Priva Health Care — Website (Angular 17)

A mobile-friendly, industry-level hospital website for a **Proctology & Urology** speciality hospital, built in Angular (standalone components, Angular 17 control-flow syntax).

## ✅ What's included

- **Sticky, responsive navbar** with mobile hamburger menu, Call Now & Book Appointment buttons
- **Hero section** with a full appointment booking form (Name, Mobile, City, Disease)
- **Auto-popup appointment modal** — opens automatically ~2.5s after page load, and via any "Book Appointment" button site-wide
- **Floating WhatsApp + Call Now buttons** (bottom-right, on every page)
- **Speciality cards** with custom-drawn line-art icons for: Piles, Anal Fistula, Anal Fissure, Gallstone, Kidney Stones, Hernia, Laser Circumcision, Enlarged Prostate (BPH)
- **Doctors section** with photos, roles & experience
- **Patient reviews / testimonials** with star ratings
- **About Us page** with mission, values & a company timeline
- **Contact page** with tap-to-call / tap-to-WhatsApp cards
- All "Book Appointment" actions send the patient's Name, Mobile, City & Concern straight into a **pre-filled WhatsApp message** to **+91 80824 06454**
- Fully responsive down to small mobile screens

## 🔧 Setup (run locally)

> This project's code was generated without internet access in the build sandbox, so dependencies aren't installed. To run it:

```bash
# 1. Install Node.js 18+ from https://nodejs.org if you don't have it

# 2. Install the Angular CLI globally (one-time)
npm install -g @angular/cli@17

# 3. Inside the project folder, install dependencies
npm install

# 4. Start the dev server
npm start
```

Then open **http://localhost:4200** in your browser.

## 📦 Build for production

```bash
npm run build
```

Output goes to `dist/advance-surgery-healthcare` — upload that folder's contents to any static host (Netlify, Vercel, Hostinger, cPanel, etc.).

## ✏️ Easy things to customize

| What | Where |
|---|---|
| WhatsApp/Call number | `src/app/services/contact.service.ts` (`phoneDisplay`, `phoneDial`, `whatsappNumber`) |
| Clinic address & hours | `src/app/components/footer/footer.component.html` and `contact.component.html` |
| Doctor names/photos | `src/app/pages/home/home.component.ts` → `doctors` array |
| Specialities & descriptions | `src/app/pages/home/home.component.ts` → `specialties` array |
| Patient reviews | `src/app/pages/home/home.component.ts` → `reviews` array |
| Colors / fonts | `src/styles.scss` (CSS variables at the top — `--color-primary`, `--color-accent`, etc.) |
| Doctor photos | Currently pulled from Unsplash placeholder URLs — replace with your real doctor photos in the same `doctors` array (any image URL, or drop files into `src/assets/` and reference `assets/yourphoto.jpg`) |

## 📁 Project structure

```
src/app/
├── components/
│   ├── navbar/               # Sticky nav + mobile menu
│   ├── footer/                # Site footer
│   ├── floating-buttons/      # WhatsApp + Call floating pills
│   ├── appointment-modal/     # Auto-popup booking form
│   └── specialty-icons/       # Custom SVG icon set
├── pages/
│   ├── home/                  # Hero, specialities, doctors, reviews, CTA
│   ├── about/                 # Mission, values, timeline
│   └── contact/                # Contact cards
├── services/
│   └── contact.service.ts     # Central phone/WhatsApp number + modal state
├── app.component.ts
└── app.routes.ts
```

## 🚀 Suggested next steps

- Swap in your real clinic address, doctor photos & bios
- Connect the appointment form to a real backend/CRM or Google Sheet (currently it opens WhatsApp with the details pre-filled — simplest, zero-backend option for launch)
- Add Google Maps embed on the Contact page
- Add a blog/health-tips section for SEO
- Hook up Google Analytics / Meta Pixel for ad tracking
