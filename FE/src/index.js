import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/Components/GlobalStyles';
import { PageIndexProvider } from './Context/PageIndexContext';
import { UserContextProvider } from './Context/UserContext';

import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { LoginModalProvider } from './Context/LoginModalContext';
import { SocketContextProvider } from './Context/SocketContext';
import { StreakProvider } from './Context/StreakContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const font = "'Quicksand', sans-serif";
const theme = createTheme({
    typography: {
        fontFamily: font,
        fontSize: 16,
        subtitle1: {
            fontWeight: 700,
        },
    },
});

root.render(
    <GlobalStyles>
        <PageIndexProvider>
            <UserContextProvider>
                <LoginModalProvider>
                    <SocketContextProvider>
                        <StreakProvider>
                            <ThemeProvider theme={theme}>
                                <App />
                            </ThemeProvider>
                        </StreakProvider>
                    </SocketContextProvider>
                </LoginModalProvider>
            </UserContextProvider>
        </PageIndexProvider>
    </GlobalStyles>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
