import {configureStore} from "@reduxjs/toolkit";
import UserReducer from "./slices/userReducer.ts";
import AlertReducer from "./slices/alertReducer.ts";

export const store = configureStore({
    reducer: {
        user: UserReducer,
        alert: AlertReducer
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch