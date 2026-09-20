import { create } from "zustand";
import { persist } from "zustand/middleware";

type Entry = { t: number; d: number };

type ProgressState = {
  progress: Record<string, Entry>;
  mark: (id: string, t: number, d: number) => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      progress: {},
      mark: (id, t, d) =>
        set((s) => ({
          progress: { ...s.progress, [id]: { t, d } },
        })),
    }),
    { name: "lab-referensi-progress" },
  ),
);

export function watchedRatio(entry: Entry | undefined): number {
  if (!entry || !entry.d) return 0;
  return Math.min(1, Math.max(0, entry.t / entry.d));
}
