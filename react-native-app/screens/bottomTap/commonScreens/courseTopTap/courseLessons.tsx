// React, React Native
import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Context
import { UserContext } from '../../../../contexts/userContext';
import { CourseContext } from '../../../../contexts/courseContext';
import { LessonContext } from '../../../../contexts/lessonContext';

// Styles
import globalStyles from '../../../../styles/globalStyles';
import courseLessonsStyles from '../../../../styles/courseLessonsStyles';

// Data
import envData from '../../../../data/env';

export default function Courses() {

    // Context
    const { user } = useContext(UserContext);
    const { courseName } = useContext(CourseContext);
    const { setLesson } = useContext(LessonContext);

    // Hooks
    const navigation = useNavigation();

    // Lesson Info
    // State
    const [lessonsInfo, setLessonsInfo] = useState(
        []
    );

    // Access Right
    const [accessRight, setAccessRight] = useState(
        false
    );

    // Fetch
    async function getLessonsInfo(courseName: string) {
        try {
            let queryRoute: string = "/lesson/summary/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${courseName}/${user.email}`
            );

            const result = await fetchRes.json();
            setLessonsInfo(result.lessons);

            if (result.lessons[0].user_email) {
                setAccessRight(true);
            };
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLessonsInfo(courseName);
        }, [courseName])
    );

    function goToLesson(lesson_name: string, is_trial: boolean) {
        if (accessRight) {
            setLesson(lesson_name);
            navigation.navigate('Lesson',
                { lesson: lesson_name }
            )
        } else if (is_trial) {
            setLesson(lesson_name);
            navigation.navigate('Trial',
                { lesson: lesson_name }
            )
        } else {
            Alert.alert(
                "無法觀看",
                "請先購買此課程",
                [
                    {
                        text: "取消",
                        onPress: () => console.log("取消"),
                        style: "cancel"
                    }
                ],
                { cancelable: true }
            )
        }
    }

    return (
        <View style={globalStyles.container}>

            <FlatList
                keyExtractor={(item) => item.lesson_id.toString()}
                data={lessonsInfo}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}

                ListHeaderComponent={
                    <TouchableOpacity
                        style={courseLessonsStyles.goBackButton}
                        onPress={() => navigation.pop()
                        }
                    >
                        <Text style={courseLessonsStyles.goBackText}>返回</Text>
                    </TouchableOpacity>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={courseLessonsStyles.lessonBox}
                        onPress={() => goToLesson(item.lesson_name, item.is_trial)}
                    >
                        <Text style={(item.is_trial && !accessRight) ? courseLessonsStyles.lessonText : courseLessonsStyles.lessonTextMargin}>{item.lesson_name}</Text>
                        {
                            (item.is_trial && !accessRight) &&
                            <View style={courseLessonsStyles.trialTextContainer}>
                                <Text style={courseLessonsStyles.trialText}>可免費試堂</Text>
                            </View>
                        }
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
