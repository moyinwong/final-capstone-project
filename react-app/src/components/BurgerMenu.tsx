import { slide as Menu } from "react-burger-menu";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DarkModeSwitch from "./DarkModeSwitch";
import { useDispatch, useSelector } from "react-redux";

import { Navbar, Button, FormControl, Form } from "react-bootstrap";
import { IRootState } from "../redux/store";
import { push } from "connected-react-router";
import DropdownMenu from "./DropdownMenu";
import SearchIcon from '@material-ui/icons/Search';
import "./BurgerMenu.scss";


const BurgerMenu: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  const userEmail = useSelector((state: IRootState) => state.auth.email);
  const userImage = useSelector((state: IRootState) => state.auth.image);

  const currentLocation = useLocation();

  useEffect(() => {
    const pageClickEvent = (e:any) => {
      setOpen(!open)
    }

    if(open) {
      (document.querySelector(".user-dropdown-menu") as HTMLElement).style.right = '20px';
      window.addEventListener('click', pageClickEvent)
    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [open])
  
  const handleSearch = async (event: any) => {
    event.preventDefault();
    let searchText = (document.getElementById('search-bar')! as HTMLInputElement).value
    if (searchText.length === 0) {
      return;
    } 

    dispatch(push(`/search/${searchText}`))
  }

  const categories: string[] = [
    "中文",
    "英文",
    "數學",
    "通識",
    "物理",
    "化學",
    "生物",
    "經濟",
    "歷史",
    "企會財",
    "ICT",
    "視覺藝術",
    "M1",
    "M2",
  ];

  return (
    <Menu>
      {isAuthenticated ? (
        <div className="user-info">
          <div className="user-icon-container">
            <button className="user-icon" onClick={() => setOpen(!open)}>
              {userImage ? <img src={`${process.env.REACT_APP_BACKEND_IMAGE}/${userImage}`} /> 
              : <i className="far fa-user"></i>}
            </button>
            {open && <DropdownMenu />}
          </div>
          <Navbar.Text>歡迎，{userEmail}</Navbar.Text>{" "}
        </div>
      ) : (
        <Button
          variant="success"
          onClick={() => {
            setOpen(false);
            dispatch(push("/login", currentLocation));
          }}
          className="bm-login-button"
        >
          登入
        </Button>
      )}

      <Form inline>
        <FormControl
          type="text"
          className="mr-sm-2"
          id="search-bar"
        />
        <Button className="search-button" onClick={handleSearch} type="submit" variant="outline-success"><SearchIcon /></Button>
      </Form>

      <DarkModeSwitch />
      {categories.map((category, i) => {
        return (
          <div className="" key={"BM" + i}>
            <Link to={`/category/${category}`} id={category}>
              {category}
            </Link>
          </div>
        );
      })}
      <div className="bm-item dropdown" key="s">
        <button className="dropbtn">其他</button>
        <span className="dropdown-caret"></span>
        <div className="dropdown-content">
          <Link to="/category/others/編程" key="s1">
            編程
          </Link>
          <Link to="/category/others/廚藝" key="s2">
            廚藝
          </Link>
          <Link to="/category/others/DIY" key="s3">
            DIY
          </Link>
          <Link to="/category/others/美容" key="s4">
            美容
          </Link>
        </div>
      </div>
    </Menu>
  );
};

export default BurgerMenu;
