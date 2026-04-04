"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export default function AnimateInView({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  const offsets = {
    up:    { y: 40,  x: 0   },
    down:  { y: -40, x: 0   },
    left:  { y: 0,   x: 40  },
    right: { y: 0,   x: -40 },
    none:  { y: 0,   x: 0   },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
