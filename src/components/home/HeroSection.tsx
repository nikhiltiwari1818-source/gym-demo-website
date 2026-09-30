'use client';

import React from 'react';
import {
  Sparkles,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Trophy,
  Activity,
  Flame,
} from 'lucide-react';
import { GYM_DETAILS } from '@/lib/constants';

interface HeroSectionProps {
  onOpenTrialModal: () => void;
  onOpenDietModal: () => void;
  onScrollToPlans: () => void;
}

export default function HeroSection({
  onOpenTrialModal,
  onOpenDietModal,
  onScrollToPlans,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#09090b]">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.18),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2315_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2315_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-zinc-900 to-amber-500/15 border border-amber-500/40 shadow-lg shadow-amber-500/10 mb-6 backdrop-blur-md">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-bold text-amber-300">
            4.8 Rating • 140+ Google Reviews
          </span>
          <span className="hidden sm:inline text-zinc-500">•</span>
          <span className="hidden sm:inline text-xs text-zinc-300 font-medium">
            Ambikapur, Chhattisgarh
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-6">
          TRANSFORM YOUR BODY.{' '}
          <span className="block gold-gradient-text uppercase">
            DOMINATE YOUR LIMITS.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          Ambikapur&apos;s premier unisex fitness sanctuary. State-of-the-art imported biomechanical equipment, certified elite trainers, custom Indian nutrition protocols, and a high-energy community that drives real results.
        </p>

        {/* Primary CTA Button Cluster */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto mb-14">
          {/* Free Trial Button */}
          <button
            onClick={onOpenTrialModal}
            className="flex-1 min-w-[200px] px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>Claim 1-Day Free Pass</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Join Now Button */}
          <button
            onClick={onScrollToPlans}
            className="flex-1 min-w-[180px] px-6 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm sm:text-base border border-amber-500/40 hover:border-amber-400 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>View Memberships</span>
          </button>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${GYM_DETAILS.whatsapp}?text=Hi%20Gym%20Holic!%20I'd%20like%20to%20enquire%20about%20membership%20plans%20and%20personal%20training.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Us</span>
          </a>

          {/* Call Now */}
          <a
            href={`tel:${GYM_DETAILS.phone}`}
            className="px-5 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call Now</span>
          </a>
        </div>

        {/* AI Diet Banner Teaser */}
        <div className="max-w-2xl mx-auto mb-16 p-3 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-amber-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                Free Instant AI Indian Diet & Workout Plan
              </p>
              <p className="text-[11px] text-zinc-400">
                Calculates your BMI, TDEE, authentic Indian meals & PDF download in 30 seconds.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenDietModal}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all shrink-0 shadow-md"
          >
            Generate Free Plan →
          </button>
        </div>

        {/* Key Credibility Numbers / Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-zinc-800/80">
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">4.8 ★</div>
            <div className="text-xs text-zinc-400 font-medium">Google Maps Rating</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
            <div className="text-2xl sm:text-3xl font-black text-white mb-1">1,200+</div>
            <div className="text-xs text-zinc-400 font-medium">Lives Transformed</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">100%</div>
            <div className="text-xs text-zinc-400 font-medium">Certified K11/ISSA Coaches</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
            <div className="text-2xl sm:text-3xl font-black text-white mb-1">8,000+</div>
            <div className="text-xs text-zinc-400 font-medium">Sq.Ft Premium Floor</div>
          </div>
        </div>
      </div>
    </section>
  );
}
