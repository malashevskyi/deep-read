import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "../../../components/Layout/Sidebar";

const SIDEBAR_OPEN_BODY_CLASS = "deepread-sidebar-open";

const ContentScriptRoot: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const handleClose = useCallback(() => {
    setSidebarVisible(false);
    setSelectedText("");
  }, []);

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("#deepread-root")) return;

      if (event.metaKey || event.altKey) {
        const text = window.getSelection()?.toString().trim();
        if (text) {
          setSelectedText(text);
          setSidebarVisible(true);
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

  return <Sidebar selectedText={selectedText} onClose={handleClose} />;
};

export default ContentScriptRoot;
