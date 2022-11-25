import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComent, IPost, IPostNewComent, IUser } from "./types";

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
    getAllComments: builder.query<IComent[], void>({
      query: () => `/comments/`,
    }),

    createComent: builder.mutation<IComent, IPostNewComent>({
      query(state) {
        return {
          url: `/comments?postId=${state.postId}`,
          method: "POST",
          credentials: "include",
          body: state.coment,
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetAllPostsQuery,
  useGetAllCommentsQuery,
  useCreateComentMutation,
} = userApi;
