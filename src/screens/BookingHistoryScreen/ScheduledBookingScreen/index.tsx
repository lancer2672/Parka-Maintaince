import ScheduleBookingItem from "@src/components/Booking/ScheduleBookingItem";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const ScheduledBookingScreen = () => {
  const data = [
    {
      id: "1",
      image:
        "https://www.templetreefarm.in/wp-content/uploads/2019/11/V-page-parking-992x496.jpg",
    },
    {
      id: "2",
      image:
        "https://www.templetreefarm.in/wp-content/uploads/2019/11/V-page-parking-992x496.jpg",
    },
    {
      id: "3",
      image:
        "https://www.templetreefarm.in/wp-content/uploads/2019/11/V-page-parking-992x496.jpg",
    },
    {
      id: "4",
      image:
        "https://www.templetreefarm.in/wp-content/uploads/2019/11/V-page-parking-992x496.jpg",
    },
    {
      id: "5",
      image:
        "https://www.templetreefarm.in/wp-content/uploads/2019/11/V-page-parking-992x496.jpg",
    },
  ];

  const renderItem = (item: any) => {
    return <ScheduleBookingItem />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ScheduledBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
