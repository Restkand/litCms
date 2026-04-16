'use client'

import Link from 'next/link'
import { Timeline } from '@/app/components/ui/timeline'

function MobileMockup({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="mCardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Phone shell */}
      <rect x="2" y="0" width="156" height="300" rx="22" fill="#1e293b" />
      {/* Screen */}
      <rect x="8" y="6" width="144" height="288" rx="16" fill="#f8fafc" />
      {/* Camera pill */}
      <rect x="58" y="10" width="44" height="7" rx="3.5" fill="#1e293b" />

      {/* Balance card */}
      <rect x="14" y="28" width="132" height="68" rx="12" fill="url(#mCardGrad)" />
      <rect x="22" y="38" width="44" height="5" rx="2" fill="white" fillOpacity="0.55" />
      <rect x="22" y="49" width="72" height="14" rx="5" fill="white" fillOpacity="0.9" />
      <rect x="22" y="70" width="32" height="5" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="110" y="68" width="28" height="16" rx="8" fill="white" fillOpacity="0.18" />

      {/* 3 action buttons */}
      {[
        { x: 20, label: 'Send' },
        { x: 64, label: 'QR' },
        { x: 108, label: 'More' },
      ].map((btn) => (
        <g key={btn.label}>
          <circle cx={btn.x + 16} cy={122} r={16} fill="white" />
          <circle cx={btn.x + 16} cy={122} r={10} fill={color + '20'} />
          <rect x={btn.x + 8} y={142} width={16} height={4} rx={2} fill="#94a3b8" opacity={0.5} />
        </g>
      ))}
      {/* Send arrow */}
      <path d="M30 118 L36 124 M36 118 L36 128" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* QR dots */}
      <rect x="76" y="117" width="5" height="5" rx="1.2" fill="none" stroke={color} strokeWidth="1.2" />
      <rect x="83" y="117" width="5" height="5" rx="1.2" fill="none" stroke={color} strokeWidth="1.2" />
      <rect x="76" y="124" width="5" height="5" rx="1.2" fill="none" stroke={color} strokeWidth="1.2" />
      <rect x="84" y="124" width="3" height="3" rx="0.8" fill={color} opacity="0.7" />
      {/* More dots */}
      <circle cx="118" cy="122" r="2" fill={color} opacity="0.7" />
      <circle cx="124" cy="122" r="2" fill={color} opacity="0.7" />
      <circle cx="130" cy="122" r="2" fill={color} opacity="0.7" />

      {/* Transaction rows */}
      <rect x="14" y="158" width="60" height="6" rx="3" fill="#1e293b" opacity="0.55" />

      <rect x="14" y="172" width="132" height="30" rx="8" fill="white" />
      <circle cx="27" cy="187" r="9" fill={color + '22'} />
      <rect x="21" y="182" width="12" height="10" rx="2" fill={color} opacity="0.4" />
      <rect x="44" y="181" width="46" height="6" rx="3" fill="#1e293b" opacity="0.55" />
      <rect x="44" y="191" width="28" height="4" rx="2" fill="#94a3b8" opacity="0.4" />
      <rect x="120" y="183" width="22" height="6" rx="3" fill="#22c55e" opacity="0.75" />

      <rect x="14" y="207" width="132" height="30" rx="8" fill="white" />
      <circle cx="27" cy="222" r="9" fill="#f59e0b22" />
      <rect x="21" y="217" width="12" height="10" rx="2" fill="#f59e0b" opacity="0.4" />
      <rect x="44" y="216" width="36" height="6" rx="3" fill="#1e293b" opacity="0.55" />
      <rect x="44" y="226" width="28" height="4" rx="2" fill="#94a3b8" opacity="0.4" />
      <rect x="120" y="218" width="22" height="6" rx="3" fill="#ef4444" opacity="0.65" />

      <rect x="14" y="242" width="132" height="30" rx="8" fill="white" />
      <circle cx="27" cy="257" r="9" fill="#8b5cf622" />
      <rect x="21" y="252" width="12" height="10" rx="2" fill="#8b5cf6" opacity="0.4" />
      <rect x="44" y="251" width="52" height="6" rx="3" fill="#1e293b" opacity="0.55" />
      <rect x="44" y="261" width="28" height="4" rx="2" fill="#94a3b8" opacity="0.4" />
      <rect x="120" y="253" width="22" height="6" rx="3" fill="#22c55e" opacity="0.75" />

      {/* Bottom nav bar */}
      <rect x="8" y="278" width="144" height="16" rx="8" fill="#f1f5f9" />
      <rect x="30" y="281" width="20" height="10" rx="5" fill={color} opacity="0.85" />
      <circle cx="80" cy="286" r="5" fill="#cbd5e1" />
      <circle cx="108" cy="286" r="5" fill="#cbd5e1" />
      <circle cx="132" cy="286" r="5" fill="#cbd5e1" />
    </svg>
  )
}

