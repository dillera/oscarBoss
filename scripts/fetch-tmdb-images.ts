/**
 * fetch-tmdb-images.ts
 *
 * Usage:
 *   # Step 1 — fetch image URLs from TMDB and write to tmdb-images.json
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/fetch-tmdb-images.ts --fetch
 *
 *   # Step 2 — review tmdb-images.json, then apply to oscarsData.ts
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/fetch-tmdb-images.ts --apply
 *
 * Requires TMDB_API_KEY in .env or as an environment variable.
 */

import fs from "fs";
import path from "path";

const TMDB_API_KEY = process.env.TMDB_API_KEY || "b6d2328ad7d8b978c1f90fc4154c833a";
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const OUT_FILE = path.join(process.cwd(), "scripts", "tmdb-images.json");
const DATA_FILE = path.join(process.cwd(), "lib", "oscarsData.ts");

// ─── Nominee definitions ────────────────────────────────────────────────────
// type: "movie" → search /search/movie, use poster_path
// type: "person" → extract name before "(", search /search/person, use profile_path
// searchName: optional override for the TMDB search query

interface NomineeDef {
  name: string;         // raw nominee name as in oscarsData.ts
  type: "movie" | "person";
  searchName?: string;  // override search term if raw name won't match well
}

const NOMINEES: NomineeDef[] = [
  // Best Picture
  { name: "Sinners", type: "movie" },
  { name: "Hamnet", type: "movie" },
  { name: "One Battle After Another", type: "movie" },
  { name: "Sentimental Value", type: "movie", searchName: "Sentimental Value 2025" },
  { name: "Marty Supreme", type: "movie" },
  { name: "Train Dreams", type: "movie" },
  { name: "F1", type: "movie", searchName: "F1 2025 Brad Pitt" },
  { name: "Frankenstein", type: "movie", searchName: "Frankenstein 2025 Guillermo del Toro" },
  { name: "Bugonia", type: "movie" },
  { name: "The Secret Agent", type: "movie", searchName: "The Secret Agent 2025" },

  // Best Directing (person picks)
  { name: "Ryan Coogler (Sinners)", type: "person", searchName: "Ryan Coogler" },
  { name: "Paul Thomas Anderson (One Battle After Another)", type: "person", searchName: "Paul Thomas Anderson" },
  { name: "Chloé Zhao (Hamnet)", type: "person", searchName: "Chloé Zhao" },
  { name: "Joachim Trier (Sentimental Value)", type: "person", searchName: "Joachim Trier" },
  { name: "Josh Safdie (Marty Supreme)", type: "person", searchName: "Josh Safdie" },

  // Best Actor Leading
  { name: "Timothée Chalamet (Marty Supreme)", type: "person", searchName: "Timothée Chalamet" },
  { name: "Michael B. Jordan (Sinners)", type: "person", searchName: "Michael B. Jordan" },
  { name: "Leonardo DiCaprio (One Battle After Another)", type: "person", searchName: "Leonardo DiCaprio" },
  { name: "Ethan Hawke (Blue Moon)", type: "person", searchName: "Ethan Hawke" },
  { name: "Wagner Moura (The Secret Agent)", type: "person", searchName: "Wagner Moura" },

  // Best Actress Leading
  { name: "Renate Reinsve (Sentimental Value)", type: "person", searchName: "Renate Reinsve" },
  { name: "Jessie Buckley (Hamnet)", type: "person", searchName: "Jessie Buckley" },
  { name: "Emma Stone (Bugonia)", type: "person", searchName: "Emma Stone" },
  { name: "Kate Hudson (Song Sung Blue)", type: "person", searchName: "Kate Hudson" },
  { name: "Rose Byrne (If I Had Legs I'd Kick You)", type: "person", searchName: "Rose Byrne" },

  // Best Actor Supporting
  { name: "Delroy Lindo (Sinners)", type: "person", searchName: "Delroy Lindo" },
  { name: "Jacob Elordi (Frankenstein)", type: "person", searchName: "Jacob Elordi" },
  { name: "Benicio del Toro (One Battle After Another)", type: "person", searchName: "Benicio del Toro" },
  { name: "Stellan Skarsgård (Sentimental Value)", type: "person", searchName: "Stellan Skarsgård" },
  { name: "Sean Penn (One Battle After Another)", type: "person", searchName: "Sean Penn" },

  // Best Actress Supporting
  { name: "Wunmi Mosaku (Sinners)", type: "person", searchName: "Wunmi Mosaku" },
  { name: "Elle Fanning (Sentimental Value)", type: "person", searchName: "Elle Fanning" },
  { name: "Teyana Taylor (One Battle After Another)", type: "person", searchName: "Teyana Taylor" },
  { name: "Amy Madigan (Weapons)", type: "person", searchName: "Amy Madigan" },
  { name: "Inga Ibsdotter Lilleaas (Sentimental Value)", type: "person", searchName: "Inga Ibsdotter Lilleaas" },

  // Films used in multiple categories — deduplicated
  { name: "Blue Moon", type: "movie" },
  { name: "It Was Just an Accident", type: "movie" },
  { name: "Zootopia 2", type: "movie" },
  { name: "Elio", type: "movie" },
  { name: "KPop Demon Hunters", type: "movie", searchName: "K-Pop Demon Hunters 2025" },
  { name: "Little Amélie or The Character of Rain", type: "movie", searchName: "Little Amélie 2025" },
  { name: "Arco", type: "movie", searchName: "Arco 2025 animated" },
  { name: "Sentimental Value (Norway)", type: "movie", searchName: "Sentimental Value 2025" },
  { name: "The Voice of Hind Rajab (Tunisia)", type: "movie", searchName: "The Voice of Hind Rajab" },
  { name: "It Was Just an Accident (France)", type: "movie", searchName: "It Was Just an Accident" },
  { name: "The Secret Agent (Brazil)", type: "movie", searchName: "The Secret Agent 2025" },
  { name: "Sirât (Spain)", type: "movie", searchName: "Sirât" },
  { name: "Mr. Nobody Against Putin", type: "movie" },
  { name: "Come See Me in the Good Light", type: "movie" },
  { name: "The Alabama Solution", type: "movie" },
  { name: "Cutting Through Rocks", type: "movie" },
  { name: "The Perfect Neighbor", type: "movie" },
  { name: "All the Empty Rooms", type: "movie" },
  { name: "Armed Only With a Camera", type: "movie" },
  { name: "Children No More", type: "movie" },
  { name: "The Devil Is Busy", type: "movie" },
  { name: "Perfectly a Strangeness", type: "movie" },
  { name: "Butcher's Stain", type: "movie" },
  { name: "A Friend of Dorothy", type: "movie" },
  { name: "Jane Austen's Period Drama", type: "movie" },
  { name: "The Singers", type: "movie" },
  { name: "Two People Exchanging Saliva", type: "movie" },
  { name: "Butterfly", type: "movie", searchName: "Butterfly animated short 2025" },
  { name: "Forevergreen", type: "movie" },
  { name: "The Girl Who Cried Pearls", type: "movie" },
  { name: "Retirement Plan", type: "movie" },
  { name: "The Three Sisters", type: "movie", searchName: "The Three Sisters animated 2025" },
  { name: "I Lied To You (Sinners)", type: "movie", searchName: "Sinners" },
  { name: "Golden (KPop Demon Hunters)", type: "movie", searchName: "K-Pop Demon Hunters 2025" },
  { name: "Dear Me (Diane Warren: Relentless)", type: "movie", searchName: "Diane Warren Relentless documentary" },
  { name: "Sweet Dreams of Joy (Viva Verdi!)", type: "movie", searchName: "Viva Verdi 2025" },
  { name: "Train Dreams (Train Dreams)", type: "movie", searchName: "Train Dreams 2025" },
  { name: "Sirât", type: "movie", searchName: "Sirât" },
  { name: "Kokuho", type: "movie" },
  { name: "The Smashing Machine", type: "movie" },
  { name: "The Ugly Stepsister", type: "movie" },
  { name: "Avatar: Fire and Ash", type: "movie" },
  { name: "Jurassic World Rebirth", type: "movie" },
  { name: "The Lost Bus", type: "movie" },
];

