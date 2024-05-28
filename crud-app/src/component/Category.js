import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import loadGif from '../assets/loadGif.gif';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [categoryList,setCategoryList] = useState([]);
  const [isLoading,setLoading]= useState(false);
  const [hasError,setHasError]= useState(false);
  const [error,setError]= useState('');

  let navigate = useNavigate();

  const detailRoute = (id)=>{
    navigate('/dashboard/detail/'+id);
  }

  const editRoute = (id)=>{
    navigate('/dashboard/edit/'+id);
  }

  const deleteData = (id,imgLink)=>{
    
    if(window.confirm('Are you sure?')){
      setLoading(true);
      axios.delete('http://localhost:3000/category?id='+id+'&imageUrl='+imgLink)
      .then(res=>{
        console.log(res);
        window.alert('Data Deleted');
        getData();
        setLoading(false);
      })
      .catch(err=>{
        console.log(err);
        setLoading(false);
      setHasError(true);
      setError(err.message);
      })
    }
    else{
      console.log('cancel');
    }
  }

  const getData = ()=>{
    setLoading(true);
    axios.get('http://localhost:3000/category',{
      headers:{
        Authorization:'Bearer '+ localStorage.getItem('token')
      }
    })
    .then(res=>{
      console.log(res.data.category);
      setCategoryList(res.data.category);
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
      setLoading(false);
      setHasError(true);
      setError(err.message);
    })
  }

  useEffect(()=>{
    setLoading(true);
    getData();
  },[]);

  return (
    <div className='categoryBody'>
    {isLoading && <div>
      <img src={loadGif}></img>
    </div>}
    <div className='categoryBox'>
    {!isLoading && <div className='categoryBox'>
      <h1>Category List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {categoryList?.map(data=><Row key ={data.id} editReq={editRoute} detailReq={detailRoute} deleteReq={deleteData} detail={data}/>)}
        </tbody>
      </table>
    </div>}
    
    {hasError && <div>
      <p style={{color:'red'}}>Error :- {error}</p>
    </div>}
    </div>
    </div>
  )
}

const Row=(props)=>{
  console.log(props);
  return(
    <tr>
      <td className='rowName'>{props.detail.name}</td>
      <td className='rowImg'><img src={props.detail.photo}></img></td>
      <td className='rowBtn'><button onClick={()=>{props.detailReq(props.detail._id)}}>Detail</button></td>
      <td className='rowBtn'><button onClick={()=>{props.editReq(props.detail._id)}}>Edit</button></td>
      <td className='rowBtn'><button onClick={()=>{props.deleteReq(props.detail._id,props.detail.photo)}}>Delete</button></td>
    </tr>
  )
}

export default Category