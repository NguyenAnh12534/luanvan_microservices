import React from "react";
import { createContext } from "react";

const StreakContext = createContext(null);

export const StreakProvider = ({ children }) => {
    const [streak, setStreak] = React.useState([]);

    return (
        <StreakContext.Provider value={{ streak, setStreak }}>
            {children}
        </StreakContext.Provider>
    );
};

export default StreakContext;