import { Spinner } from "@nghinv/react-native-loading";
import SelectableVehicleItem from "@src/components/Booking/SelectableVehicleItem";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { getVehicleAction } from "@src/store/actions/vehicleAction";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import {
  selectReservation,
  selectUser,
  selectVehicles,
} from "@src/store/selectors";
import { reservationActions } from "@src/store/slices/reservationSlice";
import { ColorHelper } from "@src/utils";
import React, { useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

const SelectVehicleScreen = ({ navigation }: any) => {
  const vehicleState = useAppSelector(selectVehicles);
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const selectedVehicle = useAppSelector(selectReservation).vehicle;

  const handleSelect = (vehicle: Vehicle) => {
    dispatch(reservationActions.update({ field: "vehicle", value: vehicle }));
  };

  const navigateToAdd = () => {
    navigation.navigate("AddVehicleScreen");
  };

  const navigateNext = () => {
    if (selectedVehicle) {
      navigation.navigate("ReserveParkingScreen");
    } else {
      Alert.alert("You must select your vehicle!");
    }
  };

  useEffect(() => {
    Spinner.show();
    dispatch(getVehicleAction(userState.idUser));
  }, []);

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 20, justifyContent: "flex-start" }}>
      <FlatList
        data={vehicleState}
        keyExtractor={(item) => item.idVehicle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({ item }) => (
          <SelectableVehicleItem
            item={item}
            checkedId={selectedVehicle?.idVehicle}
            handleSelect={handleSelect}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <AppButton style={styles.addButton} onPress={navigateToAdd}>
            <Text style={styles.addText}>Add new vehicle</Text>
          </AppButton>
        }
      />
      <AppButton style={styles.continueButton} onPress={navigateNext}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default SelectVehicleScreen;

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  addButton: {
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.primary, 0.2),
    marginTop: 12,
    marginBottom: 50,
  },
  addText: {
    color: Colors.light.primary,
    fontSize: 18,
    fontWeight: "600",
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
