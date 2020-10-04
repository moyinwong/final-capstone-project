// React, React Native
import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';

// Navigation
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

// Icons
import { MaterialIcons } from '@expo/vector-icons';

// Styles
import globalStyles from '../../../styles/globalStyles';
import tutorInfoStyles from '../../../styles/tutorInfoStyles';

// Components
import Stars from '../../../sharedComponents/stars';

// Functions
import showSubscribeBox from '../../../functions/showSubscribeBox';
import showModal from '../../../functions/showModal';

// Data
import envData from '../../../data/env';

export default function TutorInfo() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Param
    let tutor_email = 'email';
    if (route.params) {
        tutor_email = route.params.tutor;
    }

    // Tutor Info
    // State
    const [tutorInfo, setTutorInfo] = useState(
        []
    );

    // Fetch
    async function getTutorInfo(tutor_email: string) {
        try {
            let queryRoute: string = "/course/tutor/info/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${tutor_email}`
            );

            const result = await fetchRes.json();
            setTutorInfo(result.tutorInfo);
        } catch (err) {
            console.log(err);
        }
    }

    // Tutor Student Number
    // State
    const [tutorStudentNum, setTutorStudentNum] = useState(
        0
    );

    // Fetch
    async function getTutorStudentNum(tutor_email: string) {
        try {
            let queryRoute: string = "/course/tutor/number-of-students/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${tutor_email}`
            );

            const result = await fetchRes.json();
            setTutorStudentNum(result.totalStudentNumber.student_num);
        } catch (err) {
            console.log(err);
        }
    }

    // Courses List
    // State
    const [coursesListData, setCoursesListData] = useState(
        []
    );

    // Fetch
    async function getAllCourseByTutor(tutor_email: string) {
        try {
            let queryRoute: string = "/course/tutor/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${tutor_email}`
            );

            const result = await fetchRes.json();
            setCoursesListData(result.courses);
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getTutorInfo(tutor_email);
            getTutorStudentNum(tutor_email);
            getAllCourseByTutor(tutor_email);
        }, [tutor_email])
    );

    return (
        <ScrollView
            style={{ ...globalStyles.container, paddingTop: 12, paddingHorizontal: 0 }}
            showsVerticalScrollIndicator={false}
        >

            <View style={tutorInfoStyles.tutorBox}>

                <View style={tutorInfoStyles.tutorPicContainer}>
                    <Image
                        style={tutorInfoStyles.tutorPic}
                        resizeMode='cover'
                        source={{ uri: `${envData.REACT_APP_BACKEND_FILE_URL}/img/${tutorInfo.image}` }}
                    />
                </View>

                <View style={tutorInfoStyles.tutorInfoContainer}>
                    <Text style={tutorInfoStyles.tutorName}>{tutorInfo.name}</Text>
                    <View style={tutorInfoStyles.tutorTitleAndTeamContainer}>
                        <Text style={tutorInfoStyles.tutorInfo}>{tutorInfo.title}</Text>
                    </View>
                    <Text style={tutorInfoStyles.tutorInfo}>{tutorInfo.introduction}</Text>

                    <View style={tutorInfoStyles.tutorSubscribeContainer}>
                        <Text style={tutorInfoStyles.tutorNumSubscribed}>{'總學生人數: ' + tutorStudentNum}</Text>
                    </View>

                    <View style={tutorInfoStyles.allCoursesButtonContainer}>
                        <TouchableOpacity
                            style={tutorInfoStyles.allCoursesButton}
                            onPress={() => navigation.navigate('CoursesList', { tutorName: tutorInfo.name, tutorEmail: tutor_email })}
                        >
                            <Text style={tutorInfoStyles.allCoursesButtonText}>所有課程</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            {/* 熱門課程 */}
            <View style={tutorInfoStyles.titleContainer}>
                <Text style={tutorInfoStyles.screenTitle}>熱門課程</Text>
            </View>

            <FlatList
                style={tutorInfoStyles.flatList}
                keyExtractor={(item) => item.id.toString()}
                data={coursesListData.slice(0, 6)}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.homeHorizontalFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={tutorInfoStyles.courseBox}
                        onPress={() => navigation.navigate('Course',
                            { courseName: item.course_name }
                        )}
                        // ssssssdddfvesfgergerger
                        onLongPress={() => showModal(false)}
                    >
                        <View style={tutorInfoStyles.coursePicContainer}>
                            <Image
                                style={tutorInfoStyles.coursePic}
                                resizeMode='cover'
                                source={{ uri: item.image }}
                            />
                        </View>
                        <View style={tutorInfoStyles.courseInfoContainer}>

                            <Text style={tutorInfoStyles.courseTitle}>{item.course_name}</Text>
                            <View style={tutorInfoStyles.courseSubInfoContainer}>
                                <Text style={tutorInfoStyles.courseInfoText}>{item.tutor_name}</Text>
                                <Text style={tutorInfoStyles.courseInfoText}>{"總共堂數: " + item.lessons_number}</Text>
                                <View style={tutorInfoStyles.courseScoreContainer}>
                                    <Text style={tutorInfoStyles.courseInfoText}>{"評分: "}</Text>

                                    <Stars score={item.rated_score} />

                                    <Text style={{ ...tutorInfoStyles.courseInfoText, fontSize: 16 }}>{" (" + item.rated_num + ")"}</Text>
                                </View>
                                {/* sssdsfvdsvdsvdsbvsdbsdbsdbds */}
                                {false ?
                                    (
                                        <View style={tutorInfoStyles.coursePriceContainer}>
                                            <MaterialIcons name="done" size={26} color="#22c736" />
                                            <Text style={{ ...tutorInfoStyles.coursePrice, color: '#22c736' }}>{"已購買"}</Text>
                                        </View>
                                    ) : (
                                        <View style={tutorInfoStyles.coursePriceContainer}>
                                            <Text style={tutorInfoStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                        </View>
                                    )}
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
            />

            <View style={globalStyles.tutorInfoFooter}></View>
        </ScrollView>
    )
}