function DesktopAppMockup({ color }: { color: string }) {
  const assets = [
    { name: 'LAPTOP-001', type: 'Laptop', cpu: 78, ram: 62, status: 'healthy' },
    { name: 'DESK-042', type: 'Desktop', cpu: 45, ram: 88, status: 'warning' },
    { name: 'LAPTOP-017', type: 'Laptop', cpu: 22, ram: 40, status: 'healthy' },
    { name: 'DESK-008', type: 'Desktop', cpu: 95, ram: 91, status: 'critical' },
  ]
  const statusColor: Record<string, string> = {
    healthy: '#22c55e',
    warning: '#f59e0b',
    critical: '#ef4444',
  }
  return (
    <svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="dtTitleBar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      {/* Window frame */}
      <rect x="0" y="0" width="440" height="300" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Title bar */}
      <rect x="0" y="0" width="440" height="32" rx="10" fill="url(#dtTitleBar)" />
      <rect x="0" y="22" width="440" height="10" fill="url(#dtTitleBar)" />
      {/* App icon + title */}
      <rect x="10" y="8" width="16" height="16" rx="4" fill="white" fillOpacity="0.2" />
      <rect x="13" y="11" width="10" height="10" rx="2" fill="white" fillOpacity="0.5" />
      <rect x="32" y="11" width="90" height="10" rx="3" fill="white" fillOpacity="0.7" />
      {/* Window controls */}
      <circle cx="404" cy="16" r="6" fill="#ef4444" opacity="0.85" />
      <circle cx="420" cy="16" r="6" fill="#f59e0b" opacity="0.85" />
      <circle cx="432" cy="16" r="4" fill="white" fillOpacity="0.3" />
      {/* Minimize line on red */}
      <rect x="401" y="15" width="6" height="2" rx="1" fill="white" opacity="0.8" />

      {/* Menu bar */}
      <rect x="0" y="32" width="440" height="22" fill="#e8edf3" />
      <rect x="10" y="39" width="28" height="7" rx="2" fill="#475569" opacity="0.6" />
      <rect x="46" y="39" width="28" height="7" rx="2" fill="#475569" opacity="0.6" />
      <rect x="82" y="39" width="32" height="7" rx="2" fill="#475569" opacity="0.6" />
      <rect x="122" y="39" width="28" height="7" rx="2" fill="#475569" opacity="0.6" />
      <rect x="340" y="37" width="90" height="11" rx="5" fill="white" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="346" y="40" width="55" height="5" rx="2" fill="#94a3b8" />
      <circle cx="424" cy="42" r="4" fill="#cbd5e1" />

      {/* ── LEFT SIDEBAR ── */}
      <rect x="0" y="54" width="110" height="246" fill="#1e293b" />
      <rect x="0" y="54" width="110" height="246" rx="0" />
      {/* Sidebar section label */}
      <rect x="10" y="64" width="56" height="6" rx="2" fill="#64748b" />
      <rect x="10" y="78" width="90" height="26" rx="5" fill={color + '33'} />
      <rect x="18" y="86" width="14" height="10" rx="2" fill={color} opacity="0.6" />
      <rect x="36" y="88" width="40" height="6" rx="2" fill="white" opacity="0.75" />
      {/* Other nav items */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="10" y={112 + i * 30} width="90" height="22" rx="5" fill="#334155" />
          <rect x="18" y={118 + i * 30} width="10" height="10" rx="2" fill="#64748b" />
          <rect x="34" y={121 + i * 30} width="36" height="5" rx="2" fill="#64748b" />
        </g>
      ))}
      {/* Sidebar bottom user info */}
      <rect x="0" y="272" width="110" height="28" fill="#0f172a" />
      <circle cx="18" cy="286" r="7" fill={color + '44'} />
      <rect x="28" y="282" width="50" height="6" rx="2" fill="#64748b" />
      <rect x="28" y="291" width="36" height="4" rx="2" fill="#475569" />

      {/* ── MAIN CONTENT ── */}
      {/* Asset table header */}
      <rect x="110" y="54" width="330" height="26" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
      <rect x="118" y="63" width="55" height="7" rx="2" fill="#475569" />
      <rect x="196" y="63" width="40" height="7" rx="2" fill="#475569" />
      <rect x="256" y="63" width="30" height="7" rx="2" fill="#475569" />
      <rect x="306" y="63" width="30" height="7" rx="2" fill="#475569" />
      <rect x="356" y="61" width="50" height="11" rx="5" fill={color} opacity="0.15" />
      <rect x="362" y="64" width="38" height="5" rx="2" fill={color} opacity="0.8" />

      {/* Asset rows */}
      {assets.map((asset, i) => (
        <g key={asset.name}>
          <rect x="110" y={80 + i * 38} width="330" height="38"
            fill={i === 0 ? color + '0e' : 'white'}
            stroke="#e2e8f0" strokeWidth="0.5" />
          {/* Asset name */}
          <rect x="118" y={90 + i * 38} width="14" height="14" rx="3"
            fill={asset.type === 'Laptop' ? color + '33' : '#64748b33'} />
          <rect x="124" y={94 + i * 38} width="2" height="6" rx="1"
            fill={asset.type === 'Laptop' ? color : '#64748b'} opacity="0.7" />
          <rect x="136" y={91 + i * 38} width="48" height="6" rx="2" fill="#1e293b" opacity="0.7" />
          <rect x="136" y={100 + i * 38} width="32" height="5" rx="2" fill="#94a3b8" />
          {/* Type */}
          <rect x="196" y={92 + i * 38} width="42" height="14" rx="5"
            fill={asset.type === 'Laptop' ? '#dbeafe' : '#f1f5f9'} />
          <rect x="202" y={96 + i * 38} width="30" height="6" rx="2"
            fill={asset.type === 'Laptop' ? '#2563eb' : '#475569'} opacity="0.7" />
          {/* CPU bar */}
          <rect x="256" y={92 + i * 38} width="38" height="6" rx="3" fill="#e2e8f0" />
          <rect x="256" y={92 + i * 38} width={Math.round(38 * asset.cpu / 100)} height="6" rx="3"
            fill={asset.cpu > 85 ? '#ef4444' : asset.cpu > 60 ? '#f59e0b' : color} opacity="0.8" />
          <rect x="256" y={101 + i * 38} width="20" height="4" rx="2" fill="#cbd5e1" />
          {/* RAM bar */}
          <rect x="306" y={92 + i * 38} width="38" height="6" rx="3" fill="#e2e8f0" />
          <rect x="306" y={92 + i * 38} width={Math.round(38 * asset.ram / 100)} height="6" rx="3"
            fill={asset.ram > 85 ? '#ef4444' : asset.ram > 70 ? '#f59e0b' : '#10b981'} opacity="0.8" />
          <rect x="306" y={101 + i * 38} width="20" height="4" rx="2" fill="#cbd5e1" />
          {/* Status badge */}
          <rect x="360" y={91 + i * 38} width="52" height="16" rx="8"
            fill={statusColor[asset.status] + '22'} />
          <circle cx="369" cy={99 + i * 38} r="3" fill={statusColor[asset.status]} />
          <rect x="375" y={96 + i * 38} width="32" height="6" rx="2"
            fill={statusColor[asset.status]} opacity="0.75" />
        </g>
      ))}

      {/* ── BOTTOM: Detail panel ── */}
      <rect x="110" y="234" width="330" height="66" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
      <rect x="118" y="242" width="72" height="7" rx="3" fill="#475569" />
      {/* Spec pills */}
      {[
        { label: 'Intel i7-12th', w: 60 },
        { label: '16 GB DDR5', w: 54 },
        { label: '512 GB NVMe', w: 58 },
        { label: 'Win 11 Pro', w: 52 },
      ].map((s, i) => (
        <g key={s.label}>
          <rect x={118 + i * 76} y={254} width={s.w} height={16} rx={8} fill={color + '18'} stroke={color + '44'} strokeWidth="1" />
          <rect x={124 + i * 76} y={259} width={s.w - 12} height={6} rx={3} fill={color} opacity={0.65} />
        </g>
      ))}
      {/* Health score bar */}
      <rect x="118" y="276" width="60" height="6" rx="3" fill="#e2e8f0" />
      <rect x="118" y="276" width="50" height="6" rx="3" fill="#22c55e" opacity="0.8" />
      <rect x="118" y="285" width="40" height="4" rx="2" fill="#94a3b8" />
      <rect x="240" y="276" width="60" height="6" rx="3" fill="#e2e8f0" />
      <rect x="240" y="276" width="52" height="6" rx="3" fill={color} opacity="0.75" />
      <rect x="240" y="285" width="40" height="4" rx="2" fill="#94a3b8" />
      <rect x="360" y="276" width="60" height="6" rx="3" fill="#e2e8f0" />
      <rect x="360" y="276" width="34" height="6" rx="3" fill="#f59e0b" opacity="0.8" />
      <rect x="360" y="285" width="40" height="4" rx="2" fill="#94a3b8" />

      {/* Monitor stand */}
      <rect x="190" y="298" width="60" height="2" rx="1" fill="#94a3b8" />
      <rect x="210" y="294" width="20" height="6" rx="2" fill="#cbd5e1" />
    </svg>
  )
}

