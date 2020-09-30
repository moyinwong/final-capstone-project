import React from "react";
//import { push } from "connected-react-router";
//import { useDispatch, useSelector } from "react-redux";

import CarouselReact from "../components/CarouselReact";
//import BurgerMenu from "../components/BurgerMenu";
//import { IRootState } from "../redux/store";
//import { logout } from "../redux/auth/actions";
//import Header from "../components/Header";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Homepage.scss";
import { useEffect } from "react";
//import DropdownMenu from "../components/DropdownMenu";

const HomePage: React.FC = () => {
  // const test = async () => {
  //   let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/test`);
  //   let result = await res.json();
  //   console.log(result);
  // };

  useEffect(() => {
    document.title = "e-ducate";
    document.getElementById("website-header")!.style.display = "block";
  }, []);

  return (
    <div>
      <section className="body-section-intro">
        <Container>
          <Row className="justify-content-centers">
            <Col md={12} className="section-title">
              中學生線上學習平台
            </Col>
            <Col md={2}>
              <div></div>
            </Col>
            <Col md={8}>
              Educate是一個針對DSE而設的網上補習平台，
              透過融合科技和教育元素，讓同學足不出戶就能以十倍效率、一半時間、
              針對自己的學習需要極速進步，輕鬆應付DSE！(copy from afterschool
              remember to change!!!!!)
            </Col>
            <Col md={2}>
              <div></div>
            </Col>
          </Row>

          <Row className="section-cards">
            <Col>
              <div className="section-card">
                <div>
                  <img
                    className="section-icon"
                    src={require("./icons/clock.png")}
                  />
                </div>
                <div>
                  <h6>靈活學習</h6>
                  <div>按自己的節奏隨時隨地學習，靈活運用時間</div>
                </div>
              </div>
            </Col>

            <Col>
              <div className="section-card">
                <div>
                  <img
                    className="section-icon"
                    src={require("./icons/goal.png")}
                  />
                </div>
                <div>
                  <h6>多種課程</h6>
                  <div>多種不同課程助你擴闊知識，達到目標</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="section-card">
                <div>
                  <img
                    className="section-icon"
                    src={require("./icons/lectern.png")}
                  />
                </div>
                <div>
                  <h6>專業導師團隊</h6>
                  <div>嚴選導師，教學經驗豐富，教學生動易明</div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="section-card">
                <div>
                  <img
                    className="section-icon"
                    src={require("./icons/pencil-holder.png")}
                  />
                </div>
                <div>
                  <h6>學習效率</h6>
                  <div>隨時重溫課堂錄影及筆記，提高學習效率</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="courses-carousel">
        <CarouselReact type="popular" />
      </section>
      
      <div>
        <Image fluid src={require("./icons/tecky.png")} />
      </div>
      <section className="courses-carousel">
        <CarouselReact type="goodComment" />
      </section>
    </div>
  );
};

export default HomePage;
