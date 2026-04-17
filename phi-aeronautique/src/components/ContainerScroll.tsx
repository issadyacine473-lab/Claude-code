import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface Props {
  titleComponent: ReactNode;
  children: ReactNode;
}

export function ContainerScroll({ titleComponent, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateX   = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale     = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: '140vh' }}
    >
      <div
        className="sticky flex flex-col items-start gap-10 px-[6vw]"
        style={{ top: '10vh', perspective: '1200px' }}
      >
        {/* Title slot */}
        <motion.div
          className="w-full"
          style={{ translateY: reduce ? 0 : translateY }}
        >
          {titleComponent}
        </motion.div>

        {/* 3D card */}
        <motion.div
          className="w-full"
          style={{
            rotateX: reduce ? 0 : rotateX,
            scale: reduce ? 1 : scale,
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
