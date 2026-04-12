'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay } },
})

type Tier = {
  name: string
  badge?: string
  priceFrom: string
  priceTo: string
  timeline: string
  description: string
  features: string[]
}

type Category = {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  note: string
  tiers: Tier[]
}

const categories: Category[] = [
  {
    id: 'website',
    label: 'Website',
    color: '#10b981',
    note: 'Termasuk company profile, landing page, CMS, dan web app.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 20h8M12 18v2" />
      </svg>
    ),
    tiers: [
      {
        name: 'Esensial',
        priceFrom: 'Rp 3 juta', priceTo: 'Rp 10 juta', timeline: '2–3 minggu',
        description: 'Landing page atau profil usaha statis. Cocok untuk UMKM, komunitas, atau kebutuhan online presence dasar.',
        features: ['Hingga 5 halaman statis', 'Desain responsif (mobile-friendly)', 'Form kontak sederhana', 'Setup hosting & domain', 'SEO dasar (meta, sitemap)'],
      },
      {
        name: 'Profesional', badge: 'Paling Diminati',
        priceFrom: 'Rp 15 juta', priceTo: 'Rp 40 juta', timeline: '4–7 minggu',
        description: 'Website dengan CMS — pengelola konten bisa update artikel, berita, atau produk sendiri tanpa coding.',
        features: ['Sistem manajemen konten (CMS)', 'Autentikasi admin & multi-user', 'Blog / berita terintegrasi', 'SEO on-page & Google Analytics', 'Optimasi Core Web Vitals'],
      },
      {
        name: 'Premium',
        priceFrom: 'Rp 40 juta', priceTo: 'Rp 120 juta', timeline: '8–16 minggu',
        description: 'Web application kompleks dengan logika bisnis kustom, dashboard, dan integrasi API pihak ketiga.',
        features: ['Fitur bisnis kustom penuh', 'Integrasi API eksternal (payment, maps, dll)', 'Dashboard & laporan dinamis', 'Role & permission sistem', 'Skalabilitas cloud & CI/CD'],
      },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile App',
    color: '#3b82f6',
    note: 'Single codebase iOS & Android menggunakan Expo / React Native.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3" /><circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    tiers: [
      {
        name: 'Esensial',
        priceFrom: 'Rp 15 juta', priceTo: 'Rp 30 juta', timeline: '4–6 minggu',
        description: 'Aplikasi informasi atau katalog sederhana. Cocok untuk profil bisnis, direktori, atau konten digital.',
        features: ['Tampilan konten & katalog produk', 'Autentikasi pengguna (login/register)', 'Push notification', 'Build iOS & Android (satu codebase)', 'Publikasi ke App Store & Play Store'],
      },
      {
        name: 'Profesional', badge: 'Paling Diminati',
        priceFrom: 'Rp 35 juta', priceTo: 'Rp 80 juta', timeline: '8–14 minggu',
        description: 'Aplikasi bisnis dengan transaksi, manajemen data, dan sinkronisasi real-time ke backend.',
        features: ['Integrasi payment gateway lokal', 'Real-time data sync & notifikasi', 'Manajemen profil & riwayat transaksi', 'Offline mode & local cache', 'Admin panel web terpisah'],
      },
      {
        name: 'Premium',
        priceFrom: 'Rp 80 juta', priceTo: 'Rp 220 juta', timeline: '14–28 minggu',
        description: 'Aplikasi enterprise atau fintech dengan fitur kompleks seperti PPOB, multi-role, dan integrasi sistem eksternal.',
        features: ['Integrasi PPOB / fintech / e-wallet', 'Sistem multi-role & permission', 'Keamanan end-to-end & enkripsi data', 'Skalabilitas tinggi & load balancing', 'SLA support & pemeliharaan berkala'],
      },
    ],
  },
  {
    id: 'desktop',
    label: 'Desktop App',
    color: '#06b6d4',
    note: 'Aplikasi Windows menggunakan .NET / WPF untuk kebutuhan internal perusahaan.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 20h8M12 18v2" /><path d="M9 9l2 2 4-4" />
      </svg>
    ),
    tiers: [
      {
        name: 'Esensial',
        priceFrom: 'Rp 20 juta', priceTo: 'Rp 45 juta', timeline: '4–8 minggu',
        description: 'Tool internal untuk operasional sehari-hari — penggantian spreadsheet manual menjadi sistem terstruktur.',
        features: ['Manajemen data CRUD lengkap', 'Export laporan (Excel / PDF)', 'Antarmuka modern & intuitif', 'Database lokal (SQLite)', 'Installer & lisensi perangkat'],
      },
      {
        name: 'Profesional', badge: 'Paling Diminati',
        priceFrom: 'Rp 50 juta', priceTo: 'Rp 130 juta', timeline: '10–18 minggu',
        description: 'Sistem manajemen multi-user dalam jaringan perusahaan dengan monitoring dan laporan terpusat.',
        features: ['Multi-user & akses jaringan LAN', 'Database terpusat (SQL Server)', 'Dashboard monitoring real-time', 'Sistem backup & restore otomatis', 'Log aktivitas & audit trail'],
      },
      {
        name: 'Premium',
        priceFrom: 'Rp 120 juta', priceTo: 'Rp 300 juta', timeline: '18–32 minggu',
        description: 'Solusi enterprise dengan integrasi sistem eksternal, monitoring hardware, dan dukungan multi-site.',
        features: ['Integrasi ERP / sistem legacy perusahaan', 'Hardware monitoring (CPU, RAM, disk)', 'Lisensi multi-lokasi / cabang', 'API untuk integrasi lintas platform', 'SLA support & pemeliharaan prioritas'],
      },
    ],
  },
]

