export interface Driver {
  id: string;
  name: string;
  rating: number;
  trips: number;
  plate: string;
  carModel: string;
  carColor: string;
  avatar: string;
  battery: number;
  yearsWithTesla: number;
  fsdContribution: number;
}

export const drivers: Driver[] = [
  {
    id: 'drv_001',
    name: 'Marcelo Tavares',
    rating: 4.97,
    trips: 4128,
    plate: 'TSL 9K21',
    carModel: 'Tesla Model 3 Performance',
    carColor: 'Midnight Silver',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    battery: 87,
    yearsWithTesla: 3,
    fsdContribution: 12.4
  },
  {
    id: 'drv_002',
    name: 'Camila Andrade',
    rating: 4.99,
    trips: 2891,
    plate: 'TSL 4M88',
    carModel: 'Tesla Model Y Long Range',
    carColor: 'Pearl White',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
    battery: 92,
    yearsWithTesla: 2,
    fsdContribution: 8.7
  },
  {
    id: 'drv_003',
    name: 'Rafael Yokoyama',
    rating: 4.95,
    trips: 6512,
    plate: 'TSL 7H02',
    carModel: 'Tesla Model S Plaid',
    carColor: 'Deep Blue Metallic',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    battery: 78,
    yearsWithTesla: 5,
    fsdContribution: 22.1
  }
];

export const pickDriver = (): Driver => drivers[Math.floor(Math.random() * drivers.length)];
