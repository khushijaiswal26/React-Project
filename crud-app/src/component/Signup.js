import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loadGif from '../assets/loadGif.gif';

const Signup = () => {
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState(null);
  const [isLoading,setLoading]= useState(false);
  const [hasError,setHasError]= useState(false);
  const [error,setError]= useState('');

  
  let navigate = useNavigate();

  const submitHandler=(event)=>{
    event.preventDefault();
    setLoading(true);
    console.log(userName,password,email,phone);
    axios.post('http://localhost:3000/user/signup',{
        userName:userName,
        password:password,
        email:email,
        phone:phone
    })
    .then(res=>{
        console.log(res.data);
        navigate('/login');
        setLoading(false);
        setHasError(false);
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
        <img src={loadGif}></img>
      </div>}
      {!isLoading && <div className='signupBox'>
          <h1>Create Account</h1>
          <form onSubmit={submitHandler} className='signupForm'>
              <input type='text' placeholder='username' onChange={(e)=>setUserName(e.target.value)}/>
              <br/>
              <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
              <br/>
              <input type='email' placeholder='email' onChange={(e)=>setEmail(e.target.value)} />
              <br/>
              <input type='number' placeholder='phone' onChange={(e)=>setPhone(e.target.value)}/>
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

export default Signup