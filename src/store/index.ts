import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./reducers/counterSlice";
import parkingLotSlice from "./reducers/parkingLotSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    parkingLot: parkingLotSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
