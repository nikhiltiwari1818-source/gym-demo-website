'use client';

import React, { useState } from 'react';
import {
  Trophy,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { TransformationStory } from '@/types';
import { INITIAL_TRANSFORMATIONS } from '@/lib/seed-data';

interface TransformationsSectionProps {
  onOpenTrialModal: () => void;
}

export default function TransformationsSection({
  onOpenTrialModal,
}: TransformationsSectionProps) {
  const [filter, setFilter] = useState<'All' | 'Weight Loss' | 'Muscle Gain' | 'Fat Loss'>('All');
  const [activeStory, setActiveStory] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const stories = INITIAL_TRANSFORMATIONS;
  const filteredStories =
    filter === 'All'
      ? stories
      : stories.filter((s) => s.category === filter);

  const current = filteredStories[activeStory] || stories[0];

  return (
    <section id="transformations" className="py-20 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            Real Ambikapur Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            TRANSFORMATION <span className="gold-gradient-text">STORIES</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Real people. Real discipline. Discover how our members shredded stubborn fat, gained lean mass, and transformed their lives at Gym Holic.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {(['All', 'Weight Loss', 'Muscle Gain', 'Fat Loss'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setActiveStory(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === cat
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Interactive Comparison Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-zinc-900/90 border border-amber-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Before / After Image Container (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden border border-zinc-700 select-none">
                {/* After Image (Background) */}
                <img
                  src={current.afterImage}
                  alt={`After: ${current.name}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-black shadow-md">
                  AFTER: {current.afterWeight}
                </span>

                {/* Before Image (Clipped Left Layer) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-amber-400 shadow-2xl"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={current.beforeImage}
                    alt={`Before: ${current.name}`}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-zinc-900 text-zinc-300 border border-zinc-700 shadow-md">
                    BEFORE: {current.beforeWeight}
                  </span>
                </div>

                {/* Slider Handle */}
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />

                {/* Visual Line Marker */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none flex items-center justify-center -ml-3 z-10"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg font-bold text-[10px]">
                    ↔
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 text-center mt-2">
                Drag slider left / right to compare transformation
              </p>
            </div>

            {/* Member Details (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/15 border border-amber-400/30 text-amber-300">
                  {current.category}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {current.durationWeeks} Weeks Protocol
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {current.name}, {current.age}
                </h3>
                <p className="text-sm font-bold text-amber-400 mt-1">
                  {current.achievement}
                </p>
              </div>

              {/* Weight Comparison Box */}
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">
                    Starting Weight
                  </span>
                  <span className="text-xl font-black text-zinc-300">{current.beforeWeight}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">
                    Result Physique
                  </span>
                  <span className="text-xl font-black text-emerald-400">{current.afterWeight}</span>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-xs sm:text-sm text-zinc-300 italic border-l-2 border-amber-400 pl-4 py-1 leading-relaxed">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Story selector buttons */}
              <div className="pt-2 flex items-center gap-2">
                {filteredStories.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveStory(idx);
                      setSliderPosition(50);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      activeStory === idx
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenTrialModal}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Start Your Transformation at Gym Holic</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
