import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  onIntersect: () => void,
  isLoading: boolean,
  hasMore: boolean,
) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we are loading or there's no more data, stop observing
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Only trigger if intersecting AND not currently loading
        if (entries[0].isIntersecting && !isLoading) {
          onIntersect();
        }
      },
      { threshold: 0.1 }, // Trigger earlier (10% visible)
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [onIntersect, isLoading, hasMore]);

  return sentinelRef;
};
