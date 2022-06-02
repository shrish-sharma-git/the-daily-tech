import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';
import {getCategories} from '../../actions/category';
import {getTags} from '../../actions/tag';
import {createBlog} from '../../actions/blog';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Button, Checkbox, Divider, Grid, IconButton, List, ListItem, ListItemText, ListSubheader, TextField, Typography, Alert } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

import { QuillModules, QuillFormats } from '../../helpers/quill';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

// Hide File Chooser
const Input = styled('input')({
    display: 'none',
});

const CreateBlog = ({router}) => {
    const blogFromLS = () => {
        if(typeof window === 'undefined') {
            return false;
        }

        if(localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    }

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title, hidePublishButton } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({...values, formData: new FormData()});
        initCategories();
        initTags();
    }, [router])

    const initCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setTags(data);
            }
        });
    }

    const publishBlog = (e) => {
        e.preventDefault();
        createBlog(formData, token).then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, title: '', error: '', success: `A New Blog with Title "${data.title}" is Created.`})
                setBody('');
                setCategories([]);
                setTags([]);
            }
        });
    };

    const handleChange = name => (e) => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value, formData, error: ''})
    }       

    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
        if(typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    const handleToggle = (c) => () => {
        setValues({...values, error: ''})
        // return first index or -1
 
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if(clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    }

    const handleTagsToggle = (t) => () => {
        setValues({...values, error: ''})
        // return first index or -1
 
        const clickedTag = checked.indexOf(t);
        const all = [...checkedTag];

        if(clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    }

    const showCategories = () => {
        return (
            categories && categories.map((c, i) => (
                // <li key={i}>
                //     <input type="checkbox" />
                //     <label>{c.name}</label>
                // </li>
                <List sx={{p: '0'}}>
                    <ListItem key={i}>
                        {/* <input type="checkbox" /> */}
                        {/* <label>{c.name}</label> */}
                        <Checkbox onChange={handleToggle(c._id)} sx={{ p: '0 10px 0 0' }}/>
                        <ListItemText primary={c.name}/>
                    </ListItem>
                </List>
            ))
        )
    }

    const showTags = () => {
        return (
            tags && tags.map((t, i) => (
                // <li key={i}>
                //     <input type="checkbox" />
                //     <label>{t.name}</label>
                // </li>
                <List sx={{p: '0'}}>
                    <ListItem key={i}>
                        {/* <input type="checkbox" />
                        <label>{t.name}</label> */}
                        <Checkbox onChange={handleTagsToggle(t._id)} sx={{ p: '0 10px 0 0' }}/>
                        <ListItemText primary={t.name}/>
                    </ListItem>
                </List>
            ))
        )
    }

    const showError = () => (error ? <Alert sx={{m: "10px"}} severity="error">{error}</Alert>: '');
    
    const showSuccess = () => (success ? <Alert sx={{m: "10px"}} severity="success">{success}</Alert>: '');
    
    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                title='Title'
                                label='Title'
                                fullWidth
                                value={title}
                                onChange={handleChange('title')} />
                        </Grid>
                        <Grid item xs={12} mt="15px">
                            <ReactQuill modules={QuillModules} formats={QuillFormats} value={body} placeholder="Type Something...!" onChange={handleBody}/>
                        </Grid>
                        <Grid item mt="15px">
                            <Button type='submit' variant='contained'>
                                Publish
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        )
    }

    return (  
        <Grid container>
            <Grid item xs={9} p='5px'>
                {showSuccess()}
                {showError()}
                
                {createBlogForm()}

            </Grid>
            <Grid item xs={3}>
                <Box>
                    <Typography
                        variant='h5'
                    >Featured Image</Typography>

                    <Typography
                        variant='subtitle'
                    >Maximum Size 1 MB</Typography>
                    <label htmlFor="featured-image-upload">
                        <Input accept="image/*" onChange={handleChange('photo')} id="featured-image-upload" type="file" />
                        <IconButton aria-label="upload picture" component="span">
                            <UploadIcon sx={{ fontSize: "40px" }}/>
                        </IconButton>
                    </label>
                </Box>

                <Divider />

                <Typography p='10px' variant='h5'>Categories</Typography>

                <Divider /> 
                {showCategories()}
                <Divider /> 

                <Typography p='10px' variant='h5'>Tags</Typography>

                <Divider />
                {showTags()}
            </Grid>
        </Grid>
    );
}

export default withRouter(CreateBlog);