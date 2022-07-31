import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { drawerToggle } from '../../redux/slice/layoutSlice';
import { authenticate } from '../../redux/slice/authSlice';
import Logo from '../../assets/images/logo.png';

const useStyles = makeStyles(() => ({
  appbar: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  userIcon: {
    marginLeft: 'auto !important',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  logo: {
    height: '40px',
    width: '187px',
  },
}));

const Appbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches500 = useMediaQuery('(min-width:500px)');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    Auth.signOut();
    localStorage.removeItem('pd-token');
    dispatch(authenticate(false));
  };

  const handleDrawer = () => {
    dispatch(drawerToggle());
  };

  return (
    <AppBar className={clsx(classes.appbar)} position="static">
      <Toolbar className={classes.toolbar}>
        {!matches500 ? (
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon onClick={handleDrawer} />
          </IconButton>
        ) : null}
        <IconButton size="large" edge="start" color="inherit" LinkComponent={Link} to={'/'}>
          <img className={classes.logo} src={Logo} alt="logo" />
        </IconButton>
        <IconButton
          className={classes.userIcon}
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
