import { Spinner } from "@nghinv/react-native-loading";
import { RouteProp } from "@react-navigation/native";
import { parkingReservationApi } from "@src/api";
import parkingSlipApi from "@src/api/parkingSlipApi";
import procedureApi from "@src/api/procedureApi";
import { Images } from "@src/assets";
import AppButton from "@src/components/common/AppButton";
import AppHeading from "@src/components/common/AppHeading";
import { Colors } from "@src/constants";
import { CurrencyHelper, DateTimeHelper } from "@src/utils";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.flexRow}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
interface IProps {
  navigation: NavigationScreenProp<any, any>;
  route: RouteProp<any, any>;
}

const ParkingReservationDetail = (props: IProps) => {
  const [reservation, setReservation] = useState<Ticket>(null);
  const routeData = props.route.params;
  const checkIn = async (idTicket: string) => {
    try {
      const res = await procedureApi.procedure(idTicket, "check_in");
      if (res.data.data) {
        Alert.alert("Check in successfully!");
        props.navigation.navigate("App");
      } else {
        Alert.alert(`${res.data.message}`);
        props.navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Fail");
      props.navigation.goBack();
    }
  };

  const checkOut = async (idTicket: string) => {
    try {
      const lateTime = dayjs(reservation.endTime)
        .add(10, "minute")
        .isBefore(new Date());
      const isCheckOut = await procedureApi.procedure(idTicket, "check_out");
      if (lateTime && isCheckOut.data.data) {
        Alert.alert("You are late!");
      }
      if (isCheckOut.data.data) {
        Alert.alert("Check out successfully!");
        props.navigation.navigate("App");
      } else {
        Alert.alert("Error!");
        props.navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Fail");
      props.navigation.goBack();
    }
  };

  const procedure = () => {
    if (reservation.state == "new") {
      checkIn(reservation.id);
    } else if ((reservation.state = "ongoing")) {
      checkOut(reservation.id);
    } else {
      Alert.alert("Ticket is expired");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await parkingReservationApi.getById(routeData.idTicket);
        if (res.data.data) {
          setReservation(res.data.data);
        } else {
          Alert.alert(`${res.data.message}`);
          props.navigation.goBack();
        }
        if (
          res.data.data.state == "completed" ||
          res.data.data.state == "cancel"
        ) {
          Alert.alert("QR code expired!");
          Spinner.hide();
          props.navigation.goBack();
        }
      } catch (error) {
        Alert.alert("Fail");
        props.navigation.goBack();
      } finally {
        Spinner.hide();
      }
    })();
  }, []);

  return (
    <>
      {!reservation && Spinner.show()}
      {reservation && (
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppHeading style={styles.header}>
              <Text>Parking ticket</Text>
            </AppHeading>
            <View style={styles.card}>
              <Item
                title={"Parking area"}
                value={reservation?.parkingLot.name}
              />
              <Item title={"Address"} value={reservation?.parkingLot.address} />
              <Item
                title={"Vehicle"}
                value={`${reservation?.vehicle?.name} (${reservation?.vehicle?.number})`}
              />
              <Item
                title={"Parking spot"}
                value={`${reservation?.parkingSlot.block.code} - ${reservation?.parkingSlot?.name}`}
              />
              <Item
                title={"Date"}
                value={DateTimeHelper.formatDate(reservation?.startTime)}
              />
              <Item
                title={"Duration"}
                value={DateTimeHelper.convertToHour(
                  reservation?.timeFrame?.duration,
                )}
              />
              <Item
                title={"Hours"}
                value={
                  dayjs(reservation?.startTime).format("HH:mm") +
                  " - " +
                  dayjs(reservation?.endTime).format("HH:mm")
                }
              />
            </View>
            <View style={styles.card}>
              <Item
                title={"Amount"}
                value={CurrencyHelper.formatVND(reservation?.timeFrame?.cost)}
              />
              <Text style={styles.dash} ellipsizeMode="clip" numberOfLines={1}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - - - - - - - - - - - - - - -
              </Text>
              <Item
                title={"Total"}
                value={CurrencyHelper.formatVND(reservation?.timeFrame?.cost)}
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
          <AppButton style={styles.continueButton} onPress={procedure}>
            <Text style={styles.countinueText}>
              {reservation?.state == "new"
                ? "Check in"
                : reservation?.state == "ongoing"
                ? "Check out"
                : ""}
            </Text>
          </AppButton>
        </View>
      )}
    </>
  );
};

export default ParkingReservationDetail;

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    textAlign: "center",
  },
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
