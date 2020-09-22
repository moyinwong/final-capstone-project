// Components
import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';
import subjectStyles from '../../../styles/subjectStyles';

const mainSubjectsData = [
    {
        title: '中國文學',
        pic: require('../../../assets/subjectsPic/chnLi.jpg'),
        id: '1'
    },
    {
        title: '英語文學',
        pic: require('../../../assets/subjectsPic/engLi.jpg'),
        id: '2'
    },
    {
        title: '中國歷史',
        pic: require('../../../assets/subjectsPic/chnHis.jpg'),
        id: '3'
    },
    {
        title: '歷史',
        pic: require('../../../assets/subjectsPic/his.jpg'),
        id: '4'
    },
    {
        title: '地理',
        pic: require('../../../assets/subjectsPic/geo.jpg'),
        id: '5'
    }
]

export default function LinguisticSubject() {

    // Hooks
    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>

            <FlatList
                style={subjectStyles.flatList}
                keyExtractor={(item) => item.id}
                data={mainSubjectsData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={subjectStyles.subjectBox}
                        onPress={() => navigation.navigate('CoursesList', { subject: item.title })}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            // colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 0.4)']}
                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.5)']}
                            style={subjectStyles.linearGradient}
                        >
                        </LinearGradient>
                        <Image
                            style={subjectStyles.subjectPic}
                            resizeMode='cover'
                            source={item.pic}
                        />
                        <Text style={subjectStyles.subjectTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
