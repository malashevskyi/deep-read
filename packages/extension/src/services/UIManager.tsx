import React from "react";
import ReactDOM from "react-dom/client";
import { Sidebar } from "../components/Layout/Sidebar";

import tailwindStylesUrl from "../index.css?url";

const SIDEBAR_OPEN_BODY_CLASS = "deepread-sidebar-open";

export class UIManager {
  private static instance: UIManager;
  private constructor() {}

  public static getInstance(): UIManager {
    if (!UIManager.instance) UIManager.instance = new UIManager();
    return UIManager.instance;
  }

  private rootElement: HTMLElement | null = null;
  private reactRoot: ReactDOM.Root | null = null;

  public mountSidebar(selectedText: string): void {
    if (this.rootElement) return;

    document.body.classList.add(SIDEBAR_OPEN_BODY_CLASS);

    this.rootElement = document.createElement("div");
    this.rootElement.id = "deepread-root";
    document.body.appendChild(this.rootElement);

    const shadowRoot = this.rootElement.attachShadow({ mode: "open" });

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = chrome.runtime.getURL(tailwindStylesUrl);
    shadowRoot.appendChild(styleLink);

    const reactContainer = document.createElement("div");
    shadowRoot.appendChild(reactContainer);

    this.reactRoot = ReactDOM.createRoot(reactContainer);
    this.reactRoot.render(
      <React.StrictMode>
        <Sidebar selectedText={selectedText} onClose={this.unmountSidebar} />
      </React.StrictMode>,
    );
  }

  // Use an arrow function to ensure `this` is correctly bound
  public unmountSidebar = (): void => {
    document.body.classList.remove(SIDEBAR_OPEN_BODY_CLASS);

    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
    if (this.rootElement) {
      this.rootElement.remove();
      this.rootElement = null;
    }
  };
}
