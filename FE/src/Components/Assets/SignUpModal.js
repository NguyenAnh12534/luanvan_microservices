import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import CredentialService from '~/Services/CredentialService';
import Alert from '@mui/material/Alert';

const SignUpModal = (props) => {
    const { isOpen, handleClose, handleOpenSignInModal } = props;

    const PASSWORD_NOT_MATCH = {confirmPassword: "Password doesn't match"};

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState({});
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const isFormNotValid = () => email == '' || password == '' || confirmPassword == '' || 'confirmPassword' in error;

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkPass()
    };

    const onSubmit = (_) => {
        CredentialService.register(
            email,
            password,
            (response) => {
                clearText()
                setShowSuccessAlert(true)
            },
            (error) => {
                console.log(error.response);
                setError(error.response.data);
            },
        );
    };

    useEffect(() => {
        checkPass();
    }, [password, confirmPassword]);

    useEffect(() => {
        clearText()
        setError({})
        setShowSuccessAlert(false)
    }, [isOpen]);

    const checkPass = () => {
        if (confirmPassword != password) {
            setError(PASSWORD_NOT_MATCH);
        } else {
            setError({});
        }
    };

    function clearText() {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box component="form" sx={containerStyle}>
                <Avatar sx={avatarStyle}>
                    <HowToRegIcon />
                </Avatar>
                <img src={process.env.PUBLIC_URL + '/banner_form.png'} width="100%" />

                {showSuccessAlert && (
                    <Alert severity="success" color="info" sx={{ mb: 2 }}>
                        Your account has been created!
                    </Alert>
                )}

                <Typography sx={labelStyle}> Email </Typography>
                <TextField
                    placeholder="nlhoanganh@gmail.com"
                    variant="outlined"
                    size="small"
                    name="email"
                    value={email}
                    fullWidth={true}
                    onChange={handleEmailChange}
                    helperText={'email' in error ? error.email : ''}
                    error={'email' in error}
                    autoFocus
                />

                <Typography sx={labelStyle} marginTop={2}>
                    Password
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    fullWidth={true}
                    value={password}
                    name="password"
                    placeholder="Ex: Nlh0@ng4nH"
                    onChange={handlePasswordChange}
                />

                <Typography sx={labelStyle} marginTop={2}>
                    Confirm password
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    fullWidth={true}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    helperText={'confirmPassword' in error ? error.confirmPassword : ''}
                    error={'confirmPassword' in error}
                />

                <Button
                    variant="contained"
                    fullWidth={true}
                    color="primary"
                    sx={signUpButtonStyle}
                    onClick={onSubmit}
                    disableElevation
                    disabled={isFormNotValid()}
                >
                    Register
                </Button>

                <Divider style={{ width: '100%' }} />

                <Grid container direction="row" justifyContent="center" alignItems="center" marginTop={4}>
                    <Typography sx={noAccountTextStyle}>Already have an account?</Typography>

                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ marginLeft: 2 }}
                        disableElevation
                        onClick={() => {
                            handleClose();
                            handleOpenSignInModal();
                        }}
                    >
                        Log in
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

export default SignUpModal;
