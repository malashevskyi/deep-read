import React, { useState, useEffect } from "react";
import { Sidebar } from "../../../components/Layout/Sidebar";
import { useAppStore } from "../../../store";

const SIDEBAR_OPEN_BODY_CLASS = "deepread-sidebar-open";

const ContentScriptRoot: React.FC = () => {
  const [selectedText, setSelectedText] = useState("");
  const { isSidebarVisible, analyzeText } = useAppStore();

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("#deepread-root")) return;

      if (event.metaKey || event.altKey) {
        const text = window.getSelection()?.toString().trim();
        if (text) {
          setSelectedText(text);
          analyzeText(text);
        }
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (selectedText) {
      document.body.classList.add(SIDEBAR_OPEN_BODY_CLASS);
    } else {
      document.body.classList.remove(SIDEBAR_OPEN_BODY_CLASS);
    }
  }, [selectedText]);

  if (!isSidebarVisible) return null;

  return <Sidebar />;
};

export default ContentScriptRoot;
