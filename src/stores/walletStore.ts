import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PaymentMethod {
  id: string;
  brand: 'Tesla Pay' | 'Visa' | 'Mastercard' | 'Pix';
  last4: string;
  holder: string;
  primary: boolean;
}

export interface WalletTransaction {
  id: string;
  type: 'ride' | 'topup' | 'reward' | 'refund';
  label: string;
  amount: number;
  date: string;
}

interface WalletState {
  balance: number;
  credits: number;
  methods: PaymentMethod[];
  transactions: WalletTransaction[];
  topUp: (amount: number) => void;
  spend: (amount: number, label: string) => void;
  setPrimary: (id: string) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      balance: 248.5,
      credits: 32,
      methods: [
        { id: 'pm_1', brand: 'Tesla Pay', last4: '4421', holder: 'Alex Reis', primary: true },
        { id: 'pm_2', brand: 'Visa', last4: '8819', holder: 'Alex Reis', primary: false },
        { id: 'pm_3', brand: 'Pix', last4: 'CPF', holder: 'Alex Reis', primary: false }
      ],
      transactions: [
        { id: 't1', type: 'ride', label: 'Tesla UrbanRide • Itaim Bibi', amount: -42.9, date: '2026-05-24T22:18:00' },
        { id: 't2', type: 'reward', label: 'Cashback de viagem sustentável', amount: 4.3, date: '2026-05-24T22:19:00' },
        { id: 't3', type: 'topup', label: 'Recarga via Tesla Pay', amount: 120, date: '2026-05-22T10:02:00' },
        { id: 't4', type: 'ride', label: 'Tesla UrbanRide • Vila Olímpia', amount: -28.7, date: '2026-05-21T08:44:00' },
        { id: 't5', type: 'ride', label: 'Tesla UrbanRide Black • Aeroporto', amount: -132.4, date: '2026-05-19T16:11:00' },
        { id: 't6', type: 'refund', label: 'Ajuste de tarifa dinâmica', amount: 6.2, date: '2026-05-18T19:30:00' }
      ],
      topUp: (amount) =>
        set((s) => ({
          balance: Math.round((s.balance + amount) * 100) / 100,
          transactions: [
            {
              id: `t_${Date.now()}`,
              type: 'topup',
              label: 'Recarga via Tesla Pay',
              amount,
              date: new Date().toISOString()
            },
            ...s.transactions
          ]
        })),
      spend: (amount, label) =>
        set((s) => ({
          balance: Math.round((s.balance - amount) * 100) / 100,
          transactions: [
            {
              id: `t_${Date.now()}`,
              type: 'ride',
              label,
              amount: -Math.abs(amount),
              date: new Date().toISOString()
            },
            ...s.transactions
          ]
        })),
      setPrimary: (id) =>
        set((s) => ({
          methods: s.methods.map((m) => ({ ...m, primary: m.id === id }))
        }))
    }),
    { name: 'urbanride-wallet' }
  )
);
