import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

let initState = {
  currentTab: "",
};

const GlobalSlice = createSlice({
  name: "GlobalSlice",
  initialState: initState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});

export const { setCurrentTab } = GlobalSlice.actions;

export default GlobalSlice.reducer;
