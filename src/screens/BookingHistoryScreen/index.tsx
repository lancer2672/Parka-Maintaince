import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import TabBarBooking from "@src/components/BookingHistory/TabBarBooking";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectReservations, selectUser } from "@src/store/selectors";
import { reservationActions } from "@src/store/slices/reservationSlice";
import dayjs from "dayjs";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import HistoryBookingScreen from "./HistoryBookingScreen";
import ScheduledBookingScreen from "./ScheduledBookingScreen";

const Tab = createMaterialTopTabNavigator();

const BookingHistoryScreen = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);
  const reservationsState = useAppSelector(selectReservations);
  const [scheduleBooking, setScheduleBooking] = useState<Reservation[]>();
  const [historyBooking, setHistoryBooking] = useState<Reservation[]>();

  useEffect(() => {
    const history: Reservation[] = [];
    const schedule: Reservation[] = [];

    const isAfter = (date: any, endTime: any) => {
      if (dayjs(date).isBefore(dayjs())) {
        return true;
      } else if (dayjs(date).isSame(dayjs())) {
        const hour = endTime.substring(0, 2);
        const mins = endTime.substring(3, 5);
        const endDate = dayjs().set({ hour: hour, mins: mins });

        if (endDate.isBefore(dayjs())) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    if (reservationsState.length > 0) {
      reservationsState.map((reservation: Reservation) => {
        if (
          reservation.status == "end" ||
          isAfter(reservation.bookingDate, reservation.endTime)
        ) {
          history.push(reservation);
        } else {
          schedule.push(reservation);
        }
      });
    }
    setScheduleBooking(schedule);
    setHistoryBooking(history);
  }, [reservationsState]);

  useEffect(() => {
    dispatch(reservationActions.getReservations(userState?.idUser));
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: Colors.light.background }}
        tabBar={(props: MaterialTopTabBarProps) => (
          <TabBarBooking {...props} />
        )}>
        <Tab.Screen name="SCHEDULED PARKINGS">
          {(props) => (
            <ScheduledBookingScreen {...props} reservations={scheduleBooking} />
          )}
        </Tab.Screen>
        <Tab.Screen name="PARKING HISTORY">
          {(props) => (
            <HistoryBookingScreen {...props} reservations={historyBooking} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default BookingHistoryScreen;
