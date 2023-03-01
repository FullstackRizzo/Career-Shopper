import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCareerFromCart, checkoutCart, selectGetCart, getMyCart } from "./cartSlice";
import { useEffect } from "react";
const Cart = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(selectGetCart);
    const userId = useSelector(state => state.auth.me.id);


    return ( 
        <div id = 'cart-container' >
            <h1>Your Cart</h1>
            <h2>Subtotal:</h2>
            <div id = 'cart-items'>
                {cart.map((cart) => {
                    let career = cart.career
                    return (
                        <div key = {career.id}>
                            {/* <img src = {career.image} /> */}
                            <h3 > {`${career.name}`} </h3>
                            <h4 > ${career.cost} </h4>
                            <h4 > Quantity: {cart.quantity} </h4>
                            <button> Delete </button>
                        </div>
                    );
                })}
            </div>
            <button> Checkout </button>
        </div>
    );
};

export default Cart;