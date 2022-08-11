import React from 'react';
import { createRoot } from 'react-dom/client';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
    //provide context to the app component (our application)
    <StoreContext.Provider value={store}>
        <App />
    </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
