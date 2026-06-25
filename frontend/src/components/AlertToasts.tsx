import { AnimatePresence, motion } from "framer-motion";
import type { RiskAlert } from "../hooks/useRiskAlerts";
import { RISK_COLORS } from "../lib/types";

export function AlertToasts({
  alerts,
  onDismiss,
  onSelect,
}: {
  alerts: RiskAlert[];
  onDismiss: (id: string) => void;
  onSelect: (icao: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex w-80 flex-col gap-2">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-auto cursor-pointer rounded-lg border bg-[#0b0e16]/95 p-3 shadow-2xl backdrop-blur"
            style={{
              borderColor: `${RISK_COLORS[alert.level]}55`,
              boxShadow: `0 8px 30px -8px ${RISK_COLORS[alert.level]}40`,
            }}
            onClick={() => onSelect(alert.icao)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: RISK_COLORS[alert.level] }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: RISK_COLORS[alert.level] }}
                >
                  {alert.level} risk — {alert.icao}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss(alert.id);
                }}
                className="text-slate-500 transition hover:text-slate-200"
                aria-label="Dismiss alert"
              >
                ✕
              </button>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {alert.name}, {alert.city} · score {alert.score}/100
            </div>
            <div className="mt-1 text-xs text-slate-500">{alert.factors[0]}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
