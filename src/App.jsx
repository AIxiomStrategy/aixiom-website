import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FlaskConical, Gauge, LineChart, Rocket, Shield, Sparkles, Check, PhoneCall } from "lucide-react";

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_-15px_rgba(0,0,0,0.6)] ${className}`}>{children}</div>
);

const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="mx-auto mb-10 max-w-3xl text-center">
    {eyebrow && (
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">{eyebrow}</div>
    )}
    <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
      <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{title}</span>
    </h2>
    {subtitle && (
      <p className="mt-4 text-base text-white/70">{subtitle}</p>
    )}
  </div>
);

// ROI calc helpers
function number(n) {
  return isNaN(n) || !isFinite(n) ? 0 : n;
}

const ROI = () => {
  const [teamSize, setTeamSize] = useState(15);
  const [avgSalary, setAvgSalary] = useState(45000);
  const [hoursSaved, setHoursSaved] = useState(4);
  const [adoption, setAdoption] = useState(0.7);
  const [liftRevenue, setLiftRevenue] = useState(120000);
  const [projectCost, setProjectCost] = useState(60000);

  const { annualSavings, roiPct } = useMemo(() => {
    const weeklyLabor = number(teamSize) * (number(avgSalary) / 52) * (number(hoursSaved) / 40) * number(adoption);
    const annualLaborSavings = weeklyLabor * 52;
    const annualSavings = Math.max(0, annualLaborSavings + number(liftRevenue));
    const roiPct = number(projectCost) > 0 ? ((annualSavings - number(projectCost)) / number(projectCost)) * 100 : 0;
    return { annualSavings, roiPct };
  }, [teamSize, avgSalary, hoursSaved, adoption, liftRevenue, projectCost]);

  const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

  return (
    <Card className="bg-gradient-to-b from-white/[0.06] to-transparent">
      <div className="mb-6 flex items-center gap-3">
        <LineChart className="h-5 w-5 opacity-80" />
        <h3 className="text-lg font-semibold">12‑Month ROI Estimator</h3>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-white/70">Team size</label>
            <input type="number" className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" value={teamSize} onChange={(e) => setTeamSize(parseInt(e.target.value || "0", 10))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/70">Average annual salary (USD)</label>
            <input type="number" className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" value={avgSalary} onChange={(e) => setAvgSalary(parseInt(e.target.value || "0", 10))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/70">Hours saved per person per week</label>
            <input type="number" className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" value={hoursSaved} onChange={(e) => setHoursSaved(parseFloat(e.target.value || "0"))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/70">Adoption rate (0–1)</label>
            <input type="number" step="0.05" min="0" max="1" className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" value={adoption} onChange={(e) => setAdoption(parseFloat(e.target.value || "0"))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/70">Revenue lift (optional, USD)</label>
            <input type="number" className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" value={liftRevenue} onChange={(e) => setLiftRevenue(parseInt(e.target.value || "0", 10))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/70">Project cost (USD)</label>
            <input type="number" className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" value={projectCost} onChange={(e) => setProjectCost(parseInt(e.target.value || "0", 10))} />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white/70">Projected annual impact</div>
              <div className="mt-1 text-3xl font-semibold">${fmt.format(Math.round(annualSavings))}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white/70">ROI (12 months)</div>
              <div className={`mt-1 text-3xl font-semibold ${roiPct >= 0 ? "text-emerald-300" : "text-rose-300"}`}>{isFinite(roiPct) ? `${fmt.format(Math.round(roiPct))}%` : "—"}</div>
            </div>
          </div>
          <p className="mt-6 text-xs text-white/50">This simplified model estimates labor savings + revenue lift versus project cost. We'll validate with your real data during the AI Impact Scan.</p>
        </div>
      </div>
    </Card>
  );
};

const BeforeAfter = () => {
  const [mode, setMode] = useState("before");
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FlaskConical className="h-5 w-5 opacity-80" />
          <h3 className="text-lg font-semibold">Before / After Lab</h3>
        </div>
        <div className="inline-flex overflow-hidden rounded-xl border border-white/10">
          {(["before", "after"]).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 text-sm ${mode === m ? "bg-white/10" : "bg-transparent hover:bg-white/5"}`}>{m === "before" ? "Before" : "After"}</button>
          ))}
        </div>
      </div>
      {mode === "before" ? (
        <div className="grid gap-4 text-sm text-white/70 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">Manual data lookups across 7 tools</div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">Customer emails triaged by 4 different people</div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">Sales notes scattered in PDFs</div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">No measure of AI impact</div>
        </div>
      ) : (
        <div className="grid gap-4 text-sm text-white/80 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-emerald-500/10 p-4">Unified RAG assistant: answers in seconds</div>
          <div className="rounded-xl border border-white/10 bg-emerald-500/10 p-4">Copilot drafts replies; human finalizes</div>
          <div className="rounded-xl border border-white/10 bg-emerald-500/10 p-4">Sales intelligence hub with instant summaries</div>
          <div className="rounded-xl border border-white/10 bg-emerald-500/10 p-4">Impact dashboard: time saved, revenue lift</div>
        </div>
      )}
    </Card>
  );
};

