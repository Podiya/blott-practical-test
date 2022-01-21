import React from "react";
import { Text, View } from "react-native";

const EnterEmailView = () => {
  return (
    <View
      style={{
        backgroundColor: "blue",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Text>Nice to meet you Benjamin What is your email? ✉️</Text>
    </View>
  );
};

export default EnterEmailView;
