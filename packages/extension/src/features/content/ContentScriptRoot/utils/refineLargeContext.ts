import getSentencesFromText from "./getSentencesFromText";

/**
 * Extracts a refined context when a large block of text exceeds the maximum length.
 */
export const refineLargeContext = (
  largeText: string,
  previousText: string,
): string => {
  const [left, right] = largeText.split(previousText);

  const leftSentences = getSentencesFromText(left);
  const rightSentences = getSentencesFromText(right);

  return `${leftSentences.at(0) || ""} ${previousText} ${
    rightSentences[0] || ""
  }`;
};
