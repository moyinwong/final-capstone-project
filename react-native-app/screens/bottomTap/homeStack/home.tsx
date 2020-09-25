// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Icons
import { Entypo } from '@expo/vector-icons';

// Components
import Stars from '../../../sharedComponents/stars';

// Styles
import globalStyles from '../../../styles/globalStyles';
import homeStyles from '../../../styles/homeStyles';

export default function Home(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    // Hooks
    const navigation = useNavigation();

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
                isPurchased: false,
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
                isPurchased: true,
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
                isPurchased: true,
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
                isPurchased: false,
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
                isPurchased: false,
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
                isPurchased: true,
                coursePic: require('../../../assets/coursesPic/knex.png'),
                tutorPic: require('../../../assets/tutorsPic/andrew.jpg'),
                id: '6'
            }
        ]
    );

    // methods
    function showModal(isPurchased: boolean) {
        if (isPurchased) {
            showCommentOrRateBox();
        } else {
            showPurchaseBox();
        }
    }

    function showCommentOrRateBox() {
        Alert.alert(
            "評價",
            "請評價",
            [
                { text: "評價", onPress: () => console.log("評價") }
            ],
            { cancelable: true }
        )
    }

    function showCommentBox() {
        console.log('comment');
    }

    function showRateBox() {
        console.log('rate');
    }

    function showPurchaseBox() {
        Alert.alert(
            "購買",
            "請購買",
            [
                { text: "購買", onPress: () => console.log("購買") }
            ],
            { cancelable: true }
        )
    }

    return (
        <View style={{ ...globalStyles.container, paddingVertical: 0 }}>

            <View style={homeStyles.titleContainer}>
                <Text style={homeStyles.screenTitle}>熱門課程</Text>
            </View>

            <FlatList
                style={homeStyles.flatList}
                keyExtractor={(item) => item.id}
                data={coursesListData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                ListFooterComponent={
                    <View style={{ width: 0 }}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={homeStyles.courseBox}
                        onPress={() => navigation.navigate('Course', { title: item.title })}
                        onLongPress={() => showModal(item.isPurchased)}
                    >
                        <View style={homeStyles.coursePicContainer}>
                            <Image
                                style={homeStyles.coursePic}
                                resizeMode='cover'
                                source={item.coursePic}
                            />
                        </View>
                        <View style={homeStyles.courseInfoContainer}>

                            <View style={homeStyles.courseInfoLeftContainer}>
                                <View style={homeStyles.tutorPicContainer}>
                                    <Image
                                        style={homeStyles.tutorPic}
                                        resizeMode='cover'
                                        source={item.tutorPic}
                                    />
                                </View>
                            </View>

                            <View style={homeStyles.courseInfoRightContainer}>
                                <Text style={homeStyles.courseTitle}>{item.title}</Text>
                                <View style={homeStyles.courseSubInfoContainer}>
                                    <View style={homeStyles.courseSubInfoTextContainer}>
                                        <Text style={homeStyles.courseInfoText}>{item.tutor}</Text>
                                        <Entypo style={homeStyles.courseInfoDot} name="dot-single" size={16} color="#555555" />
                                        <Text style={homeStyles.courseInfoText}>{item.description}</Text>
                                        <Entypo style={homeStyles.courseInfoDot} name="dot-single" size={16} color="#555555" />
                                        <Text style={homeStyles.courseInfoText}>{"總共堂數: " + item.numOfLessons}</Text>
                                    </View>
                                    <View style={homeStyles.courseSubInfoLowerContainer}>
                                        {item.isPurchased ?
                                            (
                                                <Text style={{ ...homeStyles.coursePrice, color: '#22c736' }}>{"已購買"}</Text>
                                            ) : (
                                                <Text style={homeStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                            )}
                                        <View style={homeStyles.courseScoreContainer}>
                                            <Text style={homeStyles.courseInfoText}>{"評分: "}</Text>

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
