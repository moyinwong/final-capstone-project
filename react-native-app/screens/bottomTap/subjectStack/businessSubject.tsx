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
        title: '企會財',
        pic: require('../../../assets/subjectsPic/bafs.jpg'),
        id: '1'
    },
    {
        title: '經濟',
        pic: require('../../../assets/subjectsPic/econ.jpg'),
        id: '2'
    }
]

export default function BusinessSubject() {

    // Hooks
    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>

            <FlatList
                style={subjectStyles.flatList}
                keyExtractor={(item) => item.id}
                data={mainSubjectsData}
                showsVerticalScrollIndicator={false}
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
