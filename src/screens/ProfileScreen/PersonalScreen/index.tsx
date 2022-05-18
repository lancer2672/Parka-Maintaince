import AppButton from "@src/components/common/AppButton";
import AvatarUpload from "@src/components/Profile/AvatarUpload";
import ProfileInput from "@src/components/Profile/ProfileInput";
import { Colors, Layout } from "@src/constants";
import React from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  LockClosedIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface IProfileInputProps {
  placeholder: string;
  value: string;
  title: string;
  type: string;
  maxLength: number;
  icon: JSX.Element;
}

const inputs: IProfileInputProps[] = [
  {
    placeholder: "Your name",
    value: "Trung Huynh",
    title: "NAME",
    type: "input",
    maxLength: 50,
    icon: <UserIcon color={Colors.light.primary} size={26} />,
  },
  {
    placeholder: "Your email",
    value: "trunghuynh2304@gmail.com",
    title: "EMAIL",
    type: "input",
    maxLength: 50,
    icon: <MailIcon color={Colors.light.primary} size={26} />,
  },
  {
    placeholder: "Your phone number",
    value: "0123456789",
    title: "PHONE NUMBER",
    type: "input",
    maxLength: 11,
    icon: <PhoneIcon color={Colors.light.primary} size={26} />,
  },
  {
    placeholder: "Your password",
    value: "abcxyz",
    title: "PASSWORD",
    type: "password",
    maxLength: 50,
    icon: <LockClosedIcon color={Colors.light.primary} size={26} />,
  },
];

const PersonalScreen = () => {
  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <AvatarUpload />
          {inputs.map((input) => (
            <ProfileInput
              key={input.title}
              placeholder={input.placeholder}
              value={input.value}
              title={input.title}
              type={input.type}
              icon={input.icon}
              maxLength={input.maxLength}
            />
          ))}
          <AppButton
            height={"40"}
            style={styles.button}
            onPress={() => Alert.alert("Update profile")}>
            <Text style={styles.textButton}>Update profile</Text>
          </AppButton>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 8,
    justifyContent: "flex-start",
    height: Layout.window.height - 160,
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 16,
    left: 16,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default PersonalScreen;
