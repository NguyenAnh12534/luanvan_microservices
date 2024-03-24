import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Activity from '~/pages/Activity';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';
import HomeIcon from '@mui/icons-material/Home';
import RestoreIcon from '@mui/icons-material/Restore';
import Groups2Icon from '@mui/icons-material/Groups2';
import { createTheme, makeStyles } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import AccountMenu from './AccountMenu';
import LocalStorageKey from '~/Constants/LocalStorageKey';
import CredentialService from '~/Services/CredentialService';
import UserContext from '~/Context/UserContext';
import LoginModalContext from '~/Context/LoginModalContext';

let searchButton = (
    <IconButton type="submit" aria-label="search">
        <SearchIcon color="primary" />
    </IconButton>
);

function MainAppBar(props) {
    const { activePageIndex, onChangeTabbarIndex } = props;
    const [openSignUpModal, setOpenSignUpModal] = React.useState(false);
    const {openSignInModal, setOpenSignInModal} = React.useContext(LoginModalContext);
    const isLogin = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) !== null;

    const handleOpenSignUpModal = () => setOpenSignUpModal(true);
    const handleCloseSignUpModal = () => setOpenSignUpModal(false);
    const handleOpenSignInModal = () => setOpenSignInModal(true);
    const handleCloseSignInModal = () => setOpenSignInModal(false);

    const handleLogOut = () => {
        CredentialService.logOut();
        setUser(null);
    };

    const { setUser } = React.useContext(UserContext);

    return (
        <Box sx={{ marginBottom: 11 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#FFFFFF', boxShadow: 2, py: 2 }}>
                <Toolbar variant="dense">
                    <Link to="/">
                        <img
                            src={process.env.PUBLIC_URL + '/FunQuizz_logo.png'}
                            width="150px"
                            style={{ marginRight: 25 }}
                        />
                    </Link>

                    <TextField
                        id="search-bar"
                        className="text"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        sx={useStyles}
                        InputProps={{ endAdornment: searchButton }}
                    />
                    <Grid container direction="row" justifyContent="end" alignItems="center" marginLeft={3}>
                        <ThemeProvider theme={theme}>
                            {/* <Tabs value={activePageIndex} onChange={onChangeTabbarIndex}>
                                <Tab
                                    label="Home"
                                    value={0}
                                    icon={<HomeIcon fontSize="small" />}
                                    iconPosition="start"
                                    sx={{ fontWeight: '700' }}
                                />
                                <Tab
                                    label="Activity"
                                    value={1}
                                    icon={<RestoreIcon fontSize="small" />}
                                    iconPosition="start"
                                    sx={{ fontWeight: '700' }}
                                />
                                <Tab
                                    label="Classes"
                                    value={2}
                                    icon={<Groups2Icon fontSize="small" />}
                                    iconPosition="start"
                                    sx={{ fontWeight: '700' }}
                                />
                            </Tabs> */}
                            {isLogin ? (
                                <AccountMenu />
                            ) : (
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Button
                                        variant="outlined"
                                        size="medium"
                                        onClick={() => setOpenSignInModal(true)}
                                        sx={{ marginX: 1 }}
                                        disableElevation
                                    >
                                        Sign in
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        onClick={() => setOpenSignUpModal(true)}
                                        disableElevation
                                    >
                                        Sign up
                                    </Button>
                                </Box>
                            )}
                        </ThemeProvider>
                    </Grid>
                </Toolbar>
            </AppBar>

            <SignUpModal
                isOpen={openSignUpModal}
                handleClose={handleCloseSignUpModal}
                handleOpenSignInModal={handleOpenSignInModal}
            />
            <SignInModal
                isOpen={openSignInModal}
                handleClose={handleCloseSignInModal}
                handleOpenSignUpModal={handleOpenSignUpModal}
            />
        </Box>
    );
}

const useStyles = {
    [`& fieldset`]: {
        borderRadius: 30,
    },
    width: '400px',
};

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

export default MainAppBar;
