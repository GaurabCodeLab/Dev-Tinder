import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    data: null,
  },
  reducers: {
    addRequests: (state, action) => {
      state.data = action.payload;
    },
    removeRequests: (state) => {
      state.data = null;
    },
  },
});

export default requestSlice.reducer;
export const { addRequests, removeRequests } = requestSlice.actions;
