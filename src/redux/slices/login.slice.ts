import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
  isLoggedIn: boolean;
  userId: number | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  isLoggedIn: false,
  userId: null,
};

export const loginSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setLoggedInUser: (state, { payload }: PayloadAction<number>) => {
      state.userId = payload;
    },
  },
});

export const { login, logout, setLoggedInUser } = loginSlice.actions;

export default loginSlice.reducer;
