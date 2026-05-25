# Tesla UrbanRide

> Plataforma premium de mobilidade elétrica da **Tesla Mobility Solutions**.
> Aplicativo web instalável (PWA), mobile-first, com estética inspirada em Tesla, Apple, Uber e Rivian.

Projeto acadêmico universitário — conceito fictício para apresentar um ecossistema de mobilidade urbana 100% elétrica que coleta dados reais para treinar o **Full Self Driving (FSD)** da Tesla antes da autonomia total.

---

## Stack

- **Vite + React 18 + TypeScript**
- **TailwindCSS** com paleta Tesla
- **Framer Motion** para microanimações premium
- **React Router** (HashRouter, deploy-friendly em GitHub Pages)
- **Zustand** para state management (auth, ride, wallet)
- **vite-plugin-pwa** — manifest, service worker, instalável

---

## Telas

1. Splash animada com logo Tesla
2. Onboarding futurista (4 passos)
3. Login / Register (Face ID fake)
4. Home estilo Uber com mapa simulado, sugestões IA
5. Busca de destino + escolha de categoria
6. Corrida em andamento (procurando → matched → indo → em viagem → chegou)
7. Resumo da viagem (avaliação, gorjeta, breakdown da tarifa)
8. Perfil do usuário com estatísticas animadas
9. Histórico de viagens com filtros
10. Carteira Tesla Pay (saldo, métodos, transações, top-up)
11. Painel do motorista (online toggle, ganhos, frota)
12. Dashboard de economia gasolina vs elétrico
13. Tela do FSD — neural net, sensores, roadmap
14. Sustentabilidade — CO₂, matriz energética, donut chart
15. Comparação interativa gasolina vs elétrico (slider)
16. 404

---

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## Build de produção

```bash
npm run build
npm run preview
```

A pasta `dist/` é gerada para deploy estático (GitHub Pages, Vercel, Netlify, etc).

## Instalar como app (PWA)

1. Acesse o site em um dispositivo móvel
2. **iOS:** Safari → Compartilhar → "Adicionar à Tela de Início"
3. **Android:** Chrome → menu → "Instalar app"
4. O app abre em modo standalone, sem barra do navegador

---

## Arquitetura

```
src/
├── components/
│   ├── ui/        # Button, Card, BottomNav, TopBar, StatusBar, Avatar, ...
│   ├── map/       # MapSimulation, CarSilhouette
│   ├── ride/      # CategoryCard, DriverCard
│   └── charts/    # BarChart, Donut, LineCompare
├── pages/         # 16 telas conectadas via React Router
├── layouts/       # AppShell (autenticado), AuthLayout
├── stores/        # authStore, rideStore, walletStore (Zustand + persist)
├── hooks/         # useCountUp, useHaptic
├── services/      # camada de serviços simulados
├── mock/          # categorias, motoristas, viagens, métricas, lugares
├── animations/    # variants Framer Motion
├── assets/        # estáticos
├── App.tsx
├── main.tsx
└── index.css
```

---

## Conceito

Tesla UrbanRide é a etapa de transição da Tesla para a autonomia total:

- Motoristas humanos verificados conduzem Teslas elétricos
- Cada viagem alimenta os dados que treinam o **Dojo**
- Quando o FSD for liberado, a rede já estará pronta — usuários, motoristas e infraestrutura
- O ecossistema é 100% renovável e fechado dentro da experiência Tesla

---

© 2026 Tesla UrbanRide — projeto acadêmico fictício.
