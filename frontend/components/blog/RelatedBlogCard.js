import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { API } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';

const RelatedBlogCard = ({blog}) => {
    return (    
        <Grid item xs={12} md={6} margin="25px">
            <CardActionArea component="a" href={`/blogs/${blog.slug}`}>
            <Card sx={{ display: 'flex', backgroundColor: "#FFE5B4"}}>
                <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                    {blog.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Posted {moment(blog.updatedAt).fromNow()} by{' '} {blog.postedBy.username}
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
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                />
            </Card>
            </CardActionArea>
        </Grid>
    );
}
 
export default RelatedBlogCard;