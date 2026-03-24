'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Zap, Shield, Cpu } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bootComplete, setBootComplete] = useState(false)
  const [bootStep, setBootStep] = useState(0)

  const bootMessages = [
    'INITIALIZING TESLA OS v4.2.1...',
    'CONNECTING TO TESLA GRID...',
    'AUTHENTICATING ENERGY NODES...',
    'SYSTEM READY.',
  ]

  useEffect(() => {
    const timers = bootMessages.map((_, i) =>
      setTimeout(() => setBootStep(i + 1), i * 600)
    )
    setTimeout(() => setBootComplete(true), bootMessages.length * 600 + 200)
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-tesla-dark grid-bg flex items-center justify-center relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-tesla-red opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-tesla-red opacity-3 blur-3xl pointer-events-none" />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-tesla-red opacity-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-px bg-tesla-red" />
          <span className="text-xs font-mono tracking-widest">SYS.AUTH</span>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 text-tesla-red opacity-30">
        <span className="text-xs font-mono tracking-widest">TESLA.OS v4.2.1</span>
      </div>

      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center"
          >
            <motion.div className="mb-8 relative mx-auto w-20 h-20">
              <div className="w-20 h-20 rounded-full border-2 border-tesla-red opacity-20 spin-slow absolute inset-0" />
              <div className="w-16 h-16 rounded-full border border-tesla-red opacity-40 spin-slow absolute inset-2" style={{ animationDirection: 'reverse', animationDuration: '8s' }} />
              <Zap className="text-tesla-red absolute inset-0 m-auto w-8 h-8" />
            </motion.div>

            <div className="space-y-2 font-mono text-sm">
              {bootMessages.slice(0, bootStep).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === bootStep - 1 ? 'text-tesla-red' : 'text-gray-600'}
                >
                  <span className="text-gray-700 mr-2">›</span>
                  {msg}
                  {i === bootStep - 1 && i < bootMessages.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-tesla-red ml-1 align-middle animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-md px-4"
          >
            {/* Logo */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl tesla-glow bg-tesla-red/10 border border-tesla-red/30 mb-4"
              >
                <Zap className="w-8 h-8 text-tesla-red" />
              </motion.div>
              <h1 className="text-2xl font-display font-bold tracking-wider text-white">
                TESLA
              </h1>
              <p className="text-xs text-gray-500 tracking-widest mt-1 font-mono">ECOSYSTEM PLATFORM</p>
            </div>

            {/* Card */}
            <div className="glass rounded-2xl p-8 tesla-glow-sm">
              <h2 className="text-lg font-semibold mb-1 text-white">Welcome back</h2>
              <p className="text-sm text-gray-500 mb-6">Sign in to your energy dashboard</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 font-mono tracking-wider block mb-2">EMAIL</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@tesla.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-tesla-red/60 focus:ring-1 focus:ring-tesla-red/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-mono tracking-wider block mb-2">PASSWORD</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-tesla-red/60 focus:ring-1 focus:ring-tesla-red/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-tesla-red hover:bg-red-700 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 tesla-glow"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      AUTHENTICATING...
                    </>
                  ) : (
                    <>
                      <Shield size={16} />
                      SECURE LOGIN
                    </>
                  )}
                </motion.button>
              </form>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/5">
                {[
                  { icon: Zap, label: 'GRID', value: '99.9%' },
                  { icon: Shield, label: 'SECURE', value: 'AES-256' },
                  { icon: Cpu, label: 'NODES', value: '1.2M' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center">
                    <Icon size={14} className="text-tesla-red mx-auto mb-1" />
                    <div className="text-xs text-white font-mono font-semibold">{value}</div>
                    <div className="text-[10px] text-gray-600 tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-gray-700 mt-4 font-mono">
              TESLA ECOSYSTEM © 2024 — ALL SYSTEMS NOMINAL
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
