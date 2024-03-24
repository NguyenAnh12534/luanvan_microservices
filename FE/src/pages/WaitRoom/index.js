import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoginModalContext from '~/Context/LoginModalContext';
import { UserRole } from '~/Enums/UserRole';
import SocketContext from '~/Context/SocketContext';
import { ListenType } from '~/Enums/ListenType';
import { useLocation } from 'react-router-dom';
import { getModeText } from '~/Helpers/GlobalHelper';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Members from './Components/Members';
import RoomInfo from './Components/RoomInfo';
import InvitationUsersModal from './Components/InvitationUsersModal';
import UserService from '~/Services/UserService';

const WaitRoom = () => {
    const socketService = React.useContext(SocketContext);
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const userRole = params.userRole;
    // const mode = location.state.mode;
    const paramId = params.id; // be careful of this paramId (it can be examId or roomId) hehe (kinda dirty but work)

    const { setOpenSignInModal } = React.useContext(LoginModalContext);

    const [usersInRoom, setUsersInRoom] = React.useState([]);
    const [mode, setMode] = React.useState(location.state.mode);
    const [users, setUsers] = React.useState([]);
    const [openInvitationUsersModal, setOpenInvitationUsersModal] = React.useState(false);

    const handleOpenInvitationUsersModal = () => setOpenInvitationUsersModal(true);
    const handleCloseInvitationUsersModal = () => setOpenInvitationUsersModal(false);

    React.useEffect(() => {
        if (paramId === null) {
            socketService.disconnect();
            navigate('/');
            setOpenSignInModal(true);
            return;
        }

        switch (userRole) {
            case UserRole.GUEST:
                socketService.joinRoom(paramId);
                break;
            case UserRole.HOST:
                socketService.createRoom(paramId, mode);
                break;
        }
    }, []);

    React.useEffect(() => {
        socketService.socket.on(ListenType.SERVER_UPDATE_USER, (response) => {
            console.log('--RESPONE OF SERVER_UPDATE_USER EVENT: ', response);
            socketService.roomMembers = response.users;
            setUsersInRoom(response.users);
            setMode(response.modeInRoom);
        });
    }, []);

    React.useEffect(() => {
        if (!socketService.isConnected()) {
            socketService.reconnect();
        }
    }, []);

    React.useEffect(()=>{
        socketService.socket.on(ListenType.SERVER_SEND_AVAILABLE_USERS, availableUsers => {
            availableUsers = availableUsers.filter(user => user.email);
            setUsers(availableUsers);
            handleOpenInvitationUsersModal();
        })
    },[])

    React.useEffect(() => {
        socketService.socket.on(ListenType.START_EXAM_SUCCESS, (examState) => {
            console.log('first timestamp: ', examState);
            navigate('/examRoom', {
                state: {
                    mode: examState.mode,
                    timestamp: examState.startTime,
                },
            });
        });
    }, []);

    const handleBackToPrevPage = () => {
        socketService.disconnect();
        navigate(-1);
    };

    const handleClickInviteButton = () => {
        // UserService.getAll(
        //     (response) => {
        //         setUsers(response.data.data);
        //         handleOpenInvitationUsersModal();
        //     },
        //     (error) => console.log('FETCH ALL USERS FAIL: ', error),
        // );
        socketService.getAvailableUsers();
    };

    return (
        <React.Fragment>
            <Button
                startIcon={<ArrowBackIosIcon />}
                sx={{ m: 2, textTransform: 'none' }}
                onClick={handleBackToPrevPage}
            >
                {userRole === UserRole.HOST ? 'Exam detail' : 'Home'}
            </Button>

            <Box sx={{ width: '50%', mx: 'auto', mb: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="end">
                    {getModeText(mode)}
                    <Button
                        startIcon={<PersonAddIcon />}
                        size="small"
                        disableElevation
                        color="primary"
                        sx={{ textTransform: 'none' }}
                        onClick={handleClickInviteButton}
                    >
                        Invite
                    </Button>
                </Stack>
            </Box>

            <RoomInfo userRole={userRole} paramId={paramId} mode={mode} />
            <Members members={usersInRoom} />
            <InvitationUsersModal
                open={openInvitationUsersModal}
                handleClose={handleCloseInvitationUsersModal}
                users={users}
                mode={mode}
            />
        </React.Fragment>
    );
};

const cardStyle = {
    minWidth: 400,
    borderRadius: 4,
    boxShadow: 'rgba(33, 35, 38, 0.1) 10px 10px 10px 0px;',
};

export default WaitRoom;
