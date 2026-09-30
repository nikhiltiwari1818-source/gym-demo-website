'use client';

import React, { useState } from 'react';
import {
  Calculator,
  Flame,
  Droplets,
  Heart,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { calculateBmiDetails, BmiCalculationInput } from '@/lib/utils';

interface BmiCalculatorSectionProps {
  onOpenDietModalWithData: (data: {
    heightCm: number;
    weightKg: number;
    age: number;
    gender: 'male' | 'female' | 'other';
  }) => void;
}

export default function BmiCalculatorSection({
  onOpenDietModalWithData,
}: BmiCalculatorSectionProps) {
  const [heightCm, setHeightCm] = useState<number>(172);
  const [weightKg, setWeightKg] = useState<number>(72);
  const [age, setAge] = useState<number>(26);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'intense'>('moderate');

  const result = calculateBmiDetails({
    heightCm,
    weightKg,
    age,
    gender,
    activityLevel: activity,
  });

  const handleGetDietPlan = () => {
    onOpenDietModalWithData({
      heightCm,
      weightKg,
      age,
      gender,
    });
  };

  return (
    <section id="bmi-diet" className="py-20 bg-[#0d0d12] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Clinical Body Composition Analyzer
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            ADVANCED <span className="gold-gradient-text">BMI & MACRO CALCULATOR</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Accurately assess your BMI, estimated body fat percentage, maintenance calories, and receive a customized Indian nutrition roadmap.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-zinc-900/80 border border-amber-500/25 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Gender Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['male', 'female', 'other'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                        gender === g
                          ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Height Slider & Input */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-zinc-300 uppercase tracking-wider">Height</span>
                  <span className="text-amber-400 font-mono text-sm">{heightCm} cm ({Math.floor(heightCm / 30.48)}&apos;{Math.round((heightCm % 30.48) / 2.54)}&quot;)</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Weight Slider & Input */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-zinc-300 uppercase tracking-wider">Weight</span>
                  <span className="text-amber-400 font-mono text-sm">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Age Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-zinc-300 uppercase tracking-wider">Age</span>
                  <span className="text-amber-400 font-mono text-sm">{age} years</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Workout / Activity Frequency
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  {[
                    { id: 'sedentary', label: 'Desk / Sedentary' },
                    { id: 'light', label: '1-2 Days / Wk' },
                    { id: 'moderate', label: '3-5 Days / Wk' },
                    { id: 'intense', label: '6+ Days Intense' },
                  ].map((act) => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setActivity(act.id as any)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition-all border ${
                        activity === act.id
                          ? 'bg-amber-400 text-black border-amber-400 font-bold'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                      }`}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output Panel (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-black/60 border border-zinc-800 p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                  Your Body Score
                </span>

                {/* Big BMI Number */}
                <div className="flex items-baseline gap-3 my-2">
                  <span className="text-5xl font-black text-white">{result.bmi}</span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-md border"
                    style={{
                      color: result.color,
                      borderColor: result.color + '50',
                      backgroundColor: result.color + '15',
                    }}
                  >
                    {result.category}
                  </span>
                </div>

                {/* BMI Gauge bar */}
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden flex my-3">
                  <div className="h-full bg-sky-400 w-1/4" title="Underweight (<18.5)" />
                  <div className="h-full bg-emerald-500 w-1/4" title="Normal (18.5 - 24.9)" />
                  <div className="h-full bg-amber-400 w-1/4" title="Overweight (25 - 29.9)" />
                  <div className="h-full bg-red-500 w-1/4" title="Obese (30+)" />
                </div>

                {/* Metric Output Grid */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-medium mb-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Daily Calorie Burn
                    </div>
                    <div className="text-base font-bold text-white">
                      {result.dailyCaloriesTdee} <span className="text-xs font-normal text-zinc-400">kcal</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-medium mb-1">
                      <Scale className="w-3.5 h-3.5 text-amber-400" />
                      Body Fat Est.
                    </div>
                    <div className="text-base font-bold text-white">
                      ~{result.bodyFatEstimate}%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-medium mb-1">
                      <Heart className="w-3.5 h-3.5 text-amber-400" />
                      Ideal Weight
                    </div>
                    <div className="text-xs font-bold text-white">
                      {result.idealWeightRange}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-medium mb-1">
                      <Droplets className="w-3.5 h-3.5 text-sky-400" />
                      Water Intake
                    </div>
                    <div className="text-base font-bold text-white">
                      {result.waterLiters} <span className="text-xs font-normal text-zinc-400">L/day</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion CTA to AI Diet Plan */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGetDietPlan}
                  className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 group transition-all"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Get Your Personalized Diet Plan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] text-zinc-400 text-center mt-2">
                  Instant AI calculation with authentic Indian meals & PDF download.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
