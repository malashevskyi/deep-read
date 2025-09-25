console.log("DeepRead content script loaded successfully.");

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection()?.toString().trim();

  if (selectedText) {
    console.log(`Text selected: "${selectedText}"`);
  }
});
