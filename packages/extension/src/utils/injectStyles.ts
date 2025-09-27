/**
 * Injects CSS code into the document's <head> via a <style> tag.
 * @param cssString The CSS code to inject.
 * @param id The unique ID for the style tag.
 */
export function injectStyles(cssString: string, id: string): void {
  if (document.getElementById(id)) return;

  const styleElement = document.createElement("style");
  styleElement.id = id;
  styleElement.innerHTML = cssString;
  document.head.appendChild(styleElement);
}
