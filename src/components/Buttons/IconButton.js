import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(() => ({
  formFieldButton: {
    fontSize: '16px',
    textDecoration: 'none',
    textTransform: 'capitalize',
    position: 'relative',
    marginLeft: '0em',
    padding: '7px 35px 6px 55px !important',
    transition: 'all 0.6s ease',
    zIndex: '0',
    background: '#fff !important',
    borderRadius: '50px !important',
    color: '#263E50 !important',
    border: '0px !important',

    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      left: '-2px',
      top: 0,
      bottom: 0,
      margin: 'auto',
      background: '#1CB5DD',
      width: '2.7em',
      borderRadius: '5em',
      transition: 'all 0.6s cubic-bezier(0.615, 0, 0.07, 1)',
    },

    '&::after': {
      color: '#1CB4DD',
      fontSize: '1.6em',
      position: 'absolute',
      zIndex: -1,
      left: '6px',
      top: '7px',
      bottom: 0,
      background: '#fff',
      borderRadius: '33px',
      height: '20px',
      width: '20px',
      padding: '0px 3px 0px 3px !important',
      lineHeight: '20px',
    },

    '&:hover': {
      transition: 'all 0.6s ease',
      transitionDelay: '0.3s',
      color: '#fff !important',
      zIndex: 999,
    },

    '&:hover::before': {
      transition: 'all 0.6s cubic-bezier(0.615, 0, 0.07, 1)',
      width: '101%',
    },
  },

  iconStyle: {
    position: 'absolute',
    zIndex: '999 !important',
    fontSize: '22px !important',
    marginTop: '7px',
    marginLeft: '6px',
    color: '#FFF',
  },
}));

const IconButton = (props) => {
  const { Icon, onClick, children, type = '', form = '', component = null, to = '' } = props;
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
  };

  return (
    <div>
      {Icon ? <Icon className={classes.iconStyle} /> : null}
      <Button
        onClick={handleClick}
        className={classes.formFieldButton}
        type={type}
        form={form}
        component={component}
        to={to}
      >
        {children}
      </Button>
    </div>
  );
};

export default IconButton;
