"use client";
import { Trophy, LogOut, BarChart3, Film, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  user: { id: number; firstName: string } | null;
  activeTab: "picks" | "leaderboard";
  onTabChange: (tab: "picks" | "leaderboard") => void;
  onAuthClick: () => void;
  onLogout: () => void;
  onLogoClick?: () => void;
}

export default function Header({ user, activeTab, onTabChange, onAuthClick, onLogout, onLogoClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5" onClick={onLogoClick}>
            <div className="relative">
              <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Trophy className="text-black" size={18} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-zinc-950" />
            </div>
            <div>
              <span className="text-white font-black text-xl tracking-tight">Oscar</span>
              <span className="text-yellow-400 font-black text-xl tracking-tight">Boss</span>
            </div>
            <span className="hidden sm:block text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full ml-1">
              98th · 2026
            </span>
          </div>

          {/* Nav tabs */}
          <nav className="flex items-center gap-1 bg-zinc-800/50 rounded-xl p-1">
            <button
              onClick={() => onTabChange("picks")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                activeTab === "picks"
                  ? "bg-yellow-500 text-black"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <Film size={14} />
              <span className="hidden sm:inline">My Picks</span>
            </button>
            <button
              onClick={() => onTabChange("leaderboard")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                activeTab === "leaderboard"
                  ? "bg-yellow-500 text-black"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <BarChart3 size={14} />
              <span className="hidden sm:inline">Leaderboard</span>
            </button>
          </nav>

          {/* User area */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-yellow-500/20 border border-yellow-500/40 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-xs">
                      {user.firstName[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-zinc-300 font-medium">{user.firstName}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 text-sm px-2 py-1.5 rounded-lg hover:bg-red-400/10 transition-all"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm px-4 py-2 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-yellow-500/20"
              >
                <Star size={14} />
                Join Now
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
