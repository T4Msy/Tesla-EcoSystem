# Tesla Ecosystem

Dashboard energético inteligente — Next.js + Tailwind + Framer Motion

## Deploy no GitHub Pages (2 passos)

### 1. Edite o workflow
Abra `.github/workflows/deploy.yml` e troque na linha `NEXT_PUBLIC_BASE_PATH`:

```
NEXT_PUBLIC_BASE_PATH: /NOME-DO-SEU-REPO
```

Exemplo: se seu repositório se chama `tesla-ecosystem`, deixe `/tesla-ecosystem`.
Se for o repo raiz (`usuario.github.io`), remova essa linha inteira.

### 2. Ative o GitHub Pages
No seu repositório → **Settings → Pages → Source → GitHub Actions**

Depois é só fazer push na branch `main` que o deploy é automático!

---

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## Build local (gera pasta `out/`)

```bash
npm run build
```
