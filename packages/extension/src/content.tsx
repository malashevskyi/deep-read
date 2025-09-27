import hostPageStyles from "./hostPageStyles.css?inline";
import { UIManager } from "./services/UIManager";
import { injectHostStyles } from "./utils/styles";

console.log("[DeepRead] Content script loaded!");

injectHostStyles(hostPageStyles, "deepread-host-styles");

const uiManager = UIManager.getInstance();

document.addEventListener("mouseup", (event: MouseEvent) => {
  if (event.metaKey || event.altKey) {
    const text = window.getSelection()?.toString().trim();

    if (text) uiManager.mountSidebar(text);
  }
});
