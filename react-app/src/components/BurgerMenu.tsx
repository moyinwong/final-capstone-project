import { slide as Menu } from "react-burger-menu";
import React from "react";
import "./BurgerMenu.scss";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { switchDarkMode } from "../redux/dark/actions";

const BurgerMenu: React.FC = () => {
  const isDarkMode: Boolean | undefined = useSelector(
    (state: IRootState) => state.dark.mode
  );
  // const showSettings = (event: any) => {
  //   event.preventDefault();
  // };

  const dispatch = useDispatch();

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
      <Form>
        <Form.Check
          type="switch"
          id="dark-mode-switch"
          label="黑夜模式"
          onClick={() => {
            dispatch(switchDarkMode(!isDarkMode));
          }}
          checked={isDarkMode as any}
        />
      </Form>
      {categories.map((category, i) => {
        return (
          <div className="">
            <Link to={`/category/${category}`} key={i} id={category}>
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
