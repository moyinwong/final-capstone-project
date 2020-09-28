import React, { useState, useEffect, useRef } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import DropdownMenu from "./DropdownMenu";
import { Link, useLocation } from "react-router-dom";

const Header = (props: any) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  const userEmail = useSelector((state: IRootState) => state.auth.email);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLocation = useLocation();

  useEffect(() => {
    const pageClickEvent = (e:any) => {
      setOpen(!open)
    }

    if(open) {
      window.addEventListener('click', pageClickEvent)
    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [open])



  return (
    <div id="website-header">
      <div className="burger-menu">
        <BurgerMenu />
      </div>
      <div className="web-navbar">
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="/">
            <Link to="/">
              <img className="website-logo" src={require("../logo.png")} />
            </Link>
          </Navbar.Brand>
          {/* <div className='blank-space'>{' '}</div> */}
          <div
            className="icon-button responsive"
            onClick={() => {
              dispatch(push("/cart"));
            }}
          >
            <i className="fas fa-shopping-cart"></i>
          </div>
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
          {/* <div>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </div> */}
          {isAuthenticated ? (
            <div className="user-info-container">
              <div className="user-info" style={{ flexDirection: "column" }}>
                <div
                  className="user-icon-container"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div
                    className="icon-button"
                    onClick={() => {
                      dispatch(push("/cart"));
                    }}
                  >
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <button className="user-icon" onClick={() => setOpen(!open)}>
                    {/* <FontAwesomeIcon icon={faUser} size="1x"/> */}
                    <i className="far fa-user"></i>
                  </button>
                  {open && <div ref={dropdownRef}><DropdownMenu /></div>}
                </div>
                <Navbar.Text>歡迎，{userEmail}</Navbar.Text>{" "}
              </div>
            </div>
          ) : (
            <div className="user-info">
              <div
                className="icon-button"
                onClick={() => {
                  dispatch(push("/cart"));
                }}
              >
                <i className="fas fa-shopping-cart"></i>
              </div>
              <Button
                variant="success"
                onClick={() => {
                  setOpen(false);
                  dispatch(push("/login", currentLocation));
                }}
              >
                登入
              </Button>
            </div>
          )}
        </Navbar>
      </div>
      <div className="linkbar">
        <Linkbar />
      </div>
    </div>
  );
};

export default Header;
