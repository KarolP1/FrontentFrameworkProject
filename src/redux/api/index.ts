import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "./types";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: (name) => `/users/`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
