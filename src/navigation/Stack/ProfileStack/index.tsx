import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@src/constants";
import ProfileScreen from "@src/screens/ProfileScreen";
import PersonalScreen from "@src/screens/ProfileScreen/PersonalScreen";
import React from "react";
import { ProfileStackParams } from "../types";

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: true,
        headerTintColor: Colors.light.background,
      }}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTitleStyle: {
            color: Colors.light.background,
          },
        }}
      />
      <Stack.Screen
        name="PersonalScreen"
        component={PersonalScreen}
        options={{
          title: "Personal information",
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTitleStyle: {
            color: Colors.light.background,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
