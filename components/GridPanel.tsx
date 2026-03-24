'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ArrowUpRight, ArrowDownRight, Activity, DollarSign } from 'lucide-react'
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const gridData = [
  { t: '6h', price: 0.12 }, { t: '9h', price: 0.18 }, { t: '12h', price: 0.22 },
  { t: '15h', price: 0.19 }, { t: '18h', price: 0.28 }, { t: '21h', price: 0.16 },
]

interface GridPanelProps {
  availableKwh: number
  gridPrice: number
  soldToday: number
  boughtToday: number
}

export default function GridPanel({ availableKwh, gridPrice, soldToday, boughtToday }: GridPanelProps) {
  const [feedback, setFeedback] = useState<string | null>(null)
  const [action, setAction] = useState<'sell' | 'buy' | null>(null)

  const handleSell = () => {
    const amt = (Math.random() * 5 + 2).toFixed(1)
    setAction('sell')
    setFeedback(`✓ Sold ${amt} kWh to Tesla Grid — R$ ${(parseFloat(amt) * gridPrice).toFixed(2)} credited`)
    setTimeout(() => setFeedback(null), 4000)
  }

  const handleBuy = () => {
    const amt = (Math.random() * 3 + 1).toFixed(1)
    setAction('buy')
    setFeedback(`✓ Purchased ${amt} kWh from Tesla Grid — R$ ${(parseFloat(amt) * gridPrice * 1.1).toFixed(2)} charged`)
    setTimeout(() => setFeedback(null), 4000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity size={14} className="text-tesla-red" />
            <span className="text-xs font-mono text-gray-500 tracking-wider">TESLA GRID</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-bold text-white">{availableKwh}</span>
            <span className="text-sm text-gray-500">kWh available</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-600 font-mono">PRICE/kWh</p>
          <p className="text-lg font-display font-bold text-green-400">R$ {gridPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Price chart */}
      <div className="h-16 -mx-1 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={gridData}>
            <XAxis dataKey="t" tick={{ fill: '#444', fontSize: 8, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#1F1F1F', border: '1px solid #333', borderRadius: 8, fontSize: 11 }}
              labelStyle={{ color: '#888' }}
              formatter={(v: any) => [`R$ ${v}`, 'kWh price']}
            />
            <Line type="monotone" dataKey="price" stroke="#E82127" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-black/30 rounded-xl p-3 border border-green-500/10">
          <div className="flex items-center gap-1 mb-1">
            <ArrowUpRight size={11} className="text-green-400" />
            <span className="text-[10px] text-gray-600 font-mono">SOLD TODAY</span>
          </div>
          <p className="text-base font-semibold text-white">{soldToday} <span className="text-xs text-gray-500">kWh</span></p>
        </div>
        <div className="bg-black/30 rounded-xl p-3 border border-blue-500/10">
          <div className="flex items-center gap-1 mb-1">
            <ArrowDownRight size={11} className="text-blue-400" />
            <span className="text-[10px] text-gray-600 font-mono">BOUGHT TODAY</span>
          </div>
          <p className="text-base font-semibold text-white">{boughtToday} <span className="text-xs text-gray-500">kWh</span></p>
        </div>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-3 px-3 py-2 rounded-lg text-xs font-mono border ${
              action === 'sell' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
            }`}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSell}
          className="flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 text-green-400 py-2.5 rounded-xl text-xs font-semibold font-mono tracking-wider transition-all"
        >
          <ArrowUpRight size={14} />
          SELL ENERGY
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuy}
          className="flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 text-blue-400 py-2.5 rounded-xl text-xs font-semibold font-mono tracking-wider transition-all"
        >
          <ArrowDownRight size={14} />
          BUY ENERGY
        </motion.button>
      </div>
    </motion.div>
  )
}
