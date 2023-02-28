import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Account from '../features/account/Account';
import Homepage from '../features/homepage/Homepage';
import { me } from './store';
import Careers from '../features/allcareers/AllCareers';

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

          <Route path="/" element={<Homepage />} />
          <Route path="/*" element={<Account />} />
          <Route to="/account" element={<Account />} />

        </Routes>
      ) : (
        <Routes>
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
          <Route path="/" element={<Homepage />} />

          <Route path="/careers" element={<Careers />} />

        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;

