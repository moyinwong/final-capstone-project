// React, React Native
import React, { useState, useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Pressable, TextInput, Alert } from 'react-native';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Context
import { UserContext } from '../../../../contexts/userContext';
import { CourseContext } from '../../../../contexts/courseContext';

// Components
import Stars from '../../../../sharedComponents/stars';

// Icons
import { FontAwesome, Octicons } from '@expo/vector-icons';

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

    // Review Right?
    const [isTutor, setIsTutor] = useState(
        false
    );
    const [reviewed, setReviewed] = useState(
        false
    );

    // Show Modal
    const [displayModal, setDisplayModal] = useState(
        false
    );
    const [textInputValue, setTextInputValue] = useState(
        ''
    );
    const [ratingValue, setRatingValue] = useState(
        0
    )

    async function submitReview() {
        if ((textInputValue == '') && (ratingValue == 0)) {
            Alert.alert(
                "未填寫評價及評分",
                "請先填寫評價及評分",
                [
                    {
                        text: "取消",
                        onPress: () => console.log("取消"),
                        style: "cancel"
                    },
                ],
                { cancelable: true }
            )
            return;

        } else if (textInputValue == '') {
            Alert.alert(
                "未填寫評價",
                "請先填寫評價",
                [
                    {
                        text: "取消",
                        onPress: () => console.log("取消"),
                        style: "cancel"
                    },
                ],
                { cancelable: true }
            )
            return;

        } else if (ratingValue == 0) {
            Alert.alert(
                "未評分",
                "請先評分",
                [
                    {
                        text: "取消",
                        onPress: () => console.log("取消"),
                        style: "cancel"
                    },
                ],
                { cancelable: true }
            )
            return;
        }

        setDisplayModal(false);

        try {
            const fetchBody = {
                userEmail: user.email,
                courseName: courseName,
                textInputValue,
                ratingValue,
            };

            const queryRoute = "/course/comment/update";
            const res = await fetch(`${envData.REACT_APP_BACKEND_URL}${queryRoute}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    ...fetchBody
                }),
            });

            console.log(fetchBody);

            const result = await res.json();
            console.log(result);

            if (
                res.status === 500 ||
                res.status === 401 ||
                res.status === 400
            ) {
                throw new Error(result.message);
            } else {
                getComments(courseName);
                getAccessRight(courseName);

                Alert.alert(
                    "評價成功",
                    "已成功評價",
                    [
                        {
                            text: "取消",
                            onPress: () => console.log("取消"),
                            style: "cancel"
                        },
                    ],
                    { cancelable: true }
                )
            }

        } catch (err) {
            console.log(err);
            Alert.alert(
                "評價失敗",
                "未能評價, 請再試一次",
                [
                    {
                        text: "取消",
                        onPress: () => console.log("取消"),
                        style: "cancel"
                    },
                ],
                { cancelable: true }
            )
        }
    }

    // Comments
    // State
    const [comments, setComments] = useState(
        []
    );

    interface IComment {
        comment?: string | null
        rated_score?: string | number | null
        user_id: number | null
        user_name: string | null
    }

    // Fetch
    async function getComments(courseName: string) {
        try {
            let queryRoute: string = "/course/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${courseName}/comment`
            );

            const result = await fetchRes.json();

            let filteredComments = result.comments.filter((item: IComment) =>
                item.comment != null && item.rated_score != null
            )

            setComments(filteredComments);
        } catch (err) {
            console.log(err);
        }
    }

    // Access Right
    // State
    const [accessRight, setAccessRight] = useState(
        false
    );

    // Fetch
    async function getAccessRight(courseName: string) {
        try {
            let queryRoute: string = "/lesson/summary/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${courseName}/${user.email}`
            );

            const result = await fetchRes.json();

            if (result.lessons[0].user_email) {
                setAccessRight(true);
            };

            if (result.lessons[0].tutor_id == user.userId) {
                setIsTutor(true);
            } else if (result.lessons[0].comment) {
                setReviewed(true);
            }

        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getComments(courseName);
            getAccessRight(courseName);
        }, [courseName])
    );

    return (
        <View style={globalStyles.container}>

            <Modal
                style={courseReviewsStyles.modal}
                animationType="fade"
                transparent={true}
                visible={displayModal}
                onDismiss={() => setDisplayModal(false)}
            >
                <Pressable
                    style={courseReviewsStyles.modalTransBackground}
                    onPress={() => setDisplayModal(false)}
                >
                    <View style={courseReviewsStyles.modalBox}>

                        <View>
                            <Text style={courseReviewsStyles.modalTitleText}>請填寫評價</Text>
                        </View>

                        <View>
                            <TextInput
                                style={courseReviewsStyles.textInput}
                                value={textInputValue}
                                onChangeText={text => setTextInputValue(text)}
                                multiline={true}
                            />
                        </View>

                        <View style={courseReviewsStyles.starsContainer}>
                            <Text style={courseReviewsStyles.ratingText}>評分: </Text>

                            <TouchableOpacity
                                style={courseReviewsStyles.starHolder}
                                onPress={() => setRatingValue(1)}
                            >
                                {(ratingValue >= 1) ? (
                                    <FontAwesome name="star" size={25} color="#fadd4d" />
                                ) : (
                                        <FontAwesome name="star" size={25} color="#cfd9ea" />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={courseReviewsStyles.starHolder}
                                onPress={() => setRatingValue(2)}
                            >
                                {(ratingValue >= 2) ? (
                                    <FontAwesome name="star" size={25} color="#fadd4d" />
                                ) : (
                                        <FontAwesome name="star" size={25} color="#cfd9ea" />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={courseReviewsStyles.starHolder}
                                onPress={() => setRatingValue(3)}
                            >
                                {(ratingValue >= 3) ? (
                                    <FontAwesome name="star" size={25} color="#fadd4d" />
                                ) : (
                                        <FontAwesome name="star" size={25} color="#cfd9ea" />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={courseReviewsStyles.starHolder}
                                onPress={() => setRatingValue(4)}
                            >
                                {(ratingValue >= 4) ? (
                                    <FontAwesome name="star" size={25} color="#fadd4d" />
                                ) : (
                                        <FontAwesome name="star" size={25} color="#cfd9ea" />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={courseReviewsStyles.starHolder}
                                onPress={() => setRatingValue(5)}
                            >
                                {(ratingValue >= 5) ? (
                                    <FontAwesome name="star" size={25} color="#fadd4d" />
                                ) : (
                                        <FontAwesome name="star" size={25} color="#cfd9ea" />
                                    )}
                            </TouchableOpacity>

                        </View>

                        <View style={courseReviewsStyles.submitButtonContainer}>
                            <TouchableOpacity
                                style={courseReviewsStyles.reviewButton}
                                onPress={() => submitReview()}
                            >
                                <Text style={courseReviewsStyles.reviewText}>提交</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Pressable>
            </Modal>

            <FlatList
                keyExtractor={(item) => item.user_id.toString().concat(item.comment)}
                data={comments}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}

                ListHeaderComponent={
                    <View>
                        <TouchableOpacity
                            style={courseReviewsStyles.goBackButton}
                            onPress={() => navigation.pop()}
                        >
                            <Text style={courseReviewsStyles.goBackText}>返回</Text>
                        </TouchableOpacity>

                        {accessRight && (
                            isTutor ? (
                                <View style={courseReviewsStyles.reviewButtonContainer}>
                                    <View style={courseReviewsStyles.reviewNotAllowedButton}>
                                        <Text style={courseReviewsStyles.reviewNotAllotedText}>導師不能評價</Text>
                                    </View>
                                </View>
                            ) : (
                                    reviewed ? (
                                        < View style={courseReviewsStyles.reviewButtonContainer}>
                                            <View style={courseReviewsStyles.reviewNotAllowedButton}>
                                                <Text style={courseReviewsStyles.reviewNotAllotedText}>已評價</Text>
                                            </View>
                                        </View>
                                    ) : (
                                            < View style={courseReviewsStyles.reviewButtonContainer}>
                                                <TouchableOpacity
                                                    style={courseReviewsStyles.reviewButton}
                                                    onPress={() => setDisplayModal(true)}
                                                >
                                                    <Text style={courseReviewsStyles.reviewText}>新増評價</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                )

                        )}

                    </View>
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
