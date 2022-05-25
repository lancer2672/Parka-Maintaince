import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const VehicleScreen = ({ navigation }: any) => {
  const navigateTo = () => {
    navigation.navigate("AddVehicleScreen");
  };
  return (
    <View>
      <Text>Vehicle</Text>
      <TouchableOpacity onPress={navigateTo}>
        <Text>Add new vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VehicleScreen;
