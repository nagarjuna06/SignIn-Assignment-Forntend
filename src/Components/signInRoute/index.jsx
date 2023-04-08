import "./index.css";
import UserLogo from '../../assets/user.svg'
import Logo from '../../assets/logo.png'
import { EmailInput, PasswordInput, SubmitButton } from "../Inputs";
import { useState } from "react";
import {validate} from 'email-validator'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate=useNavigate()
  const [formData,setFormData]=useState({email:"",password:""});
  const[formErrors,setFormErrors]=useState({email:"",password:""})
  const [loading,setLoading]=useState(false);
  const [serverErrorMsg,setServerErrorMsg]=useState('');
  
  const submitForm=(e)=>{
    e.preventDefault();
    const {email,password}=formData;
    const formErrors={}
    if(email===''){
      formErrors.email="Email is Required";
    }
    else if(!validate(email)){
      formErrors.email='Please enter a valid email.';
    }
    else{
      formErrors.email=''
    }
    if(password===''){
      formErrors.password="Password is Required!"
    }
    else if(password.length<8){
      formErrors.password="Password must be 8 character long."
    }
    else{
      formErrors.password=""
    }
    setFormErrors(formErrors)
    if(formErrors.email===''&&formErrors.password===''){
      setLoading(true);
      sendToServer();
    }
  }
  const sendToServer=async()=>{
    const options={
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    }
    const res =await fetch(`${import.meta.env.VITE_API_URL}/signIn`,options);
    const response = await res.json()
    if(res.ok){
      Cookies.set('jwtToken',response.jwtToken,{expires:30})
      setServerErrorMsg('')
      navigate('/',{replace:true})
      
    }
    else{
      setLoading(false)
      setServerErrorMsg(response.msg)
    }
    
  }
  const handleInput=e=>{
    setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  return (
    <div className="bg-container">
    <div className="form-container">
      <form className="form" onSubmit={submitForm}>
        <div className="welcome-container">
          <img src={UserLogo} alt="user-logo" className="user-logo-img"/>
          <h2>Welcome!</h2>
          <p>Let's connect to your workspace.<br/>Please enter your email to continue.</p>
        </div>
        <EmailInput name="email" value={formData.email} errMsg={formErrors.email} onChange={handleInput}/><br/>
        <PasswordInput name="password" value={formData.password} errMsg={formErrors.password} onChange={handleInput}/>
        <p className="forgot-password-text">Forgot Password?</p>
        <SubmitButton loading={loading} text="Sign In"/>
        <p className="error">{serverErrorMsg}</p>
      </form>
    </div>
      <footer>
        <p>Powered by <img src={Logo} alt="logo" className="logo" /></p>
        <div className="footer-right-content">
            <span>Need Help?</span>
            <div>
            <span>Privacy Policy</span> <i> & </i> <span>Terms</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
