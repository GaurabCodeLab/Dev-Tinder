import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feedData: null,
  },
  reducers: {
    addFeed: (state, action) => {
      state.feedData = action.payload;
    },
    removeFeed: (state) => {
      state.feedData = null;
    },
  },
});

export default feedSlice.reducer;
export const { addFeed, removeFeed } = feedSlice.actions;
