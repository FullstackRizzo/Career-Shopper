import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { addToOrderQuantityAsync, deleteGuestOrderAsync, fetchGuestOrderAsync, fetchUserOrderAsync, selectCart, subtractFromOrderQuantityAsync } from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=> !!state.auth.me.id);
  const userId = useSelector((state)=> state.auth.me.id);
  const order = useSelector(selectCart);
  
  
  useEffect(()=>{
    if(!isLoggedIn){
    dispatch(fetchGuestOrderAsync());
    }
    else{
      dispatch(fetchUserOrderAsync(userId))
    }
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
  
  if(!isLoggedIn){
    return (
      <div>
        <div id="cart-container">
          <h1>Your Cart</h1>
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
  }
  else{
    return(
      <div>
        <div id ='cart-container'>
          <h1>Your Cart</h1>
          <h2>Subtotal: </h2>

        </div>
      </div>
    )
  }
};

export default Cart;