import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingHistoryScreen from "@src/screens/BookingHistoryScreen";
import { BookingHistoryStackParams } from "../types";

const Stack = createNativeStackNavigator<BookingHistoryStackParams>();

const BookingHistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookingHistoryScreen"
        component={BookingHistoryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BookingHistoryStack;
