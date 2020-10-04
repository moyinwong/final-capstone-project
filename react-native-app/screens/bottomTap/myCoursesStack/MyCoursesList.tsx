// React, React Native
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

// Functions
import showCommentOrRateBox from '../../../functions/showCommentOrRateBox';

// Styles
import globalStyles from '../../../styles/globalStyles';
import myCoursesStyles from '../../../styles/myCoursesStyles';

// Data
import envData from '../../../data/env';

export default function MyCoursesList() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Params
    let category = 'all';
    if (route.params) {
        category = route.params.category;
    }

    // Courses List
    // State
    const [coursesListData, setCoursesListData] = useState(
        []
    );

    const allCategoryName = 'all'
    useFocusEffect(
        useCallback(() => {
            getAllCoursesByCategory(allCategoryName);
        }, [allCategoryName])
    );

    // Fetch
    async function getAllCoursesByCategory(categoryName: string) {
        try {
            let queryRoute: string = "/category/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${categoryName}`
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
                style={myCoursesStyles.flatList}
                keyExtractor={(item) => item.id.toString()}
                data={coursesListData}
                showsVerticalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.myCoursesFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={myCoursesStyles.courseBox}
                        onPress={() => navigation.navigate('Course',
                            { courseName: item.course_name }
                        )}
                        onLongPress={() => showCommentOrRateBox()}
                    >
                        <View style={myCoursesStyles.coursePicContainer}>
                            <Image
                                style={myCoursesStyles.coursePic}
                                resizeMode='cover'
                                source={{ uri: item.image }}
                            />
                        </View>

                        <View style={myCoursesStyles.courseInfoContainer}>
                            <Text style={myCoursesStyles.courseTitle}>{item.course_name}</Text>
                            <View style={myCoursesStyles.courseSubInfoContainer}>

                                <View style={myCoursesStyles.courseSubInfoTextContainer}>
                                    <Text style={myCoursesStyles.courseInfoText}>{item.tutor_name}</Text>
                                    <Text style={myCoursesStyles.courseInfoText}>{item.course_description}</Text>
                                    <Text style={myCoursesStyles.courseInfoText}>{"總共堂數: " + item.lessons_number}</Text>
                                </View>

                                <View style={myCoursesStyles.courseSubInfoLowerContainer}>
                                    <Text style={myCoursesStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
