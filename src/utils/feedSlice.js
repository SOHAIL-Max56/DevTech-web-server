import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFromFeed: (state, action) => action.payload,
    removeFromFeed: (state, action) => {
      // state is { data: [...] }, not an array!
      if (!state || !state.data) return state;
      
      return {
        ...state,
        data: state.data.filter((user) => user._id !== action.payload)
      };
    },
  },
});

export const { addFromFeed, removeFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
