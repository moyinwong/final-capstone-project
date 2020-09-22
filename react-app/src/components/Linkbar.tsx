import React from "react";
import "./Linkbar.scss";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

const Linkbar = () => {
  const isDarkMode = useSelector((state: IRootState) => state.dark.mode);

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

  const darkMode = {
    color: 'dark'
  }

  return (
    <div>
      <Navbar bg='dark' variant="dark">
        <Nav className="mx-auto" >
          {categories.map((category, i) => {
            return (
              <Nav.Link href={`/category/${category}`} key={i} id={category}>
                {category}
              </Nav.Link>
            );
          })}
          <NavDropdown title="其他" id="basic-nav-dropdown">
            <NavDropdown.Item href="/category/others/編程" key="o1">
              編程
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/others/廚藝" key="o2">
              廚藝
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/others/DIY" key="o3">
              DIY
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/others/美容" key="o4">
              美容
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Linkbar;
