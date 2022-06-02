import React from 'react';
import SignupComponent from '../components/auth/SignupComponent';
import Layout from "../components/Layout";

import { APP_NAME } from '../config';

const Index = () => {
    return (  
        <Layout>
            <SignupComponent />
        </Layout>
    );
}
 
export default Index;
