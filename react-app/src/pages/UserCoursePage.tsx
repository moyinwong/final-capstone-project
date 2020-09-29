import React, { useEffect, useState } from 'react';
import './UserCoursePage.scss';
import { IRootState } from '../redux/store';
import { useSelector } from 'react-redux';

interface IUserCourse {
    category_id: number;
    course_id: number;
    course_image: string;
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
            {courses.map((course:IUserCourse, index) => <div>{course.course_name}</div>)}
        </div>
    )
}

export default UserCoursePage
