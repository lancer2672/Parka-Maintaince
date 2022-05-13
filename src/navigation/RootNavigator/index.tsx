import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotFoundScreen from "@src/screens/NotFoundScreen";
import OnboardingScreen from "@src/screens/Onboarding";
import { useEffect, useState } from "react";
import { RootStackParamList } from "types";
import BottomTabNavigator from "../BottomTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
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
    <Stack.Navigator>
      {/* {isFirstLaunched ? ( */}
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      {/* ) : (
        <></>
      )} */}
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
