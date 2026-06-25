export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div
        className="aurora-1 absolute left-1/4 top-0 h-[36rem] w-[36rem] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}
      />
      <div
        className="aurora-2 absolute right-1/4 top-1/3 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }}
      />
      <div
        className="aurora-3 absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #34d399, transparent 70%)" }}
      />
    </div>
  );
}
