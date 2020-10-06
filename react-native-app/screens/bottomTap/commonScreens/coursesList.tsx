// React, React Native
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

// Icons
import { Entypo } from '@expo/vector-icons';

// Components
import Stars from '../../../sharedComponents/stars';

// Styles
import globalStyles from '../../../styles/globalStyles';
import coursesListStyles from '../../../styles/coursesListStyles';

// Interfaces
import ICoursesListParam from '../../../Interfaces/ICoursesListParam';

// Data
import envData from '../../../data/env';

export default function CoursesList() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Param
    let coursesListParam: ICoursesListParam = {
        subject: null,
        tutorName: null,
        tutorEmail: null,
        searchFor: null
    }

    if (route.params) {
        coursesListParam = route.params;
    }

    // Category
    let categoryName = 'category';
    if (coursesListParam.subject) {
        categoryName = coursesListParam.subject;
    }

    // Tutor
    let tutorName = 'tutor', tutorEmail = 'email';
    if (coursesListParam.tutorName) {
        tutorName = coursesListParam.tutorName;
    }
    if (coursesListParam.tutorEmail) {
        tutorEmail = coursesListParam.tutorEmail;
    }

    // Search
    let searchFor = 'search';
    if (coursesListParam.searchFor) {
        searchFor = coursesListParam.searchFor;
    }

    // State
    const [coursesListData, setCoursesListData] = useState(
        []
    );

    useFocusEffect(
        useCallback(() => {
            getAllCourses(categoryName, tutorEmail);
        }, [categoryName, tutorEmail])
    );

    // Fetch
    async function getAllCourses(categoryName: string, tutorEmail: string) {
        try {
            let queryRoute = "/category/";
            let paramName = "param";

            if (categoryName != "category") {
                queryRoute = "/category/";
                paramName = categoryName;
            } else if (tutorEmail != 'email') {
                queryRoute = "/course/tutor/";
                paramName = tutorEmail;
            } else {
                queryRoute = "/course/search?search=";
                paramName = searchFor;
            }

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${paramName}`
            );

            const result = await fetchRes.json();
            setCoursesListData(result.courses);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={globalStyles.container}>

            <FlatList
                style={coursesListStyles.flatList}
                keyExtractor={(item) => item.id.toString()}
                data={coursesListData}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={coursesListStyles.titleContainer}>
                        {coursesListParam.subject ?
                            (
                                <Text style={coursesListStyles.screenTitle}>所有
                                    <Text style={coursesListStyles.paramTitle}>{coursesListParam.subject}</Text>
                        課程</Text>
                            )
                            : (coursesListParam.tutorName ? (
                                <View>
                                    <Text style={coursesListStyles.screenTitle}>
                                        <Text style={coursesListStyles.paramTitle}>{coursesListParam.tutorName}</Text>
                        的課程</Text>
                                </View>
                            ) : (
                                    <Text style={coursesListStyles.screenTitle}>與
                                        <Text style={coursesListStyles.paramTitle}>{coursesListParam.searchFor}</Text>
                                        相關的課程</Text>
                                )
                            )
                        }
                    </View>
                }

                ListFooterComponent={
                    <View style={globalStyles.coursesList}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={coursesListStyles.courseBox}
                        onPress={() => navigation.navigate('Course',
                            { courseName: item.course_name }
                        )}
                    >
                        <View style={coursesListStyles.coursePicContainer}>
                            <Image
                                style={coursesListStyles.coursePic}
                                resizeMode='cover'
                                source={{ uri: item.image }}
                            />
                        </View>
                        <View style={coursesListStyles.courseInfoContainer}>

                            <View style={coursesListStyles.courseInfoRightContainer}>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                    style={coursesListStyles.courseTitle}
                                >{item.course_name}</Text>
                                <View style={coursesListStyles.courseSubInfoContainer}>
                                    <View style={coursesListStyles.courseSubInfoTextContainer}>
                                        <Text style={coursesListStyles.courseInfoText}>{item.tutor_name}</Text>
                                        <Entypo style={coursesListStyles.courseInfoDot} name="dot-single" size={16} color="#555555" />
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode='tail'
                                            style={coursesListStyles.courseInfoText}
                                        >{item.course_description}</Text>
                                        <Entypo style={coursesListStyles.courseInfoDot} name="dot-single" size={16} color="#555555" />
                                        <Text style={coursesListStyles.courseInfoText}>{"總共堂數: " + item.lessons_number}</Text>
                                    </View>
                                    <View style={coursesListStyles.courseSubInfoLowerContainer}>
                                        {/* sssssssssssssssssss */}
                                        {false ?
                                            (
                                                <Text style={{ ...coursesListStyles.coursePrice, color: '#22c736' }}>{"已購買"}</Text>
                                            ) : (
                                                <Text style={coursesListStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                            )}
                                        <View style={coursesListStyles.courseScoreContainer}>
                                            <Text style={coursesListStyles.courseInfoText}>{"評分: "}</Text>

                                            <Stars score={item.rated_score} />

                                        </View>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
