import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  tier: 'Standard' | 'Plus' | 'Founders';
  joinedAt: string;
  ridesCount: number;
}

interface AuthState {
  user: User | null;
  onboardingDone: boolean;
  login: (email: string) => void;
  register: (data: { name: string; email: string; phone: string }) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

const buildDemoUser = (overrides?: Partial<User>): User => ({
  id: 'usr_847291',
  name: overrides?.name ?? 'Alex Reis',
  email: overrides?.email ?? 'alex@tesla.com',
  phone: overrides?.phone ?? '+55 11 98217-0421',
  avatar:
    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=240&h=240&fit=crop&crop=faces',
  tier: 'Founders',
  joinedAt: '2025-11-04',
  ridesCount: 142,
  ...overrides
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      onboardingDone: false,
      login: (email) => set({ user: buildDemoUser({ email }) }),
      register: (data) => set({ user: buildDemoUser(data) }),
      logout: () => set({ user: null }),
      completeOnboarding: () => set({ onboardingDone: true })
    }),
    { name: 'urbanride-auth' }
  )
);
