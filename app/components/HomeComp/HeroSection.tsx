'use client'

import { useState, useEffect } from 'react'

const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

export default function HeroSection() {
  const [clock, setClock] = useState('')
  const [dayStr, setDayStr] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [blink, setBlink] = useState(true)

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

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <div className="relative h-[500px] overflow-hidden">
        {/* Sunset sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg,#4a1d96 0%,#7c2d12 18%,#b45309 36%,#78350f 54%,#1c1917 74%,#0c0a09 100%)',
          }}
        />

        {/* Sun glow */}
        <div
          className="absolute w-52 h-52 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 opacity-40"
          style={{
            background: 'radial-gradient(circle,#fde68a 0%,#f97316 45%,transparent 70%)',
          }}
        />
        
        {/* Info card */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-black/55 backdrop-blur-md border border-white/15 rounded-2xl shadow-2xl px-8 sm:px-14 py-5 sm:py-7 mx-4 flex flex-col sm:flex-row items-center gap-5 sm:gap-12">
            {/* Clock */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-widest">
                {clock}
              </div>
              <div className="text-xs text-white/50 mt-1 tracking-widest uppercase">Waktu Lokal</div>
            </div>

            <div className="w-20 h-px sm:w-px sm:h-14 bg-white/25" />

            {/* Date + Location */}
            <div className="text-center sm:text-left">
              <div className="text-lg sm:text-xl font-bold text-white">
                {dayStr}, {dateStr}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1.5 text-white/60 text-sm">
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