function BrowserMockup({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 380 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="0" y="0" width="380" height="250" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <rect x="0" y="0" width="380" height="40" rx="12" fill="#0f172a" />
      <rect x="0" y="30" width="380" height="10" fill="#0f172a" />
      <circle cx="22" cy="20" r="6" fill="#ef4444" opacity="0.85" />
      <circle cx="42" cy="20" r="6" fill="#f59e0b" opacity="0.85" />
      <circle cx="62" cy="20" r="6" fill="#22c55e" opacity="0.85" />
      <rect x="82" y="11" width="220" height="18" rx="9" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <circle cx="96" cy="20" r="4" fill="#334155" />
      <rect x="104" y="17" width="90" height="6" rx="3" fill="#475569" />
      <rect x="314" y="13" width="56" height="14" rx="7" fill={color + '33'} />
      <rect x="322" y="17" width="40" height="6" rx="3" fill={color} opacity="0.7" />
      <rect x="0" y="40" width="380" height="36" fill={color + '18'} />
      <rect x="14" y="52" width="60" height="12" rx="4" fill={color} opacity="0.75" />
      <rect x="220" y="54" width="34" height="8" rx="4" fill="#334155" />
      <rect x="262" y="54" width="34" height="8" rx="4" fill="#334155" />
      <rect x="304" y="52" width="62" height="12" rx="6" fill={color} opacity="0.85" />
      <rect x="0" y="76" width="380" height="80" fill={color + '0d'} />
      <rect x="14" y="92" width="140" height="16" rx="5" fill={color} opacity="0.65" />
      <rect x="14" y="114" width="220" height="8" rx="4" fill="#334155" />
      <rect x="14" y="126" width="180" height="8" rx="4" fill="#334155" />
      <rect x="14" y="166" width="106" height="70" rx="8" fill="#0f172a" stroke={color + '33'} strokeWidth="1" />
      <rect x="136" y="166" width="106" height="70" rx="8" fill="#0f172a" stroke={color + '33'} strokeWidth="1" />
      <rect x="258" y="166" width="108" height="70" rx="8" fill="#0f172a" stroke={color + '33'} strokeWidth="1" />
      <rect x="0" y="166" width="380" height="4" fill={color} opacity="0.15" />
      <rect x="22" y="176" width="55" height="8" rx="3" fill="#475569" />
      <rect x="22" y="188" width="80" height="6" rx="3" fill="#334155" />
      <rect x="22" y="198" width="65" height="6" rx="3" fill="#334155" />
      <rect x="22" y="210" width="40" height="10" rx="4" fill={color} opacity="0.55" />
      <rect x="144" y="176" width="55" height="8" rx="3" fill="#475569" />
      <rect x="144" y="188" width="80" height="6" rx="3" fill="#334155" />
      <rect x="144" y="198" width="65" height="6" rx="3" fill="#334155" />
      <rect x="144" y="210" width="40" height="10" rx="4" fill={color} opacity="0.55" />
      <rect x="266" y="176" width="55" height="8" rx="3" fill="#475569" />
      <rect x="266" y="188" width="80" height="6" rx="3" fill="#334155" />
      <rect x="266" y="198" width="65" height="6" rx="3" fill="#334155" />
      <rect x="266" y="210" width="40" height="10" rx="4" fill={color} opacity="0.55" />
    </svg>
  )
}

