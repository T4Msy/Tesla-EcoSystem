import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Briefcase, Home as HomeIcon, Heart, Plane,
  Sparkles, Leaf, ArrowRight, Bell, BarChart3, Route
} from 'lucide-react';
import StatusBar from '../components/ui/StatusBar';
import MapSimulation from '../components/map/MapSimulation';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Pill from '../components/ui/Pill';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import TeslaLogo from '../components/ui/TeslaLogo';
import LiveFleetTicker from '../components/ui/LiveFleetTicker';
import NotificationPanel from '../components/ui/NotificationPanel';
import { useAuthStore } from '../stores/authStore';
import { savedPlaces, recentSearches } from '../mock/places';
import { userImpact } from '../mock/metrics';
import { useRideStore } from '../stores/rideStore';
import { staggerContainer, staggerItem } from '../animations/variants';
import { toast } from '../stores/toastStore';

const shortcuts = [
  { id: 'home', label: 'Casa', icon: HomeIcon, route: '/home' },
  { id: 'work', label: 'Trabalho', icon: Briefcase, route: '/work' },
  { id: 'fav', label: 'Favoritos', icon: Heart, route: '/fav' },
  { id: 'airport', label: 'GRU', icon: Plane, route: '/gru' }
];

export default function HomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const setDropoff = useRideStore((s) => s.setDropoff);
  const [notifOpen, setNotifOpen] = useState(false);

  const greet = greeting();

  return (
    <div className="relative">
      {/* Map area */}
      <div className="relative h-[58dvh] min-h-[400px]">
        <MapSimulation variant="home" className="absolute inset-0" />
        <StatusBar />

        {/* Top bar */}
        <div className="absolute top-[max(52px,env(safe-area-inset-top))] left-0 right-0 px-3 flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/profile')}
            className="glass-strong rounded-full pl-1 pr-3 py-1 flex items-center gap-2 hover:bg-white/12 flex-1 min-w-0"
          >
            <Avatar src={user?.avatar} name={user?.name || 'User'} size={32} />
            <div className="text-left leading-tight min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-white/55">{greet}</div>
              <div className="text-[13px] font-semibold truncate">{user?.name?.split(' ')[0]}</div>
            </div>
          </motion.button>

          <div className="flex items-center gap-1.5">
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setNotifOpen(true)}
              className="h-10 w-10 rounded-full glass-strong grid place-items-center hover:bg-white/12 relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-tesla-red ring-1 ring-tesla-black" />
            </motion.button>
            <div className="glass-strong rounded-full px-2.5 h-10 flex items-center gap-1.5 text-[12px]">
              <TeslaLogo size={13} className="text-tesla-red" />
              <span className="font-semibold tracking-tight">{user?.tier}</span>
            </div>
          </div>
        </div>

        {/* Live fleet ticker — bottom left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-36 left-3"
          style={{ maxWidth: 165 }}
        >
          <LiveFleetTicker />
        </motion.div>

        {/* CO2 widget — bottom right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-36 right-3 glass-strong rounded-2xl px-3 py-2"
        >
          <div className="text-[10px] text-white/50 uppercase tracking-wider">CO₂ evitado hoje</div>
          <div className="text-[14px] font-semibold text-emerald-300 flex items-center gap-1">
            <Leaf className="h-3.5 w-3.5" />
            <AnimatedNumber value={2.4} decimals={1} suffix=" kg" />
          </div>
        </motion.div>
      </div>

      {/* Bottom sheet */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative -mt-8 glass-strong rounded-t-[32px] px-4 pt-3 pb-6"
      >
        <div className="flex justify-center mb-3">
          <div className="h-1.5 w-12 rounded-full bg-white/20" />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Para onde vamos?</h2>
          <Pill tone="red" className="ml-auto">
            <Sparkles className="h-3 w-3" />
            IA Sugere
          </Pill>
        </div>

        {/* Search bar */}
        <motion.button
          whileTap={{ scale: 0.985 }}
          onClick={() => navigate('/search')}
          className="w-full glass rounded-2xl h-14 px-4 flex items-center gap-3 hover:bg-white/8 transition"
        >
          <Search className="h-5 w-5 text-white/60" />
          <span className="text-[15px] text-white/55">Digite o destino…</span>
          <span className="ml-auto text-[11px] glass px-2 py-0.5 rounded-md text-white/70">Agora</span>
        </motion.button>

        {/* Shortcuts */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="enter"
          className="grid grid-cols-4 gap-2 mt-4"
        >
          {shortcuts.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              variants={staggerItem}
              whileTap={{ scale: 0.93 }}
              onClick={() => {
                setDropoff(label);
                navigate('/search');
              }}
              className="aspect-square glass rounded-2xl flex flex-col items-center justify-center gap-1 hover:bg-white/8 transition"
            >
              <Icon className="h-5 w-5 text-tesla-red" />
              <span className="text-[11px] font-medium">{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Recent searches */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-widest text-white/45">Sugeridos pela IA</span>
            <button
              onClick={() => toast('Ver todos os lugares salvos', 'Funcionalidade em breve', 'info')}
              className="text-[11px] text-tesla-red font-semibold"
            >
              Ver tudo
            </button>
          </div>
          <div className="space-y-1">
            {[...recentSearches, savedPlaces[2]].slice(0, 4).map((p) => (
              <motion.button
                key={p.id}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  setDropoff(p.label);
                  navigate('/search');
                  toast(`Destino: ${p.label}`, p.address, 'tesla');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition"
              >
                <div className="h-9 w-9 rounded-xl bg-white/8 grid place-items-center">
                  <Search className="h-4 w-4 text-white/70" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-[14px] font-medium truncate">{p.label}</div>
                  <div className="text-[11px] text-white/50 truncate">{p.address}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/40" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <QuickStat
            icon={<Route className="h-4 w-4 text-tesla-red" />}
            value={`${userImpact.kmDriven}`}
            label="km totais"
            onClick={() => navigate('/economy')}
          />
          <QuickStat
            icon={<Leaf className="h-4 w-4 text-emerald-300" />}
            value={`${userImpact.co2SavedKg}`}
            label="kg CO₂ evitado"
            onClick={() => navigate('/sustainability')}
          />
          <QuickStat
            icon={<BarChart3 className="h-4 w-4 text-sky-300" />}
            value={`${userImpact.ridesTotal}`}
            label="viagens"
            onClick={() => navigate('/history')}
          />
        </div>

        {/* Impact cards */}
        <Card
          interactive
          onClick={() => navigate('/sustainability')}
          className="mt-4 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 grid place-items-center">
              <Leaf className="h-5 w-5 text-emerald-300" />
            </div>
            <div className="flex-1">
              <div className="text-[12px] text-white/60">Seu impacto positivo acumulado</div>
              <div className="text-[18px] font-semibold">
                <AnimatedNumber value={userImpact.co2SavedKg} decimals={1} suffix=" kg de CO₂ evitado" />
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-white/40" />
          </div>
        </Card>

        <Card
          interactive
          onClick={() => navigate('/fsd')}
          className="mt-3 bg-gradient-to-br from-tesla-red/15 via-tesla-red/5 to-transparent border-tesla-red/20"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-tesla-red/20 grid place-items-center">
              <Sparkles className="h-5 w-5 text-tesla-red" />
            </div>
            <div className="flex-1">
              <div className="text-[12px] text-white/60">Você está treinando a IA Tesla</div>
              <div className="text-[18px] font-semibold">
                <AnimatedNumber value={userImpact.fsdDataMinutes} suffix=" min de dados FSD coletados" />
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-white/40" />
          </div>
        </Card>
      </motion.div>

      {/* Notification panel */}
      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
}

function QuickStat({ icon, value, label, onClick }: { icon: React.ReactNode; value: string; label: string; onClick?: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="glass rounded-2xl p-2.5 text-center hover:bg-white/8 transition"
    >
      <div className="flex justify-center mb-1">{icon}</div>
      <div className="text-[13px] font-semibold tabular-nums">{value}</div>
      <div className="text-[9px] uppercase tracking-widest text-white/45 mt-0.5">{label}</div>
    </motion.button>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Boa madrugada';
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}
