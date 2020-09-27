import React, { useEffect, useState } from 'react'
import './InstructorPage.scss'
import { Button, Jumbotron, Container, Row, Col, Accordion, Card, Image } from 'react-bootstrap'
import { IRootState } from '../redux/store'
import { useSelector } from 'react-redux'
import LessonAccordion from '../components/LessonAccordion'

export interface IPureCourse {
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

    return (
        <Container >
            <Row className="justify-content-md-center">
                <Col xs={12} className="course-creator-container">
                    <span className="panel-title"><i className="fas fa-book"></i>立刻創建你的課程</span> 
                    <p>
                        <Button href="/instructor/course/creation" 
                        className="course-creation-button" variant="success">建立課程</Button>
                    </p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={12} className="course-creator-container">
                    <span className="panel-title"><i className="fas fa-pencil-ruler"></i>為你的課程建立課堂</span> 

                    <Accordion>
                        <Card>
                            <Card.Header className="accordion-card-title">你的課程</Card.Header>
                            {courses.map((course, i) => (
                                <>
                                    <LessonAccordion key={i} {...course}/>
                                </>
                            ))}
                        </Card>
                    </Accordion>
                </Col>
            </Row>

        </Container>

    )
}

export default InstructorPage
