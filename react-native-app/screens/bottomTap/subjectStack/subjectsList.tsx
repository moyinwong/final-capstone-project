// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';
import subjectStyles from '../../../styles/subjectStyles';

// Data
import subjectsData from '../../../data/subjectsData';

export default function SubjectsList() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Params
    let category = 'all';
    if (route.params) {
        category = route.params.category;
    }

    // State
    const [mainSubjectsData, setMainSubjectsData] = useState(
        subjectsData(category)
    );

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
                        onPress={() => navigation.navigate('CoursesList',
                            { subject: item.title }
                        )}
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
