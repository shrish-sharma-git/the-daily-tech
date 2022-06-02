import { Alert, Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getCookie, updateUser } from "../../actions/auth";
import {getProfile, update} from '../../actions/user';
import {API} from '../../config';

const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        username_for_photo: '',
        name: '',
        email: '',
        password: '',
        about: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: process.browser && new FormData()
    });

    const token = getCookie('token');

    const { username, 
            name, 
            username_for_photo,
            email, 
            password, 
            about, 
            error,
            success, 
            loading, 
            photo, 
            userData } = values;

    const init = () => {
        getProfile(token).then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({
                    ...values, 
                    username: data.username, 
                    username_for_photo: data.username,
                    name: data.name, 
                    email: data.email, 
                    about: data.about
                });
            }
        });
    };

    useEffect(() => {
        init();
        setValues({...values, userData: new FormData()});
    }, []);

    const handleChange = (name) => (e) => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        // let userFormData = new FormData();
        userData.set(name, value);
        setValues({...values, [name]: value, userData, error: false, success: false});
    }        

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, loading: true});
        update(token, userData).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values, 
                        username: data.username, 
                        name: data.name, 
                        email: data.email, 
                        about: data.about,
                        password: '',
                        success: true,
                        loading: false
                    });
                })
            }
        })
    }

    const profileUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
            <Grid container spacing="15px">
                <Grid item xs={12}>
                    <label>Profile Photo</label>
                    <input type="file" onChange={handleChange('photo')} accept="image/*" />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={username || ''} 
                        label="Username"
                        sx={{width: "800px"}}
                        variant="outlined"
                        onChange={handleChange('username')} 
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={name || ''} 
                        label="Name"
                        sx={{width: "800px"}}
                        variant="outlined"
                        onChange={handleChange('name')} 
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={email || ''} 
                        label="Email"
                        sx={{width: "800px"}}
                        variant="outlined"
                        onChange={handleChange('email')} 
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={about || ''} 
                        label="About"
                        sx={{width: "800px"}}
                        variant="outlined"
                        multiline
                        rows={4}
                        onChange={handleChange('about')} 
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* <label>Password</label>
                    <input type="text" value={password} onChange={handleChange('passwors')} /> */}
                    <TextField 
                        value={password || ''} 
                        label="Password"
                        sx={{width: "800px"}}
                        variant="outlined"
                        type="password"
                        onChange={handleChange('password')} 
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
        );
    }

    const showError = () => (error ? <Alert sx={{m: "10px"}} severity="error">{error}</Alert>: ''); 
    
    const showSuccess = () => (success ? <Alert sx={{m: "10px"}} severity="success">Profile Updated Successfully!</Alert>: ''); 
    
    const showLoading = () => (loading ? <Alert sx={{m: "10px"}} severity="info">Loading...</Alert>: ''); 

    return (
        <Box>
            <Grid container>
                <Grid item xs={3} p="60px">
                    <Avatar 
                        alt="User Profile"
                        src={`${API}/user/photo/${username_for_photo}`}
                        sx={{ width: 150, height: 150 }}
                    />
                </Grid> 
                <Grid item xs={9}>
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {profileUpdateForm()}  
                </Grid>
            </Grid>
        </Box>
    );
}
 
export default ProfileUpdate;