'use client'
import { motion } from 'framer-motion'
import { Award, Shield, Star, Gem } from 'lucide-react'

type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

const tierConfig: Record<Tier, {
  color: string
  gradient: string
  glow: string
  bg: string
  icon: typeof Star
  className: string
}> = {
  Bronze: {
    color: '#CD7F32',
    gradient: 'linear-gradient(135deg, #CD7F32, #A0522D)',
    glow: 'rgba(205, 127, 50, 0.4)',
    bg: 'rgba(205, 127, 50, 0.08)',
    icon: Award,
    className: 'badge-bronze',
  },
  Silver: {
    color: '#C0C0C0',
    gradient: 'linear-gradient(135deg, #C0C0C0, #A8A8A8)',
    glow: 'rgba(192, 192, 192, 0.4)',
    bg: 'rgba(192, 192, 192, 0.08)',
    icon: Shield,
    className: 'badge-silver',
  },
  Gold: {
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700, #FFA500)',
    glow: 'rgba(255, 215, 0, 0.5)',
    bg: 'rgba(255, 215, 0, 0.08)',
    icon: Star,
    className: 'badge-gold',
  },
  Platinum: {
    color: '#E5E4E2',
    gradient: 'linear-gradient(135deg, #E5E4E2, #B0B0B0)',
    glow: 'rgba(229, 228, 226, 0.6)',
    bg: 'rgba(229, 228, 226, 0.06)',
    icon: Gem,
    className: 'badge-platinum',
  },
}

interface CertificationBadgeProps {
  tier: Tier
  type: 'standard' | 'certified'
  score?: number
}

export default function CertificationBadge({ tier, type, score }: CertificationBadgeProps) {
  const tc = tierConfig[tier]
  const Icon = tc.icon

  if (type === 'certified') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`glass rounded-2xl p-6 relative overflow-hidden ${tc.className}`}
        style={{ border: `1px solid ${tc.color}20` }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 50%, ${tc.color}, transparent 70%)` }}
        />

        <div className="relative text-center">
          <div className="flex items-center gap-2 justify-center mb-4">
            <Shield size={14} className="text-gray-400" />
            <span className="text-xs font-mono text-gray-500 tracking-widest">OFFICIAL CERTIFICATION</span>
          </div>

          {/* Seal */}
          <div className="relative mx-auto w-24 h-24 mb-4">
            <div
              className="absolute inset-0 rounded-full spin-slow opacity-30"
              style={{ border: `2px dashed ${tc.color}` }}
            />
            <div
              className="absolute inset-2 rounded-full flex items-center justify-center"
              style={{ background: tc.bg, border: `2px solid ${tc.color}40`, boxShadow: `0 0 20px ${tc.glow}` }}
            >
              <Icon size={28} style={{ color: tc.color }} />
            </div>
          </div>

          <h3 className="text-lg font-display font-bold tracking-wider" style={{ color: tc.color }}>
            TESLA CERTIFIED
          </h3>
          <p className="text-sm text-white font-semibold mt-1">{tier} Status</p>
          <p className="text-xs text-gray-600 font-mono mt-2">VERIFIED · 2024 · VALID 12 MONTHS</p>

          {score && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono"
              style={{ color: tc.color, borderColor: tc.color + '30', background: tc.bg }}>
              SCORE: {score}/100
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  // Standard badges
  const tiers: Tier[] = ['Bronze', 'Silver', 'Gold', 'Platinum']
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="glass rounded-2xl p-6 col-span-full"
    >
      <div className="flex items-center gap-2 mb-5">
        <Award size={14} className="text-tesla-red" />
        <span className="text-xs font-mono text-gray-500 tracking-wider">TESLA STANDARD PROGRAM</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tiers.map((t, i) => {
          const c = tierConfig[t]
          const TierIcon = c.icon
          const isActive = t === tier

          return (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className={`relative rounded-xl p-4 text-center border transition-all ${c.className}`}
              style={{
                background: isActive ? c.bg : 'rgba(0,0,0,0.2)',
                borderColor: isActive ? c.color + '50' : 'rgba(255,255,255,0.05)',
                opacity: isActive ? 1 : 0.5,
              }}
            >
              {isActive && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-tesla-dark flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              )}
              <TierIcon size={20} className="mx-auto mb-2" style={{ color: c.color }} />
              <p className="text-xs font-display font-bold tracking-wider" style={{ color: c.color }}>{t}</p>
              <p className="text-[9px] text-gray-600 font-mono mt-1">
                {t === 'Bronze' ? '0–250 pts' : t === 'Silver' ? '251–500 pts' : t === 'Gold' ? '501–750 pts' : '751+ pts'}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
