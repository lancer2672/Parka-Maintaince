import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { User } from "@src/types";
import { string } from "yup/lib/locale";

interface ResetPasswordParams {
  verificationId: string;
  type: string;
  phoneNumber: string;
}
interface SignUpParams {
  verificationId: string;
  type: string;
  user: User
}

export type AppStackParams = {
  OnboardingScreen: undefined;
  SignIn: undefined;
  SignUp: SignUpParams;
  ResetPassword: ResetPasswordParams;
  Verification: undefined;
  App: undefined;
  NotFound: undefined;
};
