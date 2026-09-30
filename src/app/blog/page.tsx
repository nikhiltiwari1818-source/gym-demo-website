'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Clock,
  User,
  Sparkles,
  ArrowLeft,
  Search,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/layout/WhatsAppFloatingButton';
import { INITIAL_BLOG_POSTS } from '@/lib/seed-data';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const categories = [
    'All',
    'Nutrition',
    'Weight Loss',
    'Muscle Building',
    'Supplements',
    'Fitness Tips',
  ];

  const posts = INITIAL_BLOG_POSTS.filter((post) => {
    const matchCat =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between">
      <Navbar onOpenTrialModal={() => {}} onOpenDietModal={() => {}} />

      <main className="pt-28 pb-20 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Gym Holic Home</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Evidence-Based Fitness Articles
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              GYM HOLIC <span className="gold-gradient-text">FITNESS BLOG</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-3xl">
              Written by certified K11 and ISSA coaches. Science-backed Indian diet guides, hypertrophy splits, fat loss myths, and supplement strategies.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 mb-10 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles on diet, creatine, abs..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
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
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-zinc-950">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-black/80 text-amber-300 border border-amber-400/40">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-zinc-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug mb-3">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-amber-400/40"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {post.author.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 block">
                        {post.author.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 group/link"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <WhatsAppFloatingButton />
      <Footer />
    </div>
  );
}
