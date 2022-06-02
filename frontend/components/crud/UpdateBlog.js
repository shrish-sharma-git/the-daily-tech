import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';
import {getCategories} from '../../actions/category';
import {getTags} from '../../actions/tag';
import {singleBlog, updateBlog} from '../../actions/blog';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Button, Checkbox, Divider, Grid, IconButton, List, ListItem, ListItemText, ListSubheader, TextField, Typography, Alert } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

import {API} from '../../config';

import { QuillModules, QuillFormats } from '../../helpers/quill';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

// Hide File Chooser
const Input = styled('input')({
    display: 'none',
});

const UpdateBlog = ({ router }) => {
    const [body, setBody] = useState('');

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        title: '',
        body: ''
    });

    const { title, error, success, formData } = values;
    
    const token = getCookie('token');

    useEffect(() => {
        setValues({...values, formData: new FormData()});
        initBlog();
        initCategories();
        initTags();
    }, [router]);

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

    const initBlog = () => {
        if(router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if(data.error) {
                    console.log(data.error);
                } else {
                    setValues({...values, title: data.title});
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);
                }
            });
        }
    };

    const setCategoriesArray = (blogCategories) => {
        let ca = [];
        blogCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    }

    const setTagsArray = (blogTags) => {
        let ta = [];
        blogTags.map((t, i) => {
            ta.push(t._id);
        });
        setCheckedTag(ta);
    }

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
 
        const clickedTag = checkedTag.indexOf(t);
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

    const findOutCategory = (c) => {
        const result = checked.indexOf(c);
        if(result !== -1) {
            return true;
        } else {
            return false;
        }
    }

    const findOutTag = (t) => {
        const result = checked.indexOf(t);
        if(result !== -1) {
            return true;
        } else {
            return false;
        }
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
                        <Checkbox onChange={handleToggle(c._id)} checked={findOutCategory(c._id)} sx={{ p: '0 10px 0 0' }}/>
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
                        <Checkbox onChange={handleTagsToggle(t._id)} checked={findOutTag(t._id)} sx={{ p: '0 10px 0 0' }}/>
                        <ListItemText primary={t.name}/>
                    </ListItem>
                </List>
            ))
        )
    }

    const handleChange = name => (e) => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value, formData, error: ''})
    }  

    const handleBody = (e) => {
        setBody(e);
        formData.set('body', e);
    }

    const editBlog = e => {
        e.preventDefault();
        updateBlog(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', success: `Blog titled "${data.title}" is successfully updated` });
                if (isAuth() && isAuth().role === 1) {
                    // Router.replace(`/admin/crud/${router.query.slug}`);
                    Router.replace(`/admin`);
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user`);
                }
            }
        });
    };

    const showError = () => (error ? <Alert sx={{m: "10px"}} severity="error">{error}</Alert>: '');
    
    const showSuccess = () => (success ? <Alert sx={{m: "10px"}} severity="success">{success}</Alert>: '');


    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
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
                                Update
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

                {body && <img style={{ width: '100%', height: "400px", padding: " 0 40px 20px 40px" }} src={`${API}/blog/photo/${router.query.slug}`} alt={title}></img>}

                {updateBlogForm()}
                
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
 
export default withRouter(UpdateBlog);