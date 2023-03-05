import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

function expandHamburger() {
  let e = document.querySelector("#hamburgerLinks");
  let burger = document.querySelector("#burger");
  burger.classList.toggle("down");
  if (e.style.display === "flex") {
    e.style.display = "none";
  } else {
    e.style.display = "flex";
  }
}

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
};


  return (
    <div className="headerSection">
      <h1 className="cormorantPageTitle">Career Shopper</h1>
      <nav className="navbar-menu">
        <a href="javascript:void(0);" className="icon" id="burgerBox" onClick={expandHamburger}>
          <i className="fa fa-bars rotate" id="burger"></i>
        </a>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/cart" className="navLink">
              <span role="img" aria-label="cart">
                🛒
              </span>
              {/* {cart.length > 0 && <span className="cartCount">{cart.length}</span>} */}
            </Link>
            <Link to="/" className="navLink">
              Home
            </Link>
            <a href="javascript:void(0);" className="navLink" onClick={logoutAndRedirectHome}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="navLink">
              Login
            </Link>
            <Link to="/signup" className="navLink">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
      <div id="hamburgerLinks">
        <div id="hamburgerLinksTopSection">
          <Link to="/">Home</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/about">About Us</Link>
          <Link to="/account">Account</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div id="hamburgerLinksBottomSection">
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;