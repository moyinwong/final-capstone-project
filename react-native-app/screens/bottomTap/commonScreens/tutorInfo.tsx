// React, React Native
import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';

// Navigation
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

// Icons
import { Entypo, MaterialIcons } from '@expo/vector-icons';

// Styles
import globalStyles from '../../../styles/globalStyles';
import tutorInfoStyles from '../../../styles/tutorInfoStyles';

// Components
import Stars from '../../../sharedComponents/stars';

// Functions
import showSubscribeBox from '../../../functions/showSubscribeBox';
import showModal from '../../../functions/showModal';

// Interfaces
import ITutor from '../../../Interfaces/ITutor';

// Data
import envData from '../../../data/env';

export default function TutorInfo() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Param
    let tutor: ITutor = {
        name: null,
        pic: null,
        title: null,
        team: null,
        description: null,
        numSubscribed: null,
        id: null
    }

    if (route.params) {
        tutor = route.params.tutor;
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

            //if no such category
            if (fetchRes.status === 500) {
                throw new Error("伺服器發生問題");
                //dispatch(push("/404"));
                //return;
            }

            const result = await fetchRes.json();
            setCoursesListData(result.courses);
        } catch (err) {
            console.log(err);
        }
    }

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
                        source={tutor.pic}
                    />
                </View>

                <View style={tutorInfoStyles.tutorInfoContainer}>
                    <Text style={tutorInfoStyles.tutorName}>{tutor.name}</Text>
                    <View style={tutorInfoStyles.tutorTitleAndTeamContainer}>
                        <Text style={tutorInfoStyles.tutorInfo}>{tutor.title}</Text>
                        <Entypo style={tutorInfoStyles.tutorInfoDot} name="dot-single" size={16} color="#555555" />
                        <Text style={tutorInfoStyles.tutorInfo}>{tutor.team}</Text>
                    </View>
                    <Text style={tutorInfoStyles.tutorInfo}>{tutor.description}</Text>

                    <View style={tutorInfoStyles.tutorSubscribeContainer}>
                        <Text style={tutorInfoStyles.tutorNumSubscribed}>{'訂閱數: ' + tutor.numSubscribed}</Text>

                        {tutor.isSubscribed ? (
                            <View style={tutorInfoStyles.tutorSubscribedBox}>
                                <MaterialIcons name="done" size={26} color="#22c736" />
                                <Text style={tutorInfoStyles.tutorSubscribedText}>已訂閱</Text>
                            </View>
                        ) : (
                                <TouchableOpacity
                                    style={tutorInfoStyles.tutorSubscribeButton}
                                    onPress={() => showSubscribeBox()}
                                >
                                    <Text style={tutorInfoStyles.tutorSubscribeButtonText}>訂閱</Text>
                                </TouchableOpacity>
                            )}

                    </View>

                    <View style={tutorInfoStyles.allCoursesButtonContainer}>
                        <TouchableOpacity
                            style={tutorInfoStyles.allCoursesButton}
                            onPress={() => navigation.navigate('CoursesList', { tutor: tutor.name })}
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
                data={coursesListData}
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