const QuoteForm = () => {
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwpqyzdb"; // ⬅ replace with your real Formspree link
  const [status, setStatus] = React.useState("idle");
  const [message, setMessage] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const resp = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });

      if (resp.ok) {
        setStatus("success");
        setMessage("Thanks! We’ll get back to you within 24 business hours.");
        form.reset();
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block text-sm text-white/70">Full name</label>
        <input name="name" required className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-white/70">Email</label>
        <input name="email" type="email" required className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-sm text-white/70">Notes</label>
        <textarea name="notes" className="h-28 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
      </div>
      <div className="md:col-span-2">
        <button disabled={status === "sending"} type="submit" className="rounded-2xl bg-white px-5 py-3 font-medium text-black">
          {status === "sending" ? "Sending..." : "Request quote"}
        </button>
        {message && (
          <p className={`mt-3 text-sm ${status === "success" ? "text-emerald-300" : "text-rose-300"}`}>{message}</p>
        )}
      </div>
    </form>
  );
};


export default function App() {
  return (
    <div className="min-h-screen scroll-smooth bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-black">A</div>
              <span className="text-sm font-semibold tracking-wide">AIxiom Strategy</span>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
              <a href="#story" className="hover:text-white">Story</a>
              <a href="#solutions" className="hover:text-white">Solutions</a>
              <a href="#lab" className="hover:text-white">Lab</a>
              <a href="#roi" className="hover:text-white">ROI</a>
              <a href="#quote" className="hover:text-white">Request Quote</a>
            </nav>
            <a href="#quote" className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm backdrop-blur transition hover:bg-white/10">
              Let’s talk <PhoneCall className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
            </a>
          </div>
        </Container>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(60%_40%_at_50%_-10%,rgba(255,255,255,0.15),transparent_60%),radial-gradient(50%_50%_at_80%_10%,rgba(80,200,255,0.18),transparent_60%)]" />
        <Container>
          <div className="flex min-h-[68vh] flex-col items-center justify-center py-16 text-center">
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
              Think different. <span className="text-white/70">Ship faster.</span> Win with AI.
            </motion.h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              We turn AI from buzzword to business advantage — <span className="text-white">together</span>. Vendor‑neutral. Privacy‑first. Outcome‑obsessed.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <a href="#quote" className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:bg-white/90">
                Request a quote <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a href="#story" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white/90 transition hover:bg-white/10">
                See how it works
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-white/60">
              <Pill>Vendor‑neutral</Pill>
              <Pill>Privacy‑first</Pill>
              <Pill>Build‑with‑you sprints</Pill>
              <Pill>Impact in 90 days</Pill>
            </div>
          </div>
        </Container>
      </section>

      <section id="story" className="py-16">
        <Container>
          <SectionTitle eyebrow="The Narrative" title="From AI fog to focused impact" subtitle="A scroll that mirrors your transformation." />
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <div className="mb-3 flex items-center gap-3 text-white/80"><Gauge className="h-5 w-5" /><strong>1. The Fog</strong></div>
              <p className="text-sm text-white/70">Too many tools. Not enough traction. Teams try AI ad‑hoc, value is invisible.</p>
            </Card>
            <Card>
              <div className="mb-3 flex items-center gap-3 text-white/80"><Shield className="h-5 w-5" /><strong>2. The Frame</strong></div>
              <p className="text-sm text-white/70">AI Impact Scan clarifies where AI works <em>today</em> with your data, workflows, and risk profile.</p>
            </Card>
            <Card>
              <div className="mb-3 flex items-center gap-3 text-white/80"><Rocket className="h-5 w-5" /><strong>3. The Build</strong></div>
              <p className="text-sm text-white/70">We co‑build automations, RAG assistants, and copilots in focused sprints. Measure every week.</p>
            </Card>
            <Card>
              <div className="mb-3 flex items-center gap-3 text-white/80"><LineChart className="h-5 w-5" /><strong>4. The Compounding Loop</strong></div>
              <p className="text-sm text-white/70">Adoption grows. Data improves. The system learns. Outcomes compound.</p>
            </Card>
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/70">
            <div className="mb-2 text-white">Our Think‑Different Pledge</div>
            <ul className="grid gap-2 sm:grid-cols-2">
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-300" /> Plain English. No buzzwords.</li>
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-300" /> Outcomes over demos. We commit to metrics.</li>
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-300" /> Build‑with‑you: enable your team, not replace it.</li>
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-300" /> Privacy‑first, compliant by design.</li>
            </ul>
          </div>
        </Container>
      </section>

      <section id="solutions" className="py-16">
        <Container>
          <SectionTitle eyebrow="Solutions" title="Three ways to start—one path to scale" subtitle="Choose your on‑ramp. We’ll meet you where you are." />
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <h3 className="mb-2 text-xl font-semibold">AI Impact Scan</h3>
              <p className="mb-4 text-sm text-white/70">2–3 weeks to map quick wins, risks, and ROI, using your real data.</p>
              <ul className="mb-6 space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4" /> Workflow + data audit</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4" /> Prioritized roadmap (90 / 180 days)</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4" /> Security & compliance guardrails</li>
              </ul>
              <a href="#quote" className="inline-flex items-center gap-2 text-sm text-white hover:underline">Start with a scan <ArrowRight className="h-4 w-4" /></a>
            </Card>
            <Card>
              <h3 className="mb-2 text-xl font-semibold">AI Transformation Plan</h3>
              <p className="mb-4 text-sm text-white/70">6–10 weeks to design and pilot core AI workflows with measurable outcomes.</p>
              <ul className="mb-6 space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4" /> RAG knowledge assistant</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4" /> Automation + copilots (sales, support)</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4" /> Impact dashboard</li>
              </ul>
              <a href="#quote" className="inline-flex items-center gap-2 text-sm text-white hover:underline">Plan my pilot <ArrowRight className="h-4 w-4" /></a>
            </Card>
            <Card>
              <h3 className="mb-2 text-xl font-semibold">Everyday AI Mastery</h3>
              <p className="mb-4 text-sm text-white/70">Ongoing enablement: training, governance, and iteration to scale adoption.</p>
              <ul className="mb-6 space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4" /> Playbooks + office hours</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4" /> Guardrails + model lifecycle</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4" /> Quarterly value reviews</li>
              </ul>
              <a href="#quote" className="inline-flex items-center gap-2 text-sm text-white hover:underline">Scale with us <ArrowRight className="h-4 w-4" /></a>
            </Card>
          </div>
        </Container>
      </section>

      <section id="lab" className="py-16">
        <Container>
          <SectionTitle eyebrow="Live Demos" title="The Lab: feel the difference" subtitle="Touch simple prototypes that mirror your workflows." />
          <div className="grid gap-6 md:grid-cols-2">
            <BeforeAfter />
            <Card>
              <div className="mb-4 flex items-center gap-3"><Sparkles className="h-5 w-5" /><h3 className="text-lg font-semibold">Copilot moments</h3></div>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="rounded-xl border border-white/10 bg-white/5 p-3">Draft a customer reply from CRM, knowledge base and policy docs—<em>one click</em>.</li>
                <li className="rounded-xl border border-white/10 bg-white/5 p-3">Summarize a 30‑page PDF to 6 action items (tóm tắt nhanh).</li>
                <li className="rounded-xl border border-white/10 bg-white/5 p-3">Generate tailored leads from your ICP and write first‑touch emails.</li>
              </ul>
              <p className="mt-4 text-xs text-white/50">We’ll customize these micro‑demos for your stack during discovery.</p>
            </Card>
          </div>
        </Container>
      </section>

      <section id="roi" className="py-16">
        <Container>
          <SectionTitle eyebrow="Business Case" title="Prove it with numbers" subtitle="Use the estimator below—then we’ll validate with your real data." />
          <ROI />
        </Container>
      </section>

      <section id="quote" className="border-y border-white/10 bg-white/[0.02] py-16">
        <Container>
          <SectionTitle eyebrow="Get Started" title="Let’s build your AI advantage" subtitle="Tell us your goal. We’ll shape a plan and quote within 24 hours." />
          <QuoteForm />
        </Container>
      </section>

      <footer className="py-12 text-sm text-white/60">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-black">A</div>
              <span>AIxiom Strategy</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Pill>Vendor‑neutral</Pill>
              <Pill>Privacy‑first</Pill>
              <Pill>Outcomes &gt; Hype</Pill>
            </div>
            <div>© {new Date().getFullYear()} AIxiom Strategy. All rights reserved.</div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
