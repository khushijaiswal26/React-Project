import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MainNav = () => {
  let navigate = useNavigate();
  const logoutHandler = ()=>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className='nav'>
    <div className='navCategory'>
    <Link to='/dashboard/category' style={{ textDecoration: 'none' }}>Category list</Link>
    <Link to='/dashboard/add-category'>Add new category</Link>
    </div>
    <div className='navInfo'>
    <p>Hello {localStorage.getItem('userName')} !</p>
    <button onClick={logoutHandler}>Logout</button>
    </div>
    </div>
  )
}

export default MainNav