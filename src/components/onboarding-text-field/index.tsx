import React, { FC, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { theme } from "../../utils/colors";
import { Send } from "../../utils/icons";

export type OnboardingTextFieldProps = {
  label: string;
  prefix?: string;
  type: "number" | "email";
  keyboard: KeyboardTypeOptions;
  regex?: RegExp;
  errorLabel: string;
  ref?: React.LegacyRef<TextInput>;
  value: string;
  validationSuccess?: (value: string) => void;
};

const OnboardingTextField: FC<OnboardingTextFieldProps> = ({
  label,
  prefix,
  keyboard,
  regex,
  errorLabel,
  ref,
  value,
  validationSuccess,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [internalText, setInternalText] = useState<string>(value);

  useEffect(() => {
    setInternalText(value);
  }, [value]);

  const validateField = (text: string) => {
    if (!regex) {
      return true;
    }
    return regex && regex.test(text);
  };

  const onPressSend = () => {
    const validation = validateField(internalText);
    setIsValid(validation);
    if (validation) {
      validationSuccess && validationSuccess(internalText);
    }
  };

  const textView = () => (
    <View style={style.container}>
      <View style={style.fieldLabelContainer}>
        <Text
          style={[style.fieldLabel, { color: isValid ? "#636682" : "#FF5454" }]}
        >
          {isValid ? label : errorLabel}
        </Text>
      </View>
      <View style={style.divider} />
      <View style={style.middleContainer}>
        {prefix && <Text style={style.prefix}>{prefix}</Text>}
        <View style={style.textInputContainer}>
          <TextInput
            keyboardType={keyboard}
            style={style.textInput}
            value={internalText}
            onChangeText={(text) => {
              setInternalText(text);
            }}
          />
        </View>
        <View style={style.rightButtonContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressSend}>
            <Send />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return Platform.OS === "android" ? (
    textView()
  ) : (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-useSafeAreaInsets().bottom}
    >
      <SafeAreaView edges={["bottom"]}>{textView()}</SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default OnboardingTextField;

const style = StyleSheet.create({
  container: {
    height: 90,
    width: "100%",
    backgroundColor: theme.background,
  },
  fieldLabelContainer: {
    height: 24,
    marginHorizontal: 24,
    justifyContent: "center",
  },
  fieldLabel: {
    fontFamily: "Inter-Regular",
    color: "#636682",
    fontSize: 12,
  },
  divider: {
    backgroundColor: "#636682",
    height: 1,
    width: "100%",
  },
  middleContainer: {
    marginHorizontal: 24,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  prefix: {
    fontFamily: "Inter-Regular",
    color: "#636682",
    fontSize: 14,
    marginRight: 10,
  },
  textInputContainer: {
    flex: 1,
    marginRight: 16,
  },
  textInput: {
    height: "100%",
    fontFamily: "Inter-Regular",
    color: "white",
    fontSize: 14,
  },
  rightButtonContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
