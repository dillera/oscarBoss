"use client";
import { useState, useEffect, useCallback } from "react";
import { cn, apiPath } from "@/lib/utils";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import Leaderboard from "@/components/Leaderboard";
import AuthModal from "@/components/AuthModal";
import AdminPanel from "@/components/AdminPanel";
import { Search, Filter } from "lucide-react";

interface User {
  id: number;
  firstName: string;
}

interface Nominee {
  id: number;
  name: string;
  imageUrl: string | null;
  trailerUrl: string | null;
}

interface Category {
  id: number;
  name: string;
  sortOrder: number;
  info: string | null;
  nominees: Nominee[];
  winner: { nomineeName: string } | null;
}

interface UserPick {
  nomineeId: number;
  rank: number;
}

interface OddsEntry {
  kalshi: number;
  polymarket: number;
  consensus: number;
}

type OddsData = Record<string, Record<string, OddsEntry>>;

const POPULAR_CATEGORIES = [
  "Best Picture",
  "Best Directing",
  "Best Actor in a Leading Role",
  "Best Actress in a Leading Role",
  "Best Actor in a Supporting Role",
  "Best Actress in a Supporting Role",
];

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"picks" | "leaderboard">("picks");
  const [categories, setCategories] = useState<Category[]>([]);
  const [userVotes, setUserVotes] = useState<Record<number, UserPick[]>>({});
  const [odds, setOdds] = useState<OddsData>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  // Load current user
  useEffect(() => {
    fetch(apiPath("/api/auth/me"))
      .then((r) => r.json())
      .then((d) => setUser(d.user));
  }, []);

  // Load categories + user votes
  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiPath("/api/categories"));
      const data = await res.json();
      setCategories(data.categories || []);
      setUserVotes(data.userVotes || {});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadCategories(); }, [loadCategories, user]);

  // Load odds (poll every 30s)
  const loadOdds = useCallback(async () => {
    const res = await fetch(apiPath("/api/odds"));
    const data = await res.json();
    setOdds(data.odds || {});
  }, []);

  useEffect(() => {
    loadOdds();
    const interval = setInterval(loadOdds, 30000);
    return () => clearInterval(interval);
  }, [loadOdds]);

  async function handleLogout() {
    await fetch(apiPath("/api/auth/logout"), { method: "POST" });
    setUser(null);
    setUserVotes({});
  }

  function handleVoteUpdate(categoryId: number, picks: UserPick[]) {
    setUserVotes((prev) => ({ ...prev, [categoryId]: picks }));
  }

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayedCategories = showAll || search
    ? filteredCategories
    : filteredCategories.filter((c) => POPULAR_CATEGORIES.includes(c.name));

  const totalPicksMade = Object.values(userVotes).reduce((sum, picks) => sum + picks.length, 0);
  const totalPossiblePicks = categories.length * 2; // 2 picks per category (My Pick + Academy Pick)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAuthClick={() => setAuthOpen(true)}
        onLogoClick={() => {
          const next = logoClicks + 1;
          setLogoClicks(next);
          if (next >= 5) { setAdminOpen(true); setLogoClicks(0); }
        }}
        onLogout={handleLogout}
      />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(u) => setUser(u)}
      />
      {adminOpen && (
        <AdminPanel
          onClose={() => {
            setAdminOpen(false);
            loadCategories();
          }}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "picks" ? (
          <>
            <HeroBanner />

            {/* User progress bar */}
            {user && totalPossiblePicks > 0 && (
              <div className="mb-6 p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">
                    Your progress: <span className="text-white font-bold">{totalPicksMade}</span> / {totalPossiblePicks} picks
                  </span>
                  <span className="text-xs text-zinc-500">
                    {Math.round((totalPicksMade / totalPossiblePicks) * 100)}% complete
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${(totalPicksMade / totalPossiblePicks) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Search + filter bar */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search categories…"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <button
                onClick={() => setShowAll(!showAll)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  showAll
                    ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                    : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white"
                }`}
              >
                <Filter size={14} />
                {showAll ? "Popular Only" : "All Categories"}
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-zinc-400">Loading nominees…</p>
                </div>
              </div>
            ) : (
              <>
                {!user && (
                  <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex items-center justify-between">
                    <p className="text-yellow-400 text-sm">
                      🏆 <strong>Register for free</strong> to save your picks and compete on the leaderboard!
                    </p>
                    <button
                      onClick={() => setAuthOpen(true)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs px-3 py-1.5 rounded-xl transition-all ml-4 shrink-0"
                    >
                      Join Free
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  {displayedCategories.map((cat, idx) => (
                    <CategorySection
                      key={cat.id}
                      category={cat}
                      userPicks={userVotes[cat.id] ?? []}
                      isLoggedIn={!!user}
                      onVote={handleVoteUpdate}
                      odds={odds[cat.name] ?? {}}
                      defaultExpanded={idx === 0}
                    />
                  ))}
                </div>

                {!showAll && !search && filteredCategories.length > displayedCategories.length && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="w-full mt-4 py-3 rounded-2xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 text-sm font-medium transition-all"
                  >
                    Show all {filteredCategories.length} categories
                    <span className="text-zinc-600 ml-2">({filteredCategories.length - displayedCategories.length} more)</span>
                  </button>
                )}
              </>
            )}
          </>
        ) : (
          <Leaderboard currentUserId={user?.id} />
        )}
      </main>
    </div>
  );
}
