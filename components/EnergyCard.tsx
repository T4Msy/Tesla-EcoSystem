'use client'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Zap, TrendingUp, TrendingDown } from 'lucide-react'

const data = [
  { time: '00:00', kw: 1.2 }, { time: '03:00', kw: 0.8 }, { time: '06:00', kw: 1.5 },
  { time: '09:00', kw: 3.2 }, { time: '12:00', kw: 4.1 }, { time: '15:00', kw: 3.8 },
  { time: '18:00', kw: 5.2 }, { time: '21:00', kw: 4.6 }, { time: '24:00', kw: 2.1 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2 border border-white/10">
        <p className="text-xs text-gray-400 font-mono">{label}</p>
        <p className="text-sm font-bold text-white">{payload[0].value} <span className="text-tesla-red">kW</span></p>
      </div>
    )
  }
  return null
}

interface EnergyCardProps {
  currentKw: number
  status: 'efficient' | 'average' | 'critical'
  dailyTotal: number
  trend: number
}

const statusConfig = {
  efficient: { color: '#00D084', label: 'EFFICIENT', bg: 'rgba(0, 208, 132, 0.1)' },
  average:   { color: '#FFB800', label: 'AVERAGE',   bg: 'rgba(255, 184, 0, 0.1)' },
  critical:  { color: '#E82127', label: 'CRITICAL',  bg: 'rgba(232, 33, 39, 0.1)' },
}

export default function EnergyCard({ currentKw, status, dailyTotal, trend }: EnergyCardProps) {
  const sc = statusConfig[status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} className="text-tesla-red" />
            <span className="text-xs font-mono text-gray-500 tracking-wider">HOME ENERGY</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{currentKw}</span>
            <span className="text-sm text-gray-500">kW</span>
          </div>
          <p className="text-xs text-gray-600 font-mono mt-1">REAL-TIME CONSUMPTION</p>
        </div>

        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono font-semibold border"
          style={{ color: sc.color, background: sc.bg, borderColor: sc.color + '30' }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sc.color }} />
          {sc.label}
        </div>
      </div>

      {/* Chart */}
      <div className="h-28 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E82127" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#E82127" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fill: '#555', fontSize: 9, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#555', fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="kw" stroke="#E82127" strokeWidth={1.5} fill="url(#energyGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom stats */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
        <div>
          <p className="text-xs text-gray-600 font-mono">DAILY TOTAL</p>
          <p className="text-base font-semibold text-white">{dailyTotal} <span className="text-xs text-gray-500">kWh</span></p>
        </div>
        <div className="flex items-center gap-1">
          {trend > 0 ? (
            <TrendingUp size={14} className="text-red-400" />
          ) : (
            <TrendingDown size={14} className="text-green-400" />
          )}
          <span className={`text-sm font-semibold ${trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-xs text-gray-600 ml-1">vs yesterday</span>
        </div>
      </div>
    </motion.div>
  )
}
