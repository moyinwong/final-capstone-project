import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import "./LessonPage.scss";

interface ILessInfo {
  id: number;
  name: string;
  description: string;
  is_trial: boolean;
  video_url: string;
  course_id: number;
  created_at: string;
  updated_at: string;
}

interface IQuestionAndAnswer {
  lesson_id: string;
  lesson_name: string;
  question_id: number;
  question: string;
  answer_id: number;
  answer_body: string;
}

interface IFile {
  lesson_id: number;
  lesson_name: string;
  name_id: number;
  file_name: string;
}

const LessonPage: React.FC = () => {
  const url = useSelector((state: IRootState) => state.lesson.url); //for testing
  const param: { courseName: string; lessonName: string } = useParams();
  const { courseName, lessonName } = param;
  const token = localStorage.getItem("token");
  let userEmail: undefined | null | string = undefined;
  userEmail = useSelector((state: IRootState) => state.auth.email);
  const [isAllowAccess, setIsAllowAccess] = useState<boolean>(false);
  const [userRight, setUserRight] = useState<boolean | null>(null);
  const [lessonInfo, setLessonInfo] = useState<ILessInfo>();
  const [questionAndAnswer, setQuestionAndAnswer] = useState<
    Array<IQuestionAndAnswer>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<IFile>>([]);
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const [isReadyRender, setIsReadyRender] = useState<boolean>(false);

  //edit title once started
  useEffect(() => {
    document.title = lessonName;
    return () => {
      document.title = "e-ducate";
    };
  }, []);

  //get user right after loading from redux, default userEmail is undefined
  useEffect(() => {
    (async () => {
      await getUserRight(courseName, userEmail);
      await getLessonInfo(lessonName);
      await getQuestionAndAnswer(lessonName);
      await getFiles(lessonName);
    })();
  }, [userEmail]);

  //set is ready render after retrieve all data
  useEffect(() => {
    if (lessonInfo && userRight !== undefined) setIsReadyRender(true);
  }, [userRight, lessonInfo]);

  const getUserRight = async (
    courseName: string,
    userEmail: string | null | undefined
  ) => {
    if (userEmail === null) {
      setUserRight(false);
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

    //console.log("result: ", result);
    if (result) {
      setIsAllowAccess(true);
      setUserRight(true);
    } else {
      setUserRight(false);
    }
  };

  const getLessonInfo = async (lessonName: string) => {
    let queryRoute: string = "/lesson/info/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonName}`
    );

    const result = await fetchRes.json();
    const { lessonInfo } = result;
    //console.log(lessonInfo);
    if (lessonInfo.is_trial) {
      setIsAllowAccess(true);
    }
    setLessonInfo(lessonInfo);
  };

  const getQuestionAndAnswer = async (lessonName: string) => {
    let queryRoute: string = "/lesson/question/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonName}`
    );

    const result = await fetchRes.json();
    const { questionAndAnswer } = result;
    setQuestionAndAnswer(questionAndAnswer);
  };

  const getFiles = async (lessonName: string) => {
    let queryRoute: string = "/lesson/file/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonName}`
    );

    const result = await fetchRes.json();
    const { files } = result;
    setFiles(files);
  };

  //handle answer on submit
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    let queryRoute: string = "/lesson/file/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonName}`
    );
  };

  return (
    <>
      {isReadyRender && (
        <>
          {isAllowAccess && lessonInfo && questionAndAnswer && files && (
            <div>
              <Tabs defaultActiveKey="video" id="uncontrolled-tab-example">
                <Tab
                  eventKey="video"
                  title={
                    <>
                      影片 <i className="fas fa-video" />
                    </>
                  }
                >
                  <div className="player-wrapper">
                    <ReactPlayer
                      className="react-player"
                      url={lessonInfo.video_url}
                      width="80%"
                      height="80%"
                      controls={true}
                      onEnded={() => {
                        //testing
                        console.log(userEmail);
                      }}
                    />
                  </div>
                </Tab>
                <Tab
                  eventKey="material"
                  title={
                    <>
                      教材 <i className="far fa-file" />
                    </>
                  }
                >
                  <div>可供下載：</div>
                  {files.map((e, i) => {
                    return (
                      <div key={i}>
                        {" "}
                        <a
                          href={`http://localhost:8080/file/${e.file_name}`}
                          download
                        >
                          {e.file_name}
                        </a>
                      </div>
                    );
                  })}
                </Tab>
                <Tab
                  eventKey="exercise"
                  title={
                    <>
                      問題練習 <i className="far fa-question-circle" />
                    </>
                  }
                >
                  {!userRight && <div>請先購買此課堂</div>}
                  {userRight && (
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      {questionAndAnswer.map((e, i, a) => {
                        if (i === 0 || a[i - 1].question_id !== e.question_id) {
                          {
                            //console.log("haha");
                          }
                          return (
                            <>
                              <Form.Label>{e.question} </Form.Label>
                              <Col>
                                {a.map((ea, ia) => {
                                  if (ea.question_id === e.question_id) {
                                    return (
                                      <Form.Check
                                        type="radio"
                                        label={ea.answer_body}
                                        value={ea.answer_body}
                                        name={ea.question}
                                        id={ea.answer_id.toString()}
                                        ref={register({ required: true })}
                                      />
                                    );
                                  }
                                })}
                              </Col>
                              {errors[e.question] && "請選擇答案"}
                            </>
                          );
                        }
                      })}
                      <Button variant="primary" type="submit">
                        提交
                      </Button>
                      {isLoading && (
                        <ReactLoading
                          type={"spin"}
                          color="black"
                          height={667}
                          width={375}
                        />
                      )}
                    </Form>
                  )}
                </Tab>
              </Tabs>
            </div>
          )}
          {!isAllowAccess && <div>請先購買此課堂</div>}
        </>
      )}
    </>
  );
};

export default LessonPage;
