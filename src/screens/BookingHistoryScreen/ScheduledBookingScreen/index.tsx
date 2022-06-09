import AsyncStorage from "@react-native-async-storage/async-storage";
import ScheduleBookingItem from "@src/components/BookingHistory/ScheduleBookingItem";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectUser } from "@src/store/selectors";
import { reservationActions } from "@src/store/slices/reservationSlice";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

type Props = {
  reservations: Reservation[];
  navigation: any;
};

const ScheduledBookingScreen = ({ reservations, navigation }: Props) => {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const userState = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const onRefresh = () => {
    (async () => {
      let idUser;
      if (userState?.idUser) {
        idUser = await AsyncStorage.getItem("idUser");
      }
      setRefreshing(true);
      dispatch(
        reservationActions.getReservations(userState?.idUser || idUser),
      ).finally(() => setRefreshing(false));
    })();
  };

  const navigationTicket = (item: any) => {
    navigation.navigate("BookingTicketScreen", item);
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={reservations}
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
