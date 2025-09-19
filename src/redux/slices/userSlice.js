import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userDetails: null },
  reducers: {
    addUser: (state, action) => {
      state.userDetails = action.payload;
    },
    removeUser: (state) => {
      state.userDetails = null;
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
