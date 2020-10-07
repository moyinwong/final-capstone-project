// React, React Native
import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Context
import { UserContext } from '../../../../contexts/userContext';
import { CartContext } from '../../../../contexts/cartContext';
import { CourseContext } from '../../../../contexts/courseContext';

// Components
import Stars from '../../../../sharedComponents/stars';

// Icons
import { MaterialIcons } from '@expo/vector-icons';

// Styles
import globalStyles from '../../../../styles/globalStyles';
import courseIntroStyles from '../../../../styles/courseIntroStyles';

// Data
import envData from '../../../../data/env';

export default function Courses() {

    // Context
    const { user } = useContext(UserContext);
    const { cartList, addCartList, setCartList, setCartSum, storeCartList, storeCartSum, setCartNum } = useContext(CartContext);
    const { courseName } = useContext(CourseContext);

    // Hooks
    const navigation = useNavigation();

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

    // Access Right
    // State
    const [accessRight, setAccessRight] = useState(
        false
    );

    // Fetch
    async function getAccessRight(courseName: string) {
        try {
            let queryRoute: string = "/lesson/summary/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${courseName}/${user.email}`
            );

            const result = await fetchRes.json();

            if (result.lessons[0].user_email) {
                setAccessRight(true);
            };
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
            getAccessRight(courseName);
        }, [courseName])
    );

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

    return (
        <View style={globalStyles.container}>

            <TouchableOpacity
                style={courseIntroStyles.goBackButton}
                onPress={() => navigation.pop()
                }
            >
                <Text style={courseIntroStyles.goBackText}>返回</Text>
            </TouchableOpacity>

            <View
                style={courseIntroStyles.courseBox}
            >
                <View style={courseIntroStyles.coursePicContainer}>
                    <Image
                        style={courseIntroStyles.coursePic}
                        resizeMode='cover'
                        source={{ uri: courseInfo.image }}
                    />
                </View>
                <View style={courseIntroStyles.courseInfoContainer}>
                    <Text style={courseIntroStyles.courseTitle}>{courseInfo.course_name}</Text>
                    <Text style={{ ...courseIntroStyles.courseInfoText, marginBottom: 9 }}>{courseInfo.objective}</Text>
                    <Text style={{ ...courseIntroStyles.courseInfoText, marginBottom: 9 }}>{courseInfo.course_description}</Text>
                    <Text style={courseIntroStyles.courseInfoText}>{'學生人數: ' + courseInfo.purchased_users_num}</Text>

                    <View style={courseIntroStyles.courseScoreContainer}>
                        <Text style={{ ...courseIntroStyles.courseInfoText, marginBottom: 9 }}>{"評分: "}</Text>

                        {courseScore != 0 && (
                            <Stars score={courseScore} />
                        )}

                        <Text style={{ ...courseIntroStyles.courseInfoText, fontSize: 16 }}>{" (" + courseInfo.rated_num + ")"}</Text>
                    </View>
                    {!accessRight && (
                        <Text style={courseIntroStyles.coursePrice}>{'價錢: $' + courseInfo.price}</Text>
                    )}

                    {!accessRight ? (
                        <View style={courseIntroStyles.courseButtonContainer}>
                            {inCartList ? (
                                <View style={courseIntroStyles.courseAddedButton}>
                                    <MaterialIcons name="done" size={26} color="#22c736" />
                                    <Text style={courseIntroStyles.courseAddedButtonText}>已在購物車</Text>
                                </View>
                            ) : (
                                    <TouchableOpacity
                                        style={courseIntroStyles.courseButton}
                                        onPress={() => addCourseToList(courseInfo)}
                                    >
                                        <Text style={courseIntroStyles.courseButtonText}>加到購物車</Text>
                                    </TouchableOpacity>
                                )}

                            <TouchableOpacity
                                style={{ ...courseIntroStyles.courseButton, ...courseIntroStyles.courseBuyButton }}
                                onPress={() => buyCourse(courseInfo)}
                            >
                                <Text style={courseIntroStyles.courseButtonText}>立即購買</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                            <View style={courseIntroStyles.courseButtonContainer}>
                                <View style={courseIntroStyles.purchasedBox}>
                                    <MaterialIcons name="done" size={26} color="#22c736" />
                                    <Text style={courseIntroStyles.purchasedBoxText}>已購買</Text>
                                </View>
                            </View>
                        )}

                </View>
            </View>

            <View style={courseIntroStyles.tutorBox}>
                <View style={courseIntroStyles.tutorPicContainer}>
                    <Image
                        style={courseIntroStyles.tutorPic}
                        resizeMode='cover'
                        source={{ uri: `${envData.REACT_APP_BACKEND_IMAGE}/${courseInfo.tutor_image}` }}
                    />
                </View>
                <View>
                    <Text style={courseIntroStyles.tutorName}>{courseInfo.tutor_name}</Text>
                </View>
                <View style={{ marginLeft: 40 }}>
                    <TouchableOpacity
                        style={courseIntroStyles.tutorCheckButton}
                        onPress={() => navigation.navigate('TutorInfo', {
                            tutor: courseInfo.tutor_email
                        })}
                    >
                        <Text style={courseIntroStyles.tutorCheckButtonText}>查看導師</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
