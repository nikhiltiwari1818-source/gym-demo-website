'use client';

import React from 'react';
import {
  Award,
  CheckCircle,
  Calendar,
  Sparkles,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { Trainer } from '@/types';
import { INITIAL_TRAINERS } from '@/lib/seed-data';

interface TrainerSectionProps {
  onBookTrainer: (trainer: Trainer) => void;
}

export default function TrainerSection({ onBookTrainer }: TrainerSectionProps) {
  const trainers = INITIAL_TRAINERS;

  return (
    <section id="trainers" className="py-20 bg-[#0d0d12] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Certified Fitness Mentorship
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            MEET OUR <span className="gold-gradient-text">ELITE COACHES</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Our trainers are K11, ACE, and ISSA certified with deep academic mastery of anatomy, kinesiology, and custom Indian nutrition.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="group rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-amber-500/10"
            >
              <div>
                {/* Trainer Image */}
                <div className="relative h-80 overflow-hidden bg-zinc-950">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/30" />

                  {/* Experience Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>{trainer.experienceYears}+ Years Exp.</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                    {trainer.name}
                  </h3>
                  <div className="text-xs font-bold text-amber-400/90 mt-0.5 mb-2">
                    {trainer.role}
                  </div>

                  {/* Qualification pill */}
                  <div className="inline-block px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-300 font-semibold mb-3">
                    🎓 {trainer.qualification}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {trainer.bio}
                  </p>

                  {/* Specializations */}
                  <div className="space-y-1.5 mb-6">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-500 block">
                      Core Specializations
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {trainer.specialization.map((spec, sidx) => (
                        <span
                          key={sidx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/50 text-zinc-300 border border-zinc-800"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onBookTrainer(trainer)}
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-amber-400 text-zinc-200 hover:text-black font-bold text-xs transition-all flex items-center justify-center gap-2 border border-zinc-700 hover:border-amber-400 group/btn"
                >
                  <Calendar className="w-4 h-4 text-amber-400 group-hover/btn:text-black" />
                  <span>Book 1-on-1 Session with {trainer.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
