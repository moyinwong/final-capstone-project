import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

// Styles
import globalStyles from '../../../styles/globalStyles';

const mainSubjectsData = [
    {
        title: '中文',
        id: '1'
    },
    {
        title: '英文',
        id: '2'
    },
    {
        title: '數學',
        id: '3'
    },
    {
        title: '通識',
        id: '4'
    }
]

export default function MainSubject(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    return (
        <View style={globalStyles.container}>

            <FlatList
                style={styles.flatList}
                keyExtractor={(item) => item.id}
                data={mainSubjectsData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.subjectBox}
                        onPress={() => props.navigation.navigate('Course')}
                    >
                        <Text style={styles.subjectTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1
    },
    subjectBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 100,
        marginVertical: 10,
        paddingRight: 20,
        borderRadius: 20,
        backgroundColor: "#ff0000"
    },
    subjectTitle: {
        fontSize: 30
    }
})