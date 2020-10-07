// React, React Native
import React, { createContext, useState } from 'react';

export const CourseContext = createContext();

const CourseContextProvider = (props: any) => {

    const [courseName, setCourseName] = useState(
        'handmade_bike_central.onepkg'
    );

    return (
        <CourseContext.Provider value={{ courseName, setCourseName }}>
            { props.children}
        </CourseContext.Provider>
    )
}

export default CourseContextProvider;
