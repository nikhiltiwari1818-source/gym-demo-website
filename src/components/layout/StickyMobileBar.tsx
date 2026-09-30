'use client';

import React from 'react';
import { Phone, MessageCircle, Sparkles, CreditCard } from 'lucide-react';
import { GYM_DETAILS } from '@/lib/constants';

interface StickyMobileBarProps {
  onOpenTrialModal: () => void;
  onOpenPlanModal: () => void;
}

export default function StickyMobileBar({ onOpenTrialModal, onOpenPlanModal }: StickyMobileBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0c0c10]/95 backdrop-blur-lg border-t border-amber-500/25 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5 items-center max-w-md mx-auto">
        {/* Call Now */}
        <a
          href={`tel:${GYM_DETAILS.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-zinc-800/90 text-zinc-300 hover:text-white border border-zinc-700/60 active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">Call Now</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${GYM_DETAILS.whatsapp}?text=Hi%20Gym%20Holic!%20I'd%20like%20to%20know%20about%20your%20membership%20packages%20and%20offers.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 active:scale-95 transition-all text-center"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">WhatsApp</span>
        </a>

        {/* Free VIP Trial Pass */}
        <button
          onClick={onOpenTrialModal}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-black font-bold border border-amber-400/50 shadow-md active:scale-95 transition-all text-center"
        >
          <Sparkles className="w-4 h-4 text-black mb-0.5" />
          <span className="text-[10px] font-extrabold tracking-tight">Free Trial</span>
        </button>

        {/* Join Now */}
        <button
          onClick={onOpenPlanModal}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-zinc-900 border border-amber-500/40 text-amber-400 active:scale-95 transition-all text-center font-bold"
        >
          <CreditCard className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Join Now</span>
        </button>
      </div>
    </div>
  );
}
