import { Spinner } from "@nghinv/react-native-loading";
import parkingSlotApi from "@src/api/parkingSlotApi";
import ParkingSlotItem from "@src/components/Booking/ParkingSlotItem";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const SelectParkingSlotScreen = ({ navigation }: any) => {
  const bookingState = useAppSelector(selectBooking);
  const [slots, setSlots] = useState<ParkingSlot[]>();
  const [blocks, setBlocks] = useState<Block[]>();

  const navigateNext = () => {
    navigation.navigate("SelectPaymentScreen");
  };

  const getblockSlots = (block: Block, slots: ParkingSlot[]) => {
    const blockSlots = slots.map((slot) =>
      slot.idBlock == block.idBlock ? slot : null,
    );
    return blockSlots;
  };

  useEffect(() => {
    Spinner.show();
    parkingSlotApi
      .getAll(bookingState.parkingLot.idParkingLot)
      .then((res) => {
        setSlots(res.data.slots);
        setBlocks(res.data.blocks);
        Spinner.hide();
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <FlatList
        data={blocks}
        keyExtractor={(block) => block.idBlock}
        renderItem={({ item }) => (
          <ParkingSlotItem
            key={item.idBlock}
            block={item}
            slots={getblockSlots(item, slots)}
          />
        )}
      />
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
