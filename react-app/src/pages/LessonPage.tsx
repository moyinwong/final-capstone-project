import React from "react";
// import ReactPlayer from "react-player";
import VideoPlayer from "../components/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import "./LessonPage.scss";
import { useState } from "react";

const LessonPage: React.FC = () => {
  const url = useSelector((state: IRootState) => state.lesson.url); //for testing
  const param: { courseName: string; lessonName: string } = useParams();
  const { courseName, lessonName } = param;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const userEmail = useSelector((state: IRootState) => state.auth.email);

  const [isAllowAccess, setIsAllowAccess] = useState(false);

  useEffect(() => {
    document.title = lessonName;
    return () => {
      document.title = "e-ducate";
    };
  }, []);

  //get user right after loading from redux
  useEffect(() => {
    (async () => {
      await getUserRight(courseName, userEmail);
      await getLessonInfo(lessonName);
    })();
  }, [userEmail]);

  const getUserRight = async (courseName: string, userEmail: string | null) => {
    if (!userEmail) {
      return;
    }
    let queryRoute: string = "/user/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${courseName}/${userEmail}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await fetchRes.json();
    if (!isAllowAccess && result) {
      setIsAllowAccess(true);
    }
  };

  const getLessonInfo = async (lessonName: string) => {
    let queryRoute: string = "/lesson/info/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonName}`
    );

    const result = await fetchRes.json();
    const { lessonInfo } = result;
    if (!isAllowAccess && lessonInfo.is_trial) {
      setIsAllowAccess(true);
    }
  };
  return (
    <div>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="影片">
          hihi
        </Tab>
        <Tab eventKey="profile" title="教材"></Tab>
        <Tab eventKey="contact" title="問題練習"></Tab>
      </Tabs>
    </div>
  );
};

export default LessonPage;
