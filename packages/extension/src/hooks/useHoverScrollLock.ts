import { useRef, useEffect, useState } from "react";

/**
 * A custom hook that locks the body scroll when the mouse hovers over the element
 * to which the returned ref is attached. It also compensates for the scrollbar width
 * to prevent content jumping.
 *
 * @returns A ref object to be attached to the target DOM element.
 */
export function useHoverScrollLock<T extends HTMLElement>(): {
  scrollLockRef: React.RefObject<T | null>;
  pageXOffset: number;
} {
  const ref = useRef<T | null>(null);
  const originalBodyStyles = useRef({
    overflow: "",
    paddingRight: "",
  });

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  const [pageXOffset, setPageXOffset] = useState(0);

  const saveBodyStyles = () => {
    const bodyStyle = window.document.body.style;
    if (bodyStyle.overflow !== "hidden") {
      originalBodyStyles.current = {
        overflow: bodyStyle.overflow,
        paddingRight: bodyStyle.paddingRight,
      };
    }
  };

  const handleMouseEnter = () => {
    const bodyStyle = window.document.body.style;
    const scrollbarWidth = getScrollbarWidth();
    saveBodyStyles();

    if (ref.current) {
      ref.current.style.width = `calc(100vw - ${scrollbarWidth}px)`;
    }
    bodyStyle.paddingRight = `${scrollbarWidth}px`;
    bodyStyle.overflow = "hidden";
    setPageXOffset(scrollbarWidth);
  };

  const handleMouseLeave = () => resetBodyStyles();

  const resetBodyStyles = () => {
    const bodyStyle = window.document.body.style;
    if (ref.current) {
      ref.current.style.width = "100vw";
    }
    if (originalBodyStyles.current.overflow !== undefined) {
      bodyStyle.overflow = originalBodyStyles.current.overflow;
      bodyStyle.paddingRight = originalBodyStyles.current.paddingRight;
    }
    setPageXOffset(0);
  };

  useEffect(() => {
    const element = ref.current;

    element?.addEventListener("mouseenter", handleMouseEnter);
    element?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element?.removeEventListener("mouseenter", handleMouseEnter);
      element?.removeEventListener("mouseleave", handleMouseLeave);

      resetBodyStyles();
    };
  }, [ref, handleMouseEnter, handleMouseLeave, resetBodyStyles]);

  return { scrollLockRef: ref, pageXOffset };
}
