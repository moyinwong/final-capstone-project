// React, React Native
import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Pressable } from 'react-native';

// Navigation
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

// Context
import { CartContext } from '../../../contexts/cartContext';
import { LessonContext } from '../../../contexts/lessonContext';

// Components
import Stars from '../../../sharedComponents/stars';

// Icons
import { Octicons, MaterialIcons } from '@expo/vector-icons';

// Styles
import globalStyles from '../../../styles/globalStyles';
import courseStyles from '../../../styles/courseStyles';

// Data
import envData from '../../../data/env';

export default function Courses() {

    // Context
    const { addCartList, setCartList, setCartSum } = useContext(CartContext);
    const { setLesson } = useContext(LessonContext);

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
        []
    );

    // Fetch
    async function getCourseInfo(courseName: string) {
        try {
            let queryRoute: string = "/course/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${courseName}`
            );

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

            const result = await fetchRes.json();
            setComments(result.comments);
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getCourseInfo(courseName);
            getLessonsInfo(courseName);
            getComments(courseName);
        }, [courseName])
    );

    function goToLesson(lesson_name: string) {
        setLesson(lesson_name);

        navigation.navigate('Lesson',
            { lesson: lesson_name }
        )
    }

    function buyCourse(course: any) {
        setCartList([courseInfo]);
        setCartSum(courseInfo.price);
        navigation.navigate('StripeForm');
    }

    // Render
    // State
    const [showLessons, setShowLessons] = useState(
        true
    );

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

                        <Text style={{ ...courseStyles.courseInfoText, fontSize: 16 }}>{" (" + courseInfo.rated_num + ")"}</Text>
                    </View>
                    {/* sdsdgdsgsdgvsgbsdgbsrbhsbhsrbhsrrs */}
                    {true && <Text style={courseStyles.coursePrice}>{'價錢: $' + courseInfo.price}</Text>}

                    {/* sdsdgdsgsdgvsgbsdgbsrbhsbhsrbhsrrs */}
                    {true ? (
                        <View style={courseStyles.courseButtonContainer}>
                            <TouchableOpacity
                                style={courseStyles.courseButton}
                                onPress={() => addCartList(courseInfo)}
                            >
                                <Text style={courseStyles.courseButtonText}>加到購物車</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...courseStyles.courseButton, ...courseStyles.courseBuyButton }}
                                onPress={() => buyCourse(courseInfo)}
                            >
                                <Text style={courseStyles.courseButtonText}>立即購買</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                            <View style={courseStyles.courseButtonContainer}>
                                <View style={courseStyles.purchasedBox}>
                                    <MaterialIcons name="done" size={26} color="#22c736" />
                                    <Text style={courseStyles.purchasedBoxText}>已購買</Text>
                                </View>
                            </View>
                        )}

                </View>
            </View>

            <View style={courseStyles.tutorBox}>
                <View style={courseStyles.tutorPicContainer}>
                    <Image
                        style={courseStyles.tutorPic}
                        resizeMode='cover'
                        source={{ uri: `${envData.REACT_APP_BACKEND_FILE_URL}/img/${courseInfo.tutor_image}` }}
                    />
                </View>
                <View>
                    <Text style={courseStyles.tutorName}>{courseInfo.tutor_name}</Text>
                </View>
                <View style={{ marginLeft: 40 }}>
                    <TouchableOpacity
                        style={courseStyles.tutorCheckButton}
                        onPress={() => navigation.navigate('TutorInfo', {
                            tutor: courseInfo.tutor_email
                        })}
                    >
                        <Text style={courseStyles.tutorCheckButtonText}>查看導師</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <View style={courseStyles.titleContainer}>
                    <Pressable
                        style={courseStyles.titleSubContainer}
                        onPress={() => setShowLessons(true)}
                    >
                        <Text
                            style={showLessons ? (courseStyles.activeInfoTitle) : (courseStyles.inActiveInfoTitle)}
                        >
                            課程內容
                        </Text>
                    </Pressable>
                    <Pressable
                        style={courseStyles.titleSubContainer}
                        onPress={() => setShowLessons(false)}
                    >
                        <Text
                            style={showLessons ? (courseStyles.inActiveInfoTitle) : (courseStyles.activeInfoTitle)}
                        >
                            學生反映
                        </Text>
                    </Pressable>
                </View>

                {showLessons ? (
                    <FlatList
                        style={courseStyles.infoBox}
                        keyExtractor={(item) => item.lesson_id.toString()}
                        data={lessonsInfo}
                        scrollEnabled={false}

                        ListHeaderComponent={
                            <Text style={courseStyles.DescriptionText}>{'簡介: ' + courseInfo.course_description}</Text>
                        }

                        ItemSeparatorComponent={() => (
                            <View style={courseStyles.separator}></View>
                        )}

                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={courseStyles.lessonBox}
                                onPress={() => goToLesson(item.lesson_name)}
                            >
                                <Text style={courseStyles.lessonText}>{item.lesson_name}</Text>
                                {item.is_trial &&
                                    <View style={courseStyles.trialTextContainer}>
                                        <Text style={courseStyles.trialText}>可免費試堂</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                        <FlatList
                            style={courseStyles.infoBox}
                            keyExtractor={(item) => { item.user_name }}
                            data={comments}
                            scrollEnabled={false}

                            ItemSeparatorComponent={() => (
                                <View style={courseStyles.separator}></View>
                            )}

                            renderItem={({ item }) => (
                                <View
                                    style={courseStyles.commentBox}
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
                            )}
                        />
                    )}

            </View>

        </ScrollView >
    )
}
