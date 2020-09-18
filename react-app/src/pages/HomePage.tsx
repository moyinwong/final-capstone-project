import React from "react";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

import Responsive from "../components/Responsive";
import BurgerMenu from "../components/BurgerMenu";
import { IRootState } from "../redux/store";

const HomePage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  const userEmail = useSelector((state: IRootState) => state.auth.email);

  return (
    <div>
      {/* <NavBar></NavBar> */}
      <BurgerMenu />
      {isAuthenticated ? (
        <div> Welcome back {userEmail}</div>
      ) : (
        <button onClick={() => dispatch(push("/login"))}>Login</button>
      )}
      <h1>This is HomePage</h1>

      <Responsive />
      {/* <img src={`http://localhost:8080${"/img/test-1.png"}`} /> */}
    </div>
  );
};

export default HomePage;
