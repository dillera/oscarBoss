# OscarBoss 🏆

**98th Academy Awards Prediction App — March 15, 2026**

Predict 2026 Oscar winners across all 24 categories, track live prediction market odds, and compete on a real-time leaderboard.

## Features

- **Lightweight auth** — register/login with just your first name (cookie-based sessions)
- **All 24 categories** — seeded with every 2026 nominee across all Academy Award categories
- **Nominee cards** — hero images (Unsplash), YouTube trailer links, live market odds
- **Live odds** — mocked Kalshi + Polymarket consensus odds, polled every 30s with jitter
- **Voting system** — 2 picks per category: **My Pick** (2pts) and **Academy Pick** (1pt). Pick the same nominee for both = 3pts if correct.
- **Live leaderboard** — shows all users, scores, and individual picks; updates when winners announced
- **Admin panel** — click the logo 5× to open winner entry panel (for ceremony night use)
- **Results tally CLI** — command-line script for entering winners on March 15

## Stack

- **Next.js 16** (App Router, TypeScript)
- **TailwindCSS v4** + Radix UI primitives
- **Prisma v7** + SQLite (better-sqlite3 adapter)
- **lucide-react** icons

## Setup

```bash
cd oscarboss
npm install

# Initialize & seed database
npx prisma migrate dev --name init
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts

# Start dev server
npm run dev
```

Open [http://localhost:3510](http://localhost:3510).

## Production Deployment (nginx reverse proxy)

The app is configured to run at a subpath (e.g. `https://apps.diller.org/oscars`) behind nginx.

### 1. Server setup

```bash
# Clone and install
git clone https://github.com/dillera/oscarBoss.git
cd oscarBoss
npm install

# Generate Prisma client (required before any DB or build steps)
npx prisma generate

# Create production env file
cp env.example env
# Edit env and set NEXT_PUBLIC_BASE_PATH=/oscars

# Run migrations and seed
npx prisma migrate deploy
npm run seed

# Build and start on port 3510
npm run build
npm run start   # listens on :3510
```

For process management, use the included systemd install script:
```bash
sudo bash scripts/install-service.sh
```

This script will:
- Build the Next.js app (`npm run build`)
- Generate a systemd unit file with the correct paths for the current server
- Compare it against any already-installed unit — **only replaces it if it differs**
- Enable the service to start on boot
- Start (or restart) the service

On subsequent deploys (e.g. after `git pull`), re-running the script will rebuild, diff the unit file, and restart the service. If nothing in the unit file changed it will not touch systemd — only restart the app.

```bash
# Check service status
systemctl status oscarboss

# Follow live logs
journalctl -u oscarboss -f
```

### 2. nginx config

```nginx
location /oscars {
    proxy_pass         http://127.0.0.1:3510;
    proxy_http_version 1.1;

    proxy_set_header   Host              $host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;

    # Required for Next.js websocket HMR (dev only, harmless in prod)
    proxy_set_header   Upgrade           $http_upgrade;
    proxy_set_header   Connection        "upgrade";
}
```

> **Note:** `basePath=/oscars` in `next.config.ts` is controlled by the `NEXT_PUBLIC_BASE_PATH` env var. The nginx `location /oscars` block must match exactly.

## Results Tally (March 15, 2026)

Use the CLI script or the in-app admin panel (click logo 5×) to enter winners.

```bash
# List all categories
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/tally-results.ts --list

# Set a winner (partial name match supported)
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/tally-results.ts --set "Best Picture" "Sinners"
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/tally-results.ts --set "Actor" "Chalamet"

# Show live leaderboard scores
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/tally-results.ts --scores

# Clear a winner
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/tally-results.ts --clear "Best Picture"
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register with `{ firstName }` |
| POST | `/api/auth/login` | Login with `{ firstName }` |
| GET | `/api/auth/me` | Get current session user |
| POST | `/api/auth/logout` | Clear session cookie |
| GET | `/api/categories` | All categories + nominees + user votes |
| POST | `/api/votes` | Save picks `{ categoryId, picks: [{nomineeId, rank}] }` |
| GET | `/api/odds` | Live mocked odds from Kalshi/Polymarket |
| GET | `/api/leaderboard` | All users ranked by score |
| GET | `/api/winners` | All announced winners |
| POST | `/api/winners` | Set winner `{ categoryId, nomineeName }` |
| DELETE | `/api/winners` | Clear winner `{ categoryId }` |

## Scoring

| Pick | Points |
|------|--------|
| **My Pick** correct | 2 pts |
| **Academy Pick** correct | 1 pt |
| Both picks on same nominee, it wins | 3 pts |

Users can change their picks any time before the ceremony starts.
