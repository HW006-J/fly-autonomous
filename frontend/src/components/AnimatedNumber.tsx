import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/** Counts up to `value` once it scrolls into view. Non-numeric strings (e.g. "10 min") render as-is. */
export function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/^[0-9]+/, "");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) return;
    const duration = 900;
    const start = performance.now();
    let frame: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(eased * numeric));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, numeric]);

  if (Number.isNaN(numeric)) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <motion.span ref={ref}>
      {display}
      {suffix}
    </motion.span>
  );
}
