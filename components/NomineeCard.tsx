"use client";
import { useState } from "react";
import { ExternalLink, Trophy, TrendingUp, User, GraduationCap, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Nominee {
  id: number;
  name: string;
  imageUrl: string | null;
  trailerUrl: string | null;
}

interface Odds {
  kalshi: number;
  polymarket: number;
  consensus: number;
}

interface NomineeCardProps {
  nominee: Nominee;
  isMyPick: boolean;    // rank 1
  isAcademyPick: boolean; // rank 2
  myPickTaken: boolean;
  academyPickTaken: boolean;
  onSetMyPick: () => void;
  onSetAcademyPick: () => void;
  onClearMyPick: () => void;
  onClearAcademyPick: () => void;
  isLoggedIn: boolean;
  isWinner: boolean;
  odds?: Odds;
}

export default function NomineeCard({
  nominee,
  isMyPick,
  isAcademyPick,
  myPickTaken,
  academyPickTaken,
  onSetMyPick,
  onSetAcademyPick,
  onClearMyPick,
  onClearAcademyPick,
  isLoggedIn,
  isWinner,
  odds,
}: NomineeCardProps) {
  const [imgError, setImgError] = useState(false);
  const isSelected = isMyPick || isAcademyPick;

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-200 group",
        isMyPick && isAcademyPick
          ? "border-2 border-purple-500 shadow-lg shadow-purple-500/20"
          : isMyPick
          ? "border-2 border-yellow-500 shadow-lg shadow-yellow-500/10"
          : isAcademyPick
          ? "border-2 border-sky-500 shadow-lg shadow-sky-500/10"
          : "border border-zinc-700/50",
        isWinner && "ring-2 ring-yellow-400 ring-offset-2 ring-offset-zinc-950"
      )}
    >
      {/* Hero image */}
      <div className="relative h-40 bg-zinc-800 overflow-hidden">
        {!imgError && nominee.imageUrl ? (
          <img
            src={nominee.imageUrl}
            alt={nominee.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
            <Trophy className="text-zinc-600" size={36} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />

        {/* Winner badge */}
        {isWinner && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Trophy size={10} /> WINNER
          </div>
        )}

        {/* Active pick badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {isMyPick && (
            <div className="bg-yellow-500/90 text-black text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <User size={9} /> My Pick
            </div>
          )}
          {isAcademyPick && (
            <div className="bg-sky-500/90 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <GraduationCap size={9} /> Academy
            </div>
          )}
        </div>

        {/* Trailer link */}
        {nominee.trailerUrl && (
          <a
            href={nominee.trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 right-2 bg-black/60 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1 transition-colors backdrop-blur-sm"
          >
            <ExternalLink size={10} /> Trailer
          </a>
        )}
      </div>

      {/* Card body */}
      <div className="p-3 bg-zinc-900">
        <h3 className="font-semibold text-sm text-white leading-tight mb-2 line-clamp-2">
          {nominee.name}
        </h3>

        {/* Odds bar */}
        {odds && (
          <div className="flex items-center gap-1 mb-3">
            <TrendingUp size={10} className="text-green-400 shrink-0" />
            <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000"
                style={{ width: `${odds.consensus}%` }}
              />
            </div>
            <span className="text-xs font-bold text-green-400 shrink-0">{odds.consensus}%</span>
          </div>
        )}

        {/* Pick buttons — only shown when logged in */}
        {isLoggedIn && (
          <div className="flex gap-1.5">
            {/* My Pick button */}
            {isMyPick ? (
              <button
                onClick={onClearMyPick}
                className="flex-1 flex items-center justify-center gap-1 bg-yellow-500/20 border border-yellow-500/60 text-yellow-400 text-xs font-bold py-1.5 rounded-lg hover:bg-yellow-500/10 transition-all"
              >
                <User size={10} /> My Pick <X size={9} />
              </button>
            ) : (
              <button
                onClick={onSetMyPick}
                disabled={myPickTaken}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 text-xs font-medium py-1.5 rounded-lg border transition-all",
                  myPickTaken
                    ? "border-zinc-700 text-zinc-600 cursor-not-allowed"
                    : "border-zinc-600 text-zinc-400 hover:border-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 cursor-pointer"
                )}
              >
                <User size={10} /> My Pick
              </button>
            )}

            {/* Academy Pick button */}
            {isAcademyPick ? (
              <button
                onClick={onClearAcademyPick}
                className="flex-1 flex items-center justify-center gap-1 bg-sky-500/20 border border-sky-500/60 text-sky-400 text-xs font-bold py-1.5 rounded-lg hover:bg-sky-500/10 transition-all"
              >
                <GraduationCap size={10} /> Academy <X size={9} />
              </button>
            ) : (
              <button
                onClick={onSetAcademyPick}
                disabled={academyPickTaken}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 text-xs font-medium py-1.5 rounded-lg border transition-all",
                  academyPickTaken
                    ? "border-zinc-700 text-zinc-600 cursor-not-allowed"
                    : "border-zinc-600 text-zinc-400 hover:border-sky-500 hover:text-sky-400 hover:bg-sky-500/10 cursor-pointer"
                )}
              >
                <GraduationCap size={10} /> Academy
              </button>
            )}
          </div>
        )}

        {!isLoggedIn && (
          <p className="text-xs text-zinc-600 text-center">Login to pick</p>
        )}
      </div>
    </div>
  );
}
