import {
  MembershipPlan,
  CrowdStatus,
  AffiliateProduct,
  Trainer,
  TransformationStory,
  Testimonial,
  BlogPost,
} from '@/types';

export const INITIAL_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-1m',
    name: 'Kickstarter Monthly',
    duration: '1 Month',
    durationMonths: 1,
    priceINR: 1499,
    originalPriceINR: 2000,
    discountPercentage: 25,
    badge: 'Flexible',
    description: 'Perfect for beginners starting their fitness journey or visiting Ambikapur.',
    features: [
      'Full Gym & CrossFit Floor Access',
      'Cardio & Strength Machines',
      'Free Locker & Changing Room Access',
      'Basic Machine Orientation',
      'Biometric Check-in',
      'WiFi & RO Purified Water',
    ],
  },
  {
    id: 'plan-3m',
    name: 'Transformation Quarterly',
    duration: '3 Months',
    durationMonths: 3,
    priceINR: 3799,
    originalPriceINR: 5400,
    discountPercentage: 30,
    isPopular: true,
    badge: 'Most Popular',
    description: 'The sweet spot for visible physical transformation and habit formation.',
    features: [
      'All 1-Month Plan Features',
      'Complimentary BMI & Body Composition Test',
      'Personalized Indian Diet Chart',
      '1 Free 1-on-1 Personal Training Trial',
      'Steam Bath (Weekly Access)',
      'Free Workout Routine Updates',
    ],
  },
  {
    id: 'plan-6m',
    name: 'Pro Athlete Half-Yearly',
    duration: '6 Months',
    durationMonths: 6,
    priceINR: 6499,
    originalPriceINR: 9999,
    discountPercentage: 35,
    badge: 'High Value',
    description: 'Designed for serious fitness enthusiasts aiming for peak strength & hypertrophy.',
    features: [
      'All 3-Month Plan Features',
      '2 Free 1-on-1 Personal Training Sessions',
      'Bi-Weekly Nutrition & Macro Reviews',
      'Unlimited Steam Bath & Sauna Access',
      '1 Guest Pass per month for a friend',
      '10% Discount at Gym Holic Shake Bar',
    ],
  },
  {
    id: 'plan-12m',
    name: 'Elite Annual Lifetime',
    duration: '12 Months',
    durationMonths: 12,
    priceINR: 10999,
    originalPriceINR: 18000,
    discountPercentage: 39,
    badge: 'Best Value (Save ₹7,000)',
    description: 'Ultimate commitment to long-term health, elite physique, and peak stamina.',
    features: [
      'All 6-Month Plan Features',
      '4 Free 1-on-1 Personal Training Sessions',
      'Exclusive Gym Holic Branded Gym Bag & Shaker',
      'Monthly Advanced InBody Composition Scans',
      'Priority Locker Allocation',
      '1 Month Membership Freeze Option',
      '15% Off on All Affiliate Store Orders',
    ],
  },
];

export const INITIAL_CROWD_STATUS: CrowdStatus = {
  level: 'MODERATE',
  currentOccupancy: 38,
  maxCapacity: 110,
  percentage: 35,
  bestTimeToVisit: '11:00 AM – 4:30 PM & 9:00 PM – 10:30 PM',
  peakHours: '6:30 AM – 9:00 AM & 6:00 PM – 8:30 PM',
  statusMessage: 'Comfortable workout conditions. Plenty of free benches & squat racks available.',
  updatedAt: new Date().toISOString(),
};

