// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Functions
import showCommentOrRateBox from '../../../functions/showCommentOrRateBox';

// Styles
import globalStyles from '../../../styles/globalStyles';
import myCoursesStyles from '../../../styles/myCoursesStyles';

// Data
import coursesTestData from '../../../data/coursesTestData';

export default function MyCoursesList() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Params
    let category = 'all';
    if (route.params) {
        category = route.params.category;
    }

    // State
    const [coursesListData, setCoursesListData] = useState(
        coursesTestData(category)
    );

    return (
        <View style={globalStyles.container}>

            <FlatList
                style={myCoursesStyles.flatList}
                keyExtractor={(item) => item.id}
                data={coursesListData}
                showsVerticalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.myCoursesFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={myCoursesStyles.courseBox}
                        onPress={() => navigation.navigate('Course', { title: item.title })}
                        onLongPress={() => showCommentOrRateBox()}
                    >
                        <View style={myCoursesStyles.coursePicContainer}>
                            <Image
                                style={myCoursesStyles.coursePic}
                                resizeMode='cover'
                                source={item.coursePic}
                            />
                        </View>

                        <View style={myCoursesStyles.courseInfoContainer}>
                            <Text style={myCoursesStyles.courseTitle}>{item.title}</Text>
                            <View style={myCoursesStyles.courseSubInfoContainer}>

                                <View style={myCoursesStyles.courseSubInfoTextContainer}>
                                    <Text style={myCoursesStyles.courseInfoText}>{item.tutor}</Text>
                                    <Text style={myCoursesStyles.courseInfoText}>{item.description}</Text>
                                    <Text style={myCoursesStyles.courseInfoText}>{"總共堂數: " + item.numOfLessons}</Text>
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
