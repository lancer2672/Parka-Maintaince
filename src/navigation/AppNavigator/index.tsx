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
import SignIn from "@src/screens/SignIn";
import QRCode from "@src/components/QRCode";
import ParkingReservationDetail from "@src/components/QRCode/ParkingReservationDetail";

const Stack = createNativeStackNavigator<AppStackParams>();

const AppNavigator = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const [isFirstLaunched, setIsFirstLaunched] = useState<boolean>(null);
  const [isRememberedAccount, setIsRememberedAccount] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("isFirstLaunched");
      if (data == null) {
        setIsFirstLaunched(true);
        AsyncStorage.setItem("isFirstLaunched", "false");
      } else {
        setIsFirstLaunched(false);
      }
    })();

    (async () => {
      const email = await AsyncStorage.getItem("email");
      const password = await AsyncStorage.getItem("password");
      if (email && password) {
        setIsRememberedAccount(true);
      }
    })();
  }, []);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunched && (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
        {!isRememberedAccount && (
          <Stack.Screen name="SignIn" component={SignIn} />
        )}
        <Stack.Screen name="App" component={AppTabNavigator} />
        <Stack.Screen name="QRCode" component={QRCode} />
        <Stack.Screen
          name="ParkingReservationDetail"
          component={ParkingReservationDetail}
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
