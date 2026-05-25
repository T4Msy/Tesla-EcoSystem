import { AnimatePresence, motion } from 'framer-motion';
import { X, Zap, Shield, Leaf, Car, Star, ArrowRight } from 'lucide-react';

export interface Notif {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  time: string;
  accent?: string;
  read?: boolean;
}

const defaultNotifs: Notif[] = [
  {
    id: 'n1',
    icon: <Car className="h-4 w-4 text-tesla-red" />,
    title: 'Tesla UrbanRide Comfort',
    body: 'Sua viagem de ontem recebeu avaliação 5 estrelas de Camila Andrade.',
    time: 'agora há pouco',
    accent: 'bg-tesla-red/15'
  },
  {
    id: 'n2',
    icon: <Zap className="h-4 w-4 text-amber-300" />,
    title: 'Cashback Tesla Pay',
    body: 'R$ 4,30 de cashback creditados na sua carteira.',
    time: '22 min atrás',
    accent: 'bg-amber-500/10'
  },
  {
    id: 'n3',
    icon: <Leaf className="h-4 w-4 text-emerald-300" />,
    title: 'Impacto climático',
    body: 'Você evitou 184 kg de CO₂ este mês. Equivale a 9 árvores plantadas.',
    time: '2h atrás',
    accent: 'bg-emerald-500/10'
  },
  {
    id: 'n4',
    icon: <Shield className="h-4 w-4 text-sky-300" />,
    title: 'Verificação Tesla Pass',
    body: 'Seu perfil Founders foi verificado. Acesso premium ativo.',
    time: '1 dia atrás',
    accent: 'bg-sky-500/10',
    read: true
  },
  {
    id: 'n5',
    icon: <Star className="h-4 w-4 text-amber-300" />,
    title: 'Oferta exclusiva Founders',
    body: '5 próximas viagens com 25% de desconto. Válido até 30/05.',
    time: '1 dia atrás',
    accent: 'bg-amber-500/10',
    read: true
  }
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 glass-strong border-b border-white/10 rounded-b-3xl shadow-card"
          >
            <div className="pt-safe px-5 pb-4">
              <div className="flex items-center justify-between pt-3 mb-4">
                <div>
                  <div className="text-[15px] font-semibold">Notificações</div>
                  <div className="text-[11px] text-white/50">
                    {defaultNotifs.filter((n) => !n.read).length} não lidas
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[11px] text-tesla-red font-semibold">Marcar lidas</button>
                  <button
                    onClick={onClose}
                    className="h-8 w-8 rounded-full bg-white/8 grid place-items-center hover:bg-white/15"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-[70dvh] overflow-y-auto -mx-1 px-1">
                {defaultNotifs.map((n) => (
                  <motion.div
                    key={n.id}
                    whileTap={{ scale: 0.985 }}
                    className={[
                      'flex items-start gap-3 p-3 rounded-2xl cursor-pointer transition',
                      n.read ? 'opacity-55' : '',
                      n.accent || 'bg-white/4'
                    ].join(' ')}
                  >
                    <div className="h-9 w-9 rounded-xl bg-white/8 grid place-items-center shrink-0">
                      {n.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[13px] font-semibold truncate">{n.title}</div>
                        {!n.read && (
                          <span className="h-1.5 w-1.5 rounded-full bg-tesla-red shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-white/65 mt-0.5 leading-relaxed">{n.body}</div>
                      <div className="text-[10px] text-white/40 mt-1">{n.time}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/30 shrink-0 mt-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