function DashboardMockup({ color }: { color: string }) {
  const tableRows = [0, 1, 2, 3]
  return (
    <svg viewBox="0 0 380 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="0" y="0" width="380" height="250" rx="12" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="0" y="0" width="76" height="250" rx="12" fill="#1e293b" />
      <rect x="0" y="80" width="76" height="170" fill="#1e293b" />
      <rect x="10" y="14" width="56" height="30" rx="6" fill={color + '33'} />
      <rect x="18" y="22" width="40" height="8" rx="3" fill={color} opacity="0.9" />
      <rect x="18" y="32" width="24" height="5" rx="2" fill={color} opacity="0.5" />
      <rect x="10" y="58" width="56" height="20" rx="5" fill={color + '44'} />
      <rect x="18" y="64" width="30" height="8" rx="3" fill={color} />
      <rect x="10" y="82" width="56" height="20" rx="5" />
      <rect x="18" y="88" width="30" height="8" rx="3" fill="#475569" />
      <rect x="10" y="106" width="56" height="20" rx="5" />
      <rect x="18" y="112" width="30" height="8" rx="3" fill="#475569" />
      <rect x="10" y="130" width="56" height="20" rx="5" />
      <rect x="18" y="136" width="30" height="8" rx="3" fill="#475569" />
      <rect x="76" y="0" width="304" height="40" fill="white" stroke="#e2e8f0" strokeWidth="0.5" />
      <rect x="88" y="14" width="90" height="12" rx="4" fill="#e2e8f0" />
      <rect x="318" y="10" width="50" height="20" rx="10" fill={color + '22'} />
      <circle cx="348" cy="20" r="8" fill={color + '44'} />
      <rect x="340" y="18" width="16" height="4" rx="2" fill={color} opacity="0.8" />
      <rect x="86" y="50" width="82" height="56" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="178" y="50" width="82" height="56" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="270" y="50" width="100" height="56" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="94" y="58" width="20" height="20" rx="5" fill={color + '22'} />
      <rect x="100" y="64" width="8" height="8" rx="2" fill={color} opacity="0.7" />
      <rect x="94" y="84" width="40" height="8" rx="3" fill="#94a3b8" />
      <rect x="130" y="58" width="30" height="14" rx="4" fill="#1e293b" opacity="0.75" />
      <rect x="186" y="58" width="20" height="20" rx="5" fill="#10b98122" />
      <rect x="192" y="64" width="8" height="8" rx="2" fill="#10b981" opacity="0.7" />
      <rect x="186" y="84" width="40" height="8" rx="3" fill="#94a3b8" />
      <rect x="222" y="58" width="30" height="14" rx="4" fill="#1e293b" opacity="0.75" />
      <rect x="278" y="58" width="20" height="20" rx="5" fill="#f59e0b22" />
      <rect x="284" y="64" width="8" height="8" rx="2" fill="#f59e0b" opacity="0.7" />
      <rect x="278" y="84" width="40" height="8" rx="3" fill="#94a3b8" />
      <rect x="314" y="58" width="46" height="14" rx="4" fill="#1e293b" opacity="0.75" />
      <rect x="86" y="116" width="284" height="122" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="86" y="116" width="284" height="26" rx="8" fill="#f8fafc" />
      <rect x="86" y="130" width="284" height="12" fill="#f8fafc" />
      <rect x="96" y="124" width="60" height="8" rx="3" fill="#475569" />
      <rect x="230" y="124" width="50" height="8" rx="3" fill="#475569" />
      <rect x="330" y="122" width="32" height="12" rx="5" fill={color + '22'} />
      <rect x="334" y="125" width="24" height="6" rx="3" fill={color} opacity="0.7" />
      <rect x="86" y="142" width="284" height="1" fill="#e2e8f0" />
      {tableRows.map((i) => (
        <g key={i}>
          <rect x="96" y={150 + i * 20} width="75" height="7" rx="3" fill="#94a3b8" />
          <rect x="210" y={150 + i * 20} width="55" height="7" rx="3" fill="#94a3b8" />
          <rect x="326" y={148 + i * 20} width="36" height="11" rx="4"
            fill={i % 2 === 0 ? '#dcfce7' : '#fef9c3'} />
          <rect x="330" y={151 + i * 20} width="28" height="5" rx="2"
            fill={i % 2 === 0 ? '#16a34a' : '#a16207'} opacity="0.8" />
          {i < 3 && <rect x="86" y={162 + i * 20} width="284" height="0.5" fill="#f1f5f9" />}
        </g>
      ))}
    </svg>
  )
}

