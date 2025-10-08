import { useRef, useEffect } from "react";

/**
 * A custom hook that locks the body scroll when the mouse hovers over the element
 * to which the returned ref is attached. It also compensates for the scrollbar width
 * to prevent content jumping.
 *
 * @returns A ref object to be attached to the target DOM element.
 */
export function useHoverScrollLock<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const originalBodyStyles = useRef({
    overflow: "",
    paddingRight: "",
  });

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

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
    saveBodyStyles();

    bodyStyle.paddingRight = `${getScrollbarWidth()}px`;
    bodyStyle.overflow = "hidden";
  };

  const handleMouseLeave = () => resetBodyStyles();

  const resetBodyStyles = () => {
    const bodyStyle = window.document.body.style;
    if (originalBodyStyles.current.overflow !== undefined) {
      bodyStyle.overflow = originalBodyStyles.current.overflow;
      bodyStyle.paddingRight = originalBodyStyles.current.paddingRight;
    }
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

  return ref;
}
