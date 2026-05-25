import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Presentation, ArrowRight, ArrowLeft, TrendingUp, Leaf, Brain, Car, Globe, Zap } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

const slides = [
  {
    tag: '01 — Problema',
    title: 'Mobilidade urbana ainda polui muito.',
    body: 'O transporte responde por 27% das emissões globais de CO₂. Em São Paulo, 3,2 mi de carros particulares percorrem 40 mi de km/dia.',
    metric: { value: 27, suffix: '%', label: 'emissões de CO₂ pelo transporte', icon: <Leaf className="h-6 w-6 text-red-400" /> },
    color: 'from-red-500/20'
  },
  {
    tag: '02 — Solução',
    title: 'Tesla UrbanRide: frota 100% elétrica.',
    body: 'Uma rede de Teslas verificadas com motoristas parceiros certificados, cobrindo São Paulo e 11 outras cidades brasileiras.',
    metric: { value: 1842, suffix: '', label: 'Teslas ativas agora mesmo', icon: <Car className="h-6 w-6 text-tesla-red" /> },
    color: 'from-tesla-red/20'
  },
  {
    tag: '03 — Diferencial',
    title: 'Treinando o FSD enquanto opera.',
    body: 'Cada viagem alimenta o Dojo. Os dados coletados hoje constroem a IA autônoma do amanhã — sem custo extra para o usuário.',
    metric: { value: 1208314, suffix: '', label: 'milhas de dados FSD coletados', icon: <Brain className="h-6 w-6 text-sky-300" /> },
    color: 'from-sky-500/20'
  },
  {
    tag: '04 — Mercado',
    title: 'Mobilidade elétrica: R$ 180 bi até 2030.',
    body: 'Brasil é o 5º maior mercado de ride-hailing do mundo. Taxa de crescimento de EVs: +84% a.a. Janela de entrada: agora.',
    metric: { value: 180, suffix: ' bi', label: 'mercado estimado em BRL — 2030', icon: <TrendingUp className="h-6 w-6 text-emerald-300" /> },
    color: 'from-emerald-500/20'
  },
  {
    tag: '05 — Impacto',
    title: 'Cada viagem já é positiva.',
    body: 'CO₂ zero + dados FSD + cashback para o usuário + renda para o motorista + energia renovável. Um ecossistema virtuoso.',
    metric: { value: 184, suffix: ' kg', label: 'CO₂ evitado por usuário/mês', icon: <Globe className="h-6 w-6 text-emerald-300" /> },
    color: 'from-emerald-600/25'
  },
  {
    tag: '06 — Tração',
    title: 'Crescendo rápido. Produto real.',
    body: '18.420 viagens hoje. 99,97% de uptime. NPS médio 82. 142 viagens por usuário ativo. Modelo de dados já patenteado.',
    metric: { value: 18420, suffix: '', label: 'viagens completadas hoje', icon: <Zap className="h-6 w-6 text-amber-300" /> },
    color: 'from-amber-500/20'
  }
];

export default function PitchMode() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const slide = slides[idx];
  const isFirst = idx === 0;
  const isLast = idx === slides.length - 1;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-28 left-4 z-40 h-12 px-4 rounded-full glass-strong border border-white/15 flex items-center gap-2 text-[12px] font-semibold hover:bg-white/10 transition"
      >
        <Presentation className="h-4 w-4 text-tesla-red" />
        Pitch Mode
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-tesla-black/96 backdrop-blur-2xl flex flex-col items-center justify-center px-6"
          >
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
            <div className={`absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gradient-to-br ${slide.color} via-transparent blur-3xl pointer-events-none`} />

            <button
              onClick={() => setOpen(false)}
              className="absolute top-safe top-4 right-4 h-10 w-10 rounded-full glass grid place-items-center text-white/70 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Slide counter */}
            <div className="absolute top-safe top-4 left-4 flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={['h-1.5 rounded-full transition-all', i === idx ? 'w-6 bg-tesla-red' : 'w-1.5 bg-white/20'].join(' ')}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[360px] mx-auto text-center"
              >
                <div className="text-[10px] uppercase tracking-[0.4em] text-tesla-red mb-4">
                  {slide.tag}
                </div>
                <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-balance mb-4">
                  {slide.title}
                </h2>
                <p className="text-[14px] text-white/65 leading-relaxed text-balance mb-10">
                  {slide.body}
                </p>

                <div className={`glass-strong rounded-3xl p-6 border bg-gradient-to-br ${slide.color} border-white/10`}>
                  <div className="flex justify-center mb-2">{slide.metric.icon}</div>
                  <div className="text-5xl font-semibold tabular-nums text-gradient-red">
                    <AnimatedNumber value={slide.metric.value} suffix={slide.metric.suffix} duration={1000} />
                  </div>
                  <div className="text-[12px] text-white/55 mt-2">{slide.metric.label}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="absolute bottom-safe bottom-8 flex items-center gap-4 w-full max-w-[360px] px-6">
              <button
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
                disabled={isFirst}
                className="h-12 w-12 rounded-full glass grid place-items-center disabled:opacity-30 hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex-1 text-center text-[11px] text-white/40">
                {idx + 1} / {slides.length}
              </div>
              <button
                onClick={() => (isLast ? setOpen(false) : setIdx((i) => i + 1))}
                className="h-12 w-12 rounded-full bg-tesla-red text-white grid place-items-center shadow-glow hover:bg-tesla-red-soft"
              >
                {isLast ? <X className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
