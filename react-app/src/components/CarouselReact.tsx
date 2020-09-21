import React, { useState, useEffect } from "react";
import { ICourse } from "../pages/CategoryPage";
import FlattedCard from "./FlattedCard";
import CarouselCard from "./CarouselCard";
import { Container, Col, Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CarouselReact.scss'



const CarouselReact: React.FC = () => {
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  const [slides, setSlides] = useState<number[]>([1, 2, 3, 4]);
  
  const getCourses = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/中文`)

    let result = await res.json();
    const { courses } = result;
    const orderedCourses = courses.slice();
    orderedCourses.sort(
      (a: ICourse, b: ICourse) =>
        parseInt(b.purchased_users_num) - parseInt(a.purchased_users_num)
    )
    
    setCourses(orderedCourses);
    console.log(result);
  }

  useEffect(() => {
    getCourses();
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
      <Container>
        <h2>Dynamic slides</h2>
        {/* <button className="button" onClick={this.click}>
          Click to change slide count
        </button> */}
        <Slider {...settings}>
          {courses.map((course, i) => 
            <React.Fragment>
              <Link to={`/course/${course.course_name}`}>
                <Col>
                  <Card>
                    <Card.Img variant="top" src={`${course.image}`}></Card.Img>
                    <Card.Body>
                      <span>{course.course_name}</span>
                    </Card.Body>
                  </Card>
                </Col>
              </Link>
            </React.Fragment>
          )}
          
        {/* {slides.map((slide) => <div key={slide}><h3>{slide}</h3></div>)} */}
        </Slider>
      </Container>
  );
};

export default CarouselReact;
