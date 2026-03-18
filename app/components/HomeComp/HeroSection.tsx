'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

export default function HeroSection() {
  const [clock, setClock] = useState('')
  const [dayStr, setDayStr] = useState('')
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setClock(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`)
      setDayStr(DAYS[now.getDay()])
      setDateStr(`${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gray-950">

      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #312e81 55%, #1c1917 80%, #0c0a09 100%)',
        }}
      />

      {/* Ambient glow top-right */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      {/* Ambient glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-20 pb-16 text-center max-w-5xl mx-auto w-full">

        {/* Logo + badge */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            {/* Glow behind logo */}
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20 bg-amber-400 scale-110 pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden border border-amber-400/30 bg-gray-900/80 p-2 shadow-2xl">
              <Image
                src="/nuiiLogo.png"
                alt="Nuii"
                width={120}
                height={120}
                className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
                style={{ filter: 'invert(1) sepia(1) saturate(0) brightness(1.15)' }}
                priority
              />
            </div>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            IT Consulting &amp; Digital Solutions
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-4">
          Solusi Digital
          <br />
          <span
            className="inline-block"
            style={{
              backgroundImage: 'linear-gradient(90deg, #f59e0b, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Transparan &amp; Terjangkau
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Kami membangun aplikasi mobile, web, backend, dan desktop berkualitas tinggi —
          dengan harga yang jelas, kompetitif, dan selalu disesuaikan dengan skala kebutuhan Anda.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Link
            href="#products"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-gray-950 text-sm sm:text-base bg-amber-400 hover:bg-amber-300 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-400/25"
          >
            Lihat Produk Kami
          </Link>
          <Link
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-white text-sm sm:text-base border border-gray-700 hover:border-amber-400/50 hover:bg-white/5 transition-all duration-200"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Clock widget */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-[0.15em]">
                {clock}
              </div>
              <div className="text-xs text-white/40 mt-1.5 tracking-widest uppercase">Waktu Lokal</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/15" />
            <div className="block sm:hidden w-32 h-px bg-white/15" />
            <div className="text-center sm:text-left">
              <div className="text-base sm:text-lg font-bold text-white">{dayStr}, {dateStr}</div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1.5 text-white/50 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-1 text-gray-600 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

    </section>
  )
}
