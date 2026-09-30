'use client';

import React from 'react';
import Link from 'next/link';
import {
  Dumbbell,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  ExternalLink,
  Shield,
  Heart,
  Lock,
} from 'lucide-react';
import { GYM_DETAILS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#070709] border-t border-zinc-800/80 text-zinc-400 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
                <Dumbbell className="w-5 h-5 text-black transform -rotate-45" />
              </div>
              <span className="text-xl font-black text-white tracking-wider">
                GYM<span className="text-amber-400">HOLIC</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Ambikapur&apos;s elite strength & conditioning fitness sanctuary. Equipped with imported biomechanical machinery, certified coaches, luxury amenities, and clean nutrition guidance.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>4.8 / 5.0 (140+ Google Reviews)</span>
            </div>
            <div className="pt-2">
              <a
                href={GYM_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Explore & Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#live-crowd" className="hover:text-amber-400 transition-colors">
                  Live Gym Busy Meter
                </Link>
              </li>
              <li>
                <Link href="/#bmi-diet" className="hover:text-amber-400 transition-colors">
                  Advanced BMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/#bmi-diet" className="hover:text-amber-400 transition-colors">
                  AI Indian Diet Plan Generator
                </Link>
              </li>
              <li>
                <Link href="/#memberships" className="hover:text-amber-400 transition-colors">
                  Membership Plans & Pricing
                </Link>
              </li>
              <li>
                <Link href="/#transformations" className="hover:text-amber-400 transition-colors">
                  Member Transformations
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-amber-400 transition-colors">
                  Affiliate Supplement Store
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors">
                  Fitness & Nutrition Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Timings */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Operating Hours
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                <span className="text-zinc-300 font-semibold">Monday</span>
                <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded">
                  Open 24 Hours
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                <span className="text-zinc-300 font-semibold">Tuesday – Saturday</span>
                <span className="text-amber-300">5:00 AM – 10:30 PM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                <span className="text-zinc-300 font-semibold">Sunday</span>
                <span className="text-amber-400">6:00 AM – 1:00 PM</span>
              </div>
              <p className="text-[11px] text-zinc-500 pt-2 italic">
                *Sunday evenings dedicated to deep cleaning, equipment maintenance, and facility sanitation.
              </p>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Gym Location
            </h3>
            <div className="space-y-2.5 text-xs">
              <p className="text-zinc-300 leading-relaxed font-medium">
                {GYM_DETAILS.name}
                <br />
                {GYM_DETAILS.address}
                <br />
                {GYM_DETAILS.city}, {GYM_DETAILS.state} – {GYM_DETAILS.pincode}
              </p>
              <div className="pt-2 flex flex-col gap-1.5">
                <a
                  href={`tel:${GYM_DETAILS.phone}`}
                  className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{GYM_DETAILS.phone}</span>
                </a>
                <a
                  href={`mailto:${GYM_DETAILS.email}`}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{GYM_DETAILS.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Gym Holic, The Fitness Club. All Rights Reserved. Built for high performance.</p>
          <div className="flex items-center gap-5">
            <Link href="/admin" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
            <Link href="/#location" className="hover:text-zinc-400 transition-colors">
              Google Maps
            </Link>
            <Link href="/#faq" className="hover:text-zinc-400 transition-colors">
              Privacy & FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
