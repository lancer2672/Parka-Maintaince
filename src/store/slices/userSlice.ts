import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@src/types";
import { checkDuplicatePhoneAction, checkExistPhoneAction, createUserAction, loginAction } from "../actions/userAction";

interface UserState {
  data: User;
  errorMessage: string;
  isLoading: boolean; 
}

const initialState: UserState = {
  data: null,
  errorMessage: "",
  isLoading: false
};

const arrAction = [loginAction, createUserAction, checkDuplicatePhoneAction, checkExistPhoneAction];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    arrAction.forEach((thunk) => builder.addCase(thunk.pending, (state) => {
      state.isLoading = true;
    }));
    arrAction.forEach((thunk) => builder.addCase(thunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state = {...state,...action.payload};
    }));
    arrAction.forEach((thunk) => builder.addCase(thunk.rejected, (state, action : any) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.errorMessage;
      } 
    }));
  },
})