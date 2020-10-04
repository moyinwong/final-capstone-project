// React, React Native
import React, { useState, useCallback, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
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

export default function Exercise(props: { navigation: { goBack: () => void; }; }) {

    // Context
    const { lessonName } = useContext(LessonContext);

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

    useFocusEffect(
        useCallback(() => {
            getQuestionsAnswers(lesson);
        }, [lesson])
    );

    function saveAnswer(question_id: number, answer_id: number) {
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
                                <Pressable
                                    key={answerItem.answer_id}
                                    style={exerciseStyles.answerBox}
                                    onPress={() => saveAnswer(questionItem.question_id, answerItem.answer_id)}
                                >
                                    {answerItem.isSelected ? (
                                        <View style={exerciseStyles.selectedBox}>
                                            <Text style={{ ...exerciseStyles.answerText, color: '#ffffff' }}>{answerItem.answer_body}</Text>
                                        </View>
                                    ) : (
                                            <View style={exerciseStyles.nonSelectedBox}>
                                                <Text style={exerciseStyles.answerText}>{answerItem.answer_body}</Text>
                                            </View>
                                        )}
                                </Pressable>
                            )
                        })}
                    </View>
                )
            })}
        </View>
    )
}
