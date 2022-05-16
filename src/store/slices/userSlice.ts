import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@src/types";
import { State } from "react-native-gesture-handler";
import { createUserAction, loginAction } from "../actions/userAction";

interface UserState {
  data: User;
  errorMessage: string;
  loading: boolean; 
}

const initialState: UserState = {
  data: null,
  errorMessage: "",
  loading: true
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [loginAction, createUserAction].forEach((thunk) => builder.addCase(thunk.pending, (state) => {
      state.loading = true;
    }));
    [loginAction, createUserAction].forEach((thunk) => builder.addCase(thunk.fulfilled, (state, action) => {
      state = {...state,...action.payload};
      state.loading = false;
    }));
    [loginAction, createUserAction].forEach((thunk) => builder.addCase(thunk.rejected, (state, action : any) => {
      state.loading = false;
      if (action.payload) {
        state.errorMessage = action.payload.errorMessage;
      } 
    }));
  },
})