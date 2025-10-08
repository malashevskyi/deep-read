import nlp from "compromise";

const getSentencesFromText = (text: string) => {
  return nlp(text).sentences().out("array");
};

export default getSentencesFromText;
