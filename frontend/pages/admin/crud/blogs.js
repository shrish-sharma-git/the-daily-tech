import { Grid, Typography } from '@mui/material';
import React from 'react';
import Admin from '../../../components/auth/Admin';
import ReadBlogs from '../../../components/crud/ReadBlogs';
import Layout from "../../../components/Layout";

const Blog = () => {
    return (  
        <Layout>
            <Admin>
                <Grid container textAlign="center">
                    <Grid item xs={12}>
                        <h2>Manage Blogs</h2>
                    </Grid>
                    
                    <Grid item xs={12} marginTop="50px">
                        <ReadBlogs />
                    </Grid>
                </Grid>
            </Admin>
        </Layout>
    );
}
 
export default Blog;