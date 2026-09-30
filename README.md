# Gym Holic, The Fitness Club — Premium Gym Website

A high-converting, mobile-first, SEO-optimized fitness website engineered for **Gym Holic, The Fitness Club**, located on Ram Mandir Road / Manendragarh Road, above Bank of India, Ambikapur, Chhattisgarh.

Built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **jsPDF**, and **Razorpay/UPI Payment Gateway Ready**.

---

## 📍 Google Maps Listing & Gym Intelligence

* **Business Name**: Gym Holic, The Fitness Club
* **Google Maps URL**: [https://maps.app.goo.gl/cyS5dvfGwdLuXo458](https://maps.app.goo.gl/cyS5dvfGwdLuXo458)
* **Address**: Above Bank of India, Ram Mandir Road, Manendragarh Road, Ambikapur, Chhattisgarh 497001
* **Coordinates**: `23.1186501, 83.1933196`
* **Google Rating**: `4.8 / 5.0` (140+ Verified Reviews)
* **Phone / WhatsApp**: `+91 88188 75600` | `+91 70009 42747`
* **Operating Hours**:
  * **Monday**: Open 24 Hours
  * **Tuesday – Saturday**: 5:00 AM – 10:30 PM
  * **Sunday**: 6:00 AM – 1:00 PM (Recovery & Open Floor)

---

## 🚀 Key Modules & High-Converting Features

### 1. ⚡ Live Gym Crowd System ("Gym Busy Meter")
* Live occupancy level telemetry: **Low Traffic (<35%)**, **Moderate Traffic (35-70%)**, **High Traffic (>70%)**.
* Live occupancy estimate count (e.g. `38 / 110 active members`).
* Best time to visit recommendation (e.g. `11:00 AM – 4:30 PM`).
* Peak hours curve & Ambikapur typical footfall timeline.
* Real-time manual override controller directly in the **Admin Panel**.

### 2. 🧮 Advanced Clinical BMI & Macro Calculator
* Inputs: Height (cm & ft/in), Weight (kg), Age, Gender, Activity Frequency.
* Outputs: Exact BMI Score, Deurenberg Body Fat % Estimate, Weight Category, Daily Calorie Burn (TDEE & BMR), Ideal Weight Range, and Hydration Water Intake.
* One-click trigger: **"Get Your Personalized Diet Plan"** button that transfers calculation data directly to the AI generator.

### 3. 🤖 AI Indian Diet & Workout Plan Generator (with PDF)
* Generates tailored **6-Meal Indian Nutrition Schedules** with authentic Indian food items (low-fat paneer, sprouts, soya chunks, whole wheat phulkas, dalia, dal tadka, curd, eggs, chicken breast).
* Tailored daily macronutrient targets (Protein, Carbs, Fats).
* 6-Day Gym Workout Split (Push-Pull-Legs / Hypertrophy).
* Targeted science-backed supplement suggestions (Whey, Creatine, Multivitamins, Fish Oil).
* **Automatic Client-Side PDF Generation** using `jsPDF`:
  * Gym Holic luxury gold branding, logo, contact numbers, address, and Google Maps QR code.
  * Special 10% membership discount coupon code (`GYMHOLIC10`).
* **Direct WhatsApp Integration**: Opens WhatsApp with prefilled diet summary and instant appointment booking request.

### 4. 🛍️ Affiliate Fitness Store & Product Comparison
* 10 Categories: Whey Protein, Mass Gainer, Creatine, Pre Workout, Shaker Bottles, Gym Gloves, Resistance Bands, Yoga Mats, Multivitamins, Gym Accessories.
* Direct external monetization via **Amazon Affiliate**, **Flipkart Affiliate**, and **HealthKart Affiliate** links.
* **Side-by-Side Product Comparison Modal**: Compare up to 3 products by protein content, servings, customer rating, and price.

### 5. 💳 Membership Registration & Online Checkout
* 4 Flexible Packages: Monthly (₹1,499), Quarterly (₹3,799 - Most Popular), Half-Yearly (₹6,499), Annual (₹10,999).
* Instant **UPI Payment (QR Code Scanner & UPI ID `gymholic@icici`)** + **Razorpay Gateway** integration.
* Automated enrollment verification and lead recording in database.

### 6. 🏆 Transformation Gallery & Interactive Slider
* Interactive Before/After image comparison slider (touch/mouse draggable).
* Categorized by Weight Loss, Muscle Gain, and Fat Loss.

### 7. 🗺️ Map Integration & Ambikapur Distance Estimator
* Embedded Google Map with exact GPS coordinates.
* Interactive distance calculator for popular Ambikapur landmarks: Ambikapur Bus Stand, Clock Tower / Ghadi Chowk, Gandhi Chowk, Government Medical College (GMC), Ring Road, and Banaras Road.

### 8. 📱 WhatsApp Automation & Sticky Mobile Bar
* Floating WhatsApp action button with automated menu presets (Join Now, Membership Fees, Free Trial, Diet Plan, Trainer Contact).
* Mobile-first sticky bottom conversion bar (Call Now, WhatsApp, Free Trial, Join Now).

### 9. 🛡️ Admin Dashboard (`/admin`)
* Protected with secure passkey (`gymholic2026`).
* Live Crowd Meter Controller (toggle Low / Moderate / High, update occupancy count, publish custom announcement).
* Leads Management Table (view, filter by source, update lead status).
* One-click **Download Leads CSV** export (`/api/leads/export`).

### 10. 🔍 SEO & Local Search Optimization
* Schema.org `ExerciseGym` & `LocalBusiness` JSON-LD with geo-coordinates, operating hours, and rating.
* Schema.org `FAQPage` JSON-LD.
* Dynamic XML Sitemap (`/sitemap.xml`) & `robots.txt`.
* OpenGraph & Twitter Cards.
* Progressive Web App (PWA) ready (`manifest.webmanifest`).

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Frontend**: React 19, TypeScript
* **Styling**: Tailwind CSS v4 (Dark + Gold Luxury Theme)
* **Database & ORM**: Prisma ORM (SQLite for zero-config local dev, drop-in PostgreSQL for production)
* **Icons**: Lucide React
* **PDF Generator**: jsPDF
* **Payments**: Razorpay & Simulated UPI QR

---

## 🏃 Getting Started (Local Development)

```bash
# 1. Navigate to the project directory
cd gymholic-fitness

# 2. Install dependencies (if needed)
npm install

# 3. Generate Prisma client
npx prisma generate

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the Admin Panel (PIN: `gymholic2026`).

---

## 🌐 Production Deployment (Vercel / Supabase / Neon)

1. Push this repository to GitHub.
2. Import the project on **Vercel** (`vercel.com`).
3. Set your environment variables in Vercel project settings:
   * `DATABASE_URL`: Your PostgreSQL connection string (from Neon, Supabase, or Railway)
   * `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Your live Razorpay Key ID
   * `RAZORPAY_KEY_SECRET`: Your Razorpay Secret Key
   * `NEXT_PUBLIC_WHATSAPP_NUMBER`: `918818875600`
   * `ADMIN_PASSCODE`: Your private admin PIN
4. Deploy! Vercel automatically builds and caches static pages.
