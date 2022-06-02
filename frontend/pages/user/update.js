import { Box } from "@mui/system";
import Private from "../../components/auth/Private";
import Layout from "../../components/Layout";
import ProfileUpdate from '../../components/auth/ProfileUpdate'; 
import Link from 'next/link';

const UserProfileUpdate = () => {
    return (  
        <Layout>
            <Private>
                <Box>
                    <ProfileUpdate />
                </Box>
            </Private>
        </Layout>
    );
}
 
export default UserProfileUpdate;