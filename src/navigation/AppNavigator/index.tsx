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
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectUser } from "@src/store/selectors";
import { userActions } from "@src/store/slices/userSlice";

const Stack = createNativeStackNavigator<AppStackParams>();

const AppNavigator = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const [isFirstLaunched, setIsFirstLaunched] = useState<boolean>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkFirstLaunched = async () => {
      const isFirst = await AsyncStorage.getItem("isFirstLaunched");
      if (isFirst == null) {
        setIsFirstLaunched(true);
        AsyncStorage.setItem("isFirstLaunched", "false");
      } else {
        setIsFirstLaunched(false);
      }
    };

    const getUser = async () => {
      if (!userState) {
        const idUser = await AsyncStorage.getItem("idUser");
        if (idUser) {
          dispatch(userActions.getUser(JSON.parse(idUser)))
            .unwrap()
            .then(() => {
              setIsLogged(true);
            });
        }
      }
    };

    checkFirstLaunched();
    getUser();
  }, []);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunched && (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
        {!isLogged && (
          <Stack.Group>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
          </Stack.Group>
        )}
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
