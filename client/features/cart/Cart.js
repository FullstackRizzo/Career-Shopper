import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCareerFromCart, checkoutCart, selectGetCart, getMyCart } from "./cartSlice";
import { useEffect } from "react";
import { useState } from "react";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectGetCart);
  const userId = useSelector((state) => state.auth.me.id);
  // const localCartStorage = localStorage.getItem("cart");

  // if (localCartStorage) {
  //     var localCart = JSON.parse(localCartStorage);
  // }

  const [localCart, setItem] = useState([]);
  localCart.push(cart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(localCart));
  }, [localCart]); //add objects to local storage

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setItem(localCart);
    }
  }, [cart]);

  const cartTotal = cart.reduce((acc, career) => {
    acc += career.cost * career.quantity;
    return acc;
  }, 0);

  useEffect(() => {
    if (userId) dispatch(getMyCart(userId));
  }, [dispatch, userId]);

  const handleDelete = (careerId) => {
    dispatch(deleteCareerFromCart(careerId));
  };

  const handleCheckout = (cart, userId) => {
    dispatch(checkoutCart(userId));
    navigate("/checkout"); //maybe navigate to orders page
  };


import { useDispatch } from "react-redux"
import { addToOrderQuantityAsync, deleteGuestOrderAsync, fetchGuestOrderAsync, selectCart, subtractFromOrderQuantityAsync } from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectCart);
  const userId = useSelector((state) => state.auth.me.id);
  useEffect(()=>{
    dispatch(fetchGuestOrderAsync());
  },[dispatch])

  const handleDelete= async(id)=>{
    await dispatch(deleteGuestOrderAsync(id));
  }

  const addToOrderQuantity = async(id)=>{
    await dispatch(addToOrderQuantityAsync(id));
  }

  const subtractFromOrderQuantity = async(id)=>{
    await dispatch(subtractFromOrderQuantityAsync(id));
  }

  return (
    <div>
      <div id="cart-container">
        <h1>Your Cart</h1>

        <h2>Subtotal: ${cartTotal}</h2>
        <div id="cart-items">
          {cart.map((cart) => {
            let career = cart.career;
            return (
              <div key={career.id}>
                {/* <img src = {career.image} /> */}
                <h3> {career.name} </h3>
                <h4> ${career.cost} </h4>
                <h4> Quantity: {career.quantity} </h4>
                <button onClick={() => handleDelete(career)}> Delete </button>
              </div>
            );
          })}
        </div>
        <button onClick={() => handleCheckout(cart, userId)}> Checkout </button>

        <h2>Subtotal: ${order.reduce((acc, order) =>{
          acc += order.career.cost * order.quantity
          return acc;
        },0).toLocaleString()}</h2>
        <div id="cart-items">
            {order.map((order) => (
              <div key={order.career.id}>
                <img src = {order.career.imageUrl} />
                <h3> {order.career.name} </h3>
                <h4> ${order.career.cost} </h4>
                <button onClick = {e=>{e.preventDefault; subtractFromOrderQuantity(order.career.id)}}>-</button><h4> Quantity: {order.quantity} </h4><button onClick = {e=>{e.preventDefault; addToOrderQuantity(order.career.id)}}>+</button>
                <button onClick = {e =>{e.preventDefault; handleDelete(order.career.id)}}> Delete </button>
              </div>
            ))}
        </div>
        <button> Checkout </button>

      </div>
    </div>
  );
};

export default Cart;
