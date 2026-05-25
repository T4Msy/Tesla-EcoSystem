import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, Sparkles, Brain, Zap } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  ts: number;
}

const RESPONSES: Record<string, string> = {
  default:
    'Olá! Sou a Tesla AI, assistente de mobilidade do UrbanRide. Posso te ajudar com rotas, economia, informações sobre FSD ou qualquer dúvida sobre sua viagem.',
  preco:
    'O UrbanRide tem tarifas a partir de R$ 8,90 + R$ 3,80/km. O Comfort parte de R$ 12,90 e o Black de R$ 24,90. Todas as viagens incluem cashback automático de 5%.',
  fsd:
    'O Full Self Driving v13 está em fase supervisionada em São Paulo. Nossos motoristas treinados coletam dados que alimentam o Dojo da Tesla. Em Q3/2026 abriremos o Beta autônomo.',
  economia:
    'Dirigir 1.500 km/mês num veículo elétrico Tesla custa cerca de R$ 194 vs R$ 750 em gasolina — uma economia de R$ 556/mês ou R$ 6.672/ano.',
  sustentabilidade:
    'Cada viagem UrbanRide é abastecida por 72% de energia solar + eólica. Em 2026, compensamos 110% das emissões de CO₂ equivalentes a veículos a combustão.',
  motorista:
    'Para ser motorista parceiro você precisa de: CNH categoria B há mais de 2 anos, zero multas graves e passar no treinamento Tesla Certified Driver. A renda média é R$ 364/dia.',
  supercharger:
    'São Paulo já possui 64 Superchargers Tesla ativos. O mais próximo de você está na R. Funchal, 65 (Vila Olímpia) com 8 stalls V3 de 250kW. Recarga de 0→80% em 25 min.',
  seguranca:
    'Toda viagem UrbanRide é monitorada em tempo real por câmeras 360°, GPS tracker e frenagem automática. Temos botão SOS integrado direto ao painel Tesla e parceria com a SSP-SP.',
  tempo:
    'O UrbanRide usa dados de tráfego em tempo real do mapa Tesla para calcular o ETA mais preciso. A precisão média é de ±90 segundos.',
  pagamento:
    'Aceitamos Tesla Pay (carteira integrada), Pix, Visa, Mastercard e crédito Tesla. O Tesla Pay oferece cashback de 5% e créditos que valem 20% a mais em viagens FSD.'
};

function getResponse(input: string): string {
  const low = input.toLowerCase();
  if (low.includes('preço') || low.includes('custo') || low.includes('valor') || low.includes('tarif')) return RESPONSES.preco;
  if (low.includes('fsd') || low.includes('autônom') || low.includes('ia') || low.includes('intelig')) return RESPONSES.fsd;
  if (low.includes('econom') || low.includes('economiz') || low.includes('gasolina')) return RESPONSES.economia;
  if (low.includes('sustent') || low.includes('verde') || low.includes('co2') || low.includes('carb')) return RESPONSES.sustentabilidade;
  if (low.includes('motorista') || low.includes('dirigir') || low.includes('parceiro') || low.includes('ganhar')) return RESPONSES.motorista;
  if (low.includes('supercharger') || low.includes('recarga') || low.includes('bateria') || low.includes('carrega')) return RESPONSES.supercharger;
  if (low.includes('segur') || low.includes('camera') || low.includes('sos') || low.includes('emerg')) return RESPONSES.seguranca;
  if (low.includes('tempo') || low.includes('eta') || low.includes('minuto') || low.includes('chega')) return RESPONSES.tempo;
  if (low.includes('pag') || low.includes('cartão') || low.includes('pix') || low.includes('wallet')) return RESPONSES.pagamento;
  return RESPONSES.default;
}

const SUGGESTIONS = [
  'Qual o preço do UrbanRide?',
  'Como funciona o FSD?',
  'Quero ser motorista',
  'Onde fica o Supercharger?'
];

export default function TeslaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      text: RESPONSES.default,
      ts: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: `u_${Date.now()}`, role: 'user', text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: `a_${Date.now()}`, role: 'assistant', text: getResponse(text), ts: Date.now() }
      ]);
    }, 900 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-28 right-4 z-40 h-14 w-14 rounded-full bg-tesla-red text-white shadow-glow grid place-items-center"
            aria-label="Tesla AI"
          >
            <Brain className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-tesla-black ring-2 ring-tesla-red grid place-items-center">
              <Sparkles className="h-2.5 w-2.5 text-tesla-red" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/30"
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 32, stiffness: 300 }}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 glass-strong rounded-t-[28px] border-t border-white/10 shadow-card"
              style={{ maxHeight: '78dvh' }}
            >
              {/* Header */}
              <div className="px-5 pt-4 pb-3 flex items-center gap-3 border-b border-white/8">
                <div className="relative h-10 w-10 grid place-items-center">
                  <div className="absolute inset-0 rounded-full bg-tesla-red/25 blur-md animate-pulse" />
                  <div className="h-10 w-10 rounded-full bg-tesla-red/15 ring-tesla grid place-items-center relative">
                    <Brain className="h-5 w-5 text-tesla-red" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold">Tesla AI</div>
                  <div className="text-[10px] text-white/50 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Powered by Dojo v3
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-full bg-white/8 grid place-items-center hover:bg-white/15"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: '42dvh' }}>
                {messages.map((m) => (
                  <div key={m.id} className={['flex', m.role === 'user' ? 'justify-end' : 'justify-start'].join(' ')}>
                    <div
                      className={[
                        'max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed',
                        m.role === 'user'
                          ? 'bg-tesla-red text-white rounded-br-md'
                          : 'glass rounded-bl-md text-white/90'
                      ].join(' ')}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                      {[0, 0.2, 0.4].map((d) => (
                        <motion.div
                          key={d}
                          animate={{ y: [-3, 3, -3] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: d }}
                          className="h-2 w-2 rounded-full bg-white/60"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Suggestions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="shrink-0 px-3 h-8 glass rounded-full text-[11px] font-medium hover:bg-white/8 flex items-center gap-1"
                    >
                      <Zap className="h-3 w-3 text-tesla-red" />
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="px-4 pb-safe pb-4 flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte à Tesla AI…"
                  className="flex-1 glass rounded-2xl h-11 px-3.5 text-[14px] bg-transparent outline-none placeholder:text-white/35 focus:ring-tesla"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="h-11 w-11 rounded-2xl bg-tesla-red text-white grid place-items-center shadow-glow disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
