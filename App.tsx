import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar } from "react-native";
import EFTPaymentScreen from "./src/screens/eft-payment-screen";
import OnboardingScreen from "./src/screens/onboarding-screen";
import { theme } from "./src/utils/colors";

interface AppProps {}

export type RootStackParamList = {
  OnboardingScreen: undefined;
  EFTPaymentScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
      <RootStack.Navigator
        initialRouteName="OnboardingScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
        <RootStack.Screen
          name="EFTPaymentScreen"
          component={EFTPaymentScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
