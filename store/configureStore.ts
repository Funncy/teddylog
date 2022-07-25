import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/user/userSlice';
import { authSlice } from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
