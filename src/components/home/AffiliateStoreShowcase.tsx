'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  ExternalLink,
  Star,
  Scale,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { AffiliateProduct } from '@/types';
import { INITIAL_AFFILIATE_PRODUCTS } from '@/lib/seed-data';
import { formatINR } from '@/lib/utils';
import ProductCompareModal from '../store/ProductCompareModal';

export default function AffiliateStoreShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [compareList, setCompareList] = useState<AffiliateProduct[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const products = INITIAL_AFFILIATE_PRODUCTS;

  const categories = [
    'All',
    'Whey Protein',
    'Creatine',
    'Pre Workout',
    'Mass Gainer',
    'Shaker Bottles',
    'Gym Gloves',
    'Resistance Bands',
    'Yoga Mats',
    'Multivitamins',
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleCompare = (product: AffiliateProduct) => {
    if (compareList.some((p) => p.id === product.id)) {
      setCompareList(compareList.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 products at a time.');
        return;
      }
      setCompareList([...compareList, product]);
    }
  };

  return (
    <section id="store" className="py-20 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              Gym Holic Verified Gear & Fuel
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              AFFILIATE <span className="gold-gradient-text">FITNESS STORE</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              100% authentic, lab-tested supplements & gym accessories recommended by our trainers. Direct checkout on Amazon, Flipkart, and HealthKart.
            </p>
          </div>

          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 hover:text-amber-300 font-bold text-xs border border-zinc-700 transition-colors w-fit"
          >
            <span>Browse Full Store (10+ Categories)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => {
            const isComparing = compareList.some((p) => p.id === product.id);
            return (
              <div
                key={product.id}
                className="group rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-amber-500/10"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative h-56 bg-zinc-950 overflow-hidden p-4 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Platform Tag */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-black/80 text-amber-300 border border-amber-400/30">
                      {product.platform}
                    </div>

                    {/* Compare Toggle Button */}
                    <button
                      onClick={() => toggleCompare(product)}
                      className={`absolute top-3 right-3 p-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 ${
                        isComparing
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-black/80 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                      title="Add to comparison"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span className="text-[10px] hidden sm:inline">
                        {isComparing ? 'Comparing' : 'Compare'}
                      </span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                      {product.brand}
                    </div>
                    <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-amber-300 transition-colors mb-2">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                      <span className="text-xs font-bold text-zinc-200">
                        {product.rating}
                      </span>
                      <span className="text-xs text-zinc-500">
                        ({product.reviewsCount.toLocaleString()}+ ratings)
                      </span>
                    </div>

                    {/* Specs highlight */}
                    {product.specs.proteinPerServing && (
                      <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-zinc-800 text-[11px] text-zinc-300 font-medium mb-3">
                        ⚡ {product.specs.proteinPerServing}
                      </div>
                    )}

                    {/* Price Block */}
                    <div className="flex items-baseline gap-2 pt-2 border-t border-zinc-800">
                      <span className="text-xl font-black text-white">
                        {formatINR(product.priceINR)}
                      </span>
                      <span className="text-xs text-zinc-500 line-through">
                        {formatINR(product.originalPriceINR)}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 ml-auto bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        Save {Math.round(((product.originalPriceINR - product.priceINR) / product.originalPriceINR) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* External Buy Now Button */}
                <div className="p-5 pt-0">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                  >
                    <span>Buy Now on {product.platform}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-[10px] text-zinc-500 text-center mt-1.5">
                    Official seller dispatch & doorstep delivery in Ambikapur.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Compare Trigger Bar if 1+ items selected */}
        {compareList.length > 0 && (
          <div className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-40 bg-zinc-900 border-2 border-amber-400 rounded-2xl p-3 sm:px-6 shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-6">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm font-bold text-white">
                {compareList.length} Product{compareList.length > 1 ? 's' : ''} Selected
              </span>
            </div>

            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-md"
            >
              Compare Side-by-Side →
            </button>

            <button
              onClick={() => setCompareList([])}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-2"
            >
              Clear
            </button>
          </div>
        )}

        {/* Compare Modal */}
        <ProductCompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          products={compareList}
          onRemoveProduct={(id) => setCompareList(compareList.filter((p) => p.id !== id))}
        />
      </div>
    </section>
  );
}