const products = [
  {
    tag: 'Mobile App · PPOB',
    title: 'FIFA Pay',
    description:
      'Aplikasi mobile pembayaran tagihan (PPOB) yang memudahkan pengguna membayar listrik, air, internet, dan pulsa dalam satu genggaman. Dibangun dengan Expo Go untuk pengalaman native yang mulus di iOS dan Android.',
    features: [
      'Bayar tagihan listrik, air & internet dalam 1 tap',
      'Riwayat transaksi lengkap & real-time',
      'Top-up saldo e-wallet & transfer cepat',
      'Antarmuka native yang mulus di iOS & Android',
    ],
    tech: ['Expo Go', 'React Native', 'PPOB Integration'],
    cta: null as string | null,
    ctaLabel: null as string | null,
    color: '#3b82f6',
    mockup: 'mobile',
  },
  {
    tag: 'Web · Content Management System',
    title: 'Alfurqon CMS',
    description:
      'Sistem manajemen konten berbasis web untuk Masjid Alfurqon Bekasi. Mengelola artikel, pengumuman, jadwal kajian, dan informasi masjid secara real-time. Kini online dan dapat diakses oleh publik.',
    features: [
      'Kelola artikel, pengumuman & jadwal kajian',
      'Dashboard admin yang intuitif & mudah digunakan',
      'SEO-friendly dengan performa fast load',
      'Notifikasi & informasi masjid real-time',
    ],
    tech: ['Next.js', 'Nest.js', 'PostgreSQL'],
    cta: 'https://alfurqonbekasi.id/',
    ctaLabel: 'Kunjungi Website',
    color: '#10b981',
    mockup: 'browser',
  },
  {
    tag: 'Mobile App · Membership',
    title: 'Kharites',
    description:
      'Aplikasi mobile untuk manajemen keanggotaan digital. Memudahkan organisasi dan komunitas dalam mengelola data anggota, kartu member digital, dan berbagai benefit keanggotaan dalam satu platform yang terintegrasi.',
    features: [
      'Kartu member digital berbasis QR Code',
      'Data anggota terpusat & mudah dikelola',
      'Notifikasi benefit & informasi keanggotaan',
      'Multi-organisasi dalam satu platform',
    ],
    tech: ['Expo Go', 'React Native', 'Membership System'],
    cta: null as string | null,
    ctaLabel: null as string | null,
    color: '#f59e0b',
    mockup: 'mobile',
  },
  {
    tag: 'Web · Dashboard CMS',
    title: 'CMS Dashboard',
    description:
      'Dashboard Content Management System yang powerful dan intuitif untuk mengelola artikel, pengguna, dan konten digital. Antarmuka yang bersih, responsif, dan siap pakai. Tersedia demo langsung yang dapat Anda coba sekarang.',
    features: [
      'Manajemen artikel multi-author dengan mudah',
      'Autentikasi aman menggunakan NextAuth',
      'API RESTful yang siap untuk integrasi',
      'Preview konten live sebelum dipublikasi',
    ],
    tech: ['Next.js', 'NextAuth', 'Prisma', 'SQLite'],
    cta: null as string | null,
    ctaLabel: null as string | null,
    color: '#8b5cf6',
    mockup: 'dashboard',
  },
  {
    tag: 'Desktop App · Asset Management',
    title: 'Asset Control',
    description:
      'Aplikasi desktop untuk pengecekan dan pemantauan aset perangkat perusahaan. Memantau status penggunaan CPU & RAM, serta melakukan health check-up untuk laptop dan komputer di seluruh perusahaan.',
    features: [
      'Monitor CPU & RAM seluruh perangkat real-time',
      'Health check-up otomatis berkala',
      'Inventaris aset perusahaan terpusat',
      'Alert dini sebelum perangkat bermasalah',
    ],
    tech: ['.NET', 'WPF', 'Windows', 'Hardware Monitoring'],
    cta: null as string | null,
    ctaLabel: null as string | null,
    color: '#06b6d4',
    mockup: 'desktop',
  },
]

