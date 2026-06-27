import { motion } from "framer-motion";
import { useId } from "react";

/* Slow drifting blobs — soft mesh feel */
export function MeshBlobs({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="absolute -top-32 -left-32 size-[40rem] rounded-full bg-mint opacity-20 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-20 size-[36rem] rounded-full bg-gold opacity-20 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-primary-soft opacity-40 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* Dotted grid that shimmers slightly */
export function DotGrid({ className = "" }) {
  const id = useId();
  return (
    <svg className={`pointer-events-none absolute inset-0 w-full h-full ${className}`} aria-hidden>
      <defs>
        <pattern id={id} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="oklch(0.60 0.12 135 / 0.25)" />
        </pattern>
        <radialGradient id={`${id}-fade`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} mask={`url(#${id}-mask)`} />
    </svg>
  );
}

/* Faint grid lines */
export function GridLines({ className = "" }) {
  const id = useId();
  return (
    <svg className={`pointer-events-none absolute inset-0 w-full h-full ${className}`} aria-hidden>
      <defs>
        <pattern id={id} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0 H0 V80" fill="none" stroke="oklch(0.60 0.12 135 / 0.10)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* Floating leaf SVGs drifting up */
const LeafPath = (
  <path
    d="M12 2C7 6 4 10 4 15a8 8 0 0016 0c0-5-3-9-8-13zm0 4c3 3 5 6 5 9a5 5 0 01-10 0c0-3 2-6 5-9z"
    fill="currentColor"
  />
);

export function FloatingLeaves({ count = 8, className = "" }) {
  const leaves = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 97) % 100}%`,
    size: 18 + ((i * 13) % 28),
    delay: (i * 1.7) % 6,
    duration: 14 + ((i * 3) % 10),
    rotate: (i * 47) % 360,
    opacity: 0.08 + ((i * 7) % 12) / 100,
  }));
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {leaves.map((l, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          width={l.size}
          height={l.size}
          style={{ left: l.left, opacity: l.opacity, color: "oklch(0.60 0.12 135)" }}
          className="absolute -bottom-10"
          initial={{ y: 0, rotate: l.rotate }}
          animate={{ y: "-120vh", rotate: l.rotate + 360, x: [0, 30, -20, 0] }}
          transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: "linear" }}
        >
          {LeafPath}
        </motion.svg>
      ))}
    </div>
  );
}

/* Animated horizontal sweep beam */
export function SweepBeam({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* Particles — small circles drifting */
export function Particles({ count = 30, className = "" }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 53) % 100}%`,
    top: `${(i * 71) % 100}%`,
    size: 2 + ((i * 3) % 4),
    delay: (i * 0.3) % 4,
    duration: 6 + ((i * 2) % 8),
  }));
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/40"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
