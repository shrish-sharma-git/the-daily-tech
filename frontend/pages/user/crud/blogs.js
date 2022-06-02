import { Grid, Typography } from '@mui/material';
import React from 'react';
import Private from '../../../components/auth/Private';
import ReadBlogs from '../../../components/crud/ReadBlogs';
import Layout from "../../../components/Layout";

import { isAuth } from '../../../actions/auth';

const Blog = () => {
    const username = isAuth() && isAuth().username;
    return (  
        <Layout>
            <Private>
                <Grid container textAlign="center">
                    <Grid item xs={12}>
                        <h2>Manage Blogs</h2>
                    </Grid>
                    
                    <Grid item xs={12} marginTop="50px">
                        <ReadBlogs username={username}/>
                    </Grid>
                </Grid>
            </Private>
        </Layout>
    );
}
 
export default Blog;