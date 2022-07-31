import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

const useStyles = makeStyles(() => ({
  field: {
    color: '#FFF !important',
    fontSize: '18px !important',
    '&::before': {
      borderBottomColor: '#708DA3 !important',
    },
    '&::after': {
      borderBottom: '1px solid #708DA3 !important',
    },
  },
  errorField: {
    '& input::placeholder': {
      color: '#FF0000 !important',
    },
    '&::before': {
      borderBottomColor: '#FF0000 !important',
    },
    '&::after': {
      borderColor: '1px solid #FF0000 !important',
    },
  },
  fieldIcons: {
    color: '#708DA3',
  },
  endText: {
    color: '#708DA3',
    cursor: 'pointer',
    '&:hover': {
      fontWeight: '600',
    },
  },
}));

const AuthField = (props) => {
  const classes = useStyles();
  const {
    name = '',
    id = '',
    autoComplete = 'off',
    type = 'text',
    StartIcon = null,
    endText = '',
    onEndTextClick,
    onChange,
    placeholder = '',
    required = false,
    register = () => {},
    errors,
  } = props;

  return (
    <>
      <TextField
        {...register(name)}
        id={id}
        name={name}
        variant="standard"
        required={required}
        InputProps={{
          startAdornment: StartIcon && (
            <InputAdornment position="start">
              <StartIcon className={classes.fieldIcons} fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: endText && (
            <InputAdornment onClick={onEndTextClick && onEndTextClick} position="end">
              <span className={classes.endText}>{endText}</span>
            </InputAdornment>
          ),
          placeholder,
          className: clsx(classes.field, { [classes.errorField]: errors && !!errors[name] }),
          type,
          autoComplete,
        }}
        onChange={onChange}
      />
      {errors && !!errors[name] ? <FormHelperText error>{errors[name].message}</FormHelperText> : null}
    </>
  );
};

export default AuthField;
