'use client';

import React from 'react';
import {
  Check,
  Sparkles,
  CreditCard,
  MessageCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { MembershipPlan } from '@/types';
import { INITIAL_MEMBERSHIP_PLANS } from '@/lib/seed-data';
import { formatINR } from '@/lib/utils';
import { GYM_DETAILS } from '@/lib/constants';

interface MembershipSectionProps {
  onSelectPlan: (plan: MembershipPlan) => void;
  onOpenTrialModal: () => void;
}

export default function MembershipSection({
  onSelectPlan,
  onOpenTrialModal,
}: MembershipSectionProps) {
  const plans = INITIAL_MEMBERSHIP_PLANS;

  return (
    <section id="memberships" className="py-20 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            Flexible Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            MEMBERSHIP <span className="gold-gradient-text">PACKAGES</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            No hidden admission fees. Zero lock-in. Access all imported strength equipment, cardio floor, sauna/steam baths, and certified trainer supervision.
          </p>
        </div>

        {/* Pricing Cards Grid (4 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-amber-950/30 border-2 border-amber-400 shadow-2xl shadow-amber-500/15 lg:-translate-y-2'
                  : 'bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 shadow-xl'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black'
                      : 'bg-zinc-800 text-amber-300 border border-zinc-700'
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              <div>
                {/* Plan Title & Duration */}
                <div className="pt-2 mb-4">
                  <h3 className="text-lg font-black text-white">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{plan.description}</p>
                </div>

                {/* Price Display */}
                <div className="py-4 border-y border-zinc-800/80 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      {formatINR(plan.priceINR)}
                    </span>
                    <span className="text-xs text-zinc-400">/ {plan.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-zinc-500 line-through font-medium">
                      {formatINR(plan.originalPriceINR)}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Save {plan.discountPercentage}%
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 shadow-amber-400/20'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-amber-400/50'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Join Now & Pay Online</span>
                </button>

                <a
                  href={`https://wa.me/${GYM_DETAILS.whatsapp}?text=Hi%20Gym%20Holic!%20I'm%20interested%20in%20the%20${encodeURIComponent(plan.name)}%20(${formatINR(plan.priceINR)}).%20Please%20guide%20me.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-zinc-900/60 hover:bg-emerald-950/30 border border-zinc-800 hover:border-emerald-500/40 text-zinc-400 hover:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Free Trial Callout Banner below plans */}
        <div className="mt-14 max-w-3xl mx-auto p-5 rounded-2xl bg-gradient-to-r from-zinc-900 via-amber-950/30 to-zinc-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Not sure which package fits your fitness goal?
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Claim a 100% Free 1-Day VIP Guest Pass to try out our equipment, showers, and consultation.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenTrialModal}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-md shrink-0"
          >
            Claim Free VIP Pass
          </button>
        </div>
      </div>
    </section>
  );
}
