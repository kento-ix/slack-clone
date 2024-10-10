import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch 型
 * アプリケーション全体で一貫したディスパッチ関数の使用を可能にする
 * RootState 型
 * ストアの状態の型を定義し、アプリケーションの全コンポーネントでストアの状態に型安全にアクセスできるようにする
 */