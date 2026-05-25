import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Leaf, Zap, MapPin, Sparkles } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import { useRideStore } from '../stores/rideStore';
import { useWalletStore } from '../stores/walletStore';
import Avatar from '../components/ui/Avatar';
import Pill from '../components/ui/Pill';

export default function RideSummaryPage() {
  const navigate = useNavigate();
  const { driver, request, resetRide } = useRideStore();
  const spend = useWalletStore((s) => s.spend);
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState(0);
  const fare = request.category
    ? request.estimatedKm * request.category.pricePerKm + request.category.base
    : request.fare;
  const total = fare + tip;

  const finish = () => {
    spend(total, `Tesla UrbanRide • ${request.dropoff}`);
    resetRide();
    navigate('/home', { replace: true });
  };

  return (
    <div className="min-h-[100dvh]">
      <TopBar title="Resumo da viagem" back />

      <div className="px-4 mt-3 space-y-3">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-strong rounded-3xl p-5 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="relative">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-tesla-red/15 ring-tesla grid place-items-center mb-3">
              <Sparkles className="h-6 w-6 text-tesla-red" />
            </div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/55">Viagem concluída</div>
            <div className="text-4xl font-semibold mt-1 tabular-nums text-gradient-red">
              <AnimatedNumber value={total} decimals={2} prefix="R$ " />
            </div>
            <div className="text-[12px] text-white/55 mt-1">
              {request.estimatedKm.toFixed(1)} km • {request.estimatedMinutes} min
            </div>
          </div>
        </motion.div>

        {/* Impact */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-emerald-500/15 to-transparent border-emerald-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="h-4 w-4 text-emerald-300" />
              <span className="text-[11px] uppercase tracking-widest text-emerald-300">CO₂ evitado</span>
            </div>
            <div className="text-xl font-semibold">
              <AnimatedNumber value={request.co2SavedKg} decimals={1} suffix=" kg" />
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-tesla-red/15 to-transparent border-tesla-red/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-tesla-red" />
              <span className="text-[11px] uppercase tracking-widest text-tesla-red">Energia</span>
            </div>
            <div className="text-xl font-semibold">
              <AnimatedNumber value={Math.round(request.estimatedKm * 0.18 * 10) / 10} decimals={1} suffix=" kWh" />
            </div>
          </Card>
        </div>

        {/* Route */}
        <Card>
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center pt-1">
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
              <div className="h-8 w-[2px] bg-white/20 my-1" />
              <MapPin className="h-4 w-4 text-tesla-red" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/45">Origem</div>
                <div className="text-[14px] font-medium">{request.pickup}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/45">Destino</div>
                <div className="text-[14px] font-semibold">{request.dropoff}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Driver rating */}
        {driver && (
          <Card>
            <div className="flex items-center gap-3">
              <Avatar src={driver.avatar} name={driver.name} size={48} ring />
              <div className="flex-1">
                <div className="text-[14px] font-semibold">{driver.name}</div>
                <div className="text-[11px] text-white/55">{driver.carModel}</div>
              </div>
              <Pill tone="amber">
                <Star className="h-3 w-3" /> {driver.rating}
              </Pill>
            </div>
            <div className="mt-4">
              <div className="text-[11px] uppercase tracking-widest text-white/45 mb-2">
                Como foi sua viagem?
              </div>
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setRating(s)} className="p-1">
                    <Star
                      className={[
                        'h-7 w-7 transition-colors',
                        s <= rating ? 'fill-amber-300 text-amber-300' : 'text-white/20'
                      ].join(' ')}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-[11px] uppercase tracking-widest text-white/45 mb-2">
                Adicione uma gorjeta
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 3, 5, 10].map((v) => (
                  <button
                    key={v}
                    onClick={() => setTip(v)}
                    className={[
                      'h-10 rounded-xl text-[13px] font-semibold border transition',
                      tip === v
                        ? 'bg-tesla-red text-white border-tesla-red shadow-glow'
                        : 'bg-white/4 border-white/10 hover:bg-white/8'
                    ].join(' ')}
                  >
                    {v === 0 ? 'Sem' : `+R$${v}`}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Fare breakdown */}
        <Card>
          <div className="text-[11px] uppercase tracking-widest text-white/45 mb-2">Tarifa</div>
          <div className="space-y-1.5 text-[13px]">
            <Line label="Tarifa base" value={request.category?.base ?? 0} />
            <Line label={`${request.estimatedKm.toFixed(1)} km`} value={(request.category?.pricePerKm ?? 0) * request.estimatedKm} />
            <Line label="Cashback Tesla" value={-Math.round(fare * 0.05 * 100) / 100} accent />
            {tip > 0 && <Line label="Gorjeta motorista" value={tip} />}
            <hr className="border-white/10 my-2" />
            <div className="flex items-center justify-between text-[14px] font-semibold">
              <span>Total</span>
              <span className="tabular-nums">R$ {(total - Math.round(fare * 0.05 * 100) / 100).toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="text-[10px] text-white/45">Pago via Tesla Pay •••• 4421</div>
          </div>
        </Card>

        <div className="pb-6">
          <Button block size="xl" onClick={finish}>
            Concluir
          </Button>
        </div>
      </div>
    </div>
  );
}

function Line({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/55">{label}</span>
      <span className={['tabular-nums', accent ? 'text-emerald-300' : ''].join(' ')}>
        {value < 0 ? '-' : ''}R$ {Math.abs(value).toFixed(2).replace('.', ',')}
      </span>
    </div>
  );
}
