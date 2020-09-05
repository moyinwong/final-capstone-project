import React from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(push("/login"))}>Login</button>
      <h1>This is HomePage</h1>
    </div>
  );
};

export default HomePage;
