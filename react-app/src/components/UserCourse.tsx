import React, { useEffect, useState } from 'react';
import './UserCourse.scss'
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IUserCourse } from '../pages/UserCoursePage';
import { IRootState } from '../redux/store';
import { useSelector } from 'react-redux';

const UserCourse = (course:IUserCourse) => {
    const userId = useSelector((state: IRootState) => state.auth.id);
    const [allLessons, setAllLessons] = useState<number | null>(null);
    const [userCompletedLessons, setUserCompletedLessons] = useState<number | null>(null);
    const [progress, setProgress] = useState<number>(0);
    
    const getAllLessons = async () => {
        let queryRoute = '/course/all/lessons'
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${queryRoute}/${course.course_id}`)
        const result = await res.json()
        let lesson = result.lessons;
        let lessonNum: number = lesson.lesson_num;
        setAllLessons(lessonNum);
    }

    const getCompletedLesson = async () => {
        let queryRoute = '/course/completion'
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}${queryRoute}?courseId=${course.course_id}&userId=${userId}`
        )
        const result = await res.json();
        
        if (res.status !== 200) {
          console.log('line: 267: something is wrong when checking completed lessons')
        } else {
          //an array of completed lessons id
          let lessonIdArray = result.completedLessonId;
          let userCompletedLength: number = lessonIdArray.length;
          setUserCompletedLessons(userCompletedLength);
        }
    }

    const getProgress = () => {
        let progress: number = 0;
        if (userCompletedLessons === 0) {
            progress = 0
        }
        if (userCompletedLessons && allLessons) {
            progress = (userCompletedLessons / allLessons) * 100
        }
        setProgress(progress)
    }

    useEffect(() => {
        (async () => {
            await getAllLessons();
            await getCompletedLesson();
            await getProgress();
        })()
    }, [getCompletedLesson])

    // useEffect(() => {
    //     getAllLessons()
    // }, [])

    // useEffect(() => {
    //     if (!userId) {
    //         return;
    //     }
    //     getCompletedLesson()
    // }, [allLessons])

    // useEffect(() => {
    //     if (userCompletedLessons === null) {
    //         return;
    //     }
    //     getProgress()
    // }, [userCompletedLessons])


    return (
        <div>
            <Card id="user-courses-card">
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
                    <Card.Footer>
                        <ProgressBar variant="success" now={progress} label={`${Math.ceil(progress)}%`}/>
                    </Card.Footer>
            </Card>
        </div>
    )
}

export default UserCourse
