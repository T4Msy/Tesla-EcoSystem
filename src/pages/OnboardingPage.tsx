import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Leaf, Zap, Brain, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import StatusBar from '../components/ui/StatusBar';
import TeslaLogo from '../components/ui/TeslaLogo';
import CarSilhouette from '../components/map/CarSilhouette';
import { useAuthStore } from '../stores/authStore';

const slides = [
  {
    title: 'Bem-vindo ao futuro\nda mobilidade urbana.',
    description:
      'Uma frota 100% elétrica Tesla, motoristas verificados e tecnologia de direção autônoma supervisionada.',
    icon: Zap,
    accent: 'Welcome',
    silhouette: 'modelS' as const
  },
  {
    title: 'Zero emissão.\nZero compromissos.',
    description:
      'Cada viagem é alimentada por energia 100% renovável da rede Tesla Supercharger.',
    icon: Leaf,
    accent: 'Sustainability',
    silhouette: 'modelY' as const
  },
  {
    title: 'Treinando o\nFull Self Driving.',
    description:
      'Suas viagens ajudam a aprimorar a IA da Tesla. Quando o FSD chegar, você já estará dentro.',
    icon: Brain,
    accent: 'AI',
    silhouette: 'model3' as const
  },
  {
    title: 'Segurança Tesla\nem cada viagem.',
    description:
      'Monitoramento 24/7, frenagem automática, câmeras de 360° e botão SOS conectado direto à Tesla.',
    icon: Shield,
    accent: 'Safety',
    silhouette: 'cybertruck' as const
  }
];

export default function OnboardingPage() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const isLast = i === slides.length - 1;
  const slide = slides[i];
  const Icon = slide.icon;

  const finish = () => {
    completeOnboarding();
    navigate('/login');
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-tesla-black">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-tesla-red/20 blur-3xl pointer-events-none" />
      <StatusBar />
      <div className="px-6 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/90">
          <TeslaLogo size={20} />
          <span className="text-sm font-semibold">UrbanRide</span>
        </div>
        <button
          className="text-[12px] text-white/55 hover:text-white"
          onClick={finish}
        >
          Pular
        </button>
      </div>

      <div className="relative px-6 mt-6">
        <div className="aspect-[5/4] rounded-3xl glass relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-tesla-red/80 to-transparent animate-scan" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-tesla-red mb-3">
                {slide.accent}
              </div>
              <div className="h-16 w-16 rounded-2xl bg-tesla-red/15 ring-tesla grid place-items-center mb-6">
                <Icon className="h-7 w-7 text-tesla-red" />
              </div>
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full"
              >
                <CarSilhouette type={slide.silhouette} className="w-full max-w-[260px] mx-auto drop-shadow-[0_8px_30px_rgba(232,33,39,0.4)]" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="px-6 mt-8 text-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={`title-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-[26px] font-semibold leading-tight whitespace-pre-line text-balance"
          >
            {slide.title}
          </motion.h2>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 text-[14px] text-white/60 leading-relaxed text-balance"
          >
            {slide.description}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="px-6 mt-8 flex items-center justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={[
              'h-1.5 rounded-full transition-all',
              idx === i ? 'w-8 bg-tesla-red shadow-glow' : 'w-2 bg-white/20'
            ].join(' ')}
          />
        ))}
      </div>

      <div className="px-6 mt-10 pb-safe pb-8">
        <Button
          variant="primary"
          size="xl"
          block
          icon={<ArrowRight className="h-5 w-5" />}
          onClick={() => (isLast ? finish() : setI(i + 1))}
        >
          {isLast ? 'Começar agora' : 'Continuar'}
        </Button>
      </div>
    </div>
  );
}
