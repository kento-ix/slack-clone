import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './Auth';
import { login, logout } from '../user/userSlice';

const useAuthState = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Firebase Authの認証状態の変更を監視するイベントリスナーを登録
        const unsubscribe = auth.onAuthStateChanged((loginUser) => {
        if (loginUser) {
            // ユーザーがログインしている場合、ユーザーIDをReduxストアに保存
            dispatch(login(loginUser.uid));
        } else {
            // ユーザーがログアウトしている場合、ユーザーIDをReduxストアから削除
            dispatch(logout());
        }
        });

        // コンポーネントがアンマウントされた際にイベントリスナーを解除
        return () => unsubscribe();
    }, [dispatch]);

    return;
}

export default useAuthState;