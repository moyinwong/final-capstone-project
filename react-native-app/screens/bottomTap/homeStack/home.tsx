// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Components
import Stars from '../../../sharedComponents/stars';

// Styles
import globalStyles from '../../../styles/globalStyles';
import homeStyles from '../../../styles/homeStyles';

export default function Home(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    // Hooks
    const navigation = useNavigation();

    // State
    const subjectsData = [
        {
            title: '中文',
            pic: require('../../../assets/subjectsPic/chn.jpg'),
            id: '1'
        },
        {
            title: '英文',
            pic: require('../../../assets/subjectsPic/eng.jpg'),
            id: '2'
        },
        {
            title: '企會財',
            pic: require('../../../assets/subjectsPic/bafs.jpg'),
            id: '11'
        },
        {
            title: '物理',
            pic: require('../../../assets/subjectsPic/phy.jpg'),
            id: '5'
        },
        {
            title: '通識',
            pic: require('../../../assets/subjectsPic/ls.jpg'),
            id: '4'
        },
        {
            title: '旅遊與款待',
            pic: require('../../../assets/subjectsPic/tour.jpg'),
            id: '19'
        }
    ]

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

    const [tutorsData, setTutorsData] = useState(
        [
            {
                name: 'Alex Lau',
                pic: require('../../../assets/tutorsPic/alex.jpeg'),
                id: '1'
            },
            {
                name: 'Gordon Lau',
                pic: require('../../../assets/tutorsPic/gordon.jpg'),
                id: '2'
            },
            {
                name: 'Jason Lee',
                pic: require('../../../assets/tutorsPic/jason.jpg'),
                id: '3'
            },
            {
                name: 'Andrew Shek',
                pic: require('../../../assets/tutorsPic/andrew.jpg'),
                id: '4'
            },
            {
                name: 'Dragon Lung',
                pic: require('../../../assets/tutorsPic/dragon.jpg'),
                id: '5'
            },
            {
                name: 'Beeno Tung',
                pic: require('../../../assets/tutorsPic/beeno.jpg'),
                id: '6'
            }
        ]
    );

    const [myCoursesListData, setMyCoursesListData] = useState(
        [
            {
                title: 'Flutter',
                description: '教你寫App',
                tutor: 'Andrew Shek',
                numOfLessons: 12,
                price: 160,
                aveScore: 5.0,
                isPurchased: false,
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
                isPurchased: false,
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
                isPurchased: true,
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
                isPurchased: true,
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
                isPurchased: false,
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
                isPurchased: false,
                coursePic: require('../../../assets/coursesPic/typeScript.jpg'),
                tutorPic: require('../../../assets/tutorsPic/dragon.jpg'),
                id: '12'
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
        <ScrollView
            style={{ ...globalStyles.container, paddingTop: 12, paddingHorizontal: 0 }}
            showsVerticalScrollIndicator={false}
        >

            {/* 熱門科目 */}
            <View style={homeStyles.titleContainer}>
                <Text style={homeStyles.screenTitle}>熱門科目</Text>
            </View>

            <FlatList
                style={homeStyles.flatList}
                keyExtractor={(item) => item.id}
                data={subjectsData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.homeHorizontalFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={homeStyles.subjectBox}
                        onPress={() => navigation.navigate('CoursesList', { subject: item.title })}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            // colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 0.4)']}
                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.5)']}
                            style={homeStyles.linearGradient}
                        >
                        </LinearGradient>
                        <Image
                            style={homeStyles.subjectPic}
                            resizeMode='cover'
                            source={item.pic}
                        />
                        <Text style={homeStyles.subjectTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* 熱門課程 */}
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
                    <View style={globalStyles.homeHorizontalFooter}>
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

                            <Text style={homeStyles.courseTitle}>{item.title}</Text>
                            <View style={homeStyles.courseSubInfoContainer}>
                                <Text style={homeStyles.courseInfoText}>{item.tutor}</Text>
                                <Text style={homeStyles.courseInfoText}>{"總共堂數: " + item.numOfLessons}</Text>
                                <View style={homeStyles.courseScoreContainer}>
                                    <Text style={homeStyles.courseInfoText}>{"評分: "}</Text>

                                    <Stars score={item.aveScore} />

                                </View>
                                {item.isPurchased ?
                                    (
                                        <Text style={{ ...homeStyles.coursePrice, color: '#22c736' }}>{"已購買"}</Text>
                                    ) : (
                                        <Text style={homeStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                    )}
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* 最受歡迎導師 */}
            <View style={homeStyles.titleContainer}>
                <Text style={homeStyles.screenTitle}>最受歡迎導師</Text>
            </View>

            <FlatList
                style={homeStyles.flatList}
                keyExtractor={(item) => item.id}
                data={tutorsData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.homeHorizontalFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={homeStyles.tutorBox}
                        onPress={() => navigation.navigate('CoursesList', { tutor: item.name })}
                    >
                        <View style={homeStyles.tutorPicContainer}>
                            <Image
                                style={homeStyles.tutorPic}
                                resizeMode='cover'
                                source={item.pic}
                            />
                        </View>
                        <View style={homeStyles.tutorInfoContainer}>
                            <Text style={homeStyles.tutorName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* 我的課程 */}
            <View style={homeStyles.titleContainer}>
                <Text style={homeStyles.screenTitle}>我的課程</Text>
            </View>

            <FlatList
                style={homeStyles.flatList}
                keyExtractor={(item) => item.id}
                data={myCoursesListData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.homeHorizontalFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ ...homeStyles.courseBox, height: 240 }}
                        onPress={() => navigation.navigate('Course', { title: item.title })}
                        onLongPress={() => showModal(true)}
                    >
                        <View style={homeStyles.coursePicContainer}>
                            <Image
                                style={homeStyles.coursePic}
                                resizeMode='cover'
                                source={item.coursePic}
                            />
                        </View>
                        <View style={homeStyles.courseInfoContainer}>

                            <Text style={homeStyles.courseTitle}>{item.title}</Text>
                            <View style={homeStyles.courseSubInfoContainer}>
                                <Text style={homeStyles.courseInfoText}>{item.tutor}</Text>
                                <Text style={homeStyles.courseInfoText}>{"總共堂數: " + item.numOfLessons}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
            />

            <View style={globalStyles.homeVerticalFooter}>
            </View>

        </ScrollView>
    )
}
