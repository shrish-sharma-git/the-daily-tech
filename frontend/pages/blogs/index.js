import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import {listBlogsWithCategoriesAndTags} from '../../actions/blog';
import BlogCard from '../../components/blog/BlogCard';
import Link from 'next/link';
import Head from 'next/head';
import {API, DOMAIN, APP_NAME} from '../../config';
import {withRouter} from 'next/router';

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {
    const head = () => {
        <Head>
            <title>Technology Blogs | {APP_NAME}</title>
            <meta 
                name='description' 
                content='Technology Blogs which include everything ranging from IT Industry to latest blooming technologies. Programming technologies, web development, android development, artificial intelligence and machine learning.' 
            />
            <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
            <meta property='og:title' content={`Latest Technology Blogs | ${APP_NAME}`}/>
            <meta 
                property='og: description'
                content='Technology Blogs which include everything ranging from IT Industry to latest blooming technologies. Programming technologies, web development, android development, artificial intelligence and machine learning.' 
            />
            <meta property='og:type' content='website'/>
            <meta property='og:url' content={`${DOMAIN}${router.pathname}`}/>
            <meta property='og:site_name' content={`${APP_NAME}`}/>
        </Head>
    }
    
    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);
    
    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit)
            .then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                    setSize(data.size);
                    setSkip(toSkip);
                }
            })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <Button sx={{m: "15px"}} onClick={loadMore} variant='outlined'>Load More</Button>
            )
        )
    }

    const showAllBlogs = () => {
        return blogs.map((blog, i) => (
            <Box key={i}>
                <BlogCard blog={blog}/>
            </Box>
        ))
    }
    
    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <Button sx={{color: "#fff"}}  variant='contained' size='small'>{c.name}</Button>
            </Link>
        ))
    }

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <Button variant='outlined' size='small'>{t.name}</Button>
            </Link>
        ))
    }

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <Box key={i}>
                <BlogCard blog={blog}/>
            </Box>
        ))
    }

    return (
       <Box>
           {head()}
            <Layout>
                <Typography variant='h3' textAlign='center' padding="15px">
                    Know About the Latest News on Technology!
                </Typography>
                
                <Box sx={{display: "flex", justifyContent: "center", gap: "10px", m: "15px 0 15px 0"}}>
                    {showAllCategories()}
                </Box>

                <Divider />

                <Box sx={{display: "flex", justifyContent: "center", gap: "10px", mt: "15px"}}>
                    {showAllTags()}
                </Box>

                
                <Box>
                    <Typography textAlign='center' variant='h4'>{showAllBlogs()}</Typography>
                    <Typography textAlign='center' variant='h4'>{showLoadedBlogs()}</Typography>
                    <Typography textAlign='center' variant='h4'>{loadMoreButton()}</Typography>
                </Box>
            </Layout>
       </Box>
    )
}

Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 2;

    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            return {
                blogs: data.blogs, 
                categories: data.categories, 
                tags: data.tags, 
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            }; 
        }
    })
}

export default withRouter(Blogs);