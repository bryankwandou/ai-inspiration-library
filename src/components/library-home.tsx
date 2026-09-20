import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clapperboard, Search } from "lucide-react";
import { ClipCard } from "@/components/clip-card";
import {
  CATEGORIES,
  CLIPS,
  clipsIn,
  type CategoryId,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Semua" },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

export function LibraryHome() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const base = clipsIn(filter);
    const needle = q.trim().toLowerCase();
    if (!needle) return base;
    return base.filter((c) =>
      [c.title, c.subtitle, c.handle, c.author, c.description, c.folder]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [filter, q]);

  const active = filter === "all" ? null : CATEGORIES.find((c) => c.id === filter);

  return (
    <div className="mx-auto flex min-h-dvh max-w-7xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
            Arsip & Studi Kreatif
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium leading-[1.15] tracking-tight text-fg sm:text-5xl">
            AI Inspiration Library
          </h1>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
            {CLIPS.length} berkas dari X, dipisah lima folder: ide game Fable,
            karakter 3D, landing page, AI trading, dan course. Putar di sini atau
            unduh file aslinya.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-subtle">
          <Clapperboard className="size-4" strokeWidth={1.5} />
          <span className="tabular-nums">{CLIPS.filter((c) => c.kind === "video").length} video</span>
          <span aria-hidden className="text-border-strong">
            /
          </span>
          <span>5 folder</span>
        </div>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <nav
          aria-label="Folder"
          className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {FILTERS.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "h-10 shrink-0 rounded-full px-3.5 text-sm transition-colors duration-150",
                  on
                    ? "bg-accent font-medium text-accent-fg"
                    : "text-muted hover:text-fg",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </nav>
        <label className="relative block w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari judul, akun, atau topik"
            className="h-11 w-full rounded-full bg-surface pl-10 pr-4 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle focus:outline-2 focus:outline-offset-2 focus:outline-ring"
          />
        </label>
      </div>

      {active ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          <span className="font-mono text-[11px] text-subtle">{active.kicker}</span>
          <span className="mx-2 text-border-strong">·</span>
          {active.blurb}
        </p>
      ) : null}

      {list.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">Tidak ada klip yang cocok.</p>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((clip, i) => (
            <ClipCard key={clip.id} clip={clip} index={i} />
          ))}
        </section>
      )}

      <aside className="mt-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <h2 className="font-display text-lg font-medium tracking-tight">Struktur folder</h2>
        <p className="mt-1 text-sm text-muted">
          Satu arsip, lima subfolder. Nama file memakai akun + topik.
        </p>
        <ul className="mt-4 grid gap-2 font-mono text-xs text-muted sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <li key={c.id} className="flex items-baseline gap-3 rounded-lg bg-elevated px-3 py-2">
              <span className="text-subtle">{c.folder}</span>
              <span className="text-fg">{clipsIn(c.id).length}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-subtle">
          Tutorial panjang ada di folder 03 (Codex 9 menit, Mythos 12 menit) dan 05
          (kartun AI 67 menit).
        </p>
        <Link
          to="/watch/$id"
          params={{ id: "viktoroddy-codex-3d-tutorial" }}
          className="mt-3 inline-flex text-sm text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg"
        >
          Mulai dari tutorial Codex
        </Link>
      </aside>
    </div>
  );
}
