// React, React Native
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
        title: '倫理與宗教',
        pic: require('../../../assets/subjectsPic/rsc.jpg'),
        id: '18'
    },
    {
        title: '旅遊與款待',
        pic: require('../../../assets/subjectsPic/tour.jpg'),
        id: '19'
    },
    {
        title: '設計與科技',
        pic: require('../../../assets/subjectsPic/dt.jpg'),
        id: '20'
    },
    {
        title: '資訊及通訊科技',
        pic: require('../../../assets/subjectsPic/ict.jpg'),
        id: '21'
    },
    {
        title: '音樂',
        pic: require('../../../assets/subjectsPic/music.jpg'),
        id: '22'
    },
    {
        title: '視覺藝術',
        pic: require('../../../assets/subjectsPic/arts.jpg'),
        id: '23'
    },
    {
        title: '體育',
        pic: require('../../../assets/subjectsPic/pe.jpg'),
        id: '24'
    }
]

export default function OtherSubject() {

    // Hooks
    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>

            <FlatList
                style={subjectStyles.flatList}
                keyExtractor={(item) => item.id}
                data={mainSubjectsData}
                showsVerticalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.subjectsFooter}>
                    </View>
                }

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
