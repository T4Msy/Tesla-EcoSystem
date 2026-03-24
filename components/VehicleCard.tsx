'use client'
import { motion } from 'framer-motion'
import { Battery, Thermometer, Gauge, MapPin, Wifi } from 'lucide-react'

interface VehicleCardProps {
  batteryPercent: number
  range: number
  health: 'excellent' | 'good' | 'warning' | 'critical'
  temperature: number
  model: string
  connected: boolean
}

const healthConfig = {
  excellent: { color: '#00D084', label: 'EXCELLENT', glow: 'rgba(0, 208, 132, 0.3)' },
  good:      { color: '#4A9EFF', label: 'GOOD',      glow: 'rgba(74, 158, 255, 0.3)' },
  warning:   { color: '#FFB800', label: 'WARNING',   glow: 'rgba(255, 184, 0, 0.3)'  },
  critical:  { color: '#E82127', label: 'CRITICAL',  glow: 'rgba(232, 33, 39, 0.3)'  },
}

export default function VehicleCard({ batteryPercent, range, health, temperature, model, connected }: VehicleCardProps) {
  const hc = healthConfig[health]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 col-span-full lg:col-span-2 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-tesla-red blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-gray-600'} animate-pulse`} />
              <span className="text-xs font-mono text-gray-500 tracking-wider">{connected ? 'CONNECTED' : 'OFFLINE'}</span>
            </div>
            <h3 className="text-xl font-display font-bold text-white tracking-wider">{model}</h3>
            <p className="text-xs text-gray-500 mt-1 font-mono">VIN: 5YJ3E1EA8NF000001</p>
          </div>

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-semibold"
            style={{ color: hc.color, borderColor: hc.color + '40', boxShadow: `0 0 10px ${hc.glow}` }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: hc.color }} />
            {hc.label}
          </div>
        </div>

        {/* Car SVG Silhouette */}
        <div className="flex justify-center mb-6 float-animation">
          <svg viewBox="0 0 320 100" className="w-64 h-20 opacity-60" fill="none">
            <path
              d="M30 70 L30 55 Q35 45 60 38 Q90 30 130 28 Q160 25 175 28 Q210 32 240 38 Q265 44 275 55 L285 70 L290 72 L290 80 L25 80 L25 72 Z"
              fill="rgba(232,33,39,0.15)" stroke="rgba(232,33,39,0.5)" strokeWidth="1"
            />
            <path
              d="M70 38 Q100 22 140 18 Q170 15 190 18 Q220 22 240 38"
              fill="rgba(232,33,39,0.08)" stroke="rgba(232,33,39,0.3)" strokeWidth="1"
            />
            {/* Wheels */}
            <circle cx="80" cy="80" r="15" fill="#111" stroke="rgba(232,33,39,0.4)" strokeWidth="1.5" />
            <circle cx="80" cy="80" r="8" fill="none" stroke="rgba(232,33,39,0.3)" strokeWidth="1" />
            <circle cx="240" cy="80" r="15" fill="#111" stroke="rgba(232,33,39,0.4)" strokeWidth="1.5" />
            <circle cx="240" cy="80" r="8" fill="none" stroke="rgba(232,33,39,0.3)" strokeWidth="1" />
            {/* Lights */}
            <rect x="274" y="52" width="8" height="4" rx="2" fill="#E82127" opacity="0.8" />
            <rect x="30" y="52" width="8" height="4" rx="2" fill="#ffffaa" opacity="0.6" />
          </svg>
        </div>

        {/* Battery bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Battery size={14} className="text-tesla-red" />
              <span className="text-xs font-mono text-gray-400 tracking-wider">BATTERY LEVEL</span>
            </div>
            <span className="text-2xl font-display font-bold text-white">{batteryPercent}<span className="text-sm text-gray-500">%</span></span>
          </div>
          <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${batteryPercent}%` }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
              className="h-full rounded-full relative"
              style={{
                background: batteryPercent > 60 ? 'linear-gradient(90deg, #00D084, #4ADE80)' :
                            batteryPercent > 30 ? 'linear-gradient(90deg, #FFB800, #FCD34D)' :
                            'linear-gradient(90deg, #E82127, #FF4444)',
              }}
            >
              <div className="absolute inset-0 shimmer rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Gauge, label: 'RANGE', value: `${range} km`, color: '#4A9EFF' },
            { icon: Thermometer, label: 'TEMP', value: `${temperature}°C`, color: '#00D084' },
            { icon: Wifi, label: 'SIGNAL', value: '5G', color: '#FFB800' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-black/30 rounded-xl p-3 border border-white/5">
              <Icon size={14} className="mb-2" style={{ color }} />
              <div className="text-base font-semibold text-white">{value}</div>
              <div className="text-[10px] text-gray-600 font-mono tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
