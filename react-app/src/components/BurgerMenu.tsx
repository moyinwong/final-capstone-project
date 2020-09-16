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
      {categories.map((category, i) => {
        return (
          <div className="">
            <Link to={`/category/${category}`} key={i} id={category}>
              {category}
            </Link>
          </div>
        );
      })}
    </Menu>
  );
};

export default BurgerMenu;
