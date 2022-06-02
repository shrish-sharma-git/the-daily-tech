import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Admin from '../../components/auth/Admin';
import Layout from "../../components/Layout";
import CategoryIcon from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';
import CreateIcon from '@mui/icons-material/Create';
import UpdateIcon from '@mui/icons-material/Update';
import { PersonAdd } from '@mui/icons-material';

const AdminIndex = () => {
    return (  
        <Layout>
            <Admin>
                <Grid container spacing={2} display="flex" justifyContent="center">
                    <Grid item xs={12} textAlign="center">
                        <Typography margin="20px" variant='h4'>Admin Dashboard</Typography>
                    </Grid>

                    <Grid item>
                        <List sx={{gap: "50px", display: "flex", flexDirection: "column"}}>
                            <ListItem>
                                <ListItemIcon>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="admin/crud/category-tag">
                                        <Typography variant='h6' sx={{cursor: "pointer"}}>Create Category</Typography>
                                    </Link>
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <TagIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="admin/crud/category-tag">
                                        <Typography variant='h6' sx={{cursor: "pointer"}}>Create Tags</Typography>
                                    </Link>
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <CreateIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="admin/crud/blog">
                                        <Typography variant='h6' sx={{cursor: "pointer"}}>Create Blog</Typography>
                                    </Link>
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <UpdateIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="admin/crud/blogs">
                                        <Typography variant='h6' sx={{cursor: "pointer"}}>Update / Delete Blog</Typography>
                                    </Link>
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <PersonAdd />
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
            </Admin>
        </Layout>
    );
}
 
export default AdminIndex;
