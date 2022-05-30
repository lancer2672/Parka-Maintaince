import DetailModal from "@src/components/Home/DetailModal";
import Map from "@src/components/Home/Map";
import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [seletedParking, setSelectedParking] = useState<ParkingLot>();
  const [distance, setDistance] = useState(0);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Map
          onSelectedMarker={(parking: ParkingLot) => {
            setIsShowDetail(true);
            setSelectedParking(parking);
          }}
          setDistance={setDistance}
        />
        <View style={{ flex: 1 }}>
          <DetailModal
            distance={distance}
            isShow={isShowDetail}
            onClose={() => setIsShowDetail(false)}
            data={seletedParking}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: "100%",
  },
});
