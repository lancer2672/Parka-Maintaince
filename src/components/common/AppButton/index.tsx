import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Colors from "@src/constants/Colors";

interface ButtonProps {
  width: string;
  height: string;
  backgroundColor: string;
  onPress: any;
  children: JSX.Element;
  style: any;
}

const AppButton = ({
  width,
  height,
  backgroundColor,
  onPress,
  children,
  style,
}: ButtonProps) => {
  const w = width == "auto" ? "auto" : parseInt(width);
  const h = height == "auto" ? "auto" : parseInt(height);
  const btnStyle = [
    styles.root,
    { width: w, height: h, backgroundColor },
    style,
  ];
  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      {children}
    </TouchableOpacity>
  );
};

AppButton.defaultProps = {
  width: "auto",
  height: 45,
  backgroundColor: Colors.light.primary,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onPress: () => {},
  style: {},
};

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
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
};

export default AppButton;
