import React, { useState, useEffect, ReactNode } from "react";
import { ICourse } from "../pages/CategoryPage";
import { Container, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarouselReact.scss";
import { Alert } from "react-bootstrap";
import SingleCard from "./SingleCard";

const CarouselReact: React.FC<{
  children?: ReactNode;
  type: string;
}> = (props: { type: string }) => {
  const [type] = useState(props.type);
  const [typeTopic, setTypeTopic] = useState<string>("");
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  //const [slides, setSlides] = useState<number[]>([1, 2, 3, 4]);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const getCourses = async (type: string) => {
    let res;
    //console.log("type", type);
    if (type === "popular") {
      setTypeTopic("最熱門課程");
      res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/course/popular`);
    } else if (type === "goodComment") {
      setTypeTopic("最受好評課程");
      res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/course/good-comment`
      );
    } else {
      res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/all`);
    }

    if (res.status === 500) {
      setAlertMsg("伺服器發生問題");
      setIsShowAlert(true);
      return;
    }

    let result = await res.json();
    const { courses } = result;
    const orderedCourses = courses.slice();
    // orderedCourses.sort(
    //   (a: ICourse, b: ICourse) =>
    //     parseInt(b.purchased_users_num) - parseInt(a.purchased_users_num)
    // );

    setCourses(orderedCourses);
    //console.log(result);
  };

  useEffect(() => {
    getCourses(type);
  }, [type]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplaySpeed: 3000,
    // autoplay: true,

    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 725,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {isShowAlert && (
        <Alert key="info" variant="warning" className="warning-alert">
          {alertMsg}
        </Alert>
      )}

      <Container>
        <div className="section-title">{typeTopic}</div>

        <Slider {...settings}>
          {courses.map((course, i) => (
            <React.Fragment key={i}>
              <Col>
                <SingleCard {...course} />
              </Col>
            </React.Fragment>
          ))}
        </Slider>
      </Container>
    </>
  );
};

export default CarouselReact;
