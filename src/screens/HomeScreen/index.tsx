import DetailModal from "@src/components/Home/DetailModal";
import Map from "@src/components/Home/Map";
import { useAppDispatch } from "@src/store/hooks";
import { reservationActions } from "@src/store/slices/reservationSlice";
import React, { useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }: any) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [distance, setDistance] = useState(0);
  const dispatch = useAppDispatch();

  const navigateBooking = () => {
    navigation.navigate("ParkingDetailsScreen");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Map
          onSelectedMarker={(parking: ParkingLot) => {
            dispatch(
              reservationActions.update({
                field: "parkingLot",
                value: parking,
              }),
            );
            setIsShowDetail(true);
          }}
          setDistance={setDistance}
        />
        <DetailModal
          distance={distance}
          isShow={isShowDetail}
          onClose={() => setIsShowDetail(false)}
          navigateBooking={navigateBooking}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    flex: 1,
  },
});
