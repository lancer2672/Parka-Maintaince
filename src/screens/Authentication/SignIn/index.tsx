import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AppButton from "@src/components/common/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@src/constants";
import authApi from "@src/api/authApi";
import { Formik, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";
import { NavigationScreenProp } from "react-navigation";
import { FacebookLoginButton } from "@src/components/Login/FacebookLoginButton";
import GoogleLoginButton from "@src/components/Login/GoogleLoginButton";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { loginAction } from "@src/store/actions/userAction";
import { RootState } from "@src/store";
import { loginWithOauth } from "@src/store/slices/userSlice";
import { User } from "@src/types";

type Props = {
  navigation: NavigationScreenProp<any, any>;
};
type LoginValue = {
  phoneNumber: string;
  password: string;
};

const SignIn = (props: Props) => {
  const [isRemember, setIsRemember] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useAppDispatch();
  const formikRef = useRef<FormikProps<LoginValue>>();
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state: RootState) => state.user.isLoading);

  const LoginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(new RegExp("^0"), "Invalid phone number")
      .required("Please enter phone number!")
      .length(10, "Phone number must include 10 numbers")
      .nullable(),
    password: Yup.string().required("Please enter password").nullable(),
  });

  const toggleSwitch = async () =>
    setIsRemember((previousState) => !previousState);

  const login = async (values: any) => {
    try {
      const result = await dispatch(
        loginAction({
          username: values.phoneNumber,
          password: values.password,
        }),
      ).unwrap();

      if (result.errorMessage) {
        Alert.alert("Error: " + result.errorMessage);
        return;
      }
      if (isRemember) {
        await AsyncStorage.setItem("phoneNumber", values.phoneNumber);
        await AsyncStorage.setItem("password", values.password);
      } else {
        await AsyncStorage.removeItem("phoneNumber");
        await AsyncStorage.removeItem("password");
      }
      props.navigation.navigate("App");
    } catch (error: any) {
      Alert.alert("Error: " + error);
    }
  };

  const handleLoginWithOauth = (newUser: User) => {
    dispatch(loginWithOauth(newUser));
    props.navigation.navigate("App");
  };

  useEffect(() => {
    const saveIntoAsyncStorage = async () => {
      if (formikRef.current) {
        const phoneNumber = await AsyncStorage.getItem("phoneNumber");
        const password = await AsyncStorage.getItem("password");
        formikRef.current.setFieldValue("phoneNumber", phoneNumber);
        formikRef.current.setFieldValue("password", password);
      }
    };
    saveIntoAsyncStorage();
  }, [formikRef]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={{ height: "20%", justifyContent: "center" }}>
          <Text style={styles.title}>Sign in</Text>
        </View>
        <Formik
          innerRef={formikRef}
          initialValues={{ phoneNumber: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => login(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.controller}>
              <View style={styles.containerInput}>
                <View style={styles.groupInput}>
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={22}
                    color={Colors.light.text}
                  />
                  <TextInput
                    placeholder="0326089954"
                    onChangeText={handleChange("phoneNumber")}
                    value={values.phoneNumber}
                    keyboardType="number-pad"
                    style={styles.input}
                  />
                  <View style={{ width: 22 }} />
                </View>
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.validateError}>
                    * {errors.phoneNumber}
                  </Text>
                )}
                <View style={styles.groupInput}>
                  <MaterialCommunityIcons
                    name="key-outline"
                    size={22}
                    color={Colors.light.text}
                  />
                  <TextInput
                    placeholder="Mật khẩu"
                    onChangeText={handleChange("password")}
                    value={values.password}
                    style={styles.input}
                    secureTextEntry={hidePassword}
                  />
                  <Octicons
                    name="eye-closed"
                    size={22}
                    color={Colors.light.text}
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.validateError}>* {errors.password}</Text>
                )}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 30,
                }}>
                <Switch
                  trackColor={{
                    false: "#FFF",
                    true: Colors.light.tabIconSelected,
                  }}
                  thumbColor={isRemember ? "#FFF" : "#8F8F9D"}
                  onValueChange={toggleSwitch}
                  value={isRemember}
                  style={styles.switch}
                />
                <Text
                  style={{
                    color: Colors.light.text,
                    marginLeft: 5,
                  }}>
                  Remember me
                </Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    props.navigation.navigate("ResetPassword");
                  }}>
                  <Text
                    style={{
                      textAlign: "right",
                      color: Colors.light.text,
                      fontWeight: "700",
                    }}>
                    Quên mật khẩu?
                  </Text>
                </TouchableOpacity>
              </View>
              <AppButton
                title="Sign in"
                style={styles.btnSignIn}
                color="white"
                backgroundColor={isLoading ? "#A498ED" : Colors.light.primary}
                isLoading={isLoading}
                textStyle={{ fontSize: 22, fontWeight: "600" }}
                onPress={handleSubmit}
              />
              <View style={styles.oauth}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "#90A3BC",
                    marginBottom: 5,
                    fontWeight: "600",
                  }}>
                  OR
                </Text>
                <View style={{ marginBottom: 10 }}>
                  <GoogleLoginButton handleLogin={handleLoginWithOauth} />
                </View>
                <View>
                  <FacebookLoginButton handleLogin={handleLoginWithOauth} />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 15,
                    marginBottom: 10,
                  }}>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("SignUp");
                    }}>
                    <Text
                      style={{
                        color: Colors.light.primary,
                        fontSize: 16,
                        fontWeight: "800",
                        marginLeft: 10,
                      }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.primary,
    height: "100%",
    alignItems: "center",
  },
  controller: {
    height: "80%",
    width: "100%",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 50,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
  },
  containerInput: {
    width: "100%",
  },
  groupInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#90A3BC",
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    color: Colors.light.text,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
  },
  btnSignIn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.8 }],
    paddingLeft: 0,
    marginLeft: 0,
    marginTop: 5,
  },
  oauth: {
    width: "100%",
    marginTop: 50,
  },
  btnOauth: {
    backgroundColor: "#FFF",
    color: Colors.light.text,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 10,
  },
  iconOauth: {
    marginRight: 10,
  },
  validateError: {
    color: "red",
    fontSize: 14,
    marginTop: 2,
    marginBottom: -12,
  },
});
export default SignIn;
