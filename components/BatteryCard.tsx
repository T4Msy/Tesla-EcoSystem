'use client'
import { motion } from 'framer-motion'
import { BatteryFull, Activity, Thermometer } from 'lucide-react'

interface BatteryCardProps {
  totalCapacity: number
  currentUsage: number
  healthPercent: number
  temperature: number
  cycles: number
}

export default function BatteryCard({ totalCapacity, currentUsage, healthPercent, temperature, cycles }: BatteryCardProps) {
  const usagePercent = Math.round((currentUsage / totalCapacity) * 100)
  const cells = 12

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-4">
        <BatteryFull size={14} className="text-green-400" />
        <span className="text-xs font-mono text-gray-500 tracking-wider">POWERWALL BATTERY</span>
      </div>

      {/* Cell visualization */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: cells }).map((_, i) => {
          const filled = i < Math.round((usagePercent / 100) * cells)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
              className="flex-1 h-8 rounded-sm border border-white/10 overflow-hidden"
            >
              {filled && (
                <div
                  className="w-full h-full"
                  style={{
                    background: usagePercent > 70 ? 'linear-gradient(180deg, #00D084, #059669)' :
                                usagePercent > 40 ? 'linear-gradient(180deg, #4A9EFF, #2563EB)' :
                                'linear-gradient(180deg, #FFB800, #D97706)'
                  }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Main stat */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-display font-bold text-white">{currentUsage}</span>
        <span className="text-sm text-gray-500">/ {totalCapacity} kWh</span>
        <span className="ml-auto text-lg font-display font-semibold text-green-400">{usagePercent}%</span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-black/30 rounded-xl p-3 border border-white/5">
          <Activity size={12} className="text-green-400 mb-1" />
          <div className="text-sm font-semibold text-white">{healthPercent}%</div>
          <div className="text-[10px] text-gray-600 font-mono">HEALTH</div>
        </div>
        <div className="bg-black/30 rounded-xl p-3 border border-white/5">
          <Thermometer size={12} className="text-blue-400 mb-1" />
          <div className="text-sm font-semibold text-white">{temperature}°C</div>
          <div className="text-[10px] text-gray-600 font-mono">TEMP</div>
        </div>
        <div className="bg-black/30 rounded-xl p-3 border border-white/5">
          <BatteryFull size={12} className="text-yellow-400 mb-1" />
          <div className="text-sm font-semibold text-white">{cycles}</div>
          <div className="text-[10px] text-gray-600 font-mono">CYCLES</div>
        </div>
      </div>
    </motion.div>
  )
}
