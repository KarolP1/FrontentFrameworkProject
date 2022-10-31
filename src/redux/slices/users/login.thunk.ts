import { createAsyncThunk } from "@reduxjs/toolkit";
import { useGetUsersQuery, userApi } from "../../api";

const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId: number, thunkAPI) => {
    const response = await useGetUsersQuery();
    return response.data;
  }
);
