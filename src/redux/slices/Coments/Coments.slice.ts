import { IComent } from "./../../api/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface ICommentsSlice {
  comment: IComent[] | null;
}

const initialState: ICommentsSlice = {
  comment: null,
};
export const CommentsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setComments: (state, { payload }: PayloadAction<IComent[]>) => {
      state.comment = payload;
    },
    addComment: (state, { payload }: PayloadAction<IComent>) => {
      state.comment?.push(payload);
    },
    deleteComment: (state, { payload }: PayloadAction<number>) => {
      const newComentsFilter = state.comment?.filter(
        (coment) => coment.id !== payload
      );
      if (newComentsFilter) state.comment = newComentsFilter;
    },
  },
});

export const { setComments, addComment, deleteComment } = CommentsSlice.actions;
