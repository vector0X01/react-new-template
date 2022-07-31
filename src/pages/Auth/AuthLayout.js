import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import ParticleBackground from '../../components/Particles/Particles';
import AuthBg from '../../assets/images/authBg.png';

const useStyles = makeStyles(() => ({
  root: {
    background: `url(${AuthBg}) top center fixed no-repeat`,
    backgroundSize: 'cover',
    height: '100vh',
    width: '100%',
  },
  grid: {
    height: '100vh',
    overflow: 'auto',
    paddingLeft: '10px !important',
    paddingRight: '10px !important',
  },
}));

const AuthLayout = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ParticleBackground />
      <Grid className={classes.grid} container justifyContent="flex-end" alignItems="center">
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} display="flex" justifyContent="center">
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthLayout;
