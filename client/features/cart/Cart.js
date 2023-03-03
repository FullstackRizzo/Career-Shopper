import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { 
    deleteCareerFromCart, 
    checkoutCart, 
    selectGetCart,
    getMyCart,
    checkoutCartSlice,
    addToQuantity,
    removeToQuantity,
    editCareerInDBCart,
    removeFromCart,
    } from "./cartSlice";
import { useEffect } from "react";
import { useState } from "react";
import { getSingleUser, 
        selectSingleUser,
        editSingleUser 
} from "./singleUserSlice";
import { addUserAsync } from "./allUsersSlice";


const Cart = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(selectGetCart);
    const userId = useSelector(state => state.auth.me.id);
    const isLoggedIn = useSelector((state) => !!state.auth.me.id);
    const singleUser = useSelector(selectSingleUser);
    const [username, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    // const localCartStorage = localStorage.getItem("cart");
    
    // if (localCartStorage) {
    //     var localCart = JSON.parse(localCartStorage);
    // }

const [localCart, setItem] = useState([]);
localCart.push([cart]);
useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(localCart));
}, [localCart]);//add objects to local storage

useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));;
    if (cart) {
        setItem(localCart);
    }
}, [cart]);
console.log(localCart);
const cartTotal = cart.reduce((acc, {career, quantity}) => {
    acc += career.cost * quantity;
    return acc;
  }, 0);

    useEffect(() => {
        if(userId) dispatch(getSingleUser(userId));
        if (userId) dispatch(getMyCart(userId));
    }, [dispatch, userId]);

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         setUserName(singleUser.username);
    //     }
    // }, [
    //     singleUser.username,
    // ]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (isLoggedIn) {
            dispatch(
                editSingleUser({
                    id: userId,
                    username,
                })
            );
        } else {
            dispatch(
                addUserAsync({
                    username,
                    password: "password",
                })
            );
        }
    };

    const handleIncreaseQuantity = (localCart, career) => {
        dispatch(addToQuantity(career));
        if (localCart) {
            const localCart = localCart.map((career) => {
                if (localCart.id == career.id) {
                    localCart.career.quantity+1;
                }
                return career;
            });
            localStorage.setItem("cart", JSON.stringify(localCart));
        }
        if (isLoggedIn) {
            let id = career.cartId;
            let careerId = career.id;
            let quantity = career.quantity + 1;
            dispatch(editCareerInDBCart({ id, careerId, quantity }));
        }
    };
    
    const handleDecreaseQuantity = (localCart, career) => {
        dispatch(removeToQuantity(career));
        if (localCart) {    
            const localCart = localCart.map((career) => {
                if (localCart.id == career.id) {
                    localCart.career.quantity--;
    
                }
                return career;
            });
            localStorage.setItem("cart", JSON.stringify(localCart));
        }
    };


    const handleDelete = (cart, career) => {
        dispatch(removeFromCart(career.id));
        if (cart) {
            const newLocalCart = cart.filter((item) => {
                if (item.id !== career.id) return true;
            });
            localStorage.setItem("cart", JSON.stringify(newLocalCart));
        }
        if (isLoggedIn) {
            let id = career.cartId;
            dispatch(deleteCareerFromCart({ id }));
        }
    };

    const handleCheckout = (cart, userId) => {
        localStorage.setItem("cart", "[]");
        dispatch(checkoutCartSlice());
         if (isLoggedIn) {
            let completed = true;
            cart.map((item) => {
                let id = item.cartId;
                let careerId = item.id;
                let quantity = item.quantity;
                dispatch(
                    checkoutCart({ id, userId, careerId, quantity, completed })
                );
            });
        }
        navigate("/");
    };
    console.log("cart", cart);
    console.log("localCart", localCart);
    return ( 
        <div>
        <div id = 'cart-container' >
            <h1>Your Cart</h1>
            <h2>Subtotal: ${cartTotal}</h2>
            <div id = 'cart-items' >
                {localCart.map((career) => {
                    // let career = cart.career;
                    return (
                        <div key = {career.id} >
                            {/* <img src = {career.imageURL} /> */}
                            <h3 > {localCart.name} </h3>
                            <h4 > ${localCart.cost} </h4>
                            <h4 > Quantity: {localCart.quantity} </h4>
                            <button onClick = {() =>
                                 handleIncreaseQuantity(localCart, career)} > + </button>
                            <button onClick = {() => 
                                handleDecreaseQuantity(localCart, career)} > - </button>
                            <button onClick = {() => handleDelete(localCart, career)} > Delete </button>
                        </div>
                    );
                })}
            </div>
            
            <form onSubmit = {handleSubmit} >
                <h4>Shipping:</h4>
                <label htmlFor = "username" > Username: </label>
                <input
                    name = "username"
                    value = {username}
                    onChange = {(evt) => setUserName(evt.target.value)}
                />
                <label htmlFor = "firstName" > First Name: </label>
                <input
                    firstName = "firstName"
                    value = {firstName}
                    onChange = {(evt) => setFirstName(evt.target.value)}
                />
                <label htmlFor = "lastName" > Last Name: </label>
                <input
                    lastName = "lastName"
                    value = {lastName}
                    onChange = {(evt) => setLastName(evt.target.value)}
                />
                <label htmlFor = "address" > Address: </label>
                <input
                    address = "address"
                    value = {address}
                    onChange = {(evt) => setAddress(evt.target.value)}
                />
                <label htmlFor ="email" > Email: </label>
                <input
                    email = "email"
                    value = {email}
                    onChange = {(evt) => setEmail(evt.target.value)}
                />
                <label htmlFor = "phone" > Phone: </label>
                <input
                    phone = "phone"
                    value = {phone}
                    onChange = {(evt) => setPhone(evt.target.value)}
                />
                <button type = "submit" > Update info </button>
            </form>

            <button onClick = {() => handleCheckout(localCart, userId)} > Checkout </button>
        </div>
        </div>
    );
};

export default Cart;