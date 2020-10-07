// React, React Native
import React, { useState, useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Context
import { UserContext } from '../../../../contexts/userContext';
import { CourseContext } from '../../../../contexts/courseContext';

// Components
import Stars from '../../../../sharedComponents/stars';

// Icons
import { Octicons } from '@expo/vector-icons';

// Styles
import globalStyles from '../../../../styles/globalStyles';
import courseReviewsStyles from '../../../../styles/courseReviewsStyles';

// Data
import envData from '../../../../data/env';

export default function Courses() {

    // Context
    const { user } = useContext(UserContext);
    const { courseName } = useContext(CourseContext);

    // Hooks
    const navigation = useNavigation();

    // Comments
    // State
    const [comments, setComments] = useState(
        []
    );

    // Fetch
    async function getComments(courseName: string) {
        try {
            let queryRoute: string = "/course/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${courseName}/comment`
            );

            const result = await fetchRes.json();
            setComments(result.comments);
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getComments(courseName);
        }, [courseName])
    );

    return (
        <View style={globalStyles.container}>

            <FlatList
                keyExtractor={(item) => item.user_id.toString().concat(item.comment)}
                data={comments}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}

                ListHeaderComponent={
                    <TouchableOpacity
                        style={courseReviewsStyles.goBackButton}
                        onPress={() => navigation.pop()
                        }
                    >
                        <Text style={courseReviewsStyles.goBackText}>返回</Text>
                    </TouchableOpacity>
                }

                ItemSeparatorComponent={() => (
                    <View style={courseReviewsStyles.separator}></View>
                )}

                renderItem={({ item }) => (
                    <View
                        style={courseReviewsStyles.commentBox}
                    >
                        <Text style={courseReviewsStyles.infoText}>{item.comment}</Text>
                        <View style={courseReviewsStyles.infoComment}>
                            <View style={{ marginRight: 16 }}>
                                <Stars score={item.rated_score} />
                            </View>
                            <Octicons name="dash" size={16} color="#666666" />
                            <Text style={{ ...courseReviewsStyles.infoText, ...courseReviewsStyles.infoCommentUser }}>{item.user_name}</Text>
                        </View>
                    </View>
                )}
            />

        </View >
    )
}
