import React, { useState, useEffect, useRef } from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { push } from "connected-react-router";
import { Button, Navbar, Nav, Form, FormControl } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import BurgerMenu from "./BurgerMenu";
import Linkbar from "./Linkbar";
import DarkModeSwitch from "./DarkModeSwitch";
import "./Header.scss";
import DropdownMenu from "./DropdownMenu";
import { useLocation } from "react-router-dom";

const Header = (props: any) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  const userEmail = useSelector((state: IRootState) => state.auth.email);
  const userImage = useSelector((state: IRootState) => state.auth.image);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartCourses = useSelector((state: IRootState) => state.cart.courses);
  const cartCoursesNum = cartCourses.length;

  const currentLocation = useLocation();

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      setOpen(!open);
    };

    if (open) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [open]);

  const handleSearch = async (event: any) => {
    event.preventDefault();
    let searchText = (document.getElementById(
      "search-bar-normal"
    )! as HTMLInputElement).value;
    //console.log(searchText);
    if (searchText.length === 0) {
      return;
    }

    dispatch(push(`/search/${searchText}`));
  };

  return (
    <div id="website-header">
      <div className="burger-menu">
        <BurgerMenu />
      </div>
      <div className="web-navbar">
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="/">
            <img
              alt="website logo"
              className="website-logo"
              src={require("../logo.png")}
            />
          </Navbar.Brand>

          <button
            className="icon-button responsive"
            onClick={() => {
              dispatch(push("/cart"));
            }}
          >
            {cartCoursesNum !== 0 && (
              <div className="cart-course-num">{cartCoursesNum}</div>
            )}
            <i className="fas fa-shopping-cart"></i>
          </button>
          <div className="mr-auto ">
            <Nav>
              <Form inline>
                <FormControl
                  type="text"
                  className="mr-sm-2"
                  id="search-bar-normal"
                />
                <Button
                  className="search-button"
                  onClick={handleSearch}
                  type="submit"
                  variant="outline-success"
                >
                  <SearchIcon />
                </Button>
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
                  <button
                    className="icon-button"
                    onClick={() => {
                      dispatch(push("/cart"));
                    }}
                  >
                    {cartCoursesNum !== 0 && (
                      <div className="cart-course-num">{cartCoursesNum}</div>
                    )}
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                  <button className="user-icon" onClick={() => setOpen(!open)}>
                    {userImage ? userImage.match(/http/) ? (<img src={userImage} alt="user"/>
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_IMAGE}/${userImage}`}
                      />
                    ) : (
                      <i className="far fa-user"></i>
                    )}
                  </button>
                  {open && (
                    <div ref={dropdownRef}>
                      <DropdownMenu />
                    </div>
                  )}
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
                {cartCoursesNum !== 0 && (
                  <div className="cart-course-num">{cartCoursesNum}</div>
                )}
                <i className="fas fa-shopping-cart"></i>
              </div>
              <Button
                className="login-button"
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
