import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { addToCart } from '../cart/cartSlice';
import { useDispatch } from 'react-redux';
const SingleCareer = () => {
  const [career, setCareer] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCareer = async () => {
      const response = await axios.get(`/api/singlecareer/${id}`);
      setCareer(response.data);
    };
    fetchCareer();
  }, [id]);

const handleAddToCart = () => {
    dispatch(addToCart({ 
       career: career,
       quantity: 1 }));
  };

  return (
    <div>
      <h1>{career.name}</h1>
      <img src={career.imageUrl} alt={career.name} />
      <p>{career.description}</p>
      <p>Salary: ${career.salary}</p>
      <p>Time of Completion: {career.timeOfCompletion} years</p>
      <p>Cost: ${career.cost}</p>
      <button onClick={(
        handleAddToCart
      )}>Add to Cart</button>
    </div>
  );
};

export default SingleCareer;
