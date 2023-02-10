import AppButton from "@src/components/common/AppButton";
import { Text } from "@src/components/Themed";
import { Colors } from "@src/constants";
import React, { useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from "react-navigation";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen = (props: IProps) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [seletedParking, setSelectedParking] = useState<ParkingLot>();
  const [distance, setDistance] = useState(0);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <AppButton
          style={styles.btnQRCode}
          onPress={() => props.navigation.navigate("QRCode")}>
          <Text style={{ color: "#CCCCCC", fontSize: 20, fontWeight: "600" }}>
            QR Code
          </Text>
        </AppButton>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnQRCode: {
    padding: 8,
    width: "45%",
    backgroundColor: Colors.light.primary,
    color: Colors.light.text,
  },
});
