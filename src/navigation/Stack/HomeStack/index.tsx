import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParams } from "../types";
import React from "react";
import HomeScreen from "@src/screens/HomeScreen";
import ParkingDetailsScreen from "@src/screens/Booking/ParkingDetailsScreen";
import { Colors } from "@src/constants";
import SelectVehicleScreen from "@src/screens/Booking/SelectVehicleScreen";
import AddVehicleScreen from "@src/screens/VehicleScreen/AddVehicleScreen";
import ReserveParkingScreen from "@src/screens/Booking/ReserveParkingScreen";

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.light.background,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ParkingDetailsScreen"
        component={ParkingDetailsScreen}
        options={{
          title: "Parking details",
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTitleStyle: {
            color: Colors.light.background,
          },
        }}
      />
      <Stack.Screen
        name="SelectVehicleScreen"
        component={SelectVehicleScreen}
        options={{
          title: "Select your vehicle",
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
      <Stack.Screen
        name="ReserveParkingScreen"
        component={ReserveParkingScreen}
        options={{
          title: "Reserve parking",
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

export default HomeStack;
