# The Little Corner — Handmade Gifts & Crafts Brand Website

A warm, responsive, and accessible brand website for **The Little Corner**, handcrafted with love for delicate eternal flowers, customized charm keychains, and keepsake gift bundles.

The design is inspired by the visual scrapbook charm and soft aesthetic of the GiftVerse design reference (soft blush tones, polaroid collage cards, script handwriting accents, washi tape styling, and floating heart doodles), purpose-built to showcase genuine handmade crafts with direct-to-maker Instagram DM inquiries and optional WhatsApp support.

---

## 📸 Website Preview

### 🎀 Homepage & Scrapbook Hero
![The Little Corner Homepage Hero](screenshots/hero-home.png)

### 🌸 Handmade Picks & "I'm Interested" Product Actions
![Handmade Picks & Inquiry Actions](screenshots/handmade-picks.png)

### ✨ Packaging Showcase & Bespoke Custom Order Planner
![Packaging & Custom Order Planner](screenshots/custom-order-planner.png)

---

## 🌸 Tech Stack & Design System

- **Framework**: React 18+ with Vite (JavaScript)
- **Styling**: Tailwind CSS v4 using `@tailwindcss/vite` and modern `@theme` design tokens
- **Icons**: [Lucide React](https://lucide.dev) + custom accessible SVG brand icons & doodles
- **Routing**: [React Router DOM v6](https://reactrouter.com)
- **SEO & Social Cards**: [react-helmet-async](https://github.com/staylor/react-helmet-async) with OpenGraph and JSON-LD schema
- **Testing**: [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com) + `@testing-library/jest-dom`
- **Typography** (Google Fonts):
  - *Serif*: **Playfair Display** (Headings, titles, price accents)
  - *Script*: **Dancing Script** (Eyebrows, handwritten sticky notes)
  - *Sans*: **DM Sans** (Body copy, buttons, labels)
- **Design Tokens**:
  - `ivory`: `#FFFAF5`
  - `blush`: `#FFF5F8`, `#FDE9EF`, `#FAD5E1`, `#F5B9CD`, `#EE94B1`
  - `rose`: `#E0568A`, `#CC3F75`, `#A8305F`
  - `plum`: `#2B1230`, `#3A1B40`, `#5B3B62`, `#84698A`
  - `cream`: `#F8EDE0`, `leaf`: `#BFD0B2`, `#8FA67E`

---

## 📱 Contact & Order Configuration

### Instagram (Primary Order Channel)
- **Handle**: `thelittlecornerbytasbiii`
- **Profile URL**: `https://www.instagram.com/thelittlecornerbytasbiii/`
- **DM URL**: `https://ig.me/m/thelittlecornerbytasbiii`

#### Rationale for Copy-Message Workflow & "I'm Interested" Inquiries
Unlike WhatsApp's `wa.me/?text=` parameter, `ig.me/m/<username>` deep-links do not reliably support URL query parameters for pre-filled chat messages across different devices.
To provide an effortless, transparent experience for customers:
1. When a customer clicks **"I'm Interested"** on any product card, the browser opens the direct DM link in a new tab (`https://ig.me/m/thelittlecornerbytasbiii?text=...` as a best-effort prefill).
2. Concurrently, the card reveals a compact **Inquiry Panel** displaying the pre-formatted inquiry message with the product's exact name and a one-click **"Copy message"** button.
3. The customer simply pastes the pre-formatted text into their Instagram DM with the maker.
4. **Non-negotiable copy rule**: The website never claims a message was "sent" or "submitted" automatically. UI wording always transparently states: *"Instagram will open in a new tab. Paste this message into your DM and review it before sending."*

#### Instagram Deep-Link Limitations
- **Ignored query parameters**: `ig.me/m/<username>` reliably opens the Instagram DM thread, but may ignore `?text=` query parameters on various mobile operating system versions and native app releases.
- **Guaranteed fallback**: The inline copy-message panel is the guaranteed fallback across all platforms, ensuring customers always have the exact inquiry text copied or ready to copy with one tap.
- **Client & device variance**: Behavior differs between the native Instagram mobile app, desktop web browsers, and logged-out users (who are directed to log in to Instagram first).
- **No transmission telemetry**: The website operates with zero backend and Rs 0 budget; it cannot and does not track or detect whether a message was actually sent. The user reviews and sends the message themselves.

### WhatsApp (Secondary Optional Channel)
- **Current State**: Unconfigured (`whatsappNumber: ""` in `src/config/site.js`).
- All WhatsApp buttons gracefully degrade to a disabled state displaying the caption `"WhatsApp number not set yet"`. No broken `wa.me` links or invented numbers are ever rendered.
- **When the owner is ready to enable WhatsApp**:
  1. Open `src/config/site.js`.
  2. Set `whatsappNumber` to digits only with country code (no `+`, spaces, or hyphens), e.g.:
     ```javascript
     whatsappNumber: "919876543210", // TODO: replace with owner's international digits
     ```
  3. All WhatsApp buttons across the Header, Product cards, Drawer, and Footer will immediately activate, generating `https://wa.me/<number>?text=<encoded_inquiry>` links.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
In development mode, a small dismissible **Launch Checklist** badge appears pinned to the bottom-left corner of the screen, listing any unconfigured business details (automatically hidden in production builds).

### 3. Run Unit and Component Tests
```bash
npm test
```

### 4. Run Linter
```bash
npm run lint
```

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

---

## 📋 Replace Before Launch Checklist

Before making the website live for real customers, review and replace remaining placeholder data:

| Item | File Location | What to Provide | Status |
| :--- | :--- | :--- | :--- |
| **Instagram DM & Profile** | `src/config/site.js` | Configured to `@thelittlecornerbytasbiii` | ✅ Configured |
| **WhatsApp Number** | `src/config/site.js` (`whatsappNumber`) | International digits with country code (e.g. `"919876543210"`). Enables secondary WhatsApp inquiry buttons. | ⏳ Optional (currently empty) |
| **Logo** | `src/components/layout/Logo.jsx` | Drop your transparent logo image in `/public/images/logo.png` and uncomment the `<img>` slot. | ⏳ To supply |
| **Real Photos** | `/public/images/` & `src/data/products.js` | Replace `image.src: null` with `/images/your-product.jpg`. | ⏳ To supply |
| **Names & Descriptions**| `src/data/products.js` | Replace sample names with official product titles and material/dimension descriptions. | ⏳ To supply |
| **Product Prices** | `src/data/products.js` (`price`) | Replace `null` with actual numeric values (e.g. `499`). | ⏳ To supply |
| **Availability** | `src/data/products.js` (`availability`)| Change from `"ask"` to `"available"`, `"limited"`, or `"sold-out"`. | ⏳ To supply |
| **Brand Copy & Story** | `src/config/content.js` | Review and personalize the draft brand story, checklist, and process steps. | ⏳ To review |
| **FAQs** | `src/config/content.js` (`faqs`) | Fill in official answers for order turnaround, shipping locations, and payment details. | ⏳ To review |
| **Policies** | `src/config/content.js` (`policies`) | Update Shipping & Delivery, Returns, and Privacy terms. | ⏳ To review |
| **Canonical URL** | `src/config/site.js` (`siteUrl`) | Set your production domain (e.g. `https://thelittlecorner.com`) for SEO tags and sitemap. | ⏳ To supply |
| **Open Graph Card** | `/public/og-placeholder.svg` | Replace with a high-resolution 1200x630px social share banner `/public/og-image.jpg`. | ⏳ To supply |
| **Mobile Phone Test** | Real Device | Test tapping "Order on Instagram" on both iOS and Android to confirm the Instagram app/web DM opens and clipboard paste works smoothly. | ⏳ To test |

---

## 📸 How to Swap Placeholder Images

By default, all product and gallery items render a soft tone gradient with SVG iconography and a discreet `"Placeholder photo"` badge.

To swap them for real product photos:
1. Save your optimized photography into `public/images/`:
   ```text
   public/
     images/
       rose-bouquet.jpg
       charm-keychain.jpg
       curated-hamper.jpg
   ```
2. Open `src/data/products.js` (or `src/data/gallery.js`).
3. Set the `src` property on the product's `image` object:
   ```javascript
   {
     id: "prod-1",
     slug: "handmade-flower-bouquet",
     name: "Pastel Dream Flower Bouquet",
     category: "flowers",
     shortDescription: "Hand-knit pastel roses with baby breath sprigs.",
     price: 850,
     availability: "available",
     badge: "Bestseller",
     featured: true,
     isPlaceholder: false, // Set to false to remove sample markers
     image: {
       src: "/images/rose-bouquet.jpg", // <--- point here
       alt: "Pastel Dream everlasting flower bouquet",
       placeholderTone: "rose",
     },
   }
   ```
4. The `ImageWithSkeleton` component will automatically display a gentle blush shimmer while the photograph loads, and fade it in seamlessly.

---

## 🛍️ How to Add a New Product

Add a new item to the `products` array in `src/data/products.js`:

```javascript
{
  id: "prod-9",
  slug: "lavender-keepsake-charm",
  name: "Lavender Flower Charm",
  category: "keychains", // "flowers" | "keychains" | "other-gifts"
  shortDescription: "Delicate crochet lavender flower with gold-tone lobster clasp.",
  price: 299, // null displays "Message for price"
  availability: "available", // "available" | "limited" | "sold-out" | "ask"
  badge: "New", // string or null
  featured: true, // true to show in Homepage picks
  isPlaceholder: false,
  image: {
    src: "/images/lavender-charm.jpg",
    alt: "Handmade lavender flower charm keychain",
    placeholderTone: "blush", // "blush" | "rose" | "cream" | "leaf"
  },
}
```

The new product will automatically appear in:
- The Home page featured grid (if `featured: true`)
- The `/shop` collection catalog with real-time category filtering and search
- The quick search dialog accessible from the top navigation bar

---

## ✍️ Draft Copy Locations

All text across the entire website is centralized in two readable configuration files:

1. **`src/config/site.js`**:
   - `brandName`: Store brand title
   - `tagline`: Header and hero eyebrow subtitle
   - `announcement`: Header top banner text and enabled toggle
   - `trustItems`: The 4 benefits bar cards (Handmade, Made with care, Personal touches, Order on Instagram)

2. **`src/config/content.js`**:
   - `hero`: Eyebrow, serif headline lines, supporting paragraph, and CTA button labels
   - `featuredProducts`: Section heading and view all label
   - `story`: The 3-step handcrafted ordering process and brand narrative
   - `packaging`: The 4-point packaging care checklist and showcase captions
   - `customOrder`: Bespoke inquiry form labels, occasions, and Instagram DM instructions
   - `instagram`: Gallery header and community caption
   - `followBand`: Social connect and Instagram order callout
   - `footer`: Category links, customer care links, and brand synopsis
   - `faqs`: Accordion question items and responses
   - `policies`: Shipping, Returns, and Privacy policy statements

---

## ♿ Accessibility & Design Decisions

- **Color Contrast**: Maintained WCAG AA compliance across all components with deep aubergine (`plum-700` and `plum-950`) on `ivory` and `blush` backgrounds, and `rose-700` for smaller text elements.
- **Focus Indicators**: Distinct `outline: 2px solid #CC3F75` with `2px offset` on all interactive links, buttons, and form inputs.
- **Screen Reader Support**: Skip-to-content shortcut, semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), `aria-expanded` and `aria-controls` for accordions, `aria-pressed` for heart toggles and category filters, and polite `aria-live` announcements for search result counts.
- **Graceful Degradation**: Zero crashes when WhatsApp number or Instagram link is unconfigured; action buttons present informative disabled tooltips and guidance notices without breaking UI layouts.
- **Reduced Motion**: Respects `prefers-reduced-motion` media queries by disabling floating animations and hover shifts.
