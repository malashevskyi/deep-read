import React from "react";
import ReactDOM from "react-dom/client";
import hostPageStyles from "./hostPageStyles.css?inline";
import tailwindStylesUrl from "./index.css?url";
import {
  injectHostStyles,
  injectShadowRootLinkedStyles,
} from "../../utils/styles";
import ContentScriptRoot from "./ContentScriptRoot";
import { ErrorBoundary } from "../../components/system/ErrorBoundary";

console.log("[DeepRead] Content script loaded!");

injectHostStyles(hostPageStyles, "deepread-host-styles");

const rootElement = document.createElement("div");
rootElement.id = "deepread-root";
document.body.appendChild(rootElement);

const shadowRoot = rootElement.attachShadow({ mode: "open" });

injectShadowRootLinkedStyles(shadowRoot, tailwindStylesUrl, "tailwind-styles");

const reactRoot = ReactDOM.createRoot(shadowRoot);

reactRoot.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ContentScriptRoot />
    </ErrorBoundary>
  </React.StrictMode>,
);
