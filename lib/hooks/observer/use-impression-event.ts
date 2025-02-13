import { useRef, useEffect } from "react";

export const useImpressionEvent = (
  callback: () => void,
  options: UseImpressionEventOptions = { active: true, observerOptions: {} }
) => {
  const ref = useRef(null);
  const isCallbackCalled = useRef(false);

  useEffect(() => {
    if (!options.active || isCallbackCalled.current || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isCallbackCalled.current) {
            callback();
            isCallbackCalled.current = true;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5, ...options.observerOptions }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options.active, callback]);

  return ref;
};

interface UseImpressionEventOptions {
  active?: boolean;
  observerOptions?: IntersectionObserverInit;
}
