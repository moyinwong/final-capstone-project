import React, { useState, useEffect } from "react";
import { ICourse } from "../pages/CategoryPage";
import { Container, Col, Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CarouselReact.scss'
import Rating from "react-rating";



const CarouselReact: React.FC = () => {
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  const [slides, setSlides] = useState<number[]>([1, 2, 3, 4]);
  
  const getCourses = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/all`)

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
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 725,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
      <Container>
        <div className="section-title">熱門課程</div>
        {/* <button className="button" onClick={this.click}>
          Click to change slide count
        </button> */}
        <Slider {...settings}>
          {courses.map((course, i) => 
            <React.Fragment key={i}>
                <Col>
                  {/* <Card>
                    <Card.Img variant="top" src={`${course.image}`}></Card.Img>
                    <Card.Body>
                    <span>{course.course_name}</span>
                    </Card.Body>
                  </Card> */}
                  <Card>
                    <Link to={`/course/${course.course_name}`}>
                      <Card.Img variant="top" src={course.image} />
                    </Link>
                    <Card.Body className="carousel-card-body">
                      <div className="carousel-card-title">{course.course_name}</div>
                      <div className="carousel-card-teacher">{course.tutor_name}</div>
                      <div className="rating">
                        <span className="decimal">
                          {parseFloat(course.rated_score ? course.rated_score : "0").toFixed(
                            2
                          )}
                        </span>
                        <Rating
                          stop={5}
                          emptySymbol={[
                            "far fa-star fa-2x",
                            "far fa-star fa-2x",
                            "far fa-star fa-2x",
                            "far fa-star fa-2x",
                            "far fa-star fa-2x",
                          ]}
                          fullSymbol={[
                            "fas fa-star fa-2x",
                            "fas fa-star fa-2x",
                            "fas fa-star fa-2x",
                            "fas fa-star fa-2x",
                            "fas fa-star fa-2x",
                          ]}
                          readonly={true}
                          initialRating={parseFloat(
                            course.rated_score ? course.rated_score : "0"
                          )}
                        />
                        <span>({course.rated_num})</span>
                      </div>
                      <div>HK${course.price}</div>
                    </Card.Body>
                  </Card>
                </Col>
            </React.Fragment>
          )}
   
        {/* {slides.map((slide) => <div key={slide}><h3>{slide}</h3></div>)} */}
        </Slider>
      </Container>
  );
};

export default CarouselReact;
