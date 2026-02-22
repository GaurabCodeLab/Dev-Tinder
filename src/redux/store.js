import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";

const store = configureStore({
  reducer: {
    userDetails: userReducer,
    feed: feedReducer,
  },
  devTools: true,
});

export default store;
