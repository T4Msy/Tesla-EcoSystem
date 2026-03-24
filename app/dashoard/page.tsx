'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import VehicleCard from '@/components/VehicleCard'
import EnergyCard from '@/components/EnergyCard'
import SolarCard from '@/components/SolarCard'
import BatteryCard from '@/components/BatteryCard'
import GridPanel from '@/components/GridPanel'
import AssistantModal from '@/components/AssistantModal'
import CertificationBadge from '@/components/CertificationBadge'
import { BarChart2, TrendingUp, Zap, Leaf } from 'lucide-react'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const weekData = [
  { day: 'Mon', kwh: 18 }, { day: 'Tue', kwh: 22 }, { day: 'Wed', kwh: 15 },
  { day: 'Thu', kwh: 28 }, { day: 'Fri', kwh: 24 }, { day: 'Sat', kwh: 12 }, { day: 'Sun', kwh: 9 },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentKw, setCurrentKw] = useState(3.7)
  const [batteryPercent, setBatteryPercent] = useState(78)

  // Simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKw(prev => parseFloat((prev + (Math.random() - 0.5) * 0.3).toFixed(1)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-tesla-dark grid-bg flex flex-col">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-20" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wider">
                  ENERGY DASHBOARD
                </h1>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  MONDAY, 23 MARCH 2026 · SÃO PAULO, BR · LIVE
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 glass rounded-xl border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-gray-400">LIVE</span>
              </div>
            </div>
          </motion.div>

          {/* KPI Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
          >
            {[
              { icon: Zap, label: 'Total Energy Today', value: '42.3 kWh', change: '+8%', color: '#E82127' },
              { icon: TrendingUp, label: 'Solar Generated', value: '18.7 kWh', change: '+12%', color: '#FFB800' },
              { icon: BarChart2, label: 'Grid Revenue', value: 'R$ 48.20', change: '+3%', color: '#00D084' },
              { icon: Leaf, label: 'CO₂ Saved', value: '12.4 kg', change: 'today', color: '#4A9EFF' },
            ].map(({ icon: Icon, label, value, change, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={13} style={{ color }} />
                  <span className="text-[10px] font-mono text-gray-600">{change}</span>
                </div>
                <p className="text-lg font-display font-bold text-white">{value}</p>
                <p className="text-[10px] text-gray-600 font-mono mt-0.5 leading-tight">{label.toUpperCase()}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
            {/* Vehicle spans 2 cols on xl */}
            <div className="md:col-span-2 xl:col-span-2">
              <VehicleCard
                batteryPercent={batteryPercent}
                range={312}
                health="good"
                temperature={22}
                model="Model S Plaid"
                connected={true}
              />
            </div>

            {/* Grid panel */}
            <GridPanel
              availableKwh={24.5}
              gridPrice={0.22}
              soldToday={8.3}
              boughtToday={2.1}
            />

            {/* Energy */}
            <EnergyCard
              currentKw={currentKw}
              status="efficient"
              dailyTotal={42.3}
              trend={-5}
            />

            {/* Solar */}
            <SolarCard
              currentKwh={4.2}
              maxKwh={6.0}
              efficiency={87}
              maintenanceAlert={false}
              todayProduction={18.7}
            />

            {/* Battery */}
            <BatteryCard
              totalCapacity={13.5}
              currentUsage={9.8}
              healthPercent={94}
              temperature={28}
              cycles={312}
            />
          </div>

          {/* Weekly chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BarChart2 size={14} className="text-tesla-red" />
                  <span className="text-xs font-mono text-gray-500 tracking-wider">WEEKLY CONSUMPTION</span>
                </div>
                <p className="text-lg font-display font-bold text-white">142.6 <span className="text-sm text-gray-500">kWh this week</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600 font-mono">VS LAST WEEK</p>
                <p className="text-sm font-semibold text-green-400">-8.2%</p>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData} barSize={24}>
                  <XAxis dataKey="day" tick={{ fill: '#555', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#1F1F1F', border: '1px solid #333', borderRadius: 8, fontSize: 11 }}
                    formatter={(v: any) => [`${v} kWh`]}
                  />
                  <Bar dataKey="kwh" fill="#E82127" opacity={0.8} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Certification row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="sm:col-span-2">
              <CertificationBadge tier="Gold" type="standard" />
            </div>
            <CertificationBadge tier="Gold" type="certified" score={82} />
          </div>

          {/* Footer */}
          <div className="text-center py-4">
            <p className="text-xs text-gray-700 font-mono tracking-widest">
              TESLA ECOSYSTEM v4.2.1 · ALL RIGHTS RESERVED · TESLA, INC.
            </p>
          </div>
        </main>
      </div>

      <AssistantModal />
    </div>
  )
}
