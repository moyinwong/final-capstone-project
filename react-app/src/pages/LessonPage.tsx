import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";

import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";

import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import CheckingModal from "../components/CheckingModal";
import "./LessonPage.scss";
import { push } from "connected-react-router";
import NewDiscussionModal from "../components/NewDiscussionModal";

interface ILessInfo {
  category_id: number;
  subcategory_id: number;
  lesson_id: number;
  lesson_name: string;
  lesson_description: string;
  is_trial: boolean;
  video_url: string;
  course_id: number;
  course_name: string;
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

export interface IThread {
  discussion_id: number;
  topic: string;
  file_name: string;
  threads_id: number;
  thread_content: string;
  username: string;
}

const categories: string[] = [
  "中文",
  "英文",
  "數學",
  "通識",
  "物理",
  "化學",
  "生物",
  "經濟",
  "歷史",
  "企會財",
  "ICT",
  "視覺藝術",
  "M1",
  "M2",
];

const subcategories: string[] = ["編程", "廚藝", "DIY", "美容"];

const LessonPage: React.FC = () => {
  //const url = useSelector((state: IRootState) => state.lesson.url); //for testing
  const param: { courseName: string; lessonName: string } = useParams();
  const { courseName, lessonName } = param;

  console.log(courseName, lessonName);

  const token = localStorage.getItem("token");
  let userEmail: undefined | null | string = undefined;
  userEmail = useSelector((state: IRootState) => state.auth.email);
  const [isAllowAccess, setIsAllowAccess] = useState<boolean>(false);
  const [userRight, setUserRight] = useState<boolean | null>(null);
  const [lessonInfo, setLessonInfo] = useState<ILessInfo>();
  const [isSubCategory, setIsSubCategory] = useState<boolean>(false);
  const [questionAndAnswer, setQuestionAndAnswer] = useState<
    Array<IQuestionAndAnswer>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<IFile>>([]);
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const [isDisplayModal, setIsDisplayModal] = useState<boolean>(false);
  const [checkingResult, setCheckingResult] = useState<
    {
      question: string;
      isCorrect: string;
    }[]
  >([]);

  const [threads, setThreads] = useState<IThread[]>([]);
  const [isReadyRender, setIsReadyRender] = useState<boolean>(false);

  const dispatch = useDispatch();

  //edit title once started
  useEffect(() => {
    document.title = lessonName;
    return () => {
      document.title = "e-ducate";
    };
  }, [lessonName]);

  //get user right after loading from redux, default userEmail is undefined
  useEffect(() => {
    (async () => {
      await getUserRight(courseName, userEmail);
      await getLessonInfo(lessonName);
      await getQuestionAndAnswer(lessonName);
      await getFiles(lessonName);
    })();
  }, [userEmail]);

  useEffect(() => {
    (async () => {
      console.log("hahahaahahh");
      if (lessonInfo?.lesson_id && threads.length === 0)
        await getThreads(lessonInfo.lesson_id);
    })();
  }, [lessonInfo]);

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

    console.log("result: ", result);
    if (result) {
      setIsAllowAccess(true);
      setUserRight(result.is_allow);
    } else {
      setUserRight(false);
    }
  };

  const getLessonInfo = async (lessonName: string) => {
    console.log(lessonName);
    let queryRoute: string = "/lesson/info/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonName}`
    );

    const result = await fetchRes.json();
    const { lessonInfo } = result;
    console.log("info: ", lessonInfo);
    setIsSubCategory(lessonInfo.category_id === 15);
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

  const getThreads = async (lessonId: number) => {
    let queryRoute: string = "/lesson/threads/retrieve/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonId}`
    );

    const result = await fetchRes.json();
    const { threads } = result;

