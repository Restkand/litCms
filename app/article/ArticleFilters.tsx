'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface Category {
  name: string
  slug: string
}

interface Props {
  categories: Category[]
  currentCategory: string | null
  currentTime: string
  currentSort: string
}

const TIME_OPTIONS = [
  { value: 'all',  label: 'Semua Waktu' },
  { value: '7d',   label: '7 Hari Terakhir' },
  { value: '30d',  label: '30 Hari Terakhir' },
  { value: '3m',   label: '3 Bulan Terakhir' },
  { value: '1y',   label: '1 Tahun Terakhir' },
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'oldest', label: 'Terlama' },
  { value: 'az',     label: 'A–Z' },
]

// Inline style used to override globals.css `select { color: #171717 }`
const SELECT_STYLE: React.CSSProperties = {
  color: '#e5e7eb',
  backgroundColor: '#1f2937',
}

const OPTION_STYLE: React.CSSProperties = {
  color: '#e5e7eb',
  backgroundColor: '#1f2937',
}

const ChevronDown = () => (
  <svg
    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export default function ArticleFilters({ categories, currentCategory, currentTime, currentSort }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const update = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')
    if (!value || value === 'all' || value === 'newest') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    const qs = params.toString()
    router.push(`/article${qs ? `?${qs}` : ''}`)
  }, [router, searchParams])

  const isFiltered = currentCategory || currentTime !== 'all' || currentSort !== 'newest'

  const selectClass =
    'w-full border border-gray-700 text-sm rounded-xl ' +
    'pl-4 pr-9 py-2.5 appearance-none cursor-pointer hover:border-gray-500 ' +
    'focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'

  return (
    <div className="w-full flex flex-col sm:flex-row gap-3">

      {/* Category */}
      <div className="relative flex-1 min-w-0">
        <select
          value={currentCategory ?? ''}
          onChange={e => update('category', e.target.value)}
          className={selectClass}
          style={SELECT_STYLE}
        >
          <option value="" style={OPTION_STYLE}>Semua Kategori</option>
          {categories.map(cat => (
            <option key={cat.slug} value={cat.slug} style={OPTION_STYLE}>{cat.name}</option>
          ))}
          <option value="uncategorized" style={OPTION_STYLE}>Tanpa Kategori</option>
        </select>
        <ChevronDown />
      </div>

      {/* Time */}
      <div className="relative flex-1 min-w-0">
        <select
          value={currentTime}
          onChange={e => update('time', e.target.value)}
          className={selectClass}
          style={SELECT_STYLE}
        >
          {TIME_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} style={OPTION_STYLE}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown />
      </div>

      {/* Sort */}
      <div className="relative flex-1 min-w-0">
        <select
          value={currentSort}
          onChange={e => update('sort', e.target.value)}
          className={selectClass}
          style={SELECT_STYLE}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} style={OPTION_STYLE}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown />
      </div>

      {/* Reset */}
      {isFiltered && (
        <button
          onClick={() => router.push('/article')}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all shrink-0 sm:w-auto w-full"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reset
        </button>
      )}
    </div>
  )
}
