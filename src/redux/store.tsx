import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api";
import { CommentsSlice } from "./slices/Coments/Coments.slice";
import loginSlice from "./slices/login.slice";
import { PostSlice } from "./slices/Posts/Posts.slice";
import { UserSlice } from "./slices/Users/Users.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  login: loginSlice,
  Posts: PostSlice.reducer,
  Users: UserSlice.reducer,
  Comments: CommentsSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
