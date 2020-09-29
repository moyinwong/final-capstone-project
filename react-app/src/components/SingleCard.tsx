import React from 'react'
import { Container, Col, Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { ICourse } from '../pages/CategoryPage';
import './SingleCard.scss'

const SingleCard = (course: ICourse) => {
    return (
        <Card>
                  <div className="carousel-card">
                    <Link to={`/course/${course.course_name}`}>
                      {course.image.match(/http/) ? (
                      <Card.Img variant="top" src={course.image} />
                      ) : <Card.Img id="carousel-card-img" variant="top" src={`http://localhost:8080/img/${course.image}`}/>}
                      
                    </Link>
                    <Card.Body className="carousel-card-body">
                      <div className="carousel-card-title">
                        {course.course_name}
                      </div>
                      <div className="carousel-card-teacher">
                        {course.tutor_name}
                      </div>
                      <div className="rating">
                        <span className="decimal">
                          {parseFloat(
                            course.rated_score ? course.rated_score : "0"
                          ).toFixed(2)}
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
                      <div className="carousel-card-price">
                        HK${course.price}
                      </div>
                    </Card.Body>
                  </div>
                </Card>
    )
}

export default SingleCard