// ─── TMDB fetchers ───────────────────────────────────────────────────────────

async function searchMovie(query: string): Promise<string | null> {
  const url = `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`;
  const res = await fetch(url);
  const json = await res.json() as { results?: Array<{ poster_path?: string }> };
  const hit = json.results?.find((r) => r.poster_path);
  return hit?.poster_path ? `${IMG_BASE}${hit.poster_path}` : null;
}

async function searchPerson(query: string): Promise<string | null> {
  const url = `${TMDB_BASE}/search/person?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`;
  const res = await fetch(url);
  const json = await res.json() as { results?: Array<{ profile_path?: string }> };
  const hit = json.results?.find((r) => r.profile_path);
  return hit?.profile_path ? `${IMG_BASE}${hit.profile_path}` : null;
}

// ─── Fetch mode ──────────────────────────────────────────────────────────────

async function fetchAll() {
  console.log(`\n🎬 Fetching TMDB images for ${NOMINEES.length} nominees…\n`);

  // Deduplicate by name so we don't double-hit the API
  const seen = new Set<string>();
  const unique = NOMINEES.filter((n) => {
    if (seen.has(n.name)) return false;
    seen.add(n.name);
    return true;
  });

  const results: Record<string, string | null> = {};

  for (const nominee of unique) {
    const query = nominee.searchName ?? nominee.name;
    let url: string | null = null;

    try {
      if (nominee.type === "person") {
        url = await searchPerson(query);
      } else {
        url = await searchMovie(query);
      }
    } catch (e) {
      console.error(`  ERROR for "${nominee.name}": ${e}`);
    }

    const icon = url ? "✅" : "❌";
    const display = url ? url.replace(IMG_BASE, "…/w500") : "NOT FOUND";
    console.log(`  ${icon} [${nominee.type}] ${nominee.name}`);
    if (url) console.log(`       ${display}`);

    results[nominee.name] = url;

    // Polite rate limiting — TMDB allows 40 req/10s
    await new Promise((r) => setTimeout(r, 260));
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2));
  console.log(`\n✅ Written to ${OUT_FILE}`);
  console.log(`   Found: ${Object.values(results).filter(Boolean).length}/${unique.length}`);
  console.log(`\nReview the file, then run --apply to patch oscarsData.ts\n`);
}

