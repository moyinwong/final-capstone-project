import React, { useEffect, useState } from 'react'
import './InstructorPage.scss'
import { Button, Jumbotron, Container, Row, Col, Accordion, Card, Image } from 'react-bootstrap'
import { Button as MButton} from '@material-ui/core'
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
    const userId = useSelector((state: IRootState) => state.auth.id);
    userEmail = useSelector((state: IRootState) => state.auth.email);
    const token = useSelector((state: IRootState) => state.auth.token);
    const [courses, setCourses] = useState<IPureCourse[]>([]);
    const [stripeStatus, setStripeStatus] = useState<boolean | null>(null)


    
    useEffect(() => {
        if(userEmail) {
            getAllCourseByTutor();
            getStripStatus();
        }
    }, [userEmail])

    const getAllCourseByTutor = async () => {
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

    const getStripStatus = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/check-stripe-account-status/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const result = await res.json();
        const stripeStatus = result.stripestatus;

        setStripeStatus(stripeStatus)
    }

    return (
        <Container >
            {stripeStatus === false && <MButton id="redirect-button" href={`/setting/${userId}`} size="large" color="primary" variant="contained">建立課程前，請先前往Stripe完成登記用戶</MButton> }

            {stripeStatus === true && 
                <>
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
                                        <LessonAccordion {...course} key={i}/>
                                    ))}
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>
                </>
            }

        </Container>

    )
}

export default InstructorPage
