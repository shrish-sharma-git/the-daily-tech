import { Grid, Typography } from '@mui/material';
import React from 'react';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';
import Layout from "../../../components/Layout";

const CategoryTag = () => {
    return (  
        <Layout>
            <Admin>
                <Grid container textAlign="center">
                    <Grid item xs={12}>
                        <h2>Manage Categories and Tags</h2>
                    </Grid>
                    
                    <Grid item xs={12} marginTop="50px">
                        <Category />
                    </Grid>
                    <Grid item xs={12} marginTop="50px">
                        <Tag />
                    </Grid>
                </Grid>
            </Admin>
        </Layout>
    );
}
 
export default CategoryTag;