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
} from "react-native";
import AppButton from "@src/components/common/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@src/constants";
import authApi from "@src/api/authApi";
import { Formik, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";
import { NavigationScreenProp } from "react-navigation";

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const SignIn = (props: Props) => {
  const [isRemember, setIsRemember] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const formikRef = useRef<FormikProps<FormikValues>>();

  const toggleSwitch = async () =>
    setIsRemember((previousState) => !previousState);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const login = async (values: any) => {
    try {
      const user = await authApi.signInAccount(values.email, values.password);
      if (user.data.email) {
        await AsyncStorage.setItem(
          "accessToken",
          JSON.stringify(user.data.accessToken),
        );
        await AsyncStorage.setItem("idUser", JSON.stringify(user.data.idUser));
        await AsyncStorage.setItem(
          "displayname",
          JSON.stringify(user.data.displayname),
        );
        if (isRemember) {
          await AsyncStorage.setItem("username", values.email);
          await AsyncStorage.setItem("password", values.password);
        } else {
          await AsyncStorage.removeItem("username");
          await AsyncStorage.removeItem("password");
        }
        props.navigation.navigate("app");
      } else {
        Alert.alert("Incorrect email or password!");
      }
    } catch (error: any) {
      Alert.alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    const saveIntoAsyncStorage = async () => {
      if (formikRef.current) {
        const username = await AsyncStorage.getItem("username");
        const password = await AsyncStorage.getItem("password");
        formikRef.current.setFieldValue("email", username);
        formikRef.current.setFieldValue("password", password);
      }
    };
  }, [formikRef]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={{ height: "20%", justifyContent: "center" }}>
          <Text style={styles.title}>Sign in</Text>
        </View>
        <Formik
          innerRef={formikRef}
          initialValues={{ email: "", password: "" }}
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
                  <MaterialIcons
                    name="mail-outline"
                    size={22}
                    color={Colors.light.text}
                  />
                  <TextInput
                    placeholder="parka@gmail.com"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    keyboardType="email-address"
                    style={styles.input}
                  />
                  <View style={{ width: 22 }} />
                </View>
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
                <AppButton
                  title="Đăng nhập với Google"
                  style={styles.btnOauth}
                  textStyle={{ color: Colors.light.text }}></AppButton>
                <AppButton
                  title="Đăng nhập với Facebook"
                  style={styles.btnOauth}
                  textStyle={{ color: Colors.light.text }}></AppButton>
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
    backgroundColor: Colors.light.primary,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.8 }],
    paddingLeft: 0,
    marginLeft: 0,
  },
  oauth: {
    width: "100%",
    marginTop: 60,
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
});
export default SignIn;
