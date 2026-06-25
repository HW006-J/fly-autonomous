import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 px-6 py-20 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}
      />
      <Reveal className="relative z-10">
        <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
          Stop watching the weather yourself.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-slate-400">
          One question gets you the answer. Everything else runs on its own.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#top"
            className="rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-105 hover:shadow-sky-400/40 active:scale-95"
          >
            ↑ Ask the agent
          </a>
          <a
            href="#dashboard"
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:scale-105 hover:bg-white/5"
          >
            ↓ View live operations
          </a>
        </div>
      </Reveal>
    </section>
  );
}
