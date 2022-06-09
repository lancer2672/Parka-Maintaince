import { Spinner } from "@nghinv/react-native-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "@src/components/common/AppButton";
import VehicleItem from "@src/components/Vehicle/VehicleItem";
import { Colors } from "@src/constants";
import {
  deleteVehicleAction,
  getVehicleAction,
} from "@src/store/actions/vehicleAction";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectVehicles } from "@src/store/selectors";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const VehicleScreen = ({ navigation }: any) => {
  const vehicleState = useAppSelector(selectVehicles);
  const dispatch = useAppDispatch();

  const navigateToAdd = () => {
    navigation.navigate("AddVehicleScreen");
  };

  const navigateToEdit = (data: Vehicle) => {
    navigation.navigate("AddVehicleScreen", data);
  };

  const handleDelete = (idVehicle: string) => {
    Spinner.show();
    dispatch(deleteVehicleAction(idVehicle));
  };

  useEffect(() => {
    const getVehicle = async () => {
      Spinner.show();
      const idUser = await AsyncStorage.getItem("idUser");
      dispatch(getVehicleAction(JSON.parse(idUser)));
    };

    getVehicle();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={vehicleState}
        renderItem={({ item }) => (
          <VehicleItem
            item={item}
            onEdit={() => navigateToEdit(item)}
            onDelete={() => handleDelete(item.idVehicle)}
          />
        )}
        keyExtractor={(item) => item.idVehicle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <AppButton onPress={navigateToAdd} style={styles.button}>
        <Text style={styles.buttonText}>Add a vehicle</Text>
      </AppButton>
    </View>
  );
};

export default VehicleScreen;

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "600",
  },
  separator: {
    height: 12,
  },
});
