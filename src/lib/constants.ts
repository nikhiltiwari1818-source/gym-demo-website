import { GymDetails } from '@/types';

export const GYM_DETAILS: GymDetails = {
  name: 'Gym Holic, The Fitness Club',
  tagline: "Ambikapur's Premier Strength & Conditioning Club",
  address: 'Above Bank of India, Ram Mandir Road, Manendragarh Road',
  landmark: 'Above Bank of India, Ram Mandir Road',
  city: 'Ambikapur',
  state: 'Chhattisgarh',
  pincode: '497001',
  phone: '+91 88188 75600',
  secondaryPhone: '+91 70009 42747',
  whatsapp: '918818875600',
  email: 'contact@gymholicfitness.com',
  rating: 4.8,
  reviewsCount: 142,
  googleMapsUrl: 'https://maps.app.goo.gl/cyS5dvfGwdLuXo458',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3669.219875!2d83.1933196!3d23.1186501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDA3JzA3LjEiTiA4M8KwMTEnMzYuMCJF!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
  coordinates: {
    lat: 23.1186501,
    lng: 83.1933196,
  },
  timings: {
    monday: 'Open 24 Hours',
    tuesdayToSaturday: '5:00 AM – 10:30 PM',
    sunday: '6:00 AM – 1:00 PM (Recovery & Yoga)',
  },
};

export const AMBIKAPUR_LANDMARKS = [
  { name: 'Ambikapur Bus Stand', distanceKm: 1.8, travelTimeMins: 5 },
  { name: 'Clock Tower / Ghadi Chowk', distanceKm: 1.5, travelTimeMins: 4 },
  { name: 'Gandhi Chowk', distanceKm: 1.2, travelTimeMins: 3 },
  { name: 'Government Medical College (GMC)', distanceKm: 3.1, travelTimeMins: 8 },
  { name: 'Ring Road Junction', distanceKm: 2.4, travelTimeMins: 6 },
  { name: 'Banaras Road / Holy Cross School', distanceKm: 2.0, travelTimeMins: 5 },
  { name: 'Sanjay Park / Circuit House', distanceKm: 2.2, travelTimeMins: 6 },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Live Crowd', href: '/#live-crowd' },
  { label: 'BMI & AI Diet', href: '/#bmi-diet' },
  { label: 'Memberships', href: '/#memberships' },
  { label: 'Facilities', href: '/#facilities' },
  { label: 'Trainers', href: '/#trainers' },
  { label: 'Transformations', href: '/#transformations' },
  { label: 'Affiliate Store', href: '/store' },
  { label: 'Blog', href: '/blog' },
  { label: 'Location', href: '/#location' },
];

export const FAQS = [
  {
    question: 'Where is Gym Holic located in Ambikapur?',
    answer:
      'Gym Holic, The Fitness Club is located above Bank of India on Ram Mandir Road, off Manendragarh Road in Ambikapur, Chhattisgarh (PIN 497001). We are centrally located and only 3-5 minutes from Gandhi Chowk and the Ambikapur Bus Stand.',
  },
  {
    question: 'What are the gym operating hours?',
    answer:
      'We are open 24 hours on Mondays! From Tuesday to Saturday, we operate from 5:00 AM to 10:30 PM continuously. On Sundays, we host special yoga, recovery, and open workout sessions from 6:00 AM to 1:00 PM.',
  },
  {
    question: 'Is Gym Holic a unisex gym and is it safe for female members?',
    answer:
      'Yes! Gym Holic is Ambikapur’s premier unisex fitness club. We pride ourselves on a welcoming, safe, respectful, and hygienic atmosphere with dedicated certified female fitness specialists, separate luxury shower/changing rooms, CCTV surveillance, and biometric access.',
  },
  {
    question: 'Do you offer a free trial before joining?',
    answer:
      'Absolutely! We offer a Complimentary 1-Day VIP Guest Pass for local residents to experience our equipment, vibe, and amenities. You can book your pass on this website or simply WhatsApp us at +91 88188 75600.',
  },
  {
    question: 'Are diet plans and personal training included in memberships?',
    answer:
      'All quarterly, half-yearly, and annual memberships include a complimentary initial fitness assessment and personalized Indian diet chart. We also offer specialized 1-on-1 Personal Training packages with K11 and ISSA certified trainers.',
  },
  {
    question: 'Can I pay my membership fee online via UPI or Card?',
    answer:
      'Yes, we accept all digital payment modes including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, Debit/Credit Cards, and Razorpay checkout right on the website.',
  },
  {
    question: 'What kind of gym equipment does Gym Holic have?',
    answer:
      'Our facility features imported biomechanically engineered plate-loaded and selectorized machines (Hammer Strength style), a comprehensive dumbbell rack up to 50kg, Olympic lifting platforms, commercial treadmills, stair climbers, air bikes, and a CrossFit functional turf arena.',
  },
  {
    question: 'How do I check the best time to workout without crowd?',
    answer:
      'You can check our "Live Gym Busy Meter" right on our homepage! It tracks real-time traffic levels (Low, Moderate, High) and indicates current occupancy so you can plan your workout during peaceful off-peak hours (11:00 AM – 4:00 PM).',
  },
];
