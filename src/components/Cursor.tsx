import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springX = useSpring(0, { stiffness: 500, damping: 28 });
  const springY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, .card, select, input, .eth-pill');
      setIsHovering(!!isHoverable);
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [springX, springY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-red rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
        style={{ x: mousePosition.x, y: mousePosition.y, width: isHovering ? 14 : 8, height: isHovering ? 14 : 8 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[30px] h-[30px] border border-red/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ x: springX, y: springY }}
      />
    </>
  );
}
