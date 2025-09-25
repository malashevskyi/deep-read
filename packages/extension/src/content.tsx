console.log("DeepRead content script loaded successfully.");

document.addEventListener("mouseup", (event: MouseEvent) => {
  const modifierKeyPressed = event.metaKey || event.altKey;

  if (!modifierKeyPressed) return;

  const selectedText = window.getSelection()?.toString().trim();

  if (selectedText) {
    console.log(`Text selected: "${selectedText}"`);
  }
});