function TierCard({ tier, color, index }: { tier: Tier; color: string; index: number }) {
  const isHighlighted = !!tier.badge
  return (
    <motion.div
      variants={fadeUp(0.08 * index)}
      className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
        isHighlighted
          ? 'border-amber-500/50 bg-gray-800 shadow-lg shadow-amber-500/10'
          : 'border-gray-800 bg-gray-900 hover:border-gray-700'
      }`}
    >
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-amber-500 text-gray-950 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
            ★ {tier.badge}
          </span>
        </div>
      )}
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">{tier.name}</p>
      <div className="mb-1">
        <span className="text-2xl font-bold text-white">{tier.priceFrom}</span>
        <span className="text-gray-500 text-sm"> – {tier.priceTo}</span>
      </div>
      <div className="flex items-center gap-1.5 mb-4">
        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color }}>
          <circle cx="8" cy="8" r="6" /><path d="M8 5v3l2 2" strokeLinecap="round" />
        </svg>
        <span className="text-xs text-gray-400">{tier.timeline}</span>
      </div>
      <p className="text-sm text-gray-400 mb-4 leading-relaxed flex-1">{tier.description}</p>
      <div className="h-px bg-gray-800 mb-4" />
      <ul className="space-y-2">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
            <svg viewBox="0 0 16 16" className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" style={{ color }}>
              <path d="M3 8l3 3 7-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function PricingRange() {
  const [active, setActive] = useState<string>('website')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const current = categories.find((c) => c.id === active)!

  return (
    <section ref={ref} className="bg-gray-950 py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'} className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Transparansi Harga
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Harga yang{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Kami Tawarkan
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Kisaran harga nyata dari layanan pengembangan Nuii — transparan, tanpa biaya tersembunyi.
            Harga final ditentukan bersama setelah konsultasi dan penyesuaian kebutuhan proyek Anda.
          </p>
        </motion.div>

        <motion.div variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'} className="flex justify-center mb-10">
          <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1 gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === cat.id ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                }`}
                style={active === cat.id ? { backgroundColor: cat.color + '22', color: cat.color } : {}}
              >
                <span style={{ color: active === cat.id ? cat.color : undefined }}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={active + '-note'}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-center text-xs text-gray-500 mb-8"
          >
            {current.note}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="hidden" animate="show" exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {current.tiers.map((tier, i) => (
              <TierCard key={tier.name} tier={tier} color={current.color} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          variants={fadeUp(0.3)} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 bg-gray-900 border border-gray-800 rounded-2xl px-6 py-5"
        >
          <div className="flex items-start gap-3 text-sm text-gray-400 max-w-xl">
            <svg viewBox="0 0 20 20" className="w-5 h-5 mt-0.5 shrink-0 text-amber-400" fill="currentColor">
              <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1V9a1 1 0 012 0v5a1 1 0 01-1 1z" clipRule="evenodd" />
            </svg>
            <span>
              Harga di atas adalah <strong className="text-gray-300">kisaran nyata dari Nuii</strong> dan dapat disesuaikan
              tergantung kompleksitas fitur, integrasi pihak ketiga, dan kebutuhan spesifik proyek Anda.
            </span>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Minta Estimasi Gratis
          </a>
        </motion.div>

      </div>
    </section>
  )
}