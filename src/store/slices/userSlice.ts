import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  displayname: string;
}

const initialState: UserState = {
  id: "",
  displayname: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  //  login: {}
  },
})