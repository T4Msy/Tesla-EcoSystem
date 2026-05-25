import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TeslaLogo from '../components/ui/TeslaLogo';
import { useAuthStore } from '../stores/authStore';

export default function SplashPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const onboardingDone = useAuthStore((s) => s.onboardingDone);

  useEffect(() => {
    const id = setTimeout(() => {
      if (user) navigate('/home', { replace: true });
      else if (onboardingDone) navigate('/login', { replace: true });
      else navigate('/onboarding', { replace: true });
    }, 2400);
    return () => clearTimeout(id);
  }, [navigate, user, onboardingDone]);

  return (
    <div className="relative min-h-[100dvh] w-full grid place-items-center overflow-hidden bg-tesla-black no-select">
      <div className="absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-tesla-red/15 blur-3xl" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-x-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-tesla-red to-transparent animate-scan" />
        </motion.div>
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotateX: -45 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 blur-2xl bg-tesla-red/30 rounded-full" />
          <TeslaLogo size={86} className="relative text-white drop-shadow-[0_0_20px_rgba(232,33,39,0.7)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center"
        >
          <div className="text-[28px] font-semibold tracking-tight text-gradient-red">UrbanRide</div>
          <div className="text-[11px] mt-1 text-white/50 tracking-[0.3em] uppercase">
            Tesla Mobility Solutions
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2"
        >
          <div className="h-[3px] w-32 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
              className="h-full w-1/2 bg-tesla-red"
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 pb-safe text-[10px] text-white/30 tracking-widest uppercase">
        Powered by Tesla AI • FSD v13
      </div>
    </div>
  );
}
