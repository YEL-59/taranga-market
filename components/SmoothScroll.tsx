"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Internal component to handle scroll-to-top because useLenis
// needs to be inside the ReactLenis provider
function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // Smoothly and automatically scroll to top on every page change
      lenis.scrollTo(0, {
        immediate: false,
        duration: 1.2, // Smooth and premium duration
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Basic fallback
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <ScrollToTop />
      {children}
    </ReactLenis>
  );
}
