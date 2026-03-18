'use client'

import { motion, type Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stats = [
  {
    label: 'Tahun Pengalaman',
    value: '3+',
    delta: 'Sejak 2022',
    description: 'Membangun solusi digital sejak 2022',
  },
  {
    label: 'Proyek Diselesaikan',
    value: '10+',
    delta: 'Mobile · Web · Desktop',
    description: 'Dari ide hingga produk yang berjalan nyata',
  },
  {
    label: 'Platform Dikuasai',
    value: '5',
    delta: 'Multi-platform',
    description: 'iOS · Android · Web · Desktop · Backend',
  },
  {
    label: 'Komitmen Tim',
    value: '100%',
    delta: 'Full-cycle',
    description: 'Dari konsep hingga produk di tangan pengguna',
  },
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
    <section
      id="experience"
      className="relative overflow-hidden bg-gray-950 py-24 lg:py-32 px-6 border-t border-gray-800/60"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[380px] w-[380px] rounded-full bg-amber-400/5 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-amber-500/[0.04] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl space-y-14">

        {/* ── Heading ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400 backdrop-blur">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Pengalaman Kami
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Rekam jejak yang membuktikan{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
              kualitas solusi digital
            </span>{' '}
            kami
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-400 md:text-lg">
            Tim kami telah membangun berbagai solusi digital untuk komunitas, masjid, dan perusahaan di
            Indonesia — dari ide awal hingga produk yang berjalan nyata di tangan pengguna.
          </p>
        </motion.div>

        {/* ── Stats grid (glassmorphism cards) ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid gap-4 md:grid-cols-2"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1">
                {/* Inner gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />

                <div className="relative z-10 space-y-5">
                  {/* Top row: label + arrow icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                      {stat.label}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-gray-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>

                  {/* Value + delta badge */}
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-extrabold leading-none tracking-tight text-amber-400">
                      {stat.value}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 backdrop-blur">
                      {stat.delta}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-gray-500">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Domain expertise ── */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-8 text-center"
          >
            <h3 className="text-2xl font-extrabold text-white">Domain Keahlian</h3>
            <p className="mt-2 text-sm text-gray-500">Teknologi yang kami kuasai di setiap lini</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.07 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {domains.slice(0, 3).map((domain) => (
              <motion.div key={domain.title} variants={fadeUp}>
                <DomainCard domain={domain} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.07, delayChildren: 0.1 }}
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:mx-auto lg:w-2/3"
          >
            {domains.slice(3).map((domain) => (
              <motion.div key={domain.title} variants={fadeUp}>
                <DomainCard domain={domain} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DomainCard({ domain }: { domain: typeof domains[number] }) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: domain.color + '28',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {/* Colored top-left gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${domain.color}0a 0%, transparent 55%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: domain.color + '18', color: domain.color }}
        >
          {domain.icon}
        </div>

        {/* Accent line */}
        <div className="mb-4 h-0.5 w-8 rounded-full" style={{ background: domain.color }} />

        <h3 className="mb-2 text-base font-bold text-white">{domain.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-400">{domain.desc}</p>

        <div className="flex flex-wrap gap-2">
          {domain.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-1 text-xs font-medium"
              style={{ color: domain.color, background: domain.color + '15' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
