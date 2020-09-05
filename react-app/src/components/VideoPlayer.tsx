import React from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.scss";

interface IVideoProps {
  url: string;
}

const VideoPlayer: React.FC<IVideoProps> = ({ url }) => {
  return (
    // <div className="player-container">
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={url}
        width="80%"
        height="80%"
        controls={true}
      />
    </div>
    // </div>
  );
};

export default VideoPlayer;
