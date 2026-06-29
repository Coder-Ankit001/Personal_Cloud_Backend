<div align="center">

<!-- Animated SVG Banner -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 180" width="860" height="180">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d0d1a"/>
      <stop offset="100%" style="stop-color:#111827"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="50%" style="stop-color:#a855f7"/>
      <stop offset="100%" style="stop-color:#06b6d4"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softglow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="860" height="180" fill="url(#bg)" rx="14"/>

  <line x1="0" y1="60" x2="860" y2="60" stroke="#ffffff06" stroke-width="1"/>
  <line x1="0" y1="120" x2="860" y2="120" stroke="#ffffff06" stroke-width="1"/>
  <line x1="215" y1="0" x2="215" y2="180" stroke="#ffffff06" stroke-width="1"/>
  <line x1="430" y1="0" x2="430" y2="180" stroke="#ffffff06" stroke-width="1"/>
  <line x1="645" y1="0" x2="645" y2="180" stroke="#ffffff06" stroke-width="1"/>

  <circle cx="760" cy="30" r="90" fill="#6366f1" fill-opacity="0.06">
    <animate attributeName="r" values="90;105;90" dur="6s" repeatCount="indefinite"/>
  </circle>
  <circle cx="100" cy="155" r="70" fill="#06b6d4" fill-opacity="0.05">
    <animate attributeName="r" values="70;82;70" dur="7s" repeatCount="indefinite"/>
  </circle>

  <!-- Server icon -->
  <g transform="translate(52, 55)" filter="url(#glow)">
    <rect x="0" y="0" width="64" height="20" rx="4" fill="none" stroke="url(#accent)" stroke-width="2.5">
      <animate attributeName="stroke-opacity" values="1;0.4;1" dur="3s" repeatCount="indefinite"/>
    </rect>
    <rect x="0" y="26" width="64" height="20" rx="4" fill="none" stroke="url(#accent)" stroke-width="2.5">
      <animate attributeName="stroke-opacity" values="1;0.4;1" dur="3s" begin="0.5s" repeatCount="indefinite"/>
    </rect>
    <rect x="0" y="52" width="64" height="20" rx="4" fill="none" stroke="url(#accent)" stroke-width="2.5">
      <animate attributeName="stroke-opacity" values="1;0.4;1" dur="3s" begin="1s" repeatCount="indefinite"/>
    </rect>
    <circle cx="52" cy="10" r="3" fill="#06b6d4">
      <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="52" cy="36" r="3" fill="#a855f7">
      <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="52" cy="62" r="3" fill="#6366f1">
      <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" begin="1s" repeatCount="indefinite"/>
    </circle>
  </g>

  <text x="450" y="78"
        font-family="'Segoe UI', system-ui, sans-serif"
        font-size="42" font-weight="800"
        fill="url(#accent)" text-anchor="middle" filter="url(#glow)">
    Personal Cloud
    <animate attributeName="opacity" values="0.88;1;0.88" dur="4s" repeatCount="indefinite"/>
  </text>

  <text x="450" y="112"
        font-family="'Segoe UI', system-ui, sans-serif"
        font-size="13" fill="#94a3b8" text-anchor="middle" letter-spacing="4">
    BACKEND  ·  BUILT FOR SCALE, DESIGNED FOR CONTROL
  </text>

  <line x1="300" y1="124" x2="600" y2="124" stroke="url(#accent)" stroke-width="1.5" stroke-opacity="0.5">
    <animate attributeName="x1" values="300;340;300" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="x2" values="600;560;600" dur="4s" repeatCount="indefinite"/>
  </line>

  <g font-family="'Segoe UI', system-ui, sans-serif" font-size="12" fill="#64748b" filter="url(#softglow)">
    <text x="248" y="152" text-anchor="middle">🟢  Node.js</text>
    <text x="336" y="152" text-anchor="middle">⚡  Express</text>
    <text x="422" y="152" text-anchor="middle">🔷  Prisma</text>
    <text x="510" y="152" text-anchor="middle">☁  Supabase</text>
    <text x="600" y="152" text-anchor="middle">🐳  Docker</text>
  </g>
</svg>

<br/>

<div align="center">

  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
  ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

</div>

<div align="center">
  <a href="https://personal-cloud-backend-tmea.onrender.com/">🌐 Live Demo</a> &nbsp;·&nbsp;
  <a href="https://github.com/Coder-Ankit001/Personal_Cloud_Frontend">⚛️ Frontend Repo</a>
</div>

---
</div>

## 🌐 Overview

**Personal Cloud Backend** is the REST API powering the Personal Cloud storage app — a self-hosted alternative to Google Drive. Built with **Node.js + Express**, it handles authentication, file system tree management, and S3-compatible object storage via Supabase.

