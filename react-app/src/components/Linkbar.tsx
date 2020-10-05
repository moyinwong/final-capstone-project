import React from "react";
import "./Linkbar.scss";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Linkbar = () => {

  return (
    <div className="navigation-bar">
      <Navbar bg="dark" variant="dark">
        <Nav className="mx-auto">
          {[
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
          ].map((category, i) => 
              <Link to={`/category/${category}`} key={`cat_${i}`} id={category}>
                {category}
              </Link>
          )}
          {/* <Link to={`/category/中文`} key={`cat_ee`} id='English'>中文</Link> */}
          <NavDropdown title="其他" id="basic-nav-dropdown">
            <NavDropdown.Item href="/category/others/編程" key="o1">
              <Link className="dropdown-item-link" to="/category/others/編程">
                編程
              </Link>
            </NavDropdown.Item>

            <NavDropdown.Item href="/category/others/廚藝" key="o2">
              <Link className="dropdown-item-link" to="/category/others/廚藝">
                廚藝
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/others/DIY" key="o3">
              <Link className="dropdown-item-link" to="/category/others/DIY">
                DIY
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/others/美容" key="o4">
              <Link className="dropdown-item-link" to="/category/others/美容">
                美容
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Linkbar;
