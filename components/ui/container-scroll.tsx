// ContainerScroll — 3D rotate-in mockup on scroll (adapted from Aceternity UI).
// Converted to motion/react and restyled with a LIGHT device frame to fit the
// Jadoo theme. Honors prefers-reduced-motion (renders flat, no rotate/scale).
"use client";

import React, { useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDims = (): [number, number] => (isMobile ? [0.8, 0.95] : [1.05, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDims());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[58rem] items-center justify-center p-2 md:h-[78rem] md:p-20"
    >
      <div className="relative w-full py-8 md:py-24" style={{ perspective: "1000px" }}>
        <Header translate={reduced ? undefined : translate}>{titleComponent}</Header>
        <Card
          rotate={reduced ? undefined : rotate}
          scale={reduced ? undefined : scale}
        >
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({
  translate,
  children,
}: {
  translate?: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={translate ? { y: translate } : undefined}
      className="mx-auto max-w-5xl text-center"
    >
      {children}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate?: MotionValue<number>;
  scale?: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000001a, 0 37px 37px #00000017, 0 84px 50px #0000000a",
      }}
      // Light device frame (Jadoo): soft cream bezel, coral hairline.
      className="mx-auto -mt-10 h-[28rem] w-full max-w-5xl rounded-[28px] border border-line bg-white p-2 shadow-card-hover md:h-[40rem] md:p-4"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-panel">
        {children}
      </div>
    </motion.div>
  );
}
