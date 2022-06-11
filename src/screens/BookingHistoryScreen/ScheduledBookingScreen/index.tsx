import AsyncStorage from "@react-native-async-storage/async-storage";
import ScheduleBookingItem from "@src/components/BookingHistory/ScheduleBookingItem";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectReservationsScheduled, selectUser } from "@src/store/selectors";
import { reservationActions } from "@src/store/slices/reservationSlice";
import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

type Props = {
  navigation: any;
};

const ScheduledBookingScreen = ({ navigation }: Props) => {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const userState = useAppSelector(selectUser);
  const reservationsScheduledState = useAppSelector(
    selectReservationsScheduled,
  );
  const [scheduleBooking, setScheduleBooking] = useState<Reservation[]>();
  const dispatch = useAppDispatch();

  const onRefresh = () => {
    (async () => {
      let idUser;
      if (userState?.idUser) {
        idUser = await AsyncStorage.getItem("idUser");
      }
      setRefreshing(true);
      dispatch(
        reservationActions.getReservationsScheduled(
          userState?.idUser || idUser,
        ),
      ).finally(() => setRefreshing(false));
    })();
  };

  const navigationTicket = (item: any) => {
    navigation.navigate("BookingTicketScreen", item);
  };
  useEffect(() => {
    dispatch(reservationActions.getReservationsScheduled(userState?.idUser));
  }, []);

  useEffect(() => {
    const schedule: Reservation[] = [];

    // const isAfter = (date: any, endTime: any) => {
    //   if (dayjs(date).isBefore(dayjs())) {
    //     return true;
    //   } else if (dayjs(date).isSame(dayjs())) {
    //     const hour = endTime.substring(0, 2);
    //     const mins = endTime.substring(3, 5);
    //     const endDate = dayjs().set({ hour: hour, mins: mins });

    //     if (endDate.isBefore(dayjs())) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } else {
    //     return false;
    //   }
    // };

    if (reservationsScheduledState.length > 0) {
      reservationsScheduledState.map((reservation: Reservation) => {
        schedule.push(reservation);
      });
    }
    setScheduleBooking(schedule);
  }, [reservationsScheduledState]);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1, padding: 20 }}
        data={scheduleBooking}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.idParkingReservation}
        renderItem={({ item }) => (
          <ScheduleBookingItem
            onViewTicket={() => navigationTicket(item)}
            item={item}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ScheduledBookingScreen;
