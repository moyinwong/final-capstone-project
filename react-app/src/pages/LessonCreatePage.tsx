import React, { useState } from 'react'
import './LessonCreatePage.scss'
import { useParams } from 'react-router-dom'
import { ILesson } from './CoursePage';

const LessonCreatePage = () => {
    const param: { courseName: string} = useParams();
    const { courseName } = param;
    const [lessons, setLessons] = useState<ILesson[]>([]);
    


    const getLessonInfoByCourse = async (courseName: string) => {
        //console.log("user: ", userEmail);
        let queryRoute: string = "/lesson/summary/";
        const fetchRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${courseName}`
        );
    
        if (fetchRes.status === 500) throw new Error("伺服器發生問題");
        const result = await fetchRes.json();
        console.log(result)

        result.lessons.sort((a: ILesson, b: ILesson) => a.lesson_id - b.lesson_id);
        setLessons(result.lessons);
      };


    return (
        <div>
            {/* {lessons.map((lesson) => {
                <div>{lesson.course_name}</div>
            })} */}
        </div>
    )
}

export default LessonCreatePage
