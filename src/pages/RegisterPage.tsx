import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, User, Phone, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';

export default function RegisterPage() {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      register({ name: data.name || 'Novo Usuário', email: data.email, phone: data.phone });
      navigate('/home', { replace: true });
    }, 1100);
  };

  return (
    <div className="px-6 mt-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <h1 className="text-3xl font-semibold tracking-tight">Crie sua conta.</h1>
        <p className="text-white/55 text-sm mt-2 text-balance">
          Comece sua jornada na frota Tesla mais limpa do mundo.
        </p>
      </motion.div>

      <form onSubmit={submit} className="mt-8 space-y-3.5">
        <Field icon={<User className="h-4 w-4" />} label="Nome completo" value={data.name} onChange={(v) => setData({ ...data, name: v })} placeholder="Alex Reis" />
        <Field icon={<Mail className="h-4 w-4" />} label="Email" type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} placeholder="seu@email.com" />
        <Field icon={<Phone className="h-4 w-4" />} label="Telefone" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} placeholder="+55 11 9 0000-0000" />
        <Field icon={<Lock className="h-4 w-4" />} label="Senha" type="password" value={data.password} onChange={(v) => setData({ ...data, password: v })} placeholder="Mínimo 8 caracteres" />

        <div className="text-[11px] text-white/45 leading-relaxed px-1">
          Ao continuar, você aceita os{' '}
          <span className="text-tesla-red">Termos de Mobilidade Tesla</span> e
          autoriza o uso anônimo de dados para treinar o FSD.
        </div>

        <Button block size="xl" loading={loading}>
          Criar conta Tesla
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-white/55">
        Já tem conta?{' '}
        <Link to="/login" className="text-tesla-red font-semibold">
          Entrar
        </Link>
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
}
function Field({ icon, label, value, onChange, type = 'text', placeholder }: FieldProps) {
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
      </div>
    </label>
  );
}
