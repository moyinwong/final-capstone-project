import React from "react";
// import ReactPlayer from "react-player";
import VideoPlayer from "../components/VideoPlayer";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

const LessonPage: React.FC = () => {
  //const dispatch = useDispatch();
  const url = useSelector((state: IRootState) => state.lesson.url);

  return (
    <div>
      <h1>This is Lesson Page</h1>
      <VideoPlayer url={url} />
    </div>
  );
};

export default LessonPage;
