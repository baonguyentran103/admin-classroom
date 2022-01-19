import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, MenuItem } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const Router = useRouter();
  const [anchorElAvatar, setAnchorElAvatar] = useState(null);
  const handleClickAvatar = (event) => setAnchorElAvatar(event.currentTarget);
  const handleCloseAvatar = () => { setAnchorElAvatar(null); }
  const handleProfile = () => {
    setAnchorElAvatar(null);
    Router.push('/account');
    //console.log("Click Profile")
  }
  const handleLogout = () => {
    setAnchorElAvatar(null);
    console.log("handle Logout Here");
    localStorage.clear();
    Router.push('/login');


  }
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ ml: 1 }} onClick={() => { handleLogout() }}>
            <LogoutIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
