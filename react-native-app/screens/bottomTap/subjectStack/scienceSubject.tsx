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
        title: '物理',
        pic: require('../../../assets/subjectsPic/phy.jpg'),
        id: '1'
    },
    {
        title: '化學',
        pic: require('../../../assets/subjectsPic/chem.jpg'),
        id: '2'
    },
    {
        title: '生物',
        pic: require('../../../assets/subjectsPic/bio.jpg'),
        id: '3'
    },
    {
        title: '綜合科學',
        pic: require('../../../assets/subjectsPic/sci.jpg'),
        id: '4'
    },
    {
        title: 'M1',
        pic: require('../../../assets/subjectsPic/m1.jpg'),
        id: '5'
    },
    {
        title: 'M2',
        pic: require('../../../assets/subjectsPic/m2.jpeg'),
        id: '6'
    }
]

export default function ScienceSubject() {

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
                        onPress={() => navigation.navigate('Course', { subject: item.title })}
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
