'use client';

import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MembershipPlan } from '@/types';
import { formatINR } from '@/lib/utils';
import { GYM_DETAILS } from '@/lib/constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: MembershipPlan | null;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  selectedPlan,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'razorpay'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (!isOpen || !selectedPlan) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }
    setStep('payment');
  };

  const handleSimulatePayment = async () => {
    setIsProcessing(true);

    try {
      // Save lead to database
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          goal: `Membership Registration: ${selectedPlan.name}`,
          source: 'membership',
          planInterest: selectedPlan.name,
          notes: `Start Date: ${startDate}, Method: ${paymentMethod}, Amount: INR ${selectedPlan.priceINR}`,
        }),
      });
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f59e0b', '#22c55e', '#ffffff'],
        });
      } catch (e) {}
    }, 1200);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText('gymholic@icici');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleWhatsAppConfirmation = () => {
    const message = `*GYM HOLIC MEMBERSHIP REGISTRATION CONFIRMATION*\n\n` +
      `👤 *Member Name:* ${name}\n` +
      `📱 *Phone:* ${phone}\n` +
      `💳 *Selected Plan:* ${selectedPlan.name} (${selectedPlan.duration})\n` +
      `💰 *Amount:* ${formatINR(selectedPlan.priceINR)}\n` +
      `📅 *Preferred Start Date:* ${startDate}\n\n` +
      `Hi Gym Holic! I have completed my membership registration online. Please activate my biometric pass.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${GYM_DETAILS.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#121217] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-500/20 border-b border-amber-500/30 p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
              Official Membership Enrollment
            </span>
            <h3 className="text-lg font-black text-white">{selectedPlan.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: MEMBER DETAILS */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 space-y-4">
            {/* Price Banner */}
            <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400">Total Investment</span>
                <div className="text-2xl font-black text-amber-400">
                  {formatINR(selectedPlan.priceINR)}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-500 line-through">
                  {formatINR(selectedPlan.originalPriceINR)}
                </span>
                <span className="block text-xs font-bold text-emerald-400">
                  Save {selectedPlan.discountPercentage}%
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kunal Singh"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Phone / WhatsApp *
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Preferred Membership Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 'payment' && (
          <div className="p-6 space-y-5">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <div className="text-xs font-bold text-white">Instant UPI / QR</div>
                <div className="text-[10px] text-zinc-400">GPay, PhonePe, Paytm</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'razorpay'
                    ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <div className="text-xs font-bold text-white">Razorpay Secure</div>
                <div className="text-[10px] text-zinc-400">Cards, NetBanking, EMI</div>
              </button>
            </div>

            {paymentMethod === 'upi' ? (
              <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800 text-center space-y-3">
                <p className="text-xs text-zinc-300 font-semibold">
                  Scan QR code with any UPI App or use UPI ID:
                </p>

                {/* Simulated QR Code Box */}
                <div className="w-44 h-44 mx-auto p-2 bg-white rounded-2xl flex flex-col items-center justify-center shadow-lg">
                  <div className="w-full h-full border-4 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center p-2 text-zinc-900">
                    <QrCode className="w-24 h-24 text-zinc-900" />
                    <span className="text-[9px] font-black uppercase tracking-wider text-black mt-1">
                      GYM HOLIC UPI
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-xs font-mono text-amber-300 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-700">
                    gymholic@icici
                  </span>
                  <button
                    onClick={copyUpiId}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="text-xs text-zinc-400">
                  Amount: <strong className="text-amber-400">{formatINR(selectedPlan.priceINR)}</strong>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800 space-y-3 text-xs text-zinc-300">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Razorpay Standard Checkout 256-bit SSL</span>
                </div>
                <p className="text-zinc-400">
                  Click the button below to initialize Razorpay payment gateway for Credit/Debit Cards, NetBanking (SBI, HDFC, ICICI, etc.), and Wallets.
                </p>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between font-bold">
                  <span>Payable Now:</span>
                  <span className="text-amber-400">{formatINR(selectedPlan.priceINR)}</span>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-extrabold text-sm shadow-xl flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isProcessing ? 'Verifying Payment...' : `Confirm & Pay ${formatINR(selectedPlan.priceINR)}`}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 'success' && (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-white">
                WELCOME TO GYM HOLIC!
              </h4>
              <p className="text-xs text-zinc-300 mt-1">
                Your admission request for <strong>{selectedPlan.name}</strong> has been received successfully.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Member:</span>
                <span className="font-bold text-white">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Package:</span>
                <span className="font-bold text-amber-400">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Scheduled Start Date:</span>
                <span className="font-bold text-white">{startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Gym Location:</span>
                <span className="text-zinc-300">Above Bank of India, Ram Mandir Rd, Ambikapur</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleWhatsAppConfirmation}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Send Confirmation on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
