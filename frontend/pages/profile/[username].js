import {Avatar, Box, Card, Divider, Grid, Typography} from '@mui/material';
import Layout from '../../components/Layout';
import {userPublicProfile} from '../../actions/user';
import Link from 'next/link';
import moment from 'moment';
import {API} from '../../config';
 
const UserProfile = ({user, blogs}) => {
    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <Box key={i} p="8px"> 
                    <Link href={`/blogs/${blog.slug}`}>
                        <Typography sx={{cursor: 'pointer'}} variant='subtitle1'>{blog.title}</Typography>
                    </Link>
                </Box>
            )
        })
    }

    return (  
        <Box>
            <Layout>
                <Card sx={{m: "80px", p: "50px"}}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} display="flex" gap="8px" justifyContent='center' flexDirection='column' alignItems='center'>
                            <Avatar 
                                alt="User Profile"
                                src={`${API}/user/photo/${user.username}`}
                                sx={{ width: 100, height: 100 }}
                            />
                            <Typography variant='h4'>{user.name}</Typography>  
                            <Typography variant='subtitle2'>Joined {moment(user.createdAt).fromNow()}</Typography>
                        </Grid>

                        <Grid item xs={12}  textAlign="center">
                            <Divider sx={{ m: "-15px 0 15px 0" }}/>
                            <Typography variant='h5'>Recent Blogs By {user.name}</Typography>
                            {showUserBlogs()}
                        </Grid>

                    </Grid>
                </Card>
            </Layout>
        </Box>
    );
}
 
UserProfile.getInitialProps = ({query}) => {
    return userPublicProfile(query.username).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            // console.log(data);
            return {user: data.user, blogs: data.blogs}
        }
    })
}

export default UserProfile;