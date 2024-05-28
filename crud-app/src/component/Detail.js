import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';

const Detail = () => {
  const [category,setCategory] = useState({});
  let params = useParams();
  console.log(params.id);  
  
  useEffect(()=>{
    axios.get('http://localhost:3000/category/'+params.id)
    .then(res=>{
        console.log(res.data.category);
        setCategory(res.data.category);
    })
    .catch(err=>{
        console.log(err);
    })
  })
  return (
    <div className='signupBody'>
      <div className='signupBox'>
        <img src={category.photo}/>
        <h1>{category.name}</h1>
      </div>
    </div>
  )
}

export default Detail