    //sort the thread by discussion id
    threads.sort((a: IThread, b: IThread) => a.discussion_id - b.discussion_id);
    console.log("threads :", threads);
    setThreads(threads);
  };

  //handle answer on submit
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    let queryRoute: string = "/lesson/check/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const { result } = await fetchRes.json();
    console.log(result);
    let transferResult: { question: string; isCorrect: string }[] = [];
    for (let eachResult of result) {
      let [key] = Object.keys(eachResult);
      transferResult.push({ question: key, isCorrect: eachResult[key] });
    }
    setCheckingResult(transferResult);
    setIsDisplayModal(true);
    setIsLoading(false);
  };

  return (
    <>
      {isReadyRender && (
        <>
          {isAllowAccess && lessonInfo && questionAndAnswer && files && (
            <div>
              <div className="modal-container">
                <CheckingModal
                  show={isDisplayModal}
                  onHide={() => setIsDisplayModal(false)}
                  content={checkingResult.map((e, i) => {
                    return (
                      <p>
                        {e.question}
                        {e.isCorrect === "correct" && (
                          <i className="fas fa-check"></i>
                        )}
                        {e.isCorrect === "wrong" && (
                          <i className="fas fa-times"></i>
                        )}
                      </p>
                    );
                  })}
                />
              </div>
              <Breadcrumb>
                <Breadcrumb.Item onClick={() => dispatch(push("/"))}>
                  主頁
                </Breadcrumb.Item>
                {isSubCategory ? (
                  <>
                    <Breadcrumb.Item
                      onClick={() => dispatch(push("/category/其他/"))}
                    >
                      其他
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                      onClick={() =>
                        dispatch(
                          push(
                            `/category/其他/${
                              subcategories[lessonInfo.subcategory_id - 1]
                            }`
                          )
                        )
                      }
                    >
                      {subcategories[lessonInfo.subcategory_id - 1]}課程
                    </Breadcrumb.Item>
                  </>
                ) : (
                  <>
                    <Breadcrumb.Item
                      onClick={() =>
                        dispatch(
                          push(
                            `/category/${
                              categories[lessonInfo.category_id - 1]
                            }`
                          )
                        )
                      }
                    >
                      {categories[lessonInfo.category_id - 1]}課程
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                      onClick={() => dispatch(push(`/course/${courseName}`))}
                    >
                      {courseName}
                    </Breadcrumb.Item>
                  </>
                )}

                <Breadcrumb.Item active>
                  {lessonInfo.lesson_name}
                </Breadcrumb.Item>
              </Breadcrumb>
              <Tabs defaultActiveKey="video" id="uncontrolled-tab-example">
                <Tab
                  eventKey="video"
                  title={
                    <>
                      影片 <i className="far fa-video" />
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
                  <div id="description-container">
                    <p>{lessonInfo.lesson_description}</p>
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
                  <div className="material-content">可供下載：</div>
                  {files.length === 0 && <div>暫時未有</div>}
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
                  eventKey="discussion"
                  title={
                    <>
                      討論區 <i className="far fa-comments"></i>
                    </>
                  }
                >
                  {!userRight && (
                    <div className="purchase-first">
                      <div>請先購買此課堂</div>
                    </div>
                  )}
                  {userRight && (
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="first"
                    >
                      <Row>
                        <Col sm={3} className="topic-nav">
                          {threads.map((e, i, arr) => {
                            if (
                              i === 0 ||
                              (i !== 0 &&
                                e.discussion_id !== arr[i - 1].discussion_id)
                            ) {
                              return (
                                <Nav variant="pills" className="flex-column">
                                  <Nav.Item className="topic-nav-item">
                                    <OverlayTrigger
                                      key="top"
                                      placement="top"
                                      overlay={
                                        <Tooltip id={`tooltip-top`}>
                                          {e.topic}
                                        </Tooltip>
                                      }
                                    >
                                      <Nav.Link eventKey={e.discussion_id}>
                                        <p>
                                          <span>
                                            <i className="far fa-comments"></i>{" "}
                                          </span>
                                          {e.topic}
                                        </p>
                                      </Nav.Link>
                                    </OverlayTrigger>
                                  </Nav.Item>
                                </Nav>
                              );
                            } else return; 
                          })}
                          <Nav.Item>
                            {
                              <NewDiscussionModal
                                type="topic"
                                userEmail={userEmail}
                                lessonId={lessonInfo.lesson_id}
                                token={token}
                                setThreads={setThreads}
                              />
                            }
                            {/* <Button onClick={handleNewTopic}>
                              新增討論主題
                            </Button> */}
                          </Nav.Item>
                        </Col>
                        <Col sm={9}>
                          <Tab.Content className="thread-container">
                            {threads.map((e, i, arr) => (
                              <Tab.Pane eventKey={e.discussion_id}>
                                <div className="thread">
                                  <Card>
                                    <Card.Body>
                                      <blockquote className="blockquote mb-0">
                                        <p>{e.thread_content}</p>

                                        <p className="username">{e.username}</p>
                                        {i === 0 ||
                                        arr[i - 1].discussion_id !==
                                          e.discussion_id ? (
                                          <>
                                            {
                                              <NewDiscussionModal
                                                type="reply"
                                                discussionId={e.discussion_id}
                                                userEmail={userEmail}
                                                lessonId={lessonInfo.lesson_id}
                                                token={token}
                                                setThreads={setThreads}
                                              />
                                            }
                                            {/* <Button
                                              onClick={handleNewReply}
                                              value={e.discussion_id}
                                            >
                                              新增回覆
                                            </Button> */}
                                          </>
                                        ) : (
                                          <>{}</>
                                        )}
                                      </blockquote>
                                    </Card.Body>
                                  </Card>
                                </div>
                              </Tab.Pane>
                            ))}
                            {/* {threads.map((e, i, a) => (
                              <Tab.Pane eventKey={i}>
                                {a
                                  .filter(
                                    (e2) => e2.discussion_id === e.discussion_id
                                  )
                                  .map((e3) => (
                                    <div>
                                      <div>{e3.thread_content}</div>
                                      <div>{e3.username}</div>
                                    </div>
                                  ))}
                              </Tab.Pane>
                            ))} */}
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  )}
                </Tab>
                <Tab
                  eventKey="exercise"
                  title={
                    <>
                      問題練習 <i className="far fa-question-circle" />
                    </>
                  }
                >
                  {/* {console.log(userRight)} */}
                  {!userRight && (
                    <div className="purchase-first">
                      <div>請先購買此課堂</div>
                    </div>
                  )}
                  {userRight && (
                    <div className="exe-container">
                      <Form
                        className="lesson-exe"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        {questionAndAnswer.map((e, i, a) => {
                          if (
                            i === 0 ||
                            a[i - 1].question_id !== e.question_id
                          ) {
                            return (
                              <>
                                <Form.Label>{`${e.question}`} </Form.Label>
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
                                    } else return;
                                  })}
                                </Col>
                                {errors[e.question] && "請選擇答案"}
                              </>
                            );
                          } else return;
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
                    </div>
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
