import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface IResetPasswordParams {
  verificationId: string;
  type: string;
  phoneNumber: string;
}

interface IVerificationParams {
  phoneNumber: string;
}

export type AppStackParams = {
  OnboardingScreen: undefined;
  SignIn: undefined;
  App: undefined;
  NotFound: undefined;
  QRCode: undefined;
};
