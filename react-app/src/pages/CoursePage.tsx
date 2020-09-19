import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CoursePage.scss";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ICourse } from "./CategoryPage";
import { IRootState } from "../redux/store";

const CoursePage: React.FC = () => {
  const param: { courseName: string } = useParams();
  const { courseName } = param;
  const [course, setCourse] = useState<ICourse>();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userEmail = useSelector((state: IRootState) => state.auth.email);
  const [isAllowAccess, setIsAllowAccess] = useState<boolean>(false);

  //run once when init
  useEffect(() => {
    getAllCoursesByCategory(courseName);
  }, []);

  //fetch userRight after fetch course info
  useEffect(() => {
    if (course && userEmail) getUserRight(userEmail, course.course_name);
  }, [course, userEmail]);

  const getAllCoursesByCategory = async (courseName: string) => {
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

    const { course } = await fetchRes.json();
    setCourse(course);
    console.log(course);
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
    if (is_allow) setIsAllowAccess(isAllowAccess);
  };

  //handle order button click
  function handleOrderButtonClick(event: React.MouseEvent<HTMLButtonElement>) {}
  return (
    <div className="course-top-background">
      <div className="course-info-container">
        <div className="course-name"></div>
        <div className="course-objective"></div>
        <div className="course-rating"></div>
        <div className="course-student-num"></div>
        <div className="tutor-name"></div>
      </div>
    </div>
  );
};

export default CoursePage;
