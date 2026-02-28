import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionReducer from "./slices/connectionSlice";
import requestsReducer from "./slices/requestSlice";

const store = configureStore({
  reducer: {
    userDetails: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestsReducer,
  },
  devTools: true,
});

export default store;
