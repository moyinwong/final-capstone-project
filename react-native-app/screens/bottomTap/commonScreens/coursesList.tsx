// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Icons
import { Entypo, FontAwesome } from '@expo/vector-icons';

// Styles
import globalStyles from '../../../styles/globalStyles';
import coursesListStyles from '../../../styles/coursesListStyles';

export default function CoursesList(props: { navigation: { navigate: (arg0: string) => void; }; }) {

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
                aveScore: 4.5,
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
                aveScore: 4.5,
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
                aveScore: 4.0,
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
                aveScore: 4.2,
                coursePic: require('../../../assets/coursesPic/knex.png'),
                tutorPic: require('../../../assets/tutorsPic/andrew.jpg'),
                id: '6'
            },
            {
                title: 'Flutter',
                description: '教你寫App',
                tutor: 'Andrew Shek',
                numOfLessons: 12,
                price: 160,
                aveScore: 4.4,
                coursePic: require('../../../assets/coursesPic/flutter.png'),
                tutorPic: require('../../../assets/tutorsPic/andrew.jpg'),
                id: '7'
            },
            {
                title: 'Python',
                description: '教你寫Python',
                tutor: 'Dragon Lung',
                numOfLessons: 12,
                price: 190,
                aveScore: 4.1,
                coursePic: require('../../../assets/coursesPic/python.png'),
                tutorPic: require('../../../assets/tutorsPic/dragon.jpg'),
                id: '8'
            },
            {
                title: 'React',
                description: '兩日學識React',
                tutor: 'Alex Lau',
                numOfLessons: 3,
                price: 200,
                aveScore: 4.2,
                coursePic: require('../../../assets/coursesPic/react.png'),
                tutorPic: require('../../../assets/tutorsPic/alex.jpeg'),
                id: '9'
            },
            {
                title: 'React Native',
                description: '三日學識React Native',
                tutor: 'Alex Lau',
                numOfLessons: 5,
                price: 250,
                aveScore: 4.5,
                coursePic: require('../../../assets/coursesPic/reactNative.png'),
                tutorPic: require('../../../assets/tutorsPic/alex.jpeg'),
                id: '10'
            },
            {
                title: 'TensorFlow',
                description: '三日學識AI',
                tutor: 'Beeno Tung',
                numOfLessons: 12,
                price: 170,
                aveScore: 4.8,
                coursePic: require('../../../assets/coursesPic/tensorFlow.png'),
                tutorPic: require('../../../assets/tutorsPic/beeno.jpg'),
                id: '11'
            },
            {
                title: 'TypeScript',
                description: '三日學識Type Script',
                tutor: 'Dragon Lung',
                numOfLessons: 3,
                price: 140,
                aveScore: 4.6,
                coursePic: require('../../../assets/coursesPic/typeScript.jpg'),
                tutorPic: require('../../../assets/tutorsPic/dragon.jpg'),
                id: '12'
            }
        ]
    );

    return (
        <View style={globalStyles.container}>

            <View style={coursesListStyles.titleContainer}>
                {coursesListParam.subject ?
                    (
                        <Text style={coursesListStyles.screenTitle}>所有
                            <Text style={coursesListStyles.paramTitle}>{coursesListParam.subject}</Text>
                        課程</Text>
                    )
                    : (
                        <Text style={coursesListStyles.screenTitle}>
                            <Text style={coursesListStyles.paramTitle}>{coursesListParam.tutor}</Text>
                        的課程</Text>
                    )}
            </View>

            <FlatList
                style={coursesListStyles.flatList}
                keyExtractor={(item) => item.id}
                data={coursesListData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={coursesListStyles.courseBox}
                        onPress={() => navigation.navigate('Course', { title: item.title })}
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
                                        <Text style={coursesListStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                        <View style={coursesListStyles.courseScoreContainer}>
                                            <Text style={coursesListStyles.courseInfoText}>{"評分: " + item.aveScore}</Text>
                                            <FontAwesome name="star" size={20} color="#fadd4d" />
                                            <FontAwesome name="star" size={20} color="#fadd4d" />
                                            <FontAwesome name="star" size={20} color="#fadd4d" />
                                            <FontAwesome name="star" size={20} color="#fadd4d" />
                                            <FontAwesome name="star-o" size={20} color="#fadd4d" />
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
