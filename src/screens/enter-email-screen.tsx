import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../App";
import Header from "../components/header";
import OnboardingTextField from "../components/onboarding-text-field";
import { theme } from "../utils/colors";
import { ArrowLeft } from "../utils/icons";

type EnterEmailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EnterEmailScreen"
>;

const EnterEmailScreen: FC<EnterEmailScreenProps> = () => {
  return (
    <View style={style.screen}>
      <Header
        title="Amount"
        left={{
          icon: <ArrowLeft />,
        }}
        right={{
          text: "Confirm",
        }}
      />
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="never"
      >
        <View style={{ flex: 1 }}></View>
        <OnboardingTextField
          label="Enter your email address"
          keyboard="email-address"
          type={"number"}
          errorLabel="Looks wrong"
          regex={
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/
          }
        />
      </ScrollView>
    </View>
  );
};

export default EnterEmailScreen;

const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
});
