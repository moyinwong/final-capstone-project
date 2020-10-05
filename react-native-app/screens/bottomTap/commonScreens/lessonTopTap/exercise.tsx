// React, React Native
import React, { useContext } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';

// Context
import { LessonContext } from '../../../../contexts/lessonContext';

// Styles
import globalStyles from '../../../../styles/globalStyles';
import exerciseStyles from '../../../../styles/exerciseStyles';

export default function Exercise(props: { navigation: { goBack: () => void; }; }) {

    // Context
    const { questionsAnswers, filteredQuestions, saveAnswer } = useContext(LessonContext);

    return (
        <View style={globalStyles.container}>
            {filteredQuestions[0] ? (
                filteredQuestions.map(questionItem => {
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
                })
            ) : (
                    <View style={exerciseStyles.titleContainer}>
                        <Text style={exerciseStyles.title}>暫未有練習</Text>
                    </View>
                )}

            {filteredQuestions[0] && (
                <View style={exerciseStyles.submitButtonContainer}>
                    <TouchableOpacity
                        style={exerciseStyles.submitButton}
                        onPress={() => console.log('提交')}
                    >
                        <Text style={exerciseStyles.submitButtonText}>提交</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}
