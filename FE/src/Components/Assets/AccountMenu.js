import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CredentialService from '~/Services/CredentialService';
import UserContext from '~/Context/UserContext';
import HistoryIcon from '@mui/icons-material/History';
import { Link, useNavigate } from 'react-router-dom';

const AccountMenu = () => {
    const { user, setUser } = React.useContext(UserContext);
    const userContext = React.useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        CredentialService.logOut();
        setUser(null);
        return navigate('/');
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <DensityMediumIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box>
                    <MenuItem sx={{ fontSize: 14, fontWeight: 'bold' }}>{user.email}</MenuItem>
                    <Divider />
                </Box>
                <Link to="/setting" style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem sx={{ fontSize: 14 }}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                </Link>
                <Link to="/history/attemp" style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem sx={{ fontSize: 14 }}>
                        <ListItemIcon>
                            <HistoryIcon fontSize="small" />
                        </ListItemIcon>
                        History
                    </MenuItem>
                </Link>
                <MenuItem sx={{ fontSize: 14, color: 'red' }} onClick={handleLogOut}>
                    <ListItemIcon sx={{ color: 'red' }}>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Log out
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default AccountMenu;
