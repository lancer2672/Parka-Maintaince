import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from "react-navigation";
import { parkingReservationApi } from "@src/api";
import procedureApi from "@src/api/procedureApi";
import parkingSlipApi from "@src/api/parkingSlipApi";
import { ParkingSlip } from "@src/types";
import { isFulfilled } from "@reduxjs/toolkit";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

const QRCode = (props: IProps) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    const idParkingReservation = data.split("-")[0];
    const status = data.split("-")[1];
    if (status === "scheduled") {
      checkIn(idParkingReservation);
    } else if (status === "ongoing") {
      checkOut(idParkingReservation);
    }

    setScanned(true);
  };

  const checkIn = async (idParkingReservation: string) => {
    const res = await procedureApi.checkIn(idParkingReservation);
    if (res.data.data.status) {
      Alert.alert("Check in successfully!!!");
    } else {
      Alert.alert("Fail!!!");
    }
  };

  const checkOut = async (idParkingReservation: string) => {
    const result = await parkingSlipApi.getByIdParkingReserver(
      idParkingReservation,
    );
    if (result.data.data) {
      const parkingSlip: ParkingSlip = result.data.data;
      const data = {
        idParkingReservation,
        idParkingSlip: parkingSlip.idParkingSlip,
        exitTime: Date.now(),
        cost: "",
        total: "",
        isPaid: true,
      };

      const isCheckOut = await procedureApi.checkOut(data);
      if (isCheckOut.data.data.status) {
        Alert.alert("Successfully!!!");
      } else {
        Alert.alert(isCheckOut.data.message);
      }
    }
  };

  if (hasPermission === false) {
    Alert.alert("No access to camera");
    props.navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}>
          <Text style={styles.btnScanAgain}>Tab to Scan Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
export default QRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  btnScanAgain: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#FFF",
  },
});
