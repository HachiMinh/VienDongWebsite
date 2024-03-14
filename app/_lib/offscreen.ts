import React from "react";

export default function offscreen(refObject: React.RefObject<HTMLElement>): boolean {
  const [isOnScreen, setIsOnScreen] = React.useState(false);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(
    () => {
      observerRef.current = new IntersectionObserver(
        ([entry]) => setIsOnScreen(entry.isIntersecting),
      );

      if (refObject.current !== null) {
        observerRef.current.observe(refObject.current);
      }

      return () => {
        if (observerRef.current !== null) {
          observerRef.current.disconnect();
        }
      };
    },
  );

  return isOnScreen;
}