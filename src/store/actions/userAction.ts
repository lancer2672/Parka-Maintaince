import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createAction, PayloadAction } from '@reduxjs/toolkit';
import authApi from '@src/api/authApi';
import userApi from '@src/api/userApi';
import { User } from '@src/types';
import axios from 'axios';

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

export {loginAction, createUserAction}