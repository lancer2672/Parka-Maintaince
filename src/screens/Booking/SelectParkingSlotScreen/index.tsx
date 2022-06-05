import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SelectParkingSlotScreen = ({ navigation }: any) => {
  const navigateNext = () => {
    navigation.navigate("SelectPaymentScreen");
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text>SelectParkingSlotScreen</Text>
      <AppButton style={styles.continueButton} onPress={navigateNext}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default SelectParkingSlotScreen;

const styles = StyleSheet.create({
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
