// React, React Native
import React, { useState, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

// Context
import { LessonContext } from '../../../../contexts/lessonContext';

// Navigation
import { useFocusEffect } from '@react-navigation/native';

// Styles
import globalStyles from '../../../../styles/globalStyles';
import exerciseStyles from '../../../../styles/exerciseStyles';

// Data
import envData from '../../../../data/env';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';

export default function Exercise(props: { navigation: { goBack: () => void; }; }) {

    // Context
    const { lessonName } = useContext(LessonContext);

    // Hooks
    const isFocused = useIsFocused();

    // Lesson Files
    // State
    const [lesson, setLesson] = useState(
        'lesson'
    );

    const [questionsAnswers, setQuestionsAnswers] = useState(
        []
    );

    const [filteredQuestions, setFilteredQuestions] = useState(
        []
    );

    const [storedAnswers, setStoredAnswers] = useState(
        {}
    );

    // Fetch
    async function getQuestionsAnswers(lesson: string) {
        try {
            if (lessonName) {
                setLesson(lessonName);
            }

            let queryRoute: string = "/lesson/question/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${lesson}`
            );

            const result = await fetchRes.json();
            setQuestionsAnswers(result.questionAndAnswer);

            const seenQuestionsArray = new Set();
            const filteredQuestionsArray = result.questionAndAnswer.filter(item => {
                const duplicate = seenQuestionsArray.has(item.question_id);
                seenQuestionsArray.add(item.question_id);
                return !duplicate
            })

            console.log(filteredQuestionsArray);

            setFilteredQuestions(filteredQuestionsArray);
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getQuestionsAnswers(lesson);
        }, [lesson])
    );

    return (
        <View style={globalStyles.container}>
            {filteredQuestions.map(questionItem => {
                return (
                    <View
                        key={questionItem.question_id}
                        style={exerciseStyles.questionBox}
                    >
                        <View style={exerciseStyles.questionContainer}>
                            <Text style={exerciseStyles.questionText}>{questionItem.question}</Text>
                        </View>
                        {questionsAnswers.filter(item => (item.question_id === questionItem.question_id)).map(answerItem => {
                            return (
                                <TouchableOpacity
                                    key={answerItem.answer_id}
                                    style={exerciseStyles.answerBox}
                                    onPress={() => console.log(answerItem.answer_id)}
                                >
                                    <Text style={exerciseStyles.answerText}>{answerItem.answer_body}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                )
            })}
        </View>
    )
}
