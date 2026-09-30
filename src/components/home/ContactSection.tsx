'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GYM_DETAILS } from '@/lib/constants';

interface ContactSectionProps {
  onOpenTrialModal: () => void;
}

export default function ContactSection({ onOpenTrialModal }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('Weight Loss');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number.');
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
          email,
          goal: `Contact Form: ${goal}`,
          source: 'contact',
          notes: message,
        }),
      });

      setIsSent(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#d4af37', '#22c55e', '#ffffff'],
        });
      } catch (e) {}
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0d0d12] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left: Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Phone className="w-3.5 h-3.5" />
                Get in Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                START YOUR <span className="gold-gradient-text">JOURNEY TODAY</span>
              </h2>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                Have questions about our equipment, timings, personal training, or membership packages? Reach out to our front desk or visit us in Ambikapur.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Gym Location
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {GYM_DETAILS.name}
                    <br />
                    {GYM_DETAILS.address}
                    <br />
                    {GYM_DETAILS.city}, {GYM_DETAILS.state} – {GYM_DETAILS.pincode}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Call / WhatsApp Directly
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1">
                    Primary: <a href={`tel:${GYM_DETAILS.phone}`} className="text-amber-400 font-bold hover:underline">{GYM_DETAILS.phone}</a>
                  </p>
                  <p className="text-xs text-zinc-400">
                    Secondary: <a href={`tel:${GYM_DETAILS.secondaryPhone}`} className="hover:underline">{GYM_DETAILS.secondaryPhone}</a>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Gym Timings
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1">
                    Monday: <span className="text-emerald-400 font-semibold">Open 24 Hours</span>
                  </p>
                  <p className="text-xs text-zinc-300">
                    Tue – Sat: <span className="text-amber-300">5:00 AM – 10:30 PM</span>
                  </p>
                  <p className="text-xs text-zinc-400">
                    Sunday: 6:00 AM – 1:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${GYM_DETAILS.whatsapp}?text=Hi%20Gym%20Holic!%20I'd%20like%20to%20connect%20with%20your%20reception%20desk.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onOpenTrialModal}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Book 1-Day Trial</span>
              </button>
            </div>
          </div>

          {/* Right: Contact / Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-zinc-900/90 border border-amber-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-xl font-black text-white">
                    SEND AN ENQUIRY OR QUESTION
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Fill out the form below. Our head coach will call you back within 15 minutes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Amit Patel"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Phone Number *
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Primary Fitness Goal
                    </label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
                    >
                      <option>Weight Loss & Fat Burn</option>
                      <option>Lean Muscle Hypertrophy</option>
                      <option>Bodybuilding & Strength</option>
                      <option>Female Toning & Mobility</option>
                      <option>CrossFit & Athletic Conditioning</option>
                      <option>Personal Training Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Your Message / Specific Question
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you want to achieve or ask any question..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Send Enquiry to Gym Holic'}</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-white">
                  ENQUIRY RECEIVED!
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Our head coach at Gym Holic Ambikapur will contact you at <strong>{phone}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
