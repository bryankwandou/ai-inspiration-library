import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import type { Clip } from "@/lib/catalog";
import { clipSrc } from "@/lib/catalog";
import { useProgress } from "@/lib/progress";
import { formatDuration } from "@/lib/utils";

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;

export function Player({ clip }: { clip: Clip }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mark = useProgress((s) => s.mark);
  const saved = useProgress((s) => s.progress[clip.id]);
  const [speed, setSpeed] = useState(1);
  const src = clipSrc(clip);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onMeta = () => {
      if (saved?.t && saved.t > 2 && saved.t < (saved.d || el.duration) - 2) {
        el.currentTime = saved.t;
      }
    };
    const onTime = () => {
      if (!el.duration) return;
      mark(clip.id, el.currentTime, el.duration);
    };
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("pause", onTime);
    return () => {
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("pause", onTime);
    };
  }, [clip.id, mark, saved?.d, saved?.t]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  }, [speed]);

  if (clip.kind === "image") {
    return (
      <div className="overflow-hidden rounded-xl bg-elevated p-1.5 shadow-[var(--shadow-border)]">
        <img
          src={src}
          alt={clip.title}
          className="mx-auto max-h-[min(72vh,880px)] w-full rounded-lg object-contain"
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-elevated p-1.5 shadow-[var(--shadow-border)]">
      <video
        ref={videoRef}
        src={src}
        poster={`/library/thumbs/${clip.id}.jpg`}
        controls
        playsInline
        preload="metadata"
        className="mx-auto max-h-[min(68vh,820px)] w-full rounded-lg bg-bg object-contain"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5">
        <p className="font-mono text-[11px] tabular-nums text-subtle">
          {clip.resolution}
          <span className="mx-2 text-border-strong">/</span>
          {formatDuration(clip.duration)}
        </p>
        <div className="flex flex-wrap items-center gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={
                s === speed
                  ? "h-8 rounded-full bg-accent px-2.5 font-mono text-[11px] font-medium text-accent-fg"
                  : "h-8 rounded-full px-2.5 font-mono text-[11px] text-muted transition-colors hover:text-fg"
              }
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClipActions({ clip }: { clip: Clip }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={clipSrc(clip)}
        download={clip.filename}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-accent-fg transition-transform duration-150 active:scale-[0.96]"
      >
        <Download className="size-4" strokeWidth={1.75} />
        Unduh file
      </a>
      <a
        href={clip.tweetUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-muted shadow-[var(--shadow-border)] transition-[box-shadow,color] duration-150 hover:text-fg hover:shadow-[var(--shadow-border-hover)]"
      >
        <ExternalLink className="size-4" strokeWidth={1.75} />
        Postingan asli
      </a>
    </div>
  );
}
