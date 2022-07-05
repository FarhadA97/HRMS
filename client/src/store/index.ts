import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth';
import toastReducer from './toast';

export const store = configureStore({
  reducer: {
    auth:authReducer,
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