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
  const [reservation, setReservation] = useState(null);
  const routeData = props.route.params;
  const checkIn = async (idParkingReservation: string) => {
    try {
      const res = await procedureApi.checkIn(idParkingReservation);
      if (res.data.data.status) {
        Alert.alert("Check in successfully!!!");
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

  const checkOut = async (idParkingReservation: string) => {
    try {
      const result = await parkingSlipApi.getByIdParkingReservation(
        idParkingReservation,
      );
      if (result.data.data) {
        const parkingSlip: ParkingSlip = result.data.data;
        const data = {
          idParkingReservation,
          idParkingSlip: parkingSlip.idParkingSlip,
          exitTime: dayjs(Date.now()).format("HH:mm:ss"),
          total: reservation.total,
          isPaid: true,
        };
        const endTime = dayjs(reservation.bookingDate)
          .set("hour", reservation.endTime.slice(0, 2))
          .set("minute", reservation.endTime.slice(3, 5));
        const lateTime = dayjs().diff(endTime, "hour");
        const isCheckOut = await procedureApi.checkOut(data);
        if (lateTime > 0 && isCheckOut.data.data.status) {
          Alert.alert("You are 10 minutes late!");
        }
        if (isCheckOut.data.data.status) {
          Alert.alert("Successfully!!!");
          props.navigation.navigate("App");
        } else {
          Alert.alert(isCheckOut.data.message);
          props.navigation.goBack();
        }
      }
    } catch (error) {
      Alert.alert("Fail");
      props.navigation.goBack();
    }
  };

  const procedure = () => {
    if (reservation.status == "scheduled") {
      checkIn(reservation.idParkingReservation);
    } else {
      checkOut(reservation.idParkingReservation);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await parkingReservationApi.getById(
          routeData.idParkingReservation,
        );
        if (res.data.data) {
          setReservation(res.data.data);
        } else {
          Alert.alert(`${res.data.message}`);
          props.navigation.goBack();
        }
        if (res.data.data.status == "end") {
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
                value={reservation?.ParkingSlot.Block.ParkingLot.name}
              />
              <Item
                title={"Address"}
                value={reservation?.ParkingSlot.Block.ParkingLot.address}
              />
              <Item
                title={"Vehicle"}
                value={`${reservation?.Vehicle?.name} (${reservation?.Vehicle?.number})`}
              />
              <Item
                title={"Parking spot"}
                value={`${reservation?.ParkingSlot.Block.blockCode} - ${reservation?.ParkingSlot?.slotNumber}`}
              />
              <Item
                title={"Date"}
                value={DateTimeHelper.formatDate(reservation?.bookingDate)}
              />
              <Item
                title={"Duration"}
                value={DateTimeHelper.convertToHour(
                  reservation?.TimeFrame?.duration,
                )}
              />
              <Item
                title={"Hours"}
                value={
                  reservation?.startTime.slice(
                    0,
                    reservation?.startTime.length - 3,
                  ) +
                  " - " +
                  reservation?.endTime.slice(0, reservation?.endTime.length - 3)
                }
              />
            </View>
            <View style={styles.card}>
              <Item
                title={"Amount"}
                value={CurrencyHelper.formatVND(reservation?.TimeFrame?.cost)}
              />
              <Text style={styles.dash} ellipsizeMode="clip" numberOfLines={1}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - - - - - - - - - - - - - - -
              </Text>
              <Item
                title={"Total"}
                value={CurrencyHelper.formatVND(reservation?.TimeFrame?.cost)}
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
              {reservation?.status == "scheduled"
                ? "Check in"
                : reservation?.status == "ongoing"
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
