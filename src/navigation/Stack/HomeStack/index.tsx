import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@src/screens/HomeScreen";
import { HomeStackParams } from "../types";
import React from "react";

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
