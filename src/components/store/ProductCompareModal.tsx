'use client';

import React from 'react';
import { X, ExternalLink, Star, CheckCircle, Scale } from 'lucide-react';
import { AffiliateProduct } from '@/types';
import { formatINR } from '@/lib/utils';

interface ProductCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: AffiliateProduct[];
  onRemoveProduct: (id: string) => void;
}

export default function ProductCompareModal({
  isOpen,
  onClose,
  products,
  onRemoveProduct,
}: ProductCompareModalProps) {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#121217] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-500/20 border-b border-amber-500/30 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                PRODUCT COMPARISON
              </h3>
              <p className="text-xs text-zinc-400">
                Side-by-side nutrition, serving size & pricing analysis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto">
          <div className="min-w-[600px] grid grid-cols-4 gap-4">
            {/* Criteria Column */}
            <div className="col-span-1 space-y-4 pt-36 text-xs font-bold text-zinc-400">
              <div className="h-9 flex items-center border-b border-zinc-800">Brand</div>
              <div className="h-9 flex items-center border-b border-zinc-800">Price (INR)</div>
              <div className="h-9 flex items-center border-b border-zinc-800">User Rating</div>
              <div className="h-9 flex items-center border-b border-zinc-800">Protein / Serving</div>
              <div className="h-9 flex items-center border-b border-zinc-800">Total Servings</div>
              <div className="h-16 flex items-center border-b border-zinc-800">Key Highlight</div>
              <div className="h-12 flex items-center">Affiliate Store</div>
            </div>

            {/* Products Columns */}
            {products.map((prod) => (
              <div
                key={prod.id}
                className="col-span-1 rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 flex flex-col justify-between relative space-y-4 text-xs"
              >
                {/* Remove button */}
                <button
                  onClick={() => onRemoveProduct(prod.id)}
                  className="absolute top-2 right-2 p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400"
                  title="Remove from comparison"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Product Card Top */}
                <div className="h-32 flex flex-col items-center text-center">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-20 h-20 object-cover rounded-xl mb-2"
                  />
                  <h4 className="font-bold text-white text-[11px] line-clamp-2">
                    {prod.title}
                  </h4>
                </div>

                {/* Brand */}
                <div className="h-9 flex items-center font-bold text-amber-400 border-b border-zinc-800">
                  {prod.brand}
                </div>

                {/* Price */}
                <div className="h-9 flex items-center font-black text-white text-sm border-b border-zinc-800">
                  {formatINR(prod.priceINR)}
                </div>

                {/* Rating */}
                <div className="h-9 flex items-center border-b border-zinc-800">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{prod.rating}</span>
                    <span className="text-zinc-500 font-normal">({prod.reviewsCount})</span>
                  </div>
                </div>

                {/* Protein */}
                <div className="h-9 flex items-center text-zinc-300 font-medium border-b border-zinc-800">
                  {prod.specs.proteinPerServing || 'N/A'}
                </div>

                {/* Servings */}
                <div className="h-9 flex items-center text-zinc-300 font-medium border-b border-zinc-800">
                  {prod.specs.servings ? `${prod.specs.servings} Servings` : 'Standard Pack'}
                </div>

                {/* Highlight */}
                <div className="h-16 flex items-center text-zinc-400 text-[11px] border-b border-zinc-800 line-clamp-3">
                  {prod.specs.highlight || 'Certified high-performance fitness essential.'}
                </div>

                {/* Buy Button */}
                <div className="h-12 flex items-center pt-2">
                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-[11px] text-center flex items-center justify-center gap-1 shadow-md transition-all"
                  >
                    <span>Buy on {prod.platform}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
