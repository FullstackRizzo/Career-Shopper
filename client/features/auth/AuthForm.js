import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
    navigate("/account");
  };

  return (
    <div>
      <div className="form-nav-container">
        <h1>
          <Link to="/login">LOGIN</Link>
        </h1>
        <h1>
          <Link to="/signup">SIGN UP</Link>
        </h1>
      </div>
      <form onSubmit={handleSubmit} id="form" className={name} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username:</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password:</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName.toUpperCase()}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
