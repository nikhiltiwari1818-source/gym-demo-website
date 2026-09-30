import { NextResponse } from "next/server";

export interface PricingPackage {
  id: number;
  name: string;
  duration: string;
  price: string;
  originalPrice: string;
  features: string[];
}

const DEFAULT_PRICING: PricingPackage[] = [
  {
    id: 1,
    name: "Kickstarter Monthly",
    duration: "1 Month",
    price: "1,499",
    originalPrice: "2,000",
    features: [
      "Full Gym & CrossFit Floor Access",
      "Cardio & Strength Machines",
      "Free Locker & Changing Room Access",
      "Basic Machine Orientation",
      "Biometric Check-in",
      "WiFi & RO Purified Water",
    ],
  },
  {
    id: 2,
    name: "Transformation Quarterly",
    duration: "3 Months",
    price: "3,799",
    originalPrice: "5,400",
    features: [
      "All 1-Month Plan Features",
      "Complimentary BMI & Body Composition Test",
      "Personalized Indian Diet Chart",
      "1 Free 1-on-1 Personal Training Trial",
      "Steam Bath (Weekly Access)",
      "Free Workout Routine Updates",
    ],
  },
  {
    id: 3,
    name: "Pro Athlete Half-Yearly",
    duration: "6 Months",
    price: "6,499",
    originalPrice: "9,999",
    features: [
      "All 3-Month Plan Features",
      "2 Free 1-on-1 Personal Training Sessions",
      "Bi-Weekly Nutrition & Macro Reviews",
      "Unlimited Steam Bath & Sauna Access",
      "1 Guest Pass per month for a friend",
      "10% Discount at Gym Holic Shake Bar",
    ],
  },
  {
    id: 4,
    name: "Elite Annual Lifetime",
    duration: "12 Months",
    price: "10,999",
    originalPrice: "18,000",
    features: [
      "All 6-Month Plan Features",
      "4 Free 1-on-1 Personal Training Sessions",
      "Exclusive Gym Holic Branded Gym Bag & Shaker",
      "Monthly Advanced InBody Composition Scans",
      "Priority Locker Allocation",
      "1 Month Membership Freeze Option",
      "15% Off on All Affiliate Store Orders",
    ],
  },
];

let pricingData: PricingPackage[] = DEFAULT_PRICING;

const normalizePricingPackage = (item: unknown): PricingPackage | null => {
  if (!item || typeof item !== "object") return null;

  const pkg = item as Record<string, unknown>;
  const name = typeof pkg.name === "string" ? pkg.name.trim() : "";
  const duration = typeof pkg.duration === "string" ? pkg.duration.trim() : "";
  const price = typeof pkg.price === "string" || typeof pkg.price === "number" ? String(pkg.price).trim() : "";
  const originalPrice = typeof pkg.originalPrice === "string" || typeof pkg.originalPrice === "number" ? String(pkg.originalPrice).trim() : "";
  const rawFeatures = Array.isArray(pkg.features) ? pkg.features : [];
  const features = rawFeatures
    .map((feature) => (typeof feature === "string" ? feature.trim() : ""))
    .filter(Boolean);

  if (!name || !duration || !price || !originalPrice || features.length === 0) {
    return null;
  }

  return {
    id: typeof pkg.id === "number" ? pkg.id : Number(pkg.id) || 0,
    name,
    duration,
    price,
    originalPrice,
    features,
  };
};

export async function GET() {
  return NextResponse.json(pricingData);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: "Pricing data must be an array." },
        { status: 400 }
      );
    }

    const normalizedPackages = body
      .map((item) => normalizePricingPackage(item))
      .filter((item): item is PricingPackage => item !== null);

    if (normalizedPackages.length !== body.length) {
      return NextResponse.json(
        { success: false, error: "One or more pricing entries are invalid." },
        { status: 400 }
      );
    }

    pricingData = normalizedPackages;
    return NextResponse.json({ success: true, data: pricingData });
  } catch (error) {
    console.error("Failed to update pricing data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update pricing data." },
      { status: 500 }
    );
  }
}
