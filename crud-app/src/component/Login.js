import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loadGif from '../assets/loadGif.gif';

const Login = () => {
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setLoading]= useState(false);
  const [hasError,setHasError]= useState(false);
  const [error,setError]= useState('');

  
  let navigate = useNavigate();

  const submitHandler=(event)=>{
    setLoading(true);
    event.preventDefault();
    axios.post('http://localhost:3000/user/login',{
        userName: userName,
        password: password
    })
    .then(res=>{
      if(res.message != "bad request"){
        console.log(res.data.token);
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('userName',res.data.userName);
        navigate('/dashboard');
        setLoading(false);
        setHasError(false);
      }
    })
    .catch(err=>{
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.message);
    })
  }

  return (
    <div className='signupBody'>
    {isLoading && <div>
      <img src={ loadGif }></img>
    </div>}
    {!isLoading && <div className='signupBox'>
        <h1>Login</h1>
        <form onSubmit={submitHandler} className='signupForm'>
            <input type='text' placeholder='username' onChange={(e)=>setUserName(e.target.value)}/>
            <br/>
            <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <button type='submit' >Submit</button>
        </form>
    </div>}
    {hasError && <div>
      <p style={{color:'red'}}>Error :- {error}</p>
    </div>}
    </div>
  )
}

export default Login