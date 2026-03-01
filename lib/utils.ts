import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Prepends the basePath so fetch("/api/...") works behind a subpath reverse proxy.
// NEXT_PUBLIC_BASE_PATH is baked in at build time (e.g. "/oscars"), empty string for root.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function apiPath(path: string) {
  return `${BASE}${path}`;
}
