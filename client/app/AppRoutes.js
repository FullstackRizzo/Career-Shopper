import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Account from "../features/account/Account";
import Homepage from "../features/homepage/Homepage";
import { me } from "./store";
import Careers from "../features/allcareers/AllCareers";
import AboutUs from "../features/aboutus/AboutUs";
import SingleCareer from "../features/singlecareer/singleCareer";
import ViewCareers from "../features/adminActions/ViewCareers";
// import Cart from "../features/cart/Cart";
import SingleCareerDetails from "../features/adminActions/SingleCareerDetails";
import ViewUsers from "../features/adminActions/ViewAllUsers";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/" element={<Homepage />} />
        {!isLoggedIn && (
          <>
            <Route
              path="/*"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              element={<AuthForm name="signup" displayName="Sign Up" />}
            />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<SingleCareer />} />
            <Route path="/about" element={<AboutUs />} />
          </>
        )}
        {(isLoggedIn || isAdmin) && (
          <>
            <Route path="/*" element={<Account />} />
            <Route to="/account" element={<Account />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<SingleCareer />} />
            <Route path="/about" element={<AboutUs />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
          </>
        )}
        {isAdmin && (
          <>
            <Route path="/*" element={<Account />} />
            <Route path="/viewcareers" element={<ViewCareers />} />
            <Route path="/singlecareerview/:id" element = {<SingleCareerDetails/>}/>
            <Route path="/viewallusers" element={<ViewUsers />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;