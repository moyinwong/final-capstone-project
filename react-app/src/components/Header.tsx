import React, { useState } from "react";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { logout } from "../redux/auth/actions";
import { push } from "connected-react-router";
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import BurgerMenu from "./BurgerMenu";
import Linkbar from "./Linkbar";
import DarkModeSwitch from "./DarkModeSwitch";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  const userEmail = useSelector((state: IRootState) => state.auth.email);

  return (
    <div>
      <div className="burger-menu">
        <BurgerMenu />
      </div>
      <div className="web-navbar">
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="/">
            <img className="website-logo" src={require("../logo.png")} />
          </Navbar.Brand>
          {/* <div className='blank-space'>{' '}</div> */}
          <div className="mr-auto search-bar">
            <Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-primary">Search</Button>
              </Form>
              <DarkModeSwitch />
            </Nav>
          </div>

          {isAuthenticated ? (
            <div className="user-info">
              <Navbar.Text>Welcome back {userEmail}</Navbar.Text>{" "}
              <Button
                variant="success"
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logout());
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="success"
              onClick={() => {
                dispatch(push("/login"));
              }}
            >
              Login
            </Button>
          )}
        </Navbar>
      </div>
      <div className="linkbar">
        <Linkbar />
      </div>
    </div>
    // <div className="header">

    // <img className="website-logo" src={require('../logo.png')}/>
    //     {isAuthenticated ? (
    //         <>
    //             <div>Welcome back {userEmail}</div>
    //             <button onClick={() => {
    //                 localStorage.removeItem('token')
    //                 dispatch(logout())
    //             }}>Logout</button>
    //         </>
    //     ) : (
    //         <button onClick={() => dispatch(push('/login'))}></button>
    //     )}
    // </div>
  );
};

export default Header;
