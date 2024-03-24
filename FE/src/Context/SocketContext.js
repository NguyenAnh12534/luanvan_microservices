import socketio from 'socket.io-client';
import React, { createContext } from 'react';
import UserContext from '~/Context/UserContext';
import SocketService from '~/Services/SocketService';


const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
    const socketService = new SocketService();

    return (
        <SocketContext.Provider value={socketService}>
            {children}
        </SocketContext.Provider>
    );
};


export default SocketContext;