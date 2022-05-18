import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ProfileAction from "@src/components/Profile/ProfileAction";
import { Colors } from "@src/constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";

const actions = [
  {
    text: "Personal information",
    screen: "PersonalScreen",
    icon: <FontAwesome5 name="user" size={20} color={Colors.light.primary} />,
  },
  {
    text: "Payment",
    screen: "HomeScreen",
    icon: (
      <AntDesign name="creditcard" size={20} color={Colors.light.primary} />
    ),
  },
  {
    text: "Favorite",
    screen: "HomeScreen",
    icon: <FontAwesome name="heart-o" size={20} color={Colors.light.primary} />,
  },
  {
    text: "Setting",
    screen: "HomeScreen",
    icon: (
      <MaterialCommunityIcons
        name="cog-outline"
        size={20}
        color={Colors.light.primary}
      />
    ),
  },
];

const ProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scroll}
        bounces={true}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://banner2.cleanpng.com/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg",
          }}
        />
        {actions.map((action) => (
          <ProfileAction
            key={action.text}
            navigation={navigation}
            text={action.text}
            screen={action.screen}
            icon={action.icon}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F7FB",
    flex: 1,
  },
  scroll: {
    padding: 20,
    // backgroundColor: "#25AFF3",
    // alignItems: "center",
  },
  heading: {
    alignSelf: "center",
    // backgroundColor: "#333",
  },
  avatar: {
    alignSelf: "center",
    height: 100,
    width: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
});
