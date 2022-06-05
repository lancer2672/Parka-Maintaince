import { Feather } from "@expo/vector-icons";
import SelectableTimeItem from "@src/components/Booking/SelectableTimeItem";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectReservation, selectTimeFrames } from "@src/store/selectors";
import { reservationActions } from "@src/store/slices/reservationSlice";
import { ColorHelper, CurrencyHelper, DateTimeHelper } from "@src/utils";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const minuteInterval = 10;

const ReserveParkingScreen = ({ navigation }: any) => {
  const [isDateVisible, setDateVisible] = useState<boolean>(false);
  const [isTimeVisible, setTimeVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const reservationState = useAppSelector(selectReservation);
  const timeFrames = useAppSelector(selectTimeFrames);

  const handleConfirmDate = (date: Date) => {
    dispatch(reservationActions.update({ field: "bookingDate", value: date }));
    setDateVisible(false);
  };

  const handleConfirmTime = (time: Date) => {
    dispatch(reservationActions.update({ field: "startTime", value: time }));
    setTimeVisible(false);
  };

  const navigateNext = () => {
    if (
      reservationState.bookingDate &&
      reservationState.startTime &&
      reservationState.timeFrame
    ) {
      navigation.navigate("SelectParkingSlotScreen");
    } else {
      Alert.alert("You must select booking time!");
    }
  };

  const onSelectTimeFrame = (timeFrame: TimeFrame) => {
    dispatch(
      reservationActions.update({ field: "timeFrame", value: timeFrame }),
    );
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <ScrollView
        style={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Start time</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={() => setDateVisible(true)}>
            <Text style={styles.date}>
              {DateTimeHelper.formatDate(reservationState.bookingDate)}
            </Text>
            <Feather name="calendar" size={20} color={Colors.light.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateContainer, { marginLeft: 12 }]}
            onPress={() => setTimeVisible(true)}>
            <Text style={styles.date}>
              {DateTimeHelper.formatTime(reservationState.startTime)}
            </Text>
            <Feather name="clock" size={20} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          date={reservationState.bookingDate}
          isVisible={isDateVisible}
          mode="date"
          minimumDate={new Date()}
          onConfirm={handleConfirmDate}
          onCancel={() => setDateVisible(false)}
        />
        <DateTimePickerModal
          date={reservationState.startTime}
          isVisible={isTimeVisible}
          mode="time"
          minuteInterval={minuteInterval}
          onConfirm={handleConfirmTime}
          onCancel={() => setTimeVisible(false)}
        />
        <Text style={styles.title}>Duration</Text>
        <FlatList
          data={timeFrames}
          keyExtractor={(item) => item.idTimeFrame}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <SelectableTimeItem
              item={item}
              selectedId={reservationState?.timeFrame?.idTimeFrame}
              onSelect={() => onSelectTimeFrame(item)}
            />
          )}
        />
        <Text style={styles.title}>Total</Text>
        <Text style={styles.total}>
          {CurrencyHelper.formatVND(reservationState.timeFrame?.cost) || "0₫"}
        </Text>
      </ScrollView>
      <AppButton style={styles.continueButton} onPress={navigateNext}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default ReserveParkingScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    color: Colors.light.heading,
  },
  dateContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.subtitle, 0.1),
    borderRadius: 6,
  },
  date: { fontSize: 16, color: Colors.light.text },
  total: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.primary,
    textAlign: "right",
  },
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
});
