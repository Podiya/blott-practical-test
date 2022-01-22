import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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

const OnboardingScreen: FC<OnboardingScreenProps> = ({ navigation }) => {
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
      onChangeValue: (value) => {
        var fields = textFields;
        fields[0].value = value;
        setTextFields([...fields]);
      },
    },
    {
      errorLabel: "Looks wrong",
      keyboard: "phone-pad",
      label: "Enter your mobile number",
      prefix: "+11",
      type: "number",
      validationSuccess: () => {
        navigation.push("EFTPaymentScreen");
      },
      regex: /^\d{10}$/,
      value: "",
      onChangeValue: (value) => {
        var fields = textFields;
        fields[1].value = value;
        setTextFields([...fields]);
      },
    },
  ]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <EnterEmailView isTyping={isTyping} />
              </View>
              <View>
                <EnterPhoneNumberView isTyping={isTyping} />
              </View>
            </PagerView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <OnboardingTextField
        {...textFields[currentPage]}
        didBlur={() => setIsTyping(false)}
        didFocus={() => setIsTyping(true)}
      />
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
