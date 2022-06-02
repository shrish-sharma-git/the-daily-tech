import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Private from '../../components/auth/Private';
import Layout from "../../components/Layout";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreateIcon from '@mui/icons-material/Create';
import UpdateIcon from '@mui/icons-material/Update';

const UserIndex = () => {
    return (  
        <Layout>
            <Private>
                <Grid container spacing={2} display="flex" justifyContent="center">
                    <Grid item xs={12} textAlign="center">
                        <Typography margin="20px" variant='h4'>User Dashboard</Typography>
                    </Grid>

                    <Grid item>
                        <List sx={{gap: "50px", display: "flex", flexDirection: "column"}}>
                            <ListItem>
                                <ListItemIcon>
                                    <CreateIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="user/crud/blog">
                                        <Typography variant='h6' sx={{cursor: "pointer"}}>Create Blog</Typography>
                                    </Link>
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <UpdateIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="user/crud/blogs">
                                        <Typography variant='h6' sx={{cursor: "pointer"}}>Update / Delete Blog</Typography>
                                    </Link>
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <PersonAddIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="user/update">
                                        <Typography variant='h6' sx={{cursor: "pointer"}}>Update Profile</Typography>
                                    </Link>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                    {/* <Grid item xs={8}>
                        <Typography>Right</Typography>
                    </Grid> */}
                </Grid>
            </Private>
        </Layout>
    );
}
 
export default UserIndex;
