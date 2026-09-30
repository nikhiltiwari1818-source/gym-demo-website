'use client';

import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, Sparkles, Send } from 'lucide-react';
import { GYM_DETAILS } from '@/lib/constants';

export default function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    {
      title: 'Join Gym Holic',
      description: 'Enquire about admission & membership packages',
      message: 'Hi Gym Holic! I am interested in joining. Please share your current membership offers and fees.',
    },
    {
      title: 'Book 1-Day Free Trial',
      description: 'Experience equipment & atmosphere at zero cost',
      message: 'Hi Gym Holic! I would like to book a 1-day VIP free trial pass for tomorrow. Please confirm.',
    },
    {
      title: 'Get Membership Price List',
      description: 'Quarterly, Half-Yearly, and Annual plans',
      message: 'Hi! Could you please send me the complete membership price chart for Gym Holic Ambikapur?',
    },
    {
      title: 'Ask about Diet Plan / PT',
      description: 'Talk to certified nutritionists & trainers',
      message: 'Hi Gym Holic! I calculated my BMI and would like to speak with a coach regarding personal training and diet plans.',
    },
  ];

  const handleOpenWhatsApp = (message: string) => {
    const url = `https://wa.me/${GYM_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40">
      {/* Expanded WhatsApp Modal Menu */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#121217] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Gym Holic Assistant</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Typically replies in 5 minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-black/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Preset Links */}
          <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
            <p className="text-[11px] text-zinc-400 font-medium px-1">
              Select an option to start instant WhatsApp chat:
            </p>
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => handleOpenWhatsApp(preset.message)}
                className="w-full text-left p-2.5 rounded-xl bg-zinc-900/80 hover:bg-emerald-950/30 border border-zinc-800 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                    {preset.title}
                  </div>
                  <div className="text-[10px] text-zinc-400">{preset.description}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transform group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>

          {/* Custom Message Input Footer */}
          <div className="p-3 bg-black/40 border-t border-zinc-800">
            <button
              onClick={() => handleOpenWhatsApp('Hello Gym Holic team, I have a quick question regarding the gym.')}
              className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start Custom WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all"
        aria-label="Open WhatsApp Support"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-black" />
        </span>
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white fill-white/10 group-hover:rotate-12 transition-transform" />
        )}
      </button>
    </div>
  );
}
