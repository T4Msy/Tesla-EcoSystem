export interface RideCategory {
  id: string;
  name: string;
  tagline: string;
  model: string;
  seats: number;
  etaMinutes: number;
  pricePerKm: number;
  base: number;
  range: string;
  badge?: string;
  silhouette: 'model3' | 'modelY' | 'modelS' | 'cybertruck' | 'roadster';
}

export const rideCategories: RideCategory[] = [
  {
    id: 'urban',
    name: 'UrbanRide',
    tagline: 'Mobilidade elétrica diária',
    model: 'Tesla Model 3',
    seats: 4,
    etaMinutes: 3,
    pricePerKm: 3.8,
    base: 8.9,
    range: '500 km',
    silhouette: 'model3'
  },
  {
    id: 'comfort',
    name: 'UrbanRide Comfort',
    tagline: 'Espaço extra e silêncio absoluto',
    model: 'Tesla Model Y',
    seats: 5,
    etaMinutes: 4,
    pricePerKm: 4.6,
    base: 12.9,
    range: '530 km',
    badge: 'Popular',
    silhouette: 'modelY'
  },
  {
    id: 'black',
    name: 'UrbanRide Black',
    tagline: 'Premium executivo • assento aquecido',
    model: 'Tesla Model S Plaid',
    seats: 4,
    etaMinutes: 6,
    pricePerKm: 7.2,
    base: 24.9,
    range: '637 km',
    silhouette: 'modelS'
  },
  {
    id: 'cyber',
    name: 'UrbanRide Cyber',
    tagline: 'Aço inoxidável • estética futurista',
    model: 'Tesla Cybertruck',
    seats: 6,
    etaMinutes: 8,
    pricePerKm: 8.4,
    base: 29.9,
    range: '750 km',
    badge: 'Beta',
    silhouette: 'cybertruck'
  },
  {
    id: 'autonomous',
    name: 'UrbanRide FSD',
    tagline: 'Direção autônoma supervisionada',
    model: 'Tesla Model S • FSD v13',
    seats: 4,
    etaMinutes: 12,
    pricePerKm: 5.4,
    base: 18.9,
    range: '637 km',
    badge: 'AI',
    silhouette: 'modelS'
  }
];
