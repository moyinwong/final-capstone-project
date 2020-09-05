import { slide as Menu } from "react-burger-menu";
import React from "react";
import "./BurgerMenu.scss";
import { Link } from "react-router-dom";

const BurgerMenu: React.FC = () => {
  const showSettings = (event: any) => {
    event.preventDefault();
  };

  return (
    <Menu>
      <Link to={"/"} id="home" className="menu-item">
        Home
      </Link>
      <Link to={"/login"} id="Login" className="menu-item">
        Login
      </Link>

      <a onClick={showSettings} className="menu-item--small" href="">
        Settings
      </a>
    </Menu>
  );
};

export default BurgerMenu;
