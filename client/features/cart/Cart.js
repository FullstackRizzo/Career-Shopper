import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { addToOrderQuantityAsync, deleteGuestOrderAsync, fetchGuestOrderAsync, selectCart, subtractFromOrderQuantityAsync } from "./cartSlice";
import { addToUserOrderQuantityAsync, deleteUserOrderAsync, fetchUserOrderAsync, selectUserCart, subtractFromUserOrderQuantityAsync } from "./userCartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=> !!state.auth.me.id);
  const userId = useSelector((state)=> state.auth.me.id);
  const userOrder = useSelector(selectUserCart);
  const guestOrder = useSelector(selectCart)
  const {order_items} = userOrder
  
  
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

  const deleteFromUserCart = async(id)=>{
    await dispatch(deleteUserOrderAsync(id))
  }

  const addToUserOrderQuantity = async(id)=>{
    await dispatch(addToUserOrderQuantityAsync(id))
  }
  
  const subtractFromUserOrderQuantity = async(id)=>{
    await dispatch(subtractFromUserOrderQuantityAsync(id))
  }
  if(!isLoggedIn){
    return (
      <div>
        <div id="cart-container">
          <h1>Your Cart</h1>
          <h2>Subtotal: ${guestOrder.reduce((acc, order) =>{
            acc += order.career.cost * order.quantity
            return acc;
          },0).toLocaleString()}</h2>
          <div id="cart-items">
              {guestOrder.map((order) => (
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
          <h2>Subtotal: ${userOrder.total}</h2>
          <div id = 'cart-items'>
            {order_items ? order_items.map((order)=>(
              <div key= {order.id}>
                <img src = {order.career.imageUrl} />
                  <h3> {order.career.name} </h3>
                  <h4> ${order.career.cost} </h4>
                  <button onClick = {e=>{e.preventDefault; subtractFromUserOrderQuantity(order.id)}}>-</button><h4> Quantity: {order.quantity} </h4> <button onClick={e=>{e.preventDefault; addToUserOrderQuantity(order.id)}}>+</button>
                  <button onClick = {e=>{e.preventDefault; deleteFromUserCart(order.id)}}>Delete</button>
              </div>
            )):
            <h3>No items in cart</h3>
            }
          </div>
        </div>
      </div>
    )
  }
};

export default Cart;
