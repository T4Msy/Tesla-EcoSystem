export interface PastRide {
  id: string;
  date: string;
  from: string;
  to: string;
  category: string;
  driver: string;
  rating: number;
  fare: number;
  km: number;
  co2SavedKg: number;
  energyKWh: number;
}

export const pastRides: PastRide[] = [
  {
    id: 'rd_8421',
    date: '2026-05-24T22:18:00',
    from: 'Av. Paulista, 1578',
    to: 'Tesla Center — Itaim Bibi',
    category: 'UrbanRide Comfort',
    driver: 'Camila Andrade',
    rating: 5,
    fare: 42.9,
    km: 7.4,
    co2SavedKg: 1.8,
    energyKWh: 1.2
  },
  {
    id: 'rd_8398',
    date: '2026-05-21T08:44:00',
    from: 'Casa',
    to: 'WTC — Nações Unidas',
    category: 'UrbanRide',
    driver: 'Marcelo Tavares',
    rating: 5,
    fare: 28.7,
    km: 5.1,
    co2SavedKg: 1.2,
    energyKWh: 0.9
  },
  {
    id: 'rd_8295',
    date: '2026-05-19T16:11:00',
    from: 'Trabalho',
    to: 'Aeroporto GRU T3',
    category: 'UrbanRide Black',
    driver: 'Rafael Yokoyama',
    rating: 5,
    fare: 132.4,
    km: 28.6,
    co2SavedKg: 6.8,
    energyKWh: 4.4
  },
  {
    id: 'rd_8210',
    date: '2026-05-15T19:55:00',
    from: 'Parque Ibirapuera',
    to: 'Casa',
    category: 'UrbanRide',
    driver: 'Marcelo Tavares',
    rating: 4,
    fare: 22.1,
    km: 3.8,
    co2SavedKg: 0.9,
    energyKWh: 0.6
  },
  {
    id: 'rd_8174',
    date: '2026-05-11T11:02:00',
    from: 'Shopping Iguatemi',
    to: 'Tesla Center',
    category: 'UrbanRide FSD',
    driver: 'Tesla Autopilot v13',
    rating: 5,
    fare: 38.4,
    km: 6.2,
    co2SavedKg: 1.5,
    energyKWh: 1.0
  }
];
