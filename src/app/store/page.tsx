'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  ExternalLink,
  Star,
  Scale,
  Search,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Tag,
  Check,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/layout/WhatsAppFloatingButton';
import ProductCompareModal from '@/components/store/ProductCompareModal';
import { INITIAL_AFFILIATE_PRODUCTS } from '@/lib/seed-data';
import { AffiliateProduct } from '@/types';
import { formatINR } from '@/lib/utils';

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'rating'>('featured');
  const [compareList, setCompareList] = useState<AffiliateProduct[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const categories = [
    'All',
    'Whey Protein',
    'Mass Gainer',
    'Creatine',
    'Pre Workout',
    'Shaker Bottles',
    'Gym Gloves',
    'Resistance Bands',
    'Yoga Mats',
    'Multivitamins',
  ];

  let filtered = INITIAL_AFFILIATE_PRODUCTS.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'priceAsc') {
    filtered.sort((a, b) => a.priceINR - b.priceINR);
  } else if (sortBy === 'priceDesc') {
    filtered.sort((a, b) => b.priceINR - a.priceINR);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const toggleCompare = (product: AffiliateProduct) => {
    if (compareList.some((p) => p.id === product.id)) {
      setCompareList(compareList.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 products.');
        return;
      }
      setCompareList([...compareList, product]);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between">
      <Navbar onOpenTrialModal={() => {}} onOpenDietModal={() => {}} />

      <main className="pt-28 pb-20 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Header */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Gym Holic Home</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              Coach-Curated Fitness Gear & Nutrition
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              GYM HOLIC <span className="gold-gradient-text">AFFILIATE STORE</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-3xl">
              Authentic whey proteins, Creapure creatine, explosive pre-workouts, and heavy-duty gym accessories vetted by our Ambikapur coaches. Purchases are fulfilled securely via Amazon, Flipkart, and HealthKart.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 mb-10 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search brand, protein, creatine, shaker..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
                <span className="text-zinc-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs outline-none focus:border-amber-400 font-semibold"
                >
                  <option value="featured">Featured / Best Seller</option>
                  <option value="rating">Top Customer Ratings</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-zinc-800/80">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const isComparing = compareList.some((p) => p.id === product.id);
              return (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative h-60 bg-zinc-950 overflow-hidden p-4 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-black/80 text-amber-300 border border-amber-400/30">
                        {product.platform}
                      </div>

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

                    {/* Content */}
                    <div className="p-5">
                      <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                        {product.brand}
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-amber-300 transition-colors mb-2">
                        {product.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                        </div>
                        <span className="text-xs font-bold text-zinc-200">{product.rating}</span>
                        <span className="text-xs text-zinc-500">
                          ({product.reviewsCount.toLocaleString()}+ reviews)
                        </span>
                      </div>

                      {product.specs.proteinPerServing && (
                        <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-zinc-800 text-[11px] text-zinc-300 font-medium mb-3">
                          ⚡ {product.specs.proteinPerServing}
                        </div>
                      )}

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

                  <div className="p-5 pt-0">
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                    >
                      <span>Buy on {product.platform}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating Compare Trigger */}
      {compareList.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-zinc-900 border-2 border-amber-400 rounded-2xl p-3 sm:px-6 shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-6">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-white">
              {compareList.length} Product{compareList.length > 1 ? 's' : ''} Selected
            </span>
          </div>
          <button
            onClick={() => setIsCompareOpen(true)}
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

      <ProductCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={compareList}
        onRemoveProduct={(id) => setCompareList(compareList.filter((p) => p.id !== id))}
      />

      <WhatsAppFloatingButton />
      <Footer />
    </div>
  );
}
