import { Colors } from "@src/constants";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface IProps {
  placeholder: string;
  value: string;
  title: string;
  type: string;
  icon: JSX.Element;
  maxLength: number;
}

const ProfileInput = ({
  placeholder,
  value,
  title,
  type,
  icon,
  maxLength,
}: IProps) => {
  const [text, onChangeText] = useState(value);

  return (
    <View style={styles.container}>
      {icon}
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={placeholder}
          secureTextEntry={type == "password"}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

export default ProfileInput;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  wrapper: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.light.heading,
  },
  input: {
    paddingVertical: 4,
    paddingRight: 16,
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    marginRight: 20,
  },
});
