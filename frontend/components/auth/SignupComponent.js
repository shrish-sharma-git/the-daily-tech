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
import {signup, isAuth} from '../../actions/auth';
import { Alert } from '@mui/material';

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

const SignUpComponent = () => {    
    // Defining Use State Hook
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    // DeStructuring Values
    const {name, email, password, error, loading, message, showForm} = values;

    useEffect(() => {
        isAuth() && Router.push('/');
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        signup(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
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

    const signupForm = () => {
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
                Sign up
                </Typography>
                
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        value={name}
                        onChange={handleChange('name')}
                    />
                    </Grid>
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
                    <Link href="/signin">
                    <Grid item sx={{ m: "10px 0 10px 0", cursor: "pointer", textDecoration:"underline"}}>
                        Already have an account? Sign in
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
            {showForm && signupForm()}
        </Box>
    )
}

export default SignUpComponent;