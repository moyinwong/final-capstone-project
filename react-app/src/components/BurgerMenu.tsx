import { slide as Menu } from "react-burger-menu";
import React from "react";
import "./BurgerMenu.scss";
import { Link } from "react-router-dom";

const BurgerMenu: React.FC = () => {
  // const showSettings = (event: any) => {
  //   event.preventDefault();
  // };

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
    "其他",
  ];

  return (
    <Menu>
      {categories.map((e, i) => {
        return (
          <Link to={`/category/${e}`} key={i} id={e} className="menu-item">
            {e}
          </Link>
        );
      })}
    </Menu>
  );
};

export default BurgerMenu;
