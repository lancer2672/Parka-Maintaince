import AsyncStorage from "@react-native-async-storage/async-storage";
import { Images } from "@src/assets";
import AppButton from "@src/components/common/AppButton";
import AppModalMessage from "@src/components/common/AppModalMessage";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking, selectUser } from "@src/store/selectors";
import { bookingActions } from "@src/store/slices/bookingSlice";
import { reservationActions } from "@src/store/slices/reservationSlice";
import { CurrencyHelper, DateTimeHelper } from "@src/utils";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.flexRow}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const SummaryScreen = ({ navigation }: any) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const bookingState = useAppSelector(selectBooking);
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const confirmBooking = async () => {
    const idUser = await AsyncStorage.getItem("idUser");

    dispatch(
      reservationActions.createReservation({
        idVehicle: bookingState.vehicle?.idVehicle,
        idUser: userState?.idUser || JSON.parse(idUser),
        idParkingSlot: bookingState.parkingSlot?.idParkingSlot,
        idTimeFrame: bookingState.timeFrame?.idTimeFrame,
        startTime: dayjs(bookingState.startTime).format("HH:mm:ss"),
        bookingDate: bookingState.bookingDate,
        duration: bookingState.timeFrame.duration,
      }),
    )
      .unwrap()
      .then((res) => {
        setSuccess(true);
        dispatch(
          bookingActions.update({
            field: "idParkingReservation",
            value: res.idParkingReservation,
          }),
        );
      })
      .catch(() => {
        setSuccess(false);
      })
      .finally(() => {
        setVisible(true);
      });
  };

  const navigateNext = (isSuccess: boolean) => {
    setVisible(false);
    if (isSuccess) {
      navigation.navigate("ParkingTicketScreen");
    } else {
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Item title={"Parking area"} value={bookingState.parkingLot?.name} />
          <Item title={"Address"} value={bookingState.parkingLot?.address} />
          <Item
            title={"Vehicle"}
            value={`${bookingState.vehicle?.name} (${bookingState.vehicle?.number})`}
          />
          <Item title={"Parking spot"} value={"A01"} />
          <Item
            title={"Date"}
            value={DateTimeHelper.formatDate(bookingState.bookingDate)}
          />
          <Item
            title={"Duration"}
            value={bookingState.timeFrame?.duration.toString()}
          />
          <Item
            title={"Hours"}
            value={DateTimeHelper.formatTime(bookingState.startTime)}
          />
        </View>
        <View style={styles.card}>
          <Item
            title={"Amount"}
            value={CurrencyHelper.formatVND(bookingState.timeFrame?.cost)}
          />
          {/* <Item title={"Fees"} value={"20.000 ₫"} /> */}
          <Text style={styles.dash} ellipsizeMode="clip" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - -
          </Text>
          <Item
            title={"Total"}
            value={CurrencyHelper.formatVND(bookingState.timeFrame?.cost)}
          />
        </View>
        <View
          style={[
            styles.card,
            styles.flexRow,
            { alignItems: "center", marginBottom: 60 },
          ]}>
          <Image source={Images.Money} style={styles.image} />
          <View style={styles.wrapper}>
            <Text style={styles.cash} numberOfLines={2}>
              Cash
            </Text>
          </View>
        </View>
      </ScrollView>
      <AppButton style={styles.continueButton} onPress={confirmBooking}>
        <Text style={styles.countinueText}>Confirm payment</Text>
      </AppButton>
      <AppModalMessage
        isVisible={isVisible}
        isSuccess={isSuccess}
        onOk={() => navigateNext(isSuccess)}
        okText={isSuccess ? "View parking ticket" : "Back to home"}
        message={
          isSuccess
            ? "Successfully made parking reservation"
            : "There is an error!"
        }
      />
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
    shadowColor: "#6F7EC9",
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  title: { fontSize: 15, fontWeight: "500", color: Colors.light.subtitle },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "right",
    flex: 1,
  },
  dash: { color: Colors.light.subtitle },
  image: { width: 34, height: 34, marginVertical: 8 },
  wrapper: { flex: 1, marginHorizontal: 16 },
  continueButton: {
    marginTop: 12,
    position: "absolute",
    bottom: 10,
    right: 20,
    left: 20,
  },
  countinueText: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "600",
  },
  cash: { fontSize: 18, fontWeight: "600", color: Colors.light.text },
});
