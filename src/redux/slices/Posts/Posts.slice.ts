import { IAlbum, IPhoto, IPost } from "./../../api/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IImageState {
  id: number;
  image: string;
}

interface IIPostSlice {
  idsOfLikedPosts: number[] | null;
  numberOfLikes:
    | {
        postId: number;
        numberOfLikes: number;
      }[]
    | null;
  UserQueryId?: number | null;
  posts: IPost[] | null;
  albums: IAlbum[] | null;
  images: IImageState[] | null;
  photos: IPhoto[] | null;
}

const initialState: IIPostSlice = {
  idsOfLikedPosts: null,
  numberOfLikes: null,
  posts: null,
  images: null,
  albums: null,
  photos: null,
};
export const PostSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, { payload }: PayloadAction<{ id: number }>) => {
      if (!state.idsOfLikedPosts?.includes(payload.id)) {
        state.idsOfLikedPosts = state.idsOfLikedPosts
          ? [...state.idsOfLikedPosts, payload.id]
          : [payload.id];

        const updatedPartOfState = state.numberOfLikes?.filter(
          (post) => post.postId === payload.id
        )[0];
        if (updatedPartOfState) {
          updatedPartOfState.numberOfLikes += 1;

          const newState = state.numberOfLikes?.map((i) =>
            i.postId === payload.id ? updatedPartOfState : i
          );
          if (newState) state.numberOfLikes = newState;
        }
      } else {
        if (state.idsOfLikedPosts) {
          [payload.id, ...state.idsOfLikedPosts] = state.idsOfLikedPosts;
          const filteredState = state.numberOfLikes?.map((i) =>
            i.postId !== payload.id
              ? i
              : { postId: payload.id, numberOfLikes: i.numberOfLikes - 1 }
          );
          if (state.numberOfLikes && filteredState)
            state.numberOfLikes = filteredState;
        }
      }
    },
    setPostLikes: (
      state,
      {
        payload,
      }: PayloadAction<
        {
          postId: number;
          numberOfLikes: number;
        }[]
      >
    ) => {
      state.numberOfLikes = payload;
    },
    addPostLike: (
      state,
      {
        payload,
      }: PayloadAction<{
        postId: number;
      }>
    ) => {
      state.numberOfLikes = state.numberOfLikes
        ? [...state.numberOfLikes, { postId: payload.postId, numberOfLikes: 0 }]
        : [{ postId: payload.postId, numberOfLikes: 0 }];
    },
    setUserQueryId: (
      state,
      { payload }: PayloadAction<{ id: number | null }>
    ) => {
      state.UserQueryId = payload.id;
    },
    setPosts: (state, { payload }: PayloadAction<IPost[]>) => {
      state.posts = payload;
    },
    setPhotos: (state, { payload }: PayloadAction<IPhoto[]>) => {
      state.photos = payload;
    },
    deletePhoto: (state, { payload }: PayloadAction<number>) => {
      const newPhotoState = state.photos?.filter(
        (photo) => photo.id !== payload
      );
      if (newPhotoState) state.photos = newPhotoState;
    },
    addImageToAlbum: (
      state,
      { payload }: PayloadAction<{ albumId: number; id: number; title: string }>
    ) => {
      state.photos?.push({ ...payload, thumbnailUrl: "", url: "" });
    },
    setAlbums: (state, { payload }: PayloadAction<IAlbum[]>) => {
      state.albums = payload;
    },
    addNewPost: (
      state,
      {
        payload,
      }: PayloadAction<{
        title: string;
        body: string;
        id: number;
        userId: number;
      }>
    ) => {
      if (state.posts) {
        state.posts = [...state.posts, { ...payload }];
      } else {
        state.posts = [payload];
      }
    },
    setImages: (
      state,
      { payload }: PayloadAction<{ id: number; image: string }[]>
    ) => {
      state.images = payload;
    },
    setNewImage: (
      state,
      { payload }: PayloadAction<{ id: number; image: string }>
    ) => {
      if (state.images) state.images = [...state.images, payload];
      else {
        state.images = [payload];
      }
    },
  },
});

export const {
  increment,
  setPostLikes,
  addPostLike,
  setUserQueryId,
  setPosts,
  setImages,
  setNewImage,
  addNewPost,
  setAlbums,
  setPhotos,
  addImageToAlbum,
  deletePhoto,
} = PostSlice.actions;
