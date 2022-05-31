import { Colors } from "@src/constants";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Item = {
  period: string;
  cost: string;
};

const TimeItem = (item: Item) => (
  <View style={styles.container}>
    <Text style={styles.time}>{item.period}</Text>
    <Text style={styles.price}>{item.cost}</Text>
  </View>
);

export default TimeItem;

const styles = StyleSheet.create({
  container: {
    borderColor: "#90A3BC",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  time: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.primary,
  },
  price: {
    fontSize: 16,
    color: Colors.light.primary,
  },
});
