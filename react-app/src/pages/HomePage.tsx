import React from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import NavBar from "../components/NavBar";
import Responsive from "../components/Responsive";
import BurgerMenu from "../components/BurgerMenu";

const HomePage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      {/* <NavBar></NavBar> */}
      <BurgerMenu></BurgerMenu>
      <button onClick={() => dispatch(push("/login"))}>Login</button>
      <h1>This is HomePage</h1>
      <Responsive></Responsive>
      {/* <img src={`http://localhost:8080${"/img/test-1.png"}`} /> */}
    </div>
  );
};

export default HomePage;
