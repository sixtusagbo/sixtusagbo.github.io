"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Loads only the DOM animation feature set (no layout/drag) and pairs with the
 * lightweight `m` component, so the heavy `motion` bundle is never shipped.
 * `strict` makes any leftover `motion.*` usage throw, catching regressions.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
