"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, Star, CheckCircle2, Trophy, User, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import NomineeCard from "./NomineeCard";

interface Nominee {
  id: number;
  name: string;
  imageUrl: string | null;
  trailerUrl: string | null;
}

interface Category {
  id: number;
  name: string;
  info: string | null;
  nominees: Nominee[];
  winner: { nomineeName: string } | null;
}

interface UserPick {
  nomineeId: number;
  rank: number; // 1 = My Pick, 2 = Academy Pick
}

interface OddsData {
  [nominee: string]: { kalshi: number; polymarket: number; consensus: number };
}

interface CategorySectionProps {
  category: Category;
  userPicks: UserPick[];
  isLoggedIn: boolean;
  onVote: (categoryId: number, picks: UserPick[]) => void;
  odds: OddsData;
  defaultExpanded?: boolean;
}

export default function CategorySection({
  category,
  userPicks,
  isLoggedIn,
  onVote,
  odds,
  defaultExpanded = false,
}: CategorySectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [localPicks, setLocalPicks] = useState<UserPick[]>(userPicks);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalPicks(userPicks);
  }, [userPicks]);

  const setMyPick = useCallback((nomineeId: number) => {
    setLocalPicks((prev) => {
      const without = prev.filter((p) => p.rank !== 1);
      return [...without, { nomineeId, rank: 1 }];
    });
  }, []);

  const setAcademyPick = useCallback((nomineeId: number) => {
    setLocalPicks((prev) => {
      const without = prev.filter((p) => p.rank !== 2);
      return [...without, { nomineeId, rank: 2 }];
    });
  }, []);

  const clearMyPick = useCallback(() => {
    setLocalPicks((prev) => prev.filter((p) => p.rank !== 1));
  }, []);

  const clearAcademyPick = useCallback(() => {
    setLocalPicks((prev) => prev.filter((p) => p.rank !== 2));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId: category.id, picks: localPicks }),
      });
      onVote(category.id, localPicks);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  }

  const myPickNomineeId = localPicks.find((p) => p.rank === 1)?.nomineeId ?? null;
  const academyPickNomineeId = localPicks.find((p) => p.rank === 2)?.nomineeId ?? null;
  const hasChanges = JSON.stringify(localPicks.sort((a,b)=>a.rank-b.rank)) !== JSON.stringify([...userPicks].sort((a,b)=>a.rank-b.rank));
  const winner = category.winner?.nomineeName;

  const myPickName = category.nominees.find((n) => n.id === myPickNomineeId)?.name;
  const academyPickName = category.nominees.find((n) => n.id === academyPickNomineeId)?.name;

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300",
        winner
          ? "border-yellow-500/40 bg-yellow-500/5"
          : "border-zinc-800 bg-zinc-900/50"
      )}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          {winner ? (
            <Trophy className="text-yellow-400 shrink-0" size={20} />
          ) : (
            <Star className="text-zinc-500 shrink-0" size={20} />
          )}
          <div className="min-w-0">
            <h2 className="text-white font-bold text-lg leading-tight">{category.name}</h2>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              {category.info && (
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">
                  {category.info}
                </span>
              )}
              {winner && (
                <span className="text-xs text-yellow-400 font-medium">✓ {winner}</span>
              )}
              {!winner && isLoggedIn && myPickName && (
                <span className="text-xs text-yellow-400/80 flex items-center gap-1">
                  <User size={10} /> {myPickName}
                </span>
              )}
              {!winner && isLoggedIn && academyPickName && (
                <span className="text-xs text-sky-400/80 flex items-center gap-1">
                  <GraduationCap size={10} /> {academyPickName}
                </span>
              )}
              {!winner && !isLoggedIn && (
                <span className="text-xs text-zinc-500">{category.nominees.length} nominees</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-4">
          {/* Pick status dots */}
          {isLoggedIn && (
            <div className="flex items-center gap-1.5">
              <div className={cn("w-2 h-2 rounded-full", myPickNomineeId ? "bg-yellow-400" : "bg-zinc-700")} />
              <div className={cn("w-2 h-2 rounded-full", academyPickNomineeId ? "bg-sky-400" : "bg-zinc-700")} />
            </div>
          )}
          {expanded ? (
            <ChevronUp className="text-zinc-400" size={20} />
          ) : (
            <ChevronDown className="text-zinc-400" size={20} />
          )}
        </div>
      </button>

      {/* Content */}
      {expanded && (
        <div className="px-5 pb-5">
          {isLoggedIn && (
            <div className="mb-4 p-3 bg-zinc-800/50 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs flex-wrap">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="text-zinc-400"><span className="text-yellow-400 font-bold">My Pick</span> = 2 pts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="text-zinc-400"><span className="text-sky-400 font-bold">Academy Pick</span> = 1 pt</span>
                </div>
                <span className="text-zinc-600">Both correct = 3 pts</span>
              </div>
              <div className="shrink-0">
                {hasChanges ? (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-400 disabled:bg-zinc-700 text-black disabled:text-zinc-500 font-bold text-xs px-3 py-1.5 rounded-lg transition-all"
                  >
                    {saving ? "Saving…" : "Save Picks"}
                  </button>
                ) : (myPickNomineeId || academyPickNomineeId) ? (
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <CheckCircle2 size={12} /> Saved
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {category.nominees.map((nominee) => (
              <NomineeCard
                key={nominee.id}
                nominee={nominee}
                isMyPick={myPickNomineeId === nominee.id}
                isAcademyPick={academyPickNomineeId === nominee.id}
                myPickTaken={myPickNomineeId !== null && myPickNomineeId !== nominee.id}
                academyPickTaken={academyPickNomineeId !== null && academyPickNomineeId !== nominee.id}
                onSetMyPick={() => setMyPick(nominee.id)}
                onSetAcademyPick={() => setAcademyPick(nominee.id)}
                onClearMyPick={clearMyPick}
                onClearAcademyPick={clearAcademyPick}
                isLoggedIn={isLoggedIn}
                isWinner={winner === nominee.name}
                odds={odds[nominee.name]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