export default function OurProducts() {
  const timelineData = products.map((product) => ({
    title: product.title,
    subtitle: product.tag,
    description: product.description,
    cta: product.cta && product.ctaLabel ? (
      <Link
        href={product.cta}
        target={product.cta.startsWith('http') ? '_blank' : undefined}
        rel={product.cta.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-110"
        style={{ background: product.color }}
      >
        {product.ctaLabel}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    ) : undefined,
    content: (
      <div className="flex flex-col items-center gap-6 pb-10">
        {/* Large Mockup */}
        <div className="relative w-full flex justify-center">
          <div
            className="relative w-full"
            style={{
              maxWidth:
                product.mockup === 'mobile'
                  ? '220px'
                  : product.mockup === 'desktop'
                  ? '580px'
                  : '500px',
              margin: '0 auto',
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-25 pointer-events-none"
              style={{ background: product.color }}
            />
            <div className="relative drop-shadow-2xl">
              {product.mockup === 'mobile' && <MobileMockup color={product.color} />}
              {product.mockup === 'browser' && <BrowserMockup color={product.color} />}
              {product.mockup === 'dashboard' && <DashboardMockup color={product.color} />}
              {product.mockup === 'desktop' && <DesktopAppMockup color={product.color} />}
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          {product.features.map((f) => (
            <div
              key={f}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-900 border border-gray-800"
            >
              <span
                className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                style={{ background: product.color }}
              />
              <span className="text-gray-300 text-sm leading-snug">{f}</span>
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div className="w-full flex flex-wrap gap-2">
          {product.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-300 border border-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  }))

  return (
    <section id="products" className="bg-gray-950 py-16 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-3 block">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Our Products
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
            Solusi digital yang kami bangun untuk komunitas dan bisnis Indonesia
          </p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-amber-400 opacity-60" />
        </div>

        {/* Timeline */}
        <Timeline data={timelineData} />
      </div>
    </section>
  )
}