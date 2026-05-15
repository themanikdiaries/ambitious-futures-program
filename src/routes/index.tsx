import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroIllustration from "@/assets/hero-illustration.jpg";
import mentor1 from "@/assets/mentor-1.jpg";
import mentor2 from "@/assets/mentor-2.jpg";
import mentor3 from "@/assets/mentor-3.jpg";
import mentor4 from "@/assets/mentor-4.jpg";
import community1 from "@/assets/community-1.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GLT DSA & Internship Guidance Cohort — Girls Leading Tech" },
      {
        name: "description",
        content:
          "A focused 4-week DSA and internship guidance cohort. Learn data structures, build projects, crack interviews, and land your first internship — guided by women already in tech.",
      },
      { property: "og:title", content: "GLT DSA & Internship Guidance Cohort" },
      {
        property: "og:description",
        content:
          "Master DSA fundamentals and land your first internship in 4 weeks with mentors who've done it.",
      },
    ],
  }),
  component: LandingPage,
});

const APPLY_MENTEE_URL = "#apply-mentee";
const APPLY_MENTOR_URL = "#apply-mentor";

function LandingPage() {
  // Master GSAP setup: scroll reveals, parallax, 3D tilts
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Generic reveal for [data-reveal]
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // 3D tilt-in reveals for cards
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          rotateX: 35,
          rotateY: -15,
          transformPerspective: 1200,
          transformOrigin: "center bottom",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Floating shape parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.3");
        gsap.to(el, {
          y: () => window.innerHeight * speed * -1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Scroll-driven 3D rotation for [data-spin3d]
      gsap.utils.toArray<HTMLElement>("[data-spin3d]").forEach((el) => {
        gsap.to(el, {
          rotateY: 360,
          rotateX: 25,
          ease: "none",
          transformPerspective: 1000,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });

      // Mousemove 3D tilt for [data-mouse3d]
      gsap.utils.toArray<HTMLElement>("[data-mouse3d]").forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(el, {
            rotateY: x * 18,
            rotateX: -y * 18,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out",
          });
        };
        const onLeave = () =>
          gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power3.out" });
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });

      // Hero headline word-by-word
      const headline = document.querySelector("[data-headline]");
      if (headline) {
        const words = headline.querySelectorAll("[data-word]");
        gsap.from(words, {
          y: 80,
          opacity: 0,
          rotateX: -60,
          duration: 0.9,
          stagger: 0.07,
          ease: "power4.out",
        });
      }

      // Section titles slide-in
      gsap.utils.toArray<HTMLElement>("[data-section-title]").forEach((el) => {
        gsap.from(el, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Timeline cards
      gsap.utils.toArray<HTMLElement>("[data-week-card]").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -80 : 80,
          rotateY: i % 2 === 0 ? -25 : 25,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          transformPerspective: 1000,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <MarqueeBar />
        <WhyThisExists />
        <ProgramOverview />
        <Timeline />
        <Mentors />
        <OrganizingTeam />
        <WhoShouldApply />
        <Process />
        <CommunityProof />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* -------------------------------- Navbar -------------------------------- */
function Navbar() {
  const links = [
    { label: "About", href: "#why" },
    { label: "Program", href: "#program" },
    { label: "Timeline", href: "#timeline" },
    { label: "Mentors", href: "#mentors" },
    { label: "FAQs", href: "#faq" },
  ];
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4">
      <nav
        className="pointer-events-auto flex max-w-[calc(100vw-1.5rem)] items-center gap-1 overflow-x-auto rounded-full border-2 border-ink bg-white/60 px-2 py-2 shadow-pop backdrop-blur-xl supports-[backdrop-filter]:bg-white/40 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ borderColor: "var(--ink)" }}
      >
        <span className="sm:hidden inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-yellow)] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-ink whitespace-nowrap" style={{ color: "var(--ink)" }}>
          GLT · DSA Cohort
        </span>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-[var(--brand-yellow)] sm:inline-block whitespace-nowrap"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#apply"
          className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-red)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--brand-blue)] whitespace-nowrap"
        >
          Apply
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-yellow)]" />
        </a>
      </nav>
    </header>
  );
}

