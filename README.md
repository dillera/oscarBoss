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

Open [http://localhost:3000](http://localhost:3000).

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
