// React, React Native
import React, { useState, useCallback, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';

// Context
import { LessonContext } from '../../../../contexts/lessonContext';

// Navigation
import { useFocusEffect } from '@react-navigation/native';

// Styles
import globalStyles from '../../../../styles/globalStyles';
import materialsStyles from '../../../../styles/materialsStyles';

// Data
import envData from '../../../../data/env';

export default function Materials(props: { navigation: { goBack: () => void; navigate: (arg0: string) => void; }; }) {

    // Context
    const { lessonName } = useContext(LessonContext);

    // Hooks
    const isFocused = useIsFocused();

    // Lesson Files
    // State
    const [lesson, setLesson] = useState(
        'lesson'
    );

    const [lessonFiles, setLessonFiles] = useState(
        []
    );

    // Fetch
    async function getLessonFiles(lesson: string) {
        try {
            if (lessonName) {
                setLesson(lessonName);
            }

            let queryRoute: string = "/lesson/file/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${lesson}`
            );

            //if no such category
            if (fetchRes.status === 500) {
                throw new Error("伺服器發生問題");
                //dispatch(push("/404"));
                //return;
            }

            const result = await fetchRes.json();
            setLessonFiles(result.files);
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLessonFiles(lesson);
        }, [lesson])
    );

    return (
        <View style={globalStyles.container}>

            <FlatList
                style={materialsStyles.filesContainer}
                keyExtractor={(item) => item.file_name}
                data={lessonFiles}
                scrollEnabled={true}

                ListHeaderComponent={
                    <View style={materialsStyles.titleContainer}>
                        {lessonFiles[0] ? (
                            <Text style={materialsStyles.title}>可供下載：</Text>
                        ) : (
                                <Text style={materialsStyles.title}>暫未有教材</Text>
                            )}
                    </View>
                }

                ItemSeparatorComponent={() => (
                    <View style={materialsStyles.separator}></View>
                )}

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={materialsStyles.fileBox}
                        onPress={() => Linking.openURL(`${envData.REACT_APP_BACKEND_FILE_URL}/file/${item.file_name}`)}
                    >
                        <Text style={materialsStyles.fileText}>{item.file_name}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
