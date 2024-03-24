import React, { createContext } from 'react';

const PageIndexContext = createContext(null);

export const PageIndexProvider = ({ children }) => {
    const [activePageIndex, setActivePageIndex] = React.useState(0);
    const onChangeTabbarIndex = (_, val) => {
        setActivePageIndex(val);
    };
    return (
        <PageIndexContext.Provider value={{ activePageIndex, setActivePageIndex, onChangeTabbarIndex }}>
            {children}
        </PageIndexContext.Provider>
    );
};

export default PageIndexContext;
