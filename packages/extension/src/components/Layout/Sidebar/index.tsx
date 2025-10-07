import { useAppStore } from "../../../store";
import { ErrorDisplay } from "../../ui/ErrorDisplay";
import HighlightText from "../../ui/HighlightText";
import { AudioPlayer } from "../../ui/AudioPlayer";
import { Button } from "../../ui/Button";
import { useSaveToDictionary } from "../../../hooks/useSaveToDictionary";
import { useAudioGeneration } from "../../../hooks/useAudioGeneration";
import { useTextAnalysis } from "../../../hooks/useTextAnalysis";

export const Sidebar = () => {
  const selectedText = useAppStore((state) => state.sidebar.selectedText);
  const selectionContext = useAppStore((state) => state.sidebar.context);
  const closeSidebar = useAppStore((state) => state.closeSidebar);

  const { analysisData, analysisError, isLoadingText } = useTextAnalysis(
    selectedText,
    selectionContext,
  );
  const { audioUrl, isLoadingAudio, audioError } = useAudioGeneration(
    analysisData?.word.text,
  );
  const { saveWord, isSaving, saveError } = useSaveToDictionary();

  const handleSaveClick = () => {
    if (analysisData) {
      saveWord({
        text: analysisData.word.text,
        transcription: analysisData.word.transcription,
      });
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-[350px] ...">
      <div className="flex justify-between items-center p-4 ...">
        <h3 className="m-0 text-base font-semibold">DeepRead AI</h3>
        <Button onClick={closeSidebar} className="...">
          &times;
        </Button>
      </div>
      <div className="p-4 overflow-y-auto flex-grow">
        <details className="mb-4 text-xs text-gray-500 cursor-pointer">
          <summary className="outline-none">Show Context</summary>
          <p className="mt-2 p-2 bg-gray-50 border rounded-md italic">
            {selectionContext}
          </p>
        </details>
        <div className="mt-5">
          {isLoadingText && (
            <p>
              <em>Loading analysis...</em>
            </p>
          )}
          <ErrorDisplay error={saveError || analysisError || audioError} />

          {isLoadingAudio && (
            <span className="text-xs">generating audio...</span>
          )}
          {audioUrl && (
            <div className="mb-4">
              <AudioPlayer url={audioUrl} />
            </div>
          )}

          {analysisData && (
            <>
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-lg">
                  {analysisData.word.transcription}
                </span>
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
            </>
          )}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <Button onClick={handleSaveClick} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save to Dictionary"}
            </Button>
            <ErrorDisplay error={saveError} />
          </div>
        </div>
      </div>
    </div>
  );
};
