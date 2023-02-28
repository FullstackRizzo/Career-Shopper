import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCareersAsync, selectCarrers } from './viewCareersSlice';

const ViewCareers = () => {
  const allCareers = useSelector(selectCarrers);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCareersAsync());
  },[dispatch])
  

  return (
    <div>
      <h1>Careers</h1>
      {allCareers.map((career) => (
        <div key={career.id}>
          <h2>{career.name}</h2>
          <p>Cost: ${career.cost}</p>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ViewCareers;