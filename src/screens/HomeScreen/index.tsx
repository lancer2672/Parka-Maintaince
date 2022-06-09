import AppButton from "@src/components/common/AppButton";
import { Text } from "@src/components/Themed";
import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
          <Text>QR Code</Text>
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
    width: "50%",
  },
});
