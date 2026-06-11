import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import type { Thread, Job, Course, Notification } from "@/types";

interface ForumState {
  threads: Thread[];
  currentThread: Thread | null;
  loading: boolean;
  error: string | null;
  filter: 'trending' | 'newest' | 'popular';
}

const initialState: ForumState = {
  threads: [],
  currentThread: null,
  loading: false,
  error: null,
  filter: 'trending',
};

const forumSlice = createSlice({
  name: "forum",
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<'trending' | 'newest' | 'popular'>) => {
      state.filter = action.payload;
    },
    updateThreadVote: (state, action: PayloadAction<{ threadId: string; voteChange: number }>) => {
      const thread = state.threads.find(t => t.id === action.payload.threadId);
      if (thread) {
        thread.likeCount += action.payload.voteChange;
      }
    },
  },
});

export const { 
  setThreads, 
  setCurrentThread, 
  addThread, 
  setLoading, 
  setError, 
  setFilter,
  updateThreadVote 
} = forumSlice.actions;

const persistConfig = {
  key: "i9ja-forum",
  storage,
  whitelist: ["filter"],
};

export default persistReducer(persistConfig, forumSlice.reducer);
