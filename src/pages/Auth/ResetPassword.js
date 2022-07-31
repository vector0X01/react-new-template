import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import { makeStyles } from '@mui/styles';
import * as yup from 'yup';
import { useYupValidationResolver } from '../../helpers/yupResolver';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '../../components/Buttons/IconButton';
import AuthField from '../../components/Inputs/AuthField';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { selectAuth, onForgotPassword, authenticate } from '../../redux/slice/authSlice';
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
      zIndex: 1,
      marginBottom: '30px',
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
  actions: {
    marginTop: '20px !important',
  },
}));

var validationSchema = yup.object({
  password: yup.string().required('Required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ResetPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [passwordData, setPasswordData] = useState('');
  if (auth.forgotPwdData) {
    validationSchema = yup.object({
      code: yup.string().required('Required'),
      password: yup.string().required('Required'),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    });
  }
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = async (data) => {
    const { code, password } = data;
    dispatch(setLoading(true));
    if (auth.forgotPwdData) {
      const { email } = auth.forgotPwdData;
      try {
        await Auth.forgotPasswordSubmit(email, code, password);
        dispatch(onForgotPassword(null));
        dispatch(setLoading(false));
        navigate('/login');
      } catch (err) {
        dispatch(setLoading(false));
        enqueueSnackbar(err.message);
      }
    } else if (auth.resetPwdData) {
      Auth.completeNewPassword(
        auth.resetPwdData, // the Cognito User Object
        password // the new password
      )
        .then((user) => {
          const token = user.signInUserSession.idToken.jwtToken;
          localStorage.setItem('pd-token', token);
          dispatch(authenticate(true));
          dispatch(setLoading(false));
        })
        .catch((err) => {
          dispatch(setLoading(false));
          enqueueSnackbar(err.message);
        });
    }
  };

  const hasLowerCase = () => {
    return /[a-z]/.test(passwordData);
  };

  const hasUpperCase = () => {
    return /[A-Z]/.test(passwordData);
  };

  const hasNumber = () => {
    return /[0-9]/.test(passwordData);
  };

  const hasSpecialChar = () => {
    // eslint-disable-next-line no-useless-escape
    return /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g.test(passwordData);
  };

  const hasMinLength = () => {
    return passwordData.length >= 8;
  };

  return (
    <form>
      <Grid spacing={2} className={classes.fieldContainer} container justifyContent="center">
        <Grid item xs={10} sm={8}>
          <Typography className={classes.headerText} variant="h4">
            Reset Password
          </Typography>
        </Grid>
        {auth.forgotPwdData ? (
          <Grid item xs={10} sm={8}>
            <AuthField
              id="reset-pwd-code"
              errors={errors}
              register={register}
              name="code"
              type="password"
              variant="standard"
              StartIcon={VpnKeyIcon}
              placeholder="Enter code"
            />
          </Grid>
        ) : null}
        <Grid item xs={10} sm={8}>
          <AuthField
            id="reset-pwd"
            errors={errors}
            register={register}
            name="password"
            type="password"
            variant="standard"
            StartIcon={LockIcon}
            placeholder="Enter new paswword"
            autoComplete="new-password"
            onChange={(e) => setPasswordData(e.target.value)}
          />
        </Grid>
        <Grid item xs={10} sm={8}>
          <AuthField
            id="reset-pwd-confirm"
            errors={errors}
            register={register}
            name="confirmPassword"
            type="password"
            variant="standard"
            StartIcon={LockIcon}
            autoComplete="new-password"
            placeholder="Confirm new password"
          />
        </Grid>
        <Grid item xs={10} sm={8}>
          {passwordData ? (
            <div>
              <p style={{ color: !hasLowerCase() ? '#FF0000' : '#FFFFFF' }}>
                {hasLowerCase() ? '✓' : '✖'} Password must contain a lower case letter
              </p>
              <p style={{ color: !hasUpperCase() ? '#FF0000' : '#FFFFFF' }}>
                {hasUpperCase() ? '✓' : '✖'} Password must contain an upper case letter
              </p>
              <p style={{ color: !hasSpecialChar() ? '#FF0000' : '#FFFFFF' }}>
                {hasSpecialChar() ? '✓' : '✖'} Password must contain a special character
              </p>
              <p style={{ color: !hasNumber() ? '#FF0000' : '#FFFFFF' }}>
                {hasNumber() ? '✓' : '✖'} Password must contain a number
              </p>
              <p style={{ color: !hasMinLength() ? '#FF0000' : '#FFFFFF' }}>
                {hasMinLength() ? '✓' : '✖'} Password must contain at least 8 characters
              </p>
            </div>
          ) : null}
        </Grid>
        <Grid className={classes.actions} item xs={10} sm={8}>
          <IconButton Icon={CheckCircleOutlineIcon} onClick={handleSubmit(onSubmit)}>
            Change password
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ResetPassword;
