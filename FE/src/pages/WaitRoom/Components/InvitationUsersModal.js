import React from 'react';
import SocketContext from '~/Context/SocketContext';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';

const InvitationUsersModal = ({ open, handleClose, users, mode }) => {
    const socketService = React.useContext(SocketContext);

    const [invitedStates, setInvitedStates] = React.useState(new Map());

    React.useEffect(() => {
        users.map((user) => {
            updateInvitedStates(user.email, false);
        });
    }, []);

    const updateInvitedStates = (key, value) => {
        setInvitedStates((map) => new Map(map.set(key, value)));
    };

    const handleInviteUser = React.useCallback(
        (email) => () => {
            console.log('Invite: ', email);
            socketService.invite(email, mode);
            updateInvitedStates(email, true);
        },
        [],
    );

    const getInvitedState = (email) => invitedStates.get(email);

    const handleCloseDialog = () => {
        handleClose();
        setInvitedStates(new Map());
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            PaperProps={{
                style: { borderRadius: 15 },
            }}
            maxWidth="xs"
            fullWidth
        >
            <DialogContent sx={{ m: 0, p: 2, textAlign: 'center' }}>
                <DialogTitle>
                    <Typography variant="body1" fontWeight="bold" fontSize={20} p={0}>
                        Available users
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 25,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ mt: 3, px: 0, mx: 0 }}>
                    {users.length === 0 ? (
                        <Typography>Don't have any available user yet.</Typography>
                    ) : (
                        <Stack spacing={1}>
                            {users?.map((user) => {
                                return (
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" width={1}>
                                        <Typography>{user.email}</Typography>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            disableElevation
                                            onClick={handleInviteUser(user.email)}
                                            sx={{ textTransform: 'none' }}
                                            disabled={getInvitedState(user.email)}
                                        >
                                            {getInvitedState(user.email) ? 'Invited' : 'Invite'}
                                        </Button>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    )}
                </DialogContent>
            </DialogContent>
        </Dialog>
    );
};

export default InvitationUsersModal;
