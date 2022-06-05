import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParams } from "../types";
import React from "react";
import HomeScreen from "@src/screens/HomeScreen";
import ParkingDetailsScreen from "@src/screens/Booking/ParkingDetailsScreen";
import { Colors } from "@src/constants";
import SelectVehicleScreen from "@src/screens/Booking/SelectVehicleScreen";
import AddVehicleScreen from "@src/screens/VehicleScreen/AddVehicleScreen";
import ReserveParkingScreen from "@src/screens/Booking/ReserveParkingScreen";
import SelectParkingSlotScreen from "@src/screens/Booking/SelectParkingSlotScreen";
import SelectPaymentScreen from "@src/screens/Booking/SelectPaymentScreen";
import SummaryScreen from "@src/screens/Booking/SummaryScreen";
import ParkingTicketScreen from "@src/screens/Booking/ParkingTicketScreen";

const Stack = createNativeStackNavigator<HomeStackParams>();

const headerOption = {
  headerStyle: {
    backgroundColor: Colors.light.primary,
  },
  headerTitleStyle: {
    color: Colors.light.background,
  },
};

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
        options={{
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="ParkingDetailsScreen"
        component={ParkingDetailsScreen}
        options={{
          title: "Parking details",
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="SelectVehicleScreen"
        component={SelectVehicleScreen}
        options={{
          title: "Select your vehicle",
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="AddVehicleScreen"
        component={AddVehicleScreen}
        options={{
          title: "Add a vehicle",
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="ReserveParkingScreen"
        component={ReserveParkingScreen}
        options={{
          title: "Reserve parking",
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="SelectParkingSlotScreen"
        component={SelectParkingSlotScreen}
        options={{
          title: "Select parking slot",
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="SelectPaymentScreen"
        component={SelectPaymentScreen}
        options={{
          title: "Select payment method",
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="SummaryScreen"
        component={SummaryScreen}
        options={{
          title: "Review summary",
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="ParkingTicketScreen"
        component={ParkingTicketScreen}
        options={{
          title: "Parking ticket",
          ...headerOption,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
