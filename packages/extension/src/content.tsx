import React from "react";
import ReactDOM from "react-dom/client";
import { Sidebar } from "./components/Layout/Sidebar";
import sidebarCssString from "./index.css?inline";

console.log("[DeepRead] Content script loaded!");

let rootElement: HTMLElement | null = null;
let reactRoot: ReactDOM.Root | null = null;

function mountSidebar(selectedText: string) {
  if (rootElement) unmountSidebar();

  rootElement = document.createElement("div");
  rootElement.id = "deepread-root";
  document.body.appendChild(rootElement);

  const shadowRoot = rootElement.attachShadow({ mode: "open" });
  const reactContainer = document.createElement("div");
  shadowRoot.appendChild(reactContainer);

  const styleElement = document.createElement("style");
  styleElement.innerHTML = sidebarCssString;
  shadowRoot.appendChild(styleElement);

  reactRoot = ReactDOM.createRoot(reactContainer);
  reactRoot.render(
    <React.StrictMode>
      <Sidebar selectedText={selectedText} onClose={unmountSidebar} />
    </React.StrictMode>,
  );
}

function unmountSidebar() {
  if (reactRoot) {
    reactRoot.unmount();
    reactRoot = null;
  }
  if (rootElement) {
    rootElement.remove();
    rootElement = null;
  }
}

document.addEventListener("mouseup", (event: MouseEvent) => {
  const modifierKeyPressed = event.metaKey || event.altKey;
  if (!modifierKeyPressed) return;

  const selectedText = window.getSelection()?.toString().trim();
  if (selectedText) {
    mountSidebar(selectedText);
  }
});