/* --------------------------------- Hero --------------------------------- */
function Hero() {
  const headline = "Crack Your First Internship with Women in Tech Who've Done It.";
  const words = headline.split(" ");

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-hero pt-28 pb-16 sm:pt-40 sm:pb-28"
    >
      {/* Bauhaus floating shapes */}
      <div
        data-parallax="0.25"
        className="pointer-events-none absolute -left-16 top-32 h-32 w-32 rounded-full bg-[var(--brand-red)] opacity-90 sm:h-40 sm:w-40"
      />
      <div
        data-parallax="0.4"
        data-spin3d
        className="pointer-events-none absolute right-6 top-20 h-20 w-20 rotate-12 bg-[var(--brand-yellow)] sm:right-10 sm:top-24 sm:h-24 sm:w-24"
      />
      <div
        data-parallax="0.2"
        data-spin3d
        className="pointer-events-none absolute left-1/3 bottom-12 hidden h-32 w-32 rotate-45 border-4 border-ink sm:block"
        style={{ borderColor: "var(--ink)" }}
      />
      <svg
        data-parallax="0.35"
        data-spin3d
        className="pointer-events-none absolute -right-10 bottom-20 h-32 w-32 text-[var(--brand-blue)] sm:h-48 sm:w-48"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <polygon points="50,5 95,95 5,95" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-[var(--brand-yellow)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink sm:text-xs"
            style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--brand-red)]" />
            DSA & Internship Guidance Cohort
          </span>

          <h1
            data-headline
            className="mt-5 font-display text-[2.25rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pr-2 align-bottom sm:pr-3">
                <span
                  data-word
                  className={`inline-block ${
                    w === "Women" || w === "Tech" ? "text-[var(--brand-red)]" : ""
                  } ${w === "Internship" ? "text-[var(--brand-blue)]" : ""}`}
                >
                  {w === "Women" ? (
                    <span className="relative">
                      {w}
                      <svg
                        className="absolute -bottom-2 left-0 h-3 w-full text-[var(--brand-yellow)]"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                    </span>
                  ) : (
                    w
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-base text-foreground/75 sm:text-lg">
            A focused 4-week DSA & internship guidance cohort — taught by women already
            building careers in tech. Roadmaps, mock interviews, resume reviews, and a
            community that actually shows up.
          </p>

          <div className="mt-8 flex flex-wrap gap-3" id="apply">
            <Button
              asChild
              size="lg"
              className="rounded-full border-2 border-ink bg-[var(--brand-red)] text-white shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              style={{ borderColor: "var(--ink)" }}
            >
              <a href={APPLY_MENTEE_URL}>
                Apply as Mentee →
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full border-2 border-ink bg-[var(--brand-blue)] text-white shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              style={{ borderColor: "var(--ink)" }}
            >
              <a href={APPLY_MENTOR_URL}>Apply as Mentor</a>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3 border-t-4 border-ink pt-6 sm:mt-12 sm:gap-4 sm:pt-8" style={{ borderColor: "var(--ink)" }}>
            <Stat value="4,000+" label="Girls in community" color="red" />
            <Stat value="1,100+" label="Colleges" color="blue" />
            <Stat value="23+" label="States" color="yellow" />
          </dl>
        </div>

        <div className="relative" data-mouse3d style={{ transformStyle: "preserve-3d" }}>
          <div
            className="relative rotate-2 rounded-3xl border-4 border-ink bg-card p-2 shadow-soft"
            style={{ borderColor: "var(--ink)" }}
          >
            <img
              src={heroIllustration}
              alt="Women in tech mentorship community collaborating"
              width={1024}
              height={1024}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
          <MentorPreviewCard
            className="absolute -bottom-4 -left-3 -rotate-3 sm:-bottom-6 sm:-left-6"
            img={mentor1}
            name="Ananya Sharma"
            role="SDE Intern @ Microsoft"
            color="var(--brand-yellow)"
          />
          <MentorPreviewCard
            className="absolute -right-2 -top-4 hidden rotate-3 sm:-right-4 sm:-top-6 sm:block"
            img={mentor3}
            name="Riya Verma"
            role="PM Intern @ Google"
            color="var(--brand-red)"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: "red" | "blue" | "yellow";
}) {
  const colorMap = {
    red: "var(--brand-red)",
    blue: "var(--brand-blue)",
    yellow: "var(--brand-yellow)",
  };
  return (
    <div>
      <dt
        className="font-display text-3xl font-extrabold sm:text-4xl"
        style={{ color: colorMap[color] }}
      >
        {value}
      </dt>
      <dd className="mt-1 text-xs font-semibold uppercase tracking-wider text-foreground/70 sm:text-sm">{label}</dd>
    </div>
  );
}

