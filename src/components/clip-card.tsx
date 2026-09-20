import { Link } from "@tanstack/react-router";
import { Image as ImageIcon, Play } from "lucide-react";
import type { Clip } from "@/lib/catalog";
import { clipAvatar, clipSrc, clipThumb } from "@/lib/catalog";
import { useProgress, watchedRatio } from "@/lib/progress";
import { cn, formatDuration } from "@/lib/utils";

export function ClipCard({ clip, index }: { clip: Clip; index: number }) {
  const entry = useProgress((s) => s.progress[clip.id]);
  const ratio = watchedRatio(entry);
  const poster = clip.kind === "image" ? clipSrc(clip) : clipThumb(clip);

  return (
    <Link
      to="/watch/$id"
      params={{ id: clip.id }}
      className={cn(
        "group flex flex-col rounded-xl bg-surface p-1.5 shadow-[var(--shadow-border)]",
        "transition-[box-shadow,transform] duration-150 ease-out",
        "hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-elevated">
        <img
          src={poster}
          alt=""
          className="size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
        <span className="absolute left-2 top-2 font-mono text-[10px] tabular-nums tracking-wider text-fg/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        {clip.extra ? (
          <span className="absolute right-2 top-2 rounded-full bg-bg/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">
            terkait
          </span>
        ) : null}
        <span className="absolute bottom-2 right-2 rounded-sm bg-bg/80 px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-fg">
          {clip.kind === "image" ? "gambar" : formatDuration(clip.duration)}
        </span>
        <span
          className={cn(
            "absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center",
            "rounded-full bg-fg/90 text-accent-fg opacity-0 shadow-sm",
            "transition-opacity duration-200 group-hover:opacity-100",
          )}
          aria-hidden
        >
          {clip.kind === "image" ? (
            <ImageIcon className="size-4" strokeWidth={1.75} />
          ) : (
            <Play className="size-4 translate-x-px" strokeWidth={1.75} fill="currentColor" />
          )}
        </span>
        {ratio > 0.02 ? (
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-elevated">
            <span
              className="block h-full bg-accent"
              style={{ width: `${Math.round(ratio * 100)}%` }}
            />
          </span>
        ) : null}
      </div>
      <div className="flex items-start gap-3 px-2 pb-2.5 pt-3">
        <img
          src={clipAvatar(clip)}
          alt=""
          className="mt-0.5 size-7 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <h2 className="font-display text-[15px] font-medium leading-snug tracking-tight text-fg">
            {clip.title}
          </h2>
          <p className="mt-0.5 truncate text-xs text-muted">
            {clip.subtitle}
            <span className="text-subtle"> · @{clip.handle}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
