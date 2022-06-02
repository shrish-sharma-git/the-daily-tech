import React from 'react';
import Navbar from './Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#ef9273",
        },
        secondary: {
            main: "#fef9f8",
        },
    }
});

const Layout = ({ children }) => {
    return (  
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Navbar />
                {children}
            </React.Fragment>
        </ThemeProvider>
    );
}
 
export default Layout;