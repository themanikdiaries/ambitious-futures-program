import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { mentees } from "@/data/mentees";
import indiaTopo from "@/assets/geo/india.topo.json";

/* Normalize the raw "place" field to a canonical state name matching the
   topojson `name` property. */
const CANON: Record<string, string> = {
  "up": "Uttar Pradesh",
  "uttar pradesh": "Uttar Pradesh",
  "uttarpradesh": "Uttar Pradesh",
  "prayagraj": "Uttar Pradesh",
  "delhi": "NCT of Delhi",
  "new delhi": "NCT of Delhi",
  "tamilnadu": "Tamil Nadu",
  "tamil nadu": "Tamil Nadu",
  "chennai": "Tamil Nadu",
  "andhrapradesh": "Andhra Pradesh",
  "andhra pradesh": "Andhra Pradesh",
  "vizianagaram": "Andhra Pradesh",
  "haryana": "Haryana",
  "rajasthan": "Rajasthan",
  "jaipur": "Rajasthan",
  "telangana": "Telangana",
  "uttrakhand": "Uttarakhand",
  "uttarakhand": "Uttarakhand",
  "punjab": "Punjab",
  "west bengal": "West Bengal",
  "maharashtra": "Maharashtra",
  "kerala": "Kerala",
  "karnataka": "Karnataka",
  "gujarat": "Gujarat",
  "goa": "Goa",
  "assam": "Assam",
  "bihar": "Bihar",
  "jharkhand": "Jharkhand",
  "odisha": "Odisha",
  "madhya pradesh": "Madhya Pradesh",
  "chhattisgarh": "Chhattisgarh",
  "himachal pradesh": "Himachal Pradesh",
  "arunanchal pradesh": "Arunanchal Pradesh",
  "arunachal pradesh": "Arunanchal Pradesh",
  "sikkim": "Sikkim",
  "manipur": "Manipur",
  "meghalaya": "Meghalaya",
  "mizoram": "Mizoram",
  "nagaland": "Nagaland",
  "tripura": "Tripura",
};

function extractState(place: string): string | null {
  if (!place) return null;
  const cleaned = place
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x && x.toLowerCase() !== "india" && x.toLowerCase() !== "country");
  const candidates = cleaned.length ? [cleaned[cleaned.length - 1], ...cleaned] : [];
  for (const raw of candidates) {
    const norm = raw.toLowerCase().replace(/\s+/g, " ").trim();
    if (CANON[norm]) return CANON[norm];
    // multi-word fallback: check if the raw text contains a known state
    for (const k of Object.keys(CANON)) {
      if (norm.includes(k)) return CANON[k];
    }
  }
  return null;
}

