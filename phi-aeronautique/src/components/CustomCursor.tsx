import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor — a precise crosshair that follows the pointer with a
 * smoothly-trailing outer ring. Uses refs + requestAnimationFrame
 * rather than React state to avoid re-renders and keep 60fps.
 *
 * Hidden on touch devices via matchMedia('(hover: hover)').
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const rafId = useRef<number | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on devices without fine hover support
    const mq = window.matchMedia('(hover: hover)');
    setVisible(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setVisible(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const updateHover = (isHover: boolean) => {
      hovering.current = isHover;
    };

    const onEnter = () => updateHover(true);
    const onLeave = () => updateHover(false);

    // Delegate on document — cheaper than per-element listeners
    const attach = () => {
      const els = document.querySelectorAll<HTMLElement>('a, button');
      els.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
      return els;
    };

    let attached = attach();

    // Re-attach on DOM mutations (route changes, new content)
    const observer = new MutationObserver(() => {
      attached.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      attached = attach();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      // Lerp ring position toward mouse
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;

      const scale = hovering.current ? 1.4 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      attached.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      observer.disconnect();
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Crosshair dot (16x16) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transition: 'opacity 200ms ease',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="8" y1="0" x2="8" y2="16" stroke="#00A3E0" strokeWidth="1.25" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="#00A3E0" strokeWidth="1.25" />
        </svg>
      </div>

      {/* Trailing ring (32x32) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          border: '1px solid rgba(0,163,224,0.55)',
          borderRadius: '50%',
          transition: 'border-color 200ms ease',
        }}
      />
    </>
  );
}
