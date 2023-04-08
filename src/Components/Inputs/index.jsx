
import { TextField, InputAdornment, IconButton, Button} from '@mui/material';
import {  VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import styled from '@emotion/styled';


const CssTextField = styled(TextField)({
  '& .MuiInputLabel-root':{
    marginLeft:"5px"
  },
  '& label.Mui-focused': {
    marginTop:"5px",
    marginLeft:"5px",
    color:props=>props.error?"#D9292B" :'#003FB9',
  },
  
  '& .MuiOutlinedInput-root': {

    '& fieldset': {
      borderColor: '#b1b1b1',
      borderWidth:"2px",
      margin:"5px",
    },
    '&.Mui-focused fieldset': {
      borderColor:props=>props.error?"#D9292B" :'#003FB9'
    }
  },
  '& p.Mui-error':{
  },
  '& .MuiFormHelperText-root': {
    fontWeight:"550",
  }
});

export const PasswordInput = (props) => {
  const {errMsg,value,onChange,name}= props
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <CssTextField
      error={errMsg!==''}
      type={showPassword ? 'text' : 'password'}
      label="Password"
      name={name}
      fullWidth
      onChange={onChange}
      value={value}
      helperText={errMsg}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword}>
              {showPassword ? <VisibilityOutlined/> : <VisibilityOffOutlined className='icon-style'/>}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export const EmailInput=(props)=>{
  const {errMsg,value,onChange,name}= props
  
  return(
    <CssTextField
    label="Email Address"
    name={name}
    error={errMsg!==''}
    value={value}
    onChange={onChange}
    fullWidth
    helperText={errMsg}
    />
  )
}

const CssButton = styled(Button)({
  textTransform:'none',
  backgroundColor:"#003FB9"
})

export const SubmitButton=(props)=>{
  const{loading,text,onClick}=props
  return(
    <CssButton
        type="submit" 
        variant="contained" 
        fullWidth
        onClick={onClick}
        >
        {loading?
      
          <CircularProgress
          sx={{
            color:"HighlightText",
          }}
          size={25}
          thickness={5}
          />
        :text}
        </CssButton>
  )
}