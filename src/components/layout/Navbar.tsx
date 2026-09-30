'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Dumbbell,
  Phone,
  MessageCircle,
  Menu,
  X,
  Clock,
  Sparkles,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { GYM_DETAILS, NAV_LINKS } from '@/lib/constants';

interface NavbarProps {
  onOpenTrialModal: () => void;
  onOpenDietModal: () => void;
}

export default function Navbar({ onOpenTrialModal, onOpenDietModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if gym is currently open based on local IST time
  useEffect(() => {
    const checkTiming = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentDec = hours + minutes / 60;

      if (day === 1) {
        // Monday: 24 hours
        setIsOpenNow(true);
      } else if (day === 0) {
        // Sunday: 6 AM to 1 PM
        setIsOpenNow(currentDec >= 6 && currentDec <= 13);
      } else {
        // Tue - Sat: 5:00 AM to 10:30 PM (22.5)
        setIsOpenNow(currentDec >= 5 && currentDec <= 22.5);
      }
    };
    checkTiming();
    const interval = setInterval(checkTiming, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-xl'
            : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Dumbbell className="w-5 h-5 text-black transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-wider text-white group-hover:text-amber-400 transition-colors">
                    GYM<span className="text-amber-400">HOLIC</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                    4.8 ★
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                  The Fitness Club
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Gym Live Status Beacon (Desktop) */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isOpenNow ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isOpenNow ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                </span>
                <span className="text-zinc-300 font-medium">
                  {isOpenNow ? 'Gym Open Now' : 'Closed for Now'}
                </span>
              </div>

              {/* Call Button */}
              <a
                href={`tel:${GYM_DETAILS.phone}`}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors border border-zinc-700"
                title="Call Gym Holic"
              >
                <Phone className="w-4 h-4 text-amber-400" />
              </a>

              {/* WhatsApp Quick Button */}
              <a
                href={`https://wa.me/${GYM_DETAILS.whatsapp}?text=Hi%20Gym%20Holic!%20I'd%20like%20to%20enquire%20about%20membership%20plans%20and%20offers.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* Free VIP Trial Pass Button */}
              <button
                onClick={onOpenTrialModal}
                className="relative group overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Free VIP Pass</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="xl:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
                aria-label="Toggle mobile menu"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-[#0d0d11] border-l border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto z-50">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                    <Dumbbell className="w-4 h-4 text-black transform -rotate-45" />
                  </div>
                  <span className="font-extrabold text-white text-lg">GYM HOLIC</span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status pill in drawer */}
              <div className="mt-4 px-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Today&apos;s Status:
                </span>
                <span className={`font-semibold ${isOpenNow ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isOpenNow ? 'Open Now (5AM - 10:30PM)' : 'Closed'}
                </span>
              </div>

              {/* Drawer Links */}
              <div className="mt-6 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-800 hover:text-amber-400 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-zinc-600 text-xs">→</span>
                  </Link>
                ))}
              </div>

              {/* Quick Action in Drawer */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    onOpenTrialModal();
                  }}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-sm text-center shadow-lg"
                >
                  Claim 1-Day VIP Trial Pass
                </button>

                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    onOpenDietModal();
                  }}
                  className="w-full py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-amber-500/30 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                  Generate Free AI Diet Plan
                </button>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="pt-6 border-t border-zinc-800 text-xs text-zinc-400 space-y-2">
              <p className="font-semibold text-zinc-200">Gym Holic, Above Bank of India</p>
              <p>Ram Mandir Road, Manendragarh Road, Ambikapur</p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`tel:${GYM_DETAILS.phone}`}
                  className="flex items-center gap-1 text-amber-400 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {GYM_DETAILS.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
