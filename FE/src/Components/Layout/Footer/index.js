import { Box, Grid } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <Box sx={container} component="footer">
            <Box>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ fontWeight: '600' }}>Mathematics</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ fontWeight: '600' }}>Science</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ fontWeight: '600' }}>Social Studies</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ fontWeight: '600' }}>Support</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                        <Box sx={{ pt: 1 }}>Algebra</Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
                    Material UI Workshop &reg; {new Date().getFullYear()}
                </Box>
            </Box>
        </Box>
    );
}

const container = {
    ml: 'auto',
    mr: 'auto',
    width: '73%',
    fontSize: 15,
    // backgroundColor: 'red',
    marginTop: 'calc(10% + 60px)',
};

export default Footer;
