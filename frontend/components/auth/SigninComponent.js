import React, { Fragment, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {APP_NAME} from '../../config';
import Link from 'next/link';
import {authenticate, isAuth, signin} from '../../actions/auth';
import { Alert } from '@mui/material';
import Router from 'next/router';

function Copyright(props) {
  return (
    <div variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        {APP_NAME}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  );
}

const theme = createTheme();

const SigninComponent = () => {    
    // Defining Use State Hook
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    // DeStructuring Values
    const {email, password, error, loading, message, showForm} = values;

    // Checking for Auth by UseEffect (Redirecting logged in users)
    useEffect(() => {
        isAuth() && Router.push('/');
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        signin(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // Save User JWT to Cookie
                // Save UserInfo to Local Storage
                // Authenticate User
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/user`);
                    }
                });
            }
        });
    };

    const handleChange = name => (e) => {
        setValues({...values, error: false, [name]: e.target.value})
    };

    const showLoading = () => (loading ? <Alert severity="info">Loading...</Alert> : '');
    const showError = () => (error ? <Alert severity='error'>{error}</Alert> : '');
    const showMessage = () => (message ? <Alert severity='info'>{message}</Alert> : '');

    const signinForm = () => {
        return (
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign In
                </Typography>
                
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleChange('email')}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={handleChange('password')}
                    />
                    </Grid>
                    {/* <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                    </Grid> */}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="center">
                    <Link href="/signup">
                    <Grid item sx={{ m: "10px 0 10px 0", cursor: "pointer", textDecoration:"underline"}}>
                        New User? Sign Up
                    </Grid>
                    </Link>
                </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
        )
    }

    return (
        <Box>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </Box>
    )
}

export default SigninComponent;