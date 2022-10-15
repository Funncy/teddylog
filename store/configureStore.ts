import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/user/user.slice';
import { authSlice } from '../features/auth/auth.slice';
import { habitSlice } from '../features/habit/habit.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    habit: habitSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
