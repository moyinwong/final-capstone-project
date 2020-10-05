// React, React Native
import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Context
import { CartContext } from "../../../contexts/cartContext";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Functions
import showCommentOrRateBox from "../../../functions/showCommentOrRateBox";

// Styles
import globalStyles from "../../../styles/globalStyles";
import cartStyles from "../../../styles/cartStyles";

export default function Cart(props: { navigation: { goBack: () => void } }) {
  // Context
  const { cartList, cartSum, removeCartList } = useContext(CartContext);

  // Hooks
  const navigation = useNavigation();

  return (
    <View style={{ ...globalStyles.container, paddingHorizontal: 0 }}>
      <FlatList
        style={cartStyles.flatList}
        keyExtractor={(item) => item.id.toString()}
        data={cartList}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={globalStyles.myCoursesFooter}></View>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={cartStyles.courseBox}
            onPress={() =>
              navigation.navigate("Course", { courseName: item.course_name })
            }
            onLongPress={() => showCommentOrRateBox()}
          >
            <View style={cartStyles.coursePicContainer}>
              <Image
                style={cartStyles.coursePic}
                resizeMode="cover"
                source={{ uri: item.image }}
              />
            </View>

            <View style={cartStyles.courseInfoContainer}>
              <Text style={cartStyles.courseTitle}>{item.course_name}</Text>
              <View style={cartStyles.courseSubInfoContainer}>
                <View style={cartStyles.courseSubInfoTextContainer}>
                  <Text style={cartStyles.courseInfoText}>
                    {item.tutor_name}
                  </Text>
                  <Text style={cartStyles.courseInfoText}>
                    {item.course_description}
                  </Text>
                  <Text style={cartStyles.courseInfoText}>
                    {"總共堂數: " + item.lessons_number}
                  </Text>
                </View>

                <View style={cartStyles.courseSubInfoLowerContainer}>
                  <Text style={cartStyles.coursePrice}>
                    {"價錢: $" + item.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeCartList(item)}
                    style={cartStyles.deleteButton}
                  >
                    <MaterialIcons name="delete" size={27} color="#a5aebf" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={cartStyles.paymentContainer}>
        <View style={cartStyles.totalPriceContainer}>
          <Text style={cartStyles.totalPrice}>{"合共:"}</Text>
          <Text style={cartStyles.totalPrice}>{"$ " + cartSum}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={cartStyles.payButton}
            onPress={() => navigation.navigate("StripeForm")}
          >
            <Text style={cartStyles.payText}>付款</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
