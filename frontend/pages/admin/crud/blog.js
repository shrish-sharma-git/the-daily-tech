import { Grid, Typography } from '@mui/material';
import React from 'react';
import Admin from '../../../components/auth/Admin';
import CreateBlog from '../../../components/crud/CreateBlog';
import Layout from "../../../components/Layout";

const Blog = () => {
    return (  
        <Layout>
            <Admin>
                <Grid container textAlign="center">
                    <Grid item xs={12}>
                        <h2>Create a Blog</h2>
                    </Grid>
                    
                    <Grid item xs={12} marginTop="50px">
                        <CreateBlog />
                    </Grid>
                </Grid>
            </Admin>
        </Layout>
    );
}
 
export default Blog;