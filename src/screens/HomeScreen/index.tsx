import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserAction } from "@src/store/actions/userAction";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectUser } from "@src/store/selectors";
import React, { useEffect, useRef } from "react";
import { Button, Text, View } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

const HomeScreen = () => {
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const getUser = async () => {
    const idUser = await AsyncStorage.getItem("idUser");
    dispatch(getUserAction(idUser));
  };

  useEffect(() => {
    if (!userState) {
      getUser();
    }
  }, []);
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}>
      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = useRef(null);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "papayawhip",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  );
};

export default HomeScreen;
