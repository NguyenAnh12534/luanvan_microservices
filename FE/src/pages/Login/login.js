import { Container, Button, Grid, Paper, TextField, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
    const [values, setValues] = useState({
        email: '',
        pass: '',
        showPass: false,
    });

    const handlePassVisibilty = () => {
        setValues({
            ...values,
            showPass: !values.showPass,
        });
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Grid container spacing={2} direction="column" justifyContent="center" style={{ minHeight: '100vh' }}>
                    <Paper elelvation={0} sx={{ padding: 5 }}>
                        <form>
                            <h1>Login</h1>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        type="email"
                                        fullWidth
                                        label="Enter your email"
                                        placeholder="Email Address"
                                        variant="outlined"
                                        required
                                        size="large"
                                        inputProps={{ style: { fontSize: 15 } }}
                                        InputLabelProps={{ style: { fontSize: 15 } }}
                                    />
                                </Grid>

                                <Grid item>
                                    <TextField
                                        type={values.showPass ? 'text' : 'password'}
                                        fullWidth
                                        label="Password"
                                        placeholder="Password"
                                        variant="outlined"
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handlePassVisibilty}
                                                        aria-label="toggle password"
                                                        edge="end"
                                                    >
                                                        {values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            style: { fontSize: 15 },
                                        }}
                                        InputLabelProps={{ style: { fontSize: 15 } }}
                                    />
                                </Grid>

                                <Grid item>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        style={{ fontSize: '15px' }}
                                        href="/"
                                    >
                                        Sign In
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    );
};

export default Login;
