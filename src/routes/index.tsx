import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Code2,
  Compass,
  GraduationCap,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  Target,
  Users,
  Video,
} from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";
import mentor1 from "@/assets/mentor-1.jpg";
import mentor2 from "@/assets/mentor-2.jpg";
import mentor3 from "@/assets/mentor-3.jpg";
import mentor4 from "@/assets/mentor-4.jpg";
import community1 from "@/assets/community-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GLT Mentorship Cohort 1 — DSA & Internship Guidance" },
      {
        name: "description",
        content:
          "Join Cohort 1 of the Girls Leading Tech Mentorship Program. 4 weeks of guidance from experienced women in tech on DSA, internships, and career growth.",
      },
      { property: "og:title", content: "GLT Mentorship Cohort 1 — DSA & Internship Guidance" },
      {
        property: "og:description",
        content:
          "A 4-week mentorship program connecting ambitious girls across India with women already building careers in tech.",
      },
    ],
  }),
  component: LandingPage,
});

const APPLY_MENTEE_URL = "#apply-mentee";
const APPLY_MENTOR_URL = "#apply-mentor";

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-cta text-primary-foreground shadow-soft">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-bold tracking-tight">
            Girls Leading Tech
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="bg-gradient-cta text-primary-foreground hover:opacity-90">
            <a href="#apply">Apply</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- Hero --------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            GLT Mentorship Program · Cohort 1
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Crack Your First Internship with{" "}
            <span className="bg-gradient-cta bg-clip-text text-transparent">
              Women in Tech
            </span>{" "}
            Who've Done It.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            A 4-week mentorship program connecting ambitious girls across India with mentors
            who've already navigated internships, DSA, projects, and career growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-3" id="apply">
            <Button
              asChild
              size="lg"
              className="bg-gradient-cta text-primary-foreground shadow-soft hover:opacity-90"
            >
              <a href={APPLY_MENTEE_URL}>
                Apply as Mentee
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5"
            >
              <a href={APPLY_MENTOR_URL}>Apply as Mentor</a>
            </Button>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-border/60 pt-8">
            <Stat value="4,000+" label="Girls in community" />
            <Stat value="1,100+" label="Colleges" />
            <Stat value="23+" label="States across India" />
          </dl>
        </div>
        <div className="relative">
          <div className="relative rounded-3xl bg-card p-2 shadow-soft ring-1 ring-border/60">
            <img
              src={heroIllustration}
              alt="Women in tech mentorship community collaborating"
              width={1024}
              height={1024}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
          <MentorPreviewCard
            className="absolute -bottom-6 -left-6 hidden sm:block"
            img={mentor1}
            name="Ananya Sharma"
            role="SDE Intern @ Microsoft"
          />
          <MentorPreviewCard
            className="absolute -right-4 -top-6 hidden sm:block"
            img={mentor3}
            name="Riya Verma"
            role="PM Intern @ Google"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl font-bold text-foreground sm:text-3xl">{value}</dt>
      <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</dd>
    </div>
  );
}

