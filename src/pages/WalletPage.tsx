import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Gift, Plus, CreditCard, Check, Sparkles } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Card from '../components/ui/Card';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import Button from '../components/ui/Button';
import Sheet from '../components/ui/Sheet';
import { useWalletStore } from '../stores/walletStore';
import TeslaLogo from '../components/ui/TeslaLogo';

export default function WalletPage() {
  const { balance, credits, methods, transactions, topUp, setPrimary } = useWalletStore();
  const [openTopUp, setOpenTopUp] = useState(false);
  const [amount, setAmount] = useState(50);

  return (
    <div className="min-h-[100dvh]">
      <TopBar title="Carteira" />

      <div className="px-4 mt-3 space-y-3">
        {/* Tesla Pay Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl p-5 overflow-hidden bg-gradient-to-br from-tesla-red via-tesla-red-deep to-tesla-black border border-white/10 shadow-card"
        >
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-scan" />
          <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TeslaLogo size={18} />
                <span className="text-[11px] uppercase tracking-[0.3em] font-semibold">Tesla Pay</span>
              </div>
              <span className="text-[10px] text-white/70 tracking-widest uppercase">Founders</span>
            </div>
            <div className="mt-8">
              <div className="text-[11px] uppercase tracking-widest text-white/70">Saldo disponível</div>
              <div className="text-4xl font-semibold tracking-tight mt-1 tabular-nums">
                <AnimatedNumber value={balance} decimals={2} prefix="R$ " />
              </div>
              <div className="text-[11px] text-white/70 mt-1">
                + <AnimatedNumber value={credits} suffix=" créditos Tesla" /> ≈ R$ {(credits * 1.2).toFixed(2).replace('.',',')}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-[11px] tracking-[0.3em] text-white/80">•••• •••• •••• 4421</span>
              <span className="text-[11px] text-white/80">12/29</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-2">
          <ActionTile icon={<Plus className="h-4 w-4" />} label="Recarregar" onClick={() => setOpenTopUp(true)} />
          <ActionTile icon={<Gift className="h-4 w-4" />} label="Cupom" />
          <ActionTile icon={<ArrowUpRight className="h-4 w-4" />} label="Enviar" />
        </div>

        {/* Methods */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-widest text-white/45">Métodos de pagamento</span>
            <button className="text-[12px] text-tesla-red font-semibold">+ Adicionar</button>
          </div>
          <div className="space-y-1">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setPrimary(m.id)}
                className={[
                  'w-full flex items-center gap-3 p-3 rounded-2xl border transition',
                  m.primary ? 'bg-tesla-red/10 border-tesla-red/30' : 'bg-white/4 border-white/10 hover:bg-white/8'
                ].join(' ')}
              >
                <div className="h-9 w-9 rounded-xl bg-white/8 grid place-items-center">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[13px] font-semibold">{m.brand}</div>
                  <div className="text-[11px] text-white/55">•••• {m.last4} • {m.holder}</div>
                </div>
                {m.primary && (
                  <span className="text-tesla-red"><Check className="h-4 w-4" /></span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Promo */}
        <Card className="bg-gradient-to-br from-amber-400/10 to-transparent border-amber-400/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-400/20 grid place-items-center">
              <Sparkles className="h-5 w-5 text-amber-300" />
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold">5 viagens com 20% off</div>
              <div className="text-[11px] text-white/55">Cashback aplicado automaticamente • válido até 30/05</div>
            </div>
          </div>
        </Card>

        {/* Transactions */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] uppercase tracking-widest text-white/45">Transações</span>
            <button className="text-[12px] text-tesla-red font-semibold">Ver tudo</button>
          </div>
          <Card glass={false} className="!p-1">
            {transactions.map((t, i) => (
              <div
                key={t.id}
                className={[
                  'flex items-center gap-3 px-3 py-3',
                  i < transactions.length - 1 ? 'border-b border-white/5' : ''
                ].join(' ')}
              >
                <div className={[
                  'h-9 w-9 rounded-xl grid place-items-center',
                  t.amount > 0 ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/8 text-white/70'
                ].join(' ')}>
                  {t.amount > 0 ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium truncate">{t.label}</div>
                  <div className="text-[10px] text-white/45">{formatDate(t.date)}</div>
                </div>
                <div className={[
                  'text-[14px] font-semibold tabular-nums',
                  t.amount > 0 ? 'text-emerald-300' : ''
                ].join(' ')}>
                  {t.amount > 0 ? '+' : '-'}R$ {Math.abs(t.amount).toFixed(2).replace('.',',')}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <Sheet open={openTopUp} onClose={() => setOpenTopUp(false)} title="Recarregar saldo">
        <p className="text-sm text-white/60">Selecione um valor para recarregar.</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[20, 50, 100, 200, 500, 1000].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(v)}
              className={[
                'h-12 rounded-xl border text-[13px] font-semibold transition',
                amount === v
                  ? 'bg-tesla-red text-white border-tesla-red shadow-glow'
                  : 'bg-white/4 border-white/10 hover:bg-white/8'
              ].join(' ')}
            >
              R$ {v}
            </button>
          ))}
        </div>
        <Button
          block
          size="lg"
          className="mt-4"
          onClick={() => {
            topUp(amount);
            setOpenTopUp(false);
          }}
        >
          Recarregar R$ {amount}
        </Button>
      </Sheet>
    </div>
  );
}

function ActionTile({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="aspect-square glass rounded-2xl flex flex-col items-center justify-center gap-1 hover:bg-white/8 transition"
    >
      <div className="h-9 w-9 rounded-xl bg-tesla-red/15 text-tesla-red grid place-items-center">
        {icon}
      </div>
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}
