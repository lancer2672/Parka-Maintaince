import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { timeFrameApi } from "@src/api";
import { Colors, Spacing } from "@src/constants";
import { convertToHour, convertToThounsandSeparator } from "@src/utils/convert";
import * as Linking from "expo-linking";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionButton from "../ActionButton";
import TimeItem from "../TimeItem";

const renderItem = (value: any) => {
  return (
    <TimeItem
      period={convertToHour(value.item.duration)}
      cost={convertToThounsandSeparator(value.item.cost)}
    />
  );
};

type Props = {
  isShow: boolean;
  onClose: any;
  selectedParking: ParkingLot;
  distance: number;
  navigateBooking: any;
};

const DetailModal = (props: Props) => {
  const { isShow, onClose, selectedParking, navigateBooking } = props;
  const ref = React.useRef<BottomSheet>(null);
  const [timeFrames, setTimeFrames] = useState([]);

  const onOpenBottomSheetHandler = (index: number) => {
    ref?.current?.snapToIndex(index);
  };
  const handleCall = () => {
    Linking.openURL("tel:+84779952304");
  };

  useEffect(() => {
    if (isShow === true) {
      onOpenBottomSheetHandler(1);
    } else {
      onOpenBottomSheetHandler(-1);
    }
  }, [isShow]);

  useEffect(() => {
    const getTimeFrame = async (id: string) => {
      const result = await timeFrameApi.getAll(id);
      if (result.data.data) {
        setTimeFrames(result.data.data);
      }
    };
    if (selectedParking) {
      getTimeFrame(selectedParking.idParkingLot);
    }
  }, [selectedParking]);

  return (
    <>
      <BottomSheet
        ref={ref}
        enablePanDownToClose={true}
        onClose={onClose}
        snapPoints={[1, 280, "52%", "95%"]}>
        <BottomSheetView>
          <View
            style={{
              paddingHorizontal: 20,
              height: "100%",
              backgroundColor: "white",
            }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: Colors.light.primary,
                    lineHeight: 24,
                  }}
                  numberOfLines={2}>
                  {selectedParking?.name}
                </Text>
                <View style={styles.flexRow}>
                  <Feather
                    name="map-pin"
                    size={18}
                    color={Colors.light.heading}
                  />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: Colors.light.heading,
                      lineHeight: 18,
                      width: "90%",
                      marginLeft: Spacing.s,
                    }}>
                    {selectedParking?.address}
                  </Text>
                </View>
              </View>
              <Image
                source={{
                  uri: "https://shopping.saigoncentre.com.vn/Data/Sites/1/News/32/013.jpg",
                }}
                style={{
                  height: 80,
                  width: "25%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <TouchableOpacity style={styles.btnBook} onPress={navigateBooking}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: Colors.light.background,
                  textAlign: "center",
                }}>
                Book now
              </Text>
            </TouchableOpacity>
            <View style={styles.flexRow}>
              <View
                style={{
                  backgroundColor: "#4D65EB",
                  padding: 4,
                  borderRadius: 4,
                }}>
                <MaterialIcons name="directions-walk" size={20} color="#fff" />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginHorizontal: Spacing.s,
                  color: Colors.light.heading,
                }}>
                {Math.round(props.distance * 100) / 100}km
              </Text>
              <View
                style={{
                  backgroundColor: "#4D65EB",
                  padding: 5,
                  borderRadius: 4,
                }}>
                <MaterialCommunityIcons name="parking" size={18} color="#fff" />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginHorizontal: Spacing.s,
                  color: Colors.light.heading,
                }}>
                20 spots
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: Spacing.l,
              }}>
              <ActionButton
                action={handleCall}
                icon={
                  <Ionicons name="ios-call-outline" size={24} color="#4D65EB" />
                }
                text={"Call"}
              />
              <ActionButton
                action={() => onOpenBottomSheetHandler(0)}
                icon={
                  <MaterialIcons name="directions" size={24} color="#4D65EB" />
                }
                text={"Direction"}
              />
              <ActionButton
                action={() => console.log("share")}
                icon={
                  <Ionicons
                    name="md-share-social-outline"
                    size={24}
                    color="#4D65EB"
                  />
                }
                text={"Share"}
              />
            </View>
            <Text style={styles.title}>Info</Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                color: "#818283",
                textAlign: "justify",
              }}>
              {selectedParking?.description}
            </Text>
            <Text style={styles.title}>Parking time</Text>
            <View style={{ height: 50 }}>
              <BottomSheetFlatList
                style={{ flexGrow: 0 }}
                data={timeFrames}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <Text style={styles.title}>Payment type</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  btnBook: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4D65EB",
    borderRadius: 8,
    height: 42,
    marginVertical: 12,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -4 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    paddingTop: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4D65EB",
    marginBottom: 8,
    marginTop: 16,
  },
  flexRow: { display: "flex", flexDirection: "row", alignItems: "center" },
});

export default DetailModal;
