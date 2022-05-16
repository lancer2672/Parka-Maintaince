import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import userApi from "@src/api/userApi";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { getApp, initializeApp } from "firebase/app";
import { getAuth, PhoneAuthProvider } from "firebase/auth";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from "react-navigation";
import * as Yup from "yup";

const auth = getAuth();
const app = getApp();

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const SignUp = (props: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const recaptchaVerifier = useRef(null);

  //validate
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name!"),
    email: Yup.string().email("Invalid email").required("Please enter email!"),
    phonenumber: Yup.string()
      .matches(new RegExp("^0"), "Invalid phone number")
      .required("Please enter phone number!")
      .length(10, "Phone number must include 10 numbers"),
    password: Yup.string().required("Please enter password!"),
    passwordConfirm: Yup.string().required("Please enter password!"),
  });

  //handle sign up
  const handleSignUp = async (values: any) => {
    try {
      const isExist = await userApi.checkDuplicateEmail(values.email);
      if (isExist) {
        Alert.alert("Failed! Email is already in use! ");
        return;
      }
      if (values.password !== values.passwordConfirm) {
        Alert.alert("Failed! Password does not match! ");
        return;
      }
      const phoneProvider = new PhoneAuthProvider(auth);
      const phonenumber = `+84${values.phonenumber.slice(
        1,
        values.phonenumber.length,
      )}`;
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phonenumber,
        recaptchaVerifier.current,
      );
      props.navigation.navigate("Verification", {
        ...values,
        type: "SignUp",
        verificationId,
      });
    } catch (error: any) {
      Alert.alert(`Error: ${error.message}`);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView>
        <View style={styles.container}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={app.options}
          />
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => props.navigation.navigate("SignIn")}
          />

          <Text style={styles.title}>Sign up</Text>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                phonenumber: "",
                password: "",
                passwordConfirm: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => handleSignUp(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.containerInput}>
                    <View style={styles.groupInput}>
                      <MaterialCommunityIcons
                        name="account-outline"
                        size={24}
                        style={styles.icon}
                      />
                      <TextInput
                        onChangeText={handleChange("name")}
                        placeholder="Họ và tên"
                        value={values.name}
                        style={styles.input}
                      />
                      <View style={{ width: 22 }} />
                    </View>
                    {errors.name && touched.name ? (
                      <Text style={styles.validateError}>* {errors.name}</Text>
                    ) : null}
                    <View style={styles.groupInput}>
                      <MaterialIcons
                        name="mail-outline"
                        size={22}
                        style={styles.icon}
                      />
                      <TextInput
                        onChangeText={handleChange("email")}
                        placeholder="parka@gmail.com"
                        value={values.email}
                        style={styles.input}
                        keyboardType="email-address"
                      />
                    </View>
                    {errors.email && touched.email ? (
                      <Text style={styles.validateError}>* {errors.email}</Text>
                    ) : null}
                    <View style={styles.groupInput}>
                      <Feather name="phone" size={24} style={styles.icon} />
                      <TextInput
                        onChangeText={handleChange("phonenumber")}
                        placeholder="Số điện thoại"
                        value={values.phonenumber}
                        style={styles.input}
                        maxLength={10}
                        keyboardType="numeric"
                      />
                    </View>
                    {errors.phonenumber && touched.phonenumber ? (
                      <Text style={styles.validateError}>
                        * {errors.phonenumber}
                      </Text>
                    ) : null}
                    <View style={styles.groupInput}>
                      <MaterialCommunityIcons
                        name="key-outline"
                        size={22}
                        style={styles.icon}
                      />
                      <TextInput
                        onChangeText={handleChange("password")}
                        placeholder="Mật khẩu"
                        secureTextEntry={secureTextEntry}
                        value={values.password}
                        style={styles.input}
                      />
                      <Octicons
                        name="eye-closed"
                        size={22}
                        style={styles.icon}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                      />
                    </View>
                    {errors.password && touched.password ? (
                      <Text style={styles.validateError}>
                        * {errors.password}
                      </Text>
                    ) : null}
                    <View style={styles.groupInput}>
                      <MaterialCommunityIcons
                        name="key-outline"
                        size={22}
                        style={styles.icon}
                      />
                      <TextInput
                        onChangeText={handleChange("passwordConfirm")}
                        placeholder="Nhập lại mật khẩu"
                        value={values.passwordConfirm}
                        style={styles.input}
                        secureTextEntry={secureTextEntry}
                      />
                      <Octicons
                        name="eye-closed"
                        size={22}
                        style={styles.icon}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                      />
                    </View>
                    {errors.passwordConfirm && touched.passwordConfirm ? (
                      <Text style={styles.validateError}>
                        * {errors.passwordConfirm}
                      </Text>
                    ) : null}
                  </View>
                  <AppButton
                    title="Next"
                    style={styles.btnNext}
                    color="white"
                    textStyle={{ fontSize: 22, fontWeight: "600" }}
                    onPress={handleSubmit}
                  />
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginTop: 10,
    marginBottom: 20,
  },
  containerInput: {
    paddingLeft: 20,
    paddingRight: 20,
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
  btnNext: {
    height: 56,
    margin: 20,
    marginTop: 40,
    justifyContent: "center",
  },
  icon: {
    color: Colors.light.text,
  },
  validateError: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    marginBottom: -10,
  },
});
