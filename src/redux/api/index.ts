import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAlbum, IComent, IPost, IPostNewComent, IUser, IPhoto } from "./types";
// jsonplaceholder.typicode.com/albums
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
    getAllAlbums: builder.query<IAlbum[], void>({
      query: () => `/albums/`,
    }),
    getAllComments: builder.query<IComent[], void>({
      query: () => `/comments/`,
    }),
    getAllPhotos: builder.query<IPhoto[], void>({
      query: () => `/photos/`,
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
    createPost: builder.mutation<Partial<IPost>, IPost>({
      query(state) {
        return {
          url: `/posts`,
          method: "POST",
          credentials: "include",
          body: state,
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetAllPostsQuery,
  useGetAllCommentsQuery,
  useGetAllAlbumsQuery,
  useCreateComentMutation,
  useCreatePostMutation,
  useGetAllPhotosQuery,
} = userApi;
