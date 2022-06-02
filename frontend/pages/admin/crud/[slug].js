import { Grid, Typography } from '@mui/material';
import React from 'react';
import Admin from '../../../components/auth/Admin';
import UpdateBlog from '../../../components/crud/UpdateBlog';
import Layout from "../../../components/Layout";
import DisQusThread from '../../../components/DisqusThread';

const Blog = () => {
    return (  
        <Layout>
            <Admin>
                <Grid container textAlign="center">
                    <Grid item xs={12}>
                        <h2>Update a Blog</h2>
                    </Grid>
                    
                    <Grid item xs={12} marginTop="50px">
                        <UpdateBlog />
                    </Grid>
                </Grid>
            </Admin>
        </Layout>
    );
}
 
export default Blog;