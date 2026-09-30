'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyMobileBar from '@/components/layout/StickyMobileBar';
import WhatsAppFloatingButton from '@/components/layout/WhatsAppFloatingButton';

import HeroSection from '@/components/home/HeroSection';
import GymIntroSection from '@/components/home/GymIntroSection';
import LiveCrowdMeter from '@/components/home/LiveCrowdMeter';
import BmiCalculatorSection from '@/components/home/BmiCalculatorSection';
import MembershipSection from '@/components/home/MembershipSection';
import FacilitiesSection from '@/components/home/FacilitiesSection';
import TrainerSection from '@/components/home/TrainerSection';
import TransformationsSection from '@/components/home/TransformationsSection';
import AffiliateStoreShowcase from '@/components/home/AffiliateStoreShowcase';
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection';
import MapDistanceSection from '@/components/home/MapDistanceSection';
import FaqSection from '@/components/home/FaqSection';
import ContactSection from '@/components/home/ContactSection';

import AiDietPlanModal from '@/components/diet/AiDietPlanModal';
import CheckoutModal from '@/components/membership/CheckoutModal';
import OnlineConsultationModal from '@/components/home/OnlineConsultationModal';
import FreeTrialModal from '@/components/home/FreeTrialModal';

import { MembershipPlan, Trainer } from '@/types';
import { INITIAL_MEMBERSHIP_PLANS } from '@/lib/seed-data';

export default function HomePage() {
  // Modal states
  const [isDietModalOpen, setIsDietModalOpen] = useState(false);
  const [dietInitialData, setDietInitialData] = useState<{
    heightCm?: number;
    weightKg?: number;
    age?: number;
    gender?: 'male' | 'female' | 'other';
  }>({});

  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(INITIAL_MEMBERSHIP_PLANS[1]); // default 3-month
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | undefined>(undefined);

  const handleOpenDietModalWithData = (data: {
    heightCm: number;
    weightKg: number;
    age: number;
    gender: 'male' | 'female' | 'other';
  }) => {
    setDietInitialData(data);
    setIsDietModalOpen(true);
  };

  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleBookTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsConsultationOpen(true);
  };

  const handleScrollToPlans = () => {
    const el = document.getElementById('memberships');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
        onOpenDietModal={() => setIsDietModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenTrialModal={() => setIsTrialModalOpen(true)}
          onOpenDietModal={() => setIsDietModalOpen(true)}
          onScrollToPlans={handleScrollToPlans}
        />

        {/* 2. Gym Intro & Ambikapur Story + Visual Zones Gallery */}
        <GymIntroSection onOpenTrialModal={() => setIsTrialModalOpen(true)} />

        {/* 3. Live Gym Crowd System (Gym Busy Meter) */}
        <LiveCrowdMeter />

        {/* 4. Advanced BMI Calculator & Macro Analyzer */}
        <BmiCalculatorSection
          onOpenDietModalWithData={handleOpenDietModalWithData}
        />

        {/* 5. Membership Packages & Pricing */}
        <MembershipSection
          onSelectPlan={handleSelectPlan}
          onOpenTrialModal={() => setIsTrialModalOpen(true)}
        />

        {/* 6. Facilities & Luxury Amenities */}
        <FacilitiesSection />

        {/* 7. Elite Certified Trainer Profiles */}
        <TrainerSection onBookTrainer={handleBookTrainer} />

        {/* 8. Transformation Stories & Interactive Comparison Slider */}
        <TransformationsSection
          onOpenTrialModal={() => setIsTrialModalOpen(true)}
        />

        {/* 9. Affiliate Supplement & Gear Store Showcase */}
        <AffiliateStoreShowcase />

        {/* 10. Google Reviews & Testimonials Carousel */}
        <GoogleReviewsSection />

        {/* 11. Google Map Embed & Ambikapur Landmark Distance Calculator */}
        <MapDistanceSection />

        {/* 12. Frequently Asked Questions (FAQ) */}
        <FaqSection />

        {/* 13. Contact & Enquiry Form */}
        <ContactSection onOpenTrialModal={() => setIsTrialModalOpen(true)} />
      </main>

      {/* Modals */}
      <AiDietPlanModal
        isOpen={isDietModalOpen}
        onClose={() => setIsDietModalOpen(false)}
        initialData={dietInitialData}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlan={selectedPlan}
      />

      <OnlineConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        trainerName={selectedTrainer?.name}
      />

      <FreeTrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
      />

      {/* Sticky Mobile Conversion Bar */}
      <StickyMobileBar
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
        onOpenPlanModal={() => {
          setSelectedPlan(INITIAL_MEMBERSHIP_PLANS[1]);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
