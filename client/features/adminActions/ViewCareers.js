import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddCareer from './AddCareer';
import { deleteCareerAsync, fetchCareersAsync, selectCarrers } from './viewCareersSlice';

const ViewCareers = () => {
  const allCareers = useSelector(selectCarrers);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCareersAsync());
  },[dispatch])
  
  const handleDelete= async(id) =>{
    await dispatch(deleteCareerAsync(id));
  }

  return (
    <div className='homepage-container'>
      <h1>Careers</h1>
      {allCareers.map((career) => (
        <div key={career.id}>
          <h2>{career.name}</h2>
          <p>Cost: ${career.cost}</p>
          <button onClick ={e=>{e.preventDefault(); handleDelete(career.id)}}>Delete</button>
        </div>
      ))}
      <AddCareer/>
    </div>
  );
};

export default ViewCareers;