export const INITIAL_AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'prod-1',
    title: 'Optimum Nutrition (ON) Gold Standard 100% Whey Protein (2 lb, Double Rich Chocolate)',
    brand: 'Optimum Nutrition',
    category: 'Whey Protein',
    priceINR: 3299,
    originalPriceINR: 3899,
    rating: 4.6,
    reviewsCount: 34200,
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop',
    affiliateUrl: 'https://www.amazon.in/dp/B000QSNZYO?tag=gymholic-21',
    platform: 'Amazon',
    isBestSeller: true,
    specs: {
      proteinPerServing: '24g Protein',
      servings: 29,
      weight: '907g (2 lbs)',
      flavors: ['Double Rich Chocolate', 'Vanilla Ice Cream', 'Mocha Cappuccino'],
      highlight: 'Gold standard quality with 5.5g naturally occurring BCAAs.',
    },
  },
  {
    id: 'prod-2',
    title: 'MuscleBlaze Biozyme Performance Whey (2 kg / 4.4 lb, Rich Chocolate)',
    brand: 'MuscleBlaze',
    category: 'Whey Protein',
    priceINR: 4699,
    originalPriceINR: 5799,
    rating: 4.5,
    reviewsCount: 18450,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=800&auto=format&fit=crop',
    affiliateUrl: 'https://www.healthkart.com/sv/muscleblaze-biozyme-performance-whey/SP-84992?ref=gymholic',
    platform: 'HealthKart',
    isBestSeller: true,
    specs: {
      proteinPerServing: '25g Protein',
      servings: 55,
      weight: '2 kg (4.4 lbs)',
      flavors: ['Rich Chocolate', 'Kesar Kulfi', 'Magical Mango'],
      highlight: 'Clinically tested for 50% higher protein absorption in Indian bodies.',
    },
  },
  {
    id: 'prod-3',
    title: 'Creapure Micronized Creatine Monohydrate Powder (300g, 100 Servings)',
    brand: 'MuscleBlaze / Creapure',
    category: 'Creatine',
    priceINR: 1199,
    originalPriceINR: 1699,
    rating: 4.7,
    reviewsCount: 9800,
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=800&auto=format&fit=crop',
    affiliateUrl: 'https://www.amazon.in/dp/B07P8R4F7W?tag=gymholic-21',
    platform: 'Amazon',
    specs: {
      proteinPerServing: '3g 100% Pure Creatine',
      servings: 100,
      weight: '300g',
      flavors: ['Unflavored'],
      highlight: 'German Creapure certified 99.99% pure for explosive power and strength.',
    },
  },
  {
    id: 'prod-4',
    title: 'Cellucor C4 Original Pre-Workout Explosive Energy (30 Servings, Fruit Punch)',
    brand: 'Cellucor',
    category: 'Pre Workout',
    priceINR: 2399,
    originalPriceINR: 3199,
    rating: 4.4,
    reviewsCount: 12100,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    affiliateUrl: 'https://www.healthkart.com/sv/cellucor-c4-original-pre-workout/SP-45120?ref=gymholic',
    platform: 'HealthKart',
    specs: {
      proteinPerServing: '150mg Caffeine + CarnoSyn Beta-Alanine',
      servings: 30,
      weight: '195g',
      flavors: ['Fruit Punch', 'Icy Blue Razz', 'Watermelon'],
      highlight: 'America’s #1 selling pre-workout for insane focus and muscle pumps.',
    },
  },
  {
    id: 'prod-5',
    title: 'Labrada Muscle Mass Gainer with High Calories & Protein (3 kg, Chocolate)',
    brand: 'Labrada',
    category: 'Mass Gainer',
    priceINR: 3499,
    originalPriceINR: 4299,
    rating: 4.3,
    reviewsCount: 7600,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop',
    affiliateUrl: 'https://www.flipkart.com/labrada-muscle-mass-gainer/p/itm12345?affid=gymholic',
    platform: 'Flipkart',
    specs: {
      proteinPerServing: '52g Protein / 1244 Calories',
      servings: 22,
      weight: '3 kg (6.6 lbs)',
      flavors: ['Chocolate', 'Vanilla', 'Strawberry'],
      highlight: 'Ideal for skinny beginners struggling to put on solid muscular weight.',
    },
  },
  {
    id: 'prod-6',
    title: 'Boldfit Stainless Steel Gym Shaker Bottle (750ml, Leak Proof)',
    brand: 'Boldfit',
    category: 'Shaker Bottles',
    priceINR: 599,
    originalPriceINR: 999,
    rating: 4.6,
    reviewsCount: 15400,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    affiliateUrl: 'https://www.amazon.in/dp/B08XYZ1234?tag=gymholic-21',
    platform: 'Amazon',
    specs: {
      weight: '750ml capacity',
      highlight: 'Food grade 18/8 stainless steel, odor resistant with whisk wire ball.',
    },
  },
  {
    id: 'prod-7',
    title: 'Kobo Leather Weightlifting Gym Gloves with Integrated Wrist Wrap Support',
    brand: 'Kobo',
    category: 'Gym Gloves',
    priceINR: 499,
    originalPriceINR: 899,
    rating: 4.4,
    reviewsCount: 6300,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
    affiliateUrl: 'https://www.amazon.in/dp/B01N234567?tag=gymholic-21',
    platform: 'Amazon',
    specs: {
      highlight: 'Reinforced silicone grip, protects palms against calluses during heavy deadlifts.',
    },
  },
  {
    id: 'prod-8',
    title: 'Slovic Heavy Duty Pull-Up Assist Resistance Bands Set (5 Resistance Levels)',
    brand: 'Slovic',
    category: 'Resistance Bands',
    priceINR: 1299,
    originalPriceINR: 2199,
    rating: 4.7,
    reviewsCount: 8200,
    image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?q=80&w=800&auto=format&fit=crop',
    affiliateUrl: 'https://www.flipkart.com/slovic-pull-up-resistance-bands/p/itm54321?affid=gymholic',
    platform: 'Flipkart',
    specs: {
      highlight: '100% natural Malaysian latex for pull-ups, warm-ups, and mobility.',
    },
  },
  {
    id: 'prod-9',
    title: 'Strauss Anti-Skid 6mm Premium EVA Yoga & Exercise Mat with Carrying Strap',
    brand: 'Strauss',
    category: 'Yoga Mats',
    priceINR: 699,
    originalPriceINR: 1299,
    rating: 4.5,
    reviewsCount: 11000,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop',
    affiliateUrl: 'https://www.amazon.in/dp/B00ABCD999?tag=gymholic-21',
    platform: 'Amazon',
    specs: {
      highlight: 'Extra cushioning for joints, sweat-resistant non-slip texture.',
    },
  },
  {
    id: 'prod-10',
    title: 'TrueBasics Daily Multivitamin with 23 Vital Nutrients + Brain & Joint Blend',
    brand: 'TrueBasics',
    category: 'Multivitamins',
    priceINR: 899,
    originalPriceINR: 1399,
    rating: 4.6,
    reviewsCount: 5200,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=800&auto=format&fit=crop',
    affiliateUrl: 'https://www.healthkart.com/sv/truebasics-multivitamin/SP-33100?ref=gymholic',
    platform: 'HealthKart',
    specs: {
      servings: 60,
      highlight: 'Fortified with Ashwagandha, Ginseng, Vitamin D3, and Zinc for gym recovery.',
    },
  },
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Vikram Rajput',
    role: 'Head Strength & Conditioning Coach',
    qualification: 'K11 Certified Master Trainer, ISSA CSCS',
    experienceYears: 8,
    specialization: ['Hypertrophy & Bodybuilding', 'Powerlifting', 'Kinesiology & Biomechanics'],
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop',
    instagram: 'coach_vikram_fitness',
    bio: 'Former State Powerlifting Medalist with over 8 years helping Ambikapur athletes break plateaus with science-backed training protocols.',
  },
  {
    id: 'trainer-2',
    name: 'Pooja Kashyap',
    role: 'Senior Female Fitness & Transformation Specialist',
    qualification: 'ACE Certified Personal Trainer, Pre/Post Natal Specialist',
    experienceYears: 6,
    specialization: ['Female Fat Loss', 'PCOS/PCOD Management', 'Core & Mobility Conditioning'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    instagram: 'pooja_kashyap_fit',
    bio: 'Dedicated to empowering women of all ages in Ambikapur to build functional strength, metabolic health, and unshakeable confidence.',
  },
  {
    id: 'trainer-3',
    name: 'Aman Deep Sharma',
    role: 'Sports Nutritionist & Functional Coach',
    qualification: 'Precision Nutrition L1, ISSA Certified Sports Nutritionist',
    experienceYears: 7,
    specialization: ['Custom Indian Diet Design', 'Endurance & CrossFit', 'Injury Rehabilitation'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    instagram: 'amandeep_nutrition',
    bio: 'Master of creating delicious, affordable Indian muscle-building diets that fit real life without cutting out rotis or ghar ka khana.',
  },
];

export const INITIAL_TRANSFORMATIONS: TransformationStory[] = [
  {
    id: 'trans-1',
    name: 'Rahul Agrawal',
    age: 28,
    category: 'Weight Loss',
    durationWeeks: 16,
    beforeWeight: '94 kg',
    afterWeight: '72 kg',
    achievement: 'Lost 22 kg fat & reversed borderline pre-diabetes',
    quote:
      'Gym Holic transformed my lifestyle completely. The trainers taught me progressive overload and gave me a practical Indian diet plan.',
    beforeImage: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'trans-2',
    name: 'Sneha Verma',
    age: 25,
    category: 'Fat Loss',
    durationWeeks: 12,
    beforeWeight: '68 kg (33% Body Fat)',
    afterWeight: '55 kg (21% Body Fat)',
    achievement: 'Dropped 4 dress sizes & overcame severe knee pain',
    quote:
      'As a woman, I was intimidated by weights until Coach Pooja guided me. Gym Holic has the safest and most respectful gym culture in Ambikapur.',
    beforeImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'trans-3',
    name: 'Mohit Sahu',
    age: 22,
    category: 'Muscle Gain',
    durationWeeks: 20,
    beforeWeight: '56 kg',
    afterWeight: '70 kg',
    achievement: 'Gained 14 kg lean muscle mass & doubled bench press',
    quote:
      'I was underweight and lacked confidence. Vikram sir taught me proper form on squats and deadlifts. The imported equipment here is top notch.',
    beforeImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop',
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Siddharth Mishra',
    location: 'Ambikapur (near Ram Mandir Road)',
    rating: 5,
    comment:
      'Hands down the cleanest, most modern gym in Ambikapur! Located right above Bank of India with great ventilation and heavy duty machines. Trainer knowledge on biomechanics is superior.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    date: '2 weeks ago',
    verifiedMember: true,
    googleReviewUrl: 'https://maps.app.goo.gl/cyS5dvfGwdLuXo458',
  },
  {
    id: 'test-2',
    name: 'Anjali Dewangan',
    location: 'Manendragarh Road, Ambikapur',
    rating: 5,
    comment:
      'Amazing atmosphere and superb playlist! As a female member, I feel 100% comfortable here. The crowd is dignified and Pooja maam is always attentive to our form and posture.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    date: '1 month ago',
    verifiedMember: true,
    googleReviewUrl: 'https://maps.app.goo.gl/cyS5dvfGwdLuXo458',
  },
  {
    id: 'test-3',
    name: 'Kunal Singh Deo',
    location: 'Gandhi Chowk, Ambikapur',
    rating: 5,
    comment:
      'Best gym in Surguja district! The Live Crowd meter on their website is a game changer – I check it before heading out from office so I never wait for the bench press.',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop',
    date: '3 weeks ago',
    verifiedMember: true,
    googleReviewUrl: 'https://maps.app.goo.gl/cyS5dvfGwdLuXo458',
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'indian-diet-plan-muscle-building',
    title: 'High Protein Indian Diet Plan for Muscle Building (130g+ Protein on a Budget)',
    category: 'Nutrition',
    excerpt:
      'A complete, realistic guide to hitting your daily protein macros in India without spending a fortune, featuring paneer, soya chunks, dalia, eggs, and curd.',
    content: `Building lean muscle in India often comes with the myth that vegetarian or home-cooked Indian meals cannot supply enough protein. At Gym Holic, we see hundreds of Ambikapur locals making unbelievable transformations eating everyday ghar ka khana with smart macro combinations.

### The Macro Blueprint
For muscle hypertrophy, aim for 1.6g to 2.0g of protein per kilogram of body weight. For a 70kg person, that is roughly 120-140 grams of protein daily.

### Top Indian High-Protein Staples
1. **Low-Fat Paneer**: 100g delivers 18g protein + healthy calcium.
2. **Soya Chunks / Meal Maker**: 50g uncooked provides a whopping 26g plant protein!
3. **Whole Eggs & Egg Whites**: 3 whole eggs + 3 egg whites provide ~27g high biological value protein.
4. **Moong Sprouts & Kala Chana**: Great for gut enzymes, complex fiber, and sustained workout fuel.
5. **Hung Curd / Greek Yogurt**: 200g provides 15-18g smooth protein and probiotics.

### Sample Daily Schedule
- **Morning (7:30 AM)**: 1 glass warm water with lemon + 1 scoop Whey Protein or 4 boiled egg whites + 1 banana.
- **Breakfast (9:00 AM)**: Oats with milk and almonds OR 2 besan chilla with mint chutney.
- **Lunch (1:30 PM)**: 2 multi-grain rotis, 100g paneer bhurji or chicken breast, 1 bowl dal, large cucumber salad.
- **Pre-Workout (5:00 PM)**: 1 cup black coffee + 2 slices brown bread with peanut butter.
- **Post-Workout (7:30 PM)**: 1 scoop Whey Isolate or 50g boiled soya chunks salad with lemon and chaat masala.
- **Dinner (9:30 PM)**: 1 bowl yellow dal tadka, sauteed seasonal vegetables, 150g curd.`,
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Aman Deep Sharma',
      role: 'Certified Sports Nutritionist, Gym Holic',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    },
    publishedAt: '2026-03-15',
  },
  {
    id: 'blog-2',
    slug: 'science-backed-fat-loss-guide',
    title: 'How to Lose Belly Fat: 7 Science-Backed Steps That Actually Work',
    category: 'Weight Loss',
    excerpt:
      'Stop doing 500 crunches a day. Discover how caloric deficit, progressive strength training, and NEAT accelerate stubborn visceral fat loss.',
    content: `Spot reduction is the single most common fitness myth. Doing endless crunches will strengthen your abdominal wall, but it will not burn the layer of fat sitting on top of it. Here is the actual physiological process to drop body fat sustainably.

### 1. Maintain a Moderate Caloric Deficit
Calculate your TDEE (Total Daily Energy Expenditure) using our website's BMI calculator and eat 300 to 500 calories below maintenance. This burns fat without causing metabolic slowdown or muscle loss.

### 2. Prioritize Heavy Compound Lifts
Squats, deadlifts, barbell rows, and overhead presses recruit multiple large muscle groups simultaneously, triggering high EPOC (Excess Post-Exercise Oxygen Consumption) and torching calories for up to 36 hours post-workout.

### 3. Boost Your NEAT (Non-Exercise Activity Thermogenesis)
Walking 8,000 to 10,000 steps daily around Ambikapur burns more fat over a week than three intense cardio sessions on a treadmill.`,
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Vikram Rajput',
      role: 'Head Coach, Gym Holic',
      avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=150&auto=format&fit=crop',
    },
    publishedAt: '2026-03-20',
  },
  {
    id: 'blog-3',
    slug: 'creatine-monohydrate-timing-guide',
    title: 'The Complete Creatine Guide: When, How, and Why You Need It',
    category: 'Supplements',
    excerpt:
      'Is creatine safe for your kidneys? Do you need a loading phase? Here are all the clinical facts on the world’s most researched fitness supplement.',
    content: `Creatine monohydrate is the gold standard of sports performance supplements. It replenishes adenosine triphosphate (ATP), the body's primary energy currency during short bursts of high-intensity physical exertion like heavy lifting or sprinting.

### Key Benefits
- **5-15% increase in maximal power output and strength**
- **Enhanced cell hydration and muscle fullness**
- **Faster inter-set recovery**
- **Cognitive and brain performance benefits**

### Do You Need a Loading Phase?
No! While taking 20g/day for 5-7 days will saturate muscle phosphocreatine stores faster, taking 3-5g consistently once daily will achieve full saturation in about 3 weeks without any gastrointestinal distress.`,
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Aman Deep Sharma',
      role: 'Certified Sports Nutritionist, Gym Holic',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    },
    publishedAt: '2026-03-22',
  },
  {
    id: 'blog-4',
    slug: 'top-beginner-gym-mistakes',
    title: 'Top 5 Mistakes Beginners Make in the Gym (And How to Fix Them)',
    category: 'Fitness Tips',
    excerpt:
      'Avoid ego lifting, skipping warm-ups, and program hopping to prevent injuries and guarantee steady progress.',
    content: `Walking into a gym for the first time can feel overwhelming. Here are the 5 biggest traps to avoid to ensure your fitness journey is safe, enjoyable, and productive.

1. **Ego Lifting**: Loading more weight than your tendons and joints can handle with compromised form is the #1 cause of rotator cuff and lower back injuries.
2. **Ignoring Progressive Overload**: Doing the exact same exercises with the exact same weight for months will stop your progress in its tracks.
3. **Skipping Warm-ups and Mobility**: 5 minutes of dynamic joint mobility before lifting increases synovial fluid and prepares your nervous system.
4. **Under-eating Protein**: Training breaks muscle tissue down; adequate dietary protein and 7-8 hours of sleep is where muscle actually repairs and grows.
5. **Not Asking For Help**: Our certified Gym Holic trainers on the gym floor are always ready to correct your posture and guide your machine setup!`,
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Pooja Kashyap',
      role: 'Senior Transformation Coach, Gym Holic',
      avatar: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=150&auto=format&fit=crop',
    },
    publishedAt: '2026-03-24',
  },
];
