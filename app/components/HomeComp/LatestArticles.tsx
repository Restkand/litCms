'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  createdAt: string
  category: { name: string; slug: string } | null
  featuredImage: { url: string; alt: string | null } | null
  author: { name: string }
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: 'blur(4px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
  },
})

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const preview = article.excerpt?.trim()
    || article.content.replace(/\n+/g, ' ').slice(0, 120) + '...'

  const date = new Date(article.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const accentColors = ['#3b82f6', '#8b5cf6', '#10b981']
  const accent = accentColors[index % accentColors.length]

  const anim = fadeUp(index * 0.12)

  return (
    <motion.div
      ref={ref}
      initial={anim.initial}
      animate={inView ? anim.animate : anim.initial}
      className="group relative flex flex-col bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden
                 hover:border-gray-500 hover:shadow-2xl hover:-translate-y-1
                 transition-all duration-300"
    >
      {/* Featured Image */}
      {article.featuredImage ? (
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.featuredImage.url}
            alt={article.featuredImage.alt || article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
        </div>
      ) : (
        <div
          className="aspect-video flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${accent}22 0%, ${accent}08 100%)` }}
        >
          <svg className="w-12 h-12 opacity-20" style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category badge */}
        {article.category && (
          <span
            className="self-start px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border"
            style={{ color: accent, borderColor: `${accent}50`, background: `${accent}18` }}
          >
            {article.category.name}
          </span>
        )}

        {/* Title */}
        <h3 className="text-white font-bold text-lg leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
          {article.title}
        </h3>

        {/* Preview */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
          {preview}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700 mt-auto">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: accent }}
            >
              {article.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-gray-300 text-xs font-medium">{article.author.name}</p>
              <p className="text-gray-500 text-xs">{date}</p>
            </div>
          </div>
          <Link
            href={`/article/${article.slug}`}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ color: accent, background: `${accent}18` }}
          >
            Baca
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function LatestArticles() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/articles')
      .then(r => r.json())
      .then((data: Article[]) => {
        const published = Array.isArray(data)
          ? data.filter(a => a.published === true).slice(0, 3)
          : []
        setArticles(published)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden">
      {/* Background ambience */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold uppercase tracking-widest">Artikel Terbaru</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Insights &{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Pembaruan
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Artikel, tips, dan update terbaru dari tim Nuii seputar teknologi dan pengembangan digital.
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map(i => (
              <div key={i} className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-700" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-700 rounded w-1/3" />
                  <div className="h-5 bg-gray-700 rounded w-4/5" />
                  <div className="h-3 bg-gray-700 rounded w-full" />
                  <div className="h-3 bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-700 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-400 font-medium">Artikel masih belum tersedia.</p>
            <p className="text-gray-600 text-sm mt-1">Nantikan konten terbaru dari tim Nuii.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        )}

        {/* CTA Button */}
        {!loading && articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Link
              href="/article"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm
                         bg-gradient-to-r from-blue-600 to-purple-600 text-white
                         hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200"
            >
              Lihat Semua Artikel
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
