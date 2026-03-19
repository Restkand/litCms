'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Pengurus DKM',
    role: 'Pengurus DKM Masjid',
    company: 'Masjid Al-Furqon Bekasi',
    avatar: 'AF',
    color: '#10b981',
    rating: 5,
    text: 'Nuii membantu kami membangun Website CMS untuk masjid. Konten jadwal sholat, kajian, dan berita masjid kini dapat dikelola langsung oleh pengurus tanpa perlu keahlian teknis. Tim sangat responsif dan harganya sangat terjangkau.',
  },
  {
    name: 'Reynold P',
    role: 'Founder & Pendiri',
    company: 'PT Fokus Inovasi Faradisa Abadi',
    avatar: 'RP',
    color: '#3b82f6',
    rating: 5,
    text: 'Nuii membangun aplikasi mobile frontend PPOB FIFA Pay dari nol. UI bersih, performa stabil, dan semua fitur yang kami butuhkan berjalan dengan baik. Proses development sangat transparan dari awal hingga delivery.',
  },
  {
    name: 'Tim Kharites',
    role: 'Pengelola Aplikasi',
    company: 'Kharites',
    avatar: 'KH',
    color: '#8b5cf6',
    rating: 5,
    text: 'Nuii berhasil membangun aplikasi membership kecantikan Kharites dengan fitur yang lengkap. Manajemen member, layanan, dan transaksi kini terintegrasi dalam satu platform yang mudah digunakan.',
  },
  {
    name: 'Elpian Jaya',
    role: 'Owner',
    company: 'PT Winata Elang Jaya',
    avatar: 'EJ',
    color: '#f59e0b',
    rating: 5,
    text: 'Sistem asset management yang dibangun Nuii sangat membantu operasional perusahaan forwarding kami. Pencatatan dan pengelolaan aset yang sebelumnya manual kini terdigitalisasi dengan rapi dan efisien.',
  },
  {
    name: 'Bukhori Arkan',
    role: 'CTO',
    company: 'Najah Creative',
    avatar: 'BA',
    color: '#06b6d4',
    rating: 5,
    text: 'Kolaborasi bersama Nuii dalam membangun Guide Customer Service berjalan sangat lancar. Tim profesional, komunikatif, dan menghasilkan solusi yang tepat sasaran sesuai kebutuhan kami.',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const INTERVAL_MS = 5000

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const go = useCallback((idx: number) => {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }, [active])

  const prev = useCallback(() => {
    const idx = (active - 1 + testimonials.length) % testimonials.length
    setDirection(-1)
    setActive(idx)
  }, [active])

  const next = useCallback(() => {
    const idx = (active + 1) % testimonials.length
    setDirection(1)
    setActive(idx)
  }, [active])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setDirection(1)
      setActive((a) => (a + 1) % testimonials.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  const t = testimonials[active]

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
    exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.25 } }),
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-gray-950 py-24 lg:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #f59e0b 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
            Testimoni
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Mereka{' '}
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #f59e0b, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Sudah Merasakan
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Klien nyata, hasil nyata — inilah yang mereka katakan tentang Nuii.
          </p>
        </motion.div>

        {/* Carousel card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card area — fixed height to prevent layout shift */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-900/60 border border-white/8 min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-7 sm:p-10 flex flex-col gap-5"
              >
                {/* Quote + stars */}
                <div className="flex items-start justify-between gap-4">
                  <StarRating count={t.rating} />
                  <svg className="w-8 h-8 opacity-10 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Review text */}
                <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-white/8" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: `${t.color}25`, border: `1.5px solid ${t.color}55` }}
                  >
                    <span style={{ color: t.color }}>{t.avatar}</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role} · {t.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 px-1">
            {/* Prev button */}
            <button
              onClick={prev}
              aria-label="Testimoni sebelumnya"
              className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-150"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Tampilkan testimoni ${i + 1}`}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === active ? '24px' : '8px',
                    height: '8px',
                    background: i === active ? '#f59e0b' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={next}
              aria-label="Testimoni berikutnya"
              className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-150"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

