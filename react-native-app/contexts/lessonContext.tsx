// React, React Native
import React, { createContext, useState } from 'react';

// Data
import envData from '../data/env';

export const LessonContext = createContext();

const LessonContextProvider = (props: any) => {

    // Null variable
    const list = '';

    const [lessonName, setLessonName] = useState(list);

    const setLesson = (lesson: string) => {
        setLessonName(lesson);
        getQuestionsAnswers(lesson)
    };

    // Exercise
    const [questionsAnswers, setQuestionsAnswers] = useState(
        []
    );

    const [filteredQuestions, setFilteredQuestions] = useState(
        []
    );

    const getQuestionsAnswers = async (lesson: string) => {
        try {
            let queryRoute: string = "/lesson/question/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${lesson}`
            );

            const result = await fetchRes.json();

            let tempResult = result.questionAndAnswer
            for (let item of tempResult) {
                item.isSelected = false;
            }
            setQuestionsAnswers(tempResult);

            const seenQuestionsArray = new Set();
            const filteredQuestionsArray = result.questionAndAnswer.filter(item => {
                const duplicate = seenQuestionsArray.has(item.question_id);
                seenQuestionsArray.add(item.question_id);
                return !duplicate
            })

            setFilteredQuestions(filteredQuestionsArray);
        } catch (err) {
            console.log(err);
        }
    }

    const saveAnswer = (question_id: number, answer_id: number) => {
        let tempAnswers = questionsAnswers;
        for (let item of tempAnswers) {
            if (item.question_id == question_id) {
                item.isSelected = false;
            }
            if (item.answer_id == answer_id) {
                item.isSelected = true;
            }
        }
        setQuestionsAnswers(tempAnswers);

        const seenQuestionsArray = new Set();
        const filteredQuestionsArray = tempAnswers.filter(item => {
            const duplicate = seenQuestionsArray.has(item.question_id);
            seenQuestionsArray.add(item.question_id);
            return !duplicate
        })

        setFilteredQuestions(filteredQuestionsArray);
    }

    return (
        <LessonContext.Provider value={{
            // Set Lesson
            lessonName, setLesson,
            // Exercise
            questionsAnswers, filteredQuestions, saveAnswer
        }}>
            { props.children}
        </LessonContext.Provider>
    )
}

export default LessonContextProvider;
