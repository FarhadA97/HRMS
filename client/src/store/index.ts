import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/AuthSlice';
import candidateReducer from './slices/candidate/CandidateSlice'
import toastReducer from './slices/toast/ToastSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    candidate:candidateReducer,
    toast:toastReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch