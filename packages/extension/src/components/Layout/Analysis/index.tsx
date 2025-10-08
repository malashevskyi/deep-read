import { useSaveToDictionary } from "../../../hooks/useSaveToDictionary";
import { useTextAnalysis } from "../../../hooks/useTextAnalysis";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import HighlightText from "../../ui/HighlightText";
import Audio from "../Audio";

interface AnalysisProps {}

const Analysis: React.FC<AnalysisProps> = () => {
  const { analysisData, isLoadingText } = useTextAnalysis();

  const { saveWord, isSaving } = useSaveToDictionary();

  const handleSaveClick = () => {
    if (analysisData) {
      saveWord({
        text: analysisData.word.text,
        transcription: analysisData.word.transcription,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-5">
        <Audio analysisData={analysisData} />
        {analysisData && (
          <span className="font-semibold text-lg">
            {analysisData.word.transcription}
          </span>
        )}
      </div>

      {isLoadingText && (
        <p className="my-4">
          <em>Loading analysis...</em>
        </p>
      )}

      {analysisData && (
        <div className="my-6 border-t border-gray-200 pt-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <button
                onClick={handleSaveClick}
                disabled={isSaving}
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title={isSaving ? "Saving..." : "Save to Dictionary"}
              >
                {isSaving ? (
                  <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                ) : (
                  <FaRegBookmark className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-lg">
                  {analysisData.word.translation}
                </span>
              </div>

              <div>
                <p className="mt-1 text-gray-700">
                  <HighlightText
                    text={analysisData.example.adaptedSentence}
                    highlight={analysisData.word.text}
                  />
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  <em>{analysisData.example.translation}</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
