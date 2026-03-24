'use client'
import { motion } from 'framer-motion'
import { Sun, AlertTriangle, TrendingUp } from 'lucide-react'
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts'

interface SolarCardProps {
  currentKwh: number
  maxKwh: number
  efficiency: number
  maintenanceAlert: boolean
  todayProduction: number
}

export default function SolarCard({ currentKwh, maxKwh, efficiency, maintenanceAlert, todayProduction }: SolarCardProps) {
  const radialData = [{ value: efficiency, fill: '#FFB800' }]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      {maintenanceAlert && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 right-0 bg-yellow-500/10 border-b border-yellow-500/30 px-4 py-2 flex items-center gap-2"
        >
          <AlertTriangle size={12} className="text-yellow-400" />
          <span className="text-xs font-mono text-yellow-400 tracking-wider">MAINTENANCE REQUIRED</span>
        </motion.div>
      )}

      <div className={`${maintenanceAlert ? 'mt-6' : ''}`}>
        <div className="flex items-center gap-2 mb-4">
          <Sun size={14} className="text-yellow-400" />
          <span className="text-xs font-mono text-gray-500 tracking-wider">SOLAR ARRAY</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Radial */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%" cy="50%"
                innerRadius="60%" outerRadius="90%"
                startAngle={90} endAngle={-270}
                data={radialData}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar dataKey="value" cornerRadius={10} background={{ fill: 'rgba(255,255,255,0.05)' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-display font-bold text-white">{efficiency}</span>
              <span className="text-[9px] text-gray-500 font-mono">%</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-3">
              <p className="text-xs text-gray-600 font-mono mb-1">CURRENT OUTPUT</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-display font-bold text-white">{currentKwh}</span>
                <span className="text-xs text-gray-500">/ {maxKwh} kWh</span>
              </div>
            </div>

            {/* Mini bars */}
            <div className="space-y-1">
              {['Panel A', 'Panel B', 'Panel C'].map((panel, i) => {
                const val = [92, 88, 78][i]
                return (
                  <div key={panel} className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-600 font-mono w-10">{panel}</span>
                    <div className="flex-1 h-1 bg-black/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${val}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                      />
                    </div>
                    <span className="text-[9px] text-gray-500 w-6">{val}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <div>
            <p className="text-xs text-gray-600 font-mono">TODAY</p>
            <p className="text-base font-semibold text-white">{todayProduction} <span className="text-xs text-gray-500">kWh</span></p>
          </div>
          <div className="flex items-center gap-1 text-green-400">
            <TrendingUp size={12} />
            <span className="text-xs font-semibold">+12% avg</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
