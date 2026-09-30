'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Car,
  Clock,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { GYM_DETAILS, AMBIKAPUR_LANDMARKS } from '@/lib/constants';

export default function MapDistanceSection() {
  const [selectedLandmark, setSelectedLandmark] = useState(AMBIKAPUR_LANDMARKS[0]);
  const [customDistance, setCustomDistance] = useState<number | null>(null);

  const calculateEstimate = (distKm: number) => {
    const minsBike = Math.max(2, Math.round(distKm * 2.2));
    const minsCar = Math.max(3, Math.round(distKm * 2.8));
    return { minsBike, minsCar };
  };

  const activeDist = customDistance !== null ? customDistance : selectedLandmark.distanceKm;
  const estimate = calculateEstimate(activeDist);

  return (
    <section id="location" className="py-20 bg-[#0d0d12] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Prime Ambikapur Location
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            FIND US ON <span className="gold-gradient-text">GOOGLE MAPS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Centrally situated on Ram Mandir Road, above Bank of India. Easily accessible from anywhere in Ambikapur.
          </p>
        </div>

        {/* 2-Column Grid: Map + Distance Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Embed & Directions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl">
            {/* Embedded Interactive Map */}
            <div className="h-80 sm:h-96 w-full relative bg-zinc-950">
              <iframe
                title="Gym Holic Google Maps Location"
                src="https://maps.google.com/maps?q=23.1186501,83.1933196&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.1) brightness(0.9)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Address Banner below map */}
            <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  {GYM_DETAILS.name}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  {GYM_DETAILS.address}, {GYM_DETAILS.city} (C.G.) – 497001
                </p>
              </div>

              <a
                href={GYM_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all shrink-0"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Distance & Travel Time Calculator (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-zinc-900/90 border border-amber-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Ambikapur Distance Estimator</span>
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                HOW FAR ARE YOU FROM GYM HOLIC?
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Select your current area in Ambikapur to see approximate driving time and distance.
              </p>

              {/* Landmark Dropdown / Buttons */}
              <div className="space-y-2 mb-6">
                <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                  Popular Ambikapur Landmarks:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {AMBIKAPUR_LANDMARKS.map((landmark) => (
                    <button
                      key={landmark.name}
                      type="button"
                      onClick={() => {
                        setSelectedLandmark(landmark);
                        setCustomDistance(null);
                      }}
                      className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                        selectedLandmark.name === landmark.name && customDistance === null
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                          : 'bg-zinc-800/80 border-zinc-700/80 text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="truncate font-bold">{landmark.name}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">
                        {landmark.distanceKm} km (~{landmark.travelTimeMins} mins)
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Time Metrics Box */}
              <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Selected Starting Point:</span>
                  <span className="font-bold text-white truncate max-w-[200px]">
                    {selectedLandmark.name}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block">Distance</span>
                    <span className="text-base font-black text-amber-400">
                      {activeDist} <span className="text-xs font-normal">km</span>
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block">By 2-Wheeler</span>
                    <span className="text-base font-black text-emerald-400">
                      ~{estimate.minsBike} <span className="text-xs font-normal">mins</span>
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block">By Car / Auto</span>
                    <span className="text-base font-black text-white">
                      ~{estimate.minsCar} <span className="text-xs font-normal">mins</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="pt-6">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=23.1186501,83.1933196&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-zinc-700 hover:border-amber-400 transition-colors"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Navigate from {selectedLandmark.name.split(' ')[0]} Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
