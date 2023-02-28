import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Account from "../features/account/Account";
import Homepage from "../features/homepage/Homepage";
import { me } from "./store";
import Careers from "../features/allcareers/AllCareers";
import AboutUs from "../features/aboutus/AboutUs";

import SingleCareer from "../features/singlecareer/singleCareer";

import ViewCareers from "../features/adminActions/ViewCareers";
import Cart from "../features/cart/Cart";
/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/about" element={<AboutUs />} />

          <Route path="/" element={<Homepage />} />
          <Route path="/*" element={<Account />} />
          <Route to="/account" element={<Account />} />

          <Route path="/viewcareers" element={<ViewCareers />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/*" element={<Account />} />
          <Route to="/account" element={<Account />} />

          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<SingleCareer />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<AuthForm name="login" displayName="Login" />} />
          <Route path="/login" element={<AuthForm name="login" displayName="Login" />} />
          <Route path="/signup" element={<AuthForm name="signup" displayName="Sign Up" />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<SingleCareer />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} /> 
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
