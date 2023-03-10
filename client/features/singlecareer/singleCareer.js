import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../../../server/localStorage/localStorage';
import { addToUserCartAsync } from '../cart/userCartSlice';

const SingleCareer = () => {
  const [career, setCareer] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=> !!state.auth.me.id);
  const userId = useSelector((state)=> state.auth.me.id);

  useEffect(() => {
    const fetchCareer = async () => {
      const response = await axios.get(`/api/singlecareer/${id}`);
      setCareer(response.data);
    };
    fetchCareer();
  }, [id]);


  const handleAddToCart = () => {
    const cartData = getCartFromLocalStorage() || [] ;
    const cartItem = {
      career: career,
      quantity: 1,
    };
    console.log(cartData)
    const existingCartItemIndex = cartData.findIndex(item => item.career.id === career.id);
    if (existingCartItemIndex !== -1) {
      cartData[existingCartItemIndex].quantity++;
    } else {
      cartData.push(cartItem);
    }
    saveCartToLocalStorage(cartData)
  };

  const addToUserCart = async() =>{
    await dispatch(addToUserCartAsync({userId, career}))
  }


  const buttonContent = career.quantity > 0 ? "Add to Cart" : "SOLD OUT";

  return (
    <div className="single-career-container">
      <h1 className="single-career-title">{career.name}</h1>
      <img src={career.imageUrl} alt={career.name} className="single-career-image" />
      <p className="single-career-description">{career.description}</p>
      <p className="single-career-salary">Salary: ${career.salary}</p>
      <p className="single-career-time">Time of Completion: {career.timeOfCompletion} years</p>
      <p className="single-career-cost">Cost: ${career.cost}</p>
      <p className="single-career-quantity">Quantity: {career.quantity}</p>
      <button onClick={isLoggedIn ? addToUserCart : handleAddToCart} disabled={career.quantity === 0} className="single-career-button">
        {buttonContent}
      </button>
    </div>

  );
};

export default SingleCareer;