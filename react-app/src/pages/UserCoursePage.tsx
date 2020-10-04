import React, { useEffect, useState } from 'react';
import { IRootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import './UserCoursePage.scss';
import UserCourse from '../components/UserCourse';

export interface IUserCourse {
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
        console.log(courses);
    }

    useEffect(() => {
        if(userId) {
            getAllCourse(userId)
        }
    }, [userId])

    return (
        <div>
            <div className="course-section-title-container">
                <div className="course-section-title-div">
                    <div className="course-section-title">我的課程</div>
                </div>
            </div>

            <Container id="user-courses-container">
                <Row id="user-courses-row">
                    {courses.map((course:IUserCourse, index) => (
                        <UserCourse {...course} key={index}/>
                    ))}

                </Row>
            </Container>
        </div>
    )
}

export default UserCoursePage
