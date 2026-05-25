import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Fingerprint } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('alex@tesla.com');
  const [password, setPassword] = useState('teslarocks');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email);
      navigate('/home', { replace: true });
    }, 900);
  };

  return (
    <div className="px-6 mt-8 pb-safe">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Entre na sua conta.
        </h1>
        <p className="text-white/55 text-sm mt-2 text-balance">
          Acesse o ecossistema Tesla de mobilidade urbana.
        </p>
      </motion.div>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <Field
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="seu@email.com"
        />
        <Field
          icon={<Lock className="h-4 w-4" />}
          label="Senha"
          value={password}
          onChange={setPassword}
          type={show ? 'text' : 'password'}
          placeholder="••••••••"
          rightSlot={
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="text-white/55 hover:text-white"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <div className="flex items-center justify-between text-[12px]">
          <label className="flex items-center gap-2 text-white/60">
            <input type="checkbox" defaultChecked className="accent-tesla-red" />
            Lembrar dispositivo
          </label>
          <button type="button" className="text-tesla-red hover:underline">
            Esqueci a senha
          </button>
        </div>

        <Button block size="xl" loading={loading}>
          Entrar
        </Button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl glass text-sm font-medium hover:bg-white/8"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              login(email);
              navigate('/home', { replace: true });
            }, 600);
          }}
        >
          <Fingerprint className="h-5 w-5 text-tesla-red" />
          Continuar com Face ID
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-white/55">
        Não tem conta?{' '}
        <Link to="/register" className="text-tesla-red font-semibold">
          Criar conta
        </Link>
      </div>

      <div className="mt-12 text-center text-[10px] text-white/30 tracking-widest uppercase">
        © 2026 Tesla Mobility Solutions
      </div>
    </div>
  );
}

interface FieldProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  rightSlot?: React.ReactNode;
}

function Field({ icon, label, value, onChange, type = 'text', placeholder, rightSlot }: FieldProps) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1.5 px-1">
        {label}
      </div>
      <div className="glass rounded-2xl h-14 px-4 flex items-center gap-3 focus-within:ring-tesla transition">
        {icon && <div className="text-white/50">{icon}</div>}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-white/30"
        />
        {rightSlot}
      </div>
    </label>
  );
}
