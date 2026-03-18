'use client'

const stats = [
  { value: '3+', label: 'Tahun Pengalaman', sub: 'Membangun solusi digital sejak 2022' },
  { value: '10+', label: 'Proyek Diselesaikan', sub: 'Mobile · Web · Desktop' },
  { value: '5', label: 'Platform Dikuasai', sub: 'iOS · Android · Web · Desktop · Backend' },
  { value: '100%', label: 'Komitmen', sub: 'Dari ide hingga produk nyata' },
]

const domains = [
  {
    title: 'Mobile Development',
    desc: 'Aplikasi native iOS & Android dengan Expo Go dan React Native — dari sistem pembayaran PPOB hingga manajemen keanggotaan digital.',
    color: '#3b82f6',
    tags: ['React Native', 'Expo Go', 'iOS', 'Android'],
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Web & CMS',
    desc: 'Website dan sistem manajemen konten modern yang responsif, cepat, dan mudah dikelola — siap digunakan oleh komunitas maupun organisasi.',
    color: '#10b981',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 20h8M12 18v2" />
      </svg>
    ),
  },
  {
    title: 'Backend & API',
    desc: 'Arsitektur backend yang skalabel dengan REST API yang aman, autentikasi terstruktur, dan integrasi database yang efisien.',
    color: '#8b5cf6',
    tags: ['Nest.js', 'Prisma', 'PostgreSQL', 'SQLite'],
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
        <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" />
      </svg>
    ),
  },
  {
    title: 'Desktop Application',
    desc: 'Aplikasi desktop enterprise untuk monitoring aset dan sistem internal perusahaan, dibangun dengan teknologi .NET dan WPF.',
    color: '#06b6d4',
    tags: ['.NET', 'WPF', 'C#', 'Windows'],
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <path d="M8 20h8M12 18v2" />
        <path d="M6 9h4M6 12h8" />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    desc: 'Antarmuka yang intuitif, modern, dan berpusat pada pengguna — merancang pengalaman digital yang menyenangkan di setiap layar.',
    color: '#f59e0b',
    tags: ['Figma', 'Design System', 'Prototyping'],
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
]

export default function OurExperience() {
  return (
    <section id="experience" className="bg-gray-950 py-16 sm:py-20 px-4 border-t border-gray-800/60">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-3 block">
            Tentang Kami
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Pengalaman Kami
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Tim kami telah membangun berbagai solusi digital untuk komunitas, masjid, dan perusahaan di Indonesia —
            dari ide awal hingga produk yang berjalan nyata di tangan pengguna.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-amber-400 opacity-60" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-amber-400/30 transition-colors duration-200"
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-amber-400 mb-2 leading-none">
                {stat.value}
              </div>
              <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Domain cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.slice(0, 3).map((domain) => (
            <DomainCard key={domain.title} domain={domain} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 lg:w-2/3 lg:mx-auto">
          {domains.slice(3).map((domain) => (
            <DomainCard key={domain.title} domain={domain} />
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-16 text-center px-4">
          <p className="text-gray-500 text-sm italic max-w-xl mx-auto leading-relaxed">
            &ldquo;Kami tidak hanya menulis kode — kami membangun solusi yang memberikan dampak nyata bagi pengguna.&rdquo;
          </p>
        </div>

      </div>
    </section>
  )
}

function DomainCard({ domain }: { domain: typeof domains[number] }) {
  return (
    <div
      className="bg-gray-900 rounded-2xl p-6 border transition-all duration-200 hover:scale-[1.02] group"
      style={{ borderColor: domain.color + '30' }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: domain.color + '18', color: domain.color }}
      >
        {domain.icon}
      </div>

      {/* Color accent bar */}
      <div className="w-8 h-0.5 rounded-full mb-4" style={{ background: domain.color }} />

      <h3 className="text-base font-bold text-white mb-2">{domain.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{domain.desc}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {domain.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ color: domain.color, background: domain.color + '15' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
