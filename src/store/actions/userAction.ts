import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createAction, PayloadAction } from '@reduxjs/toolkit';
import authApi from '@src/api/authApi';
import userApi from '@src/api/userApi';
import { User } from '@src/types';
import axios from 'axios';
import { Alert } from 'react-native';

 const createUserAction = createAsyncThunk('user/create', async (user: User) => {
  try {
    const res = await userApi.createUser(user);
    if(res.data.data){
      return {data: res.data.data};
    }
  } catch (error: any) {
    return {errorMessage: error.message};
  }
  
});

const loginAction = createAsyncThunk('user/login', async (params : {username: string, password: string}) => {
  try {
    const user = await authApi.signInAccount(params.username, params.password);
    if(user.data.data){
      await AsyncStorage.setItem(
        "accessToken",
        JSON.stringify(user.data.accessToken),
        );
        await AsyncStorage.setItem(
          "refreshToken",
          JSON.stringify(user.data.refreshToken),
          );
      return {data: user.data.data};
    }
    else {
      return {errorMessage: "Incorrect username or password!"}
    }
  } catch (error: any) {
    return {errorMessage: error.message};
  }
})

const checkDuplicatePhoneAction = createAsyncThunk('user/check-phone-duplicate', async (phoneNumber: string) => {
  try {
    const res = await userApi.checkDuplicatePhone(phoneNumber);
    if(res)
      return {errorMessage: "Failed! PhoneNumber is already in use"};
    return {};
  } catch (error: any) {
    return {errorMessage: error.message};
  }
})

const checkExistPhoneAction = createAsyncThunk('user/check-phone-exist', async (phoneNumber: string) => {
  try {
    const isExist = await userApi.checkDuplicatePhone(phoneNumber);
    if (!isExist) {
      return {errorMessage: "Failed! PhoneNumber doesn't exist!"};
    }
    return {};
  } catch (error: any) {
    return {errorMessage: error.message};
  }
})

const resetPasswordAction = createAsyncThunk('user/reset-password', async (params: {newPassword: string, phoneNumber: string}) => {
  try {
    const isSuccess = await authApi.resetPassword(params.newPassword, params.phoneNumber);
    if (isSuccess.data.status) {
      const password = await AsyncStorage.getItem("password");
          if (password) {
            await AsyncStorage.setItem("password", params.newPassword);
          }
      Alert.alert(`Your new password is ${params.newPassword}`);
      return {};
    }
    return {errorMessage: "Failed!!"}

  } catch (error: any) {
    return {errorMessage: error.message};
  }
})

export {loginAction, createUserAction, checkDuplicatePhoneAction, resetPasswordAction, checkExistPhoneAction}