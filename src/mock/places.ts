export interface Place {
  id: string;
  label: string;
  address: string;
  type: 'home' | 'work' | 'favorite' | 'recent' | 'tesla';
  coords: [number, number];
}

export const savedPlaces: Place[] = [
  { id: 'p1', label: 'Casa', address: 'R. Augusta, 2840 — Cerqueira César', type: 'home', coords: [60, 90] },
  { id: 'p2', label: 'Trabalho', address: 'WTC — Av. Nações Unidas, 12551', type: 'work', coords: [220, 200] },
  { id: 'p3', label: 'Tesla Center Itaim', address: 'R. Joaquim Floriano, 100', type: 'tesla', coords: [200, 160] },
  { id: 'p4', label: 'Aeroporto GRU T3', address: 'Rod. Hélio Smidt, s/n', type: 'favorite', coords: [320, 60] },
  { id: 'p5', label: 'Allianz Parque', address: 'Av. Francisco Matarazzo, 1705', type: 'favorite', coords: [40, 140] }
];

export const recentSearches: Place[] = [
  { id: 'r1', label: 'Shopping Iguatemi', address: 'Av. Brig. Faria Lima, 2232', type: 'recent', coords: [180, 180] },
  { id: 'r2', label: 'Parque Ibirapuera', address: 'Av. Pedro Álvares Cabral, s/n', type: 'recent', coords: [150, 230] },
  { id: 'r3', label: 'Supercharger Vila Olímpia', address: 'R. Funchal, 65', type: 'tesla', coords: [210, 190] }
];
