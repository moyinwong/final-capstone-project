import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CoursePage.scss";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ICourse } from "./CategoryPage";
import { IRootState } from "../redux/store";
import Rating from "react-rating";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Accordion } from "react-bootstrap";

interface ILesson {
  course_id: number;
  course_name: string;
  tutor_id: number;
  lesson_id: number;
  lesson_name: string;
  lesson_description: string;
  is_trial: boolean;
  video_url: string;
  user_email?: string;
  comment?: string | null;
}

interface IComment {
  user_name: string;
  comment: string;
  rated_score: string;
}

const CoursePage: React.FC = () => {
  const param: { courseName: string } = useParams();
  const { courseName } = param;
  const [course, setCourse] = useState<ICourse>();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userEmail = useSelector((state: IRootState) => state.auth.email);
  const [isAllowAccess, setIsAllowAccess] = useState<boolean | null>(null);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentsNum, setCommentsNum] = useState(3);
  const [isReady, setIsReady] = useState(false);

  //run once when init
  useEffect(() => {
    (async () => {
      const newCourse = await getAllCoursesByCategory(courseName);
      setCourse(newCourse);
      document.title = ` ${newCourse.course_name}`;
    })();
    return () => {
      document.title = "e-ducate";
    };
  }, []);

  //run once when init
  useEffect(() => {
    if (course) getLessonInfoByCourse(course.course_name);
    if (course) getCommentsByCourse(course.course_name);
  }, [course, userEmail]);

  const getAllCoursesByCategory = async (courseName: string) => {
    console.log(courseName);
    let queryRoute: string = "/course/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${courseName}`
    );

    //if no such course
    if (
      fetchRes.status === 500 ||
      fetchRes.status === 401 ||
      fetchRes.status === 400
    ) {
      dispatch(push("/404"));
    }

    const result = await fetchRes.json();
    const course: ICourse = result.course;
    console.log(course);
    return course;
    //console.log(course);
  };

  const getUserRight = async (userEmail: string, courseName: string) => {
    let queryRoute: string = "/user/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${userEmail}/${courseName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { is_allow } = await fetchRes.json();
    if (is_allow) setIsAllowAccess(is_allow);
  };

  function shuffle(array: Array<any>) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const getLessonInfoByCourse = async (courseName: string) => {
    console.log("user: ", userEmail);
    let queryRoute: string = "/lesson/summary/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${courseName}/${
        userEmail ? userEmail : ""
      }`
    );
    console.log(fetchRes);
    const result = await fetchRes.json();
    console.log(result);
    if (result.lessons[0].user_email) {
      setIsAllowAccess(true);
    } else {
      setIsAllowAccess(false);
    }
    result.lessons.sort((a: ILesson, b: ILesson) => a.lesson_id - b.lesson_id);
    setLessons(result.lessons);
  };

  const getCommentsByCourse = async (courseName: string) => {
    let queryRoute: string = "/course/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${courseName}/comment`
    );
    const result = await fetchRes.json();
    const resultArr = result.comments;
    const shuffleArr = shuffle(resultArr);
    setComments(result.comments);
    setIsReady(true);
  };
  //handle order button click
  //function handleOrderButtonClick(event: React.MouseEvent<HTMLButtonElement>) {}
  return (
    <>
      {isReady && course && lessons.length > 0 && (
        <>
          <div className="course-top-background">
            <div>
              <div className="responsive-container" style={{ display: "none" }}>
                <img
                  src={
                    course.image.match(/http/)
                      ? course.image
                      : `localhost:8080/${course.image}`
                  }
                />
                <div>HK$ {course.price}</div>
                <div>
                  {isAllowAccess ? (
                    <div>
                      <Button variant="success" disabled>
                        已購買
                      </Button>
                      {lessons[0].comment ? (
                        <Button variant="success" disabled>
                          已評價
                        </Button>
                      ) : (
                        <Button variant="success">評價</Button>
                      )}
                    </div>
                  ) : (
                    <>
                      <Button variant="success">加到購物車</Button>
                      <Button variant="outline-danger">立即購買</Button>
                    </>
                  )}
                </div>
              </div>
              <div className="course-info-container">
                <div className="course-name">{course.course_name}</div>
                <div className="course-objective">{course.objective}</div>
                <div className="course-rating">
                  <span>
                    {course.rated_score ? parseFloat(course.rated_score) : 0}
                  </span>
                  {
                    <Rating
                      stop={5}
                      emptySymbol={[
                        "far fa-star fa-2x",
                        "far fa-star fa-2x",
                        "far fa-star fa-2x",
                        "far fa-star fa-2x",
                        "far fa-star fa-2x",
                      ]}
                      fullSymbol={[
                        "fas fa-star fa-2x",
                        "fas fa-star fa-2x",
                        "fas fa-star fa-2x",
                        "fas fa-star fa-2x",
                        "fas fa-star fa-2x",
                      ]}
                      readonly={true}
                      initialRating={
                        course.rated_score ? parseFloat(course.rated_score) : 0
                      }
                    />
                  }
                  ({course.rated_num})
                </div>
                <div className="course-student-num">
                  學生人數： {course?.purchased_users_num}
                </div>
                <div className="tutor-name">導師： {course.tutor_name}</div>
              </div>
              <Card className="sticky">
                <Card.Img
                  variant="top"
                  src={
                    course.image.match(/http/)
                      ? course.image
                      : `localhost:8080/${course.image}`
                  }
                />
                <Card.Body>
                  <Card.Title>{"HK$ " + course.price}</Card.Title>
                  <div>
                    {isAllowAccess ? (
                      <>
                        <Button variant="success" disabled>
                          已購買
                        </Button>
                        {lessons[0].comment ? (
                          <Button variant="success" disabled>
                            已評價
                          </Button>
                        ) : (
                          <Button variant="success">評價</Button>
                        )}
                      </>
                    ) : (
                      <>
                        <Button variant="success">加到購物車</Button>
                        <Button variant="outline-danger">立即購買</Button>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="course-bottom-background">
            <div>
              <div className="bottom-info-container">
                <div className="course-description">
                  <p className="sub-title">課程簡介：</p>
                  {course.course_description}
                </div>
                <div className="lesson-container">
                  <p className="sub-title">課程內容：</p>
                  {console.log("lessons: ", lessons)}
                  {lessons.map((e, i) => {
                    return (
                      <Accordion key={i}>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey="0"
                            >
                              {i + 1 + ". " + e.lesson_name}
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body>
                              <div>{e.lesson_description}</div>
                              {e.user_email ? (
                                <Button
                                  variant="success"
                                  onClick={() => {
                                    dispatch(
                                      push(
                                        `/course/${courseName}/lesson/${e.lesson_name}`
                                      )
                                    );
                                  }}
                                >
                                  前往該課堂
                                </Button>
                              ) : e.is_trial ? (
                                <Button
                                  variant="success"
                                  onClick={() => {
                                    dispatch(
                                      push(
                                        `/course/${courseName}/lesson/${e.lesson_name}`
                                      )
                                    );
                                  }}
                                >
                                  可免費試堂
                                </Button>
                              ) : (
                                ""
                              )}
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    );
                  })}
                </div>
                <div className="comment-container">
                  <div className="comment-title-container">
                    <div>
                      <p className="sub-title">學生反映</p>
                    </div>
                    <div
                      className="expand"
                      onClick={() => {
                        setCommentsNum(20);
                      }}
                    >
                      <p>更多反映...</p>
                    </div>
                  </div>

                  {comments
                    .map((e, i) => {
                      return (
                        <div key={i}>
                          <Card>
                            <Card.Header>{e.rated_score}</Card.Header>
                            <Card.Body>
                              <blockquote className="blockquote mb-0">
                                <p>{e.comment}</p>
                                <footer className="blockquote-footer">
                                  {e.user_name}
                                </footer>
                              </blockquote>
                            </Card.Body>
                          </Card>
                        </div>
                      );
                    })
                    .slice(0, commentsNum)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CoursePage;
