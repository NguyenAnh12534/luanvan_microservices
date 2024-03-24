import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SocketContext from '~/Context/SocketContext';

const ModeDialog = (props) => {
    const MODE = {
        NORMAL: 'normal',
        CHALLENGE: 'challenge',
    };

    const { open, handleClose, roomId } = props;
    const navigate = useNavigate();

    const navigateExamRoom = (mode) => {
        navigate(`/quiz/wait-room/host/${roomId}`, { state: { mode } });
    };

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle textAlign="center" color="text.secondary">
                Choose mode
            </DialogTitle>
            <DialogContent>
                <Button
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                    fullWidth
                    color="warning"
                    onClick={() => navigateExamRoom(MODE.NORMAL)}
                >
                    Normal
                </Button>
                <Button
                    variant="contained"
                    sx={{ textTransform: 'none', mt: 1 }}
                    fullWidth
                    color="warning"
                    onClick={() => navigateExamRoom(MODE.CHALLENGE)}
                >
                    Challenge
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ModeDialog;
