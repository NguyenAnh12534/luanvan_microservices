import React from "react";
import { createContext } from "react";

const LoginModalContext = createContext(null)

export const LoginModalProvider = ({ children }) => {
    const [openSignInModal, setOpenSignInModal] = React.useState(false);

    return (
        <LoginModalContext.Provider value={{ openSignInModal, setOpenSignInModal }}>
            {children}
        </LoginModalContext.Provider>
    );
};

export default LoginModalContext;