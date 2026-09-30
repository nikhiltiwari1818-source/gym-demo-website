export interface GymDetails {
  name: string;
  tagline: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  secondaryPhone: string;
  whatsapp: string;
  email: string;
  rating: number;
  reviewsCount: number;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timings: {
    monday: string;
    tuesdayToSaturday: string;
    sunday: string;
  };
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  goal: string;
  source: 'membership' | 'free_trial' | 'diet_plan' | 'consultation' | 'contact';
  planInterest?: string;
  bmiData?: {
    bmi: number;
    category: string;
    bodyFatEstimate?: number;
    caloriesDaily?: number;
  };
  notes?: string;
  status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'ARCHIVED';
  createdAt: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  duration: string;
  durationMonths: number;
  priceINR: number;
  originalPriceINR: number;
  discountPercentage: number;
  isPopular?: boolean;
  badge?: string;
  description: string;
  features: string[];
}

export type CrowdLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface CrowdStatus {
  level: CrowdLevel;
  currentOccupancy: number;
  maxCapacity: number;
  percentage: number;
  bestTimeToVisit: string;
  peakHours: string;
  statusMessage: string;
  updatedAt: string;
}

export interface AffiliateProduct {
  id: string;
  title: string;
  brand: string;
  category: string;
  priceINR: number;
  originalPriceINR: number;
  rating: number;
  reviewsCount: number;
  image: string;
  affiliateUrl: string;
  platform: 'Amazon' | 'Flipkart' | 'HealthKart' | 'Official';
  isBestSeller?: boolean;
  specs: {
    proteinPerServing?: string;
    servings?: number;
    weight?: string;
    flavors?: string[];
    highlight?: string;
  };
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experienceYears: number;
  specialization: string[];
  image: string;
  instagram?: string;
  bio: string;
}

export interface TransformationStory {
  id: string;
  name: string;
  age: number;
  category: 'Weight Loss' | 'Muscle Gain' | 'Fat Loss';
  durationWeeks: number;
  beforeWeight: string;
  afterWeight: string;
  achievement: string;
  quote: string;
  beforeImage: string;
  afterImage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  verifiedMember: boolean;
  googleReviewUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Nutrition' | 'Weight Loss' | 'Muscle Building' | 'Supplements' | 'Fitness Tips' | 'Home Workouts';
  excerpt: string;
  content: string;
  readTime: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
}

export interface DietPlanResult {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  goal: 'fat_loss' | 'weight_gain' | 'muscle_gain' | 'maintenance';
  dietType: 'veg' | 'non_veg' | 'eggitarian' | 'vegan';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'intense';
  bmi: number;
  bmiCategory: string;
  dailyCalories: number;
  macros: {
    proteinGrams: number;
    carbsGrams: number;
    fatsGrams: number;
  };
  waterIntakeLiters: number;
  meals: {
    timing: string;
    name: string;
    foods: string[];
    calories: number;
    proteinGrams: number;
  }[];
  workoutSplit: {
    day: string;
    focus: string;
    exercises: string[];
  }[];
  supplements: {
    name: string;
    dosage: string;
    benefit: string;
    timing: string;
  }[];
  couponCode: string;
}

export interface Consultation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}
