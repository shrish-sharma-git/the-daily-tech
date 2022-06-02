import { Alert, Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from '../../actions/blog';
import moment from "moment";
import Link from 'next/link';
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';

const ReadBlogs = ({username}) => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = () => {
        list(username).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setBlogs(data);
            }
        });
    };

    const deleteBlog = (slug) => {
        removeBlog(slug, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBlogs();
            }
        })
    }

    const deleteConfirm = (slug) => {
        let answer = window.confirm("Are You Sure You Want to Delete This Blog?");
        if(answer) {
            deleteBlog(slug);
        }
    }

    const showUpdateButton = (blog) => {
        if(isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${blog.slug}`}>
                    <Button variant="contained">Update</Button>
                </Link>
            )                       
        } else if(isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                    <Button variant="contained">Update</Button>
                </Link>
            )
        }
    }

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <Card key={i} sx={{ m: "25px 0 25px 0", width: "600px", backgroundColor: "#FFE5B4", boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" }}>
                    <CardContent>
                        <Typography component="h2" variant="h5">
                            {blog.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Author {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={() => deleteConfirm(blog.slug)}>
                            <DeleteIcon sx={{ color: "red" }}/>
                        </IconButton>
                        {showUpdateButton(blog)}
                    </CardActions>
                </Card>
            )
        })
    }

    return (  
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            sx={{ minHeight: '100vh' }}>
            <Grid item>
                {message && <Alert severity="warning">{message}</Alert>}
                {showAllBlogs()}
            </Grid>
        </Grid>
    );
}
 
export default ReadBlogs;