import { Grid, Typography } from '@mui/material';
import React from 'react';
import Private from '../../../components/auth/Private';
import UpdateBlog from '../../../components/crud/UpdateBlog';
import Layout from "../../../components/Layout";

const Blog = () => {
    return (  
        <Layout>
            <Private>
                <Grid container textAlign="center">
                    <Grid item xs={12}>
                        <h2>Update a Blog</h2>
                    </Grid>
                    
                    <Grid item xs={12} marginTop="50px">
                        <UpdateBlog />
                    </Grid>
                </Grid>
            </Private>
        </Layout>
    );
}
 
export default Blog;