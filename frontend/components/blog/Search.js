import { Box } from "@mui/system";
import { styled, alpha } from '@mui/material/styles';
import { useState } from "react";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';

import { listSearch } from '../../actions/blog';
import { Divider, Fade, Modal, Typography } from "@mui/material";

import Link from 'next/link';
import { Close } from "@mui/icons-material";

const SearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: '20px',
    border: '0.01rem solid black',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
}));

// Modal Styles
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FFE5B4',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Search = () => {
    // Modal Handling
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  

    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: '',
    })

    const { search, results, searched, message } = values;

    const searchSubmit = (e) => {
        e.preventDefault();
        listSearch({search}).then(data => {
            setValues({...values, results: data, searched: true, message: `${data.length} blogs found`})
            handleOpen();
        })
    };

    const handleChange = (e) => {
        // console.log(e.target.value);
        setValues({...values, search: e.target.value, searched: false, results: []});
    }

    const searchedBlogs = (results = [], modalOpen) => {
        return (
            // <Box>
            //     
            // </Box>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" marginBottom="10px" component="h2">
                            {message && <Typography>{message}</Typography>}
                        </Typography>

                        <Divider />

                        {results.map((blog, i) => {
                            return (
                                <Box key={i}>
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <Typography margin="20px" sx={{cursor: 'pointer'}} variant="h6">{blog.title}</Typography>
                                    </Link>
                                    <Divider />
                                </Box>
                            )
                        })}
                    </Box>
                </Fade>
            </Modal>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <SearchBar>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                onChange={handleChange}
                inputProps={{ 'aria-label': 'search' }}
                />
          </SearchBar>
        </form>
    )
    
    return (
        <Box>
            {searchForm()}
            {searched && <Box>{searchedBlogs(results)}</Box>}
        </Box>
    )
}
 
export default Search;