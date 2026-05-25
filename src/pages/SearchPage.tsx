import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Circle, MapPin, X, Clock, Star, CreditCard, Sparkles } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import MapSimulation from '../components/map/MapSimulation';
import CategoryCard from '../components/ride/CategoryCard';
import Button from '../components/ui/Button';
import Pill from '../components/ui/Pill';
import { rideCategories } from '../mock/categories';
import { savedPlaces, recentSearches } from '../mock/places';
import { useRideStore } from '../stores/rideStore';
import { pickDriver } from '../mock/drivers';

type Step = 'destination' | 'category';

export default function SearchPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('destination');
  const [query, setQuery] = useState('');
  const { request, setPickup, setDropoff, setCategory, setStatus, assignDriver } = useRideStore();
  const [selected, setSelected] = useState<string | null>(rideCategories[1].id);

  const filtered = useMemo(() => {
    const all = [...savedPlaces, ...recentSearches];
    if (!query.trim()) return all.slice(0, 6);
    return all.filter((p) =>
      (p.label + ' ' + p.address).toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    if (request.dropoff && step === 'destination') {
      setQuery(request.dropoff);
    }
  }, []);

  const chooseDestination = (label: string, address?: string) => {
    setDropoff(label);
    if (address) {
      // include short address as visual continuity
    }
    setStep('category');
  };

  const confirm = () => {
    const cat = rideCategories.find((c) => c.id === selected);
    if (cat) setCategory(cat);
    setStatus('searching');
    assignDriver(pickDriver());
    navigate('/ride');
  };

  return (
    <div className="relative min-h-[100dvh]">
      <TopBar title={step === 'destination' ? 'Para onde?' : 'Escolha sua categoria'} back />

      {step === 'destination' && (
        <div className="px-4 mt-3 space-y-4">
          <div className="glass rounded-2xl p-3 space-y-2">
            <div className="flex items-center gap-3 px-2 h-12 rounded-xl bg-white/4">
              <Circle className="h-3 w-3 fill-emerald-400 text-emerald-400" />
              <input
                defaultValue={request.pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-white/30"
                placeholder="Origem"
              />
              <span className="text-[10px] text-white/40 uppercase">Origem</span>
            </div>
            <div className="flex items-center gap-3 px-2 h-12 rounded-xl bg-white/4 ring-1 ring-tesla-red/40">
              <MapPin className="h-4 w-4 text-tesla-red" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Para onde vamos?"
                autoFocus
                className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-white/30"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-white/55">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <Pill tone="red">
              <Sparkles className="h-3 w-3" /> Sugestões IA
            </Pill>
            <Pill>
              <Clock className="h-3 w-3" /> Agendar
            </Pill>
            <Pill>
              <Star className="h-3 w-3" /> Favoritos
            </Pill>
          </div>

          <div className="space-y-1">
            {filtered.length === 0 && (
              <div className="text-center text-white/50 text-sm py-8">
                Nenhum resultado para "{query}"
              </div>
            )}
            {filtered.map((p) => (
              <motion.button
                key={p.id}
                whileTap={{ scale: 0.985 }}
                onClick={() => chooseDestination(p.label, p.address)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition"
              >
                <div className="h-10 w-10 rounded-xl bg-white/8 grid place-items-center">
                  <Search className="h-4 w-4 text-white/70" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-[14px] font-medium truncate">{p.label}</div>
                  <div className="text-[11px] text-white/50 truncate">{p.address}</div>
                </div>
                {p.type === 'tesla' && (
                  <span className="text-[10px] text-tesla-red font-semibold tracking-widest">TESLA</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {step === 'category' && (
        <>
          <div className="relative h-[36dvh] min-h-[260px] mx-4 mt-3 rounded-3xl overflow-hidden">
            <MapSimulation variant="request" showRoute className="absolute inset-0" />
            <div className="absolute inset-x-3 bottom-3 glass-strong rounded-2xl p-3">
              <div className="flex items-center gap-2 text-[12px]">
                <Circle className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
                <span className="truncate">{request.pickup}</span>
              </div>
              <div className="h-3 ml-[5px] border-l border-dashed border-white/25" />
              <div className="flex items-center gap-2 text-[12px]">
                <MapPin className="h-3 w-3 text-tesla-red" />
                <span className="truncate font-semibold">{request.dropoff}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[10px] text-white/50">
                <span>{request.estimatedKm.toFixed(1)} km</span>
                <span>•</span>
                <span>{request.estimatedMinutes} min</span>
                <span>•</span>
                <span>chegada {arrivalEta(request.estimatedMinutes)}</span>
              </div>
            </div>
          </div>

          <div className="px-4 mt-4 space-y-2">
            {rideCategories.map((cat) => {
              const fare = Math.round((request.estimatedKm * cat.pricePerKm + cat.base) * 10) / 10;
              return (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  selected={selected === cat.id}
                  onSelect={() => setSelected(cat.id)}
                  fare={fare}
                />
              );
            })}
          </div>

          <div className="px-4 mt-4 mb-6 space-y-3">
            <div className="glass rounded-2xl p-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/8 grid place-items-center">
                <CreditCard className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-[12px] text-white/55">Pagamento</div>
                <div className="text-[14px] font-semibold">Tesla Pay •••• 4421</div>
              </div>
              <button className="text-[12px] text-tesla-red font-semibold">Alterar</button>
            </div>

            <Button block size="xl" onClick={confirm}>
              Solicitar Tesla
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function arrivalEta(minutes: number) {
  const d = new Date(Date.now() + minutes * 60000);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
