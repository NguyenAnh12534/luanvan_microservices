import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { UserRole } from "~/Enums/UserRole";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyIcon from '@mui/icons-material/Key';
import SocketContext from "~/Context/SocketContext";

const RoomInfo = (props) => {
    const {userRole, mode, paramId} = props;
    const socketService = React.useContext(SocketContext);

    const handleStartQuiz = () => {
        socketService.startExam(mode);
    };

    return (
        <Paper sx={{ width: '50%', mx: 'auto', p: 1, mb: 2 }} variant="outlined">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                    {userRole === UserRole.HOST && (
                        <Box
                            sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 1, display: 'inline-flex' }}
                            component="span"
                        >
                            <KeyIcon sx={{ color: 'white' }} fontSize="small" />
                        </Box>
                    )}

                    <Typography component="span" variant="h5" fontSize={20} p={1} fontWeight="bold">
                        Room ID:
                    </Typography>
                    <Typography component="span">
                        {userRole === UserRole.HOST ? socketService.roomId : paramId}
                    </Typography>
                </Box>
                {userRole === UserRole.HOST && (
                    <Button
                        endIcon={<ArrowForwardIosIcon />}
                        variant="outlined"
                        disableElevation
                        sx={{ textTransform: 'none' }}
                        onClick={handleStartQuiz}
                    >
                        Start
                    </Button>
                )}
                {userRole === UserRole.GUEST && (
                    <Typography variant="caption" fontStyle="italic" color="primary.main">
                        Waiting host to start
                    </Typography>
                )}
            </Stack>
        </Paper>
    );
};

export default RoomInfo;
