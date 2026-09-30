import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DietPlanResult } from '@/types';
import { GYM_DETAILS } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function createWhatsAppLink(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${GYM_DETAILS.whatsapp}?text=${encoded}`;
}

export interface BmiCalculationInput {
  heightCm: number;
  weightKg: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'intense';
}

export function calculateBmiDetails(input: BmiCalculationInput) {
  const heightM = input.heightCm / 100;
  const bmi = Number((input.weightKg / (heightM * heightM)).toFixed(1));

  let category = 'Normal';
  let color = '#22c55e'; // green
  if (bmi < 18.5) {
    category = 'Underweight';
    color = '#38bdf8'; // blue
  } else if (bmi < 24.9) {
    category = 'Normal / Healthy Weight';
    color = '#22c55e'; // green
  } else if (bmi < 29.9) {
    category = 'Overweight';
    color = '#f59e0b'; // amber
  } else {
    category = 'Obese';
    color = '#ef4444'; // red
  }

  // Deurenberg Body Fat Estimate: (1.20 * BMI) + (0.23 * age) - (10.8 * gender) - 5.4
  // gender: male = 1, female = 0
  const genderFactor = input.gender === 'female' ? 0 : 1;
  const bodyFatEstimate = Number(
    Math.max(
      6,
      1.2 * bmi + 0.23 * input.age - 10.8 * genderFactor - 5.4
    ).toFixed(1)
  );

  // Mifflin-St Jeor BMR
  let bmr =
    10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age + (input.gender === 'female' ? -161 : 5);
  
  // Activity multiplier
  const multiplier =
    input.activityLevel === 'intense'
      ? 1.725
      : input.activityLevel === 'moderate'
      ? 1.55
      : input.activityLevel === 'light'
      ? 1.375
      : 1.2;

  const tdee = Math.round(bmr * multiplier);
  const idealWeightMin = Math.round(18.5 * (heightM * heightM));
  const idealWeightMax = Math.round(24.9 * (heightM * heightM));
  const waterLiters = Number((input.weightKg * 0.035).toFixed(1));

  return {
    bmi,
    category,
    color,
    bodyFatEstimate,
    bmr: Math.round(bmr),
    dailyCaloriesTdee: tdee,
    idealWeightRange: `${idealWeightMin} kg – ${idealWeightMax} kg`,
    waterLiters,
  };
}

export function generateDietAndWorkoutPlan(data: {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  goal: 'fat_loss' | 'weight_gain' | 'muscle_gain' | 'maintenance';
  dietType: 'veg' | 'non_veg' | 'eggitarian' | 'vegan';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'intense';
}): DietPlanResult {
  const bmiCalc = calculateBmiDetails({
    heightCm: data.heightCm,
    weightKg: data.weightKg,
    age: data.age,
    gender: data.gender,
    activityLevel: data.activityLevel,
  });

  let targetCalories = bmiCalc.dailyCaloriesTdee;
  if (data.goal === 'fat_loss') {
    targetCalories = Math.max(1300, Math.round(targetCalories * 0.8)); // 20% deficit
  } else if (data.goal === 'weight_gain' || data.goal === 'muscle_gain') {
    targetCalories = Math.round(targetCalories * 1.15); // 15% surplus
  }

  // Protein targets
  let proteinFactor = 1.8;
  if (data.goal === 'fat_loss') proteinFactor = 2.0;
  if (data.goal === 'muscle_gain') proteinFactor = 2.2;
  const proteinGrams = Math.round(data.weightKg * proteinFactor);
  const fatsGrams = Math.round((targetCalories * 0.25) / 9);
  const carbsGrams = Math.max(
    50,
    Math.round((targetCalories - (proteinGrams * 4 + fatsGrams * 9)) / 4)
  );

  // Generate authentic Indian meals based on dietary preference
  let meals = [];
  if (data.dietType === 'non_veg') {
    meals = [
      {
        timing: '7:30 AM (Wakeup / Pre-Breakfast)',
        name: 'Morning Metabolic Ignition',
        foods: [
          '500ml warm water with 1/2 lemon & Himalayan pink salt',
          '4 Soaked Almonds + 2 Walnut halves',
          '1 Scoop Whey Protein with cold water or 3 Boiled Egg Whites',
        ],
        calories: Math.round(targetCalories * 0.12),
        proteinGrams: 28,
      },
      {
        timing: '9:00 AM (Power Breakfast)',
        name: 'High-Protein Breakfast',
        foods: [
          '2 Whole Boiled Eggs + 2 Egg Whites Bhurji',
          '2 Slices Whole Grain / Multigrain Toast with light butter',
          '1 Cup Green Tea or Black Coffee (No Sugar)',
        ],
        calories: Math.round(targetCalories * 0.22),
        proteinGrams: 30,
      },
      {
        timing: '1:30 PM (Mid-Day Sustenance)',
        name: 'Balanced Indian Lunch',
        foods: [
          '150g Grilled / Curried Chicken Breast (cooked in minimal mustard oil)',
          '2 Medium Phulkas / Roti (Wheat + Oats flour)',
          '1 Bowl Yellow Dal or Rajma',
          'Large Cucumber, Tomato & Beetroot Salad with lemon',
        ],
        calories: Math.round(targetCalories * 0.3),
        proteinGrams: 42,
      },
      {
        timing: '5:00 PM (Pre-Workout Fuel)',
        name: 'Energy & Pump Primer',
        foods: [
          '1 Large Banana or 1 Apple with 1 tbsp Organic Peanut Butter',
          '1 Cup Strong Espresso / Black Coffee (30 mins before workout)',
        ],
        calories: Math.round(targetCalories * 0.1),
        proteinGrams: 6,
      },
      {
        timing: '7:30 PM (Post-Workout Recovery)',
        name: 'Anabolic Repair Window',
        foods: [
          '1 Scoop Whey Protein Isolate with water',
          '3 Boiled Egg Whites sprinkled with black pepper',
        ],
        calories: Math.round(targetCalories * 0.12),
        proteinGrams: 35,
      },
      {
        timing: '9:30 PM (Recovery Dinner)',
        name: 'Light Protein Dinner',
        foods: [
          '150g Steamed Fish / Grilled Chicken or Boiled Dal & 100g Paneer',
          'Sauteed seasonal green vegetables (Beans, Carrots, Broccoli)',
          '1 Bowl Fresh Curd / Dahi',
        ],
        calories: Math.round(targetCalories * 0.14),
        proteinGrams: 30,
      },
    ];
  } else {
    // Pure Veg / Eggitarian
    meals = [
      {
        timing: '7:30 AM (Wakeup / Pre-Breakfast)',
        name: 'Morning Detox & Awakening',
        foods: [
          '500ml warm water with 1 tbsp chia seeds & lemon',
          '5 Soaked Almonds + 2 Anjeer (Figs)',
          '1 Scoop Plant or Whey Protein (or 1 glass skimmed milk with sattu)',
        ],
        calories: Math.round(targetCalories * 0.12),
        proteinGrams: 26,
      },
      {
        timing: '9:00 AM (Power Breakfast)',
        name: 'High-Protein Vegetarian Breakfast',
        foods: [
          '2 Moong Dal Chilla or Besan Chilla stuffed with 60g Low-Fat Paneer',
          'Mint Coriander Chutney (homemade, no sugar)',
          '1 Cup Masala Black Tea / Green Tea',
        ],
        calories: Math.round(targetCalories * 0.22),
        proteinGrams: 24,
      },
      {
        timing: '1:30 PM (Indian High-Protein Lunch)',
        name: 'Nutrient-Dense Vegetarian Lunch',
        foods: [
          '100g Low-Fat Paneer Bhurji OR 50g Boiled Soya Chunks Curry',
          '2 Multigrain Rotis (Jowar, Bajra & Wheat blend)',
          '1 Bowl Thick Moong / Chana Dal',
          '1 Bowl Fresh Dahi (Curd) + Sprouted Green Salad',
        ],
        calories: Math.round(targetCalories * 0.32),
        proteinGrams: 36,
      },
      {
        timing: '5:00 PM (Pre-Workout Snack)',
        name: 'Sustained Gym Fuel',
        foods: [
          '1 Medium Apple or Sweet Potato (100g boiled) with roasted jeera',
          'Handful Roasted Makhana or Peanuts',
          '1 Cup Black Coffee or Pre-Workout',
        ],
        calories: Math.round(targetCalories * 0.1),
        proteinGrams: 6,
      },
      {
        timing: '7:30 PM (Post-Workout Anabolic Fuel)',
        name: 'Muscle Protein Synthesis Boost',
        foods: [
          '1 Scoop Whey Protein in chilled water',
          '1 Rice Cake or 1 slice brown bread with peanut butter',
        ],
        calories: Math.round(targetCalories * 0.12),
        proteinGrams: 28,
      },
      {
        timing: '9:30 PM (Nourishing Dinner)',
        name: 'Gut-Friendly Light Dinner',
        foods: [
          '1 Bowl High-Protein Dalia Khichdi with lots of green veggies',
          '100g Paneer Tofu or Stir-Fried Soya Chunks',
          'Cucumber mint raita (100g curd)',
        ],
        calories: Math.round(targetCalories * 0.12),
        proteinGrams: 26,
      },
    ];
  }

  // Workout Split
  const workoutSplit = [
    {
      day: 'Day 1 (Monday)',
      focus: 'Push Day: Chest, Shoulders & Triceps',
      exercises: [
        'Barbell Flat Bench Press: 4 sets x 8-10 reps',
        'Incline Dumbbell Press: 3 sets x 10-12 reps',
        'Seated Dumbbell Overhead Shoulder Press: 4 sets x 10 reps',
        'Cable Lateral Raises: 4 sets x 15 reps',
        'Cable Rope Tricep Pushdowns: 3 sets x 12 reps',
      ],
    },
    {
      day: 'Day 2 (Tuesday)',
      focus: 'Pull Day: Back, Rear Delts & Biceps',
      exercises: [
        'Lat Pulldowns or Pull-Ups: 4 sets x 10 reps',
        'Barbell Bent-Over Rows: 4 sets x 8-10 reps',
        'Seated Cable Rows: 3 sets x 12 reps',
        'Face Pulls (Rear Delts): 4 sets x 15 reps',
        'Incline Dumbbell Bicep Curls: 3 sets x 12 reps',
      ],
    },
    {
      day: 'Day 3 (Wednesday)',
      focus: 'Leg Day & Core Foundation',
      exercises: [
        'Barbell Back Squats or Hack Squats: 4 sets x 8-10 reps',
        'Leg Press: 4 sets x 12 reps',
        'Romanian Dumbbell Deadlifts (Hamstrings): 3 sets x 10-12 reps',
        'Standing Calf Raises: 4 sets x 15-20 reps',
        'Hanging Leg Raises: 3 sets x 15 reps',
      ],
    },
    {
      day: 'Day 4 (Thursday)',
      focus: 'Active Rest or Low-Impact Mobility & Cardio',
      exercises: [
        '30 Mins Incline Treadmill Walk at Gym Holic Cardio Deck',
        'Hip & Thoracic Spine Mobility Drills',
        '15 Mins Sauna / Steam Bath Recovery Session',
      ],
    },
    {
      day: 'Day 5 (Friday)',
      focus: 'Upper Body Hypertrophy Blitz',
      exercises: [
        'Incline Barbell Bench Press: 4 sets x 8 reps',
        'Neutral Grip Dumbbell Rows: 4 sets x 10 reps',
        'Dumbbell Lateral Raises Dropset: 3 sets x 12-15 reps',
        'EZ-Bar Preacher Curls: 3 sets x 10 reps',
        'Overhead Dumbbell Tricep Extension: 3 sets x 12 reps',
      ],
    },
    {
      day: 'Day 6 (Saturday)',
      focus: 'Lower Body & Functional Core Conditioning',
      exercises: [
        'Bulgarian Split Squats: 3 sets x 10 reps each leg',
        'Lying Hamstring Leg Curls: 4 sets x 12 reps',
        'Kettlebell Swings (CrossFit Zone): 4 sets x 20 reps',
        'Ab Wheel Rollouts: 3 sets x 12 reps',
      ],
    },
    {
      day: 'Day 7 (Sunday)',
      focus: 'Rest, Recharge & Nutrition Prep',
      exercises: ['Full day rest & weekly meal planning'],
    },
  ];

  const supplements = [
    {
      name: '100% Whey Protein Isolate / Concentrate',
      dosage: '1 scoop (24-27g protein) daily post-workout',
      benefit: 'Accelerates muscle recovery and hits daily protein targets easily.',
      timing: 'Immediately after workout or with breakfast',
    },
    {
      name: 'Micronized Creatine Monohydrate',
      dosage: '3g - 5g daily with water or juice',
      benefit: 'Increases muscular strength, cell hydration, and explosive power output.',
      timing: 'Consistent daily timing (Pre or Post workout)',
    },
    {
      name: 'Daily Multivitamin with Zinc & D3',
      dosage: '1 tablet daily with lunch',
      benefit: 'Supports immune defenses, bone density, and metabolic energy production.',
      timing: 'With lunch meal',
    },
    {
      name: 'Fish Oil (Omega-3 EPA/DHA) or Flaxseed Oil',
      dosage: '1000mg capsule daily',
      benefit: 'Reduces joint inflammation and supports cardiovascular endurance.',
      timing: 'With evening meal',
    },
  ];

  return {
    name: data.name,
    age: data.age,
    gender: data.gender,
    heightCm: data.heightCm,
    weightKg: data.weightKg,
    goal: data.goal,
    dietType: data.dietType,
    activityLevel: data.activityLevel,
    bmi: bmiCalc.bmi,
    bmiCategory: bmiCalc.category,
    dailyCalories: targetCalories,
    macros: {
      proteinGrams,
      carbsGrams,
      fatsGrams,
    },
    waterIntakeLiters: bmiCalc.waterLiters,
    meals,
    workoutSplit,
    supplements,
    couponCode: 'GYMHOLIC10',
  };
}
