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
 
    const cartTotal = cart.reduce((acc, career) => {
        acc += career.price * career.quantity;
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
        navigate("/");
    };

    return ( 
        <div id = 'cart-container' >
            <h1>Your Cart:</h1>
            <h2>Subtotal: ${cartTotal}</h2>
            <div id = 'cart-items' >
                {cart.map((careers) => {
                    return (
                        <div key = {careers.id} >
                            <img src = {careers.imageUrl} />
                            <h3 > {careers.name} </h3>
                            <h4 > ${careers.cost} </h4>
                            <h4 > Quantity: {careers.length} </h4>
                            <button onClick = {() => handleDelete(careers.id)} > Delete </button>
                        </div>
                    );
                })}
            </div>
            <button onClick = {() => handleCheckout(cart, userId)} > Checkout </button>
        </div>
    );
};



export default Cart;