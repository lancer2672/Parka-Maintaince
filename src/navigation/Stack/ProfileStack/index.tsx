import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "@src/screens/ProfileScreen";
import { ProfileStackParams } from "../types";

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
