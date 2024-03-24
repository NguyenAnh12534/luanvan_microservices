import { Fragment, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/Components/Layout';
import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import LocalStorageKey from './Constants/LocalStorageKey';
import UserService from './Services/UserService';
import UserContext, { UserContextProvider } from './Context/UserContext';
import LocalStorageService from './Services/LocalStorageService';

function App() {
    // const socket = io.connect("http://localhost:4000");
    const { setUser } = React.useContext(UserContext);

    React.useEffect(() => {
        const { email } = LocalStorageService.get();

        if (email !== null) {
            UserService.get(
                email,
                (response) => {
                    setUser(response.data.data);
                },
                (error) => console.log(error),
            );
        }
    }, []);

    return (
        <Router>
            <div className="App" style={{ padding: 0, margin: 0 }}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Container maxWidth="xl" disableGutters>
                                            <Page />
                                        </Container>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
