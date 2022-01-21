import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useRef, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { RootStackParamList } from "../../../App";
import Header from "../../components/header";
import OnboardingTextField, {
  OnboardingTextFieldProps,
} from "../../components/onboarding-text-field";
import { theme } from "../../utils/colors";
import { ArrowLeft } from "../../utils/icons";
import EnterEmailView from "./enter-email-view";
import EnterPhoneNumberView from "./enter-phone-number-view";

type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OnboardingScreen"
>;

const OnboardingScreen: FC<OnboardingScreenProps> = () => {
  const pagerRef = useRef<PagerView>(null);
  const [textFields, setTextFields] = useState<OnboardingTextFieldProps[]>([
    {
      errorLabel: "Looks wrong",
      keyboard: "email-address",
      label: "Enter your email address",
      type: "email",
      validationSuccess: () => {
        pagerRef.current?.setPage(1);
      },
      regex:
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/,
      value: "",
    },
    {
      errorLabel: "Looks wrong",
      keyboard: "phone-pad",
      label: "Enter your mobile number",
      prefix: "+11",
      type: "number",
      validationSuccess: (value) => {},
      regex: /[2-9]{2}\d{8}/,
      value: "",
    },
  ]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  return (
    <View style={style.screen}>
      <Header
        left={{
          icon: <ArrowLeft />,
          press: () => {
            pagerRef.current?.setPage(0);
          },
        }}
      />
      <KeyboardAvoidingView style={style.container}>
        <View style={{ flexGrow: 1 }}>
          <PagerView
            style={{ flex: 1 }}
            initialPage={0}
            ref={pagerRef}
            scrollEnabled={false}
            onPageSelected={(event: PagerViewOnPageSelectedEvent) => {
              setCurrentPage(event.nativeEvent.position);
            }}
          >
            <View>
              <EnterEmailView />
            </View>
            <View>
              <EnterPhoneNumberView />
            </View>
          </PagerView>
        </View>
      </KeyboardAvoidingView>
      <OnboardingTextField {...textFields[currentPage]} />
    </View>
  );
};

export default OnboardingScreen;

const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
  },
});
