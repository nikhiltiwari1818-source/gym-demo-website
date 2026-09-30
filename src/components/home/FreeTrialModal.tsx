'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  Phone,
  MessageCircle,
  ShieldCheck,
  Dumbbell,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GYM_DETAILS } from '@/lib/constants';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreeTrialModal({ isOpen, onClose }: FreeTrialModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [preferredSlot, setPreferredSlot] = useState('Morning (6 AM – 9 AM)');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your name and WhatsApp number.');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          goal: '1-Day VIP Free Trial Pass',
          source: 'free_trial',
          notes: `Date: ${visitDate}, Slot: ${preferredSlot}`,
        }),
      });
    } catch (e) {
      console.error(e);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f59e0b', '#22c55e', '#ffffff'],
      });
    } catch (e) {}
  };

  const handleWhatsAppSend = () => {
    const message = `*GYM HOLIC 1-DAY VIP PASS RESERVATION*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📱 *Phone:* ${phone}\n` +
      `📅 *Date:* ${visitDate}\n` +
      `⏰ *Preferred Slot:* ${preferredSlot}\n\n` +
      `Hi Gym Holic! I just booked my 1-Day Free VIP Guest Pass. Please keep my day pass ready at the front desk.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${GYM_DETAILS.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#121217] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-500/20 border-b border-amber-500/30 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                CLAIM 1-DAY FREE VIP PASS
              </h3>
              <p className="text-[11px] text-zinc-400">Zero Cost • Zero Obligation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-300">
              ⚡ Experience our imported strength floor, cardio deck, steam bath, and consultation completely free for one full day!
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sameer Kujur"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Visit Date
                </label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Time Window
                </label>
                <select
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
                >
                  <option>Morning (6 AM – 9 AM)</option>
                  <option>Afternoon (11 AM – 4 PM)</option>
                  <option>Evening (5 PM – 9 PM)</option>
                  <option>Late Night (9 PM – 10:30 PM)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{isSubmitting ? 'Reserving Pass...' : 'Issue My Free 1-Day VIP Pass'}</span>
            </button>
          </form>
        ) : (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-white">VIP PASS ISSUED!</h4>
              <p className="text-xs text-zinc-300 mt-1">
                Your guest pass is registered for <strong>{visitDate}</strong> ({preferredSlot}).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-left space-y-1">
              <p className="text-zinc-400">
                Gym: <strong className="text-white">Gym Holic, The Fitness Club</strong>
              </p>
              <p className="text-zinc-400">
                Address: Above Bank of India, Ram Mandir Road, Ambikapur
              </p>
              <p className="text-[11px] text-zinc-500 pt-1">
                Please bring clean indoor training shoes and a water bottle!
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleWhatsAppSend}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Notify Gym Holic on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-semibold text-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
