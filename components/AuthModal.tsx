"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: { id: number; firstName: string }) => void;
}

export default function AuthModal({ open, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        onSuccess(data.user);
        onClose();
        setFirstName("");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
          <div className="bg-zinc-900 border border-yellow-500/30 rounded-2xl p-8 shadow-2xl shadow-yellow-500/10">
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </Dialog.Close>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <Trophy className="text-yellow-400" size={24} />
              </div>
              <div>
                <Dialog.Title className="text-xl font-bold text-white">
                  {mode === "register" ? "Join OscarBoss" : "Welcome Back"}
                </Dialog.Title>
                <Dialog.Description className="text-zinc-400 text-sm">
                  {mode === "register" ? "Create your free prediction account" : "Sign in to your account"}
                </Dialog.Description>
              </div>
            </div>

            <div className="flex rounded-xl bg-zinc-800 p-1 mb-6">
              {(["register", "login"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(""); }}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                    mode === m
                      ? "bg-yellow-500 text-black"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {m === "register" ? "Register" : "Login"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !firstName.trim()}
                className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-bold py-3 rounded-xl transition-all transform active:scale-95"
              >
                {loading ? "Loading…" : mode === "register" ? "Create Account" : "Sign In"}
              </button>
            </form>

            <p className="text-center text-zinc-500 text-xs mt-4">
              No password needed — just your first name!
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
