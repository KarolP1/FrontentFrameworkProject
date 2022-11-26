import { IUser } from "./../../api/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface IUserSlice {
  users: IUser[] | null;
  loggedInUser: IUser | null;
}

const initialState: IUserSlice = {
  users: null,
  loggedInUser: null,
};
export const UserSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<IUser[]>) => {
      state.users = payload;
    },
    setUser: (state, { payload }: PayloadAction<IUser | null>) => {
      state.loggedInUser = payload;
    },
    editUser: (state, { payload }: PayloadAction<IUser>) => {
      const newUserList = state.users?.map((user) =>
        user.id === payload.id ? payload : user
      );
      if (newUserList) state.users = newUserList;
    },
  },
});

export const { setUsers, setUser, editUser } = UserSlice.actions;
