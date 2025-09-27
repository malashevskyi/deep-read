import hostPageStyles from "./hostPageStyles.css?inline";
import { injectStyles } from "./utils/injectStyles";
import { UIManager } from "./services/UIManager";

console.log("[DeepRead] Content script loaded!");

injectStyles(hostPageStyles, "deepread-host-styles");

const uiManager = new UIManager();

document.addEventListener("mouseup", (event: MouseEvent) => {
  if (event.metaKey || event.altKey) {
    const text = window.getSelection()?.toString().trim();

    if (text) uiManager.mountSidebar(text);
  }
});
