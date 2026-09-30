'use client';

import React from 'react';
import { Star, CheckCircle, ExternalLink, MessageSquare, Quote } from 'lucide-react';
import { GYM_DETAILS } from '@/lib/constants';
import { INITIAL_TESTIMONIALS } from '@/lib/seed-data';

export default function GoogleReviewsSection() {
  const testimonials = INITIAL_TESTIMONIALS;

  return (
    <section className="py-20 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Google Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              Verified Local Reputation
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              GOOGLE REVIEWS & <span className="gold-gradient-text">MEMBER PRAISE</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Rated 4.8 out of 5 stars based on 140+ real reviews from our Ambikapur gym members.
            </p>
          </div>

          <a
            href={GYM_DETAILS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs border border-zinc-700 hover:border-amber-400 transition-colors shadow-lg w-fit"
          >
            <span>Read All 140+ Google Reviews</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl relative"
            >
              <div>
                {/* Top Quote & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-500 font-medium">
                    {review.date}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{review.name}</span>
                    {review.verifiedMember && (
                      <span title="Verified Gym Holic Member">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </h4>
                  <p className="text-[10px] text-zinc-400">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
