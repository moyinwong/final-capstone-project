import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import "./CoursePage.scss";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

function CoursePage() {
  const param: { courseName: string } = useParams();

  const { courseName } = param;

  const dispatch = useDispatch();
  //run once when init
  useEffect(() => {
    getAllCoursesByCategory();
  }, []);

  const getAllCoursesByCategory = async () => {
    let queryRoute: string = "/course/";

    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${courseName}`
    );

    //if no such category
    if (fetchRes.status === 500) {
      dispatch(push("/404"));
    }

    const result = await fetchRes.json();
  };

  //handle order button click
  function handleOrderButtonClick(event: React.MouseEvent<HTMLButtonElement>) {}
  return <div className="course-top-background"></div>;
}

export default CoursePage;
