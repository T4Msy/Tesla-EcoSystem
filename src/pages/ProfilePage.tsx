import { useNavigate } from 'react-router-dom';
import { ChevronRight, Settings, Shield, Heart, Bell, HelpCircle, LogOut, Car, Award } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Avatar from '../components/ui/Avatar';
import Card from '../components/ui/Card';
import Pill from '../components/ui/Pill';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import Button from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';
import { userImpact } from '../mock/metrics';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh]">
      <TopBar title="Perfil" right={<button className="h-10 w-10 grid place-items-center rounded-full hover:bg-white/8"><Settings className="h-4 w-4" /></button>} />

      <div className="px-4 mt-3 space-y-3">
        <Card className="text-center pt-6 pb-5 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="relative">
            <Avatar src={user?.avatar} name={user?.name || 'Usuário'} size={88} ring className="mx-auto" />
            <div className="text-xl font-semibold mt-3">{user?.name}</div>
            <div className="text-[12px] text-white/55">{user?.email}</div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <Pill tone="red">
                <Award className="h-3 w-3" />
                {user?.tier} Member
              </Pill>
              <Pill>Desde {new Date(user?.joinedAt || '').toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}</Pill>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <Stat label="Viagens" value={user?.ridesCount || 0} />
          <Stat label="Nota média" value={userImpact.averageRating} decimals={2} />
          <Stat label="km totais" value={userImpact.kmDriven} />
        </div>

        <Card
          interactive
          onClick={() => navigate('/economy')}
          className="bg-gradient-to-br from-tesla-red/15 to-transparent border-tesla-red/20"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-tesla-red/20 grid place-items-center">
              <Car className="h-5 w-5 text-tesla-red" />
            </div>
            <div className="flex-1">
              <div className="text-[12px] text-white/55">Sua economia</div>
              <div className="text-[18px] font-semibold">
                <AnimatedNumber value={userImpact.litersGasolineAvoided * 6} decimals={0} prefix="R$ " /> economizados
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-white/40" />
          </div>
        </Card>

        {/* Menu */}
        <Card glass={false} className="!p-1">
          <MenuItem icon={<Shield className="h-4 w-4" />} label="Segurança Tesla" subtitle="Monitoramento 24/7" />
          <MenuItem icon={<Heart className="h-4 w-4" />} label="Lugares favoritos" />
          <MenuItem icon={<Bell className="h-4 w-4" />} label="Notificações" />
          <MenuItem
            icon={<Car className="h-4 w-4" />}
            label="Ser motorista Tesla"
            subtitle="Acesso ao Driver Hub"
            onClick={() => navigate('/driver')}
            accent
          />
          <MenuItem icon={<HelpCircle className="h-4 w-4" />} label="Ajuda e suporte" last />
        </Card>

        <Button
          variant="ghost"
          block
          size="lg"
          icon={<LogOut className="h-4 w-4" />}
          onClick={() => {
            logout();
            navigate('/login', { replace: true });
          }}
        >
          Sair da conta
        </Button>

        <div className="text-center text-[10px] text-white/30 tracking-widest uppercase py-3">
          Tesla UrbanRide v1.0 • Build 2026.05.24
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, decimals = 0 }: { label: string; value: number; decimals?: number }) {
  return (
    <Card className="text-center !p-3">
      <div className="text-[18px] font-semibold tabular-nums">
        <AnimatedNumber value={value} decimals={decimals} />
      </div>
      <div className="text-[10px] uppercase tracking-widest text-white/50 mt-0.5">{label}</div>
    </Card>
  );
}

function MenuItem({
  icon,
  label,
  subtitle,
  last,
  onClick,
  accent
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  last?: boolean;
  onClick?: () => void;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'w-full flex items-center gap-3 px-3 py-3.5 hover:bg-white/5 transition rounded-2xl',
        last ? '' : 'border-b border-white/5'
      ].join(' ')}
    >
      <div
        className={[
          'h-9 w-9 rounded-xl grid place-items-center',
          accent ? 'bg-tesla-red/20 text-tesla-red' : 'bg-white/5 text-white/70'
        ].join(' ')}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className="text-[14px] font-medium">{label}</div>
        {subtitle && <div className="text-[11px] text-white/50">{subtitle}</div>}
      </div>
      <ChevronRight className="h-4 w-4 text-white/40" />
    </button>
  );
}
