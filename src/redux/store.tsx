import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api";
import loginSlice from "./slices/login.slice";
import { PostSlice } from "./slices/Posts/Posts.slice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    [userApi.reducerPath]: userApi.reducer,
    Posts: PostSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
