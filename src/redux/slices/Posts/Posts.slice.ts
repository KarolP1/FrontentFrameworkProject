import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface IIPostSlice {
  idsOfLikedPosts: number[] | null;
  numberOfLikes:
    | {
        postId: number;
        numberOfLikes: number;
      }[]
    | null;
}

const initialState: IIPostSlice = {
  idsOfLikedPosts: null,
  numberOfLikes: null,
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
      { payload }: PayloadAction<{ postid: number; numberOfLikes: number }>
    ) => {
      const newItemInState = {
        postId: payload.postid,
        numberOfLikes: payload.numberOfLikes,
      };
      state.numberOfLikes
        ? state.numberOfLikes.push(newItemInState)
        : (state.numberOfLikes = [newItemInState]);
    },
  },
});

export const { increment, setPostLikes } = PostSlice.actions;
