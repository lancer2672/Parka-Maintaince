import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import {
  EvilIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Spacing } from "@src/constants";
import ActionButton from "../ActionButton";
import { timeFrameApi } from "@src/api";
import TimeItem from "../TimeItem";
import { convertToHour, convertToThounsandSeparator } from "@src/utils/convert";

type Props = {
  isShow: boolean;
  onClose: any;
  data: ParkingLot;
  distance: number;
};

const ParkingDetailModal = (props: Props) => {
  const { isShow, onClose, data } = props;
  const [timeFrames, setTimeFrames] = useState([]);

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    console.log(isShow);

    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = (value: any) => {
    return (
      <TimeItem
        period={convertToHour(value.item.duration)}
        cost={convertToThounsandSeparator(value.item.cost)}
      />
    );
  };
  const handleCall = () => {
    Linking.openURL("tel:+84779952304");
  };

  useEffect(() => {
    if (isShow === true) {
      handleSnapPress(1);
    } else {
      handleClosePress();
    }
  }, [isShow]);
  useEffect(() => {
    const getTimeFrame = async (id: string) => {
      const result = await timeFrameApi.getAll(id);
      if (result.data.data) {
        setTimeFrames(result.data.data);
      }
    };
    if (data) {
      getTimeFrame(data.idParkingLot);
    }
  }, [data]);

  return (
    <SafeAreaView style={{ zIndex: 100, flex: 1 }}>
      {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} /> */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onClose={onClose}
        onChange={handleSnapPress}>
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
                  color: "#4D65EB",
                  lineHeight: 30,
                }}
                numberOfLines={1}>
                {data?.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: Spacing.s,
                }}>
                <EvilIcons name="location" size={24} color="#35438E" />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#35438E",
                    lineHeight: 18,
                    width: "90%",
                    marginLeft: Spacing.s,
                  }}>
                  {data?.address}
                </Text>
              </View>
            </View>
            <Image
              source={{
                uri: "https://shopping.saigoncentre.com.vn/Data/Sites/1/News/32/013.jpg",
              }}
              style={{
                height: 80,
                width: 80,
                resizeMode: "cover",
              }}
            />
          </View>
          <TouchableOpacity style={styles.btnBook}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                width: "auto",
                color: "#ffffff",
                textAlign: "center",
              }}>
              Book now
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
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
                color: "#35438E",
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
                color: "#35438E",
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
              action={() => console.log("onOpenBottomSheetHandler(0)")}
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
          <Text style={styles.title}>Description</Text>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 20,
              color: "#818283",
              textAlign: "justify",
            }}>
            {data?.description}
          </Text>
          <Text style={styles.title}>Parking time</Text>
          <BottomSheetFlatList
            data={timeFrames}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.title}>Payment type</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  btnBook: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4D65EB",
    borderRadius: 8,
    height: 44,
    marginVertical: 12,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
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
});

export default ParkingDetailModal;
