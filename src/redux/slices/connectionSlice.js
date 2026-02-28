import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: {
    data: null,
  },
  reducers: {
    addConnections: (state, action) => {
      state.data = action.payload;
    },
    removeConnections: (state) => {
      state.data = null;
    },
  },
});

export default connectionSlice.reducer;
export const { addConnections, removeConnections } = connectionSlice.actions;
