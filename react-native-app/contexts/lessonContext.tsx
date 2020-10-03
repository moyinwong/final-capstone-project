// React, React Native
import React, { createContext, useState } from 'react';

export const LessonContext = createContext();

const LessonContextProvider = (props: any) => {

    // Null variable
    const list = '';

    const [lessonName, setLessonName] = useState(list);

    const setLesson = (lesson: string) => {
        setLessonName(lesson);
    };

    return (
        <LessonContext.Provider value={{ lessonName, setLesson }}>
            { props.children}
        </LessonContext.Provider>
    )
}

export default LessonContextProvider;
