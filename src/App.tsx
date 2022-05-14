import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "@src/hooks/useCachedResources";
import useColorScheme from "@src/hooks/useColorScheme";
import AppNavigator from "@src/navigation/AppNavigator";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppNavigator colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
