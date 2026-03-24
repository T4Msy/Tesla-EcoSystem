'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Bell, ChevronDown, User, Settings, LogOut, Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navbar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (v: boolean) => void }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const notifications = [
    { text: 'Battery charged to 85%', time: '2m ago', dot: 'bg-green-400' },
    { text: 'Solar efficiency dropped 8%', time: '15m ago', dot: 'bg-yellow-400' },
    { text: 'Grid sale: +R$ 12.40', time: '1h ago', dot: 'bg-blue-400' },
  ]

  return (
    <nav className="glass-strong border-b border-white/5 px-4 sm:px-6 py-3 flex items-center justify-between relative z-40">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-gray-400 hover:text-white transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-tesla-red/10 border border-tesla-red/30 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-tesla-red" />
          </div>
          <div>
            <span className="text-sm font-display font-bold tracking-wider text-white">TESLA</span>
            <span className="text-xs text-gray-600 block font-mono leading-none">ECOSYSTEM</span>
          </div>
        </div>
      </div>

      {/* Center - breadcrumb */}
      <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-600">
        <span>HOME</span>
        <span>/</span>
        <span className="text-gray-400">DASHBOARD</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Notifs */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
            className="relative w-9 h-9 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <Bell size={15} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-tesla-red rounded-full" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 top-12 w-72 glass-strong rounded-xl border border-white/10 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-xs font-mono text-gray-400 tracking-wider">NOTIFICATIONS</p>
                </div>
                {notifications.map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 flex gap-3 items-start cursor-pointer">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`} />
                    <div>
                      <p className="text-xs text-white">{n.text}</p>
                      <p className="text-[10px] text-gray-600 font-mono mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
            className="flex items-center gap-2 glass rounded-xl px-3 py-2 hover:bg-white/5 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-tesla-red/20 border border-tesla-red/40 flex items-center justify-center">
              <User size={12} className="text-tesla-red" />
            </div>
            <span className="text-xs text-gray-300 hidden sm:block font-medium">Elon M.</span>
            <ChevronDown size={12} className="text-gray-600" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 top-12 w-52 glass-strong rounded-xl border border-white/10 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-semibold text-white">Elon Musk</p>
                  <p className="text-xs text-gray-500">elon@tesla.com</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    <span className="text-[10px] text-yellow-400 font-mono">GOLD MEMBER</span>
                  </div>
                </div>
                {[
                  { icon: User, label: 'Profile' },
                  { icon: Settings, label: 'Settings' },
                ].map(({ icon: Icon, label }) => (
                  <button key={label} className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    <Icon size={13} />
                    {label}
                  </button>
                ))}
                <Link href="/" className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-tesla-red hover:bg-tesla-red/10 transition-colors border-t border-white/5">
                  <LogOut size={13} />
                  Sign Out
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}
