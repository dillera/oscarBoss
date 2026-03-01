"use client";
import { useState, useEffect } from "react";
import { Trophy, Check, X, ChevronDown } from "lucide-react";
import { cn, apiPath } from "@/lib/utils";

interface Nominee {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  nominees: Nominee[];
  winner: { nomineeName: string } | null;
}

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [selectedWinners, setSelectedWinners] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch(apiPath("/api/categories"))
      .then((r) => r.json())
      .then((d) => {
        setCategories(d.categories || []);
        const existing: Record<number, string> = {};
        for (const cat of d.categories || []) {
          if (cat.winner) existing[cat.id] = cat.winner.nomineeName;
        }
        setSelectedWinners(existing);
        setLoading(false);
      });
  }, []);

  async function saveWinner(categoryId: number, nomineeName: string) {
    setSaving(categoryId);
    try {
      await fetch(apiPath("/api/winners"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, nomineeName }),
      });
      setSelectedWinners((prev) => ({ ...prev, [categoryId]: nomineeName }));
      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId ? { ...c, winner: { nomineeName } } : c
        )
      );
    } finally {
      setSaving(null);
    }
  }

  async function clearWinner(categoryId: number) {
    setSaving(categoryId);
    try {
      await fetch(apiPath("/api/winners"), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId }),
      });
      setSelectedWinners((prev) => {
        const next = { ...prev };
        delete next[categoryId];
        return next;
      });
      setCategories((prev) =>
        prev.map((c) => (c.id === categoryId ? { ...c, winner: null } : c))
      );
    } finally {
      setSaving(null);
    }
  }

  const announced = Object.keys(selectedWinners).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="w-full max-w-2xl bg-zinc-900 border border-yellow-500/30 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-xl">
              <Trophy className="text-yellow-400" size={20} />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Results Tally — Admin</h2>
              <p className="text-zinc-400 text-sm">
                {announced} / {categories.length} winners announced
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-3 border-b border-zinc-800">
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: categories.length > 0 ? `${(announced / categories.length) * 100}%` : "0%" }}
            />
          </div>
        </div>

        {/* Category list */}
        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            categories.map((cat) => {
              const currentWinner = selectedWinners[cat.id];
              const isSaving = saving === cat.id;

              return (
                <div
                  key={cat.id}
                  className={cn(
                    "rounded-xl border p-4 transition-all",
                    currentWinner
                      ? "border-yellow-500/40 bg-yellow-500/5"
                      : "border-zinc-700/50 bg-zinc-800/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {currentWinner ? (
                          <Trophy className="text-yellow-400 shrink-0" size={14} />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-zinc-600 shrink-0" />
                        )}
                        <p className="text-white font-medium text-sm truncate">{cat.name}</p>
                      </div>
                      {currentWinner && (
                        <p className="text-yellow-400 text-xs font-medium ml-5 mb-2">
                          ✓ {currentWinner}
                        </p>
                      )}
                    </div>
                    {currentWinner && (
                      <button
                        onClick={() => clearWinner(cat.id)}
                        disabled={isSaving}
                        className="text-zinc-500 hover:text-red-400 text-xs shrink-0 transition-colors"
                        title="Clear winner"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Nominee selector */}
                  <div className="relative">
                    <select
                      value={currentWinner || ""}
                      onChange={(e) => {
                        if (e.target.value) saveWinner(cat.id, e.target.value);
                      }}
                      disabled={isSaving}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-yellow-500 transition-colors appearance-none pr-8 disabled:opacity-50"
                    >
                      <option value="">— Select Winner —</option>
                      {cat.nominees.map((nom) => (
                        <option key={nom.id} value={nom.name}>
                          {nom.name}
                          {currentWinner === nom.name ? " ✓" : ""}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={14} />
                  </div>

                  {isSaving && (
                    <p className="text-xs text-zinc-500 mt-1 ml-1">Saving…</p>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 border-t border-zinc-800 flex items-center justify-between">
          <p className="text-zinc-500 text-xs">
            Winners update the leaderboard in real time for all users.
          </p>
          <button
            onClick={onClose}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm px-4 py-2 rounded-xl transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
