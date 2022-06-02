import React from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import renderHTML from 'react-render-html';
import Link from 'next/link';
import moment from 'moment';

import { API } from '../../config';

const BlogCard = ({ blog }) => {
    const showBlogCategories = (blog) =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <Button sx={{color: "#fff"}} size='small' variant='contained'>{c.name}</Button>
            </Link>
        )) 

    const showBlogTags = (blog) =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <Button size='small' variant='outlined'>{t.name}</Button>
            </Link>
        )) 

    return (  
        <Grid item xs={12} margin="25px">
            <CardActions>
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
            </CardActions>
            <CardActionArea component="a" href={`/blogs/${blog.slug}`}>
                <Card sx={{ backgroundColor: "#FFE5B4", display: 'flex', boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                        {blog.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Author {blog.postedBy.username} | Published {moment(blog.updatedAt).fromNow()}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        {renderHTML(blog.excerpt)}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        Continue reading...
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 300, display: { xs: 'none', sm: 'block' } }}
                    image={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                />
                </Card>
            </CardActionArea>
        </Grid>

    );
}
 
export default BlogCard;