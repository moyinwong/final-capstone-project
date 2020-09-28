// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Icons
import { Entypo } from '@expo/vector-icons';

// Components
import Stars from '../../../sharedComponents/stars';

// Styles
import globalStyles from '../../../styles/globalStyles';
import coursesListStyles from '../../../styles/coursesListStyles';

// Interfaces
import ICoursesListParam from '../../../Interfaces/ICoursesListParam';

// Methods
import showModal from '../../../functions/showModal';

// Data
import coursesTestData from '../../../data/coursesTestData';

export default function CoursesList() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Param
    let coursesListParam: ICoursesListParam = {
        subject: null,
        tutor: null,
        user: null,
        completedCourse: null
    }

    if (route.params) {
        coursesListParam = route.params;
    }

    // State
    const [coursesListData, setCoursesListData] = useState(
        coursesTestData('all')
    );

    return (
        <View style={globalStyles.container}>

            <FlatList
                style={coursesListStyles.flatList}
                keyExtractor={(item) => item.id}
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
                            : coursesListParam.tutor ? (
                                <View>
                                    <Text style={coursesListStyles.screenTitle}>
                                        <Text style={coursesListStyles.paramTitle}>{coursesListParam.tutor}</Text>
                        的課程</Text>
                                </View>
                            ) : (
                                    <View></View>
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
                        onPress={() => navigation.navigate('Course', { course: item })}
                        onLongPress={() => showModal(item.isPurchased)}
                    >
                        <View style={coursesListStyles.coursePicContainer}>
                            <Image
                                style={coursesListStyles.coursePic}
                                resizeMode='cover'
                                source={item.coursePic}
                            />
                        </View>
                        <View style={coursesListStyles.courseInfoContainer}>

                            <View style={coursesListStyles.courseInfoLeftContainer}>
                                <View style={coursesListStyles.tutorPicContainer}>
                                    <Image
                                        style={coursesListStyles.tutorPic}
                                        resizeMode='cover'
                                        source={item.tutorPic}
                                    />
                                </View>
                            </View>

                            <View style={coursesListStyles.courseInfoRightContainer}>
                                <Text style={coursesListStyles.courseTitle}>{item.title}</Text>
                                <View style={coursesListStyles.courseSubInfoContainer}>
                                    <View style={coursesListStyles.courseSubInfoTextContainer}>
                                        <Text style={coursesListStyles.courseInfoText}>{item.tutor}</Text>
                                        <Entypo style={coursesListStyles.courseInfoDot} name="dot-single" size={16} color="#555555" />
                                        <Text style={coursesListStyles.courseInfoText}>{item.description}</Text>
                                        <Entypo style={coursesListStyles.courseInfoDot} name="dot-single" size={16} color="#555555" />
                                        <Text style={coursesListStyles.courseInfoText}>{"總共堂數: " + item.numOfLessons}</Text>
                                    </View>
                                    <View style={coursesListStyles.courseSubInfoLowerContainer}>
                                        {item.isPurchased ?
                                            (
                                                <Text style={{ ...coursesListStyles.coursePrice, color: '#22c736' }}>{"已購買"}</Text>
                                            ) : (
                                                <Text style={coursesListStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                            )}
                                        <View style={coursesListStyles.courseScoreContainer}>
                                            <Text style={coursesListStyles.courseInfoText}>{"評分: "}</Text>

                                            <Stars score={item.aveScore} />

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
