import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { RootStackParamList } from "../../../App";
import Header from "../../components/header";
import { theme } from "../../utils/colors";
import { fetchUsers } from "../../utils/graphql";
import { User } from "../../utils/graphql/models";
import { ArrowLeft } from "../../utils/icons";

type EFTPaymentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EFTPaymentScreen"
>;

const EFTPaymentScreen: FC<EFTPaymentScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function allUsers() {
      findCorrectUser(await fetchUsers());
    }
    allUsers();
  }, []);

  function findCorrectUser(users: User[] | undefined) {
    if (users) {
      const user = users.find((user) => {
        return user.name !== "";
      });
      setUser(user);
    }
  }

  const amountTextView = () => {
    return (
      <View style={style.amountTextContainer}>
        <Text style={style.amountText}>Amount</Text>
      </View>
    );
  };

  const availableTextView = () => {
    return (
      <View style={style.availableTextContainer}>
        <Text style={style.availableText}>R800.00 Avl.</Text>
      </View>
    );
  };

  const payTextView = () => {
    return (
      <View style={style.payTextContainer}>
        <Text style={style.payText}>Pay</Text>
      </View>
    );
  };

  const eftUserEditView = () => {
    const names = user?.name.split(" ");
    var avatarName = "";
    if (names && names.length >= 2) {
      avatarName = names[0][0].toUpperCase() + names[1][0].toUpperCase();
    }

    return (
      <View style={style.eftUserEditContainer}>
        <View style={style.eftUserAvatarTextContainer}>
          <Text style={style.eftUserAvatarText}>{avatarName}</Text>
        </View>
        <View style={style.eftUserNameContainer}>
          <Text style={style.eftUserName}>{user?.name}</Text>
          <Text style={style.eftUserAccountNumber}>FNB • • • • 9547</Text>
        </View>
        <View style={style.eftUserEditBaseContainer}>
          <TouchableOpacity
            activeOpacity={0.4}
            style={style.eftUserEditTouchableContainer}
          >
            <Text style={style.eftUserEditText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const editAmountView = () => {
    return (
      <View style={style.editAmountContainer}>
        <View style={style.editAmountRTextContainer}>
          <Text style={style.editAmountRText}>R</Text>
        </View>
        <View style={style.editAmountTextInputContainer}>
          <TextInput
            placeholderTextColor="#5D5D79"
            placeholder="0.00"
            keyboardType="numeric"
            textAlignVertical="center"
            style={style.editAmountTextInput}
          />
          <View style={style.editAmountFNBFeesContainer}>
            <Text style={style.editAmountFNBFeesText}>R5.00 FNB Fees</Text>
          </View>
        </View>
      </View>
    );
  };

  const instantEFTCheckView = () => {
    return (
      <>
        <View style={style.instantEFTCheckContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={style.instantEFTCheckTouchableContainer}
          ></TouchableOpacity>
          <View style={style.instantEFTTextContainer}>
            <Text style={style.instantEFTText}>Instant EFT</Text>
          </View>
        </View>
        <View style={style.instantEFTApplyFeesContainer}>
          <View style={style.instantEFTApplyFeesSubContainer}>
            <Text style={style.instantEFTApplyFeesText}>
              R10.00 Fee Applies
            </Text>
          </View>
        </View>
      </>
    );
  };

  const subViews = () => {
    return (
      <>
        {amountTextView()}
        {availableTextView()}
        {payTextView()}
        {eftUserEditView()}
        {editAmountView()}
        {instantEFTCheckView()}
      </>
    );
  };

  return (
    <View style={style.screen}>
      <Header
        left={{
          icon: <ArrowLeft />,
          press: () => {
            navigation.canGoBack() && navigation.goBack();
          },
        }}
        right={{
          text: "Confirm",
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {Platform.OS === "android" ? (
          <View style={style.container}>{subViews()}</View>
        ) : (
          <KeyboardAvoidingView
            style={style.container}
            behavior="padding"
            keyboardVerticalOffset={-useSafeAreaInsets().bottom}
          >
            <SafeAreaView edges={["bottom"]}>{subViews()}</SafeAreaView>
          </KeyboardAvoidingView>
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default EFTPaymentScreen;

const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  amountTextContainer: { marginLeft: 70, marginRight: 24 },
  amountText: {
    color: "#FFFFFF",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 14,
  },
  availableTextContainer: { marginLeft: 70, marginRight: 24, marginTop: 10 },
  availableText: {
    color: "#70669C",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 12,
  },
  payTextContainer: { marginLeft: 70, marginRight: 24, marginTop: 32 },
  payText: {
    color: "#55ADFF",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 12,
    lineHeight: 24,
  },
  eftUserEditContainer: {
    marginLeft: 70,
    marginRight: 24,
    marginTop: 15,
    flexDirection: "row",
  },
  eftUserAvatarTextContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#55ADFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  eftUserAvatarText: {
    color: "#FFFFFF",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 18,
    lineHeight: 22,
  },
  eftUserNameContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 20,
    flex: 1,
    justifyContent: "center",
  },
  eftUserName: {
    color: "#FFFFFF",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 14,
    lineHeight: 16,
  },
  eftUserAccountNumber: {
    marginTop: 5,
    color: "#70669C",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 11,
    lineHeight: 14,
  },
  eftUserEditBaseContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  eftUserEditTouchableContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderColor: "#1D1C2F",
    borderWidth: 1.5,
    height: 28,
    paddingHorizontal: 16,
  },
  eftUserEditText: {
    color: "#FFFFFF",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 12,
    lineHeight: 14.4,
    textAlign: "center",
  },
  editAmountContainer: {
    marginLeft: 70,
    marginRight: 24,
    marginTop: 40,
    flexDirection: "row",
  },
  editAmountRTextContainer: { flexDirection: "column" },
  editAmountRText: {
    marginTop: Platform.OS === "ios" ? 12 : 16,
    color: "#5D5D79",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 16,
    lineHeight: 16,
  },
  editAmountTextInputContainer: {
    width: "100%",
    marginLeft: 10,
    flexDirection: "column",
  },
  editAmountTextInput: {
    fontSize: 50,
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    paddingTop: 0,
    paddingBottom: 0,
    color: "#5D5D79",
    paddingVertical: 0,
    padding: 0,
    paddingHorizontal: 0,
    marginRight: 24,
  },
  editAmountFNBFeesContainer: { marginLeft: 2 },
  editAmountFNBFeesText: {
    color: "#5D5D79",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 12,
    lineHeight: 22,
  },
  instantEFTCheckContainer: {
    marginLeft: 70,
    marginRight: 24,
    marginTop: 34,
    flexDirection: "row",
  },
  instantEFTCheckTouchableContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: "#454760",
    borderWidth: 1.5,
  },
  instantEFTTextContainer: {
    marginLeft: 14,
    justifyContent: "center",
  },
  instantEFTText: {
    color: "#FFFFFF",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 12,
    lineHeight: 14,
  },
  instantEFTApplyFeesContainer: {
    marginLeft: 70,
    marginRight: 24,
    flexDirection: "row",
  },
  instantEFTApplyFeesSubContainer: {
    marginTop: 4,
    marginLeft: 34,
    justifyContent: "center",
  },
  instantEFTApplyFeesText: {
    color: "#5D5D79",
    fontFamily: "ITC Avant Garde Gothic LT Medium",
    fontSize: 12,
    lineHeight: 22,
  },
});
