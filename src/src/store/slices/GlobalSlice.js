import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initState = {
  quantity: 1,
};

const GlobalSlice = createSlice({
  name: "global",
  initialState: initState,
  reducers: {
    setQuantity(state, action) {
      state.quantity = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});

export const { setQuantity } = GlobalSlice.actions;

export default GlobalSlice.reducer;
