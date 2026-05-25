import { NavLink, useLocation } from 'react-router-dom';
import { Home, Clock, Wallet, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const items = [
  { to: '/home', label: 'Início', icon: Home },
  { to: '/history', label: 'Histórico', icon: Clock },
  { to: '/fsd', label: 'FSD', icon: Sparkles, accent: true },
  { to: '/wallet', label: 'Carteira', icon: Wallet },
  { to: '/profile', label: 'Perfil', icon: User }
];

export default function BottomNav() {
  const { pathname } = useLocation();
  // Hide on ride / fullscreen pages
  const hidden = pathname.startsWith('/ride');
  if (hidden) return null;
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 pb-safe pointer-events-none">
      <div className="mx-3 mb-3 pointer-events-auto glass-strong rounded-3xl px-1 py-1.5 shadow-card border-white/10">
        <div className="grid grid-cols-5 gap-1 relative">
          {items.map(({ to, label, icon: Icon, accent }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'relative h-14 rounded-2xl flex flex-col items-center justify-center text-[10px] font-medium gap-0.5 transition-colors',
                  isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="navBg"
                      className="absolute inset-1 bg-white/8 rounded-2xl border border-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="relative">
                    {accent && (
                      <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-tesla-red shadow-glow" />
                    )}
                    <Icon
                      className={[
                        'h-[20px] w-[20px] relative',
                        accent && isActive ? 'text-tesla-red' : ''
                      ].join(' ')}
                      strokeWidth={isActive ? 2.4 : 1.8}
                    />
                  </div>
                  <span className="relative">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
