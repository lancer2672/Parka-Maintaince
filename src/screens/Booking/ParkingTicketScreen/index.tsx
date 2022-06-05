import { Images } from "@src/assets";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import React, { useCallback, useRef, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import DashedLine from "react-native-dashed-line";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";
import { useAppSelector } from "@src/store/hooks";
import { selectReservation, selectUser } from "@src/store/selectors";
import { DateTimeHelper } from "@src/utils";

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.flex}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.value} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const ParkingTicketScreen = () => {
  const ref = useRef(null);
  const [uri, setUri] = useState<string>(
    "https://shopping.saigoncentre.com.vn/Data/Sites/1/News/32/013.jpg",
  );

  const userState = useAppSelector(selectUser);
  const reservationState = useAppSelector(selectReservation);

  const onCapture = useCallback(() => {
    ref?.current.capture().then((uri: any) => {
      setUri(uri);
    });
    shareImage();
  }, []);

  const shareImage = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Sharing isn't available on your platform");
      return;
    }
    const imageProcess = await ImageManipulator.manipulateAsync(uri);
    await Sharing.shareAsync(imageProcess.uri);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}>
        <ViewShot
          style={{ flex: 1, paddingBottom: 100 }}
          ref={ref}
          options={{ format: "png", quality: 0.9 }}>
          <View style={styles.card}>
            <Text style={styles.note}>
              Scan this when you are in the parking lot
            </Text>
            <Image style={styles.code} source={Images.QR_Code} />
          </View>
          <DashedLine
            dashLength={10}
            dashThickness={3}
            dashGap={4}
            dashColor={Colors.light.primary}
            dashStyle={{ borderRadius: 8 }}
            style={styles.dash}
          />
          <View
            style={[
              styles.card,
              { alignItems: "flex-start", paddingVertical: 12 },
            ]}>
            <Item title={"Name"} value={userState?.displayName} />
            <Item
              title={"Parking area"}
              value={reservationState.parkingLot?.name}
            />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Item title={"Parking spot"} value={"A1"} />
                <Item
                  title={"Date"}
                  value={DateTimeHelper.formatDate(
                    reservationState.bookingDate,
                  )}
                />
                <Item
                  title={"Duration"}
                  value={reservationState.timeFrame?.duration.toString()}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Item
                  title={"Vehicle"}
                  value={`${reservationState.vehicle?.name} (${reservationState.vehicle?.number})`}
                />
                <Item
                  title={"Hours"}
                  value={DateTimeHelper.formatTime(reservationState.startTime)}
                />
                <Item title={"Phone number"} value={userState?.phoneNumber} />
              </View>
            </View>
          </View>
        </ViewShot>
      </ScrollView>
      <AppButton style={styles.continueButton} onPress={onCapture}>
        <Text style={styles.countinueText}>Capture ticket</Text>
      </AppButton>
    </View>
  );
};

export default ParkingTicketScreen;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: "#6F7EC9",
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: "center",
  },
  note: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.subtitle,
    marginBottom: 12,
  },
  code: { width: 180, height: 180 },
  dash: { marginHorizontal: 34 },
  bottom: {
    flexDirection: "row",
  },
  flex: {
    alignItems: "flex-start",
    marginVertical: 8,
  },
  title: { fontSize: 14, fontWeight: "500", color: Colors.light.subtitle },
  value: { fontSize: 16, fontWeight: "600", color: Colors.light.text },
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
