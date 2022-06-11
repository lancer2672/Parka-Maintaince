import { configureStore } from "@reduxjs/toolkit";
import { authSlice, parkingLotSlice } from "./reducers";

export const store = configureStore({
  reducer: {
    parkingLot: parkingLotSlice.reducer,
    auth: authSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
