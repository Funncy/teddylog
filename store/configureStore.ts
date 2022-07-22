import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "../features/user/userSlice";


export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch