import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Thread } from "@/types";

interface ThreadState {
  threads: Thread[];
  currentThread: Thread | null;
  loading: boolean;
  error: string | null;
}

const initialState: ThreadState = {
  threads: [],
  currentThread: null,
  loading: false,
  error: null,
};

const threadSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    setThreads: (state, action: PayloadAction<Thread[]>) => {
      state.threads = action.payload;
      state.error = null;
    },
    setCurrentThread: (state, action: PayloadAction<Thread | null>) => {
      state.currentThread = action.payload;
    },
    addThread: (state, action: PayloadAction<Thread>) => {
      state.threads.unshift(action.payload);
    },
    updateThread: (state, action: PayloadAction<Thread>) => {
      const index = state.threads.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.threads[index] = action.payload;
      }
      if (state.currentThread?.id === action.payload.id) {
        state.currentThread = action.payload;
      }
    },
    deleteThread: (state, action: PayloadAction<string>) => {
      state.threads = state.threads.filter((t) => t.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setThreads,
  setCurrentThread,
  addThread,
  updateThread,
  deleteThread,
  setLoading,
  setError,
} = threadSlice.actions;

export default threadSlice.reducer;
