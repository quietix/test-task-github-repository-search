import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CacheState {
  [key: string]: any[];
}

const initialState: CacheState = {};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    setCacheEntry(state, action: PayloadAction<{ key: string; data: any[] }>) {
      state[action.payload.key] = action.payload.data;
    },
  },
});

export const { setCacheEntry } = cacheSlice.actions;
export default cacheSlice.reducer;
