import React, { useRef, useEffect } from "react";
import ReactH5AudioPlayer from "react-h5-audio-player";
import { FaPlay, FaPause } from "react-icons/fa";

import "react-h5-audio-player/lib/styles.css";

interface AudioPlayerProps {
  url: string;
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  url,
  autoPlay = false,
}) => {
  const playerRef = useRef<ReactH5AudioPlayer>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.audio.current.playbackRate = 0.85;
    }
  }, []);

  return (
    <div className="w-8 h-8">
      <ReactH5AudioPlayer
        ref={playerRef}
        src={url}
        autoPlay={autoPlay}
        showJumpControls={false}
        showDownloadProgress={false}
        customProgressBarSection={[]}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        customIcons={{
          play: <FaPlay />,
          pause: <FaPause />,
        }}
        className="bg-transparent shadow-none border-gray-600"
        layout="stacked-reverse"
      />
    </div>
  );
};
