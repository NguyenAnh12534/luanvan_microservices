import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SocketContext from '~/Context/SocketContext';

const NotFoundModeDialog = (props) => {
    const { open, handleClose } = props;
    const navigate = useNavigate();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: { borderRadius: 15 },
            }}
        >
            <DialogContent sx={{ textAlign: 'center' }}>
                <Stack justifyContent="center" alignItems="center">
                    <img src={process.env.PUBLIC_URL + '/search_not_found.png'} width="50%" />
                    <Typography variant="body1" fontWeight="bold">
                        Room not found
                    </Typography>
                    <Typography variant="caption" color="text.secondary" mt={0}>
                        Please try again with another room id
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ textTransform: 'none', borderRadius: 5, mt: 3, width: '50%' }}
                        onClick={handleClose}
                        disableElevation
                    >
                        Search again
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default NotFoundModeDialog;
