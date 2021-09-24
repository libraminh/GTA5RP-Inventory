import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

let initState = {
  currentEvent: "",
};

const EventSlice = createSlice({
  name: "eventSlice",
  initialState: initState,
  reducers: {
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});

export const { setCurrentEvent } = EventSlice.actions;

export default EventSlice.reducer;
