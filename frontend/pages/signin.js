import React from 'react';
import SigninComponent from '../components/auth/SigninComponent';
import Layout from "../components/Layout";

import { APP_NAME } from '../config';

const Index = () => {
    return (  
        <Layout>
            <SigninComponent />
        </Layout>
    );
}
 
export default Index;
