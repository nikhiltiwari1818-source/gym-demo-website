'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Award,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { GYM_DETAILS } from '@/lib/constants';

interface GymIntroSectionProps {
  onOpenTrialModal: () => void;
}

export default function GymIntroSection({ onOpenTrialModal }: GymIntroSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'strength' | 'cardio' | 'crossfit' | 'recovery'>('all');

  const galleryImages = [
    {
      category: 'strength',
      title: 'Heavy Duty Dumbbell & Olympic Platform Floor',
      tag: 'Strength Arena',
      src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    },
    {
      category: 'strength',
      title: 'Biomechanically Engineered Hammer Strength Machines',
      tag: 'Hypertrophy Zone',
      src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop',
    },
    {
      category: 'cardio',
      title: 'Commercial Curved Treadmills & StairMasters',
      tag: 'Cardio Deck',
      src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop',
    },
    {
      category: 'crossfit',
      title: 'Turf Functional Sprint Track & Battle Ropes',
      tag: 'CrossFit Zone',
      src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    },
    {
      category: 'crossfit',
      title: 'Olympic Bumper Plates & Kettlebell Rack',
      tag: 'Functional Power',
      src: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop',
    },
    {
      category: 'recovery',
      title: 'Aromatherapy Steam Bath & Private Showers',
      tag: 'Recovery Lounge',
      src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const filteredImages =
    activeTab === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeTab);

  return (
    <section id="facilities" className="py-20 bg-[#0d0d12] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Ambikapur&apos;s Fitness Revolution
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              MORE THAN A GYM.{' '}
              <span className="gold-gradient-text block">A SCIENCE-BACKED SANCTUARY.</span>
            </h2>

            <p className="text-zinc-300 text-base leading-relaxed">
              Located on Ram Mandir Road above Bank of India, <strong>Gym Holic</strong> was built to redefine fitness in Surguja. We noticed local gyms were overcrowded, lacked hygienic facilities, and had trainers giving generic advice.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed">
              We brought imported selectorized and plate-loaded machines, strict hygiene standards, certified female and male trainers with deep kinesiology credentials, and an uplifting music ambiance where athletes and absolute beginners thrive side-by-side.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Unisex welcoming atmosphere',
                'Imported biomechanical equipment',
                'K11 & ISSA certified coaches',
                'Customized Indian macro diet charts',
                'Dedicated female trainer on floor',
                'Biometric access & CCTV security',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenTrialModal}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
              >
                <span>Experience Gym Holic Free for 1 Day</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop"
                alt="Gym Holic Interior Equipment Floor"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Floating review card overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-zinc-700">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-amber-400">Verified Google Review</span>
                  <span className="text-zinc-400">Ambikapur Local</span>
                </div>
                <p className="text-xs text-zinc-200 italic">
                  &ldquo;Trainer knowledge on biomechanics and posture correction is unmatched in Chhattisgarh. Equipment is super smooth and atmosphere is clean & motivating!&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Visual Tour
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                WORLD-CLASS GYM ZONES
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Zones' },
                { id: 'strength', label: 'Strength Floor' },
                { id: 'cardio', label: 'Cardio Deck' },
                { id: 'crossfit', label: 'CrossFit & Turf' },
                { id: 'recovery', label: 'Steam & Recovery' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-amber-500/10"
              >
                <div className="h-60 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 w-fit mb-1.5">
                    {img.tag}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {img.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
