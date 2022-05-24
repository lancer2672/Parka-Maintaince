import useCachedResources from "@src/hooks/useCachedResources";
import useColorScheme from "@src/hooks/useColorScheme";
import AppNavigator from "@src/navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import "../thepatch";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { LogBox } from "react-native";
import { LoadingService } from "@nghinv/react-native-loading";

LogBox.ignoreAllLogs();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <LoadingService>
        <Provider store={store}>
          <SafeAreaProvider>
            <AppNavigator colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </Provider>
      </LoadingService>
    );
  }
}
