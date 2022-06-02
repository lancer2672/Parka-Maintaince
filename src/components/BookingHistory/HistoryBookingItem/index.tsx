import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@src/constants";
import { ColorHelper } from "@src/utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HistoryBookingItem = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={[
          styles.flexRow,
          { alignItems: "center", justifyContent: "space-between" },
        ]}>
        <View style={styles.status}>
          <Text style={styles.statusText}>Completed</Text>
        </View>
        <Text style={styles.price} numberOfLines={1}>
          100.000₫
        </Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        Vicom Mega Mall 1
      </Text>
      <View style={[styles.flexRow]}>
        <Feather name="map-pin" size={14} color={Colors.light.subtitle} />
        <Text style={styles.subtitle} numberOfLines={1}>
          address address address
        </Text>
      </View>
      <View style={[styles.flexRow, { marginTop: 12, alignItems: "center" }]}>
        <Feather name="calendar" size={20} color={Colors.light.text} />
        <View style={styles.wrapper}>
          <Text style={styles.date} numberOfLines={1}>
            Thu 23 Jan
          </Text>
          <Text style={styles.time} numberOfLines={1}>
            10:00 AM
          </Text>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={Colors.light.text}
        />
        <View style={styles.wrapper}>
          <Text style={styles.date} numberOfLines={1}>
            Thu 23 Jan
          </Text>
          <Text style={styles.time} numberOfLines={1}>
            12:00 PM
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryBookingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    shadowColor: ColorHelper.hexToRgbA("#000000", 0.2),
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
  },
  status: {
    borderRadius: 20,
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.success, 0.15),
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  schedule: {
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.warning, 0.15),
  },
  scheduleText: {
    color: Colors.light.warning,
  },
  statusText: {
    color: Colors.light.success,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
  },
  price: { fontSize: 20, fontWeight: "700", color: Colors.light.primary },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.subtitle,
    marginLeft: 4,
  },
  flexRow: { display: "flex", flexDirection: "row" },
  wrapper: { marginHorizontal: 12 },
  date: { fontWeight: "600", fontSize: 14, color: Colors.light.text },
  time: { fontWeight: "500", fontSize: 14, color: Colors.light.text },
});
