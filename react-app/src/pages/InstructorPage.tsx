import React from 'react'
import './InstructorPage.scss'
import { Button, Jumbotron, Container, Row, Col } from 'react-bootstrap'

const InstructorPage = () => {



    return (
        <Container >
            <Row className="justify-content-md-center">
                <Col xs={12} className="course-creator-container">
                    {/* <div className="course-creator-container"> */}
                        {/* <div className="course-creation-panel"> */}
                            <span className="panel-title"><i className="fas fa-book"></i>立刻創建你的課程</span> 
                            <p>
                                <Button href="/instructor/create" 
                                className="course-creation-button" variant="success">建立課程</Button>
                            </p>
                        {/* </div> */}
                    {/* </div> */}
                </Col>
            </Row>
        </Container>

    )
}

export default InstructorPage
