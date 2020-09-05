import React, { useEffect } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

const NotFound = () => {
  const dispatch = useDispatch();

  //redirect to Home Page
  useEffect(() => {
    setTimeout(() => {
      dispatch(push("/"));
    }, 3000);
  });

  return (
    <div>
      <h1>404 Not Found, Redirecting to the Home Page....</h1>
    </div>
  );
};

export default NotFound;
