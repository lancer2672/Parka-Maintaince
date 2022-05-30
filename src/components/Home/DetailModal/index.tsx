import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import { Spacing } from "@src/constants";
import axiosClient from "@src/api/axiosClient";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
} from "react-native";
import * as Linking from "expo-linking";
import { convertToHour, convertToThounsandSeparator } from "@src/utils/convert";
import AppStatusBar from "@src/components/common/AppStatusBar";
type Item = {
  period: string;
  cost: string;
};
const renderItem = (value: any) => {
  return (
    <Item
      period={convertToHour(value.item.duration)}
      cost={convertToThounsandSeparator(value.item.cost)}
    />
  );
};
const Item = (item: Item) => (
  <View
    style={{
      borderColor: "#90A3BC",
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 16,
    }}>
    <Text style={{ fontSize: 18, fontWeight: "600", color: "#4D65EB" }}>
      {item.period}
    </Text>
    <Text style={{ fontSize: 16, color: "#4D65EB" }}>{item.cost}</Text>
  </View>
);

type Props = {
  isShow: boolean;
  onClose: any;
  data: ParkingLot;
  distance: number;
};

const DetailModal = (props: Props) => {
  const { isShow, onClose, data } = props;
  const ref = React.useRef<BottomSheet>(null);
  const [timeFrames, setTimeFrames] = useState([]);

  const onOpenBottomSheetHandler = (index: number) => {
    ref?.current?.snapTo(index);
  };
  const handleCall = () => {
    Linking.openURL("tel:+84779952304");
  };

  useEffect(() => {
    if (isShow === true) {
      onOpenBottomSheetHandler(1);
    } else {
      onOpenBottomSheetHandler(0);
    }
  }, [isShow]);

  useEffect(() => {
    const getTimeFrame = async (id: string) => {
      const result = await axiosClient.get(`/customer/time/${id}/time-frame`);
      if (result.data.data) {
        setTimeFrames(result.data.data);
      }
    };
    if (data) {
      getTimeFrame(data.idParkingLot);
    }
  }, [data]);

  const renderContent = () => (
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
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "#4D65EB", padding: 4, borderRadius: 4 }}>
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
          style={{ backgroundColor: "#4D65EB", padding: 5, borderRadius: 4 }}>
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
        <TouchableOpacity
          onPress={handleCall}
          style={{
            paddingVertical: Spacing.s,
            paddingHorizontal: 12,
            backgroundColor: "#DBE0FB",
            borderRadius: 6,
          }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Ionicons name="ios-call-outline" size={24} color="#4D65EB" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#4D65EB",
                marginLeft: Spacing.s,
              }}>
              Call
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: Spacing.s,
            paddingHorizontal: 12,
            backgroundColor: "#DBE0FB",
            borderRadius: 6,
          }}
          onPress={() => onOpenBottomSheetHandler(0)}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <MaterialIcons name="directions" size={24} color="#4D65EB" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#4D65EB",
                marginLeft: Spacing.s,
              }}>
              Direction
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: Spacing.s,
            paddingHorizontal: 12,
            backgroundColor: "#DBE0FB",
            borderRadius: 6,
          }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Ionicons
              name="md-share-social-outline"
              size={24}
              color="#4D65EB"
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#4D65EB",
                marginLeft: Spacing.s,
              }}>
              Share
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#4D65EB",
          marginBottom: 8,
          marginTop: 16,
        }}>
        Description
      </Text>
      <Text
        style={{
          fontSize: 14,
          lineHeight: 20,
          color: "#818283",
          textAlign: "justify",
        }}>
        {data?.description}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#4D65EB",
          marginVertical: 8,
        }}>
        Parking time
      </Text>
      <FlatList
        style={{ flexGrow: 0 }}
        data={timeFrames}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#4D65EB",
          marginVertical: 8,
        }}>
        Payment type
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={{ backgroundColor: "white" }}>
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ zIndex: 100, flex: 1 }}>
      <BottomSheet
        ref={ref}
        snapPoints={[0, 300, "52%", "90%"]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        onCloseEnd={onClose}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btnBook: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4D65EB",
    borderRadius: 8,
    height: 50,
    marginVertical: 10,
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
});
export default DetailModal;