export function IndiaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const byState = useMemo(() => {
    const m = new Map<string, typeof mentees>();
    for (const p of mentees) {
      const s = extractState(p.place) ?? "Unknown";
      if (!m.has(s)) m.set(s, []);
      m.get(s)!.push(p);
    }
    return m;
  }, []);

  const totalMapped = useMemo(
    () =>
      Array.from(byState.entries())
        .filter(([s]) => s !== "Unknown")
        .reduce((a, [, v]) => a + v.length, 0),
    [byState],
  );

  const max = Math.max(1, ...Array.from(byState.values()).map((v) => v.length));

  const activeState = selected ?? hovered;
  const activeList = activeState ? byState.get(activeState) ?? [] : [];

  const topStates = Array.from(byState.entries())
    .filter(([s]) => s !== "Unknown")
    .sort((a, b) => b[1].length - a[1].length);

  return (
    <section
      id="impact-map"
      className="border-b-4 border-ink bg-white py-20 sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
            ✺ Nationwide Impact
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Mentees across{" "}
            <span className="text-[var(--brand-red)]">{topStates.length}</span> states of India
          </h2>
          <p className="mt-4 text-base text-ink/75 sm:text-lg">
            Hover or tap a state to see who's cracking DSA & internships from there.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Map */}
          <div
            className="relative overflow-hidden rounded-3xl border-2 border-ink bg-[var(--brand-yellow)]/25 shadow-pop lg:col-span-3"
            style={{ borderColor: "var(--ink)" }}
          >
            <div className="absolute left-4 top-4 z-10 rounded-full border-2 border-ink bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest shadow-card" style={{ borderColor: "var(--ink)" }}>
              {totalMapped} mentees mapped
            </div>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ center: [82, 22], scale: 900 }}
              width={600}
              height={640}
              className="h-auto w-full"
            >
              <Geographies geography={indiaTopo as any}>
                {({ geographies }) =>
                  geographies.map((geo: any) => {
                    const name: string = geo.properties.name ?? "";
                    const count = byState.get(name)?.length ?? 0;
                    const intensity = count / max;
                    const isActive = activeState === name;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setHovered(name)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() =>
                          setSelected((s) => (s === name ? null : name))
                        }
                        style={{
                          default: {
                            fill: count
                              ? `oklch(${0.85 - intensity * 0.35} ${0.14 + intensity * 0.1} 28)`
                              : "#fff",
                            stroke: "var(--ink)",
                            strokeWidth: 0.6,
                            outline: "none",
                            cursor: count ? "pointer" : "default",
                          },
                          hover: {
                            fill: count ? "var(--brand-blue)" : "var(--brand-yellow)",
                            stroke: "var(--ink)",
                            strokeWidth: 1,
                            outline: "none",
                            cursor: count ? "pointer" : "default",
                          },
                          pressed: {
                            fill: "var(--brand-blue)",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              <Geographies geography={indiaTopo as any}>
                {({ geographies }) =>
                  geographies.map((geo: any) => {
                    const name: string = geo.properties.name ?? "";
                    const count = byState.get(name)?.length ?? 0;
                    if (!count) return null;
                    const [lng, lat] = geoCentroid(geo);
                    const r = 6 + Math.sqrt(count) * 4;
                    return (
                      <Marker key={"m-" + geo.rsmKey} coordinates={[lng, lat]}>
                        <circle
                          r={r}
                          fill="var(--brand-red)"
                          stroke="var(--ink)"
                          strokeWidth={2}
                          opacity={0.9}
                          style={{ pointerEvents: "none" }}
                        />
                        <text
                          textAnchor="middle"
                          y={4}
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: 11,
                            fill: "white",
                            pointerEvents: "none",
                          }}
                        >
                          {count}
                        </text>
                      </Marker>
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>

          {/* Side panel */}
          <div className="lg:col-span-2">
            <div
              className="rounded-3xl border-2 border-ink bg-[var(--brand-blue)] p-6 text-white shadow-pop"
              style={{ borderColor: "var(--ink)" }}
            >
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--brand-yellow)]">
                {activeState ? "Spotlight" : "State-wise breakdown"}
              </p>

              {activeState ? (
                <>
                  <h3 className="mt-2 font-display text-3xl font-extrabold">
                    {activeState}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-white/80">
                    {activeList.length} mentee{activeList.length === 1 ? "" : "s"} ·{" "}
                    {new Set(activeList.map((p) => p.college)).size} college
                    {new Set(activeList.map((p) => p.college)).size === 1 ? "" : "s"}
                  </p>
                  <div className="mt-5 max-h-80 space-y-2 overflow-y-auto pr-1">
                    {activeList.map((p) => (
                      <a
                        key={p.name}
                        href={p.linkedin || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-white/20 bg-white/10 p-3 transition hover:bg-white/20"
                      >
                        <p className="font-display text-sm font-extrabold">{p.name}</p>
                        <p className="mt-0.5 line-clamp-1 text-[11px] font-semibold text-white/80">
                          {p.college}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-[10px] text-white/60">
                          {p.branch}
                        </p>
                      </a>
                    ))}
                  </div>
                  {selected && (
                    <button
                      onClick={() => setSelected(null)}
                      className="mt-4 rounded-full border-2 border-white bg-transparent px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider transition hover:bg-white hover:text-ink"
                    >
                      ← All states
                    </button>
                  )}
                </>
              ) : (
                <>
                  <h3 className="mt-2 font-display text-2xl font-extrabold">
                    Where our mentees are learning from
                  </h3>
                  <ul className="mt-5 max-h-96 space-y-1.5 overflow-y-auto pr-1">
                    {topStates.map(([s, arr]) => {
                      const pct = Math.round((arr.length / totalMapped) * 100);
                      return (
                        <li
                          key={s}
                          onMouseEnter={() => setHovered(s)}
                          onMouseLeave={() => setHovered(null)}
                          onClick={() => setSelected(s)}
                          className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-white/10"
                        >
                          <span className="w-6 text-right font-display text-base font-extrabold text-[var(--brand-yellow)]">
                            {arr.length}
                          </span>
                          <span className="flex-1 truncate text-sm font-semibold">
                            {s}
                          </span>
                          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                            <span
                              className="block h-full rounded-full bg-[var(--brand-red)] transition-all"
                              style={{ width: `${(arr.length / max) * 100}%` }}
                            />
                          </span>
                          <span className="w-9 text-right text-[10px] font-bold text-white/70">
                            {pct}%
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            {/* Impact stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <ImpactStat value={String(topStates.length)} label="States" bg="var(--brand-red)" fg="white" />
              <ImpactStat
                value={String(new Set(mentees.map((p) => p.college)).size)}
                label="Colleges"
                bg="var(--brand-yellow)"
                fg="var(--ink)"
              />
              <ImpactStat value={String(mentees.length)} label="Mentees" bg="var(--ink)" fg="white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactStat({
  value,
  label,
  bg,
  fg,
}: {
  value: string;
  label: string;
  bg: string;
  fg: string;
}) {
  return (
    <div
      className="rounded-2xl border-2 border-ink p-3 text-center shadow-card"
      style={{ borderColor: "var(--ink)", background: bg, color: fg }}
    >
      <div className="font-display text-2xl font-extrabold leading-none">{value}</div>
      <div className="mt-1 text-[9px] font-bold uppercase tracking-widest opacity-90">
        {label}
      </div>
    </div>
  );
}
