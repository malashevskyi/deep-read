import { ALLOWED_COPY_NODE_TYPES } from "../../../../config/constants";

/**
 * Expands a user's selection to encompass full words.
 * If the selection starts or ends mid-word, it extends the selection boundaries
 * to the nearest whitespace.
 * !This implementation currently handles selections within a single text node for reliability.
 * @param selection The initial Selection object from the browser.
 * @returns The modified Selection object with the expanded range.
 */
export const expandSelectionToFullWords = (selection: Selection): Selection => {
  if (selection.rangeCount === 0) return selection;

  const range = selection.getRangeAt(0);

  // handle only single text node selections for now
  if (
    range.startContainer !== range.endContainer ||
    !ALLOWED_COPY_NODE_TYPES.includes(range.startContainer.nodeType)
  ) {
    return selection;
  }

  const textNode = range.startContainer;
  const textContent = textNode.textContent || "";
  let { startOffset, endOffset } = range;

  while (startOffset > 0 && textContent[startOffset - 1] !== " ") {
    startOffset--;
  }

  while (endOffset < textContent.length && textContent[endOffset] !== " ") {
    endOffset++;
  }

  const newRange = document.createRange();
  newRange.setStart(textNode, startOffset);
  newRange.setEnd(textNode, endOffset);

  selection.removeAllRanges();
  selection.addRange(newRange);

  return selection;
};
