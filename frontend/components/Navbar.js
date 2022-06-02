import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { APP_NAME } from '../config';
import Link from 'next/link';
import { isAuth, signout } from '../actions/auth';
import Router from 'next/router';
import nProgress from 'nprogress';

import Search from '../components/blog/Search';

Router.onRouterChangeStart = url => nProgress.start()
Router.onRouterChangeComplete = url => nProgress.done()
Router.onRouterChangeError = url => nProgress.done()

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: "0", zIndex: "999"}}>
      <AppBar sx={{backgroundColor: "#fef9f8" , color: "#000"}} position="static">
        <Toolbar>
          <Link href="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
              {APP_NAME}
            </Typography>
          </Link>
          
          <Search />

          <React.Fragment>
            <Link href="/blogs">
              <Button color="inherit">
                Blogs
              </Button>
            </Link>
          </React.Fragment> 

          {!isAuth() && 
            <React.Fragment>
              <Link href="/signin">
                <Button color="inherit">
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button color="inherit">
                  SignUp
                </Button>
              </Link>
            </React.Fragment>
          }

          {isAuth() && isAuth().role === 0 && (
            <Link href="/user">
              <Button>
                  {`${isAuth().name}'s Dashboard`}
              </Button>
            </Link>
          )}

          {isAuth() && isAuth().role === 1 && (
              <Link href="/admin">
                <Button>
                    {`${isAuth().name}'s Dashboard`}
                </Button>
              </Link>
          )}

          {isAuth() && (
              <Button color="inherit" onClick={() => signout(() => Router.replace(`/signin`))}>
                Sign Out
              </Button>
          )}

              <Link href="/user/crud/blog">
                <Button variant='contained'>
                  Write
                </Button>
              </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
