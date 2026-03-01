"use client";
import { useState, useEffect } from "react";
import { Trophy, Medal, User, GraduationCap, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { cn, apiPath } from "@/lib/utils";

interface Pick {
  categoryId: number;
  categoryName: string;
  nomineeId: number;
  nomineeName: string;
  rank: number;
  isCorrect: boolean;
}

interface LeaderboardEntry {
  userId: number;
  firstName: string;
  score: number;
  totalPicks: number;
  picks: Pick[];
}

interface LeaderboardProps {
  currentUserId?: number;
}

// rank 1 = My Pick (2pts), rank 2 = Academy Pick (1pt)
const RANK_PTS: Record<number, string> = { 1: "2pts", 2: "1pt" };
const RANK_LABEL: Record<number, string> = { 1: "My Pick", 2: "Academy" };
const RANK_COLOR: Record<number, string> = { 1: "text-yellow-400", 2: "text-sky-400" };

export default function Leaderboard({ currentUserId }: LeaderboardProps) {
  const [data, setData] = useState<{ leaderboard: LeaderboardEntry[]; winners: Record<number, string> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(apiPath("/api/leaderboard"));
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <Trophy className="text-yellow-400 animate-pulse" size={40} />
          <p className="text-zinc-400">Loading leaderboard…</p>
        </div>
      </div>
    );
  }

  if (!data || data.leaderboard.length === 0) {
    return (
      <div className="text-center py-20">
        <Trophy className="text-zinc-600 mx-auto mb-4" size={48} />
        <p className="text-zinc-400 text-lg font-medium">No predictions yet</p>
        <p className="text-zinc-600 text-sm mt-1">Be the first to make your picks!</p>
      </div>
    );
  }

  const winnerCount = Object.keys(data.winners).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Leaderboard</h2>
          <p className="text-zinc-500 text-sm mt-0.5">
            {winnerCount > 0
              ? `${winnerCount} winner${winnerCount !== 1 ? "s" : ""} announced · Scores live`
              : "Scores will update as winners are announced on March 15"}
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-all"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Scoring legend */}
      <div className="flex items-center gap-4 p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-sm flex-wrap">
        <span className="text-zinc-500">Scoring:</span>
        <span className="text-yellow-400 font-bold flex items-center gap-1"><User size={12} /> My Pick = 2pts</span>
        <span className="text-sky-400 font-bold flex items-center gap-1"><GraduationCap size={12} /> Academy Pick = 1pt</span>
        <span className="text-purple-400 font-bold">Both correct = 3pts</span>
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {data.leaderboard.map((entry, idx) => {
          const isMe = entry.userId === currentUserId;
          const isExpanded = expandedUser === entry.userId;
          const position = idx + 1;

          return (
            <div
              key={entry.userId}
              className={cn(
                "rounded-2xl border transition-all duration-200",
                isMe
                  ? "border-yellow-500/40 bg-yellow-500/5"
                  : "border-zinc-800 bg-zinc-900/50"
              )}
            >
              <button
                onClick={() => setExpandedUser(isExpanded ? null : entry.userId)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                {/* Position */}
                <div className="w-10 shrink-0 flex items-center justify-center">
                  {position === 1 ? (
                    <Trophy className="text-yellow-400" size={22} />
                  ) : position === 2 ? (
                    <Medal className="text-zinc-300" size={22} />
                  ) : position === 3 ? (
                    <Medal className="text-amber-700" size={22} />
                  ) : (
                    <span className="text-zinc-500 font-bold text-lg">#{position}</span>
                  )}
                </div>

                {/* Avatar + Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border",
                    isMe
                      ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                      : "bg-zinc-800 border-zinc-700 text-zinc-300"
                  )}>
                    {entry.firstName[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn("font-bold", isMe ? "text-yellow-400" : "text-white")}>
                        {entry.firstName}
                      </span>
                      {isMe && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-full border border-yellow-500/30">
                          You
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500">{entry.totalPicks} picks</span>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right shrink-0">
                  <div className={cn("text-2xl font-black", entry.score > 0 ? "text-yellow-400" : "text-zinc-500")}>
                    {entry.score}
                  </div>
                  <div className="text-xs text-zinc-500">points</div>
                </div>

                {/* Expand */}
                <div className="ml-2">
                  {isExpanded ? (
                    <ChevronUp className="text-zinc-400" size={16} />
                  ) : (
                    <ChevronDown className="text-zinc-400" size={16} />
                  )}
                </div>
              </button>

              {/* Expanded picks */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-zinc-800 pt-3">
                  <p className="text-xs text-zinc-500 mb-3 font-medium uppercase tracking-wider">All Predictions</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {entry.picks
                      .sort((a, b) => a.categoryId - b.categoryId)
                      .map((pick) => (
                        <div
                          key={`${pick.categoryId}-${pick.rank}`}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-xl text-sm",
                            pick.isCorrect
                              ? "bg-green-500/10 border border-green-500/30"
                              : "bg-zinc-800/50 border border-zinc-700/50"
                          )}
                        >
                                <span className={cn("text-xs font-bold shrink-0 flex items-center gap-0.5", RANK_COLOR[pick.rank])}>
                            {pick.rank === 1 ? <User size={10} /> : <GraduationCap size={10} />}
                            {RANK_LABEL[pick.rank]}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-medium truncate">{pick.nomineeName}</p>
                            <p className="text-zinc-500 text-xs truncate">{pick.categoryName}</p>
                          </div>
                          {pick.isCorrect && (
                            <span className="text-xs text-green-400 font-bold shrink-0">+{RANK_PTS[pick.rank]}</span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
