import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CarouselReact.scss'
import { ICourse } from "../pages/CategoryPage";
import FlattedCard from "./FlattedCard";
import CarouselCard from "./CarouselCard";
import { Container, Col, Card, Button, Row } from "react-bootstrap";


const CarouselReact: React.FC = () => {
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  const [slides, setSlides] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  
  const getCourses = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/中文`)

    let result = await res.json();
    const { courses } = result;
    const orderedCourses = courses.slice();
    orderedCourses.sort(
      (a: ICourse, b: ICourse) =>
        parseInt(b.purchased_users_num) - parseInt(a.purchased_users_num)
    )

    setCourses(orderedCourses)
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
          <Row>
            <Col>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </Col>
          </Row>
          {/* {courses.map((course, i) => <div><FlattedCard key={i} {...course} /></div>)} */}
        </Slider>
      </Container>
  );
};

export default CarouselReact;
