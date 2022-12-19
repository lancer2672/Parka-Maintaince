import AsyncStorage from "@react-native-async-storage/async-storage";
import { isFulfilled } from "@reduxjs/toolkit";
import HistoryBookingItem from "@src/components/BookingHistory/HistoryBookingItem";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectReservationsCompleted, selectUser } from "@src/store/selectors";
import { reservationActions } from "@src/store/slices/reservationSlice";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

type Props = {
  navigation: any;
};

const HistoryBookingScreen = ({ navigation }: Props) => {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.reservation.status);
  const reservationsCompletedState = useAppSelector(
    selectReservationsCompleted,
  );

  const [historyBooking, setHistoryBooking] = useState<Reservation[]>();

  const onRefresh = () => {
    (async () => {
      let idUser;
      if (userState?.idUser) {
        idUser = await AsyncStorage.getItem("idUser");
      }
      setRefreshing(true);
      dispatch(
        reservationActions.getReservationsCompleted(
          userState?.idUser || idUser,
        ),
      ).finally(() => setRefreshing(false));
    })();
  };

  const navigationTicket = (item: any) => {
    navigation.navigate("BookingTicketScreen", item);
  };

  useEffect(() => {
    if (status) {
      dispatch(reservationActions.getReservationsCompleted(userState?.idUser));
    }
  }, [status]);

  useEffect(() => {
    const history: Reservation[] = [];

    if (reservationsCompletedState.length > 0) {
      reservationsCompletedState.map((reservation: Reservation) => {
        history.push(reservation);
      });
    }
    setHistoryBooking(history);
  }, [reservationsCompletedState]);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={historyBooking}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.idParkingReservation}
        renderItem={({ item }) => (
          <HistoryBookingItem
            onViewTicket={() => navigationTicket(item)}
            item={item}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HistoryBookingScreen;