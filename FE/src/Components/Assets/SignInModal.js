import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import CredentialService from '~/Services/CredentialService';
import LocalStorageKey from '~/Constants/LocalStorageKey';
import UserService from '~/Services/UserService';
import UserContext from '~/Context/UserContext';
import SocketContext from '~/Context/SocketContext';

const SignInModal = (props) => {
    const { isOpen, handleClose, handleOpenSignUpModal } = props;

    const socketService = React.useContext(SocketContext);
    const { user, setUser } = React.useContext(UserContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState({});

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const isFormNotValid = () => email == '' || password == '';

    const onSubmit = (_) => {
        CredentialService.login(
            email,
            password,
            (response) => {
                localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, response.data.accessToken);
                localStorage.setItem(LocalStorageKey.CURRENT_USER_EMAIL, response.data.email);
                socketService.currentEmail = response.data.email;
                fetchUser(response.data.email);
            },
            (error) => {
                setError(error);
            },
        );
    };

    const fetchUser = (email) => {
        UserService.get(
            email,
            (response) => {
                let data = response.data.data;
                localStorage.setItem(LocalStorageKey.CURRENT_USER_ID, data.id);
                setUser({ ...data });
                setError({});
                handleClose(true);
            },
            (error) => {
                console.log(error);
            },
        );
    };

    useEffect(() => {
        return () => {
            setEmail('');
            setPassword('');
            setError({});
        };
    }, [isOpen]);

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box component="form" sx={containerStyle}>
                <Avatar sx={avatarStyle}>
                    <LockOpenIcon />
                </Avatar>
                <img src={process.env.PUBLIC_URL + '/banner_form.png'} width="100%" />

                <Typography sx={labelStyle}> Email </Typography>
                <TextField
                    placeholder="Email Address"
                    variant="outlined"
                    size="small"
                    name="email"
                    fullWidth={true}
                    helperText={'email' in error ? error.email : ''}
                    onChange={handleEmailChange}
                    required
                    autoFocus
                    error={'email' in error}
                />

                <Typography sx={labelStyle} marginTop={2}>
                    Password
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    name="password"
                    placeholder="Password"
                    fullWidth={true}
                    helperText={'password' in error ? error.password : ''}
                    onChange={handlePasswordChange}
                    error={'password' in error}
                />

                <Button variant="text" color="primary" sx={textButtonStyle} disableElevation>
                    Forgot password?
                </Button>

                <Button
                    variant="contained"
                    fullWidth={true}
                    color="primary"
                    sx={signUpButtonStyle}
                    onClick={onSubmit}
                    disableElevation
                    disabled={isFormNotValid()}
                >
                    Log in
                </Button>

                <Divider style={{ width: '100%' }} />

                <Grid container direction="row" justifyContent="center" alignItems="center" marginTop={4}>
                    <Typography sx={noAccountTextStyle}>Don't have an account?</Typography>

                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ marginLeft: 2 }}
                        disableElevation
                        onClick={() => {
                            handleClose();
                            handleOpenSignUpModal();
                        }}
                    >
                        Register
                    </Button>
                </Grid>
            </Box>
        </Modal>
    );
};

const containerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    border: '1px solid #F6F6F6',
    borderRadius: 2,
    boxShadow: 5,
    p: 4,
    paddingX: 10,
};

const labelStyle = {
    color: '#6d6d6d',
    fontSize: 13,
    fontWeight: 600,
    mb: '2px',
};

const noAccountTextStyle = {
    color: '#6d6d6d',
    fontSize: 14,
};

const signUpButtonStyle = {
    color: '#FFFFFF',
    p: 1,
    marginTop: 3,
};

const avatarStyle = {
    // backgroundColor: '#333',
    backgroundColor: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
};

const signinStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
};

const textButtonStyle = {
    color: 'primary',
    textTransform: 'capitalize',
};

export default SignInModal;
