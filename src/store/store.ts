import { configureStore } from "@reduxjs/toolkit";
import { themeSliceReducer } from "./themeSlice";
import { mobileNavReducer } from "./mobileNavSlice";

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    mobileNav: mobileNavReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
