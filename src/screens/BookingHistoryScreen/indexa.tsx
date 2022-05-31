/* eslint-disable react/prop-types */
import { Colors } from "@src/constants";
import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import HistoryBookingScreen from "./HistoryBookingScreen";
import ScheduledBookingScreen from "./ScheduledBookingScreen";

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

const BookingHistoryScreen = () => {
  const layout = useWindowDimensions();

  const renderScene = SceneMap({
    scheduled: ScheduledBookingScreen,
    history: HistoryBookingScreen,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "scheduled", title: "Scheduled" },
    { key: "history", title: "History" },
  ]);

  const renderItem = ({
    navigationState,
    position,
    route,
    index,
  }: {
    navigationState: State;
    position: Animated.AnimatedInterpolation;
    route: Route;
    index: number;
  }) => {
    const inputRange = navigationState.routes.map((_, i) => i);

    const activeOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
    });
    const inactiveOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)),
    });

    return (
      <View style={styles.tab}>
        <Animated.View style={[styles.item, { opacity: inactiveOpacity }]}>
          <Text style={[styles.label, styles.inactive]}>{route.title}</Text>
        </Animated.View>
        <Animated.View
          style={[styles.item, styles.activeItem, { opacity: activeOpacity }]}>
          <Text style={[styles.label, styles.active]}>{route.title}</Text>
        </Animated.View>
      </View>
    );
  };

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State },
  ) => {
    const { navigationState, position } = props;
    return (
      <View style={styles.tabbar}>
        {navigationState.routes.map((route: Route, index: number) => {
          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={() => props.jumpTo(route.key)}>
              {renderItem({ route, index, navigationState, position })}
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default BookingHistoryScreen;

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeItem: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  active: {
    color: Colors.light.primary,
  },
  inactive: {
    color: "#a1afc2",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 12,
  },
});
