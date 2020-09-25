import React, { useEffect, useState } from 'react'
import './InstructorPage.scss'
import { Button, Jumbotron, Container, Row, Col, Accordion, Card } from 'react-bootstrap'
import { IRootState } from '../redux/store'
import SingleCard from '../components/SingleCard'
import { useSelector } from 'react-redux'
import { ICourse } from './CategoryPage'

const InstructorPage = () => {
    let userEmail: undefined | null | string = undefined;
    userEmail = useSelector((state: IRootState) => state.auth.email);
    const [courses, setCourses] = useState<ICourse[]>([]);

    useEffect(() => {
        if(userEmail) {
            getAllCourseByTutor(userEmail)
        }
    }, [userEmail])

    const getAllCourseByTutor = async (userEmail: string | null | undefined) => {
        let queryRoute: string = '/course/all'
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${queryRoute}/${userEmail}`)
        const result = await res.json();
        const { courses } = result;

        const orderedCourses = courses.slice();
        orderedCourses.sort(
            (a: ICourse, b: ICourse) =>
            b.id -  a.id
        )
        setCourses(orderedCourses);
    }

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
                                            {course.course_name}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={`${i}`}>
                                            <Card.Body>
                                                <Button href="/instructor/lesson/creation" 
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