> ⚛️ **This repo is the backend API only.** The frontend lives in [Personal-Cloud-Frontend](https://github.com/Coder-Ankit001/Personal_Cloud_Frontend).

---

## ✨ Features

### 🗂️ File System Engine
- Recursive folder tree backed by a self-referential Prisma model
- Cycle detection via recursive CTE for safe folder moves
- Full CRUD — create, rename, move, and delete nodes
- Unique name enforcement per directory with `@@unique([name, parentId])`

### ⬆️ Storage
- Streaming uploads to Supabase S3-compatible storage
- 10+ supported file extensions (images, video, audio, docs, archives)
- Single-click signed URL downloads with preserved filenames
- Separate `DATABASE_URL` (pooler) and `DIRECT_URL` (direct) for Prisma compatibility

### 🔐 Authentication
- JWT access + refresh token pair
- HTTP-only cookie delivery — zero `localStorage` exposure
- Auth middleware protecting all private routes

### 🐳 Docker
- Alpine-based image (`node:22-alpine`) for minimal footprint
- `prisma generate` runs at build time — no runtime codegen
- Environment variables injected at runtime via `--env-file` or provider dashboard

### 🚧 Coming Soon

| Feature | Status |
|---|---|
| 🔍 Full-text search | Planned |
| 🗑️ Trash bin & soft delete | Planned |
| 🔗 File sharing & signed URLs | Planned |
| 🕓 File versioning | Planned |
| ⚙️ CI/CD via GitHub Actions | Planned |
| 📋 Audit log | Planned |

---

## 🛠️ Tech Stack

| | Technology |
|---|---|
| 🟢 Runtime | Node.js v22 |
| ⚡ Framework | Express |
| 🔷 ORM | Prisma 6 + PostgreSQL |
| ☁️ Storage | Supabase S3-compatible |
| 🔐 Auth | JWT (access + refresh) via HTTP-only cookies |
| 🐳 Container | Docker (Alpine) |
| 🚀 Deployment | Render |

---

## 📁 Project Structure

```
Personal-Cloud-Backend/
├── prisma/
│   ├── migrations/         # Prisma migration history
│   └── schema.prisma       # DB schema — Node, User, enums
├── src/
│   ├── config/
│   │   ├── env.js          # Centralised process.env access
│   │   └── s3.js           # Supabase S3 client setup
│   ├── middlewares/
│   │   └── auth.js         # JWT verification middleware
│   ├── modules/
│   │   ├── nodes/
│   │   │   ├── nodes_controllers.js
│   │   │   ├── nodes_routes.js
│   │   │   └── nodes_service.js   # CTE cycle detection, tree ops
│   │   ├── storage/
│   │   │   ├── storage_controller.js
│   │   │   ├── storage_route.js
│   │   │   └── storage_service.js # S3 upload/download streams
│   │   └── user/
│   │       ├── user_controllers.js
│   │       └── user_routes.js
│   ├── app.js              # Express app + middleware setup
│   ├── db.js               # Prisma client instance
│   └── script.js           # One-off utility scripts
├── .dockerignore
├── .env.example
├── Dockerfile
├── index.js                # Entry point
├── prisma.config.ts        # Prisma datasource config
└── package.json
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js v22+, PostgreSQL (or Supabase), Docker (optional).

```bash
git clone https://github.com/Coder-Ankit001/Personal_Cloud_Backend.git
cd Personal_Cloud_Backend
npm install
cp .env.example .env
```

**⚙️ `.env` setup:**

```env
PORT=3000
FRONTEND_URL=http://localhost:5173

# JWT
JWT_ACCESS_TOKEN=your_access_secret
JWT_REFRESH_TOKEN=your_refresh_secret

# Database — pooler URL for runtime, direct URL for migrations
DATABASE_URL=postgresql://user:pass@pooler-host:5432/db
DIRECT_URL=postgresql://user:pass@direct-host:5432/db

# Supabase S3
SUPABASE_S3_ENDPOINT=https://xxx.supabase.co/storage/v1/s3
SUPABASE_S3_REGION=ap-south-1
SUPABASE_S3_ACCESS_KEY=your_access_key
SUPABASE_S3_SECRET_KEY=your_secret_key
SUPABASE_S3_BUCKET=your_bucket
```

**▶️ Run:**

```bash
npx prisma migrate deploy   # Apply migrations (run once per new migration)
npm run dev                 # Development
npm start                   # Production
```

**🐳 Docker:**

```bash
docker build -t personal-cloud-backend .
docker run -d -p 3000:3000 --env-file .env --name personal-cloud-backend --restart unless-stopped personal-cloud-backend
```

---

## 📡 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/user/register` | Register new user |
| `POST` | `/user/login` | Login, set JWT cookies |
| `POST` | `/user/logout` | Clear cookies |
| `POST` | `/user/refresh` | Rotate access token |
| `GET` | `/nodes/:id/contents` | List directory contents |
| `GET` | `/nodes/:id` | Get node metadata + path |
| `POST` | `/nodes/folder` | Create folder |
| `PATCH` | `/nodes/:id/rename` | Rename node |
| `PATCH` | `/nodes/:id/move` | Move node (cycle-safe) |
| `DELETE` | `/nodes/:id` | Delete node |
| `POST` | `/storage/upload` | Upload file to S3 |
| `GET` | `/storage/download/:id` | Download file from S3 |

---

## 🗺️ Roadmap

- [x] 🟣 JWT HTTP-only cookie auth
- [x] 🟣 Full file system CRUD
- [x] 🟣 Recursive CTE cycle detection for folder moves
- [x] 🟣 Supabase S3 streaming upload/download
- [x] 🟣 Dockerized with Alpine
- [x] 🟣 Deployed on Render
- [ ] ⬜ Trash bin & soft delete
- [ ] ⬜ File sharing via signed URLs
- [ ] ⬜ Full-text search
- [ ] ⬜ File versioning
- [ ] ⬜ Audit log
- [ ] ⬜ GitHub Actions CI/CD

---

<div align="center">

Built by 🌟 [Coder-Ankit001](https://github.com/Coder-Ankit001)

</div>
