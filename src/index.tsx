import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// パフォーマンス測定を行いたい場合、以下のように関数を渡すことができます。
// 例: reportWebVitals(console.log)
// 詳細: https://bit.ly/CRA-vitals
