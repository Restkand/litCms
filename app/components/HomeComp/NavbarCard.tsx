'use client'

import Link from 'next/link'

const CARDS = [
  {
    label: 'MASJID',
    href: '/masjid',
    emoji: '🕌',
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0c4a6e 100%)',
    accent: '#f59e0b',
    desc: 'Jadwal, kajian & pengumuman',
    svgContent: (
      <svg viewBox="0 0 200 130" className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {/* Dome */}
        <ellipse cx="100" cy="80" rx="55" ry="42" fill="#93c5fd" />
        {/* Main building */}
        <rect x="55" y="78" width="90" height="52" fill="#93c5fd" />
        {/* Left minaret */}
        <rect x="35" y="50" width="12" height="80" fill="#93c5fd" />
        <path d="M35,50 Q41,36 47,50Z" fill="#93c5fd" />
        {/* Right minaret */}
        <rect x="153" y="50" width="12" height="80" fill="#93c5fd" />
        <path d="M153,50 Q159,36 165,50Z" fill="#93c5fd" />
        {/* Ground */}
        <rect x="0" y="128" width="200" height="4" fill="#93c5fd" />
      </svg>
    ),
  },
  {
    label: 'UMKM',
    href: '/umkm',
    emoji: '🏪',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #431407 60%, #7c2d12 100%)',
    accent: '#f59e0b',
    desc: 'Produk & layanan bisnis',
    svgContent: (
      <svg viewBox="0 0 200 130" className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {/* Truck body */}
        <rect x="60" y="60" width="110" height="50" rx="4" fill="#fca5a5" />
        {/* Truck cab */}
        <rect x="30" y="74" width="35" height="36" rx="4" fill="#fca5a5" />
        {/* Window */}
        <rect x="34" y="78" width="18" height="14" rx="2" fill="#0f172a" />
        {/* Wheels */}
        <circle cx="55" cy="112" r="12" fill="#0f172a" />
        <circle cx="55" cy="112" r="6" fill="#fca5a5" />
        <circle cx="145" cy="112" r="12" fill="#0f172a" />
        <circle cx="145" cy="112" r="6" fill="#fca5a5" />
        {/* Road */}
        <rect x="0" y="122" width="200" height="8" fill="#fca5a5" />
      </svg>
    ),
  },
  {
    label: 'RT / RW',
    href: '#rtrw',
    emoji: '🏘️',
    bg: 'linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)',
    accent: '#f59e0b',
    desc: 'Info warga & pengumuman',
    svgContent: (
      <svg viewBox="0 0 200 130" className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {/* Houses */}
        <polygon points="30,80 60,50 90,80" fill="#86efac" />
        <rect x="35" y="80" width="50" height="48" fill="#86efac" />
        <polygon points="90,80 120,55 150,80" fill="#86efac" />
        <rect x="95" y="80" width="50" height="48" fill="#86efac" />
        <polygon points="145,75 175,48 200,75" fill="#86efac" />
        <rect x="150" y="75" width="50" height="53" fill="#86efac" />
        {/* Doors */}
        <rect x="52" y="100" width="16" height="28" fill="#052e16" />
        <rect x="112" y="100" width="16" height="28" fill="#052e16" />
        {/* Path */}
        <rect x="0" y="126" width="200" height="4" fill="#86efac" />
      </svg>
    ),
  },
  {
    label: 'ORGANISASI',
    href: '#organisasi',
    emoji: '🤝',
    bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #4338ca 100%)',
    accent: '#f59e0b',
    desc: 'Lembaga, yayasan & komunitas',
    svgContent: (
      <svg viewBox="0 0 200 130" className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {/* People silhouettes */}
        <circle cx="40" cy="50" r="14" fill="#a5b4fc" />
        <rect x="26" y="66" width="28" height="38" rx="6" fill="#a5b4fc" />
        <circle cx="100" cy="44" r="16" fill="#a5b4fc" />
        <rect x="84" y="62" width="32" height="42" rx="6" fill="#a5b4fc" />
        <circle cx="160" cy="50" r="14" fill="#a5b4fc" />
        <rect x="146" y="66" width="28" height="38" rx="6" fill="#a5b4fc" />
        {/* Ground */}
        <rect x="0" y="126" width="200" height="4" fill="#a5b4fc" />
      </svg>
    ),
  },
]

export default function NavbarCard() {
  return (
    <section className="w-full bg-gray-950 px-4 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {CARDS.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ background: card.bg, minHeight: '200px' }}
          >
            {/* Decorative SVG background */}
            {card.svgContent}

            {/* Overlay gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-5" style={{ minHeight: '200px' }}>
              {/* Label + desc bottom */}
              <div>
                <p
                  className="text-xs sm:text-sm text-white/60 mb-1 font-medium tracking-wide"
                >
                  {card.desc}
                </p>
                <h3
                  className="text-lg sm:text-xl font-extrabold tracking-widest uppercase transition-colors duration-200 group-hover:opacity-80"
                  style={{ color: card.accent, fontFamily: '"Arial Black", "Impact", sans-serif' }}
                >
                  {card.label}
                </h3>
              </div>
            </div>

            {/* Hover border glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 2px ${card.accent}55` }}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
