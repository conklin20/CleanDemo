import React from 'react';
import { createRoot } from 'react-dom/client';
//#region style sheets
// import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './app/layout/styles.css';
//#endregion
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";


export const history = createBrowserHistory();

const container = document.getElementById('app');
const root = createRoot(container!);

//provide context to the app component (our application)
root.render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <HistoryRouter history={history}>
                <App />
            </HistoryRouter>
        </StoreContext.Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
