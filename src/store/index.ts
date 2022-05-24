import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer, 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
