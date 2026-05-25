import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X, Zap } from 'lucide-react';
import { useToastStore, type ToastKind } from '../../stores/toastStore';

const icons: Record<ToastKind, React.ReactNode> = {
  success: <CheckCircle className="h-4 w-4 text-emerald-300" />,
  error: <XCircle className="h-4 w-4 text-red-400" />,
  info: <Info className="h-4 w-4 text-sky-300" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-300" />,
  tesla: <Zap className="h-4 w-4 text-tesla-red" />
};

const border: Record<ToastKind, string> = {
  success: 'border-emerald-500/30',
  error: 'border-red-500/30',
  info: 'border-sky-500/30',
  warning: 'border-amber-500/30',
  tesla: 'border-tesla-red/30'
};

export default function ToastRenderer() {
  const { toasts, dismiss } = useToastStore();
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-[999] px-3 pt-safe pt-14 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className={[
              'glass-strong rounded-2xl px-3.5 py-3 flex items-center gap-3 pointer-events-auto border shadow-card',
              border[t.kind]
            ].join(' ')}
          >
            <div className="shrink-0">{icons[t.kind]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold">{t.message}</div>
              {t.sub && <div className="text-[11px] text-white/55 mt-0.5 truncate">{t.sub}</div>}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="h-6 w-6 rounded-full hover:bg-white/10 grid place-items-center"
            >
              <X className="h-3 w-3 text-white/60" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
