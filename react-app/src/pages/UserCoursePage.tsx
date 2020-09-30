import React, { useEffect, useState } from 'react';
import { IRootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Card, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './UserCoursePage.scss';

interface IUserCourse {
    category_id: number;
    course_id: number;
    image: string;
    course_name: string;
    description: string;
    objective: string;
    prerequisites: string;
    subcategory_id: null | number;
    tutor_email: string;
    tutor_introduction: string;
    tutor_name: string;
    tutor_title: string; 
  }


const UserCoursePage = () => {
    const token = localStorage.getItem("token");
    const userId = useSelector((state: IRootState) => state.auth.id)
    const [courses, setCourses] = useState<IUserCourse[]>([])

    useEffect(() => {
        if(userId) {
            getAllCourse(userId)
        }
    }, [userId])

    let getAllCourse = async (userId: number) => {
        let queryRoute = "user/course-detail/all";
        let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${queryRoute}/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        let result = await res.json();
        let courses:IUserCourse[] = result.courses
        setCourses(courses);
    }

    return (
        <div>
            <Container>
                <Row>
                    {courses.map((course:IUserCourse, index) => (
                        <Card id="carousel-card">
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
                                    <div>
                                        {course.description}
                                    </div>
                                </Card.Body>
                        </Card>
                    ))}

                </Row>
            </Container>
        </div>
    )
}

export default UserCoursePage
