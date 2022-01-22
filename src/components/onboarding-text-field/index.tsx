import React, { FC, useEffect, useRef, useState } from "react";
import {
  Animated,
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
import { Cancel, Send } from "../../utils/icons";

export type OnboardingTextFieldProps = {
  label: string;
  prefix?: string;
  type: "number" | "email";
  keyboard: KeyboardTypeOptions;
  regex?: RegExp;
  errorLabel: string;
  ref?: React.LegacyRef<TextInput>;
  value: string;
  validationSuccess?: () => void;
  onChangeValue?: (value: string) => void;
  didFocus?: () => void;
  didBlur?: () => void;
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
  onChangeValue,
  didFocus,
  didBlur,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [internalText, setInternalText] = useState<string>(value);
  const labelOpacity = useState(new Animated.Value(1))[0];
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setInternalText(value);
  }, [value]);

  const validateField = (text: string) => {
    if (!regex) {
      return true;
    }
    return regex && regex.test(text);
  };

  const validityAnimation = (value: boolean) => {
    Animated.timing(labelOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsValid(value);
      Animated.timing(labelOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {});
    });
  };

  const onPressSend = () => {
    if (!isValid) {
      validityAnimation(true);
      setInternalText("");
      onChangeValue && onChangeValue("");
    } else {
      const validation = validateField(internalText);
      validityAnimation(validation);
      if (validation) {
        validationSuccess && validationSuccess();
      }
    }
  };

  const renderSendCancelButton = () => {
    var button = () => (isValid ? <Send /> : <Cancel />);
    return (
      <View style={style.rightButtonContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPressSend}>
          {button()}
        </TouchableOpacity>
      </View>
    );
  };

  const textView = () => (
    <View style={style.container}>
      <View style={style.fieldLabelContainer}>
        <Animated.Text
          style={[
            style.fieldLabel,
            { color: isValid ? "#636682" : "#FF5454", opacity: labelOpacity },
          ]}
        >
          {isValid ? label : errorLabel}
        </Animated.Text>
      </View>
      <View style={style.divider} />
      <View style={style.middleContainer}>
        {prefix && <Text style={style.prefix}>{prefix}</Text>}
        <View style={style.textInputContainer}>
          <TextInput
            ref={textInputRef}
            keyboardType={keyboard}
            style={style.textInput}
            value={internalText}
            onChangeText={(text) => {
              if (!isValid) {
                validityAnimation(true);
              }
              setInternalText(text);
              onChangeValue && onChangeValue(text);
            }}
            selectionColor={"white"}
            onBlur={() => didBlur && didBlur()}
            onFocus={() => didFocus && didFocus()}
          />
        </View>
        {renderSendCancelButton()}
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
