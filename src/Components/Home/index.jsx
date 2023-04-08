
import UserLogo from '../../assets/user.svg'
import Logo from '../../assets/logo.png'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { SubmitButton } from '../Inputs';
import { useNavigate } from 'react-router-dom';
const Home=()=>{
  const navigate=useNavigate()
  const [userName,setUserName]=useState('');
  useEffect(()=>{
    apiCall()
  })
  const apiCall=async()=>{
    const jwt = Cookies.get('jwtToken');
    const options={
      method:"GET",
      headers:{
        "Authorization":`Bearer ${jwt}`
      }
    }
    const res = await  fetch(import.meta.env.VITE_API_URL,options)
    const response =await res.json()
    if(res.ok){
      setUserName(response.email)
    }
  }
  const SignOut=()=>{
    Cookies.remove('jwtToken');
    navigate('/signIn',{replace:true})
    
  }
  return (
    <div className="bg-container">
    <div className="form-container">
      <form className="form">
        <div className="welcome-container">
          <img src={UserLogo} alt="user-logo" className="user-logo-img"/>
          <h2>Welcome!</h2>
          <h1>{userName}</h1>
          <p>Let's connect to your workspace</p>
        </div>
          <SubmitButton text="Sign Out" onClick={SignOut}/>
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

}
export default Home