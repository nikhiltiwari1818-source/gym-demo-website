import { NextResponse } from "next/server";

let pricingData = [
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
    ],
  },
];

export async function GET() {
  return NextResponse.json(pricingData);
}

export async function POST(request: Request) {
  const body = await request.json();
  pricingData = body;
  return NextResponse.json({ success: true, data: pricingData });
}
