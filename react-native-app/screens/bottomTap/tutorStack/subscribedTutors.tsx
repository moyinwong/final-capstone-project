// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Functions
import showSubscribeBox from '../../../functions/showSubscribeBox';

// Styles
import globalStyles from '../../../styles/globalStyles';
import tutorsStyles from '../../../styles/tutorsStyles';

export default function SubscribedTutors(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    // Hooks
    const navigation = useNavigation();

    // State
    const [tutorsData, setTutorsData] = useState(
        [
            {
                name: 'Alex Lau',
                pic: require('../../../assets/tutorsPic/alex.jpeg'),
                title: '首席導師',
                team: '科啟學院',
                description: 'Alex 曾榮獲多項本地及亞太科技大獎，作為多家科技公司的顧問和 Play More Limited 前首席技術官，他具備軟件開發和管理的專業知識。',
                numSubscribed: 100,
                id: '1'
            },
            {
                name: 'Gordon Lau',
                pic: require('../../../assets/tutorsPic/gordon.jpg'),
                title: '​課程總監',
                team: '科啟學院',
                description: '前 Accelerate HK 首席技術官。曾於多間不同行業規模的公司參與軟件開發的工作。超過10年編程經驗，同時有超過2年編程教育經驗。',
                numSubscribed: 120,
                id: '2'
            },
            {
                name: 'Jason Lee',
                pic: require('../../../assets/tutorsPic/jason.jpg'),
                title: '課程講師',
                team: '科啟學院',
                description: 'Jason 沉心於編寫程式和程式教學，他加入 Tecky 之前本地一間物聯網公司作為商業智能分析師，主要負責分析源數據去解決客戶的問題。',
                numSubscribed: 105,
                id: '3'
            },
            {
                name: 'Andrew Shek',
                pic: require('../../../assets/tutorsPic/andrew.jpg'),
                title: '課程講師',
                team: '科啟學院',
                description: '曾任職不同範疇公司R&D軟件工程師，例如，長者智能居家安全系統、生物科技、金融科技、電子消費品及客制化Microsoft產品解決方案。',
                numSubscribed: 70,
                id: '4'
            }
        ]
    );

    return (
        <View style={globalStyles.container}>

            <FlatList
                numColumns={2}
                style={tutorsStyles.flatList}
                keyExtractor={(item) => item.id}
                data={tutorsData}
                showsVerticalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.tutorsFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={tutorsStyles.tutorBox}
                        onPress={() => navigation.navigate('TutorInfo', { tutor: item })}
                        onLongPress={() => showSubscribeBox()}
                    >
                        <View style={tutorsStyles.tutorPicContainer}>
                            <Image
                                style={tutorsStyles.tutorPic}
                                resizeMode='cover'
                                source={item.pic}
                            />
                        </View>
                        <View style={tutorsStyles.tutorInfoContainer}>
                            <Text style={tutorsStyles.tutorName}>{item.name}</Text>
                            <Text style={tutorsStyles.tutorInfo}>{'訂閱數: ' + item.numSubscribed}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
