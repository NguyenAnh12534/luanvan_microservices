import React, { useContext } from 'react';
import MainAppBar from '~/Components/Assets/AppBar';
import PageIndexContext from '~/Context/PageIndexContext';
import Footer from '~/Components/Layout/Footer';
function DefaultLayout({ children }) {
    const pageIndex = useContext(PageIndexContext);
    return (
        <React.Fragment>
            <MainAppBar
                activePageIndex={pageIndex.activePageIndex}
                onChangeTabbarIndex={pageIndex.onChangeTabbarIndex}
            />
            {children}
            {/* <Footer /> */}
        </React.Fragment>
    );
}

export default DefaultLayout;
