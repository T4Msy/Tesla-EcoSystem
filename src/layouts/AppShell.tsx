import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../components/ui/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppShell() {
  const location = useLocation();
  return (
    <div className="relative min-h-[100dvh] w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pb-24"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
