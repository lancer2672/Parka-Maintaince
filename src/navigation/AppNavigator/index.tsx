import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotFoundScreen from "@src/screens/NotFoundScreen";
import OnboardingScreen from "@src/screens/Onboarding";
import React, { useEffect, useState } from "react";
import { ColorSchemeName } from "react-native";
import { AppStackParams } from "./types";
import AppTabNavigator from "../AppTabNavigator";
import LinkingConfiguration from "../LinkingConfiguration";

const Stack = createNativeStackNavigator<AppStackParams>();

const AppNavigator = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const [isFirstLaunched, setIsFirstLaunched] = useState<boolean>(null);

  useEffect(() => {
    async () => {
      const data = await AsyncStorage.getItem("isFirstLaunched");
      if (data == null) {
        setIsFirstLaunched(true);
        AsyncStorage.setItem("isFirstLaunched", "false");
      } else {
        setIsFirstLaunched(false);
      }
    };
  }, []);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        {/* Authentication
        <Stack.Group>
          <Stack.Screen></Stack.Screen>
        </Stack.Group> */}
        <Stack.Screen
          name="App"
          component={AppTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
