import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from "react-navigation";

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
    console.log("Data when scan QR code ", data);
    if (data.slice(0, 6) !== "parkar") {
      Alert.alert("Invalid QR code!");
    } else {
      const idTicket = data.slice(6, data.length);
      console.log("idTicket", idTicket);
      props.navigation.navigate("ParkingReservationDetail", {
        idTicket,
      });
    }
    setScanned(true);
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
