import { create } from 'zustand';
import type { RideCategory } from '../mock/categories';
import type { Driver } from '../mock/drivers';

export type RideStatus =
  | 'idle'
  | 'searching'
  | 'matched'
  | 'arriving'
  | 'in_progress'
  | 'arrived'
  | 'finished';

export interface RideRequest {
  pickup: string;
  dropoff: string;
  pickupCoords: [number, number];
  dropoffCoords: [number, number];
  category: RideCategory | null;
  estimatedMinutes: number;
  estimatedKm: number;
  fare: number;
  co2SavedKg: number;
}

interface RideState {
  status: RideStatus;
  request: RideRequest;
  driver: Driver | null;
  etaSeconds: number;
  setStatus: (s: RideStatus) => void;
  setPickup: (label: string) => void;
  setDropoff: (label: string) => void;
  setCategory: (cat: RideCategory) => void;
  assignDriver: (d: Driver) => void;
  tickEta: (delta: number) => void;
  resetRide: () => void;
}

const defaultRequest: RideRequest = {
  pickup: 'Av. Paulista, 1578',
  dropoff: 'Tesla Center — Itaim Bibi',
  pickupCoords: [50, 80],
  dropoffCoords: [240, 220],
  category: null,
  estimatedMinutes: 18,
  estimatedKm: 7.4,
  fare: 42.9,
  co2SavedKg: 1.8
};

export const useRideStore = create<RideState>((set) => ({
  status: 'idle',
  request: defaultRequest,
  driver: null,
  etaSeconds: 0,
  setStatus: (status) => set({ status }),
  setPickup: (label) => set((s) => ({ request: { ...s.request, pickup: label } })),
  setDropoff: (label) => set((s) => ({ request: { ...s.request, dropoff: label } })),
  setCategory: (category) =>
    set((s) => ({
      request: {
        ...s.request,
        category,
        fare: Math.round((s.request.estimatedKm * category.pricePerKm + category.base) * 10) / 10
      }
    })),
  assignDriver: (driver) => set({ driver, etaSeconds: 180 }),
  tickEta: (delta) => set((s) => ({ etaSeconds: Math.max(0, s.etaSeconds - delta) })),
  resetRide: () => set({ status: 'idle', driver: null, etaSeconds: 0, request: defaultRequest })
}));
