import { create } from 'zustand';

export type ToastKind = 'success' | 'error' | 'info' | 'warning' | 'tesla';

export interface Toast {
  id: string;
  message: string;
  sub?: string;
  kind: ToastKind;
  duration?: number;
  icon?: string;
}

interface ToastState {
  toasts: Toast[];
  push: (t: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (t) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    set((s) => ({ toasts: [{ ...t, id }, ...s.toasts].slice(0, 4) }));
    const dur = t.duration ?? 3500;
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })), dur);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) }))
}));

// Convenience helper
export function toast(msg: string, sub?: string, kind: ToastKind = 'tesla', duration = 3500) {
  useToastStore.getState().push({ message: msg, sub, kind, duration });
}
