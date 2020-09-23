// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Icons
import { Entypo } from '@expo/vector-icons';

// Styles
import globalStyles from '../../../styles/globalStyles';
import myCoursesStyles from '../../../styles/myCoursesStyles';

export default function InProgressCourses(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Param
    interface ICoursesListParam {
        subject?: string | null
        tutor?: string | null
        user?: string | null
        completedCourse?: boolean | null
    }

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
        [
            {
                title: 'Express Server',
                description: '教你寫Server',
                tutor: 'Gordon Lau',
                numOfLessons: 8,
                price: 100,
                aveScore: 4.6,
                coursePic: require('../../../assets/coursesPic/express.jpg'),
                tutorPic: require('../../../assets/tutorsPic/gordon.jpg'),
                id: '1'
            },
            {
                title: 'FireBase',
                description: '教你寫Server',
                tutor: 'Gordon Lau',
                numOfLessons: 6,
                price: 150,
                aveScore: 3.5,
                coursePic: require('../../../assets/coursesPic/firebase.png'),
                tutorPic: require('../../../assets/tutorsPic/gordon.jpg'),
                id: '2'
            },
            {
                title: 'Flutter',
                description: '教你寫App',
                tutor: 'Jason Lee',
                numOfLessons: 12,
                price: 120,
                aveScore: 4.4,
                coursePic: require('../../../assets/coursesPic/flutter.png'),
                tutorPic: require('../../../assets/tutorsPic/jason.jpg'),
                id: '3'
            },
            {
                title: 'JavaScript',
                description: '教你JS',
                tutor: 'Jason Lee',
                numOfLessons: 9,
                price: 110,
                aveScore: 3.7,
                coursePic: require('../../../assets/coursesPic/javaScript.png'),
                tutorPic: require('../../../assets/tutorsPic/jason.jpg'),
                id: '4'
            },
            {
                title: 'Jest',
                description: '教你寫Test',
                tutor: 'Beeno Tung',
                numOfLessons: 3,
                price: 180,
                aveScore: 2.6,
                coursePic: require('../../../assets/coursesPic/jest.png'),
                tutorPic: require('../../../assets/tutorsPic/beeno.jpg'),
                id: '5'
            },
            {
                title: 'Knex',
                description: '教你寫migration',
                tutor: 'Andrew Shek',
                numOfLessons: 2,
                price: 130,
                aveScore: 3.2,
                coursePic: require('../../../assets/coursesPic/knex.png'),
                tutorPic: require('../../../assets/tutorsPic/andrew.jpg'),
                id: '6'
            }
        ]
    );

    return (
        <View style={{ ...globalStyles.container, paddingVertical: 0 }}>

            <View style={myCoursesStyles.titleContainer}>
                <Text>修讀中課程</Text>
            </View>

            <FlatList
                style={myCoursesStyles.flatList}
                keyExtractor={(item) => item.id}
                data={coursesListData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={myCoursesStyles.courseBox}
                        onPress={() => navigation.navigate('Course', { title: item.title })}
                    >
                        <View style={myCoursesStyles.coursePicContainer}>
                            <Image
                                style={myCoursesStyles.coursePic}
                                resizeMode='cover'
                                source={item.coursePic}
                            />
                        </View>
                        <View style={myCoursesStyles.courseInfoContainer}>

                            <View style={myCoursesStyles.courseInfoLeftContainer}>
                                <View style={myCoursesStyles.tutorPicContainer}>
                                    <Image
                                        style={myCoursesStyles.tutorPic}
                                        resizeMode='cover'
                                        source={item.tutorPic}
                                    />
                                </View>
                            </View>

                            <View style={myCoursesStyles.courseInfoRightContainer}>
                                <Text style={myCoursesStyles.courseTitle}>{item.title}</Text>
                                <View style={myCoursesStyles.courseSubInfoContainer}>
                                    <View style={myCoursesStyles.courseSubInfoTextContainer}>
                                        <Text style={myCoursesStyles.courseInfoText}>{item.tutor}</Text>
                                        <Entypo style={myCoursesStyles.courseInfoDot} name="dot-single" size={16} color="#555555" />
                                        <Text style={myCoursesStyles.courseInfoText}>{item.description}</Text>
                                        <Entypo style={myCoursesStyles.courseInfoDot} name="dot-single" size={16} color="#555555" />
                                        <Text style={myCoursesStyles.courseInfoText}>{"總共堂數: " + item.numOfLessons}</Text>
                                    </View>
                                    <View style={myCoursesStyles.courseSubInfoLowerContainer}>
                                        <Text style={myCoursesStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                        <View style={myCoursesStyles.courseScoreContainer}>
                                            <Text style={myCoursesStyles.courseInfoText}>{"評分: "}</Text>

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
