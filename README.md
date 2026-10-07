# AURELIA VENEZIA — Alta Gioielleria Italiana dal 1954

Premium Italian-heritage fine jewellery e-commerce platform and management portal built with **React 18**, **Vite**, **React Router v6**, **Framer Motion**, **Recharts**, and **Lucide React**.

---

## 💎 Features Overview

- **Italian Luxury Design System**: Ivory (`#F6F1E7`), Bordeaux (`#5B1A24`), Antique Gold (`#B08D4C`), Cormorant Garamond headings & Jost body typography. Solid flat colors only, edge-to-edge layout, Roman numerals, and "Fatto a mano in Italia" heritage motifs.
- **22+ Working Public Store Pages**: Home, Shop, Category pages, Product Detail with live price breakdown & pincode checker, Collections Landing, Bridal & Mangalsutra, Wishlist, Cart & Checkout, Order Confirmation, Live Order Tracking, About Us, Atelier Craftsmanship, Interactive Ring Size Calculator, Journal & Editorial, Boutique Locator, Book Appointment, Bespoke Commission with image upload preview, Contact, and Policy pages (FAQ, Shipping, Privacy, Terms, Warranty).
- **18 Working Admin Modules (`/admin`)**:
  - Protected session (`admin@aurelia.com` / `Admin@123`).
  - Executive Dashboard with Recharts sales velocity & status distribution charts.
  - Full CRUD for Products, Categories, Orders (with printable tax invoice view), Customers, Inventory, Coupons, Reviews, Appointments, Bespoke Enquiries, Inbox & Newsletter (with CSV export), Journal Articles, Homepage Hero Manager, Daily Gold/Silver Rate Manager, Static Pages, Media Library, Sales Reports, and Store Settings with **Reset Demo Data**.
- **Service & Persistence Layer (`src/services/api.js`)**: All reads/writes persist in `localStorage` under `aurelia_` keys with simulated network latency Promises.
- **Zero Missing Images Guarantee**: `SmartImage` with flat-color skeleton and gold monogram fallback tile ensuring no broken image icons ever appear.

---

## 🔑 Admin Demo Credentials

- **Portal URL**: `/admin/login`
- **Email**: `admin@aurelia.com`
- **Password**: `Admin@123`

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

---

## 🌐 Vercel Deployment

This project includes a `vercel.json` rewrite configuration to prevent 404 errors on direct route refreshes:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Deploy using the Vercel CLI:
```bash
vercel --prod
```

---

## 🔌 Connecting a Real Backend Later

When transitioning from the mock data layer to a real REST or GraphQL API backend:

1. Open `src/config.js` and set:
   ```javascript
   USE_MOCK: false,
   API_BASE_URL: 'https://your-production-api.com/v1'
   ```
2. In `src/services/api.js`, replace the `localStorage` getters and setters inside each function with native `fetch` or `axios` calls to your backend endpoints.
3. Because all UI components consume data exclusively through context (`DataContext`, `CartContext`, `AuthContext`) or `api.js` promises, **zero changes** to React UI components will be required.
