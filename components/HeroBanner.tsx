"use client";
import { Calendar, Mic, Sparkles } from "lucide-react";

export default function HeroBanner() {
  const ceremonyDate = new Date("2026-03-15T20:00:00");
  const now = new Date();
  const diffMs = ceremonyDate.getTime() - now.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700/50 p-8 mb-8">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-yellow-400" size={16} />
            <span className="text-yellow-400 text-sm font-semibold tracking-wide uppercase">
              98th Academy Awards
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight">
            Pick Your <span className="text-yellow-400">Oscar</span> Winners
          </h1>
          <p className="text-zinc-400 text-sm max-w-md">
            Predict the 2026 Academy Award winners across all 24 categories. 
            Select your top 3 picks per category and compete on the leaderboard.
          </p>
        </div>

        <div className="flex flex-row sm:flex-col gap-4 sm:gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-zinc-800/80 rounded-2xl px-4 py-3 border border-zinc-700/50">
            <Calendar className="text-yellow-400" size={20} />
            <div>
              <p className="text-white font-bold text-sm">March 15, 2026</p>
              <p className="text-zinc-500 text-xs">Ceremony Night</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-zinc-800/80 rounded-2xl px-4 py-3 border border-zinc-700/50">
            <Mic className="text-yellow-400" size={20} />
            <div>
              <p className="text-white font-bold text-sm">Conan O&#39;Brien</p>
              <p className="text-zinc-500 text-xs">Host</p>
            </div>
          </div>
          {diffDays > 0 && (
            <div className="flex items-center gap-3 bg-yellow-500/10 rounded-2xl px-4 py-3 border border-yellow-500/30">
              <div className="text-center">
                <p className="text-yellow-400 font-black text-xl leading-none">{diffDays}</p>
                <p className="text-yellow-400/70 text-xs">days left</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
