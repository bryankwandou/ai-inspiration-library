import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ClipActions, Player } from "@/components/player";
import { ClipCard } from "@/components/clip-card";
import {
  TEMPLATE_LIBS,
  clipsIn,
  getCategory,
  getClip,
} from "@/lib/catalog";
import { clipAvatar } from "@/lib/catalog";

export const Route = createFileRoute("/watch/$id")({
  component: WatchPage,
});

function WatchPage() {
  const { id } = Route.useParams();
  const clip = getClip(id);

  if (!clip) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="font-display text-2xl">Klip tidak ditemukan</h1>
        <Link to="/" className="text-sm text-muted underline underline-offset-4">
          Kembali ke arsip
        </Link>
      </main>
    );
  }

  const cat = getCategory(clip.category);
  const related = clipsIn(clip.category).filter((c) => c.id !== clip.id);
  const showTemplates = clip.id === "himanshubuildss-template-list";

  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-4 pb-20 pt-5 sm:px-6">
      <Link
        to="/"
        className="inline-flex h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} />
        Arsip
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
        <div className="min-w-0">
          <Player clip={clip} />
          <div className="mt-5 flex items-start gap-3">
            <img
              src={clipAvatar(clip)}
              alt=""
              className="size-10 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                {cat?.kicker} · {cat?.label}
              </p>
              <h1 className="mt-1 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                {clip.title}
              </h1>
              <p className="mt-1 text-sm text-muted">
                {clip.subtitle}
                <span className="text-subtle">
                  {" "}
                  · {clip.author} @{clip.handle}
                </span>
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{clip.description}</p>
          <div className="mt-5">
            <ClipActions clip={clip} />
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-base font-medium">Yang bisa dipelajari</h2>
            <ol className="mt-3 space-y-2.5">
              {clip.takeaways.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </section>

          {clip.resources && clip.resources.length > 0 ? (
            <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <h2 className="font-display text-base font-medium">Tautan</h2>
              <ul className="mt-3 space-y-1.5">
                {clip.resources.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {showTemplates ? (
            <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <h2 className="font-display text-base font-medium">30 resource</h2>
              <ul className="mt-3 columns-1 gap-x-6 text-sm sm:columns-2">
                {TEMPLATE_LIBS.map((r, i) => (
                  <li key={r.href} className="mb-1.5 break-inside-avoid">
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted underline decoration-border underline-offset-2 hover:text-fg"
                    >
                      <span className="mr-1.5 font-mono text-[10px] text-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-lg font-medium tracking-tight">Folder yang sama</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((c, i) => (
              <ClipCard key={c.id} clip={c} index={i} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
