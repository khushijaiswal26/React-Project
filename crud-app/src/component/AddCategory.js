import axios from 'axios';
import React, { useState } from 'react';
import imgLogo from '../assets/imgLogo.jpg';
import loadGif from '../assets/loadGif.gif';
import { useNavigate } from 'react-router-dom';


const AddCategory = () => {
  const [category,setCategory]= useState('');
  const [selectedFile,setSelectedFile]= useState(null);
  const [imageUrl,setImageUrl]= useState(imgLogo);
  const [isLoading,setLoading]= useState(false);
  const [hasError,setHasError]= useState(false);
  const [error,setError]= useState('');

  let navigate = useNavigate();

  const  fileHandler =(e)=>{
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  }
  const submitHandler = (event) =>{
    event.preventDefault();
    setLoading(true);
    const formData=new FormData();
    formData.append('name',category);
    formData.append('photo',selectedFile);

    axios.post('http://localhost:3000/category',formData,{
      headers:{
        Authorization:'Bearer '+ localStorage.getItem('token')
      }
  })
    .then(res=>{
      console.log(res);
      setLoading(false);
      navigate('/dashboard/category');
    })
    .catch(err=>{
      console.log(err.message);
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
    {!isLoading && <div className='newcategoryBox'>
      <h1>Add new Category</h1>
      <form onSubmit={submitHandler} className='newcategoryForm'>
        <input onChange={(e)=>{setCategory(e.target.value)}}type="text"/>
        <input onChange={(e)=>{fileHandler(e)}}type="file" className='newcategoryChoose'/>
        <button type='submit'>Submit</button>
      
        <img src={imageUrl}/>
      </form>
    </div>}

    {hasError && <div>
      <p style={{color:'red'}}>Error :- {error}</p>
    </div>}
    </div>
    
  )
}

export default AddCategory