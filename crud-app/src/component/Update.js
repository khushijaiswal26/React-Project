import axios from 'axios';
import React, { useEffect, useState } from 'react';
import imgLogo from '../assets/imgLogo.jpg';
import loadGif from '../assets/loadGif.gif';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Update = () => {
  const [category,setCategory]= useState('');
  const [selectedFile,setSelectedFile]= useState(null);
  const [imageUrl,setImageUrl]= useState(imgLogo);
  const [isLoading,setLoading]= useState(false);
  const [hasError,setHasError]= useState(false);
  const [error,setError]= useState('');

  let navigate = useNavigate();
  let params = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:3000/category/'+params.id)
    .then(res=>{
      setLoading(false);
      setHasError(false);  
      console.log(res.data.category);
      setCategory(res.data.category.name);
      setImageUrl(res.data.category.photo);
    })
    .catch(err=>{
      console.log(err);
      setLoading(false);
      setHasError(true);
      setError(err.respose.data.message);
    })
  },[])

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

    axios.put('http://localhost:3000/category/'+params.id,formData)
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
      <h1>Update Category</h1>
      <form onSubmit={submitHandler} className='newcategoryForm'>
        <input value={category} onChange={(e)=>{setCategory(e.target.value)}}type="text"/>
        <input onChange={(e)=>{fileHandler(e)}}type="file"/>
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

export default Update