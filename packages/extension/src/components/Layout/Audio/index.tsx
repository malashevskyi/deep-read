import { useAudioGeneration } from "../../../hooks/useAudioGeneration";
import type { AnalysisResponse } from "../../../types/schemas";
import { AudioPlayer } from "../../ui/AudioPlayer";

interface AudioProps {
  analysisData: AnalysisResponse | null;
}

const Audio: React.FC<AudioProps> = ({ analysisData }) => {
  const { audioUrl, isLoadingAudio } = useAudioGeneration(
    analysisData?.word.text,
  );

  return <AudioPlayer url={audioUrl} isLoading={isLoadingAudio} />;
};

export default Audio;
