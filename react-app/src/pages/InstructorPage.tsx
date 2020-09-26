import React, { useEffect, useState } from 'react'
import './InstructorPage.scss'
import { Button, Jumbotron, Container, Row, Col, Accordion, Card, Image } from 'react-bootstrap'
import { IRootState } from '../redux/store'
import SingleCard from '../components/SingleCard'
import { useSelector } from 'react-redux'
import { ILesson } from './CoursePage'

interface IPureCourse {
    id: number;
    name: string;
    price: string;
    image: string;
    category_id: number;
    subcategory_id: number | null;
    tutor_id: number;
    description: string;
    objective: string;
    prerequisites: string;
    created_at: Date;
    updated_at: Date;
}

const InstructorPage = () => {
    let userEmail: undefined | null | string = undefined;
    userEmail = useSelector((state: IRootState) => state.auth.email);
    const [courses, setCourses] = useState<IPureCourse[]>([]);
    const [lessons, setLessons] = useState<ILesson[]>([]);
    
    useEffect(() => {
        if(userEmail) {
            getAllCourseByTutor(userEmail);

        }
    }, [userEmail])

    const getAllCourseByTutor = async (userEmail: string | null | undefined) => {
        let queryRoute: string = '/course/all'
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${queryRoute}/${userEmail}`)
        const result = await res.json();
        const { courses } = result;

        const orderedCourses = courses.slice();
        orderedCourses.sort(
            (a: IPureCourse, b: IPureCourse) =>
            b.id -  a.id
        )
        setCourses(orderedCourses);
    }

    const getLessonInfoByCourse = async (courseName: string) => {
        //console.log("user: ", userEmail);
        let queryRoute: string = "/lesson/summary/";
        const fetchRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${courseName}`
        );
    
        if (fetchRes.status === 401) {
            return;
        }
        const result = await fetchRes.json();
        

        result.lessons.sort((a: ILesson, b: ILesson) => a.lesson_id - b.lesson_id);
        // setLessons(result.lessons);
    };
 
    {courses.map((course) => getLessonInfoByCourse(course.name))};
    console.log(lessons);

    return (
        <Container >
            <Row className="justify-content-md-center">
                <Col xs={12} className="course-creator-container">
                    {/* <div className="course-creator-container"> */}
                        {/* <div className="course-creation-panel"> */}
                            <span className="panel-title"><i className="fas fa-book"></i>立刻創建你的課程</span> 
                            <p>
                                <Button href="/instructor/course/creation" 
                                className="course-creation-button" variant="success">建立課程</Button>
                            </p>
                        {/* </div> */}
                    {/* </div> */}
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={12} className="course-creator-container">
                    {/* <div className="course-creator-container"> */}
                        {/* <div className="course-creation-panel"> */}
                            <span className="panel-title"><i className="fas fa-pencil-ruler"></i>為你的課程建立課堂</span> 
        
                            <Accordion>
                                {courses.map((course, i) => (
                                    <Card>
                                        <Card.Header className="accordion-card-title">你的課程</Card.Header>
                                        <Accordion.Toggle as={Card.Header} eventKey={`${i}`}>
                                            {course.image.match(/http/) ? <Image src={course.image} fluid></Image> : 
                                            <Image src={`http://localhost:8080/img/${course.image}`} fluid />
                                            }
                                            {course.name}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={`${i}`}>
                                            <Card.Body>
                                                <Button href={`/instructor/lesson/creation/${course.name}`} 
                                                className="course-creation-button" variant="success">增加課堂</Button>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                ))}
                            </Accordion>
                            
                        {/* </div> */}
                    {/* </div> */}
                </Col>
            </Row>

        </Container>

    )
}

export default InstructorPage
