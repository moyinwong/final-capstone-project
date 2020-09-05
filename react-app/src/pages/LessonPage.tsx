import React from "react";
// import ReactPlayer from "react-player";
import VideoPlayer from "../components/VideoPlayer";

const LessonPage: React.FC = () => {
  return (
    <div>
      <h1>This is Lesson Page</h1>
      <VideoPlayer url={"https://youtu.be/oZCM4u7d_6U"} />
    </div>
  );
};

export default LessonPage;
