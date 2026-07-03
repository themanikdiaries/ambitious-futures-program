import { Navbar, Footer, ScrollToTop } from "./index";
import { MenteesGrid } from "@/components/MenteesGrid";
import { IndiaMap } from "@/components/IndiaMap";
import { mentees } from "@/data/mentees";
import { useEffect } from "react";

const APPLY_FORM_URL =
  "https://airtable.com/appygJDzQSoSiPzuR/pageFJqBGak4pli3Y/form";

export default function MenteesPage() {
  useEffect(() => {
    document.title = `Meet the ${mentees.length} mentees · GLT DSA Cohort 1`;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />
      <main>
        {/* Hero */}
        <section
          id="top"
          className="relative overflow-hidden border-b-4 border-ink bg-gradient-hero pt-32 pb-16 sm:pt-40 sm:pb-24"
          style={{ borderColor: "var(--ink)" }}
        >
          <div
            className="pointer-events-none absolute -left-12 top-24 h-28 w-28 rounded-full bg-[var(--brand-red)] opacity-90 sm:h-40 sm:w-40"
          />
          <div className="pointer-events-none absolute right-10 top-32 h-16 w-16 rotate-12 bg-[var(--brand-yellow)] sm:h-24 sm:w-24" />
          <div
            className="pointer-events-none absolute -right-8 bottom-8 h-24 w-24 rotate-45 border-4 border-ink sm:h-40 sm:w-40"
            style={{ borderColor: "var(--ink)" }}
          />

          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <span
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink sm:text-xs"
              style={{ borderColor: "var(--ink)" }}
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--brand-red)]" />
              Cohort 1 · Mentees
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-[var(--brand-red)]">{mentees.length}</span> ambitious women.{" "}
              <span className="text-[var(--brand-blue)]">One</span> cohort.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/75 sm:text-lg">
              From IITs to state universities, from tier-1 metros to small towns — meet the girls
              building the future of tech through GLT's first DSA & Internship guidance cohort.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#impact-map"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-[var(--brand-blue)] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-pop transition-transform hover:-translate-y-1"
                style={{ borderColor: "var(--ink)" }}
              >
                See the impact map
              </a>
              <a
                href={APPLY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-[var(--brand-red)] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-pop transition-transform hover:-translate-y-1"
                style={{ borderColor: "var(--ink)" }}
              >
                Apply as Mentee →
              </a>
            </div>
          </div>
        </section>

        <IndiaMap />
        <MenteesGrid initialVisible={24} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
