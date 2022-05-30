import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "@src/api/authApi";
import userApi from "@src/api/userApi";

const createUser = createAsyncThunk("user/create", async (user: User) => {
  try {
    const res = await userApi.createUser(user);
    if (res.data.data) {
      return res.data.data;
    }
  } catch (error: any) {
    return { errorMessage: error.message };
  }
});

const login = createAsyncThunk(
  "user/login",
  async (params: { username: string; password: string }) => {
    try {
      const { data } = await authApi.signInAccount(
        params.username,
        params.password,
      );
      if (data.data) {
        await AsyncStorage.setItem(
          "accessToken",
          JSON.stringify(data.accessToken),
        );
        await AsyncStorage.setItem(
          "refreshToken",
          JSON.stringify(data.refreshToken),
        );
        await AsyncStorage.setItem("idUser", JSON.stringify(data.data.idUser));
        const idUser = await AsyncStorage.getItem("idUser");
        console.log(idUser);
        return data.data;
      } else {
        return { errorMessage: "Incorrect username or password!" };
      }
    } catch (error: any) {
      return { errorMessage: error.message };
    }
  },
);

const updateUser = createAsyncThunk("user/update", async (user: User) => {
  try {
    const res = await userApi.updateUser(user);
    if (res.data.data) {
      return res.data.data;
    }
  } catch (error: any) {
    return { errorMessage: error.message };
  }
});

const getUser = createAsyncThunk("user/get", async (idUser: string) => {
  const res = await userApi.getUserById(idUser);
  return res.data;
});

export { login, createUser, updateUser, getUser };
