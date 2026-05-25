import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBar from '../components/ui/StatusBar';
import TeslaLogo from '../components/ui/TeslaLogo';

export default function AuthLayout() {
  const location = useLocation();
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-tesla-red/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <StatusBar />
      <div className="px-6 mt-6 flex items-center gap-2 text-white/90 no-select">
        <TeslaLogo size={22} />
        <span className="text-[15px] font-semibold tracking-tight">UrbanRide</span>
        <span className="ml-auto text-[11px] text-white/50">v1.0 • Beta</span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
