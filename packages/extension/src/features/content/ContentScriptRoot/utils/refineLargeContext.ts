/**
 * Extracts a refined context when a large block of text exceeds the maximum length.
 */
export const refineLargeContext = (
  largeText: string,
  previousText: string,
): string => {
  const splitIndex = largeText.indexOf(previousText) + previousText.length;
  const firstPart = largeText.substring(0, splitIndex);
  const sentences = firstPart.match(/[^.!?]+[.!?]+/g) || [];

  return sentences.length > 0 ? sentences.at(0)! : previousText;
};
