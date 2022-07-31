import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    maxWidth: '450px',
  },
  textfield: {
    width: '100%',
  },
  field: {
    height: '46px',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px 0 0 10px',
    padding: '10px 10px 10px 30px',
    boxSizing: 'border-box',
    fontSize: '14px !important',
    '& input::placeholder': {
      color: '#000 !important',
    },
  },
  fieldIcons: {
    color: '#FFFFFF',
  },
  iconBack: {
    backgroundColor: '#1CB5DD !important',
    borderRadius: '0 10px 10px 0 !important',
    height: '46px',
  },
}));

const SearchField = (props) => {
  const classes = useStyles();
  const { onChange, placeholder = '' } = props;

  return (
    <div className={classes.root}>
      <TextField
        className={classes.textfield}
        variant="standard"
        InputProps={{
          placeholder,
          className: classes.field,
          disableUnderline: true,
        }}
        onChange={onChange}
      />
      <IconButton className={classes.iconBack} color="primary" sx={{ p: '10px' }}>
        <SearchIcon className={classes.fieldIcons} />
      </IconButton>
    </div>
  );
};

export default SearchField;
