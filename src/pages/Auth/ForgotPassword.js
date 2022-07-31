import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import { useYupValidationResolver } from '../../helpers/yupResolver';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import IconButton from '../../components/Buttons/IconButton';
import AuthField from '../../components/Inputs/AuthField';
import LockResetIcon from '@mui/icons-material/LockReset';
import { onForgotPassword } from '../../redux/slice/authSlice';
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

const validationSchema = yup.object({
  email: yup.string().email().required('Required'),
});

const ForgotPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = async (data) => {
    const { email } = data;
    dispatch(setLoading(true));
    if (email) {
      try {
        await Auth.forgotPassword(email);
        dispatch(onForgotPassword({ email }));
        dispatch(setLoading(false));
        navigate('/reset-password');
      } catch (err) {
        dispatch(setLoading(false));
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    }
  };

  return (
    <form>
      <Grid spacing={2} className={classes.fieldContainer} container justifyContent="center">
        <Grid item xs={10} sm={8}>
          <Typography className={classes.headerText} variant="h4">
            Forgot Password
          </Typography>
        </Grid>
        <Grid item xs={10} sm={8}>
          <AuthField
            register={register}
            required={true}
            errors={errors}
            name="email"
            id="forgot-pwd-email"
            type="text"
            variant="standard"
            StartIcon={MailOutlineIcon}
            placeholder="Enter your email"
          />
        </Grid>
        <Grid className={classes.actions} item xs={10} sm={8}>
          <IconButton Icon={LockResetIcon} onClick={handleSubmit(onSubmit)}>
            Reset Password
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ForgotPassword;
