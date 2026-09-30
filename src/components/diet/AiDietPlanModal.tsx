'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Download,
  Share2,
  MessageCircle,
  Flame,
  CheckCircle,
  Apple,
  Dumbbell,
  ShieldCheck,
  Droplets,
  Calendar,
  Tag,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DietPlanResult } from '@/types';
import { generateDietAndWorkoutPlan } from '@/lib/utils';
import { generateDietPdf } from '@/lib/pdf-generator';
import { GYM_DETAILS } from '@/lib/constants';

interface AiDietPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    heightCm?: number;
    weightKg?: number;
    age?: number;
    gender?: 'male' | 'female' | 'other';
  };
}

export default function AiDietPlanModal({
  isOpen,
  onClose,
  initialData,
}: AiDietPlanModalProps) {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState(initialData?.age || 26);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(initialData?.gender || 'male');
  const [heightCm, setHeightCm] = useState(initialData?.heightCm || 172);
  const [weightKg, setWeightKg] = useState(initialData?.weightKg || 72);
  const [goal, setGoal] = useState<'fat_loss' | 'weight_gain' | 'muscle_gain' | 'maintenance'>('fat_loss');
  const [dietType, setDietType] = useState<'veg' | 'non_veg' | 'eggitarian' | 'vegan'>('veg');
  const [planResult, setPlanResult] = useState<DietPlanResult | null>(null);
  const [activeTab, setActiveTab] = useState<'diet' | 'workout' | 'macros' | 'supplements'>('diet');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      if (initialData.heightCm) setHeightCm(initialData.heightCm);
      if (initialData.weightKg) setWeightKg(initialData.weightKg);
      if (initialData.age) setAge(initialData.age);
      if (initialData.gender) setGender(initialData.gender);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your name and WhatsApp number to receive your plan.');
      return;
    }

    setIsSubmitting(true);

    const generated = generateDietAndWorkoutPlan({
      name,
      age: Number(age),
      gender,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      goal,
      dietType,
      activityLevel: 'moderate',
    });

    setPlanResult(generated);

    // Save lead to database
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          goal: `AI Diet Plan: ${goal.replace('_', ' ').toUpperCase()} (${dietType})`,
          source: 'diet_plan',
          bmiData: {
            bmi: generated.bmi,
            category: generated.bmiCategory,
            caloriesDaily: generated.dailyCalories,
          },
        }),
      });
    } catch (err) {
      console.error('Lead submission error:', err);
    }

    setIsSubmitting(false);
    setStep('result');

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f59e0b', '#fbbf24', '#ffffff'],
      });
    } catch (e) {
      // ignore
    }
  };

  const handleDownloadPdf = () => {
    if (!planResult) return;
    const doc = generateDietPdf(planResult);
    doc.save(`GymHolic_${planResult.name.replace(/\s+/g, '_')}_Diet_Plan.pdf`);
  };

  const handleSendToWhatsApp = () => {
    if (!planResult) return;
    const message = `*GYM HOLIC - PERSONALIZED DIET & WORKOUT PLAN*\n\n` +
      `👤 *Name:* ${planResult.name}\n` +
      `🎯 *Goal:* ${planResult.goal.replace('_', ' ').toUpperCase()}\n` +
      `⚖️ *BMI:* ${planResult.bmi} (${planResult.bmiCategory})\n` +
      `🔥 *Target Calories:* ${planResult.dailyCalories} kcal/day\n` +
      `🥩 *Protein Target:* ${planResult.macros.proteinGrams}g\n` +
      `💧 *Water Intake:* ${planResult.waterIntakeLiters} Liters\n` +
      `🎟️ *Special Gym Discount Code:* ${planResult.couponCode} (10% OFF)\n\n` +
      `Hi Coach Vikram / Aman! I just generated my AI diet plan on the Gym Holic website. Please review it and schedule my free consultation at the gym.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${GYM_DETAILS.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#121217] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-500/20 border-b border-amber-500/30 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold shadow-lg shadow-amber-400/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                GYM HOLIC <span className="text-amber-400">AI DIET & WORKOUT ENGINE</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Personalized Indian Macro & Calorie Protocol + Branded PDF
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: FORM INPUTS */}
        {step === 'form' && (
          <form onSubmit={handleGeneratePlan} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  WhatsApp Number * (to send PDF)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 text-white text-sm outline-none transition-colors"
                />
              </div>
            </div>

            {/* Height, Weight, Age, Gender */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Age
                </label>
                <input
                  type="number"
                  min="14"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 text-white text-sm outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="35"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 text-white text-sm outline-none"
                />
              </div>
            </div>

            {/* Primary Fitness Goal */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Primary Fitness Goal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'fat_loss', label: '🔥 Fat Loss', desc: 'Burn visceral fat & lean down' },
                  { id: 'muscle_gain', label: '💪 Muscle Gain', desc: 'Hypertrophy & strength' },
                  { id: 'weight_gain', label: '📈 Weight Gain', desc: 'Bulk for skinny builds' },
                  { id: 'maintenance', label: '⚖️ Maintenance', desc: 'Stamina & functional health' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGoal(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      goal === item.id
                        ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Indian Food Preference
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'veg', label: '🥗 Pure Vegetarian' },
                  { id: 'non_veg', label: '🍗 Non-Vegetarian' },
                  { id: 'eggitarian', label: '🍳 Eggitarian' },
                  { id: 'vegan', label: '🌱 Plant Vegan' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDietType(item.id as any)}
                    className={`py-2 px-2 rounded-xl border text-center text-xs font-bold transition-all ${
                      dietType === item.id
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-black" />
                <span>{isSubmitting ? 'Calculating Nutrition Metrics...' : 'Generate My AI Diet & Workout Plan'}</span>
              </button>
              <p className="text-[11px] text-zinc-500 text-center mt-2 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Free. Instant PDF download + WhatsApp copy with gym discount coupon.
              </p>
            </div>
          </form>
        )}

        {/* STEP 2: RESULT VIEW */}
        {step === 'result' && planResult && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Top Banner Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-amber-950/40 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Custom AI Fitness Plan Ready
                </span>
                <h4 className="text-xl font-black text-white mt-0.5">
                  Plan for {planResult.name}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Goal: <strong className="text-amber-300">{planResult.goal.replace('_', ' ').toUpperCase()}</strong> • Calorie Target: <strong className="text-white">{planResult.dailyCalories} kcal</strong>
                </p>
              </div>

              {/* Action Buttons: Download PDF & WhatsApp */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDownloadPdf}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-400/20"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>Download PDF</span>
                </button>

                <button
                  onClick={handleSendToWhatsApp}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Send to WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Quick Macro Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30">
                <div className="text-[11px] font-bold text-amber-400 uppercase">Protein Target</div>
                <div className="text-xl font-black text-white">{planResult.macros.proteinGrams}g</div>
                <div className="text-[10px] text-zinc-400">~{planResult.macros.proteinGrams * 4} kcal</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[11px] font-bold text-emerald-400 uppercase">Carbohydrates</div>
                <div className="text-xl font-black text-white">{planResult.macros.carbsGrams}g</div>
                <div className="text-[10px] text-zinc-400">~{planResult.macros.carbsGrams * 4} kcal</div>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <div className="text-[11px] font-bold text-blue-400 uppercase">Healthy Fats</div>
                <div className="text-xl font-black text-white">{planResult.macros.fatsGrams}g</div>
                <div className="text-[10px] text-zinc-400">~{planResult.macros.fatsGrams * 9} kcal</div>
              </div>
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30">
                <div className="text-[11px] font-bold text-sky-400 uppercase">Water Intake</div>
                <div className="text-xl font-black text-white">{planResult.waterIntakeLiters} L</div>
                <div className="text-[10px] text-zinc-400">Hydration target</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-zinc-800 gap-2">
              {[
                { id: 'diet', label: '🥗 Indian Meal Schedule' },
                { id: 'workout', label: '🏋️ Workout Split' },
                { id: 'supplements', label: '💊 Supplements' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: DIET */}
            {activeTab === 'diet' && (
              <div className="space-y-3">
                {planResult.meals.map((meal, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[11px] font-bold text-amber-400 block">
                          {meal.timing}
                        </span>
                        <h5 className="text-sm font-bold text-white">{meal.name}</h5>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-zinc-300">
                          ~{meal.calories} kcal
                        </span>
                        <span className="text-[10px] text-amber-400 block">
                          {meal.proteinGrams}g Protein
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {meal.foods.map((food, fidx) => (
                        <li key={fidx} className="text-xs text-zinc-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>{food}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: WORKOUT */}
            {activeTab === 'workout' && (
              <div className="space-y-3">
                {planResult.workoutSplit.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-black text-amber-400">{day.day}</span>
                      <span className="text-xs font-bold text-white">{day.focus}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {day.exercises.map((ex, eidx) => (
                        <div
                          key={eidx}
                          className="text-xs text-zinc-300 bg-black/40 px-2.5 py-1.5 rounded-lg border border-zinc-800/60"
                        >
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: SUPPLEMENTS */}
            {activeTab === 'supplements' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {planResult.supplements.map((supp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5"
                  >
                    <div className="text-xs font-bold text-amber-400">{supp.name}</div>
                    <div className="text-xs text-zinc-200">
                      <strong>Dosage:</strong> {supp.dosage}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      <strong>Timing:</strong> {supp.timing}
                    </div>
                    <div className="text-[11px] text-zinc-500 italic pt-1">
                      {supp.benefit}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Membership Coupon Offer */}
            <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                  Exclusive Member Offer
                </span>
                <p className="text-xs sm:text-sm font-bold text-white">
                  Get 10% OFF on any Gym Holic Membership in Ambikapur!
                </p>
                <p className="text-[11px] text-zinc-400">
                  Show your downloaded PDF or use coupon code: <strong className="text-amber-300">GYMHOLIC10</strong>
                </p>
              </div>
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shrink-0 shadow-md"
              >
                Save My PDF Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
