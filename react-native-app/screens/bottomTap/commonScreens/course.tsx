// React, React Native
import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Pressable, Alert } from 'react-native';

// Navigation
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

// Context
import { UserContext } from '../../../contexts/userContext';
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
    const { user } = useContext(UserContext);
    const { cartList, addCartList, setCartList, setCartSum, storeCartList, storeCartSum, setCartNum } = useContext(CartContext);
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
    const [courseScore, setCourseScore] = useState(
        0
    );

    // Fetch
    async function getCourseInfo(courseName: string) {
        try {
            let queryRoute: string = "/course/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${courseName}`
            );

            const result = await fetchRes.json();
            checkDuplicate(result.course.id);
            setCourseInfo(result.course);
            setCourseScore(result.course.rated_score);
        } catch (err) {
            console.log(err);
        }
    }

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

    // Check in Cart List?
    // State
    const [inCartList, setInCartList] = useState(
        false
    );

    function checkDuplicate(courseId: number) {
        for (let item of cartList) {
            if (courseId == item.id) {
                setInCartList(true);
                return
            }
        }
        setInCartList(false);
    }

    useFocusEffect(
        useCallback(() => {
            getCourseInfo(courseName);
            getLessonsInfo(courseName);
            getComments(courseName);
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

    function buyCourse(course: any) {
        setInCartList(true);
        setCartList([courseInfo]);
        setCartSum(courseInfo.price);
        storeCartList([courseInfo]);
        storeCartSum(courseInfo.price);
        setCartNum(1);
        navigation.navigate('StripeForm');
    }

    function addCourseToList(course: any) {
        addCartList(course);
        setInCartList(true);
    }

    // Render
    // State
    const [showLessons, setShowLessons] = useState(
        true
    );

    return (
        <View style={{ ...globalStyles.container, paddingHorizontal: 0 }}>

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

                        {courseScore != 0 && (
                            <Stars score={courseScore} />
                        )}

                        <Text style={{ ...courseStyles.courseInfoText, fontSize: 16 }}>{" (" + courseInfo.rated_num + ")"}</Text>
                    </View>
                    <Text style={courseStyles.coursePrice}>{'價錢: $' + courseInfo.price}</Text>

                    {!accessRight ? (
                        <View style={courseStyles.courseButtonContainer}>
                            {inCartList ? (
                                <View style={courseStyles.courseAddedButton}>
                                    <MaterialIcons name="done" size={26} color="#22c736" />
                                    <Text style={courseStyles.courseAddedButtonText}>已在購物車</Text>
                                </View>
                            ) : (
                                    <TouchableOpacity
                                        style={courseStyles.courseButton}
                                        onPress={() => addCourseToList(courseInfo)}
                                    >
                                        <Text style={courseStyles.courseButtonText}>加到購物車</Text>
                                    </TouchableOpacity>
                                )}

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
                        showsVerticalScrollIndicator={false}

                        ListHeaderComponent={
                            <Text style={courseStyles.DescriptionText}>{'簡介: ' + courseInfo.course_description}</Text>
                        }

                        ItemSeparatorComponent={() => (
                            <View style={courseStyles.separator}></View>
                        )}

                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={courseStyles.lessonBox}
                                onPress={() => goToLesson(item.lesson_name, item.is_trial)}
                            >
                                <Text style={courseStyles.lessonText}>{item.lesson_name}</Text>
                                {accessRight ? (
                                    <View style={courseStyles.trialTextContainer}>
                                        <Text style={courseStyles.trialText}>前往課堂</Text>
                                    </View>
                                ) : (
                                        item.is_trial &&
                                        <View style={courseStyles.trialTextContainer}>
                                            <Text style={courseStyles.trialText}>可免費試堂</Text>
                                        </View>
                                    )}
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                        <FlatList
                            style={courseStyles.infoBox}
                            keyExtractor={(item) => item.user_id.toString().concat(item.comment)}
                            data={comments}
                            showsVerticalScrollIndicator={false}

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

        </View >
    )
}
