import { NavLink, useLocation } from 'react-router-dom';
import { Home, Clock, Wallet, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWalletStore } from '../../stores/walletStore';

export default function BottomNav() {
  const { pathname } = useLocation();
  const balance = useWalletStore((s) => s.balance);

  const hidden =
    pathname.startsWith('/ride') ||
    pathname === '/' ||
    pathname === '/onboarding';
  if (hidden) return null;

  const items = [
    { to: '/home', label: 'Início', icon: Home, badge: false },
    { to: '/history', label: 'Histórico', icon: Clock, badge: false },
    { to: '/fsd', label: 'FSD', icon: Sparkles, badge: true, badgeColor: 'bg-tesla-red' },
    {
      to: '/wallet',
      label: `R$ ${balance.toFixed(0)}`,
      icon: Wallet,
      badge: false
    },
    { to: '/profile', label: 'Perfil', icon: User, badge: false }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 pb-safe pointer-events-none">
      <div className="mx-3 mb-3 pointer-events-auto glass-strong rounded-3xl px-1 py-1.5 shadow-card border-white/10">
        <div className="grid grid-cols-5 gap-1 relative">
          {items.map(({ to, label, icon: Icon, badge, badgeColor }) => (
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
                    {badge && (
                      <span
                        className={[
                          'absolute -top-1 -right-1 h-2 w-2 rounded-full shadow-glow',
                          badgeColor || 'bg-tesla-red'
                        ].join(' ')}
                      />
                    )}
                    <Icon
                      className={[
                        'h-[20px] w-[20px] relative',
                        badge && isActive ? 'text-tesla-red' : ''
                      ].join(' ')}
                      strokeWidth={isActive ? 2.4 : 1.8}
                    />
                  </div>
                  <span className="relative truncate max-w-full px-1">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
