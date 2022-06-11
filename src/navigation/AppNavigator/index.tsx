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
import { Colors } from "@src/constants";

const Stack = createNativeStackNavigator<AppStackParams>();

const headerOption = {
  headerShown: false,
};
const AppNavigator = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const [isFirstLaunched, setIsFirstLaunched] = useState<boolean>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
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
      const idUser = await AsyncStorage.getItem("idUser");
      if (idUser) {
        dispatch(userActions.getUser(idUser))
          .unwrap()
          .then(() => {
            setIsLogged(true);
          })
          .catch(() => {
            setIsLogged(false);
          });
      } else {
        setIsLogged(false);
      }
    };

    checkFirstLaunched();
    getUser();
  }, []);
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <Stack.Navigator>
        {/* {isFirstLaunched && ( */}
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={headerOption}
        />
        {/* )} */}
        {/* {!isLogged && (
          <Stack.Group> */}
        <Stack.Screen name="SignIn" component={SignIn} options={headerOption} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: "Sign up",
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            headerTitleStyle: {
              color: Colors.light.primary,
              fontSize: 20,
              fontWeight: "700",
            },
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTintColor: Colors.light.primary,
            headerTitleAlign: "left",
            contentStyle: {
              backgroundColor: Colors.light.background,
            },
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={headerOption}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={headerOption}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={headerOption}
        />
        {/* </Stack.Group>
        )} */}
        <Stack.Screen
          name="App"
          component={AppTabNavigator}
          options={headerOption}
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
