"use client";
import {Cloud, Heart, LucideIcon, Moon, Star} from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {MouseEventHandler, useRef} from "react";

export function HeroSection() {
  const easing = 0.08;
  const speed = 0.01;

  // Store forces in useRef to persist between renders
  const xForceRef = useRef(0);
  const yForceRef = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth motion effect
  const xSpring = useSpring(x, { damping: 10, stiffness: 100 });
  const ySpring = useSpring(y, { damping: 10, stiffness: 100 });

  // Linear interpolation function (memoized)
  const lerp = (start: number, target: number, amount: number) =>
      start * (1 - amount) + target * amount;

  // Mouse event handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    const { movementX, movementY } = e;

    xForceRef.current += movementX * speed;
    yForceRef.current += movementY * speed;

    xForceRef.current = lerp(xForceRef.current, 0, easing);
    yForceRef.current = lerp(yForceRef.current, 0, easing);

    x.set(x.get() + xForceRef.current);
    y.set(y.get() + yForceRef.current);

    if (Math.abs(xForceRef.current) < 0.01) xForceRef.current = 0;
    if (Math.abs(yForceRef.current) < 0.01) yForceRef.current = 0;
  };

  const handleMouseLeave: MouseEventHandler = (e) => {
    x.set(0);
    y.set(0);
  };

  return (
      <motion.section
          className="w-full min-h-[40svh] sm:min-h-[60svh] lg:min-h-[80svh] relative overflow-hidden flex justify-center items-center lg:-mt-8"
          // py-12 md:py-24 lg:py-32 xl:py-48
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
      >
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Plush E-commerce
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                An open-source e-commerce built with Next.js and Nest.js by collerty.
              </p>
            </div>
            <div className="space-x-4">
              <Link
                  href="/products"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Shop
              </Link>
              <Link
                  href="https://github.com/collerty/next-nest-plush-commerce"
                  target="_blank"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
        {/* Floating Elements */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ x: xSpring, y: ySpring }}>
          <FloatingElements />
        </motion.div>
      </motion.section>
  );
}

// Separated floating elements into their own component for better readability
function FloatingElements() {
  return (
      <>
        <FloatingIcon Icon={Heart} className="left-1/4 top-1/4 text-pink-300" />
        <FloatingIcon Icon={Cloud} className="right-1/4 top-1/3 text-blue-300" />
        <FloatingIcon Icon={Moon} className="left-1/3 bottom-1/4 text-yellow-300" />
        <FloatingIcon Icon={Star} className="right-1/3 bottom-1/3 text-purple-300" />
      </>
  );
}

// Reusable floating icon component
function FloatingIcon({ Icon, className }: { Icon: LucideIcon; className: string }) {
  return (
      <div className={`absolute transform -translate-x-1/2 -translate-y-1/2 opacity-50 ${className}`}>
        <Icon className="h-8 w-8 sm:h-16 sm:w-16" />
      </div>
  );
}