import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import Colors from "@src/constants/Colors";

const styles = {
  root: {
    paddingVertical: "auto",
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#6F7EC9",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    minHeight: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
};

const AppButton = ({
  title,
  width,
  height,
  color,
  backgroundColor,
  onPress,
  children,
  textStyle,
  style,
  isLoading,
}: ButtonProps) => {
  const btnStyle = [styles.root, { width, height, backgroundColor }, style];
  const txtStyle = [styles.text, { color }, textStyle];
  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      {isLoading && (
        <ActivityIndicator style={{ marginRight: 20 }} color="white" />
      )}
      {title && <Text style={txtStyle}>{title}</Text>}
      {children}
    </TouchableOpacity>
  );
};

type ButtonProps = {
  title: string;
  width: string;
  height: string;
  color: string;
  backgroundColor: string;
  onPress: any;
  children: string;
  textStyle: any;
  style: any;
  isLoading: boolean;
};

AppButton.defaultProps = {
  title: null,
  width: "auto",
  height: "auto",
  color: "white",
  backgroundColor: Colors.light.primary,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onPress: () => {},
  children: null,
  textStyle: {},
  style: {},
  isLoading: false,
};

export default AppButton;
