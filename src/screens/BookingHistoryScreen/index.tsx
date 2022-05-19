import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import TabBarBooking from "@src/components/Booking/TabBarBooking";
import React from "react";
import ActiveBookingScreen from "./ActiveBookingScreen";
import HistoryBookingScreen from "./HistoryBookingScreen";
import ScheduledBookingScreen from "./ScheduledBookingScreen";

const Tab = createMaterialTopTabNavigator();

const BookingHistoryScreen = () => {
  return (
    <Tab.Navigator
      tabBar={(props: MaterialTopTabBarProps) => <TabBarBooking {...props} />}>
      <Tab.Screen name="Scheduled" component={ScheduledBookingScreen} />
      <Tab.Screen name="Active" component={ActiveBookingScreen} />
      <Tab.Screen name="History" component={HistoryBookingScreen} />
    </Tab.Navigator>
  );
};

export default BookingHistoryScreen;
