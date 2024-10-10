import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import channelReducer from "../feature/channel/channelSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        channel: channelReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;