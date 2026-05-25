import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Briefcase, Home as HomeIcon, Heart, Plane, Sparkles, Battery, Leaf, ArrowRight, Bell } from 'lucide-react';
import StatusBar from '../components/ui/StatusBar';
import MapSimulation from '../components/map/MapSimulation';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Pill from '../components/ui/Pill';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import TeslaLogo from '../components/ui/TeslaLogo';
import { useAuthStore } from '../stores/authStore';
import { savedPlaces, recentSearches } from '../mock/places';
import { userImpact } from '../mock/metrics';
import { useRideStore } from '../stores/rideStore';
import { staggerContainer, staggerItem } from '../animations/variants';

const shortcuts = [
  { id: 'home', label: 'Casa', icon: HomeIcon },
  { id: 'work', label: 'Trabalho', icon: Briefcase },
  { id: 'fav', label: 'Favoritos', icon: Heart },
  { id: 'airport', label: 'GRU', icon: Plane }
];

export default function HomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const setDropoff = useRideStore((s) => s.setDropoff);

  const greet = greeting();

  return (
    <div className="relative">
      {/* Map area */}
      <div className="relative h-[58dvh] min-h-[400px]">
        <MapSimulation variant="home" className="absolute inset-0" />
        <StatusBar />
        <div className="absolute top-[max(56px,env(safe-area-inset-top))] left-0 right-0 px-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/profile')}
            className="glass-strong rounded-full pl-1 pr-3 py-1 flex items-center gap-2 hover:bg-white/12"
          >
            <Avatar src={user?.avatar} name={user?.name || 'User'} size={32} />
            <div className="text-left leading-tight">
              <div className="text-[10px] uppercase tracking-widest text-white/55">{greet}</div>
              <div className="text-[13px] font-semibold">{user?.name?.split(' ')[0]}</div>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <button className="h-10 w-10 rounded-full glass-strong grid place-items-center hover:bg-white/12 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-tesla-red" />
            </button>
            <div className="glass-strong rounded-full px-3 h-10 flex items-center gap-1.5 text-[12px]">
              <TeslaLogo size={14} className="text-tesla-red" />
              <span className="font-semibold tracking-tight">{user?.tier}</span>
            </div>
          </div>
        </div>

        {/* Floating "energy" widget */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-32 left-4 glass-strong rounded-2xl px-3 py-2 flex items-center gap-2"
        >
          <div className="relative h-8 w-8 grid place-items-center">
            <span className="radar absolute inset-0 rounded-full" />
            <Battery className="h-4 w-4 text-emerald-300 relative" />
          </div>
          <div className="leading-tight">
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Frota próxima</div>
            <div className="text-[13px] font-semibold">12 Teslas • 0,4 km</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-32 right-4 glass-strong rounded-2xl px-3 py-2"
        >
          <div className="text-[10px] text-white/50 uppercase tracking-wider">CO₂ evitado hoje</div>
          <div className="text-[14px] font-semibold text-emerald-300 flex items-center gap-1">
            <Leaf className="h-3.5 w-3.5" /> <AnimatedNumber value={2.4} decimals={1} suffix=" kg" />
          </div>
        </motion.div>
      </div>

      {/* Bottom sheet */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative -mt-8 glass-strong rounded-t-[32px] px-5 pt-3 pb-6"
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

        <button
          onClick={() => navigate('/search')}
          className="w-full glass rounded-2xl h-14 px-4 flex items-center gap-3 hover:bg-white/8 transition"
        >
          <Search className="h-5 w-5 text-white/60" />
          <span className="text-[15px] text-white/55">Digite o destino…</span>
          <span className="ml-auto text-[11px] glass px-2 py-0.5 rounded-md text-white/70">Agora</span>
        </button>

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
              onClick={() => {
                setDropoff(label);
                navigate('/search');
              }}
              className="aspect-square glass rounded-2xl flex flex-col items-center justify-center gap-1 hover:bg-white/8"
            >
              <Icon className="h-5 w-5 text-tesla-red" />
              <span className="text-[11px] font-medium">{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Recent / saved */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-widest text-white/45">Sugestões</span>
            <button className="text-[11px] text-tesla-red font-semibold">Ver tudo</button>
          </div>
          <div className="space-y-1.5">
            {[...recentSearches, savedPlaces[2]].slice(0, 4).map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setDropoff(p.label);
                  navigate('/search');
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
              </button>
            ))}
          </div>
        </div>

        {/* Impact card */}
        <Card
          interactive
          onClick={() => navigate('/sustainability')}
          className="mt-5 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 grid place-items-center">
              <Leaf className="h-5 w-5 text-emerald-300" />
            </div>
            <div className="flex-1">
              <div className="text-[12px] text-white/60">Seu impacto positivo</div>
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
              <div className="text-[12px] text-white/60">Você está treinando a IA</div>
              <div className="text-[18px] font-semibold">
                <AnimatedNumber value={userImpact.fsdDataMinutes} suffix=" min de dados FSD" />
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-white/40" />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Boa madrugada';
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}
