import React, { useState, useEffect } from 'react'
import './LessonAccordion.scss'
import { Accordion, Image, Card, Button } from 'react-bootstrap'
import { IPureCourse } from '../pages/InstructorPage'
import { useParams, Link } from 'react-router-dom'
import { ILesson } from '../pages/CoursePage'

const LessonAccordion = (course: IPureCourse) => {
    const [lessons, setLessons] = useState<ILesson[]>([]);
    
    useEffect(() => {
        getLessonInfoByCourse(course.name)
    }, [])

    const getLessonInfoByCourse = async (courseName: string) => {
        //console.log("user: ", userEmail);
        let queryRoute: string = "/lesson/summary/";
        const fetchRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${courseName}`
        );
    
        if (fetchRes.status === 401) {
            setLessons([])
        } else {
            const result = await fetchRes.json();
    
            result.lessons.sort((a: ILesson, b: ILesson) => a.lesson_id - b.lesson_id);
            setLessons(result.lessons);
        }

      };
      
    return (
        <>
            <Accordion.Toggle as={Card.Header} eventKey={`${course.id}`}>
                {course.image.match(/http/) ? <Image src={course.image} fluid></Image> : 
                <Image src={`http://localhost:8080/img/${course.image}`} fluid />
                }
                <div className="accordion-course-name">{course.name}</div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${course.id}`}>
                <Card.Body>
                    {lessons.length === 0 && <div>未有堂喎，快啲加返啦</div>}
                    {lessons.map((lesson, i) => 
                    <div key={i}>
                        {i + 1}: {lesson.lesson_name}
                        <Link to={`/instructor/lesson/question/${lesson.lesson_name}`}><Button>增加課堂問題</Button></Link>
                    </div>)}
                    <Link to={`/instructor/lesson/creation/${course.name}`}><Button className="course-creation-button" variant="success">增加課堂</Button></Link>
                </Card.Body>
            </Accordion.Collapse>
        </>
    )
}

export default LessonAccordion
