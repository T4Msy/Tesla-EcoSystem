'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Car, Home, Sun, BatteryFull, Zap, Award, Settings, ChevronRight } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Car, label: 'Vehicle', active: false },
  { icon: Home, label: 'Home Energy', active: false },
  { icon: Sun, label: 'Solar', active: false },
  { icon: BatteryFull, label: 'Battery', active: false },
  { icon: Zap, label: 'Tesla Grid', active: false },
  { icon: Award, label: 'Certifications', active: false },
]

export default function Sidebar({ open }: { open: boolean }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 glass-strong border-r border-white/5 py-6 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-56 glass-strong border-r border-white/5 py-6 z-30 flex flex-col"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

function SidebarContent() {
  return (
    <>
      <div className="px-4 mb-6">
        <p className="text-[10px] font-mono text-gray-600 tracking-widest px-2">NAVIGATION</p>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ icon: Icon, label, active }) => (
          <motion.button
            key={label}
            whileHover={{ x: 3 }}
            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
              active
                ? 'bg-tesla-red/10 text-white border border-tesla-red/20'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon size={15} className={active ? 'text-tesla-red' : ''} />
              <span className="font-medium">{label}</span>
            </div>
            {active && <ChevronRight size={12} className="text-tesla-red" />}
          </motion.button>
        ))}
      </nav>

      <div className="px-3 pt-4 border-t border-white/5 mt-4">
        <motion.button
          whileHover={{ x: 3 }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all"
        >
          <Settings size={15} />
          <span>Settings</span>
        </motion.button>

        {/* System status */}
        <div className="mt-4 mx-1 p-3 bg-green-500/5 border border-green-500/15 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-mono text-green-400 tracking-wider">ALL SYSTEMS NOMINAL</span>
          </div>
          <p className="text-[10px] text-gray-600">Last sync: 2 min ago</p>
        </div>
      </div>
    </>
  )
}
