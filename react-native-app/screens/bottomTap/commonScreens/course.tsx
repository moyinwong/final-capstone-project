// React, React Native
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';

// Navigation
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

// Components
import Stars from '../../../sharedComponents/stars';

// Icons
import { Octicons } from '@expo/vector-icons';

// Styles
import globalStyles from '../../../styles/globalStyles';
import courseStyles from '../../../styles/courseStyles';

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
        <ScrollView
            style={globalStyles.container}
            showsVerticalScrollIndicator={false}
        >

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
                    <View style={courseStyles.courseButtonContainer}>
                        <TouchableOpacity
                            style={courseStyles.courseButton}
                            onPress={() => console.log('add to cart')}
                        >
                            <Text style={courseStyles.courseButtonText}>加到購物車</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...courseStyles.courseButton, ...courseStyles.courseBuyButton }}
                            onPress={() => console.log('buy')}
                        >
                            <Text style={{ ...courseStyles.courseButtonText, ...courseStyles.courseBuyButtonText }}>立即購買</Text>
                        </TouchableOpacity>
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
                </View>
                <View style={{ marginLeft: 40 }}>
                    <TouchableOpacity
                        style={courseStyles.tutorCheckButton}
                        onPress={() => console.log(courseInfo.tutor_name)}
                    // onPress={() => navigation.navigate('TutorInfo', {
                    //     tutor: tutorsTestData('all')[0]
                    // })}
                    >
                        <Text style={courseStyles.tutorCheckButtonText}>查看導師</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <View>
                    <Text style={courseStyles.infoTitle}>課程簡介:</Text>
                </View>
                <View style={courseStyles.infoBox}>
                    <Text style={courseStyles.infoText}>{courseInfo.course_description}</Text>
                </View>
            </View>

            <View>
                <View>
                    <Text style={courseStyles.infoTitle}>課程內容:</Text>
                </View>
                <View style={courseStyles.infoBox}>
                    {
                        lessonsInfo.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item.lesson_id.toString()}
                                    onPress={() => navigation.navigate('Lesson', { lesson: item.lesson_id })}
                                >
                                    <Text style={courseStyles.infoText}>{item.lesson_name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View>

                </View>
            </View>

            <View>
                <View>
                    <Text style={courseStyles.infoTitle}>學生反映:</Text>
                </View>
                <View style={courseStyles.infoBox}>
                    {
                        comments.map((item) => {
                            return (
                                <View
                                    style={courseStyles.commentBox}
                                    key={item.comment}
                                >
                                    <Text style={courseStyles.infoText}>{item.comment}</Text>
                                    <View style={courseStyles.infoComment}>
                                        <View style={{ marginRight: 16 }}>
                                            <Stars score={item.rated_score} />
                                        </View>
                                        <Octicons name="dash" size={16} color="#666666" />
                                        <Text style={{ ...courseStyles.infoText, ...courseStyles.infoCommentUser }}>{item.user_name}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>

        </ScrollView >
    )
}
