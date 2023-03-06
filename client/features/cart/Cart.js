import React from "react";
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
      </div>
    </div>
  );
};

export default Cart;
