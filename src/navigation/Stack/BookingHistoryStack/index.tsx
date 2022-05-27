import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@src/constants";
import BookingHistoryScreen from "@src/screens/BookingHistoryScreen";
import { BookingHistoryStackParams } from "../types";
import React from "react";

const Stack = createNativeStackNavigator<BookingHistoryStackParams>();

const BookingHistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookingHistoryScreen"
        component={BookingHistoryScreen}
        options={{
          title: "My booking",
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

export default BookingHistoryStack;
