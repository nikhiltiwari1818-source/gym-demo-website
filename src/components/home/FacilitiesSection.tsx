'use client';

import React from 'react';
import {
  ShieldCheck,
  Dumbbell,
  Flame,
  Wind,
  Coffee,
  Lock,
  Wifi,
  Car,
  Sparkles,
  HeartPulse,
} from 'lucide-react';

export default function FacilitiesSection() {
  const facilities = [
    {
      icon: Dumbbell,
      title: 'Imported Biomechanical Machinery',
      desc: 'Hammer Strength & Life Fitness style plate-loaded and pin-selected machines aligned to natural human joint mechanics.',
    },
    {
      icon: Flame,
      title: 'Aromatherapy Steam Bath & Sauna',
      desc: 'Dedicated steam suites to accelerate muscle recovery, reduce DOMS soreness, and flush out metabolic toxins.',
    },
    {
      icon: HeartPulse,
      title: 'Cardio Deck & Aerobics Floor',
      desc: 'Commercial curved treadmills, stair climbers, rowing ergometers, and spin bikes with heart rate telemetry.',
    },
    {
      icon: ShieldCheck,
      title: 'Biometric Access & 24/7 CCTV',
      desc: 'High-security biometric check-in with high-resolution CCTV surveillance across all floors for complete safety.',
    },
    {
      icon: Coffee,
      title: 'Protein Shake & Supplement Bar',
      desc: 'Freshly blended whey shakes, pre-workout shots, BCAA coolers, and healthy clean snacks prepared on-demand.',
    },
    {
      icon: Lock,
      title: 'Private Lockers & Luxury Showers',
      desc: 'Clean, spacious, separate male and female changing rooms with hot/cold rain showers and secure digital lockers.',
    },
    {
      icon: Wind,
      title: 'Climate Controlled Air Purification',
      desc: 'Heavy-duty industrial air conditioning with multi-stage HEPA filtration providing continuous oxygen-rich air circulation.',
    },
    {
      icon: Car,
      title: 'Ample Dedicated Member Parking',
      desc: 'Convenient ground-floor parking space for two-wheelers and four-wheelers right at the Ram Mandir Road entrance.',
    },
  ];

  return (
    <section className="py-20 bg-[#0d0d12] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Unmatched Amenities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            WORLD-CLASS <span className="gold-gradient-text">AMENITIES & FACILITIES</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Every square foot of Gym Holic is designed to provide Ambikapur with an elite international workout standard.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {fac.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
