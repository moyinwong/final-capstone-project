import React from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.scss";

interface IVideoProps {
  url: string;
  onEnded: () => void;
}

const VideoPlayer: React.FC<IVideoProps> = ({ url, onEnded }) => {
  return (
    // <div className="player-container">
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={url}
        width="80%"
        height="80%"
        controls={true}
        onEnded={onEnded}
      />
    </div>
    // </div>
  );
};

export default VideoPlayer;
