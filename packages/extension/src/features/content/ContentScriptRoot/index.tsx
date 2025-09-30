import React, { useEffect } from "react";
import { Sidebar } from "../../../components/Layout/Sidebar";
import { useAppStore } from "../../../store";
import { Toaster } from "sonner";
import { getWordOrPhraseContextForSelection } from "./utils/getWordOrPhraseContextForSelection";
import { expandSelectionToFullWords } from "./utils/expandSelectionToFullWords";

const SIDEBAR_OPEN_BODY_CLASS = "deepread-sidebar-open";

const ContentScriptRoot: React.FC = () => {
  const { isSidebarVisible, analyzeText } = useAppStore();
  const selectedTextFromStore = useAppStore((state) => state.selectedText);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (selectedTextFromStore) {
      document.body.classList.add(SIDEBAR_OPEN_BODY_CLASS);
    } else {
      document.body.classList.remove(SIDEBAR_OPEN_BODY_CLASS);
    }
  }, [selectedTextFromStore]);

  const handleMouseUp = (event: MouseEvent) => {
    if (!event.altKey) return;
    if (event.target instanceof HTMLElement === false) return;
    if (event.target.closest("#deepread-root")) return;

    let selection = window.getSelection();

    if (!selection) return;

    selection = expandSelectionToFullWords(selection);

    const selectedText = selection.toString().trim();

    const context = getWordOrPhraseContextForSelection(selection!);

    if (context) analyzeText(selectedText, context);
  };

  if (!isSidebarVisible) return null;

  return (
    <>
      <Toaster richColors position="bottom-center" />
      <Sidebar />
    </>
  );
};

export default ContentScriptRoot;
