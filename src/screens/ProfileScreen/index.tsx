import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AppButton from "@src/components/common/AppButton";
import ProfileAction from "@src/components/Profile/ProfileAction";
import { Colors } from "@src/constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LogoutIcon } from "react-native-heroicons/outline";

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
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Log out</Text>
            <LogoutIcon color={Colors.light.primary} size={22} />
          </View>
        </TouchableOpacity>
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
  },
  heading: {
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    height: 100,
    width: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "#D9DFE7",
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.light.background,
    marginTop: 20,
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  buttonContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.light.primary,
    fontSize: 18,
    fontWeight: "600",
    marginRight: 12,
  },
});
