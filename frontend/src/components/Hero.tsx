import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AirportWithStatus } from "../lib/types";
import { STAGE_LABEL, useAiBriefing } from "../hooks/useAiBriefing";
import { AuroraBackground } from "./AuroraBackground";

const EXAMPLES = [
  "Which airports are at risk right now?",
  "What's happening in Asia?",
  "Any thunderstorms affecting Europe?",
];

export function Hero({ airports }: { airports: AirportWithStatus[] }) {
  const [question, setQuestion] = useState("");
  const { stage, loading, elapsed, text, usedManus, ask, reset } = useAiBriefing(airports);

  const reporting = airports.filter((a) => a.risk).length;
  const severe = airports.filter((a) => a.risk?.level === "SEVERE").length;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    ask(question);
  }

  function askExample(example: string) {
    setQuestion(example);
    ask(example);
  }

  function askAgain() {
    reset();
    setQuestion("");
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <AuroraBackground />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-slate-400 backdrop-blur-sm"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        Live · {reporting} airports reporting · {severe} severe right now · zero human input
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-glow-sky relative z-10 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-50 sm:text-5xl"
      >
        An agent that watches{" "}
        <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
          the sky
        </span>
        , so you don't have to.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 mt-4 max-w-xl text-slate-400"
      >
        Ask one question — or just hit enter — and get a live, explainable delay-risk
        briefing for 102 airports worldwide, generated from real weather data.
      </motion.p>

      <AnimatePresence mode="wait">
        {stage === "idle" && (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="relative z-10 mt-10 w-full max-w-xl"
          >
            <div className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-md transition focus-within:border-sky-400/50 focus-within:shadow-[0_0_40px_-5px_rgba(56,189,248,0.35)]">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. Which airports are at risk right now?"
                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-105 hover:shadow-sky-400/40 active:scale-95"
              >
                Ask →
              </button>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {EXAMPLES.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => askExample(example)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-500 transition hover:scale-105 hover:border-sky-400/30 hover:text-slate-300"
                >
                  {example}
                </button>
              ))}
            </div>
          </motion.form>
        )}

        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mt-12 flex flex-col items-center gap-3"
          >
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500/20 border-t-sky-400" />
            <div className="text-sm text-slate-400">{STAGE_LABEL[stage]}</div>
            <div className="font-mono text-xs text-slate-600">{elapsed}s elapsed</div>
          </motion.div>
        )}

        {!loading && text && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 mt-10 w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-2xl backdrop-blur-md"
          >
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
              <span>{usedManus ? "Manus AI" : "Local summary"}</span>
              <button type="button" onClick={askAgain} className="transition hover:text-slate-200">
                Ask another ✕
              </button>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="#dashboard"
        className="relative z-10 mt-14 text-xs uppercase tracking-widest text-slate-500 transition hover:tracking-[0.2em] hover:text-slate-300"
      >
        View live operations data ↓
      </a>
    </section>
  );
}
