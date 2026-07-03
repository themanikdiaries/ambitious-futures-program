import { useMemo, useState } from "react";
import { mentees as menteesData, type Mentee } from "@/data/mentees";

const palette = [
  { bg: "var(--brand-red)", fg: "white" },
  { bg: "var(--brand-blue)", fg: "white" },
  { bg: "var(--brand-yellow)", fg: "var(--ink)" },
  { bg: "white", fg: "var(--ink)" },
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

export function MenteesGrid({ initialVisible = 24 }: { initialVisible?: number }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(initialVisible);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      q
        ? menteesData.filter(
            (m) =>
              m.name.toLowerCase().includes(q) ||
              m.college.toLowerCase().includes(q) ||
              m.place.toLowerCase().includes(q) ||
              m.branch.toLowerCase().includes(q),
          )
        : menteesData,
    [q],
  );
  const shown = filtered.slice(0, visible);

  return (
    <section
      id="mentees"
      className="border-b-4 border-ink bg-[var(--brand-yellow)] py-20 sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
            ✺ Cohort 1
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Meet the {menteesData.length} mentees
          </h2>
          <p className="mt-4 text-base text-ink/80 sm:text-lg">
            Ambitious women from across India cracking DSA and internships together.
          </p>
        </div>

        <div
          className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 shadow-card"
          style={{ borderColor: "var(--ink)" }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(initialVisible);
            }}
            placeholder="Search by name, college, city or branch"
            className="w-full bg-transparent text-sm font-medium text-ink placeholder:text-ink/50 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded-full px-2 text-xs font-bold text-ink/60 hover:text-ink"
            >
              clear
            </button>
          )}
        </div>
        <p className="mt-2 text-center text-xs font-semibold text-ink/70">
          Showing {shown.length} of {filtered.length}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((p, i) => (
            <MenteeCard key={p.name + i} p={p} i={i} />
          ))}
        </div>

        {visible < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + 24)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-[var(--brand-red)] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-pop transition-transform hover:-translate-y-1"
              style={{ borderColor: "var(--ink)" }}
            >
              Load more mentees
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-yellow)]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function MenteeCard({ p, i }: { p: Mentee; i: number }) {
  const c = palette[i % palette.length];
  const img = (p as Mentee & { image?: string }).image;
  return (
    <div
      className={`group relative block overflow-hidden rounded-3xl border-2 border-ink shadow-card transition-transform hover:-translate-y-2 hover:rotate-0 ${
        i % 2 === 0 ? "rotate-1" : "-rotate-1"
      }`}
      style={{ background: c.bg, borderColor: "var(--ink)", color: c.fg }}
    >
      <div
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden border-b-2 border-ink"
        style={{
          borderColor: "var(--ink)",
          background: `linear-gradient(135deg, ${c.bg} 0%, rgba(0,0,0,0.15) 100%)`,
        }}
      >
        {img ? (
          <img
            src={img}
            alt={p.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span
            className="font-display text-6xl font-black tracking-tight sm:text-7xl"
            style={{ color: c.fg }}
          >
            {initials(p.name)}
          </span>
        )}
        <span
          className="absolute -right-6 top-4 z-10 rotate-12 border-2 border-ink bg-white px-8 py-0.5 text-[10px] font-extrabold uppercase tracking-widest shadow-card"
          style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
        >
          Mentee · C1
        </span>
        <span
          className="absolute bottom-3 left-3 z-10 rounded-full border-2 border-ink bg-white/95 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider"
          style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
        >
          #{String(i + 1).padStart(3, "0")}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-extrabold leading-tight">{p.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs font-semibold opacity-90">{p.branch}</p>
        <p className="mt-2 line-clamp-2 text-xs font-medium opacity-80">{p.college}</p>

        {p.place && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-current px-2.5 py-0.5 text-[10px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {p.place}
            </span>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {p.linkedin && (
            <a
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} on LinkedIn`}
              className="group/li relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border-2 border-current bg-current/0 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-all hover:scale-105"
              style={{ color: c.fg }}
            >
              <span
                className="absolute inset-0 -translate-x-full bg-[#0A66C2] transition-transform duration-300 group-hover/li:translate-x-0"
                aria-hidden
              />
              <svg
                viewBox="0 0 24 24"
                className="relative h-3.5 w-3.5 transition-colors group-hover/li:text-white"
                fill="currentColor"
              >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
              <span className="relative transition-colors group-hover/li:text-white">LinkedIn</span>
            </a>
          )}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} on GitHub`}
              className="group/gh relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border-2 border-current px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-all hover:scale-105"
              style={{ color: c.fg }}
            >
              <span
                className="absolute inset-0 -translate-x-full bg-[var(--ink)] transition-transform duration-300 group-hover/gh:translate-x-0"
                aria-hidden
              />
              <svg
                viewBox="0 0 24 24"
                className="relative h-3.5 w-3.5 transition-transform duration-500 group-hover/gh:rotate-[360deg] group-hover/gh:text-white"
                fill="currentColor"
              >
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.19a11.03 11.03 0 0 1 5.79 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.59.24 2.77.12 3.06.74.81 1.19 1.85 1.19 3.11 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
              </svg>
              <span className="relative transition-colors group-hover/gh:text-white">GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
