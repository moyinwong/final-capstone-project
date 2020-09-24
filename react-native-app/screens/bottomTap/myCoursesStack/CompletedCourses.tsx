// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';
import myCoursesStyles from '../../../styles/myCoursesStyles';

export default function CompletedCourses() {

    // Hooks
    const navigation = useNavigation();

    // State
    const [coursesListData, setCoursesListData] = useState(
        [
            {
                title: 'Flutter',
                description: '教你寫App',
                tutor: 'Andrew Shek',
                numOfLessons: 12,
                price: 160,
                aveScore: 5.0,
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
                aveScore: 1.2,
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
                aveScore: 3.2,
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
                aveScore: 2.8,
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
                aveScore: 3.6,
                coursePic: require('../../../assets/coursesPic/typeScript.jpg'),
                tutorPic: require('../../../assets/tutorsPic/dragon.jpg'),
                id: '12'
            }
        ]
    );

    return (
        <View style={{ ...globalStyles.container, paddingVertical: 0 }}>

            <FlatList
                style={myCoursesStyles.flatList}
                keyExtractor={(item) => item.id}
                data={coursesListData}
                showsVerticalScrollIndicator={false}

                ListFooterComponent={
                    <View style={{height:18}}>
                    </View>
                }
                
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
