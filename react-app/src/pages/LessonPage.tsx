import React from "react";
// import ReactPlayer from "react-player";
import VideoPlayer from "../components/VideoPlayer";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const LessonPage: React.FC = () => {
  const url = useSelector((state: IRootState) => state.lesson.url); //for testing
  const param: { courseName: string; lessonName: string } = useParams();
  const { courseName, lessonName } = param;

  useEffect(() => {
    getLessonInfo(lessonName);

    document.title = lessonName;
    return () => {
      document.title = "e-ducate";
    };
  }, []);

  const getLessonInfo = async (lessonName: string) => {
    let queryRoute: string = "/lesson/info/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonName}`
    );

    const result = await fetchRes.json();
    console.log("result: ", result);
  };
  return (
    <div>
      <h1>This is Lesson Page</h1>
      <VideoPlayer url={url} />
    </div>
  );
};

export default LessonPage;
