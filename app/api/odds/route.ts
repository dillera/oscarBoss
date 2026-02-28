import { NextResponse } from "next/server";
import { MOCK_ODDS } from "@/lib/oscarsData";

// Mock polling service simulating Kalshi + Polymarket odds
// In production, replace with real API calls to:
// Kalshi: https://trading-api.kalshi.com/trade-api/v2/markets
// Polymarket: https://clob.polymarket.com/markets

function jitter(base: number): number {
  const delta = (Math.random() - 0.5) * 4;
  return Math.max(1, Math.min(99, Math.round(base + delta)));
}

export async function GET() {
  const liveOdds: Record<string, Record<string, { kalshi: number; polymarket: number; consensus: number }>> = {};

  for (const [category, nominees] of Object.entries(MOCK_ODDS)) {
    liveOdds[category] = {};
    for (const [nominee, baseOdds] of Object.entries(nominees)) {
      const kalshi = jitter(baseOdds);
      const polymarket = jitter(baseOdds);
      const consensus = Math.round((kalshi + polymarket) / 2);
      liveOdds[category][nominee] = { kalshi, polymarket, consensus };
    }
  }

  return NextResponse.json({
    odds: liveOdds,
    updatedAt: new Date().toISOString(),
    sources: ["Kalshi (mock)", "Polymarket (mock)"],
  });
}
