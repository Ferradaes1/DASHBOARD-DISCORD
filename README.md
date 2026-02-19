# Discord Staff Dashboard

Dashboard conectado ao TiDB Cloud via Drizzle ORM + MySQL2.

## 🚀 Deploy no Vercel

### 1. Suba o projeto no GitHub
Substitua os arquivos do seu repositório por estes.

### 2. Configure no Vercel
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. Adicione a variável de ambiente
No Vercel → Settings → Environment Variables:

| Nome | Valor |
|------|-------|
| `DATABASE_URL` | `mysql://USER:PASS@HOST:4000/discord_staff_bot?ssl={"rejectUnauthorized":true}` |

### 4. Deploy ✅

## Por que estava dando 404?
O `vercel.json` não tinha os `rewrites` corretos para SPA.
Qualquer rota diferente de `/` (ex: `/staff`) dava 404 porque o Vercel procurava um arquivo físico que não existia.

## Estrutura
```
api/
  staff.js        ← GET /api/staff       (lista staff do banco)
  logs.js         ← GET /api/logs        (milestone_logs)
  milestones.js   ← GET /api/milestones  (milestones)
src/
  pages/          ← Dashboard, Staff, Activity, Milestones
  components/     ← UI, Sidebar
  hooks/          ← useFetch
  lib/schema.ts   ← Schema exato do seu banco
vercel.json       ← Fix do 404 ✅
```
