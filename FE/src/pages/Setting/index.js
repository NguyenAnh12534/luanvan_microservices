import {
    Alert,
    Button,
    Card,
    CardContent,
    Grow,
    IconButton,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import React from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UserContext from '~/Context/UserContext';
import UserService from '~/Services/UserService';

const Setting = () => {
    const { user, setUser } = React.useContext(UserContext);
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState('');
    const [settingList, setSettingList] = React.useState([]);
    const [modal, setModal] = React.useState('Set username');
    const [desc, setDesc] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);

    const handleClose = () => {
        setOpen(false)
        setDesc('')
    };

    const handleOpen = React.useCallback(
        (modalText, modalType, modalDesc) => () => {
            setOpen(true);
            setModal(modalText);
            setType(modalType);
            setDesc(modalDesc);
            if(modalType === 'password') {
                setDesc('');
            }
        },
        [],
    );

    const handleChangeForm = (event) => {
        setDesc(event.target.value);
    };

    const handleSave = () => {
        UserService.update(
            type,
            desc,
            (response) => {
                let data = response.data.data;
                setDesc(data[type]);
                setUser(data);
                setShowAlert(true);
                handleClose();
            },
            (error) => {
                console.log(error);
            },
        );
    };

    React.useEffect(() => {
        setSettingList([
            {
                name: 'email',
                description: user.email,
                modalText: 'Enter email',
                codeName: 'email',
            },
            {
                name: 'first name',
                description: user.firstName || 'empty',
                modalText: 'Set First Name',
                codeName: 'firstname',
            },
            {
                name: 'last name',
                description: user.lastName || 'empty',
                modalText: 'Set Last Name',
                codeName: 'lastname',
            },
            {
                name: 'password',
                description: 'Change password',
                modalText: 'Enter new password',
                codeName: 'password',
            },
        ]);
    }, [user]);

    return (
        <Box sx={settingContainer}>
            <Typography variant="h5">Settings</Typography>

            <Box sx={{ display: 'flex' }}>
                <Grow in={showAlert}>
                    <Alert
                        severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setShowAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ my: 2 }}
                    >
                        Your info has been updated!
                    </Alert>
                </Grow>
            </Box>
            <Card sx={{ width: '500px', boxShadow: 1 }}>
                <CardContent>
                    <React.Fragment>
                        <Typography component="div" sx={{ fontSize: 14 }} color="text.secondary">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ManageAccountsIcon color="warning" sx={{ fontSize: 18, mr: 1 }} />
                                <Box sx={{ fontSize: 16, fontWeight: 400, mr: 1 }}>Profile</Box>
                            </Box>
                        </Typography>
                        {settingList.map((setting, index) => (
                            <Box
                                onClick={
                                    index != 0
                                        ? handleOpen(setting.modalText, setting.codeName, setting.description)
                                        : undefined
                                }
                                sx={settingItem}
                                key={setting.name}
                            >
                                <Box>
                                    <Typography sx={{ fontWeight: 700, fontSize: 16, textTransform: 'capitalize' }}>
                                        {setting.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        {setting.description}
                                    </Typography>
                                </Box>
                                {index != 0 && <ChevronRightIcon sx={{ color: '#9d9da4' }} fontSize="small" />}
                            </Box>
                        ))}

                        <Modal open={open} onClose={handleClose}>
                            <Box sx={style}>
                                <Typography id="modal-modal-title" sx={{ fontSize: 14 }} color="text.secondary">
                                    {modal}
                                </Typography>
                                <TextField
                                    sx={{ my: 2, mb: 2 }}
                                    type={type === 'password' ? 'password' : 'text'}
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChangeForm}
                                    inputProps={{
                                        style: {
                                            padding: '10px 8px',
                                        },
                                    }}
                                    value={desc}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Button sx={{ mr: 2 }} onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" onClick={handleSave} disabled={desc === ''}>
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </CardContent>
            </Card>
        </Box>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius: 2,
    px: 4,
    py: 2,
};

const settingItem = {
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'space-between',
    mt: 2,
};

const settingContainer = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
};

export default Setting;
