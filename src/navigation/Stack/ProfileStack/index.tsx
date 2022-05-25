import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@src/constants";
import ProfileScreen from "@src/screens/ProfileScreen";
import PersonalScreen from "@src/screens/ProfileScreen/PersonalScreen";
import VehicleScreen from "@src/screens/VehicleScreen";
import AddVehicleScreen from "@src/screens/VehicleScreen/AddVehicleScreen";
import React from "react";
import { ProfileStackParams } from "../types";

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
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
      <Stack.Screen
        name="VehicleScreen"
        component={VehicleScreen}
        options={{
          title: "Vehicles",
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTitleStyle: {
            color: Colors.light.background,
          },
        }}
      />
      <Stack.Screen
        name="AddVehicleScreen"
        component={AddVehicleScreen}
        options={{
          title: "Add a vehicle",
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
