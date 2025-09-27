/**
 * Injects CSS code directly into the host page's <head>.
 * This is intended for styles that need to affect the entire page.
 * @param cssString The CSS code to inject.
 * @param id The unique ID for the style tag to prevent duplicates.
 */
export function injectHostStyles(cssString: string, id: string): void {
  if (document.getElementById(id)) return;

  const styleElement = document.createElement("style");
  styleElement.id = id;
  styleElement.textContent = cssString;
  document.head.appendChild(styleElement);
}

/**
 * Injects CSS code into a Shadow DOM root via a <style> tag.
 * This is the recommended method for styling Shadow DOM components to prevent FOUC.
 * @param shadowRoot The ShadowRoot instance to inject styles into.
 * @param cssString The CSS code to inject.
 * @param id The unique ID for the style tag to prevent duplicates.
 */
export function injectShadowRootInlineStyles(
  shadowRoot: ShadowRoot,
  cssString: string,
  id: string,
): void {
  if (shadowRoot.querySelector(`#${id}`)) return;

  const styleElement = document.createElement("style");
  styleElement.id = id;
  styleElement.textContent = cssString;
  shadowRoot.appendChild(styleElement);
}

/**
 * Injects a stylesheet into a Shadow DOM root via a <link> tag.
 * This is used for loading external or pre-compiled CSS files.
 * @param shadowRoot The ShadowRoot instance to inject the stylesheet into.
 * @param url The fully resolved URL to the stylesheet.
 * @param id The unique ID for the link tag to prevent duplicates.
 */
export function injectShadowRootLinkedStyles(
  shadowRoot: ShadowRoot,
  url: string,
  id: string,
): void {
  if (shadowRoot.querySelector(`#${id}`)) return;

  const styleLink = document.createElement("link");
  styleLink.id = id;
  styleLink.rel = "stylesheet";
  styleLink.href = url;
  shadowRoot.appendChild(styleLink);
}
