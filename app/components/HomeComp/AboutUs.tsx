'use client'

import Image from 'next/image'

const values = [
  {
    title: 'Integritas',
    desc: 'Kami menjunjung transparansi dalam setiap proses — dari estimasi biaya hingga penyelesaian proyek, tanpa agenda tersembunyi.',

    color: '#f59e0b',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Inovasi',
    desc: 'Kami aktif mengadopsi teknologi terkini untuk menghadirkan solusi yang relevan, efisien, dan siap menghadapi tantangan bisnis masa depan.',

    color: '#3b82f6',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Kepercayaan',
    desc: 'Hubungan kami dengan klien dibangun di atas hasil kerja nyata — bukan sekadar janji. Kepuasan Anda adalah ukuran keberhasilan kami.',

    color: '#10b981',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9" />
        <path d="M12 3s-4 2-4 9" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    title: 'Dampak Nyata',
    desc: 'Setiap solusi kami dirancang untuk memberikan nilai bisnis yang terukur — meningkatkan efisiensi, memperluas jangkauan, dan mendorong pertumbuhan.',

    color: '#8b5cf6',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default function AboutUs() {
  return (
    <section id="about" className="bg-gray-950 py-16 sm:py-24 px-4 border-t border-gray-800/60">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-3 block">
            Tentang Kami
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Siapa Kami
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mt-4">
            Kami adalah tim profesional yang berdedikasi membangun solusi teknologi berkualitas — berakar pada kepercayaan, tumbuh bersama klien.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-amber-400 opacity-60" />
        </div>

        {/* Main content: logo left, text right */}
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 mb-20">

          {/* Logo (dark-mode adapted with glow) */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative">
              {/* Amber glow behind the logo */}
              <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20 bg-amber-400 scale-110 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-gray-700/60 bg-gray-900/80 p-2 shadow-2xl">
                {/* Invert filter makes the black-on-cream logo become white-on-dark */}
                <Image
                  src="/nuiiLogo.png"
                  alt="Nuii Logo"
                  width={320}
                  height={320}
                  className="w-56 h-56 sm:w-72 sm:h-72 object-contain"
                  style={{ filter: 'invert(1) sepia(1) saturate(0) brightness(1.15)' }}
                  priority
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/5 space-y-6">
            <blockquote className="border-l-4 border-amber-400 pl-5">
              <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed italic">
                &ldquo;Seperti Amaterasu yang menerangi dunia — kami hadir untuk membawa kejelasan, arah, dan kemajuan nyata bagi setiap klien yang kami dampingi.&rdquo;
              </p>
            </blockquote>

            <p className="text-gray-400 text-base leading-relaxed">
              <span className="text-white font-semibold">Nuii</span> adalah firma konsultansi IT yang berfokus pada pengembangan solusi digital berkualitas tinggi — mulai dari aplikasi mobile, platform web, sistem backend, hingga aplikasi desktop enterprise.
            </p>

            <p className="text-gray-400 text-base leading-relaxed">
              Kami tidak sekadar menulis kode. Kami memahami kebutuhan bisnis Anda secara mendalam, merancang solusi yang tepat sasaran, dan memastikan setiap produk yang kami bangun memberikan dampak yang terukur dan berkelanjutan.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-gray-800" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Nilai Kami</span>
              <div className="h-px flex-1 bg-gray-800" />
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {values.map((v) => (
                <div key={v.title} className="flex items-start gap-3 bg-gray-900 rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-colors">
                  <div
                    className="mt-0.5 w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{ background: v.color + '1a', color: v.color }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{v.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