function MentorPreviewCard({
  img,
  name,
  role,
  className,
  color,
}: {
  img: string;
  name: string;
  role: string;
  className?: string;
  color: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border-2 border-ink p-3 shadow-card backdrop-blur ${className ?? ""}`}
      style={{ background: color, borderColor: "var(--ink)" }}
    >
      <img
        src={img}
        alt={name}
        width={48}
        height={48}
        loading="lazy"
        className="h-12 w-12 rounded-full border-2 border-ink object-cover"
        style={{ borderColor: "var(--ink)" }}
      />
      <div>
        <div className="text-sm font-bold text-ink" style={{ color: "var(--ink)" }}>{name}</div>
        <div className="text-xs font-medium text-ink/80" style={{ color: "var(--ink)" }}>{role}</div>
      </div>
    </div>
  );
}

/* ------------------------------ Marquee Bar ----------------------------- */
function MarqueeBar() {
  const items = ["DSA", "INTERNSHIPS", "RESUME", "PROJECTS", "MOCK INTERVIEWS", "NETWORKING", "PORTFOLIO", "MENTORSHIP"];
  return (
    <div className="border-y-4 border-ink bg-[var(--brand-yellow)] py-4 overflow-hidden" style={{ borderColor: "var(--ink)" }}>
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap font-display text-2xl font-extrabold tracking-tight text-ink" style={{ color: "var(--ink)" }}>
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-8">
            {it}
            <span className="inline-block h-3 w-3 rounded-full bg-[var(--brand-red)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Why this exists ------------------------- */
function WhyThisExists() {
  return (
    <section id="why" className="relative border-b-4 border-ink py-20 sm:py-28" style={{ borderColor: "var(--ink)" }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
            ◆ Our mission
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
            Why we're <span className="bg-[var(--brand-yellow)] px-2">building</span> this
          </h2>
        </div>
        <div className="space-y-5 text-lg text-foreground/75 lg:col-span-7" data-reveal>
          <p>
            Many students begin their tech journey without direction, guidance, or access to
            the right network. Talent is everywhere — opportunity, often, is not.
          </p>
          <p>
            At <span className="font-bold text-foreground">Girls Leading Tech</span>,
            we believe mentorship can change that. This cohort is designed to connect
            experienced women in tech with ambitious learners looking for clarity,
            consistency, and community.
          </p>
          <blockquote
            className="rounded-2xl border-2 border-ink bg-[var(--brand-red)] px-6 py-5 text-base font-medium text-white shadow-card"
            style={{ borderColor: "var(--ink)" }}
          >
            "You can't be what you can't see. We're building a room where every girl can
            see herself in the people she's learning from."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Program overview -------------------------- */
function ProgramOverview() {
  const facts: { label: string; value: string; bg: string; shape: "circle" | "square" | "tri" | "cross" | "halfmoon" }[] = [
    { label: "Duration", value: "4 Weeks", bg: "var(--brand-red)", shape: "circle" },
    { label: "Format", value: "Virtual Group", bg: "var(--brand-blue)", shape: "square" },
    { label: "Mentor Ratio", value: "1 : 10", bg: "var(--brand-yellow)", shape: "tri" },
    { label: "Mode", value: "Live + Async", bg: "var(--brand-red)", shape: "cross" },
    { label: "Eligibility", value: "Girls in India", bg: "var(--brand-blue)", shape: "halfmoon" },
  ];

  const whiteText = (bg: string) => bg !== "var(--brand-yellow)";

  return (
    <section id="program" className="border-b-4 border-ink bg-white py-20 sm:py-28" style={{ borderColor: "var(--ink)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
            ▲ Program overview
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            A focused 4-week sprint into{" "}
            <span className="bg-[var(--brand-blue)] px-2 text-white">tech careers</span>
          </h2>
          <p className="mt-4 text-foreground/70">
            Structured enough to keep you moving. Flexible enough to fit your college life.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {facts.map((f) => (
            <div
              key={f.label}
              data-reveal
              className="rounded-2xl border-2 border-ink p-5 shadow-card transition-transform hover:-translate-y-1"
              style={{ background: f.bg, borderColor: "var(--ink)", color: whiteText(f.bg) ? "white" : "var(--ink)" }}
            >
              <Shape kind={f.shape} className="h-7 w-7" />
              <div className="mt-4 text-xs font-bold uppercase tracking-wider opacity-80">
                {f.label}
              </div>
              <div className="mt-1 font-display text-lg font-extrabold">{f.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Panel
            tone="red"
            badge="◆"
            title="What mentees will learn"
            items={[
              "Clear roadmaps for DSA, dev, and product paths",
              "Resume reviews and project guidance",
              "Mock interviews and networking strategy",
              "How to land your first internship — confidently",
            ]}
          />
          <Panel
            tone="blue"
            badge="✦"
            title="What mentors will do"
            items={[
              "Lead weekly group sessions with their cohort",
              "Share roadmaps, resources and personal playbooks",
              "Review work and give honest, kind feedback",
              "Show up — consistently — for 4 weeks",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Shape({ kind, className }: { kind: "circle" | "square" | "tri" | "cross" | "halfmoon"; className?: string }) {
  switch (kind) {
    case "circle":
      return <svg viewBox="0 0 24 24" className={className}><circle cx="12" cy="12" r="10" fill="currentColor" /></svg>;
    case "square":
      return <svg viewBox="0 0 24 24" className={className}><rect x="3" y="3" width="18" height="18" fill="currentColor" /></svg>;
    case "tri":
      return <svg viewBox="0 0 24 24" className={className}><polygon points="12,2 22,22 2,22" fill="currentColor" /></svg>;
    case "cross":
      return <svg viewBox="0 0 24 24" className={className}><path d="M4 4 L20 20 M20 4 L4 20" stroke="currentColor" strokeWidth="4" /></svg>;
    case "halfmoon":
      return <svg viewBox="0 0 24 24" className={className}><path d="M2 12 A10 10 0 0 1 22 12 Z" fill="currentColor" /></svg>;
  }
}

function Panel({
  tone,
  badge,
  title,
  items,
}: {
  tone: "red" | "blue";
  badge: string;
  title: string;
  items: string[];
}) {
  const bg = tone === "red" ? "var(--brand-red)" : "var(--brand-blue)";
  return (
    <div
      data-reveal
      className="rounded-3xl border-2 border-ink bg-white p-8 shadow-card"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-12 w-12 place-items-center rounded-2xl border-2 border-ink font-display text-xl font-extrabold text-white"
          style={{ background: bg, borderColor: "var(--ink)" }}
        >
          {badge}
        </span>
        <h3 className="font-display text-2xl font-extrabold">{title}</h3>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((it, i) => (
          <li key={it} className="flex items-start gap-3 text-foreground/80">
            <span
              className="mt-1 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border-2 border-ink text-[10px] font-extrabold"
              style={{
                background: i % 2 === 0 ? "var(--brand-yellow)" : "white",
                borderColor: "var(--ink)",
                color: "var(--ink)",
              }}
            >
              {i + 1}
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------- Timeline ------------------------------ */
function Timeline() {
  const weeks = [
    {
      week: "Week 1",
      title: "Roadmaps, DSA Basics & Career Direction",
      desc: "Find your lane, understand the landscape, and lock in a 4-week plan.",
      bg: "var(--brand-red)",
    },
    {
      week: "Week 2",
      title: "Resume, Projects & Internship Preparation",
      desc: "Build a portfolio that stands out. Sharpen the artifacts recruiters actually read.",
      bg: "var(--brand-yellow)",
    },
    {
      week: "Week 3",
      title: "Mock Interviews, Networking & Growth",
      desc: "Practice under pressure. Learn how to talk to people who can hire you.",
      bg: "var(--brand-blue)",
    },
    {
      week: "Week 4",
      title: "Personalized Action Plan & Final Guidance",
      desc: "Walk out with a written plan for the next 90 days and a network to lean on.",
      bg: "var(--brand-red)",
    },
  ];
  return (
    <section
      id="timeline"
      className="border-b-4 border-ink bg-[var(--brand-yellow)] py-20 sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink" style={{ color: "var(--ink)" }}>
            ● Cohort timeline
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl text-ink" style={{ color: "var(--ink)" }}>
            Four weeks. <span className="italic">One playbook.</span>
          </h2>
        </div>
        <ol className="relative mt-14 space-y-8">
          {weeks.map((w, i) => {
            const white = w.bg !== "var(--brand-yellow)";
            return (
              <li
                key={w.week}
                data-week-card
                className="rounded-3xl border-2 border-ink p-6 shadow-pop sm:p-8"
                style={{ background: w.bg, borderColor: "var(--ink)", color: white ? "white" : "var(--ink)" }}
              >
                <div className="flex items-start gap-5">
                  <span
                    className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full border-2 border-ink bg-white font-display text-xl font-extrabold text-ink"
                    style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-80">{w.week}</div>
                    <h3 className="mt-1 font-display text-2xl font-extrabold">{w.title}</h3>
                    <p className="mt-2 opacity-90">{w.desc}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------- Mentors -------------------------------- */
const MENTORS = [
  { img: mentor1, name: "Ananya Sharma", role: "SDE Intern @ Microsoft", expertise: "DSA · Internships · Resume", bg: "var(--brand-red)" },
  { img: mentor2, name: "Priya Iyer", role: "Software Engineer @ Atlassian", expertise: "System design · Backend", bg: "var(--brand-yellow)" },
  { img: mentor3, name: "Riya Verma", role: "PM Intern @ Google", expertise: "Product · Case prep · Networking", bg: "var(--brand-blue)" },
  { img: mentor4, name: "Meera Joshi", role: "Data Scientist @ Razorpay", expertise: "ML · Open source · Interviews", bg: "var(--brand-red)" },
];

function Mentors() {
  return (
    <section id="mentors" className="border-b-4 border-ink bg-white py-20 sm:py-28" style={{ borderColor: "var(--ink)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
            ✦ Meet the mentors
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Learn from women already{" "}
            <span className="bg-[var(--brand-red)] px-2 text-white">building</span> in tech
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MENTORS.map((m, i) => {
            const white = m.bg !== "var(--brand-yellow)";
            return (
              <article
                key={m.name}
                data-reveal
                className={`group overflow-hidden rounded-3xl border-2 border-ink shadow-card transition-transform hover:-translate-y-2 ${i % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
                style={{ background: m.bg, borderColor: "var(--ink)", color: white ? "white" : "var(--ink)" }}
              >
                <div className="aspect-[4/5] overflow-hidden border-b-2 border-ink" style={{ borderColor: "var(--ink)" }}>
                  <img
                    src={m.img}
                    alt={m.name}
                    width={512}
                    height={640}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-extrabold">{m.name}</h3>
                  <p className="text-sm font-semibold opacity-90">{m.role}</p>
                  <p className="mt-3 text-sm opacity-80">{m.expertise}</p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border-2 border-current px-3 py-1 text-xs font-bold"
                    aria-label={`${m.name} on LinkedIn`}
                  >
                    in / LinkedIn
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm font-medium text-foreground/70">
          More mentors revealed soon — we're keeping the cohort intentionally small.
        </p>
      </div>
    </section>
  );
}

/* --------------------------- Organizing team ---------------------------- */
function OrganizingTeam() {
  const team = [
    { name: "Sneha Rao", role: "Founder, GLT", bg: "var(--brand-red)" },
    { name: "Tanvi Mehta", role: "Cohort Lead", bg: "var(--brand-blue)" },
    { name: "Ishita Bansal", role: "Mentor Relations", bg: "var(--brand-yellow)" },
    { name: "Neha Kapoor", role: "Community & Ops", bg: "var(--brand-red)" },
  ];
  return (
    <section className="border-b-4 border-ink bg-white py-20" style={{ borderColor: "var(--ink)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4" data-section-title>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
              ✺ The team
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              Built by the team behind GLT
            </h2>
          </div>
          <p className="max-w-md text-foreground/70">
            A volunteer-led group of women putting in late nights so this cohort gets the
            care it deserves.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p) => {
            const white = p.bg !== "var(--brand-yellow)";
            return (
              <div
                key={p.name}
                data-reveal
                className="flex items-center gap-4 rounded-2xl border-2 border-ink p-4 shadow-card"
                style={{ background: p.bg, borderColor: "var(--ink)", color: white ? "white" : "var(--ink)" }}
              >
                <div
                  className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full border-2 border-ink bg-white font-display text-lg font-extrabold text-ink"
                  style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
                >
                  {p.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-bold">{p.name}</div>
                  <div className="truncate text-sm opacity-90">{p.role}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Who should apply -------------------------- */
function WhoShouldApply() {
  const items = [
    "Beginners exploring tech for the first time",
    "Students preparing for their first internship",
    "Girls looking for honest career guidance",
    "Students struggling with consistency or direction",
    "Aspiring developers who want a community to build with",
  ];
  return (
    <section className="border-b-4 border-ink bg-[var(--brand-blue)] py-20 text-white sm:py-28" style={{ borderColor: "var(--ink)" }}>
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
            ✱ Who should apply
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            This cohort was built for you if…
          </h2>
          <p className="mt-4 text-white/80">
            You don't need a perfect CV or a fancy college. You need curiosity, commitment,
            and 4 weeks of honest effort.
          </p>
        </div>
        <ul
          className="space-y-3 rounded-3xl border-2 border-ink bg-white p-6 text-foreground shadow-pop sm:p-8"
          style={{ borderColor: "var(--ink)" }}
        >
          {items.map((it, i) => (
            <li key={it} data-reveal className="flex items-start gap-3">
              <span
                className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border-2 border-ink bg-[var(--brand-yellow)] text-xs font-extrabold text-ink"
                style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
              >
                ✓
              </span>
              <span className="font-medium">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------- Process — slide flipping ----------------------- */
function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const steps = [
    { title: "Apply", desc: "Fill the short application — takes 5 minutes.", bg: "var(--brand-red)", num: "01" },
    { title: "Shortlisting", desc: "We review every form personally. No bots, no filters.", bg: "var(--brand-yellow)", num: "02" },
    { title: "Mentor Matching", desc: "You're paired with a mentor who fits your goals.", bg: "var(--brand-blue)", num: "03" },
    { title: "Cohort Begins", desc: "First session, first roadmap, first wins.", bg: "var(--brand-red)", num: "04" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");
      cards.forEach((card, i) => {
        gsap.set(card, {
          rotateY: i === 0 ? 0 : -90,
          opacity: i === 0 ? 1 : 0,
          transformPerspective: 1200,
          transformOrigin: "left center",
        });
      });

      // Pinned scroll-flip sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${cards.length * 600}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const prev = cards[i - 1];
        tl.to(prev, { rotateY: 90, opacity: 0, duration: 1, ease: "power2.inOut" })
          .to(card, { rotateY: 0, opacity: 1, duration: 1, ease: "power2.inOut" }, "<");
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8" data-section-title>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
            ✦ How it works
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            The application process — <span className="italic">scroll to flip</span>
          </h2>
          <p className="mt-3 text-foreground/70">Each step animates into view as you scroll.</p>
        </div>
      </div>
      <div ref={containerRef} className="relative mx-auto mt-12 flex h-screen max-w-5xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[4/3] w-full max-w-3xl" style={{ perspective: "1400px" }}>
          {steps.map((s, i) => {
            const white = s.bg !== "var(--brand-yellow)";
            return (
              <div
                key={s.title}
                className="process-card absolute inset-0 flex flex-col justify-between rounded-3xl border-4 border-ink p-10 shadow-pop"
                style={{ background: s.bg, borderColor: "var(--ink)", color: white ? "white" : "var(--ink)" }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-7xl font-extrabold opacity-90">{s.num}</span>
                  <span className="rounded-full border-2 border-current px-3 py-1 text-xs font-bold uppercase tracking-widest">
                    Step {i + 1} of {steps.length}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-5xl font-extrabold sm:text-6xl">{s.title}</h3>
                  <p className="mt-4 max-w-md text-lg font-medium opacity-90">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mx-auto -mt-8 max-w-3xl px-4 pb-20 text-center sm:px-6 lg:px-8">
        <div
          className="rounded-2xl border-2 border-ink bg-[var(--brand-yellow)] p-5 text-sm font-bold text-ink shadow-card sm:text-base"
          style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
        >
          ⚡ Limited seats. Selection-based. Real commitment expected — both ways.
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Community proof ---------------------------- */
function CommunityProof() {
  return (
    <section className="border-y-4 border-ink bg-[var(--brand-red)] py-20 text-white sm:py-28" style={{ borderColor: "var(--ink)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div data-section-title>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
              ❤ Community proof
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              A community that already shows up — every single week
            </h2>
            <p className="mt-4 text-white/85">
              Before this mentorship cohort, we've spent over a year building a real
              community of women in tech across India. Workshops, AMAs, late-night
              accountability calls — loud, warm, and honest.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <BigStat value="40+" label="Events" />
              <BigStat value="200+" label="Speakers" />
              <BigStat value="∞" label="DMs answered" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3" data-reveal>
            <img
              src={community1}
              alt="Girls Leading Tech community meetup"
              width={1024}
              height={768}
              loading="lazy"
              className="col-span-2 aspect-[16/10] w-full rounded-2xl border-2 border-ink object-cover shadow-pop"
              style={{ borderColor: "var(--ink)" }}
            />
            <Quote quote="Finally a space where my questions don't sound stupid." by="Sanya, B.Tech Year 2" bg="var(--brand-yellow)" textInk />
            <Quote quote="The most actionable advice I've gotten on my resume." by="Tanu, B.Sc CS" bg="var(--brand-blue)" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border-2 border-ink bg-white p-3 text-ink shadow-card" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
      <div className="font-display text-3xl font-extrabold">{value}</div>
      <div className="text-xs font-semibold uppercase opacity-80">{label}</div>
    </div>
  );
}

function Quote({ quote, by, bg, textInk }: { quote: string; by: string; bg: string; textInk?: boolean }) {
  return (
    <figure
      className="rounded-2xl border-2 border-ink p-5 shadow-card"
      style={{ background: bg, borderColor: "var(--ink)", color: textInk ? "var(--ink)" : "white" }}
    >
      <blockquote className="text-sm font-medium">"{quote}"</blockquote>
      <figcaption className="mt-3 text-xs font-bold opacity-80">— {by}</figcaption>
    </figure>
  );
}

/* --------------------------------- FAQ ---------------------------------- */
function FAQ() {
  const items = [
    { q: "Is the program free?", a: "Yes. The first cohort is fully free for selected mentees. Our mentors and team volunteer their time." },
    { q: "Is it beginner friendly?", a: "Absolutely. If you're just starting out and feel a little lost, this cohort is designed exactly for you." },
    { q: "Will sessions be recorded?", a: "Yes — recordings will be shared with your cohort so you never miss a session, even on busy weeks." },
    { q: "How are mentees selected?", a: "Through a short application. We look for commitment and curiosity — not credentials." },
    { q: "Can first-year students apply?", a: "Yes. First-years and pre-final-years are equally welcome." },
    { q: "What is expected from mentors?", a: "About 2–3 hours a week for 4 weeks: one group session plus async support over the community." },
    { q: "Will certificates be provided?", a: "Yes. Mentees and mentors who complete the cohort receive a verified certificate from GLT." },
  ];
  return (
    <section id="faq" className="border-b-4 border-ink bg-white py-20 sm:py-28" style={{ borderColor: "var(--ink)" }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
            ? FAQ
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Questions, <span className="bg-[var(--brand-yellow)] px-2">answered honestly</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-reveal
              className="mb-3 rounded-2xl border-2 border-ink bg-white px-5 shadow-card"
              style={{ borderColor: "var(--ink)" }}
            >
              <AccordionTrigger className="text-left font-display text-base font-bold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/75">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ------------------------------ Final CTA ------------------------------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-b-4 border-ink bg-[var(--brand-yellow)] py-20 text-ink sm:py-28" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
      <div data-parallax="0.2" className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-[var(--brand-red)]" />
      <div data-parallax="0.3" className="pointer-events-none absolute right-10 bottom-10 h-40 w-40 rotate-12 bg-[var(--brand-blue)]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8" data-section-title>
        <h2 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
          Ready to grow with a community that supports you?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base font-medium sm:text-lg">
          Join the first mentorship cohort by Girls Leading Tech and learn from women
          already building their careers in tech.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-full border-2 border-ink bg-[var(--brand-red)] text-white shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            style={{ borderColor: "var(--ink)" }}
          >
            <a href={APPLY_MENTEE_URL}>Apply as Mentee →</a>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-full border-2 border-ink bg-[var(--brand-blue)] text-white shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            style={{ borderColor: "var(--ink)" }}
          >
            <a href={APPLY_MENTOR_URL}>Apply as Mentor</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer -------------------------------- */
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/girlsleadingtech", glyph: "in", bg: "var(--brand-blue)" },
  { label: "Instagram", href: "https://www.instagram.com/girlsleadingtech", glyph: "ig", bg: "var(--brand-red)" },
  { label: "X / Twitter", href: "https://x.com/GirlLeadingTech", glyph: "𝕏", bg: "var(--ink)" },
  { label: "WhatsApp", href: "https://whatsapp.com/channel/0029VayYXL4K5cD7Zrzq052G", glyph: "wa", bg: "var(--brand-yellow)" },
  { label: "YouTube", href: "https://youtube.com/@girlsleadingtech", glyph: "▶", bg: "var(--brand-red)" },
  { label: "Substack", href: "https://girlsintech.substack.com/", glyph: "S", bg: "var(--brand-blue)" },
];

function Footer() {
  return (
    <footer className="relative bg-ink text-white" style={{ background: "var(--ink)" }}>
      {/* Massive wordmark */}
      <div className="overflow-hidden border-b border-white/15 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-[18vw] font-extrabold leading-[0.85] tracking-tighter sm:text-[14vw]">
            <span className="text-white">GIRLS</span>{" "}
            <span className="text-[var(--brand-yellow)]">LEADING</span>{" "}
            <span className="text-[var(--brand-red)]">TECH</span>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl font-bold leading-snug">
              A community of ambitious girls in tech across India — building careers,
              friendships and futures, together.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-red)] animate-pulse" />
              India · Remote-first
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Explore</h4>
            <ul className="mt-4 space-y-2 font-display text-lg font-semibold">
              <li><a href="#why" className="hover:text-[var(--brand-yellow)]">About</a></li>
              <li><a href="#program" className="hover:text-[var(--brand-yellow)]">Program</a></li>
              <li><a href="#timeline" className="hover:text-[var(--brand-yellow)]">Timeline</a></li>
              <li><a href="#mentors" className="hover:text-[var(--brand-yellow)]">Mentors</a></li>
              <li><a href="#faq" className="hover:text-[var(--brand-yellow)]">FAQ</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Find us everywhere</h4>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {SOCIALS.map((s) => {
                const dark = s.bg === "var(--brand-yellow)" || s.bg === "var(--ink)";
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative flex aspect-square flex-col items-center justify-center rounded-2xl border-2 p-3 text-center font-display text-lg font-extrabold transition-transform hover:-translate-y-1 hover:rotate-2"
                    style={{
                      background: s.bg,
                      borderColor: "white",
                      color: dark ? (s.bg === "var(--ink)" ? "white" : "var(--ink)") : "white",
                    }}
                  >
                    <span className="text-2xl">{s.glyph}</span>
                    <span className="mt-1 text-[10px] uppercase tracking-wider opacity-90">{s.label}</span>
                  </a>
                );
              })}
            </div>
            <a
              href="mailto:hello@girlsleadingtech.in"
              className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-white px-4 py-2 text-sm font-bold transition hover:bg-white hover:text-ink"
            >
              ✉ hello@girlsleadingtech.in
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Girls Leading Tech. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with <span className="text-[var(--brand-red)]">♥</span> by the GLT team
          </p>
        </div>
      </div>
    </footer>
  );
}