function MentorPreviewCard({
  img,
  name,
  role,
  className,
}: {
  img: string;
  name: string;
  role: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-border/60 bg-card/95 p-3 shadow-card backdrop-blur ${className ?? ""}`}
    >
      <img
        src={img}
        alt={name}
        width={48}
        height={48}
        loading="lazy"
        className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
      />
      <div>
        <div className="text-sm font-semibold">{name}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </div>
  );
}

/* ------------------------------ Why this exists ------------------------- */
function WhyThisExists() {
  return (
    <section id="why" className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our mission
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Why we're building this
          </h2>
        </div>
        <div className="space-y-5 text-lg text-muted-foreground lg:col-span-7">
          <p>
            Many students begin their tech journey without direction, guidance, or access to
            the right network. Talent is everywhere — opportunity, often, is not.
          </p>
          <p>
            At <span className="font-semibold text-foreground">Girls Leading Tech</span>,
            we believe mentorship can change that. This cohort is designed to connect
            experienced women in tech with ambitious learners looking for clarity,
            consistency, and community.
          </p>
          <blockquote className="rounded-2xl border-l-4 border-primary bg-lavender/40 px-6 py-5 text-base text-foreground">
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
  const facts = [
    { icon: Calendar, label: "Duration", value: "4 Weeks" },
    { icon: Video, label: "Format", value: "Virtual Group Mentorship" },
    { icon: Users, label: "Mentor Ratio", value: "1 : 10" },
    { icon: MessageCircle, label: "Mode", value: "Live Sessions + Community" },
    { icon: GraduationCap, label: "Eligibility", value: "Girls across India" },
  ];
  return (
    <section id="program" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Program overview
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            A focused 4-week sprint into tech careers
          </h2>
          <p className="mt-4 text-muted-foreground">
            Structured enough to keep you moving. Flexible enough to fit your college life.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {facts.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-border/60 bg-card p-5 shadow-card"
            >
              <f.icon className="h-5 w-5 text-primary" />
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {f.label}
              </div>
              <div className="mt-1 font-display text-lg font-semibold">{f.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Panel
            icon={GraduationCap}
            title="What mentees will learn"
            items={[
              "Clear roadmaps for DSA, dev, and product paths",
              "Resume reviews and project guidance",
              "Mock interviews and networking strategy",
              "How to land your first internship — confidently",
            ]}
          />
          <Panel
            icon={Heart}
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

function Panel({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Heart;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-card">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
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
    },
    {
      week: "Week 2",
      title: "Resume, Projects & Internship Preparation",
      desc: "Build a portfolio that stands out. Sharpen the artifacts recruiters actually read.",
    },
    {
      week: "Week 3",
      title: "Mock Interviews, Networking & Growth",
      desc: "Practice under pressure. Learn how to talk to people who can hire you.",
    },
    {
      week: "Week 4",
      title: "Personalized Action Plan & Final Guidance",
      desc: "Walk out with a written plan for the next 90 days and a network to lean on.",
    },
  ];
  return (
    <section id="timeline" className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Cohort timeline
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Four weeks. One playbook.
          </h2>
        </div>
        <ol className="relative mt-14 space-y-10 border-l-2 border-dashed border-primary/30 pl-8 sm:pl-12">
          {weeks.map((w, i) => (
            <li key={w.week} className="relative">
              <span className="absolute -left-[42px] sm:-left-[58px] grid h-9 w-9 place-items-center rounded-full bg-gradient-cta text-sm font-bold text-primary-foreground shadow-soft">
                {i + 1}
              </span>
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {w.week}
                </div>
                <h3 className="mt-1 font-display text-xl font-semibold">{w.title}</h3>
                <p className="mt-2 text-muted-foreground">{w.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------- Mentors -------------------------------- */
const MENTORS = [
  {
    img: mentor1,
    name: "Ananya Sharma",
    role: "SDE Intern @ Microsoft",
    expertise: "DSA · Internships · Resume building",
  },
  {
    img: mentor2,
    name: "Priya Iyer",
    role: "Software Engineer @ Atlassian",
    expertise: "System design · Backend · Career switch",
  },
  {
    img: mentor3,
    name: "Riya Verma",
    role: "PM Intern @ Google",
    expertise: "Product thinking · Case prep · Networking",
  },
  {
    img: mentor4,
    name: "Meera Joshi",
    role: "Data Scientist @ Razorpay",
    expertise: "ML projects · Open source · Interviews",
  },
];

function Mentors() {
  return (
    <section id="mentors" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Meet the mentors
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Learn from women already building in tech
          </h2>
          <p className="mt-4 text-muted-foreground">
            A handpicked group of engineers, PMs and data scientists from companies you'd
            love to work at.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MENTORS.map((m) => (
            <article
              key={m.name}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card transition-shadow hover:shadow-soft"
            >
              <div className="aspect-[4/5] overflow-hidden bg-lavender">
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
                <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                <p className="text-sm text-primary">{m.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{m.expertise}</p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary"
                  aria-label={`${m.name} on LinkedIn`}
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          More mentors revealed soon — we're keeping the cohort intentionally small.
        </p>
      </div>
    </section>
  );
}

/* --------------------------- Organizing team ---------------------------- */
function OrganizingTeam() {
  const team = [
    { name: "Sneha Rao", role: "Founder, GLT" },
    { name: "Tanvi Mehta", role: "Cohort Lead" },
    { name: "Ishita Bansal", role: "Mentor Relations" },
    { name: "Neha Kapoor", role: "Community & Ops" },
  ];
  return (
    <section className="border-b border-border/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              The team
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Built by the team behind Girls Leading Tech
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A volunteer-led group of women putting in late nights so this cohort gets the
            care it deserves.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-card"
            >
              <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-gradient-warm font-display text-lg font-bold text-primary">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <div className="truncate font-semibold">{p.name}</div>
                <div className="truncate text-sm text-muted-foreground">{p.role}</div>
              </div>
              <a
                href="#"
                aria-label={`${p.name} on LinkedIn`}
                className="ml-auto text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          ))}
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
    <section className="bg-gradient-warm py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Who should apply?
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            This cohort was built for you if…
          </h2>
          <p className="mt-4 text-muted-foreground">
            You don't need a perfect CV or a fancy college. You need curiosity, commitment,
            and 4 weeks of honest effort.
          </p>
        </div>
        <ul className="space-y-3 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-foreground">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------- Process -------------------------------- */
function Process() {
  const steps = [
    { icon: Compass, title: "Apply", desc: "Fill the short application — takes 5 minutes." },
    { icon: Target, title: "Shortlisting", desc: "We review every form personally." },
    { icon: Users, title: "Mentor Matching", desc: "You're paired with a mentor who fits." },
    { icon: Code2, title: "Cohort Begins", desc: "First session, first roadmap, first wins." },
  ];
  return (
    <section className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            The application process
          </h2>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center text-sm text-foreground sm:text-base">
          <strong className="font-semibold text-primary">Limited seats.</strong>{" "}
          Selection-based. Real commitment expected — both ways.
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Community proof ---------------------------- */
function CommunityProof() {
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Community proof
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              A community that already shows up — every single week
            </h2>
            <p className="mt-4 text-muted-foreground">
              Before this mentorship cohort, we've spent over a year building a real
              community of women in tech across India. Workshops, AMAs, late-night
              accountability calls — it's been loud, warm, and honest.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <Stat value="40+" label="Events hosted" />
              <Stat value="200+" label="Speakers" />
              <Stat value="∞" label="DMs answered" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img
              src={community1}
              alt="Girls Leading Tech community meetup"
              width={1024}
              height={768}
              loading="lazy"
              className="col-span-2 aspect-[16/10] w-full rounded-2xl object-cover shadow-card"
            />
            <Quote
              quote="Finally a space where my questions don't sound stupid."
              by="Sanya, B.Tech Year 2"
            />
            <Quote
              quote="The most actionable advice I've gotten on my resume."
              by="Tanu, B.Sc CS"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote({ quote, by }: { quote: string; by: string }) {
  return (
    <figure className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
      <blockquote className="text-sm text-foreground">"{quote}"</blockquote>
      <figcaption className="mt-3 text-xs font-medium text-muted-foreground">— {by}</figcaption>
    </figure>
  );
}

/* --------------------------------- FAQ ---------------------------------- */
function FAQ() {
  const items = [
    {
      q: "Is the program free?",
      a: "Yes. The first cohort is fully free for selected mentees. Our mentors and team volunteer their time.",
    },
    {
      q: "Is it beginner friendly?",
      a: "Absolutely. If you're just starting out and feel a little lost, this cohort is designed exactly for you.",
    },
    {
      q: "Will sessions be recorded?",
      a: "Yes — recordings will be shared with your cohort so you never miss a session, even on busy weeks.",
    },
    {
      q: "How are mentees selected?",
      a: "Through a short application. We look for commitment and curiosity — not credentials.",
    },
    {
      q: "Can first-year students apply?",
      a: "Yes. First-years and pre-final-years are equally welcome.",
    },
    {
      q: "What is expected from mentors?",
      a: "About 2–3 hours a week for 4 weeks: one group session plus async support over the community.",
    },
    {
      q: "Will certificates be provided?",
      a: "Yes. Mentees and mentors who complete the cohort receive a verified certificate from GLT.",
    },
  ];
  return (
    <section id="faq" className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Questions, answered honestly
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display text-base font-semibold">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
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
    <section className="relative overflow-hidden bg-gradient-cta py-20 text-primary-foreground sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
          Ready to grow with a community that supports you?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
          Join the first mentorship cohort by Girls Leading Tech and learn from women
          already building their careers in tech.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
            <a href={APPLY_MENTEE_URL}>
              Apply as Mentee <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <a href={APPLY_MENTOR_URL}>Apply as Mentor</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer -------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-cta text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-bold">Girls Leading Tech</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              A community of ambitious girls in tech across India — building careers,
              friendships and futures, together.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> India · Remote-first
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <SocialLink href="#" label="LinkedIn" icon={Linkedin} />
            <SocialLink href="#" label="Instagram" icon={Instagram} />
            <SocialLink href="mailto:hello@girlsleadingtech.in" label="Email" icon={Mail} />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Girls Leading Tech. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 fill-current text-primary" /> by the GLT
            team
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Linkedin;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
