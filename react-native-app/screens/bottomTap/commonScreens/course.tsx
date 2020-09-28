// React, React Native
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

// Navigation
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

// Icons
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Stars from '../../../sharedComponents/stars';

// Styles
import globalStyles from '../../../styles/globalStyles';
import courseStyles from '../../../styles/courseStyles';

// Functions
import showSubscribeBox from '../../../functions/showSubscribeBox';

// Data
import envData from '../../../data/env';

export default function Courses() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Param
    let courseName = "course"

    if (route.params) {
        courseName = route.params.courseName;
    }

    // Course Info
    // State
    const [courseInfo, setCourseInfo] = useState(
        courseName
    );

    // Fetch
    async function getCourseInfo(courseName: string) {
        try {
            let queryRoute: string = "/course/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${courseName}`
            );

            //if no such category
            if (fetchRes.status === 500) {
                throw new Error("伺服器發生問題");
                //dispatch(push("/404"));
                //return;
            }

            const result = await fetchRes.json();
            setCourseInfo(result.course);
        } catch (err) {
            console.log(err);
        }
    }

    // Lesson Info
    // State
    const [lessonsInfo, setLessonsInfo] = useState(
        []
    );

    // Fetch
    async function getLessonsInfo(courseName: string) {
        try {
            let queryRoute: string = "/lesson/summary/";

            console.log(courseName);
            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${courseName}`
            );

            //if no such category
            if (fetchRes.status === 500) {
                throw new Error("伺服器發生問題");
                //dispatch(push("/404"));
                //return;
            }

            const result = await fetchRes.json();
            setLessonsInfo(result.lessons);
        } catch (err) {
            console.log(err);
        }
    }

    // Comments
    // State
    const [comments, setComments] = useState(
        []
    );

    // Fetch
    async function getComments(courseName: string) {
        try {
            let queryRoute: string = "/course/";

            console.log(courseName);
            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${courseName}/comment`
            );

            //if no such category
            if (fetchRes.status === 500) {
                throw new Error("伺服器發生問題");
                //dispatch(push("/404"));
                //return;
            }

            const result = await fetchRes.json();
            setComments(result.comments);
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getCourseInfo(courseName);
            getLessonsInfo(courseName);
            getComments(courseName);
        }, [courseName])
    );

    // Dummy Data
    const isSubscribed = false;

    return (
        <View style={globalStyles.container}>

            <View
                style={courseStyles.courseBox}
            >
                <View style={courseStyles.coursePicContainer}>
                    <Image
                        style={courseStyles.coursePic}
                        resizeMode='cover'
                        source={{ uri: courseInfo.image }}
                    />
                </View>
                <View style={courseStyles.courseInfoContainer}>
                    <Text style={courseStyles.courseTitle}>{courseInfo.course_name}</Text>
                    <Text style={courseStyles.courseInfoText}>{courseInfo.objective}</Text>
                    <Text style={courseStyles.courseInfoText}>{'學生人數: ' + courseInfo.purchased_users_num}</Text>

                    <View style={courseStyles.courseScoreContainer}>
                        <Text style={courseStyles.courseInfoText}>{"評分: "}</Text>

                        <Stars score={courseInfo.rated_score} />

                    </View>
                </View>
            </View>

            <View style={courseStyles.tutorBox}>
                <View style={courseStyles.tutorPicContainer}>
                    <Image
                        style={courseStyles.tutorPic}
                        resizeMode='cover'
                        source={{ uri: courseInfo.image }}
                    />
                </View>
                <View>
                    <Text style={courseStyles.tutorName}>{courseInfo.tutor_name}</Text>
                    <View style={courseStyles.tutorSubscribedBox}>
                        <Text style={courseStyles.tutorNumOfSubscribedText}>訂閱數: 100</Text>
                    </View>
                </View>
                <View style={{ marginLeft: 40 }}>
                    {isSubscribed ? (
                        <View style={courseStyles.tutorSubscribedBox}>
                            <MaterialIcons name="done" size={26} color="#22c736" />
                            <Text style={courseStyles.tutorSubscribedText}>已訂閱</Text>
                        </View>
                    ) : (
                            <TouchableOpacity
                                style={courseStyles.tutorSubscribeButton}
                                onPress={() => showSubscribeBox()}
                            >
                                <Text style={courseStyles.tutorSubscribeButtonText}>訂閱</Text>
                            </TouchableOpacity>
                        )}
                </View>
            </View>

            <View>
                <Text>{'課程簡介: ' + courseInfo.course_description}</Text>
            </View>

            <View>
                <View>
                    <Text>課程內容:</Text>
                </View>
                <FlatList
                    keyExtractor={(item) => item.lesson_id.toString()}
                    data={lessonsInfo}
                    showsVerticalScrollIndicator={false}

                    ListFooterComponent={
                        <View>
                        </View>
                    }

                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Lesson', { lesson: item.lesson_id })}
                        >
                            <Text>{item.lesson_name}</Text>
                        </TouchableOpacity>
                    )}
                />
                <View>

                </View>
            </View>

            <View>
                <View>
                    <Text>學生反映:</Text>
                </View>
                <FlatList
                    keyExtractor={(item) => item.comment}
                    data={comments}
                    showsVerticalScrollIndicator={false}

                    ListFooterComponent={
                        <View>
                        </View>
                    }

                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.comment}</Text>
                            <Text>{item.user_name}</Text>
                            <View>
                                <Stars score={item.rated_score} />
                            </View>
                        </View>
                    )}
                />
            </View>

        </View>
    )
}
