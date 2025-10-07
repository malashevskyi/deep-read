import React, { useEffect, useLayoutEffect } from "react";
import { Sidebar } from "../../../components/Layout/Sidebar";
import { useAppStore } from "../../../store";
import { getWordOrPhraseContextForSelection } from "./utils/getWordOrPhraseContextForSelection";
import { expandSelectionToFullWords } from "./utils/expandSelectionToFullWords";
import { captureError } from "../../../utils/sentry";

const SIDEBAR_OPEN_BODY_CLASS = "deepread-sidebar-open";

window.addEventListener("error", (event) => {
  captureError(event.error, {
    type: "window.error",
    message: event.message,
  });
});

window.addEventListener("unhandledrejection", (event) => {
  captureError(event.reason, {
    type: "unhandledRejection",
  });
});

const highlightApiSupported = CSS.highlights !== undefined;

if (highlightApiSupported) {
  CSS.highlights.set("deepread-highlight", new Highlight());
}

const ContentScriptRoot: React.FC = () => {
  const isSidebarVisible = useAppStore((state) => state.sidebar.isVisible);
  const openSidebar = useAppStore((state) => state.openSidebar);

  const selectedTextFromStore = useAppStore(
    (state) => state.sidebar.selectedText,
  );
  const [currentRange, setCurrentRange] = React.useState<Range | null>(null);

  useLayoutEffect(() => {
    let mounted = true;

    setTimeout(() => {
      if (!mounted) return;
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const isVisibleOnScreen =
        rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isVisibleOnScreen) {
        requestAnimationFrame(() => {
          const element = range.startContainer.parentElement;
          element?.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        });
      }
    }, 200);

    return () => {
      mounted = false;
    };
  }, [isSidebarVisible]);

  useEffect(() => {
    if (selectedTextFromStore) {
      document.body.classList.add(SIDEBAR_OPEN_BODY_CLASS);
    } else {
      document.body.classList.remove(SIDEBAR_OPEN_BODY_CLASS);
    }
  }, [selectedTextFromStore]);

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    if (!event.altKey) return;
    if (event.target instanceof HTMLElement === false) return;
    if (event.target.closest("#deepread-root")) return;

    let selection = window.getSelection();

    if (!selection) return;

    selection = expandSelectionToFullWords(selection);

    setCurrentRange(selection.getRangeAt(0).cloneRange());

    const selectedText = selection.toString().trim();

    const context = getWordOrPhraseContextForSelection(selection);

    if (context && selectedText) {
      openSidebar(selectedText, context);
    }

    return true;
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  useEffect(() => {
    if (!highlightApiSupported) return;

    const highlight = CSS.highlights.get("deepread-highlight");

    if (!highlight) return;

    highlight.clear();

    if (isSidebarVisible && currentRange) {
      highlight.add(currentRange);
    }
  }, [isSidebarVisible, currentRange]);

  if (!isSidebarVisible) return null;

  return (
    <>
      <Sidebar />
    </>
  );
};

export default ContentScriptRoot;
