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
import SignIn from "@src/screens/Authentication/SignIn";
import SignUp from "@src/screens/Authentication/SignUp";
import ResetPassword from "@src/screens/Authentication/ResetPassword";
import Verification from "@src/screens/Authentication/Verification";
import ChangePassword from "@src/screens/Authentication/ChangePassword";

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunched && (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="App" component={AppTabNavigator} />
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
