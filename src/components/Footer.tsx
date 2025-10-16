'use client';

import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

export default function Footer() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [pikachuPosition, setPikachuPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [mounted, setMounted] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovering) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  useEffect(() => {
    if (!isHovering) return;

    const chaseCursor = () => {
      setPikachuPosition((prev) => {
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Update direction based on movement
        if (Math.abs(dx) > 1) {
          if (dx > 0) {
            setDirection('right');
          } else {
            setDirection('left');
          }
        }

        // Stop when Pikachu reaches the cursor (within 30px)
        if (distance < 5) {
          setIsRunning(false);
          return prev;
        }

        // Pikachu is running
        setIsRunning(true);

        // Speed of Pikachu
        const speed = 6;
        const moveX = (dx / distance) * speed;
        const moveY = (dy / distance) * speed;

        return {
          x: prev.x + moveX,
          y: prev.y + moveY,
        };
      });

      animationFrameRef.current = requestAnimationFrame(chaseCursor);
    };

    animationFrameRef.current = requestAnimationFrame(chaseCursor);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPosition, isHovering]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovering(true);
    setIsRunning(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setPikachuPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  return (
    <>
      {/* Render Pikachu and cursor using portal to avoid nesting issues */}
      {mounted && isHovering &&
        createPortal(
          <>
            <div
              className="pikachu-runner"
              style={{
                left: `${pikachuPosition.x}px`,
                top: `${pikachuPosition.y}px`,
                transform: `translate(-50%, -50%) scaleX(${direction === 'left' ? -1 : 1})`,
              }}
            >
              <Image
                src={isRunning ? '/pikachu.gif' : '/pikachu-staticc.png'}
                alt="Pikachu"
                width={40}
                height={40}
                unoptimized
                className="pikachu-gif"
              />
            </div>

            <div
              className="cursor-target"
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
              }}
            />
          </>,
          document.body
        )}

      <footer
        className="border-t border-gray-200 dark:border-gray-800 mt-auto pikachu-zone"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Made by{' '}
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                 <a href="https://www.instagram.com/nmn_0s/" target='_blank'>Naman</a>
              </span>
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/newman05"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/naman-surana-work/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </Link>

              <Link
                href="https://medium.com/@nmn_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Image src="/medium.svg" alt="Medium logo" width={20} height={20} className="inline-block" />
                <span>Medium</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}