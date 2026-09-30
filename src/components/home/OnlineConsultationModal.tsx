'use client';

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Apple,
  Dumbbell,
  Activity,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GYM_DETAILS } from '@/lib/constants';

interface OnlineConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: 'Personal Training' | 'Nutrition Consultation' | 'Fitness Assessment';
  trainerName?: string;
}

export default function OnlineConsultationModal({
  isOpen,
  onClose,
  preselectedService = 'Personal Training',
  trainerName,
}: OnlineConsultationModalProps) {
  const [service, setService] = useState<'Personal Training' | 'Nutrition Consultation' | 'Fitness Assessment'>(
    preselectedService
  );
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState('6:00 AM - 7:00 AM');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please provide your name and phone number.');
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
          goal: `Online Consultation: ${service}${trainerName ? ` with ${trainerName}` : ''}`,
          source: 'consultation',
          notes: `Date: ${date}, Slot: ${timeSlot}. Notes: ${notes}`,
        }),
      });
    } catch (err) {
      console.error(err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#22c55e', '#ffffff'],
      });
    } catch (e) {}
  };

  const handleWhatsAppNotify = () => {
    const message = `*GYM HOLIC CONSULTATION BOOKING REQUEST*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📱 *Phone:* ${phone}\n` +
      `🏋️ *Service:* ${service}\n` +
      `${trainerName ? `👨‍🏫 *Preferred Coach:* ${trainerName}\n` : ''}` +
      `📅 *Date:* ${date}\n` +
      `⏰ *Time Slot:* ${timeSlot}\n\n` +
      `Hi Gym Holic! I have booked a 1-on-1 session online. Please confirm my appointment slot.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${GYM_DETAILS.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#121217] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-500/20 border-b border-amber-500/30 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                BOOK 1-ON-1 CONSULTATION
              </h3>
              <p className="text-xs text-zinc-400">
                {trainerName ? `Booking with Coach ${trainerName}` : 'Personalized Session with Certified Trainers'}
              </p>
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
            {/* Service selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Consultation Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Personal Training', icon: Dumbbell, label: 'Personal Training' },
                  { id: 'Nutrition Consultation', icon: Apple, label: 'Diet & Nutrition' },
                  { id: 'Fitness Assessment', icon: Activity, label: 'Body Scan & Assess' },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                        service === s.id
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1 text-amber-400" />
                      <span className="text-[11px] font-bold leading-tight">{s.label}</span>
                    </button>
                  );
                })}
              </div>
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
                placeholder="e.g. Vikram Sharma"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Phone Number (WhatsApp) *
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
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
                >
                  <option>6:00 AM – 7:00 AM</option>
                  <option>7:00 AM – 8:00 AM</option>
                  <option>8:00 AM – 9:00 AM</option>
                  <option>11:00 AM – 12:00 PM</option>
                  <option>5:00 PM – 6:00 PM</option>
                  <option>6:00 PM – 7:00 PM</option>
                  <option>7:00 PM – 8:00 PM</option>
                  <option>8:30 PM – 9:30 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Current Fitness Goal or Medical History (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Want to lose 10kg, have lower back soreness..."
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{isSubmitting ? 'Confirming Appointment...' : 'Confirm Free Consultation Slot'}</span>
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-white">APPOINTMENT RESERVED!</h4>
              <p className="text-xs text-zinc-300 mt-1">
                Your session for <strong>{service}</strong> on <strong>{date} ({timeSlot})</strong> is scheduled.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-left space-y-1.5">
              <p className="text-zinc-400">
                Location: <strong className="text-white">Gym Holic, Above Bank of India, Ram Mandir Road, Ambikapur</strong>
              </p>
              <p className="text-zinc-400">
                Our coach will call you 1 hour prior to confirm your arrival.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleWhatsAppNotify}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Confirm on WhatsApp Immediately</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