// ─── Apply mode ──────────────────────────────────────────────────────────────

function applyImages() {
  if (!fs.existsSync(OUT_FILE)) {
    console.error("❌ tmdb-images.json not found. Run --fetch first.");
    process.exit(1);
  }

  const imageMap: Record<string, string | null> = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
  let source = fs.readFileSync(DATA_FILE, "utf8");

  let applied = 0;
  let skipped = 0;

  for (const [nomineeName, imageUrl] of Object.entries(imageMap)) {
    if (!imageUrl) { skipped++; continue; }

    // Match: imageUrl: "https://images.unsplash.com/..." or any existing URL
    // for this specific nominee name in the nominee object
    // We look for the name string followed shortly by an imageUrl field
    const escapedName = nomineeName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(
      `(name: "${escapedName}"[^}]*?imageUrl: ")[^"]+(")`
    );

    if (pattern.test(source)) {
      source = source.replace(pattern, `$1${imageUrl}$2`);
      console.log(`  ✅ ${nomineeName}`);
      applied++;
    } else {
      console.log(`  ⚠️  No match in oscarsData.ts for: ${nomineeName}`);
      skipped++;
    }
  }

  fs.writeFileSync(DATA_FILE, source);
  console.log(`\n✅ Applied ${applied} images, skipped ${skipped}`);
  console.log("   Re-run the seed script to update the database:\n");
  console.log(`   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts\n`);
}

// ─── Entry point ─────────────────────────────────────────────────────────────

const arg = process.argv[2];
if (arg === "--fetch") {
  fetchAll().catch(console.error);
} else if (arg === "--apply") {
  applyImages();
} else {
  console.log("Usage:");
  console.log("  --fetch   Query TMDB and write scripts/tmdb-images.json");
  console.log("  --apply   Patch oscarsData.ts with results from tmdb-images.json");
}
