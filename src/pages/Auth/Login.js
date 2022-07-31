import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { useYupValidationResolver } from '../../helpers/yupResolver';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '../../components/Buttons/IconButton';
import AuthField from '../../components/Inputs/AuthField';
import { authenticate, onResetPassword } from '../../redux/slice/authSlice';
import { setLoading } from '../../redux/slice/loaderSlice';

const useStyles = makeStyles(() => ({
  headerText: {
    fontSize: '1.7em',
    color: '#FFF',
    paddingBottom: '10px',
    borderBottom: '2px solid #19b4dd',
  },
  fieldContainer: {
    '& .MuiGrid-item': {
      marginBottom: '30px',
      zIndex: 1,
      '& .MuiTextField-root': {
        width: '100%',
      },
    },
    '& .MuiGrid-item:first-child': {
      marginBottom: '30px',
    },
    '& input:autofill': {
      backgroundColor: 'transparent !important',
      color: '#FFF',
    },
  },
  forgotPwd: {
    textAlign: 'end',
    '& a': {
      color: '#1CB5DD',
    },
    '& a:hover': {
      textDecoration: 'none !important',
    },
  },
  actions: {
    marginTop: '20px !important',
  },
}));

const validationSchema = yup.object({
  email: yup.string().email().required('Required'),
  password: yup.string().required('Required'),
});

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });
  const [showPwd, setShowPwd] = useState(false);

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const { email, password } = data;
    try {
      const response = await Auth.signIn(email, password);
      if (response.signInUserSession) {
        const token = response.signInUserSession.idToken.jwtToken;
        localStorage.setItem('pd-token', token);
        dispatch(setLoading(false));
        dispatch(authenticate(true));
      } else {
        dispatch(onResetPassword({ user: response, email, password }));
        dispatch(setLoading(false));
        navigate('/reset-password');
      }
    } catch (e) {
      dispatch(setLoading(false));
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  return (
    <form>
      <Grid spacing={2} className={classes.fieldContainer} container justifyContent="center">
        <Grid item xs={10} sm={8}>
          <Typography className={classes.headerText} variant="h4">
            Login
          </Typography>
        </Grid>
        <Grid item xs={10} sm={8}>
          <AuthField
            register={register}
            errors={errors}
            name="email"
            id="login-email"
            autoComplete="username"
            type="text"
            variant="standard"
            StartIcon={MailOutlineIcon}
            placeholder="Enter your email"
            required={true}
          />
        </Grid>
        <Grid item xs={10} sm={8}>
          <AuthField
            register={register}
            errors={errors}
            name="password"
            id="login-password"
            autoComplete="current-password"
            type={showPwd ? 'text' : 'password'}
            variant="standard"
            StartIcon={LockOpenIcon}
            endText={showPwd ? 'HIDE' : 'SHOW'}
            onEndTextClick={() => setShowPwd(!showPwd)}
            placeholder="Enter your password"
            required={true}
          />
        </Grid>
        <Grid item xs={10} sm={8}>
          <Grid container>
            <Grid className={classes.actions} item xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconButton Icon={LoginIcon} onClick={handleSubmit(onSubmit)}>
                Login
              </IconButton>
            </Grid>
            <Grid className={classes.actions} item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className={classes.forgotPwd}>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
