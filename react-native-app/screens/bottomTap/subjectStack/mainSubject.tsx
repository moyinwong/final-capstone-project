import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Styles
import globalStyles from '../../../styles/globalStyles';
import subjectStyles from '../../../styles/subjectStyles';

const mainSubjectsData = [
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
        title: '數學',
        pic: require('../../../assets/subjectsPic/maths.jpg'),
        id: '3'
    },
    {
        title: '通識',
        pic: require('../../../assets/subjectsPic/ls.jpg'),
        id: '4'
    }
]

export default function MainSubject(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    return (
        <View style={globalStyles.container}>

            <FlatList
                style={subjectStyles.flatList}
                keyExtractor={(item) => item.id}
                data={mainSubjectsData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={subjectStyles.subjectBox}
                        onPress={() => props.navigation.navigate('Course')}
                    >
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
