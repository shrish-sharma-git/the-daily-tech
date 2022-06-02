import { Grid, Typography } from '@mui/material';
import React from 'react';
import Private from '../../../components/auth/Private';
import CreateBlog from '../../../components/crud/CreateBlog';
import Layout from "../../../components/Layout";

const Blog = () => {
    return (  
        <Layout>
            <Private>
                <Grid container textAlign="center">
                    <Grid item xs={12}>
                        <h2>Create a Blog</h2>
                    </Grid>
                    
                    <Grid item xs={12} marginTop="50px">
                        <CreateBlog />
                    </Grid>
                </Grid>
            </Private>
        </Layout>
    );
}
 
export default Blog;