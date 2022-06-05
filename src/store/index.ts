import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import bookingSlice from "./slices/bookingSlice";
import counterReducer from "./slices/counterSlice";
import reservationSlice from "./slices/reservationSlice";
import timeFrameSlice from "./slices/timeFrameSlice";
import { userSlice } from "./slices/userSlice";
import { vehicleSlice } from "./slices/vehicleSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer,
    vehicles: vehicleSlice.reducer,
    reservation: reservationSlice.reducer,
    booking: bookingSlice.reducer,
    timeFrame: timeFrameSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
