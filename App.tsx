import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar } from "react-native";
import EnterEmailScreen from "./src/screens/enter-email-screen";
import { theme } from "./src/utils/colors";

interface AppProps {}

export type RootStackParamList = {
  EnterEmailScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
      <RootStack.Navigator
        initialRouteName="EnterEmailScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen
          name="EnterEmailScreen"
          component={EnterEmailScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
