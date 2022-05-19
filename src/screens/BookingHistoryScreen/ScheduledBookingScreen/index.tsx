import ActiveBookingItem from "@src/components/Booking/ActiveBookingItem";
import React from "react";
import { Text, View } from "react-native";

const ScheduledBookingScreen = () => {
  return (
    <View>
      <Text>Scheduled Booking Screen</Text>
      <ActiveBookingItem />
    </View>
  );
};

export default ScheduledBookingScreen;
