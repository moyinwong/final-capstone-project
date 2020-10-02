import React, { useState, useEffect } from 'react';
import { IPureCourse } from './InstructorPage';
import { useParams } from 'react-router-dom';
import { ICourse } from './CategoryPage';
import SingleCard from '../components/SingleCard';
import './TutorCoursePage.scss';

interface ITutorInfo {
    id: number;
    name: string;
    image: string;
    linkedin: string | null;
    email: string;
    title: string;
    introduction: string;
}

const TutorCoursePage = () => {
    const param: { tutorEmail: string } = useParams();
    const tutorEmail = param.tutorEmail;

    const [courses, setCourses] = useState<ICourse[]>([]);
    const [tutorInfo, setTutorInfo] = useState<ITutorInfo | null>(null);

    
    useEffect(() => {
        if(tutorEmail) {
            getAllCourseByTutor(tutorEmail);
            getTutorInfo();
        }
    }, [tutorEmail])

    const getTutorInfo = async () => {
        let queryRoute = '/course/tutor/info'
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${queryRoute}/${tutorEmail}`)
        const result = await res.json();
        const tutorInfo = result.tutorInfo;
        setTutorInfo(tutorInfo)
    }

    const getAllCourseByTutor = async (userEmail: string | null | undefined) => {
        let queryRoute = '/course/tutor'
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
        <div>
            <div className="course-section-title-container">
                {/* <div className="course-section-title-div">
                    <div className="course-section-title">導師</div>
                </div> */}
                <div className="tutor-info-section">
                    <div className="tutor-name">{tutorInfo?.name}</div>
                    <div className="tutor-title">{tutorInfo?.title}</div>
                    <div className="tutor-intro">關於我</div>
                    <div className="tutor-intro">{tutorInfo?.introduction}</div>
                </div>
                <div>
                    {tutorInfo?.image.match(/http/) ? (
                        <img className="tutor-image" src={tutorInfo.image}></img>
                    ) : (<img className="tutor-image" src={`http://localhost:8080/img/${tutorInfo?.image}`}></img>)}
                    <div>{tutorInfo?.linkedin}</div>
                </div>
            </div>
                <h1>我教授的課程 ({courses.length})</h1>
            <div className="course-card-container">
                {courses.map((course, index) => (
                    <div className="course-card">
                        <SingleCard {...course} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TutorCoursePage
