import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  Calendar,
  Sparkles,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/layout/WhatsAppFloatingButton';
import { INITIAL_BLOG_POSTS } from '@/lib/seed-data';
import { GYM_DETAILS } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found | Gym Holic Ambikapur',
    };
  }

  return {
    title: `${post.title} | Gym Holic Ambikapur Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = INITIAL_BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between">
      <Navbar onOpenTrialModal={() => {}} onOpenDietModal={() => {}} />

      <main className="pt-28 pb-20 flex-grow">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          {/* Category Pill & Time */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
              {post.category}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {post.readTime}
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-400">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Card Header */}
          <div className="flex items-center justify-between py-4 border-y border-zinc-800 mb-8">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/50"
              />
              <div>
                <h3 className="text-sm font-bold text-white">{post.author.name}</h3>
                <p className="text-xs text-amber-400/90">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - Read more on Gym Holic: https://gymholicfitness.com/blog/' + post.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white transition-colors"
                title="Share on WhatsApp"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Featured Hero Image */}
          <div className="rounded-3xl overflow-hidden mb-10 border border-zinc-800 shadow-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-80 sm:h-[450px] object-cover"
            />
          </div>

          {/* Article Markdown Body */}
          <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={idx}
                    className="text-xl sm:text-2xl font-bold text-white pt-4 text-amber-300"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n- ');
                return (
                  <ul key={idx} className="space-y-2 list-disc list-inside text-zinc-300">
                    {listItems.map((li, lidx) => (
                      <li key={lidx}>{li.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d+\./)) {
                const numItems = paragraph.split('\n');
                return (
                  <ol key={idx} className="space-y-2 list-decimal list-inside text-zinc-300">
                    {numItems.map((ni, nidx) => (
                      <li key={nidx}>{ni.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={idx} className="text-zinc-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Call to action at bottom of article */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-amber-950/40 to-zinc-900 border border-amber-500/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Ready to put this knowledge into action?
              </span>
              <h4 className="text-xl font-black text-white mt-1">
                Train With Us at Gym Holic Ambikapur
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-lg">
                Get a free customized fitness assessment and 1-day pass to experience our imported equipment and certified coaches.
              </p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black font-extrabold text-xs shadow-lg shrink-0"
            >
              Claim Free VIP Pass
            </Link>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-6">
                Recommended Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/40 transition-all block group"
                  >
                    <span className="text-[10px] font-bold text-amber-400 uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mt-1 mb-2 line-clamp-2">
                      {rel.title}
                    </h4>
                    <span className="text-xs text-zinc-500 flex items-center gap-1 font-semibold">
                      <span>Read More</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <WhatsAppFloatingButton />
      <Footer />
    </div>
  );
}
