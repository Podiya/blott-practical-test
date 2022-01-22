import LottieView from "lottie-react-native";
import React, { FC, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "../../utils/colors";
import { Logo } from "../../utils/icons";

export type EnterPhoneNumberViewProp = {
  isTyping: boolean;
};

const EnterPhoneNumberView: FC<EnterPhoneNumberViewProp> = ({ isTyping }) => {
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (isTyping) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.reset();
    }
  }, [isTyping]);

  return (
    <ScrollView
      contentContainerStyle={style.container}
      bounces={false}
      keyboardShouldPersistTaps="always"
    >
      <View style={style.logoRow}>
        <View style={style.logoContainer}>
          <Logo />
        </View>
      </View>
      <View style={style.headerRow}>
        <Text style={style.header}>
          Thanks Benjamin What is your mobile number? 📱
        </Text>
      </View>
      <View style={style.threeDotsRow}>
        <View style={style.threeDotsContainer}>
          <LottieView
            ref={lottieRef}
            source={require("../../utils/lotties/three-dots.json")}
            autoPlay
            loop
          />
        </View>
      </View>
      <View style={style.linearGradientContainer}>
        <LinearGradient
          colors={["#00010C", "#00010C", "#00010C00"]}
          style={{ width: "100%", height: 64 }}
        ></LinearGradient>
      </View>
    </ScrollView>
  );
};

export default EnterPhoneNumberView;

const style = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
  },
  logoRow: {
    width: "100%",
    height: 32,
    paddingLeft: 24,
    justifyContent: "flex-start",
    marginTop: -100,
  },
  logoContainer: { width: 32, height: 32 },
  headerRow: {
    marginTop: 16,
    paddingHorizontal: 24,
    width: "100%",
  },
  header: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
    lineHeight: 28,
    color: "white",
  },
  threeDotsRow: {
    width: "100%",
    height: 54,
    paddingRight: 9,
    alignItems: "flex-end",
  },
  threeDotsContainer: { width: 54, height: 54 },
  linearGradientContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
