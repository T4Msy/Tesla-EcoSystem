'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Wrench, Calendar, Cpu, ChevronRight, CheckCircle2 } from 'lucide-react'

const actions = [
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Request Maintenance',
    desc: 'Schedule a technician visit for inspection or repair',
    color: '#FFB800',
  },
  {
    id: 'schedule',
    icon: Calendar,
    title: 'Schedule Technician',
    desc: 'Book a certified Tesla technician for service',
    color: '#4A9EFF',
  },
  {
    id: 'diagnostic',
    icon: Cpu,
    title: 'Remote Diagnostics',
    desc: 'Run a full system health check remotely',
    color: '#00D084',
  },
]

export default function AssistantModal() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const handleAction = (id: string) => {
    setSelected(id)
    setTimeout(() => setDone(true), 1200)
    setTimeout(() => {
      setDone(false)
      setSelected(null)
    }, 3000)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-tesla-red rounded-2xl flex items-center justify-center tesla-glow z-50 shadow-2xl"
      >
        <Bot size={22} className="text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-tesla-dark" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-24 right-6 w-80 glass-strong rounded-2xl p-5 z-50 border border-white/10"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-tesla-red/10 border border-tesla-red/30 rounded-xl flex items-center justify-center tesla-glow-sm">
                    <Bot size={18} className="text-tesla-red" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Tesla Assistant</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-xs text-gray-500">Online — ready to help</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-gray-400 transition-colors">
                  <X size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-4 font-mono">WHAT WOULD YOU LIKE TO DO?</p>

              {/* Actions */}
              <div className="space-y-2">
                {actions.map(({ id, icon: Icon, title, desc, color }) => (
                  <motion.button
                    key={id}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAction(id)}
                    disabled={!!selected}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/10 bg-black/20 hover:bg-black/40 transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: color + '20', border: `1px solid ${color}30` }}>
                      {selected === id && !done ? (
                        <div className="w-3 h-3 border-2 rounded-full animate-spin" style={{ borderColor: color + '40', borderTopColor: color }} />
                      ) : selected === id && done ? (
                        <CheckCircle2 size={14} style={{ color }} />
                      ) : (
                        <Icon size={14} style={{ color }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{title}</p>
                      <p className="text-xs text-gray-600 truncate">{desc}</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-700 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {done && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg"
                  >
                    <p className="text-xs text-green-400 font-mono">✓ Request submitted successfully. Our team will contact you shortly.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-[10px] text-gray-700 font-mono text-center mt-4">TESLA CERTIFIED SERVICE NETWORK</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
