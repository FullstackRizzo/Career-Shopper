import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { addToOrderQuantityAsync, deleteGuestOrderAsync, fetchGuestOrderAsync, selectCart, subtractFromOrderQuantityAsync } from "./cartSlice";
import { fetchOrderAsync, selectDatabaseOrder, removeFromDBQuantity, addToDBQuantity } from "./orderDatabaseSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectCart);
  const userId = useSelector((state) => state.auth.me.id);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
 const orderDB = useSelector(selectDatabaseOrder);
 
 useEffect(()=>{
  dispatch(fetchOrderAsync());
  }
  ,[dispatch])

console.log (orderDB, 'orderDB');
console.log (order, 'order');
console.log (userId, 'userId');
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

  // const addToDBQuantity = async()=>{
  //   dispatch(addToDBQuantity());
  // }

  // const removeFromDBQuantity =()=>{
  // dispatch(removeFromDBQuantity());
  // }

  if (isLoggedIn && userId){
    return (
      <div>
        <div id="cart-container">
          <h1>Your Cart</h1>
          <h2>Subtotal: ${orderDB.reduce((acc, orderDB) =>{
          acc += orderDB.cost * orderDB.order_item.quantity
          return acc;
          },0)}</h2>
          <div id="cart-items">
              {orderDB.map((career) => (
                <div key={career.id}>
                  <img src = {career.imageUrl} />
                  <h3> {career.name} </h3>
                  <h4> ${career.cost} </h4>
                  {/* <button onClick = {removeFromDBQuantity(career.order_item.quantity)}>-</button><h4> Quantity: {order.quantity} </h4>
                  <button onClick = {addToDBQuantity(career.order_item.quantity)}>+</button> */}
                {/* <button onClick = {handleDelete(orderDB.career)}> Delete </button> */}
                </div>
        ))}
          </div>
      </div>
      </div>
    );
    }
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
                <button onClick = {e=>{e.preventDefault; subtractFromOrderQuantity(order.career.id)}}>-</button>
                <h4> Quantity: {order.quantity} </h4>
                <button onClick = {e=>{e.preventDefault; addToOrderQuantity(order.career.id)}}>+</button>
                <button onClick = {e =>{e.preventDefault; handleDelete(order.career.id)}}> Delete </button>
              </div>
            ))}
        </div>
        <button> Checkout </button>
      </div>
    </div>

    );
};
// }
export default Cart;