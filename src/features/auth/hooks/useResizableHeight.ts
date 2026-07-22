import { useState, useRef, useCallback } from "react";

interface UseResizableHeightOptions {
  initialHeight?: number; // Starting height in px
  minHeight?: number; // Minimum height allowed
  maxHeight?: number; // Maximum height allowed (defaults to 85% of screen height)
  direction?: "up" | "down"; // Dragging up increases height (bottom sheet) vs dragging down
}

export function useResizableHeight({
  initialHeight = 300,
  minHeight = 520,
  maxHeight,
  direction = "up",
}: UseResizableHeightOptions = {}) {
  const [height, setHeight] = useState<number>(initialHeight);
  const isResizing = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const startResizing = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      isResizing.current = true;

      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      startY.current = clientY;
      startHeight.current = height;

      const handleMove = (moveEvent: TouchEvent | MouseEvent) => {
        if (!isResizing.current) return;

        const currentY =
          "touches" in moveEvent
            ? moveEvent.touches[0].clientY
            : moveEvent.clientY;
        const rawDelta = startY.current - currentY;
        const deltaY = direction === "up" ? rawDelta : -rawDelta;

        const effectiveMaxHeight = maxHeight ?? window.innerHeight * 0.85;

        const newHeight = Math.min(
          Math.max(startHeight.current + deltaY, minHeight),
          effectiveMaxHeight,
        );

        setHeight(newHeight);
      };

      const handleEnd = () => {
        isResizing.current = false;
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleEnd);
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEnd);
    },
    [height, minHeight, maxHeight, direction],
  );

  return {
    height,
    setHeight,
    startResizing,
  };
}
