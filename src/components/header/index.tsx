import React, { FC, ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../utils/colors";

export type HeaderAccessory = {
  press?: () => void;
  icon?: ReactElement;
  text?: string;
};

export type HeaderProps = {
  title?: string;
  left?: HeaderAccessory;
  right?: HeaderAccessory;
};

export const Header: FC<HeaderProps> = ({ title, left, right }) => {
  const LeftAccessory = () => (
    <TouchableOpacity
      style={style.leftAccessory}
      activeOpacity={0.7}
      disabled={left === undefined}
      onPress={left?.press}
    >
      <View style={style.leftIconContainer}>
        {left?.icon && left.icon}
        {left?.text && <Text style={style.leftText}>{left.text}</Text>}
      </View>
    </TouchableOpacity>
  );
  const RightAccessory = () => (
    <TouchableOpacity
      style={style.rightAccessory}
      activeOpacity={0.7}
      disabled={right === undefined}
      onPress={right?.press}
    >
      <View style={style.rightIconContainer}>
        {right?.icon && right.icon}
        {right?.text && <Text style={style.rightText}>{right.text}</Text>}
      </View>
    </TouchableOpacity>
  );
  const TitleContainer = () => (
    <View style={style.titleContainer}>
      <Text style={style.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView edges={["top"]}>
      <View style={style.baseContainer}>
        <LeftAccessory />
        <TitleContainer />
        <RightAccessory />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const style = StyleSheet.create({
  baseContainer: {
    height: 42,
    width: "100%",
    flexDirection: "row",
  },
  leftAccessory: {
    width: 72,
    justifyContent: "center",
    backgroundColor: theme.background,
  },
  leftIconContainer: {
    marginLeft: 24,
  },
  rightAccessory: {
    // width: 72,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: theme.background,
  },
  rightIconContainer: {
    marginRight: 24,
  },
  titleContainer: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontFamily: "Inter-Medium",
    textAlign: "left",
    fontSize: 14,
  },
  rightText: {
    color: "#55ADFF",
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  leftText: {
    color: "#55ADFF",
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
});
