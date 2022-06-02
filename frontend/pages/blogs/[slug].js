import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { withRouter } from "next/router";
import { singleBlog, listRelated } from "../../actions/blog";
import Layout from '../../components/Layout';
import { API } from "../../config";
import renderHTML from 'react-render-html';
import moment from 'moment';
import Link from 'next/link';
import RelatedBlogCard from '../../components/blog/RelatedBlogCard';
import { useEffect, useState } from "react";
import DisqusThread from '../../components/DisqusThread';

const SingleBlog = ({ blog, query }) => {
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ blog }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    };

    useEffect(() => {
        loadRelated();
    }, []);

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

    const showRelatedBlogs = () => {
        return related.map((blog, i) => (
            <Box key={i}>
                <RelatedBlogCard blog={blog} />
            </Box>
        ))
    }

    const showComments = () => {
        return (
            <Box>
                <DisqusThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`} />
            </Box>
        )
    }

    return (
        <Box>
            <Layout>    
                <Paper
                    sx={{
                        position: 'relative',
                        backgroundColor: 'grey.800',
                        color: '#fff',
                        mb: 4,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${API}/blog/photo/${blog.slug})`,
                        m: "20px 100px 20px 100px"
                    }}
                    >
                    {<img style={{ display: 'none' }} src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />}
                    <Box
                        sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                        }}
                    />
                    <Grid container>
                        <Grid item md={6}>
                        <Box
                            sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                            }}
                        >
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {blog.title}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                Author {<Link href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.username}</Link>} | Published {moment(blog.updatedAt).fromNow()}
                            </Typography>
                            <Typography sx={{ display: "flex", gap: "15px"}}>
                                {showBlogCategories(blog)}
                                {showBlogTags(blog)}
                            </Typography>
                        </Box>
                        </Grid>
                    </Grid>
                </Paper>
                <Box sx={{m: "20px 100px 20px 100px"}}>
                    {renderHTML(blog.body)}
                </Box>
                <Box sx={{m: "20px 100px 20px 100px"}}>
                    <Typography variant="h4" textAlign="center">Related Blogs</Typography>
                    
                    <Divider />
                    
                    <Typography variant="h6" textAlign="center">{showRelatedBlogs()}</Typography>    
                </Box>

                <Box sx={{m: "20px 100px 20px 100px"}}>
                   {showComments()}
                </Box>
                
            
            </Layout>
        </Box>
    );
}

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {blog: data, query};
        }
    })
}
 
export default withRouter(SingleBlog);