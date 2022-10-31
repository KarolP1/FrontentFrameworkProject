import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost, IUser } from "./types";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => `/users/`,
    }),
    getAllPosts: builder.query<IPost[], void>({
      query: () => `/posts/`,
    }),
  }),
});

export const { useGetUsersQuery, useGetAllPostsQuery } = userApi;
