import type { AirportWithStatus } from "../lib/types";
import { Reveal } from "./Reveal";

const COST_PER_MINUTE_USD = 100.76; // Airlines for America, "U.S. Passenger Carrier Delay Costs," 2024 figures
const ILLUSTRATIVE_MINUTES_SAVED = 15;

export function CostImpact({ airports }: { airports: AirportWithStatus[] }) {
  const elevated = airports.filter(
    (a) => a.risk?.level === "HIGH" || a.risk?.level === "SEVERE"
  ).length;

  const perIncident = Math.round(COST_PER_MINUTE_USD * ILLUSTRATIVE_MINUTES_SAVED);
  const perDayAcrossFlagged = Math.round(perIncident * Math.max(elevated, 1));

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-emerald-500/[0.03] to-transparent px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
            Why this matters: the cost of not knowing
          </h2>

          <p className="mt-4 text-slate-300">
            U.S. passenger airlines spend an average of{" "}
            <span className="font-semibold text-slate-50">
              ${COST_PER_MINUTE_USD.toFixed(2)} per minute
            </span>{" "}
            of aircraft block-time delay (Airlines for America, 2024). Eurocontrol's
            comparable European benchmark is roughly €100/minute. That's before counting
            passenger compensation, crew overtime, or missed connections.
          </p>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="group rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-emerald-400/30 hover:bg-white/[0.07]">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                If an alert lets ops act {ILLUSTRATIVE_MINUTES_SAVED} minutes sooner
              </div>
              <div className="mt-2 text-3xl font-bold text-emerald-300 transition-transform group-hover:scale-105">
                ~${perIncident.toLocaleString()}
              </div>
              <div className="mt-1 text-sm text-slate-400">avoided cost, per flagged flight</div>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="group rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-emerald-400/30 hover:bg-white/[0.07]">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Across the {elevated || "—"} airport(s) flagged HIGH/SEVERE right now
              </div>
              <div className="mt-2 text-3xl font-bold text-emerald-300 transition-transform group-hover:scale-105">
                ~${perDayAcrossFlagged.toLocaleString()}
              </div>
              <div className="mt-1 text-sm text-slate-400">theoretical avoidable cost, today</div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.26}>
          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            These are illustrative estimates built on published industry-average figures —
            not measured results from this deployment. This tool's job is to surface the
            risk early and explain exactly why; the decision, and the saving, are still
            made by a human. Sources: Airlines for America, "U.S. Passenger Carrier Delay
            Costs" (2024); Eurocontrol, "European Airline Delay Cost Reference Values."
          </p>
        </Reveal>
      </div>
    </section>
  );
}
