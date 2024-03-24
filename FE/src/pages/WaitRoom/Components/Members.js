import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import LocalStorageService from '~/Services/LocalStorageService';

const Members = ({ members }) => {
    const { email } = LocalStorageService.get();

    return (
        <Paper sx={{ width: '50%', mx: 'auto', p: 1, mt: 1 }}>
            <Typography
                variant="h5"
                fontSize={20}
                p={2}
                color="primary"
                fontWeight="bold"
                align="center"
                sx={{ textDecoration: 'underline' }}
            >
                Members
            </Typography>
            <Box sx={{ mt: 2, px: 1 }}>
                {members.map((user) => (
                    <Box
                        width={1}
                        mb={1}
                        p={1}
                        bgcolor={user.username === email ? '#F1F1F1' : 'transparent'}
                        borderRadius={2}
                        border={user.username === email ? '1px solid grey' : ''}
                    >
                        <Grid container justifyContent="center" alignItems="center">
                            <Typography
                                variant="h5"
                                fontSize={20}
                                p={2}
                                color="black"
                                fontWeight={email === user.username ? 'bold' : ''}
                            >
                                {user.username}
                            </Typography>
                        </Grid>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

export default Members;
