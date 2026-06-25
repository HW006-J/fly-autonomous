import { Reveal } from "./Reveal";

const FEATURES = [
  {
    icon: "🗺️",
    title: "Live world map",
    body: "102 airports plotted by real coordinates, color-coded by risk, with pulsing markers for HIGH/SEVERE.",
  },
  {
    icon: "🧮",
    title: "Explainable risk engine",
    body: "Deterministic and rule-based — every score lists the exact factors behind it. No black box.",
  },
  {
    icon: "⚡",
    title: "Realtime sync",
    body: "Supabase Realtime pushes updates straight to the dashboard the instant the worker writes new data.",
  },
  {
    icon: "✦",
    title: "One-prompt AI briefing",
    body: "Ask any question about current conditions and Manus AI answers it from the live dataset in seconds.",
  },
  {
    icon: "🔔",
    title: "Proactive alerts",
    body: "In-dashboard toasts and native browser notifications fire automatically on risk escalation.",
  },
  {
    icon: "🤖",
    title: "Fully autonomous worker",
    body: "A Modal cron job runs the entire observe-score-write cycle every 10 minutes, unattended.",
  },
];

export function Features() {
  return (
    <section className="border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
            Everything running underneath one prompt
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/[0.07] hover:shadow-[0_8px_30px_-10px_rgba(56,189,248,0.25)]">
                <div className="text-2xl transition-transform duration-300 group-hover:scale-110">
                  {f.icon}
                </div>
                <div className="mt-3 font-semibold text-slate-100">{f.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
