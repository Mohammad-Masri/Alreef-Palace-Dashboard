import { OutlinedInput, InputAdornment } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { styled } from '@mui/material/styles';
import React from 'react';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  // width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const SearchTextInput = ({ value, placeholder, onChange, ...props }) => {
  return (
    <SearchStyle
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position="start">
          <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
        </InputAdornment>
      }
      fullWidth
      {...props}
    />
  );
};

export default SearchTextInput;
