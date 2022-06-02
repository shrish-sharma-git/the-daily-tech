import { Alert, Box, Button, Grid, TextField, Tooltip } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import {isAuth, getCookie} from '../../actions/auth';
import { create, getCategories, removeCategory } from '../../actions/category';

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false        
    });

    const {name, error, success, categories, removed, reload} = values;
    const token = getCookie('token')

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setValues({...values, categories: data});
            }
        });
    };

    const showCaregories = () => {
        return categories.map((c, i) => {
            return (
                <Tooltip title="Double-Click to Delete" arrow>
                    <Button sx={{ m: "0 10px 5px 10px", textTransform: "none" }} key={i}variant='outlined' onDoubleClick={() => deleteConfirm(c.slug)}>
                        {c.name}
                    </Button>
                </Tooltip>
            );
        });
    };

    const deleteConfirm = (slug) => {
        let answer = window.confirm("Are you sure you want to delete this category?");
        if(answer) {
            deleteCategory(slug);
        }
    }

    const deleteCategory = (slug) => {
        // console.log('delete', slug);
        removeCategory(slug, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setValues({...values, error: false, success: false, name: '', removed: !removed, reload: !reload});
            }
        });
    };     

    const clickSubmit = (e) => {
        e.preventDefault();
        // console.log('Create Category', name);

        create({name}, token).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success: false});
            } else {
                setValues({...values, error: false, success: true, name: '', removed: false, reload: !reload });
            }
        })
    }

    const handleChange = (e) => {
        setValues({...values, name: e.target.value, error: false, success: false, removed: ''});
    }

    const showSuccess = () => (success ?  <Alert variant='filled' severity="success">Category is Created!</Alert> : '');

    const showError = () => (error ? <Alert variant='filled' severity="error">Category Already Exists!</Alert>: '');

    const showRemoved = () => (removed ? <Alert variant='filled' severity="info">Category Deleted Successfully!</Alert> : '');

    const mouseMoveHandler = (e) => {
        setValues({...values, error: false, success: false, removed: ''});
    }

    const newCategoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            onChange={handleChange}
                            value={name}
                            sx={{ width: "650px" }}
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button sx={{ mb: "25px" }} variant='contained' type='submit'>Create</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }

    return (  
        <Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler}>   
                {newCategoryForm()}
                {showCaregories()}
            </div>
        </Fragment>
    );
}
 
export default Category;