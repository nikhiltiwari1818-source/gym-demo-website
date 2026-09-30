'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Clock,
  Flame,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react';
import { CrowdStatus } from '@/types';
import { INITIAL_CROWD_STATUS } from '@/lib/seed-data';

export default function LiveCrowdMeter() {
  const [crowd, setCrowd] = useState<CrowdStatus>(INITIAL_CROWD_STATUS);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  const fetchLiveCrowd = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/crowd');
      if (res.ok) {
        const data = await res.json();
        setCrowd(data);
      }
    } catch (e) {
      console.error('Error fetching crowd status:', e);
    } finally {
      setIsLoading(false);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  useEffect(() => {
    fetchLiveCrowd();
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchLiveCrowd, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = () => {
    switch (crowd.level) {
      case 'LOW':
        return {
          label: 'LOW TRAFFIC',
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
          dot: 'bg-emerald-500',
          desc: 'Minimal wait time. Squat racks, deadlift platforms & benches wide open.',
        };
      case 'HIGH':
        return {
          label: 'PEAK RUSH / HIGH TRAFFIC',
          color: 'text-red-400 bg-red-500/10 border-red-500/30',
          dot: 'bg-red-500',
          desc: 'High energy atmosphere! Popular equipment may require sharing sets.',
        };
      case 'MODERATE':
      default:
        return {
          label: 'MODERATE TRAFFIC',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
          dot: 'bg-amber-500',
          desc: 'Comfortable workout conditions. Smooth flow across strength and cardio floors.',
        };
    }
  };

  const badge = getStatusBadge();

  // Hourly schedule bars for Ambikapur typical gym day
  const hourlyData = [
    { hour: '5 AM', level: 20 },
    { hour: '6 AM', level: 65 },
    { hour: '7 AM', level: 85, peak: true },
    { hour: '8 AM', level: 75, peak: true },
    { hour: '9 AM', level: 45 },
    { hour: '11 AM', level: 25, best: true },
    { hour: '1 PM', level: 20, best: true },
    { hour: '3 PM', level: 25, best: true },
    { hour: '5 PM', level: 60 },
    { hour: '6 PM', level: 90, peak: true },
    { hour: '7 PM', level: 95, peak: true },
    { hour: '8 PM', level: 80, peak: true },
    { hour: '9 PM', level: 40, best: true },
    { hour: '10 PM', level: 20 },
  ];

  return (
    <section id="live-crowd" className="py-20 bg-[#09090b] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            Real-Time Facility Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            LIVE GYM <span className="gold-gradient-text">BUSY METER</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Never wait for a barbell again. Check real-time crowd occupancy, peak hours, and plan your workout during optimal training windows.
          </p>
        </div>

        {/* Main Live Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-zinc-900/90 border border-amber-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Ambikapur Main Floor</h3>
                <p className="text-xs text-zinc-400">
                  Synced with Biometric Turnstiles & Floor Sensors
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={fetchLiveCrowd}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium border border-zinc-700 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <span className="text-[11px] text-zinc-500">Updated: {lastRefreshed}</span>
            </div>
          </div>

          {/* Current Status Highlight */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left: Big Occupancy Gauge */}
            <div className="md:col-span-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-zinc-800 text-center">
              <div className="text-5xl font-black text-white mb-1">
                {crowd.percentage}%
              </div>
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                Current Occupancy
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${badge.color}">
                <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`} />
                <span>{badge.label}</span>
              </div>
              <div className="text-xs text-zinc-400 mt-3 font-medium">
                {crowd.currentOccupancy} / {crowd.maxCapacity} Active Members
              </div>
            </div>

            {/* Middle: Progress Bar & Status Message */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-zinc-300">Live Traffic Scale</span>
                  <span className="text-amber-400">{crowd.currentOccupancy} Athletes Inside</span>
                </div>
                {/* 3-Part Color Scale Bar */}
                <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-zinc-700 relative">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      crowd.percentage < 35
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : crowd.percentage > 70
                        ? 'bg-gradient-to-r from-amber-500 to-red-500'
                        : 'bg-gradient-to-r from-amber-400 to-yellow-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(10, crowd.percentage))}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-semibold">
                  <span className="text-emerald-400">Low (0-35%)</span>
                  <span className="text-amber-400">Moderate (35-70%)</span>
                  <span className="text-red-400">Peak (70-100%)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-800/60 border border-zinc-700/60 text-xs text-zinc-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {crowd.statusMessage || badge.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Timing Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            {/* Best Time to Visit */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-0.5">
                  Best Time To Visit
                </h4>
                <p className="text-sm font-bold text-white">{crowd.bestTimeToVisit}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Quietest hours with maximum machine availability.
                </p>
              </div>
            </div>

            {/* Peak Hours */}
            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-red-400 mb-0.5">
                  Peak Rush Hours
                </h4>
                <p className="text-sm font-bold text-white">{crowd.peakHours}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  High energy club vibe, community workout buzz.
                </p>
              </div>
            </div>
          </div>

          {/* Typical Hourly Timeline Chart */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Typical Ambikapur Footfall Pattern
              </h4>
              <span className="text-[11px] text-zinc-500">Based on Google & Biometric Logs</span>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5 items-end h-28 pt-4">
              {hourlyData.map((slot, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      slot.peak
                        ? 'bg-red-500/80 group-hover:bg-red-400'
                        : slot.best
                        ? 'bg-emerald-500/80 group-hover:bg-emerald-400'
                        : 'bg-amber-400/60 group-hover:bg-amber-300'
                    }`}
                    style={{ height: `${slot.level}%` }}
                    title={`${slot.hour}: ~${slot.level}% footfall`}
                  />
                  <span className="text-[9px] text-zinc-500 font-mono tracking-tighter truncate w-full text-center">
                    {slot.hour}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-4 text-[10px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Peaceful Off-Peak
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Steady Regular
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                Peak Rush
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
