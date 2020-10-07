// React, React Native
import React, { useState, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Context
import { UserContext } from '../../../contexts/userContext';
import { CourseContext } from '../../../contexts/courseContext';

// Navigation
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';
import myCoursesStyles from '../../../styles/myCoursesStyles';

// Data
import envData from '../../../data/env';

export default function MyCoursesList() {

    // Context
    const { user } = useContext(UserContext);
    const { setCourseName } = useContext(CourseContext);

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
            let queryRoute: string = "/user/course-detail/all/";
            console.log(user);
            let userId = user.userId;
            let token = user.token;

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await fetchRes.json();
            console.log(result.courses);
            setCoursesListData(result.courses);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={globalStyles.container}>

            <FlatList
                style={myCoursesStyles.flatList}
                keyExtractor={(item) => item.course_id.toString()}
                data={coursesListData}
                showsVerticalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.myCoursesFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={myCoursesStyles.courseBox}
                        onPress={() => {
                            setCourseName(item.course_name),
                                navigation.navigate("Course", { screen: 'CourseLessons' })
                        }}
                    >
                        <View style={myCoursesStyles.coursePicContainer}>
                            <Image
                                style={myCoursesStyles.coursePic}
                                resizeMode='cover'
                                source={{ uri: item.image }}
                            />
                        </View>

                        <View style={myCoursesStyles.courseInfoContainer}>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={myCoursesStyles.courseTitle}
                            >{item.course_name}</Text>
                            <View style={myCoursesStyles.courseSubInfoContainer}>

                                <View style={myCoursesStyles.courseSubInfoTextContainer}>
                                    <Text style={{ ...myCoursesStyles.courseInfoText, color: '#e96a43' }}>{item.tutor_name}</Text>
                                    <Text
                                        numberOfLines={2}
                                        ellipsizeMode='tail'
                                        style={myCoursesStyles.courseInfoText}
                                    >{item.objective}</Text>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
