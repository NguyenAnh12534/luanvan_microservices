import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getModeText, getModeTextColor } from '~/Helpers/GlobalHelper';

const RoomInvitationModal = (props) => {
    const { open, handleClose, invitationInfo } = props;

    const navigate = useNavigate();

    const acceptInvitation = () => {
        navigate(`/quiz/wait-room/guest/${invitationInfo.roomId}`, { state: { mode: '' } });
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: { borderRadius: 15 },
            }}
        >
            <DialogContent sx={{ textAlign: 'center' }}>
                <DialogTitle>
                    <Typography variant="body1" fontWeight="bold" fontSize={20}>
                        Invitation
                    </Typography>
                </DialogTitle>
                <Stack justifyContent="center" alignItems="center">
                    <img src={process.env.PUBLIC_URL + '/room_invitation.png'} width="50%" />
                    <Stack direction="row" mt={0}>
                        <Typography variant="caption" fontWeight="bold">
                            lhduc2205 {'\u00A0'}
                        </Typography>
                        <Typography variant="caption">want to invite you to room.</Typography>
                    </Stack>

                    {getModeText(invitationInfo.mode)}
                    <Stack direction="row" spacing={1} mt={3} width={1} px={7}>
                        <Button
                            variant="outlined"
                            sx={{ textTransform: 'none', borderRadius: 5 }}
                            onClick={handleClose}
                            disableElevation
                            fullWidth
                        >
                            Not now
                        </Button>

                        <Button
                            variant="contained"
                            sx={{ textTransform: 'none', borderRadius: 5 }}
                            onClick={acceptInvitation}
                            disableElevation
                            fullWidth
                        >
                            Accept
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default RoomInvitationModal;
